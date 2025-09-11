export function getDataFromStorage(key) {
  // pass [] as default if storage is empty
  return chrome.storage.local
  .get({ [key]: []})
  .then(result => result[key])
}

export function storeData(key, dataObj) {
  chrome.storage.local.set({ [key]: dataObj} )
}

// old functions
// export function loadGoogleTagData() {
//   // pass [] as default if storage is empty
//   return chrome.storage.local
//   .get({ googleTagData: [] })
//   .then(result => result.googleTagData);
// }

// save data to extension storage
// export function storeGoogleTagData(data) {
//   chrome.storage.local.set({ "googleTagData": data })
// }