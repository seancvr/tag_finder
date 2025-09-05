import getTagId, { idTagRegex } from './utils/parser.js';
import getDOMdata from './content_scripts/domScanner.js';
let googleTagData = []
let unmatchedUrlList = []

// add onclick event listener to the button element in popop.html
document.querySelector("#button-el").addEventListener("click", async function() {
  //get the tab object of the active tab on the active browser window 
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

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
    const tagList = document.querySelector("#tag-list")
    tagList.textContent = "Error: " + scriptData.error
    // early return if error
    return
  }

  // extract tagID's from srcUrls and make a note of the unmatched tags for later analysis
  const tagIds = scriptData.srcUrls.map(url => getTagId(url, idTagRegex)).filter(id => id !== null)
  unmatchedUrlList =  scriptData.srcUrls.filter(url => getTagId(url, idTagRegex) === null)
  console.log(unmatchedUrlList) // for debugging
  
  // put useful data in an object and push to googleTagData
  const pageData = {
    pageUrl: scriptData.pageUrl,
    gtags: tagIds
  }
  googleTagData.push(pageData)
  
  // Render the tag and page url data
  renderTagArray(scriptData.srcUrls, scriptData.pageUrl)

  // Render unmated tagID's if any
  if (unmatchedUrlList.length > 0) {
    renderUnmatchedArray(unmatchedUrlList)
  }
})

// render an array on the extension html
function renderTagArray(list, url) {
  const tagList = document.querySelector("#tag-list")
  tagList.textContent = url

  list.forEach((item) => {
    let newListEl = document.createElement("li")
    newListEl.textContent = item
    tagList.appendChild(newListEl)
  })
}

// render the unmatched url if there are any
function renderUnmatchedArray(list) {
  const unmatchedList = document.querySelector("#unmatched-list")

  list.forEach((item) => {
    let newListEl = document.createElement("li")
    newListEl.textContent = item
    unmatchedList.appendChild(newListEl)
  })
}
