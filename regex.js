//extract the ID from the src string using regex
// Chrome tag formats:
// AW-xxxx, DC-xxxx, G-xxxx, GT-xxx, GTM-xxxx, PUB-xxxx and UA-xxx-x

/*
const idRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+)(?=&|$)/;

GTM-[A-Z0-9]+ matches GTM- followed by one or more (+) uppercase letters/digits.
G-[A-Z0-9]+ matches G- followed by one or more (+) uppercase letters/digits.
UA-[A-Z0-9-]+ matches UA- followed by on or more (+) uppercase letters, digits, or dashes.
(?=&|$) This is a lookahead assertions. Checks that what follows is either a & (start of another query parameter) or the end of the string ($), but does not include them in the match.
*/

srcList = [
    "https://www.googletagmanager.com/gtm.js?id=GTM-MKVKH7",
    "https://www.googletagmanager.com/gtag/js?id=G-4P31SJ70EJ",
    "https://www.googletagmanager.com/gtm.js?id=GTM-TDGJZS",
    "https://www.googletagmanager.com/gtm.js?id=GTM-MKV6",
    "//www.googletagmanager.com/gtm.js?id=GTM-WNVF2RB",
    "https://www.googletagmanager.com/gtm.js?id=GTM-M86QHGF",
    "https://www.googletagmanager.com/gtm.js?id=GTM-KT7RHVG",
    "//www.googletagmanager.com/gtm.js?id=GTM-P3X3VT7",
    "https://www.googletagmanager.com/gtag/js?id=UA-48687000-1",
    "https://www.googletagmanager.com/gtm.js?id=G-S7BN14YYF2",
    "https://www.googletagmanager.com/gtag/js?id=G-S7BN14YYF2",
    "https://www.googletagmanager.com/gtm.js?id=GTM-KJJZHXD",
    "https://www.googletagmanager.com/gtm.js?id=GTM-KJJZHXD",
    "https://www.googletagmanager.com/gtm.js?id=GTM-MNTH5N",
    'https://www.googletagmanager.com/gtm.js?id=GTM-537M973G',
    "https://www.googletagmanager.com/gtm.js?id=GTM-5H2XS26",
    "https://www.googletagmanager.com/gtm.js?id=GTM-NZ6NQM6F",
    "//www.googletagmanager.com/gtm.js?id=GTM-WJSC4J",
    "https://www.googletagmanager.com/gtm.js?id=GTM-T473TB6B&l=dblockLayer",
    "https://www.googletagmanager.com/gtag/js?id=G-JMM3WTBH00",
    "https://www.googletagmanager.com/gtag/js?id=G-1M15Q3KLDM",
    "https://www.googletagmanager.com/gtm.js?id=GTM-W4W75W", 
    "https://www.googletagmanager.com/gtag/js?id=UA-186571064-1",
    "https://www.googletagmanager.com/gtm.js?id=GTM-WT5GJ7M",
    "https://www.googletagmanager.com/gtm.js?id=GTM-P77HXHX",
    "//www.googletagmanager.com/gtm.js?id=GTM-5NBQVZ5",
    "https://www.googletagmanager.com/gtag/js?id=G-F2FH9F05GB"
]

let gtagIdList = []
let unmatchedUrlList = []
idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+)(?=&|$)/;

srcList.forEach(url => {
    if (idTagRegex.test(url)) { // .test() returns true if match
        extractedId = url.match(idTagRegex) // .match() returns an array
        gtagIdList.push(extractedId[1]) //[1] contains tag ID
    } else {
        console.log("no match")
        unmatchedUrlList.push(url)
    }
})

console.log(gtagIdList)
//capture the tags the regex misses and save for later analysis
console.log(unmatchedUrlList) 


