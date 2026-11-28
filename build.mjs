// Static site generator for paradox.ozbox.org — `node build.mjs` writes ./site
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { PARADOXES, CATEGORIES } from './src/paradoxes.js';
import { titleCaseSite } from './titlecase.mjs';

const SITE_URL = 'https://paradox.ozbox.org';
const SITE_NAME = 'Paradox Lab';
const CONTACT_EMAIL = 'contact@ozbox.org';
const ADSENSE_CLIENT = 'ca-pub-3136341800882537';
const CF_BEACON = '3865070444824e0db192e7de48873b8c';
const REVIEWED = 'November 2026';
const OUT = 'site';

const SIMS = readdirSync('src/sims');
const ASSET_V = createHash('md5').update(['src/lab.js', 'src/style.css', ...SIMS.map(f => 'src/sims/' + f)].map(f => readFileSync(f)).join('')).digest('hex').slice(0, 8);
const INLINE_CSS = readFileSync('src/style.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'assets/sims'), { recursive: true });
const pages = [];
const write = (p, body) => { const f = join(OUT, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, body); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');
const jsonLd = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const catId = c => c.toLowerCase().replace(/[^a-z]+/g, '-');
const bySlug = Object.fromEntries(PARADOXES.map(p => [p.slug, p]));

const NAV = [['/', 'All paradoxes'], ['/about/', 'About']];

function page({ path, title, description, h1, crumbs = [], body, faq = [], ld = [], sim = null, noindex = false }) {
  const url = SITE_URL + path;
  const lds = [...ld];
  if (path === '/') lds.unshift({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL + '/' });
  else lds.unshift({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement:
    [['/', 'Home'], ...crumbs, [path, strip(h1)]].map(([p, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE_URL + p })) });
  if (faq.length) lds.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) =>
    ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  const faqHtml = faq.length ? `<h2>Questions</h2>${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}` : '';
  const crumbHtml = path === '/' ? '' : `<p class="crumbs"><a href="/">Home</a>${crumbs.map(([p, n]) => ` › <a href="${p}">${n}</a>`).join('')} › ${esc(strip(h1))}</p>`;
  const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3a2391">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<style>${INLINE_CSS}</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>
${lds.map(jsonLd).join('\n')}
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="/">‽ Paradox<span> Lab</span></a>
<nav class="main">${NAV.map(([p, n]) => `<a href="${p}"${p === path ? ' aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
</div></header>
<main class="wrap">
${crumbHtml}
<h1>${h1}</h1>
${body}
${faqHtml}
</main>
<footer class="foot"><div class="wrap">
<p>Paradoxes you can test for yourself. Simulations run entirely in your browser using its random number generator, so results vary a little each time. Last reviewed ${REVIEWED}.</p>
<p><a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/contact/">Contact</a> · Sister sites: <a href="https://lotto.ozbox.org/">lotto.ozbox.org</a> · <a href="https://ev.ozbox.org/">ev.ozbox.org</a> · <a href="https://fakeaway.ozbox.org/">fakeaway.ozbox.org</a> · <a href="https://mortgage.ozbox.org/">mortgage.ozbox.org</a></p>
</div></footer>
${sim ? `<script type="module" src="/assets/sims/${sim}.js?v=${ASSET_V}"></script>` : ''}
${CF_BEACON ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${CF_BEACON}"}'></script>` : ''}
</body>
</html>`;
  write(path === '/' ? 'index.html' : path.replace(/^\//, '') + (path.endsWith('.html') ? '' : 'index.html'), html);
  if (!noindex) pages.push(path);
}

const tile = (p, tag = 'h2') => `<a class="tile" href="/${p.slug}/"><span class="ic" aria-hidden="true">${p.icon}</span><${tag}>${p.short}</${tag}><p>${p.teaser}</p><small>${p.category}</small></a>`;

/* ---------- paradox pages ---------- */
for (const p of PARADOXES) {
  if (!SIMS.includes(p.slug + '.js')) throw new Error(`Missing simulator src/sims/${p.slug}.js`);
  page({
    path: `/${p.slug}/`, h1: p.title, crumbs: [['/#' + catId(p.category), p.category]], sim: p.slug,
    title: `${p.metaTitle} | ${SITE_NAME}`, description: p.description, faq: p.faq,
    ld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: strip(p.title), description: p.description,
      author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME }, mainEntityOfPage: `${SITE_URL}/${p.slug}/` }],
    body: `<p class="lede">${p.tagline}</p>
<h2>The puzzle</h2>
<div class="puzzle">${p.puzzle}</div>
${p.lab}
${p.explain}`,
  });
  // related tiles go after the FAQ: append to the written page
}
// add "related" sections (kept separate so the FAQ stays near the explanation)
for (const p of PARADOXES) {
  const f = join(OUT, p.slug, 'index.html');
  const rel = p.related.map(s => bySlug[s]).filter(Boolean);
  if (rel.length) writeFileSync(f, readFileSync(f, 'utf8').replace('</main>', `<h2>Try another paradox</h2><div class="tiles">${rel.map(r => tile(r, 'h3')).join('')}</div>\n</main>`));
}

/* ---------- home ---------- */
page({
  path: '/', h1: 'Paradoxes you can test yourself',
  title: `${SITE_NAME} — Famous Paradoxes Explained, With Simulations You Can Run`,
  description: 'The Monty Hall problem, the birthday paradox, Simpson\'s paradox and more, each with a game or simulation you can run in your browser and a plain-English explanation.',
  body: `<p class="lede">Some answers feel wrong even after someone proves them. Here you don't have to take anyone's word for it: every paradox comes with a game to play or a simulation to run, then a plain-English explanation of what's really going on.</p>
${CATEGORIES.map(c => {
  const list = PARADOXES.filter(p => p.category === c);
  return list.length ? `<h2 id="${catId(c)}">${c}</h2><div class="tiles">${list.map(p => tile(p, 'h3')).join('')}</div>` : '';
}).join('')}
<div class="note">Got a favourite paradox you'd like to see here? <a href="/contact/">Suggest one</a>.</div>`,
});

/* ---------- about / privacy / contact / 404 ---------- */
page({ path: '/about/', h1: 'About Paradox Lab', title: `About | ${SITE_NAME}`, description: 'About Paradox Lab: famous paradoxes with simulations you can run yourself.',
  body: `<p>Paradox Lab collects famous puzzles where the right answer feels wrong, and lets you test them yourself. Each page states the puzzle, gives you something to play with or simulate, and then explains why the surprising answer is right.</p>
<h2>How the simulations work</h2>
<p>Everything runs in your own browser, using its built-in random number generator. Nothing is sent to us. Because the results are genuinely random, they'll differ slightly each time, and they get closer to the theoretical answer the more trials you run. That's the law of large numbers at work, and it's a good lesson in itself: a run of 20 games can easily mislead you; a run of 10,000 rarely will.</p>
<h2>Corrections</h2>
<p>We check the maths and the history carefully, but if you spot a mistake, please <a href="/contact/">let us know</a>.</p>` });
page({ path: '/privacy/', h1: 'Privacy', title: `Privacy policy | ${SITE_NAME}`, description: 'Privacy policy for Paradox Lab.',
  body: `<p>We don't ask for your personal information. The games and simulations run in your browser and don't send anything to us.</p>
<h2>Advertising</h2>
<p>This site uses Google AdSense to show ads. Google and its partners may use cookies to show ads based on your visits to this and other websites. You can turn off personalised ads at <a href="https://adssettings.google.com/">Google Ad Settings</a>, and learn more at <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p>
<h2>Visitor statistics</h2>
<p>We use Cloudflare Web Analytics to count page views. It doesn't use cookies and doesn't track you across sites.</p>
<h2>Contact</h2>
<p>Questions: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>` });
page({ path: '/contact/', h1: 'Contact', title: `Contact | ${SITE_NAME}`, description: 'Contact Paradox Lab.',
  body: `<p>Paradox suggestions, corrections and questions are all welcome: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>` });
page({ path: '/404.html', h1: 'Page not found', title: `Page not found | ${SITE_NAME}`, description: 'Page not found.', noindex: true,
  body: `<p>That page doesn't exist. Try the <a href="/">full list of paradoxes</a>.</p>` });

/* ---------- assets ---------- */
copyFileSync('src/lab.js', join(OUT, 'assets/lab.js'));
for (const f of SIMS) writeFileSync(join(OUT, 'assets/sims', f), readFileSync('src/sims/' + f, 'utf8').replace(/from '\.\.\/lab\.js'/g, `from '../lab.js?v=${ASSET_V}'`));
for (const f of ['og.png', 'favicon.ico', 'apple-touch-icon.png', 'favicon.svg']) if (existsSync('src/' + f)) copyFileSync('src/' + f, join(OUT, f));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write('ads.txt', `google.com, ${ADSENSE_CLIENT.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
for (const f of readdirSync('src/media')) { mkdirSync(join(OUT, 'media'), { recursive: true }); copyFileSync('src/media/' + f, join(OUT, 'media', f)); }
write('_headers', `/media/*\n  Access-Control-Allow-Origin: *\n  X-Robots-Tag: noindex\n/assets/*\n  Cache-Control: public, max-age=3600\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
titleCaseSite(OUT); // Title Case for every heading and page title
console.log(`Built ${pages.length} pages into ${OUT}/`);
