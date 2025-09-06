// render an array on the extension html
export function renderTagArray(containerId, list, url) {
  const element = document.getElementById(containerId)
  element.textContent = url

  list.forEach((item) => {
    let newListEl = document.createElement("li")
    newListEl.textContent = item
    element.appendChild(newListEl)
  })
}

// render the unmatched url if there are any
export function renderUnmatchedArray(containerId, list) {
  const element = document.getElementById(containerId)
  list.forEach((item) => {
    let newListEl = document.createElement("li")
    newListEl.textContent = item
    element.appendChild(newListEl)
  })
}