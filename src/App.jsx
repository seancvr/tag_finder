import { useState, useEffect } from "react";
import Header from "./components/Header";
import TagComponent from "./components/TagComponent";
import { getDataFromStorage, storeData } from "./utils/storage";
import domScanner from "./content_scripts/domScanner";
import { getTagId } from "./utils/parser";
// import { testTagData } from "./testData/tagData";

export default function App() {
  // initalize App state
  const [tagData, setTagData] = useState([]);
  const [errorPlaceholder, setErrorPlaceholder] = useState("");

  const scanPageForGoogleTags = async () => {
    // get the tab object of the active tab on the active browser window
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // execute domScanner against the active tab
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: domScanner,
    });
    // get useful data from result object
    const scriptData = result[0].result;

    // Check for errors in the scriptData
    if (scriptData.error) {
      setErrorPlaceholder(`Error: ${scriptData.error}`);
      return;
    }

    // Check if webpage was already scanned
    if (tagData.some((obj) => obj.pageUrl === scriptData.pageUrl)) {
      return;
    }

    // Catch and store unmatched tag urls
    //TODO

    // Format useful data as object and
    // TODO
    // Add functionality so that UI displays "no tags found"
    // if gtags list is empty
    const pageData = {
      pageUrl: scriptData.pageUrl,
      gtags: scriptData.srcUrls
        .map((url) => getTagId(url))
        .filter((id) => id !== null),
    };
    // update App state and extension storage
    setTagData((prevTagData) => {
      const updatedTagData = [...prevTagData, pageData];
      storeData("tagData", updatedTagData);
      return updatedTagData;
    });
  };

  useEffect(() => {
    // get tagData from local storage on component mount
    getDataFromStorage("tagData")
      .then((storedData) => {
        setTagData(storedData);
      })
      .catch((error) => {
        console.error("Failed to load tagData:", error);
      });
  }, []); // Empty array means this runs once when component mounts

  // map over tagData to render TagComponentList
  const tagComponentList = tagData.map((tagDataItem) => {
    return <TagComponent data={tagDataItem} />;
  });

  return (
    <>
      <Header onScanPage={scanPageForGoogleTags} />
      <main className="tagData-container">{tagComponentList}</main>
      <div className="error-placeholder">{errorPlaceholder}</div>
    </>
  );
}
