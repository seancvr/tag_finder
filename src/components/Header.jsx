function handleClick() {
  alert("Scan page button was clicked");
}

export default function Header() {
  return (
    <header>
      <h2>Tag Finder</h2>
      <div className="buttons-div">
        <button onClick={handleClick}>Scan page for google tags</button>
        <button>Clear data</button>
        <button>Export data</button>
      </div>
    </header>
  );
}
