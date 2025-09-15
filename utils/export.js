// function to export data to JSON

export const exportData = (obj, filename) => {
  //create blob object stored tag data
  const blob = new Blob([JSON.stringify(obj, null, 2)],  {
    type: 'application/json'
  })
  // turn the blob object into a url
  const url = URL.createObjectURL(blob)
  // create anchor element
  const a = document.createElement('a')
  // set the hrf of the anchor to the blob url
  a.href = url
  // set the downlload name to the filename
  a.download = `${filename}.json`
  // append to document
  document.body.appendChild(a)
  // programatically click the a elemement to trigger download
  a.click()

  // clean up
  document.removeChild(a)
  URL.revokeObjectURL(url)
}