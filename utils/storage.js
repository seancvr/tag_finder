// Load data from extension storage
export function loadGoogleTagData() {
  // pass [] as default if storage is empty
  return chrome.storage.local
    .get({ googleTagData: [] })
    .then(result => result.googleTagData);
}

// save data to extension storage
export async function storeGoogleTagData(newPageData) {
  // first check if that page data has already been saved
  const dataFromStorage = await loadGoogleTagData()

  // check if array is empty
  if (dataFromStorage.length > 0) {
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

