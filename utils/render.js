// render full googleTagData object
export function renderTagData(jsonObject) {
  const div = document.querySelector('#gtag-list')
  // clear gtag-list div
  div.innerHTML = ''

  // create the new list items
  jsonObject.forEach(object => {
    const baseUrl = "https://search.dnslytics.com/search?d=domains&q="
    const pEl = document.createElement('p')
    const spanEl = document.createElement('span')
    
    // create remove entry button
    const btn = document.createElement('button');
    btn.className = 'remove-entry';
    btn.setAttribute('data-url', object.pageUrl);
    btn.textContent = 'x';

    if (object.gtags.length > 0) {
      spanEl.textContent = object.pageUrl
      //make a list of gtag links
      const linksHtml = object.gtags
        .map(item => `<a href="${baseUrl}${item}" target="_blank" rel="noopener noreferrer">${item}</a>`)
        .join(', ') + '.';
      // set the p innerHTML to linksHtml
      pEl.innerHTML = linksHtml;
      div.appendChild(spanEl)
      div.appendChild(btn)
      div.appendChild(pEl)
    } else {
      pEl.innerHTML = 'No tags found'
      spanEl.textContent = object.pageUrl
      div.appendChild(spanEl)
      div.appendChild(btn)
      div.appendChild(pEl)
    }
  })
}


// render the unmatched urls if any
export function renderUnmatchedList(list) {
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