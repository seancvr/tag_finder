export default function Header({ onScanPage }) {
  return (
    <header>
      <h2>Tag Finder</h2>
      <div className="buttons-div">
        <button onClick={onScanPage}>Scan page for google tags</button>
        <button>Clear data</button>
        <button>Export data</button>
      </div>
    </header>
  );
}
