// scan the home page for googletagmanager urls
export default function getPagedata() {
    try {
        // Get the current page url
        const pageUrl = window.location.href;

        // get googletagmanager src urls
        let srcUrlList = [];
        const scriptTagNodeList = document.querySelectorAll("script");
        scriptTagNodeList.forEach(element => {
            let srcUrl = element.getAttribute("src");

            // if src = '', attr contains null
            if (srcUrl) {
                if (srcUrl.includes("googletagmanager")) {
                    srcUrlList.push(srcUrl);
                }
            }
        });

        // return data to extension context
        return {
            pageUrl: pageUrl,
            srcUrls: srcUrlList
        };
    } catch (error) {
        console.error("Failed to get page data")
        return { error: error.message };
    }
}