import { getTagId, idTagRegex } from './utils/parser.js';
import getPagedata from './content_scripts/domScanner.js';
import { renderUnmatchedArray, renderGoogleTagData } from './utils/render.js';
import { storeData, getDataFromStorage } from './utils/storage.js';

let googleTagData = []
let unmatchedUrlList = []

// When extension popup is opened, check persisted storage.
document.addEventListener("DOMContentLoaded", async function () {
  try {
    googleTagData = await getDataFromStorage("googleTagData");
  } catch (err) {
    console.error("loadGoogleTagData failed");
  }
  if (googleTagData.length > 0) {
    renderGoogleTagData(googleTagData)
  }
  storeData("googleTagData", googleTagData)
})

// add onclick event listener to the button element
document.querySelector("#button-el")
  .addEventListener("click", async function () {
    //get the tab object of the active tab on the active browser window 
    const [tab] = await chrome.tabs
      .query({ active: true, currentWindow: true });

    // execute getPageData against the active tab
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getPagedata
    })
    // get useful data from result object
    const scriptData = result[0].result

    // Check for errors in the scriptData
    if (scriptData.error) {
      console.error("Error:", scriptData.error)
      document.querySelector("#script-error")
        .textContent = `Error: ${scriptData.error}`
      return // early return
    }

    // Check if we already scanned this page
    if (googleTagData.some(obj => obj.pageUrl === scriptData.pageUrl)) {
      console.log("we already scanned this page") // for debug
      return // early return
    }

    // make a note of the unmatched tags for later analysis
    unmatchedUrlList = scriptData.srcUrls
      .filter(url => getTagId(url, idTagRegex) === null)
    console.log(unmatchedUrlList) // for debugging

    // put useful data in an object and push to googleTagData
    const pageData = {
      pageUrl: scriptData.pageUrl,
      gtags: scriptData.srcUrls // extract tag id's from srcUrls
        .map(url => getTagId(url, idTagRegex))
        .filter(id => id !== null)
    }
    googleTagData.push(pageData)
    storeData("googleTagData", googleTagData)
    renderGoogleTagData(googleTagData) // render data

    // Render unmatched gatgs if any
    if (unmatchedUrlList.length > 0) {
      renderUnmatchedArray('unmatched-list', unmatchedUrlList)
    }
  })
