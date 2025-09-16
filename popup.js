import { getTagId, idTagRegex } from './utils/parser.js';
import getPagedata from './content_scripts/domScanner.js';
import { renderUnmatchedArray, renderTagData } from './utils/render.js';
import { storeData, getDataFromStorage } from './utils/storage.js';
import { exportData } from './utils/export.js';

let tagData = []
let unmatchedUrlList = []

// Event listener when extension is opened
document.addEventListener("DOMContentLoaded", async () => {
  // get and render tagData 
  try {
    tagData = await getDataFromStorage("tagData");
  } catch (err) {
    console.error("Failed to get tagData")
  }
  if (tagData.length > 0) {
    renderTagData(tagData)
  }

  // get and render unmatchedUrlList
  try {
    unmatchedUrlList = await getDataFromStorage("unmatchedUrlList")
  } catch (err) {
    console.error("Failed to get unmatchedUrlList")
  }
  if (unmatchedUrlList.length > 0) {
    renderUnmatchedArray(unmatchedUrlList)
  }
})

// Event listener when find tags button is clicked
document.querySelector("#find-tags")
  .addEventListener("click", async () => {
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
    if (tagData.some(obj => obj.pageUrl === scriptData.pageUrl)) {
      return // early return
    }

    // Store unmatched tag id's
    let newUnmatchedUrlList = scriptData.srcUrls
      .filter(url => getTagId(url, idTagRegex) === null)
    unmatchedUrlList = unmatchedUrlList.concat(newUnmatchedUrlList)

    // put useful data in an object and push to tagData
    const pageData = {
      pageUrl: scriptData.pageUrl,
      gtags: scriptData.srcUrls 
        .map(url => getTagId(url, idTagRegex))
        .filter(id => id !== null)
    }
    tagData.push(pageData)

    // Store data
    storeData("tagData", tagData)
    storeData("unmatchedUrlList", unmatchedUrlList)

    // Render data
    renderTagData(tagData)
    renderUnmatchedArray(unmatchedUrlList)
  })

// Clear data event listener
document.querySelector("#clear-data")
  .addEventListener("click", () => {
    // Clear storage
    chrome.storage.local.clear()

    // clear in memory data
    tagData = []
    unmatchedUrlList = []

    // Clear popup
    document.querySelector("#gtag-list").innerHTML = ''
    document.querySelector("#unmatched-list").innerHTML = ''
    
  })

// Export data button
document.querySelector('#export-data')
  .addEventListener("click", async () => {
    try {
      tagData = await getDataFromStorage("tagData");
    } catch (err) {
      console.error("Failed to get tagData")
    }
    if (tagData.length > 0) {
      renderTagData(tagData)
    }

    exportData(tagData, "tagData")
  })


// register event handler for any clicks inside gtag-list element
// click within gtag-list will bubble up and invoke the handler
const gtagList = document.querySelector("#gtag-list")
gtagList.querySelector("click", (e) => {
  console.log(`button was clicked`)
  // finds the closest .remove-entry element to the click event
  const btn = e.target.closest(".remove-entry")
  // ignore clicks on buttons not inside gtag-list
  if (!btn || !gtagList.contains(btn)) { return }

  const url = btn.getAttribute("data-url")
  if (!url) { return }

  // remove entry from tagData
  // removeEntry(url)

  // re-render the ui
  // renderTagData(tagData)
})
