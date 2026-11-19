import { $, rand, pct, num, bars, COLORS } from '../lab.js';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const root = $('[data-sim="boy-or-girl"]');
// a family: [older, younger], each {boy, day}
const family = () => [0, 1].map(() => ({ boy: Math.random() < 0.5, day: rand(7) }));
const RULES = {
  any: { label: 'At least one is a boy', test: f => f[0].boy || f[1].boy, theory: 1 / 3 },
  older: { label: 'The older one is a boy', test: f => f[0].boy, theory: 1 / 2 },
  tuesday: { label: 'At least one is a boy born on a Tuesday', test: f => (f[0].boy && f[0].day === 1) || (f[1].boy && f[1].day === 1), theory: 13 / 27 },
  met: { label: 'You meet one child at random and it\'s a boy', test: f => f[rand(2)].boy, theory: 1 / 2 },
};
const kid = c => `<span class="kid ${c.boy ? 'b' : 'g'}">${c.boy ? 'Boy' : 'Girl'}<small>${DAYS[c.day]}</small></span>`;

let sample = [];
function drawSample() {
  const rule = RULES[$('[name=rule]', root).value];
  let shown = 0, both = 0;
  $('[data-families]', root).innerHTML = sample.map(f => {
    const ok = rule.test(f); if (ok) { shown++; if (f[0].boy && f[1].boy) both++; }
    return `<div class="fam${ok ? (f[0].boy && f[1].boy ? ' bb' : '') : ' out'}">${kid(f[0])}${kid(f[1])}</div>`;
  }).join('');
  $('[data-samplemsg]', root).innerHTML = `${shown} of these 40 families fit “${rule.label.toLowerCase()}”, and <b>${both}</b> of those have two boys.`;
}
function newSample() { sample = Array.from({ length: 40 }, family); drawSample(); }
function simulate() {
  const n = 100000, fams = Array.from({ length: n }, family);
  bars($('[data-bars]', root), Object.values(RULES).map((r, i) => {
    // the "met" rule is random per test, so evaluate it once per family
    let fit = 0, both = 0;
    for (const f of fams) if (r.test(f)) { fit++; if (f[0].boy && f[1].boy) both++; }
    return { label: r.label, value: both / fit, color: i % 2 ? COLORS.s2 : COLORS.s1, text: `${pct(both / fit)} · theory ${pct(r.theory)}`, ref: r.theory };
  }));
  $('[data-simmsg]', root).textContent = `Based on ${num(n)} random two-child families.`;
}
$('[name=rule]', root).addEventListener('change', drawSample);
$('[data-new]', root).addEventListener('click', newSample);
$('[data-run]', root).addEventListener('click', simulate);
newSample(); simulate();
