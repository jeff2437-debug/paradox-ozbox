import { $, svgEl, normal, seeded, correlation, COLORS } from '../lab.js';

const root = $('[data-sim="berkson"]');
const svg = $('[data-plot]', root);
let people = [], seed = 7;
function crowd() { const r = seeded(seed++); people = Array.from({ length: 500 }, () => [normal(r), normal(r)]); }
function draw() {
  const share = +$('[name=pick]', root).value / 100;
  $('[data-pickv]', root).textContent = `top ${Math.round(share * 100)}%`;
  const sums = people.map(([a, b]) => a + b).sort((x, y) => y - x);
  const cut = sums[Math.max(0, Math.round(share * people.length) - 1)];
  const W = 640, H = 380, L = 40, B = 34, x = v => L + (v + 3.2) / 6.4 * (W - L - 12), y = v => H - B - (v + 3.2) / 6.4 * (H - B - 12);
  svg.innerHTML = '';
  svg.append(svgEl('line', { x1: L, x2: W - 12, y1: H - B, y2: H - B, class: 'axis' }), svgEl('line', { x1: L, x2: L, y1: 12, y2: H - B, class: 'axis' }));
  const tx = svgEl('text', { x: (W + L) / 2, y: H - 8, 'text-anchor': 'middle', class: 'tick' }); tx.textContent = 'Acting talent →';
  const ty = svgEl('text', { x: 14, y: (H - B) / 2, 'text-anchor': 'middle', class: 'tick', transform: `rotate(-90 14 ${(H - B) / 2})` }); ty.textContent = 'Good looks →';
  svg.append(tx, ty);
  // the cut-off line: talent + looks = cut
  svg.append(svgEl('line', { x1: x(-3.2), y1: y(cut + 3.2), x2: x(cut + 3.2), y2: y(-3.2), stroke: '#8a84a3', 'stroke-dasharray': '5 4' }));
  const chosen = [];
  for (const p of people) {
    const ok = p[0] + p[1] >= cut; if (ok) chosen.push(p);
    svg.append(svgEl('circle', { cx: x(Math.max(-3.1, Math.min(3.1, p[0]))), cy: y(Math.max(-3.1, Math.min(3.1, p[1]))), r: ok ? 4.5 : 3.5, fill: ok ? COLORS.s1 : '#d3cfe0', stroke: ok ? '#fff' : 'none', 'stroke-width': 1.5 }));
  }
  const rAll = correlation(people.map(p => p[0]), people.map(p => p[1])), rIn = correlation(chosen.map(p => p[0]), chosen.map(p => p[1]));
  const word = r => Math.abs(r) < 0.1 ? 'no link' : r < 0 ? (r < -0.4 ? 'a strong negative link' : 'a negative link') : 'a positive link';
  $('[data-out]', root).innerHTML =
    `<div class="stat"><small>Everyone (${people.length} people)</small><b>${rAll.toFixed(2)}</b><small>correlation: ${word(rAll)}</small></div>` +
    `<div class="stat s1"><small>Only the ${chosen.length} who got cast</small><b>${rIn.toFixed(2)}</b><small>correlation: ${word(rIn)}</small></div>`;
}
$('[name=pick]', root).addEventListener('input', draw);
$('[data-new]', root).addEventListener('click', () => { crowd(); draw(); });
crowd(); draw();
