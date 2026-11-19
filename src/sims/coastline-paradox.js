import { $, svgEl, seeded, num, bars, COLORS } from '../lab.js';

const root = $('[data-sim="coastline"]');
const svg = $('[data-map]', root);
const KM_PER_PX = 0.5;
const RULERS = [50, 25, 10, 5, 2, 1];
let coast = [], seed = 3;

function makeIsland() {
  const r = seeded(seed++);
  let pts = Array.from({ length: 10 }, (_, i) => { const a = i / 10 * 2 * Math.PI, rad = 110 + r() * 50; return [320 + rad * Math.cos(a) * 1.3, 190 + rad * Math.sin(a)]; });
  let rough = 0.45;
  for (let level = 0; level < 8; level++) {
    const next = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length], dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
      const off = (r() - 0.5) * 2 * rough * d;
      next.push(pts[i], [(x1 + x2) / 2 - dy / d * off, (y1 + y2) / 2 + dx / d * off]);
    }
    pts = next; rough *= 0.95;
  }
  coast = pts;
}
// Walk a pair of dividers around the coast with a fixed opening.
function measure(rulerKm) {
  const r = rulerKm / KM_PER_PX, n = coast.length, path = [coast[0]];
  let cur = coast[0], i = 0, steps = 0;
  while (i < n && steps < 5000) {
    let found = false;
    for (let j = i + 1; j <= n; j++) {
      const p = coast[j % n];
      if (Math.hypot(p[0] - cur[0], p[1] - cur[1]) >= r) {
        // interpolate along segment j-1 → j to the point exactly r away
        const q = coast[(j - 1) % n]; let lo = 0, hi = 1;
        for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2, x = q[0] + (p[0] - q[0]) * m, y = q[1] + (p[1] - q[1]) * m; if (Math.hypot(x - cur[0], y - cur[1]) < r) lo = m; else hi = m; }
        cur = [q[0] + (p[0] - q[0]) * hi, q[1] + (p[1] - q[1]) * hi]; i = j - 1; steps++; path.push(cur); found = true; break;
      }
    }
    if (!found) break;
  }
  const last = Math.hypot(coast[0][0] - cur[0], coast[0][1] - cur[1]);
  path.push(coast[0]);
  return { km: steps * rulerKm + last * KM_PER_PX, steps, path };
}
function draw() {
  const ri = +$('[name=ruler]', root).value, ruler = RULERS[ri];
  $('[data-rulerv]', root).textContent = `${ruler} km`;
  const m = measure(ruler);
  svg.innerHTML = '';
  svg.append(svgEl('polygon', { points: coast.map(p => p.join(',')).join(' '), fill: '#e9f1e2', stroke: '#6c8f5a', 'stroke-width': 1 }));
  svg.append(svgEl('polyline', { points: m.path.map(p => p.join(',')).join(' '), fill: 'none', stroke: COLORS.s2, 'stroke-width': 2 }));
  for (const p of m.path) svg.append(svgEl('circle', { cx: p[0], cy: p[1], r: ruler >= 5 ? 3 : 1.5, fill: COLORS.s2 }));
  svg.append(svgEl('line', { x1: 20, x2: 20 + 50 / KM_PER_PX, y1: 360, y2: 360, stroke: '#333', 'stroke-width': 2 }));
  const s = svgEl('text', { x: 20, y: 352, class: 'tick' }); s.textContent = '50 km'; svg.append(s);
  $('[data-msg]', root).innerHTML = `With a ${ruler} km ruler: <b>${m.steps}</b> steps, so the coastline measures <b>${num(m.km)} km</b>.`;
  const all = RULERS.map(rk => measure(rk).km), max = Math.max(...all);
  bars($('[data-bars]', root), RULERS.map((rk, k) => ({ label: `${rk} km ruler`, value: all[k] / max, color: k === ri ? COLORS.s2 : COLORS.s1, text: `${num(all[k])} km` })));
}
$('[name=ruler]', root).addEventListener('input', draw);
$('[data-new]', root).addEventListener('click', () => { makeIsland(); draw(); });
makeIsland(); draw();
