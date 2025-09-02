let tagIdList = []
let unmatchedUrlList = []
idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+)(?=&|$)/;
let tagData = {}

// this line failed on a page and the script crashed
const scriptTagNodeList = document.querySelectorAll("script") 

const getTagId = (url) => {
    if (idTagRegex.test(url)) {
        extractedId = url.match(idTagRegex)
        tagIdList.push(extractedId[1])
    } else {
        unmatchedUrlList.push(url)
    }
}

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

console.log(tagIdList)
//capture the tags the regex misses and save for later analysis
console.log(unmatchedUrlList)

tagData.domain = "www.example.com"
tagData.tags = tagIdList
console.log(tagData)