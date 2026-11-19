import { $, svgEl, normal, mean, bars, COLORS } from '../lab.js';

const root = $('[data-sim="regression"]');
const svg = $('[data-plot]', root);
let skill = [], luck1 = [], luck2 = [];
function newClass() { skill = Array.from({ length: 1000 }, () => normal()); luck1 = skill.map(() => normal()); luck2 = skill.map(() => normal()); }
const score = (s, l, share) => Math.max(0, Math.min(100, 60 + 12 * (Math.sqrt(1 - share) * s + Math.sqrt(share) * l)));
function draw() {
  const share = +$('[name=luck]', root).value / 100;
  $('[data-luckv]', root).textContent = `${Math.round(share * 100)}% luck, ${Math.round((1 - share) * 100)}% skill`;
  const t1 = skill.map((s, i) => score(s, luck1[i], share)), t2 = skill.map((s, i) => score(s, luck2[i], share));
  const order = t1.map((v, i) => i).sort((a, b) => t1[b] - t1[a]);
  const top = order.slice(0, 100), bottom = order.slice(-100);
  const avg = (arr, ids) => mean(ids.map(i => arr[i]));
  bars($('[data-bars]', root), [
    { label: 'Top 10%: test 1', value: avg(t1, top) / 100, color: COLORS.s1, text: avg(t1, top).toFixed(1) },
    { label: 'Top 10%: test 2', value: avg(t2, top) / 100, color: COLORS.s1, text: avg(t2, top).toFixed(1) },
    { label: 'Bottom 10%: test 1', value: avg(t1, bottom) / 100, color: COLORS.s2, text: avg(t1, bottom).toFixed(1) },
    { label: 'Bottom 10%: test 2', value: avg(t2, bottom) / 100, color: COLORS.s2, text: avg(t2, bottom).toFixed(1) }]);
  const W = 640, H = 340, L = 44, B = 34, x = v => L + v / 100 * (W - L - 12), y = v => H - B - v / 100 * (H - B - 12);
  svg.innerHTML = '';
  for (const v of [0, 25, 50, 75, 100]) {
    svg.append(svgEl('line', { x1: L, x2: W - 12, y1: y(v), y2: y(v), class: v ? 'grid' : 'axis' }));
    const t = svgEl('text', { x: L - 6, y: y(v) + 4, 'text-anchor': 'end', class: 'tick' }); t.textContent = v; svg.append(t);
    const u = svgEl('text', { x: x(v), y: H - B + 16, 'text-anchor': 'middle', class: 'tick' }); u.textContent = v; svg.append(u);
  }
  const tx = svgEl('text', { x: (W + L) / 2, y: H - 4, 'text-anchor': 'middle', class: 'tick' }); tx.textContent = 'Test 1 score';
  const ty = svgEl('text', { x: 12, y: (H - B) / 2, 'text-anchor': 'middle', class: 'tick', transform: `rotate(-90 12 ${(H - B) / 2})` }); ty.textContent = 'Test 2 score';
  svg.append(tx, ty, svgEl('line', { x1: x(0), y1: y(0), x2: x(100), y2: y(100), stroke: '#8a84a3', 'stroke-dasharray': '5 4' }));
  const topSet = new Set(top), botSet = new Set(bottom);
  t1.forEach((v, i) => svg.append(svgEl('circle', { cx: x(v), cy: y(t2[i]), r: topSet.has(i) || botSet.has(i) ? 3.5 : 2.5, fill: topSet.has(i) ? COLORS.s1 : botSet.has(i) ? COLORS.s2 : '#d3cfe0' })));
}
$('[name=luck]', root).addEventListener('input', draw);
$('[data-new]', root).addEventListener('click', () => { newClass(); draw(); });
newClass(); draw();
