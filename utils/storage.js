// Load data from extension storage
export function loadGoogleTagData() {
  // pass [] as default if storage is empty
  return chrome.storage.local
    .get({ googleTagData: [] })
    .then(result => result.googleTagData);
}

// save data to extension storage
export function storeGoogleTagData(data) {
  chrome.storage.local.set({ "googleTagData": data })
}

// TODO: Deal with unmatched array storage and fetching
