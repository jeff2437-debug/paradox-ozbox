import { $, svgEl, num, COLORS } from '../lab.js';

const root = $('[data-sim="inspection"]');
const PATTERNS = {
  clockwork: { gap: () => 10, theory: 5 },
  irregular: { gap: () => 2 + Math.random() * 16, theory: (16 ** 2 / 12 + 100) / 20 },
  bunched: { gap: i => (i % 2 ? 18 : 2), theory: (4 + 324) / 2 / 20 },
  random: { gap: () => -10 * Math.log(1 - Math.random()), theory: 10 },
};
function run() {
  const pat = PATTERNS[$('[name=pattern]', root).value];
  // buses over a long day
  const buses = [0]; let i = 0;
  while (buses[buses.length - 1] < 100000) buses.push(buses[buses.length - 1] + pat.gap(i++));
  const end = buses[buses.length - 1];
  // passengers arrive at uniformly random times
  let wait = 0, gapSeen = 0; const n = 20000, sample = [];
  for (let p = 0; p < n; p++) {
    const t = Math.random() * end;
    let lo = 0, hi = buses.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (buses[m] <= t) lo = m; else hi = m; }
    wait += buses[hi] - t; gapSeen += buses[hi] - buses[lo];
    if (t < 180 && sample.length < 40) sample.push([t, buses[hi]]);
  }
  // timeline picture of the first three hours
  const svg = $('[data-timeline]', root); svg.innerHTML = '';
  const W = 640, x = t => 20 + t / 180 * (W - 40);
  svg.append(svgEl('line', { x1: 20, x2: W - 20, y1: 60, y2: 60, class: 'axis' }));
  for (let h = 0; h <= 180; h += 30) { const t = svgEl('text', { x: x(h), y: 92, 'text-anchor': 'middle', class: 'tick' }); t.textContent = h ? `${h} min` : 'Start'; svg.append(t); }
  for (const b of buses) if (b <= 180) svg.append(svgEl('rect', { x: x(b) - 3, y: 44, width: 6, height: 32, rx: 2, fill: COLORS.s1 }));
  sample.sort((a, b) => a[0] - b[0]).forEach(([t, b], k) => {
    const y = 36 - (k % 4) * 8;
    svg.append(svgEl('line', { x1: x(t), x2: x(b), y1: y, y2: y, stroke: COLORS.s2, 'stroke-width': 1.5, opacity: 0.6 }));
    svg.append(svgEl('circle', { cx: x(t), cy: y, r: 3, fill: COLORS.s2 }));
  });
  $('[data-out]', root).innerHTML =
    `<div class="stat s1"><small>Average time between buses</small><b>${((end) / (buses.length - 1)).toFixed(1)} min</b></div>` +
    `<div class="stat s2"><small>Average wait at the stop</small><b>${(wait / n).toFixed(1)} min</b><small>theory ${pat.theory.toFixed(1)} min</small></div>` +
    `<div class="stat"><small>Average gap a passenger lands in</small><b>${(gapSeen / n).toFixed(1)} min</b></div>`;
  $('[data-note]', root).textContent = `Simulated ${num(buses.length)} buses and ${num(n)} passengers turning up at random times.`;
}
$('[name=pattern]', root).addEventListener('change', run);
$('[data-run]', root).addEventListener('click', run);
run();
