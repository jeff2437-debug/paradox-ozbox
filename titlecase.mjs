// Title Case pass for finished pages: rewrites the text of <h1>-<h3>, <title>
// and og/twitter title meta tags. Runs after the build, so every page and
// heading (including ones added later) is covered.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Short words kept lower case unless first or last, or after a colon/dash.
const SMALL = new Set(('a an and as at but by en for if in nor of on or per the to v vs via ' +
  'from into onto with de del la le von').split(' '));
// Units and other tokens that must keep their exact form.
const KEEP = new Set('km kWh kW kg g mg ml mL c kJ h min x e.g. i.e. etc.'.split(' '));

function capPart(w, force) {
  if (!w) return w;
  // Leave anything that already has a capital after its first letter (iX3, LFP, kWh, PowerHit),
  // contains a digit, an HTML entity, a domain/URL or an email.
  if (/[A-Z]/.test(w.slice(1)) || /\d/.test(w) || /[@/]|&[#\w]+;/.test(w) || /[a-z]\.[a-z]/i.test(w)) return w;
  const core = w.replace(/^[^A-Za-z]+|[^A-Za-z.]+$/g, '');
  if (KEEP.has(core)) return w;
  if (!force && SMALL.has(core.toLowerCase())) return w.toLowerCase();
  return w.replace(/^([^A-Za-z]*)([a-z])/, (m, lead, ch) => lead + ch.toUpperCase());
}

// Hyphenated words are cased part by part: "FBT-exempt" -> "FBT-Exempt", "100-door" -> "100-Door".
function capWord(w, force) {
  if (/^&[#\w]+;/.test(w)) return w; // HTML entity such as &amp;
  const bits = w.split(/([-–])/);
  return bits.map((b, i) => (i % 2 ? b : capPart(b, force || i > 0))).join('');
}

export function titleCase(text) {
  // Split on spaces but keep them; track words that start a new phrase.
  const parts = text.split(/(\s+)/);
  const words = parts.map((p, i) => ({ p, i })).filter(o => o.p.trim());
  let newPhrase = true;
  words.forEach((o, k) => {
    const isLast = k === words.length - 1 || /^[|—–-]$/.test(words[k + 1]?.p || '');
    const quoted = /^["“‘]/.test(o.p); // first word inside quotes
    parts[o.i] = /^[|—–-]$/.test(o.p) ? o.p : capWord(o.p, newPhrase || isLast || quoted);
    newPhrase = /[:—–|?!]$/.test(o.p) || /^[|—–-]$/.test(o.p);
  });
  return parts.join('');
}

// Title-case only the text between tags, leaving markup and entities alone.
const caseInner = html => {
  let first = true;
  return html.replace(/(^|>)([^<]+)/g, (m, gt, txt) => {
    if (!txt.trim()) return m;
    const out = gt + (first ? titleCase(txt) : titleCase('x ' + txt).slice(2));
    first = false;
    return out;
  });
};

export function titleCaseHtml(html) {
  return html
    .replace(/(<(h[1-3]|title)\b[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, inner, close) => open + caseInner(inner) + close)
    .replace(/(<meta\s+(?:property|name)="(?:og|twitter):title"\s+content=")([^"]*)(")/g, (m, a, t, b) => a + titleCase(t) + b);
}

export function titleCaseSite(dir) {
  for (const name of readdirSync(dir)) {
    const f = join(dir, name);
    if (statSync(f).isDirectory()) titleCaseSite(f);
    else if (name.endsWith('.html')) {
      const s = readFileSync(f, 'utf8'), t = titleCaseHtml(s);
      if (t !== s) writeFileSync(f, t);
    }
  }
}
