export default function TagComponent({ data }) {
  const linksHtml = data.gtags.map((tagId, index) => (
    <span key={tagId}>
      <a>{tagId}</a>
      {/* add commas except for the last element of the array */}
      {index < data.gtags.length - 1 && ", "}
    </span>
  ));
  return (
    <div className="tagComponent-container">
      <div className="url-container">
        <p>{data.pageUrl}</p>
        <button>remove entry</button>
      </div>

      <p>{linksHtml}</p>
      <hr />
    </div>
  );
}
