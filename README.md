# paradox.ozbox.org

Famous paradoxes, each with a game or simulation you can run in the browser.
`node build.mjs` writes the site to `./site` (Cloudflare Pages: build command `node build.mjs`, output `site`, NODE_VERSION 22).

- `src/paradoxes.js` — the content for each paradox (puzzle, lab markup, explanation, FAQ, related)
- `src/sims/<slug>.js` — the simulator for each paradox (file name must match the slug)
- `src/lab.js` — shared helpers: animation loop, bar and line charts
- To add a paradox: add an object to `PARADOXES` and a matching `src/sims/<slug>.js`
