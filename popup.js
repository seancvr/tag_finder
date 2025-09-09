import {getTagId, idTagRegex } from './utils/parser.js';
import getDOMdata from './content_scripts/domScanner.js';
import { renderTagArray, renderUnmatchedArray } from './utils/render.js';
let googleTagData = []
let unmatchedUrlList = []

// TODO:
/*
When extension popup is opened, check persisted storage.
If 'googleTagData' or 'unmatchedUrlList' have been stored
  then retrieve data and render it in the popup.html UI
if not
  don't render anything
*/

// add onclick event listener to the button element in popop.html
document.querySelector("#button-el")
  .addEventListener("click", async function() {
  //get the tab object of the active tab on the active browser window 
  const [tab] = await chrome.tabs
    .query({ active: true, currentWindow: true });

  // execute a script against the active tab
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getDOMdata
  })
  // get useful data from result object
  const scriptData = result[0].result

  // Check for errors in the scriptData
  if (scriptData.error) {
    console.error("Error:", scriptData.error)
    // Display error in the UI
    document.querySelector("#tag-list")
      .textContent = `Error: ${scriptData.error}`
    // early return if error
    return
  }

  // extract tag id's from srcUrls
  const tagIds = scriptData.srcUrls
    .map(url => getTagId(url, idTagRegex))
    .filter(id => id !==null)
  
  // make a note of the unmatched tags for later analysis
  unmatchedUrlList = scriptData.srcUrls
    .filter(url => getTagId(url, idTagRegex) === null)
  console.log(unmatchedUrlList) // for debugging
  
  // put useful data in an object and push to googleTagData
  const pageData = {
    pageUrl: scriptData.pageUrl,
    gtags: tagIds
  }
  googleTagData.push(pageData)

  //TODO:
  /*
  Persist googleTagData and unmatchedTadList
  Save to localStorage or extension storage
  */
 
  // Render the tag and page url data
  renderTagArray("tag-list",tagIds, scriptData.pageUrl)

  // Render unmated tagID's if any
  if (unmatchedUrlList.length > 0) {
    renderUnmatchedArray('unmatched-list', unmatchedUrlList)
  }
})
