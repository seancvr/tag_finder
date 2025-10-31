import { useState, useEffect } from "react";
import Header from "./components/Header";
import TagComponent from "./components/TagComponent";
// import { testTagData } from "./testData/tagData";
import { getDataFromStorage } from "./utils/storage";

export default function App() {
  // initalize App state
  const [tagData, setTagData] = useState([]);

  // Load data from extension storage when component mounts
  useEffect(() => {
    // getDataFromStorage returns a Promise, so we use .then()
    getDataFromStorage("tagData")
      .then((storedData) => {
        setTagData(storedData);
      })
      .catch((error) => {
        console.error("Failed to load tagData:", error);
      });
  }, []); // Empty array means this runs once when component mounts

  const tagDataList = tagData.map((tagDataItem) => {
    return <TagComponent data={tagDataItem} />;
  });
  return (
    <>
      <Header />
      <main className="tagData-container">{tagDataList}</main>
    </>
  );
}
