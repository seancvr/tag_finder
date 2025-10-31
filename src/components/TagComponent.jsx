export default function TagComponent({ data }) {
  const linksHtml = data.gtags.map((tagId, index) => (
    <span key={tagId}>
      <a>{tagId}</a>
      {/* add commas except for the last element of the array */}
      {index < data.gtags.length - 1 && ", "}
    </span>
  ));
  return (
    <div className="tags-list">
      <div className="url-container">
        <p>{data.pageUrl}</p>
        <button>remove</button>
      </div>

      <p>{linksHtml}</p>
      <hr />
    </div>
  );
}
