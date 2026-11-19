import { $, svgEl, num, COLORS } from '../lab.js';

// Classic network: Start→A takes cars/100 minutes, A→End 45 min, Start→B 45 min, B→End cars/100 minutes,
// optional shortcut A→B taking 0 minutes. Each driver picks the fastest route given everyone else (equilibrium).
const root = $('[data-sim="braess"]');
const svg = $('[data-net]', root);
function equilibrium(N, shortcut) {
  if (!shortcut || N >= 9000) return { p: N / 2, q: N / 2, r: 0, time: N / 200 + 45 };
  if (N <= 4500) return { p: 0, q: 0, r: N, time: 2 * N / 100 };
  const r = 9000 - N; return { p: N - 4500, q: N - 4500, r, time: 90 };
}
const P = { S: [60, 150], A: [320, 40], B: [320, 260], E: [580, 150] };
function road(a, b, cars, label, max) {
  const [x1, y1] = P[a], [x2, y2] = P[b], w = 2 + 14 * cars / max;
  svg.append(svgEl('line', { x1, y1, x2, y2, stroke: cars > 0 ? COLORS.s1 : '#d6d1e6', 'stroke-width': w, 'stroke-linecap': 'round', opacity: 0.85 }));
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const t = svgEl('text', { x: mx + (a === 'A' && b === 'B' ? 14 : 0), y: my + (y2 > y1 ? 24 : -16) * (a === 'A' && b === 'B' ? 0 : 1), 'text-anchor': a === 'A' && b === 'B' ? 'start' : 'middle', class: 'roadlabel' });
  t.textContent = `${label} · ${num(cars)} cars`; svg.append(t);
}
function draw() {
  const N = +$('[name=cars]', root).value, open = $('[name=shortcut]', root).checked;
  $('[data-carsv]', root).textContent = num(N);
  const eq = equilibrium(N, open), closed = equilibrium(N, false);
  const a = eq.p + eq.r, b = eq.q + eq.r;
  svg.innerHTML = '';
  road('S', 'A', a, `${(a / 100).toFixed(0)} min (busy road)`, N);
  road('A', 'E', eq.p, '45 min', N);
  road('S', 'B', eq.q, '45 min', N);
  road('B', 'E', b, `${(b / 100).toFixed(0)} min (busy road)`, N);
  if (open) road('A', 'B', eq.r, 'shortcut, 0 min', N);
  for (const [k, [x, y]] of Object.entries(P)) {
    svg.append(svgEl('circle', { cx: x, cy: y, r: 21, fill: '#3a2391' }));
    const t = svgEl('text', { x, y: y + 4, 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 11 }); t.textContent = { S: 'Start', A: 'A', B: 'B', E: 'End' }[k]; svg.append(t);
  }
  $('[data-out]', root).innerHTML =
    `<div class="stat"><small>Everyone's trip without the shortcut</small><b>${closed.time.toFixed(0)} min</b></div>` +
    `<div class="stat ${open ? 's1' : ''}"><small>Everyone's trip ${open ? 'with' : 'if you open'} the shortcut</small><b>${equilibrium(N, true).time.toFixed(0)} min</b></div>`;
  const worse = equilibrium(N, true).time - closed.time;
  $('[data-msg]', root).innerHTML = worse > 0.5
    ? `<b>Paradox:</b> opening a free shortcut makes every single trip <b>${worse.toFixed(0)} minutes slower</b>.`
    : worse < -0.5 ? `With this little traffic, the shortcut genuinely helps: trips are ${(-worse).toFixed(0)} minutes faster.` : 'With this much traffic, the shortcut makes no difference.';
}
root.addEventListener('input', draw);
draw();
