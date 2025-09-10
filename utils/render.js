// render full googleTagData object
export function renderGoogleTagData(jsonObject) {
  // take each object
  jsonObject.forEach(object => {
    const ulEl = document.createElement('ul')
    const liEl = document.createElement('li')
    ulEl.textContent = object.pageUrl
    liEl.textContent = JSON.stringify(object.gtags)
    ulEl.appendChild(liEl)
    document.querySelector('body')
      .appendChild(ulEl)
  })
}

// render the unmatched url if there are any
export function renderUnmatchedArray(containerId, list) {
  const element = document.getElementById(containerId)
  list.forEach((item) => {
  let newListEl = document.createElement('li')
  newListEl.textContent = item
  element.appendChild(newListEl)
  })
}