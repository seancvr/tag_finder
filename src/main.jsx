import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header.jsx";
import TagItem from "./components/TagItem.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <TagItem />
  </StrictMode>
);
