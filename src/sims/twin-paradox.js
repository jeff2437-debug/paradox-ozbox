import { $, svgEl, num, COLORS } from '../lab.js';

const root = $('[data-sim="twin"]');
const SPEEDS = [10, 50, 80, 90, 95, 99, 99.5, 99.9, 99.99];
const svg = $('[data-trip]', root);
let raf;
const yrs = v => v >= 100 ? num(v) : v.toFixed(v < 10 ? 2 : 1);
function figures() {
  const v = SPEEDS[+$('[name=speed]', root).value] / 100, d = +$('[name=dest]', root).value;
  const earth = 2 * d / v, gamma = 1 / Math.sqrt(1 - v * v), ship = earth / gamma;
  return { v, d, earth, ship, gamma };
}
function show() {
  const f = figures();
  $('[data-speedv]', root).textContent = `${SPEEDS[+$('[name=speed]', root).value]}% of the speed of light`;
  $('[data-out]', root).innerHTML =
    `<div class="stat s1"><small>Time passed on Earth</small><b>${yrs(f.earth)} years</b><small>stay-at-home twin is now ${yrs(30 + f.earth)}</small></div>` +
    `<div class="stat s2"><small>Time passed on the ship</small><b>${yrs(f.ship)} years</b><small>travelling twin is now ${yrs(30 + f.ship)}</small></div>` +
    `<div class="stat"><small>Time slows on the ship by a factor of</small><b>${f.gamma < 10 ? f.gamma.toFixed(2) : num(f.gamma)}</b></div>`;
}
function fly() {
  cancelAnimationFrame(raf); show();
  const f = figures(), T = 4000, t0 = performance.now();
  svg.innerHTML = '';
  svg.append(svgEl('line', { x1: 60, x2: 580, y1: 70, y2: 70, stroke: '#cfc9df', 'stroke-dasharray': '4 5' }));
  svg.append(svgEl('circle', { cx: 50, cy: 70, r: 14, fill: COLORS.s1 }), svgEl('circle', { cx: 590, cy: 70, r: 10, fill: '#eda100' }));
  const e = svgEl('text', { x: 50, y: 104, 'text-anchor': 'middle', class: 'tick' }); e.textContent = 'Earth';
  const s = svgEl('text', { x: 590, y: 104, 'text-anchor': 'middle', class: 'tick' }); s.textContent = $('[name=dest]', root).selectedOptions[0].textContent.split(' (')[0];
  const ship = svgEl('text', { x: 60, y: 76, 'text-anchor': 'middle', 'font-size': 20 }); ship.textContent = '🚀';
  const cE = svgEl('text', { x: 50, y: 30, 'text-anchor': 'middle', class: 'clock' }), cS = svgEl('text', { x: 60, y: 52, 'text-anchor': 'middle', class: 'clock' });
  svg.append(e, s, ship, cE, cS);
  function frame(now) {
    const t = Math.min(1, (now - t0) / T), pos = t < 0.5 ? t * 2 : 2 - t * 2;
    const x = 64 + pos * 512;
    ship.setAttribute('x', x); ship.setAttribute('transform', t < 0.5 ? '' : `scale(-1,1) translate(${-2 * x},0)`);
    cS.setAttribute('x', x);
    cE.textContent = `Earth clock: ${yrs(f.earth * t)} yr`; cS.textContent = `Ship clock: ${yrs(f.ship * t)} yr`;
    if (t < 1) raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
}
$('[name=speed]', root).addEventListener('input', show);
$('[name=dest]', root).addEventListener('change', show);
$('[data-fly]', root).addEventListener('click', fly);
fly();
