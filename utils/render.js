// render full googleTagData object
export function renderGoogleTagData(jsonObject) {
  const div = document.querySelector('#gtag-list')
  
  // clear the render-list div
  div.innerHTML = ''

  // create the new list items
  jsonObject.forEach(object => {
    const ulEl = document.createElement('ul')
    const liEl = document.createElement('li')
    const spanEl = document.createElement('span')
    spanEl.textContent = object.pageUrl
    ulEl.appendChild(spanEl)

    if (object.gtags.length > 0) {
      liEl.textContent = JSON.stringify(object.gtags)
    } else {
      liEl.textContent = 'No tags found'
    }

    ulEl.appendChild(liEl)
    div.appendChild(ulEl)
  })
}

// render full googleTagData object
export function renderGoogleTagDataTwo(jsonObject) {
  const div = document.querySelector('#gtag-list')
  
  // clear the render-list div
  div.innerHTML = ''

  // create the new list items
  jsonObject.forEach(object => {
    const ulEl = document.createElement('ul')
    const liEl = document.createElement('li')
    const spanEl = document.createElement('span')
    spanEl.textContent = object.pageUrl
    ulEl.appendChild(spanEl)

    if (object.gtags.length > 0) {
      liEl.textContent = JSON.stringify(object.gtags)
    } else {
      liEl.textContent = 'No tags found'
    }

    ulEl.appendChild(liEl)
    div.appendChild(ulEl)
  })
}


 
// render the unmatched urls if there are any
export function renderUnmatchedArray(list) {
  const div = document.querySelector('#unmatched-list')

  // clear unmatched-list div
  div.innerHTML = ''

  if (list.length > 0) {
    // create the new list items
    const ulEl = document.createElement('ul')
    const spanEl = document.createElement('span')
    spanEl.textContent = 'Unmatched tag list'
    ulEl.appendChild(spanEl)

    list.forEach((item) => {
      const liEl = document.createElement('li')
      liEl.textContent = item
      ulEl.appendChild(liEl)
    })
    div.appendChild(ulEl)
  } else {
    div.innerHTML = `<p><b>No unmatched tags</b></p>`
  }
}