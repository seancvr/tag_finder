let tagIdList = []
let unmatchedUrlList = []
idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+)(?=&|$)/;
let tagData = {}

const findBtn = document.querySelector("#find-el")

// scan the home page for google tags
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
    findTags()
    renderArray(tagData.tags)
})

console.log(tagIdList)
console.log(unmatchedUrlList)

tagData.domain = "www.example.com"
tagData.tags = tagIdList
console.log(tagData)