# Type Scale Studio

A multi-page typography design workspace for building, testing and shipping modular type systems.

## Workspaces

- **Home** — overview of the typography toolkit and links to each workspace.
- **Generator** — configure base size, modular ratio, steps, font pairing and viewport range; preview the hierarchy and export CSS, fluid CSS, JSON or Tailwind.
- **Interactive Canvas** — preview headline and body copy with font pairing controls and desktop/mobile viewport modes.
- **Compare** — compare Minor Third, Major Third and Perfect Fourth scales side by side.
- **Token Manager** — review and adjust generated pixel values, then copy CSS variables or JSON.
- **Preset Library** — use curated starting points, save local presets and share a configuration URL.

## Features

- Responsive multi-page interface with a shared premium visual system
- Browser-local settings shared between workspaces
- Shareable configuration URLs
- No account or backend required
- GitHub Pages deployment

## Run locally

```bash
npm install
npm test
npm run check
```

Open `index.html` in a modern browser. Google Fonts are loaded remotely when available; system fallbacks are provided.

## Project structure

```text
index.html
 generator/index.html
 canvas/index.html
 compare/index.html
 tokens/index.html
 presets/index.html
src/
  app.js
  core.js
  studio.js
  generator.js
  canvas.js
  compare.js
  tokens.js
  presets.js
  site.css
  styles.css
tests/
  core.test.js
```

## Privacy

Configuration and saved presets are stored in the browser's local storage. Share links include the selected scale settings in the URL. No account or application backend is used.

## License

MIT. See [LICENSE](LICENSE).
