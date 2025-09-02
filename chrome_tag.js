// Reverse analytics google tag

// this line failed on a page and the script crashed
const scriptTagNodeList = document.querySelectorAll("script") 

let srcList = []
let tagIdList = []
let unmatchedUrlList = []
idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+)(?=&|$)/;

// get googletagmanager src url's
scriptTagNodeList.forEach(element => { 
    srcUrl = element.getAttribute("src")

    // if src = '', attr contains null
    if (srcUrl) {
        if (srcUrl.includes("googletagmanager")) {
            srcList.push(srcUrl)
        }
    }
})

//extract the tag ID from the src url 
srcList.forEach(url => {
    idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+)(?=&|$)/;
    if (idTagRegex.test(url)) { // .test() returns true if match
        extractedId = url.match(idTagRegex) // .match() returns an array
        tagIdList.push(extractedId[1]) //[1] contains tag id
    } else {
        console.log("no match")
        unmatchedUrlList.push(url)
    }
})

const getTagId = (url) => {
    if (idTagRegex.test(url)) {
        extractedId = url.match(idTagRegex)
        tagIdList.push(extractedId[1])
    } else {
        unmatchedUrlList.push(url)
    }
}


console.log(tagIdList)
//capture the tags the regex misses and save for later analysis
console.log(unmatchedUrlList)

// create object list to hold tag domain mapping
// e.g {tag: "GTM-XXX", domain: "www.example.com"}
//or maybe {domain: "www.example.com", tags: ["GTM-1XXX", "GTM-2XXX", "G-XXX", ""]}

// store tagDomain mapping object in local storage so that list can persist across sites

// Export to JSON








// find way to check what other sites have the same GTM ID
// DNSlytics returns some results. 
// https://dnslytics.com/reverse-analytics/
// The following Google IDs / Tags are supported: AW-xxxx, DC-xxxx, G-xxxx, GT-xxx, GTM-xxxx, PUB-xxxx and UA-xxx

// Call the DNSlytics api and get the other sites that are linked to google ID. 
// API: https://dnslytics.com/api/reverseganalytics/ 
// or just open the dnslytics site with the analyics tag
// https://search.dnslytics.com/search?d=domains&q=GTM-KTGQDC9