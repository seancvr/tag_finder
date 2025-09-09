import {getTagId, idTagRegex } from './utils/parser.js';
import getDOMdata from './content_scripts/domScanner.js';
import { renderTagArray, renderUnmatchedArray } from './utils/render.js';

let googleTagData = []
let unmatchedUrlList = []

// When extension popup is opened, check persisted storage.
document.addEventListener("DOMContentLoaded", async function() {
  googleTagData = JSON.parse(loadGoogleTagData())
  renderTagArray()
  //TODO:
  // add listener to check for changes in stored data
})

// Load data from extension storage
function loadGoogleTagData() {
  return chrome.storage.local
    .get(['googleTagData'])
    .then(result => result.googleTagData || []);
}

// save data to extension storage
function storeGoogleTagData(data) {
  return chrome.storage.local
    .set({"googleTagData": JSON.stringify(data)})
}

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
    pageUrl: scriptData.pageUrl, // pageUrl is a string
    gtags: tagIds // tag Ids is an array of strings.
  }
  googleTagData.push(pageData)

  // Save Google tage data to local storage
  storeGoogleTagData(googleTagData)
  
  // Render the tag and page url data
  renderTagArray("tag-list",tagIds, scriptData.pageUrl)

  // Render unmated tagID's if any
  if (unmatchedUrlList.length > 0) {
    renderUnmatchedArray('unmatched-list', unmatchedUrlList)
  }
})
