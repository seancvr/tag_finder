export function getDataFromStorage(key) {
  // pass [] as default if storage is empty
  return chrome.storage.local
  .get({ [key]: []})
  .then(result => result[key])
}

export function storeData(key, dataObj) {
  chrome.storage.local.set({ [key]: dataObj} )
}
