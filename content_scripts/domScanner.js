// scan the home page for googletagmanager urls
export default function getDOMdata() {
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