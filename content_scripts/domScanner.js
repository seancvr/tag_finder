// scan the home page for googletagmanager urls
export default function getPagedata() {
    try {
        // Get the current page URL
        const pageUrl = window.location.href;
        
        let srcUrlList = [];
        // Added try-catch since this line failed previously
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
        console.log(pageUrl) // for debug
        console.log(srcUrlList) // for debug
        
        return {
            pageUrl: pageUrl,
            srcUrls: srcUrlList
        };
    } catch (error) {
        console.log(error.message) // for debug
        return { error: error.message };
    }
}