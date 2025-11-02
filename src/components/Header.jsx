export default function Header({
  onScanPageForGoogleTags,
  onClearAllData,
  onExportData,
}) {
  return (
    <header>
      <h2>Tag Finder</h2>
      <div className="buttons-div">
        <button onClick={onScanPageForGoogleTags}>
          Scan page for google tags
        </button>
        <button onClick={onClearAllData}>Clear all data</button>
        <button onClick={onExportData}>Export data</button>
      </div>
    </header>
  );
}
