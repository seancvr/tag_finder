export default function TagComponent({ data }) {
  // render using ternary operator to check if gtags = [] empty array
  const linksHtml =
    data.gtags.length > 0
      ? data.gtags.map((tagId, index) => (
          <span key={tagId}>
            <a>{tagId}</a>
            {/* add commas except for the last element of the array */}
            {index < data.gtags.length - 1 && ", "}
          </span>
        ))
      : "No tags found";
  return (
    <div className="tagComponent-container">
      <div className="url-container">
        <p>{data.pageUrl}</p>
        <button id={data.pageUrl}>remove entry</button>
      </div>

      <p>{linksHtml}</p>
      <hr />
    </div>
  );
}
