# Component tree and state hierarchy for tag_finder React app

Below is a Mermaid flowchart that visualizes the component tree and main App state for the `tag_finder` React app.

```mermaid
flowchart TD
  %% Component tree and state hierarchy for tag_finder React app
  App["App"]:::component

  subgraph AppState["App state (useState)"]
    tagData["tagData: Array<{ pageUrl, gtags }>"]
    unmatchedTags["unmatchedTags: Array<string>"]
    errorPlaceholder["errorPlaceholder: string"]
  end

  Header["Header\n(props: onScanPageForGoogleTags, onClearAllData, onExportData)"]:::component
  TagList["<main> tag list\n(renders tagData.map -> TagComponent)"]:::component
  TagComponent["TagComponent\n(props: data, onRemoveEntry)"]:::component

  App --> AppState
  App --> Header
  App --> TagList
  TagList -->|renders| TagComponent
  Header -- calls --> App
  TagComponent -- uses prop --> App

  %% External services and utils
  Storage["chrome.storage.local (storeData / getDataFromStorage)"]
  Scripting["chrome.scripting.executeScript -> domScanner (content script)"]
  Parser["getTagId(url) (parser.js)"]
  Exporter["exportData (utils/export.js)"]

  App --> Storage
  App --> Scripting
  App --> Parser
  App --> Exporter

  classDef component fill:#f3f4f6,stroke:#111827,stroke-width:1px,rx:6,ry:6,color:#1a202c
```

How to use

- You can paste the above Mermaid block into any Markdown file (GitHub, GitHub Pages, or other Mermaid-enabled renderers) to visualize the diagram.
- If you'd like an SVG/PNG export, tell me and I can generate and add it to the repo.
