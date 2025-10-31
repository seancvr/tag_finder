// get data from extension storage
export function getDataFromStorage(key) {
  // pass [] as default if storage is empty
  return chrome.storage.local.get({ [key]: [] }).then((result) => result[key]);
}

// store data in extension storage
export function storeData(key, dataObj) {
  chrome.storage.local.set({ [key]: dataObj });
}
