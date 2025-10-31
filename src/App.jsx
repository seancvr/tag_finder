import Header from "./components/Header";
import TagComponent from "./components/TagComponent";
import { tagData } from "./testData/tagData";

// const tagDataItem = {
//   gtags: ["UA-98105905-1", "GT-K8D5ZX2", "GTM-NBMK8NJ", "GT-K8D5ZX2"],
//   pageUrl: "https://www.oann.com/",
// };

export default function App() {
  const tagDataList = tagData.map((tagDataItem) => {
    return <TagComponent data={tagDataItem} />;
  });
  return (
    <>
      <Header />
      {tagDataList}
    </>
  );
}
