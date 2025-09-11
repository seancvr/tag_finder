// render full googleTagData object
export function renderGoogleTagData(jsonObject) {
  // clear the render-list div
  document.querySelector('#gtag-list').innerHTML = ''

  // create the new list items
  jsonObject.forEach(object => {
    const ulEl = document.createElement('ul')
    const liEl = document.createElement('li')
    ulEl.textContent = object.pageUrl
    liEl.textContent = JSON.stringify(object.gtags)
    ulEl.appendChild(liEl)
    document.querySelector('#render-list')
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