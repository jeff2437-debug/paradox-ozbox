import { $, num, lineChart, niceRange, COLORS } from '../lab.js';

const root = $('[data-sim="st-petersburg"]');
const money = v => '$' + num(v);
// one game: flip until the first head; heads on flip k pays $2^k
const game = () => { let k = 1; while (Math.random() < 0.5) k++; return k; };

/* ---------- play ---------- */
let played = 0, total = 0, best = 0;
$('[data-play]', root).addEventListener('click', () => {
  const k = game(), prize = 2 ** k;
  played++; total += prize; best = Math.max(best, prize);
  $('[data-flips]', root).innerHTML = 'T'.repeat(k - 1).split('').map(() => '<span class="coin T">T</span>').join('') + '<span class="coin H">H</span>';
  $('[data-msg]', root).innerHTML = `Heads on flip ${k}: you win <b>${money(prize)}</b>.`;
  $('[data-tally]', root).textContent = `${played} game${played > 1 ? 's' : ''}, average prize ${money(total / played)}, best ${money(best)}.`;
});

/* ---------- simulate ---------- */
const chart = lineChart($('[data-chart]', root), {
  series: [{ name: 'Average prize so far', short: 'Average', color: COLORS.s1 }],
  xLabel: 'Games played', label: 'Running average prize in the St Petersburg game',
  yFmt: v => '$' + (v >= 100 ? num(v) : v.toFixed(v % 1 ? 1 : 0)), tipFmt: v => '$' + v.toFixed(2),
  xTip: x => `After ${num(x)} games`, autoY: (lo, hi) => niceRange(lo, hi),
});
function run() {
  const n = +$('[name=games]', root).value, avg = new Float64Array(n);
  let sum = 0, biggest = 0;
  for (let i = 0; i < n; i++) { const p = 2 ** game(); sum += p; if (p > biggest) biggest = p; avg[i] = sum / (i + 1); }
  chart.update([Array.from(avg)], n);
  $('[data-out]', root).innerHTML =
    `<div class="stat s1"><small>Average prize</small><b>${money(sum / n)}</b><small>over ${num(n)} games</small></div>` +
    `<div class="stat"><small>Biggest single prize</small><b>${money(biggest)}</b></div>` +
    `<div class="stat"><small>Fair price, in theory</small><b>Infinite</b><small>the average never settles</small></div>`;
}
$('[data-run]', root).addEventListener('click', run);
$('[name=games]', root).addEventListener('change', run);
run();

/* ---------- a casino with a limited bank ---------- */
const bank = $('[name=bank]', root);
function fair() {
  const B = +bank.value; let ev = 0;
  for (let k = 1; k <= 200; k++) ev += Math.min(2 ** k, B) / 2 ** k;
  $('[data-fair]', root).innerHTML = `If the casino can pay out at most <b>${money(B)}</b>, the game is worth <b>${money(Math.round(ev * 100) / 100)}</b> on average.`;
}
bank.addEventListener('change', fair);
fair();
