import { $, mean } from '../lab.js';

const root = $('[data-sim="will-rogers"]');
const START = { A: [50, 60, 70, 80, 90], B: [10, 20, 30, 40] };
let groups;
const fmt = v => v.toFixed(1).replace(/\.0$/, '');
function draw() {
  for (const g of ['A', 'B']) {
    const box = $(`[data-group=${g}]`, root);
    box.innerHTML = groups[g].slice().sort((a, b) => a - b).map(v => `<button type="button" class="chip num-chip" data-v="${v}" data-from="${g}">${v}</button>`).join('');
    const m = mean(groups[g]), m0 = mean(START[g]), d = m - m0;
    $(`[data-avg=${g}]`, root).innerHTML = groups[g].length ? `Average <b>${fmt(m)}</b>${Math.abs(d) > 1e-9 ? ` <span class="${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${fmt(Math.abs(d))}</span>` : ''}` : 'Empty';
  }
  const all = mean([...groups.A, ...groups.B]), upA = mean(groups.A) > mean(START.A) + 1e-9, upB = mean(groups.B) > mean(START.B) + 1e-9;
  $('[data-msg]', root).innerHTML = upA && upB
    ? `<b>Both averages went up</b>, yet nobody's score changed and the overall average is still ${fmt(all)}.`
    : `Overall average: ${fmt(all)}. Move a number so that <b>both</b> group averages rise.`;
}
root.addEventListener('click', e => {
  const b = e.target.closest('[data-v]'); if (!b) return;
  const from = b.dataset.from, to = from === 'A' ? 'B' : 'A', v = +b.dataset.v;
  if (groups[from].length === 1) return;
  groups[from].splice(groups[from].indexOf(v), 1); groups[to].push(v); draw();
});
$('[data-reset]', root).addEventListener('click', () => { groups = { A: [...START.A], B: [...START.B] }; draw(); });
groups = { A: [...START.A], B: [...START.B] }; draw();
