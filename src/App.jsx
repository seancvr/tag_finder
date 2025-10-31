import Header from "./components/Header";
import TagComponent from "./components/TagComponent";
import { tagData } from "./testData/tagData";

export default function App() {
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
