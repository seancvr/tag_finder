idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+)(?=&|$)/;
let tagData = {domain: "www.example.com"}
let tagIdList = []
let unmatchedUrlList = []

const ulEl = document.querySelector("#ul-el")
const findBtn = document.querySelector("#find-el")

function findTags() {
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

function getTagId(url) {
    if (idTagRegex.test(url)) { // returns true if match
        extractedId = url.match(idTagRegex)
        tagIdList.push(extractedId[1])
    } else {
        // catch unmatched tag ID's
        unmatchedUrlList.push(url)
    }
}

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
    console.log(tagData)
    console.log(tagData.tags)
})