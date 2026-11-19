import { $, svgEl, pct, num, mean, COLORS } from '../lab.js';

const root = $('[data-sim="friendship"]');
// Preferential attachment: newcomers tend to befriend people who already have many friends.
function network(n, m) {
  const adj = Array.from({ length: n }, () => new Set()), ends = [];
  for (let i = 1; i <= m; i++) for (let j = 0; j < i; j++) { adj[i].add(j); adj[j].add(i); ends.push(i, j); }
  for (let v = m + 1; v < n; v++) {
    const targets = new Set();
    while (targets.size < m) targets.add(ends[Math.floor(Math.random() * ends.length)]);
    for (const t of targets) { adj[v].add(t); adj[t].add(v); ends.push(v, t); }
  }
  return adj.map(s => [...s]);
}
function stats(adj) {
  const deg = adj.map(a => a.length);
  const friendAvg = adj.map(a => mean(a.map(j => deg[j])));
  return { avg: mean(deg), avgOfFriends: mean(friendAvg), fewer: deg.filter((d, i) => d < friendAvg[i]).length / deg.length, deg, friendAvg };
}

/* ---------- the picture ---------- */
const svg = $('[data-net]', root);
let adj, pos, info;
function layout() {
  // Fruchterman–Reingold force layout
  const n = adj.length, W = 640, H = 380, k = Math.sqrt(W * H / n) * 0.6;
  pos = adj.map(() => [W / 2 + (Math.random() - 0.5) * 300, H / 2 + (Math.random() - 0.5) * 200]);
  for (let it = 0, temp = 60; it < 400; it++, temp *= 0.985) {
    const d = pos.map(() => [0, 0]);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const dx = pos[i][0] - pos[j][0], dy = pos[i][1] - pos[j][1], dist = Math.max(0.5, Math.hypot(dx, dy)), f = k * k / dist / dist;
      d[i][0] += dx * f; d[i][1] += dy * f; d[j][0] -= dx * f; d[j][1] -= dy * f;
    }
    adj.forEach((a, i) => a.forEach(j => { if (j > i) {
      const dx = pos[i][0] - pos[j][0], dy = pos[i][1] - pos[j][1], dist = Math.max(0.5, Math.hypot(dx, dy)), f = dist / k;
      d[i][0] -= dx * f; d[i][1] -= dy * f; d[j][0] += dx * f; d[j][1] += dy * f; } }));
    pos.forEach((p, i) => {
      d[i][0] += (W / 2 - p[0]) * 0.05; d[i][1] += (H / 2 - p[1]) * 0.05;
      const m = Math.hypot(d[i][0], d[i][1]) || 1, step = Math.min(m, temp);
      p[0] += d[i][0] / m * step; p[1] += d[i][1] / m * step;
    });
  }
  // stretch the finished layout to fill the picture
  const xs = pos.map(p => p[0]), ys = pos.map(p => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  pos.forEach(p => { p[0] = 22 + (p[0] - x0) / (x1 - x0 || 1) * (W - 44); p[1] = 22 + (p[1] - y0) / (y1 - y0 || 1) * (H - 44); });
}
function draw(sel = -1) {
  svg.innerHTML = '';
  const near = new Set(sel >= 0 ? adj[sel] : []);
  adj.forEach((a, i) => a.forEach(j => { if (j > i) svg.append(svgEl('line', { x1: pos[i][0], y1: pos[i][1], x2: pos[j][0], y2: pos[j][1], stroke: (i === sel || j === sel) ? COLORS.s2 : '#d6d1e6', 'stroke-width': (i === sel || j === sel) ? 2 : 1 })); }));
  adj.forEach((a, i) => {
    const c = svgEl('circle', { cx: pos[i][0], cy: pos[i][1], r: 5 + Math.sqrt(a.length) * 2.2, fill: i === sel ? COLORS.s2 : near.has(i) ? '#f6b08f' : COLORS.s1, stroke: '#fff', 'stroke-width': 2, tabindex: 0, role: 'button', 'aria-label': `Person with ${a.length} friends` });
    c.style.cursor = 'pointer';
    c.addEventListener('click', () => pickPerson(i));
    svg.append(c);
    const t = svgEl('text', { x: pos[i][0], y: pos[i][1] + 3.5, 'text-anchor': 'middle', class: 'nodelabel' }); t.textContent = a.length; svg.append(t);
  });
}
function pickPerson(i) {
  draw(i);
  const fa = info.friendAvg[i];
  $('[data-person]', root).innerHTML = `This person has <b>${adj[i].length}</b> friend${adj[i].length > 1 ? 's' : ''}. Their friends have <b>${fa.toFixed(1)}</b> friends on average${fa > adj[i].length ? ' — more than they do.' : '.'}`;
}
function newNet() {
  adj = network(50, 1); info = stats(adj); layout(); draw();
  $('[data-person]', root).textContent = 'Tap anyone to see how many friends their friends have.';
  $('[data-small]', root).innerHTML = `In this group of 50, the average person has <b>${info.avg.toFixed(1)}</b> friends, but the average person's friends have <b>${info.avgOfFriends.toFixed(1)}</b>. <b>${pct(info.fewer, 0)}</b> of people have fewer friends than their friends do.`;
}
$('[data-new]', root).addEventListener('click', newNet);
newNet();

/* ---------- a big network ---------- */
const big = stats(network(5000, 3));
$('[data-out]', root).innerHTML =
  `<div class="stat s1"><small>Average number of friends</small><b>${big.avg.toFixed(1)}</b></div>` +
  `<div class="stat s2"><small>Average friends of your friends</small><b>${big.avgOfFriends.toFixed(1)}</b></div>` +
  `<div class="stat"><small>People with fewer friends than their friends</small><b>${pct(big.fewer, 0)}</b></div>`;
$('[data-bignote]', root).textContent = `A simulated network of ${num(5000)} people.`;
