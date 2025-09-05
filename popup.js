let googleTagData = []
let unmatchedUrlList = []
/*
Chrome tag formats:
// AW-xxxx, DC-xxxx, G-xxxx, GT-xxx, GTM-xxxx, PUB-xxxx and UA-xxx-x

Regex:
GTM-[A-Z0-9]+ matches GTM- followed by one or more (+) uppercase letters/digits.
G-[A-Z0-9]+ matches G- followed by one or more (+) uppercase letters/digits.
UA-[A-Z0-9-]+ matches UA- followed by on or more (+) uppercase letters, digits, or dashes.
(?=&|$) This is a lookahead assertions. Checks that what follows is either a & (start of another query parameter), 
or the end of the string ($), but does not include them in the match.
*/
let idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+)(?=&|$)/

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
  const tagIds = scriptData.srcUrls.map(url => getTagId(url)).filter(id => id !== null)
  unmatchedUrlList =  scriptData.srcUrls.filter(url => getTagId(url) === null)
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

// scan the home page for googletagmanager urls
function getDOMdata() {
    try {
        // Get the current page URL
        const pageUrl = window.location.href;
        console.log(pageUrl) // for debug
        
        let srcUrlList = [];
        // Add try-catch since this line failed previously
        const scriptTagNodeList = document.querySelectorAll("script");
        // get googletagmanager src urls
        scriptTagNodeList.forEach(element => {
            let srcUrl = element.getAttribute("src");

            // if src = '', attr contains null
            if (srcUrl) {
                if (srcUrl.includes("googletagmanager")) {
                    srcUrlList.push(srcUrl);
                }
            }
        });
        console.log(srcUrlList) // for debug
        // return the data to the extension
        return {
            pageUrl: pageUrl,
            srcUrls: srcUrlList
        };
    } catch (error) {
        console.log(error.message) // for debug
        return { error: error.message };
    }
}

// extract the tag ID from the src url string
function getTagId(url) {
    if (idTagRegex.test(url)) {
        let extractedId = url.match(idTagRegex)
        return extractedId[1]
    } else {
      // if no match
        return null
    }
}

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
