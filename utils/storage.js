// Load data from extension storage
export function loadGoogleTagData() {
  // pass [] as default if storage is empty
  return chrome.storage.local
    .get({ googleTagData: [] })
    .then(result => result.googleTagData);
}

// save data to extension storage
export async function storeGoogleTagData(data) {
  return chrome.storage.local
    .set({ "googleTagData": data })
}

