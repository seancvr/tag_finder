import { getTagId, idTagRegex } from './utils/parser.js';
import getPagedata from './content_scripts/domScanner.js';
import { renderUnmatchedList, renderTagData } from './utils/render.js';
import { storeData, getDataFromStorage } from './utils/storage.js';
import { exportData } from './utils/export.js';

let tagData = []
let unmatchedUrlList = []

// Load and render data when extension is opened
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
    renderUnmatchedList(unmatchedUrlList)
  }
})

// Find tags button
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
      document.querySelector("#script-error")
        .textContent = `Error: ${scriptData.error}`
      return
    }

    // Check if webpage was already scanned
    if (tagData.some(obj => obj.pageUrl === scriptData.pageUrl)) {
      return
    }

    // Catch and store unmatched tag urls
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
    renderUnmatchedList(unmatchedUrlList)
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
document.querySelector("#export-data")
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
// click event within gtag-list will bubble up and invoke the handler
const gtagList = document.querySelector("#gtag-list")
gtagList.addEventListener("click", async (e) => {
  // finds the closest .remove-entry element to the click event
  const btn = e.target.closest(".remove-entry")
  // ignore clicks on buttons not inside gtag-list
  // maybe redundant: test
  if (!btn || !gtagList.contains(btn)) { return }

  const url = btn.getAttribute("data-url")
  if (!url) { return }

  // get data from storage
  try {
    tagData = await getDataFromStorage("tagData");
  } catch (err) {
    console.error("Failed to get tagData")
  }

  // remove entry from tagData
  tagData = tagData.filter(
    obj => obj.pageUrl !== url
  )

  // store updated data
  storeData("tagData", tagData)

  // re-render the ui
  renderTagData(tagData)
  // clear unmatched list incase its still open
  document.querySelector("#unmatched-list").innerHTML = ''
})
