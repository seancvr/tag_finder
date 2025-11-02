export default function TagComponent({ data, onRemoveEntry }) {
  const baseUrl = "https://search.dnslytics.com/search?d=domains&q=";

  // render using ternary operator to check if gtags = [] empty array
  const linksHtml =
    data.gtags.length > 0
      ? data.gtags.map((tagId, index) => (
          <span key={tagId}>
            <a href={baseUrl + tagId} target="_blank" rel="noopener noreferrer">
              {tagId}
            </a>
            {/* add commas except for the last element of the array */}
            {index < data.gtags.length - 1 && ", "}
          </span>
        ))
      : "No tags found";

  const handleRemove = () => {
    onRemoveEntry(data.pageUrl);
  };
  return (
    <div className="tagComponent-container">
      <div className="url-container">
        <p>{data.pageUrl}</p>
        <button id={data.pageUrl} onClick={handleRemove}>
          remove entry
        </button>
      </div>

      <p>{linksHtml}</p>
      <hr />
    </div>
  );
}
