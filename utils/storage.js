// Load data from extension storage
export function loadGoogleTagData() {
  // pass [] as default if storage is empty
  return chrome.storage.local
    .get({ googleTagData: [] })
    .then(result => result.googleTagData);
}

// save data to extension storage
export function storeGoogleTagData(newPageData) {
  // first check if that page data has already been saved
  dataFromStorage = loadGoogleTagData()

  // check if array is empty
  if (dataFromStorage > 0) {
    // return true if there is a match
    if (
      dataFromStorage.some(item =>
        item.pageUrl === newPageData.pageUrl
      )
    ) {
      return chrome.storage.local
        .set({ "googleTagData": newPageData })
    }
  }
}

