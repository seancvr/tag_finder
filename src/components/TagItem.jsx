const tagData = {
  gtags: ["UA-98105905-1", "GT-K8D5ZX2", "GTM-NBMK8NJ", "GT-K8D5ZX2"],
  pageUrl: "https://www.oann.com/",
};

export default function TagItem() {
  const linksHtml = tagData.gtags.map((tagId, index) => (
    <span key={tagId}>
      <a>{tagId}</a>
      {/* add commas except for the last element of the array */}
      {index < tagData.gtags.length - 1 && ", "}
    </span>
  ));
  return (
    <div className="tags-list">
      <div className="url-container">
        <p>{tagData.pageUrl}</p>
        <button>remove</button>
      </div>

      <p>{linksHtml}</p>
      <hr />
    </div>
  );
}
