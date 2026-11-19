import { $, svgEl, COLORS } from '../lab.js';

const root = $('[data-sim="zeno"]');
const svg = $('[data-track]', root);
const VA = 10, VT = 1, HEAD = 100, MAXX = 130;
let step = 0, raf;
const x = m => 30 + m / MAXX * 580;
const dist = m => m >= 1 ? m.toFixed(2) + ' m' : m >= 0.01 ? (m * 100).toPrecision(3) + ' cm' : m >= 1e-5 ? (m * 1000).toPrecision(3) + ' mm' : m > 0 ? (m * 1e6).toPrecision(3) + ' µm' : '0 m';
function draw(a, t, tm) {
  svg.innerHTML = '';
  svg.append(svgEl('line', { x1: x(0), x2: x(MAXX), y1: 70, y2: 70, stroke: '#cfc9df', 'stroke-width': 2 }));
  for (let m = 0; m <= MAXX; m += 10) { const tx = svgEl('text', { x: x(m), y: 92, 'text-anchor': 'middle', class: 'tick' }); tx.textContent = m + ' m'; svg.append(tx); }
  svg.append(svgEl('line', { x1: x(1000 / 9), x2: x(1000 / 9), y1: 20, y2: 76, stroke: '#8a84a3', 'stroke-dasharray': '3 3' }));
  const c = svgEl('text', { x: x(1000 / 9) + 4, y: 18, class: 'tick' }); c.textContent = 'catch-up point'; svg.append(c);
  const A = svgEl('text', { x: x(a), y: 62, 'text-anchor': 'middle', 'font-size': 22 }); A.textContent = '🏃';
  const T = svgEl('text', { x: x(t), y: 62, 'text-anchor': 'middle', 'font-size': 22 }); T.textContent = '🐢';
  svg.append(A, T);
  $('[data-now]', root).innerHTML = `Time <b>${tm.toFixed(tm < 11 ? 4 : 2)} s</b> · Achilles at <b>${a.toFixed(4)} m</b> · tortoise at <b>${t.toFixed(4)} m</b> · gap <b>${dist(Math.max(0, t - a))}</b>`;
}
function reset() { cancelAnimationFrame(raf); step = 0; $('[data-steps]', root).innerHTML = ''; draw(0, HEAD, 0); $('[data-msg]', root).textContent = ''; }
function zenoStep() {
  cancelAnimationFrame(raf);
  step++;
  // after n steps: time = sum of 10 * (1/10)^k, Achilles at the tortoise's previous spot
  let time = 0; for (let k = 0; k < step; k++) time += 10 * 0.1 ** k;
  const a = VA * time, t = HEAD + VT * time;
  draw(a, t, time);
  $('[data-steps]', root).insertAdjacentHTML('beforeend', `<tr><td>${step}</td><td class="n">${(10 * 0.1 ** (step - 1)).toPrecision(3)} s</td><td class="n">${a.toFixed(6)} m</td><td class="n">${dist(t - a)}</td></tr>`);
  $('[data-msg]', root).innerHTML = step < 6 ? 'Achilles reaches where the tortoise was, but it has crept a little further on. Keep going…'
    : `After ${step} steps the gap is ${dist(t - a)}, and the total time is creeping towards 11.111… seconds, never past it. Infinitely many steps, finite time.`;
}
function race() {
  cancelAnimationFrame(raf);
  const t0 = performance.now(), dur = 15;
  const frame = now => {
    const tm = Math.min(dur, (now - t0) / 1000 * 1.5);
    draw(Math.min(VA * tm, MAXX), Math.min(HEAD + VT * tm, MAXX), tm);
    if (tm >= 100 / 9) $('[data-msg]', root).innerHTML = 'In real motion, Achilles simply overtakes the tortoise at <b>111.1 m, after 11.11 seconds</b>.';
    if (tm < dur) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
}
$('[data-step]', root).addEventListener('click', zenoStep);
$('[data-race]', root).addEventListener('click', race);
$('[data-reset]', root).addEventListener('click', reset);
reset();
