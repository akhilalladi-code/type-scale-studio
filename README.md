# Type Scale Studio

A browser-based modular typography scale generator for designers. Build a balanced type system, preview it in context, and export CSS variables, fluid CSS, JSON tokens, or a Tailwind theme.

## Features

- Generate modular scales with configurable base size, ratio, and step count
- Preview a responsive type hierarchy
- Export CSS custom properties, fluid `clamp()` sizes, JSON tokens, and Tailwind configuration
- Validate inputs and copy generated output
- Runs locally in the browser with no backend or runtime dependencies

## Run locally

```bash
npm install
npm test
npm run check
```

Then open `index.html` in a modern browser. Google Fonts are loaded remotely when available; system fallbacks are provided.

## Project structure

```text
index.html
src/
  app.js
  core.js
  styles.css
tests/
  core.test.js
```

## License

MIT. See [LICENSE](LICENSE).
