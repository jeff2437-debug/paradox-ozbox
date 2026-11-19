import { $, lineChart, niceRange, COLORS } from '../lab.js';

const root = $('[data-sim="parrondo"]');
const EPS = 0.005;
// Game A: a slightly unfair coin. Game B: depends on whether your money is a multiple of 3.
const playA = c => c + (Math.random() < 0.5 - EPS ? 1 : -1);
const playB = c => c + (Math.random() < (((c % 3) + 3) % 3 === 0 ? 0.1 - EPS : 0.75 - EPS) ? 1 : -1);
const STRATS = [
  { name: 'Only game A', short: 'A', color: COLORS.s1, pick: () => playA },
  { name: 'Only game B', short: 'B', color: COLORS.s2, pick: () => playB },
  { name: 'A and B at random', short: 'Random', color: COLORS.s3, pick: () => Math.random() < 0.5 ? playA : playB },
  { name: 'A, A, B, B, repeat', short: 'AABB', color: COLORS.s4, pick: t => (t % 4 < 2 ? playA : playB) },
];
const chart = lineChart($('[data-chart]', root), {
  series: STRATS, xLabel: 'Rounds played', label: 'Average winnings for four ways of playing Parrondo\'s games',
  yFmt: v => (v > 0 ? '+' : '') + (Number.isInteger(v) ? v : v.toFixed(1)), tipFmt: v => (v > 0 ? '+' : '') + v.toFixed(2),
  xTip: x => `After ${x} rounds`, autoY: (lo, hi) => niceRange(lo, hi), refs: [{ y: 0 }],
});
function run() {
  const rounds = +$('[name=rounds]', root).value, players = 2000;
  const out = STRATS.map(s => {
    const sum = new Float64Array(rounds);
    for (let p = 0; p < players; p++) {
      let c = 0;
      for (let t = 0; t < rounds; t++) { c = s.pick(t)(c); sum[t] += c; }
    }
    return Array.from(sum, v => v / players);
  });
  chart.update(out, rounds);
  $('[data-out]', root).innerHTML = STRATS.map((s, i) => {
    const v = out[i][rounds - 1];
    return `<div class="stat" style="border-top:4px solid ${s.color}"><small>${s.name}</small><b>${v > 0 ? '+' : ''}$${v.toFixed(2)}</b><small>${v > 0 ? 'winning' : 'losing'}</small></div>`;
  }).join('');
}
$('[data-run]', root).addEventListener('click', run);
$('[name=rounds]', root).addEventListener('change', run);
run();
