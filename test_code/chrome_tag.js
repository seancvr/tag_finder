idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+)(?=&|$)/;
let tagData = {domain: "www.example.com"}
let unmatchedUrlList = []

const ulEl = document.querySelector("#ul-el")
const findBtn = document.querySelector("#find-el")
console.log("got button-el")

// scan the home page for google tags
function findTags() {
    let tagIdList = []
    // this line failed on a page and the script crashed
    const scriptTagNodeList = document.querySelectorAll("script")
    // get googletagmanager src url's
    scriptTagNodeList.forEach(element => {
        srcUrl = element.getAttribute("src")

        // if src = '', attr contains null
        if (srcUrl) {
            if (srcUrl.includes("googletagmanager")) {
                getTagId(srcUrl)
            }
        }
    })
    tagData.tags = tagIdList
}

// extract the tag ID from the src url string
function getTagId(url) {
    if (idTagRegex.test(url)) {
        extractedId = url.match(idTagRegex)
        tagIdList.push(extractedId[1])
    } else {
        // catch unmatched tag ID's
        unmatchedUrlList.push(url)
    }
}

// render the tags on the extension html
function renderArray(tags) {
    let listItems = ""
    tags.forEach((tag) => {
        listItems += `<li> ${tag}</li>`
    })
    ulEl.innerHTML = listItems
}

findBtn.addEventListener("click", function () {
    console.log("button clicked")
    findTags()
    renderArray(tagData.tags)
})
