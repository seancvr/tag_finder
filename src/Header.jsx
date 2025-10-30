import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function Header() {
  return (
    <header>
      <h2>Google Tag Finder</h2>
      <div className="buttons-div">
        <button>Scan page for tags</button>
        <button>Clear data</button>
        <button>Export data</button>
      </div>
    </header>
  );
}
