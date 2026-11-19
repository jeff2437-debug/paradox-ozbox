import { $, rand, normal, num, bars, COLORS } from '../lab.js';

const root = $('[data-sim="benford"]');
const BENFORD = Array.from({ length: 9 }, (_, i) => Math.log10(1 + 1 / (i + 1)));
const lead = x => { const s = typeof x === 'bigint' ? x.toString() : Math.abs(x).toExponential(); return +s[0]; };
const DATA = {
  powers: () => { const a = []; let v = 1n; for (let i = 1; i <= 1000; i++) { v *= 2n; a.push(v); } return a; },
  fib: () => { const a = []; let x = 1n, y = 1n; for (let i = 0; i < 1000; i++) { a.push(x); [x, y] = [y, x + y]; } return a; },
  growth: () => Array.from({ length: 4000 }, () => { let p = 100 + Math.random() * 900; const years = rand(300); for (let y = 0; y < years; y++) p *= 1 + Math.random() * 0.1; return p; }),
  products: () => Array.from({ length: 5000 }, () => { let p = 1; for (let k = 0; k < 4; k++) p *= 1 + Math.random() * 9; return p; }),
  uniform: () => Array.from({ length: 5000 }, () => 1 + rand(999)),
  heights: () => Array.from({ length: 5000 }, () => 170 + 9 * normal()),
};
function show(values, label) {
  const counts = new Array(9).fill(0); let n = 0;
  for (const v of values) { const d = lead(v); if (d >= 1 && d <= 9) { counts[d - 1]++; n++; } }
  if (!n) { $('[data-msg]', root).textContent = 'No usable numbers found. Paste some positive numbers, separated by spaces, commas or new lines.'; return; }
  bars($('[data-bars]', root), counts.map((c, i) => ({
    label: `Starts with ${i + 1}`, value: c / n / 0.35, ref: BENFORD[i] / 0.35, color: COLORS.s1,
    text: `${(c / n * 100).toFixed(1)}% · Benford ${(BENFORD[i] * 100).toFixed(1)}%`,
  })));
  // mean absolute deviation from Benford, a common conformity check
  const mad = counts.reduce((s, c, i) => s + Math.abs(c / n - BENFORD[i]), 0) / 9;
  const verdict = mad < 0.006 ? 'a close fit to Benford\'s law' : mad < 0.015 ? 'a rough fit to Benford\'s law' : 'not following Benford\'s law';
  $('[data-msg]', root).innerHTML = `${label}: ${num(n)} numbers, <b>${verdict}</b> (average gap ${(mad * 100).toFixed(1)} percentage points per digit).`;
}
const pick = $('[name=data]', root);
const run = () => show(DATA[pick.value](), pick.selectedOptions[0].textContent);
pick.addEventListener('change', run);
$('[data-run]', root).addEventListener('click', run);
$('[data-mine]', root).addEventListener('click', () => {
  const vals = ($('[name=mine]', root).value.match(/\d[\d,]*\.?\d*(e[+-]?\d+)?/gi) || []).map(s => parseFloat(s.replace(/,/g, ''))).filter(v => v > 0);
  show(vals, 'Your numbers');
});
run();
