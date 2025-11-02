// function to export data to JSON
export const exportData = (obj, filename) => {
  //create blob object to store tagData
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  // create url containing blob data
  const url = URL.createObjectURL(blob);
  // create anchor element
  const a = document.createElement("a");
  // set the href of the anchor to the blob url
  a.href = url;
  // set the download filename
  a.download = `${filename}.json`;
  // append anchor to document
  document.body.appendChild(a);
  // trigger download
  a.click();

  // dom clean-up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
