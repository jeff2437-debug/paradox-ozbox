// Shared helpers for the paradox simulators (no dependencies).
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const rand = n => Math.floor(Math.random() * n);
export const pct = (v, dp = 1) => (isFinite(v) ? (v * 100).toFixed(dp) : '–') + '%';
export const num = v => Math.round(v).toLocaleString('en-AU');
export const COLORS = { s1: '#2a78d6', s2: '#eb6834' };

/** Run `total` steps of `step(i)` spread over animation frames, calling `frame()` after each batch. */
export function animate(total, step, frame, done, ms = 1600) {
  const perFrame = Math.max(1, Math.ceil(total / (ms / 16)));
  let i = 0, stopped = false;
  const tick = () => {
    if (stopped) return;
    const end = Math.min(total, i + perFrame);
    for (; i < end; i++) step(i);
    frame(i);
    if (i < total) requestAnimationFrame(tick); else done && done();
  };
  requestAnimationFrame(tick);
  return () => { stopped = true; };
}

/** Horizontal bars. items: [{label, value (0-1), color, text}] */
export function bars(box, items) {
  box.innerHTML = items.map(it => `<div class="bar"><span class="bl">${it.label}</span>` +
    `<span class="track"><i style="width:${Math.max(0, Math.min(1, it.value)) * 100}%;background:${it.color}"></i>` +
    (it.ref != null ? `<u style="left:${it.ref * 100}%" title="Theory"></u>` : '') +
    `</span><b>${it.text}</b></div>`).join('');
}

export const NS = 'http://www.w3.org/2000/svg';
export const svgEl = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

/**
 * Line chart with hover crosshair. Values are indexed from x = 1.
 * opts: { series:[{name,color}], yMax=1, yFmt, xFmt, xLabel, refs:[{y,label,color}], marker }
 * returns { update(arrays, xMax), setRefs(refs), setMarker(i) }
 */
export function lineChart(box, opts) {
  const W = 640, H = 250, L = 46, R = 112, T = 14, B = 34;
  const yMax = opts.yMax ?? 1, yFmt = opts.yFmt ?? (v => Math.round(v * 100) + '%'), xFmt = opts.xFmt ?? (v => num(v));
  box.classList.add('chart');
  box.innerHTML = (opts.series.length > 1 ? `<div class="legend">${opts.series.map(s => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join('')}</div>` : '') +
    `<div class="plot"></div><div class="tip" hidden></div>`;
  const plot = box.querySelector('.plot'), tip = box.querySelector('.tip');
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': opts.label || 'Chart' });
  plot.appendChild(svg);
  const gGrid = svgEl('g'), gRefs = svgEl('g'), gLines = svgEl('g'), gLabels = svgEl('g'), gHover = svgEl('g', { visibility: 'hidden' });
  svg.append(gGrid, gRefs, gLines, gLabels, gHover);
  const pw = W - L - R, ph = H - T - B;
  const ys = v => T + ph - (v / yMax) * ph;
  for (let k = 0; k <= 4; k++) {
    const v = yMax * k / 4, y = ys(v);
    gGrid.append(svgEl('line', { x1: L, x2: L + pw, y1: y, y2: y, class: k ? 'grid' : 'axis' }));
    const t = svgEl('text', { x: L - 6, y: y + 4, 'text-anchor': 'end', class: 'tick' }); t.textContent = yFmt(v); gGrid.append(t);
  }
  const xTitle = svgEl('text', { x: L + pw / 2, y: H - 4, 'text-anchor': 'middle', class: 'tick' }); xTitle.textContent = opts.xLabel || ''; gGrid.append(xTitle);
  const xTicks = svgEl('g'); gGrid.append(xTicks);
  const paths = opts.series.map(s => { const p = svgEl('path', { fill: 'none', stroke: s.color, 'stroke-width': 2, 'stroke-linejoin': 'round' }); gLines.append(p); return p; });
  const cross = svgEl('line', { y1: T, y2: T + ph, class: 'cross' }); gHover.append(cross);
  const dots = opts.series.map(s => { const c = svgEl('circle', { r: 4.5, fill: s.color, stroke: '#fff', 'stroke-width': 2 }); gHover.append(c); return c; });
  const mark = svgEl('g', { visibility: 'hidden' }); svg.append(mark);
  const markLine = svgEl('line', { y1: T, y2: T + ph, class: 'mark' }), markDot = svgEl('circle', { r: 5, fill: opts.series[0].color, stroke: '#fff', 'stroke-width': 2 });
  mark.append(markLine, markDot);
  let data = opts.series.map(() => []), xMax = 1;
  const xs = x => L + (xMax <= 1 ? 0 : (x - 1) / (xMax - 1)) * pw;

  function drawRefs(refs = []) {
    gRefs.innerHTML = '';
    for (const r of refs) {
      const y = ys(r.y);
      gRefs.append(svgEl('line', { x1: L, x2: L + pw, y1: y, y2: y, stroke: r.color || '#8a84a3', 'stroke-dasharray': '5 4', 'stroke-width': 1.5 }));
    }
  }
  function update(arrays, newMax) {
    data = arrays; xMax = newMax || Math.max(1, ...arrays.map(a => a.length));
    xTicks.innerHTML = '';
    for (const x of niceTicks(xMax)) {
      const t = svgEl('text', { x: xs(x), y: T + ph + 16, 'text-anchor': 'middle', class: 'tick' }); t.textContent = xFmt(x); xTicks.append(t);
    }
    gLabels.innerHTML = '';
    const ends = [];
    arrays.forEach((a, si) => {
      const n = a.length, step = Math.max(1, Math.floor(n / 400));
      let d = '';
      for (let i = 0; i < n; i += step) d += (d ? 'L' : 'M') + xs(i + 1).toFixed(1) + ',' + ys(a[i]).toFixed(1);
      if (n && (n - 1) % step) d += 'L' + xs(n).toFixed(1) + ',' + ys(a[n - 1]).toFixed(1);
      paths[si].setAttribute('d', d);
      if (n) ends.push({ y: ys(a[n - 1]), x: xs(n), si, v: a[n - 1] });
    });
    ends.sort((a, b) => a.y - b.y);
    for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 15) ends[i].y = ends[i - 1].y + 15;
    for (const e of ends) {
      const s = opts.series[e.si];
      gLabels.append(svgEl('circle', { cx: L + pw + 8, cy: e.y - 4, r: 4, fill: s.color }));
      const t = svgEl('text', { x: L + pw + 16, y: e.y, class: 'end' }); t.textContent = `${s.short ?? s.name} ${yFmt(e.v)}`.trim(); gLabels.append(t);
    }
  }
  function setMarker(i) {
    const a = data[0];
    if (!a || i < 1 || i > a.length) { mark.setAttribute('visibility', 'hidden'); return; }
    mark.setAttribute('visibility', 'visible');
    markLine.setAttribute('x1', xs(i)); markLine.setAttribute('x2', xs(i));
    markDot.setAttribute('cx', xs(i)); markDot.setAttribute('cy', ys(a[i - 1]));
  }
  svg.addEventListener('pointermove', e => {
    const n = Math.max(...data.map(a => a.length)); if (!n) return;
    const r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W;
    const x = Math.min(n, Math.max(1, Math.round(1 + (px - L) / pw * (xMax - 1))));
    gHover.setAttribute('visibility', 'visible');
    cross.setAttribute('x1', xs(x)); cross.setAttribute('x2', xs(x));
    dots.forEach((c, si) => { const v = data[si][x - 1]; c.setAttribute('cx', xs(x)); c.setAttribute('cy', v == null ? -99 : ys(v)); });
    tip.hidden = false;
    tip.innerHTML = `<b>${opts.xTip ? opts.xTip(x) : (opts.xLabel || 'x') + ': ' + xFmt(x)}</b>` + opts.series.map((s, si) => data[si][x - 1] == null ? '' :
      `<span><i style="background:${s.color}"></i>${s.name}: ${opts.tipFmt ? opts.tipFmt(data[si][x - 1]) : yFmt(data[si][x - 1])}</span>`).join('');
    const left = xs(x) / W * r.width;
    tip.style.left = Math.min(r.width - tip.offsetWidth - 4, Math.max(4, left + 12)) + 'px';
  });
  svg.addEventListener('pointerleave', () => { gHover.setAttribute('visibility', 'hidden'); tip.hidden = true; });
  drawRefs(opts.refs);
  return { update, setRefs: drawRefs, setMarker };
}

function niceTicks(max) {
  if (max <= 1) return [1];
  const raw = max / 4, mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw);
  const out = [1];
  for (let v = step; v <= max; v += step) out.push(v);
  return out.filter((v, i, a) => i === 0 || v - a[i - 1] >= step * 0.6);
}

/** Seeded random generator (mulberry32), for repeatable pictures. */
export function seeded(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
/** Standard normal random number (Box–Muller). */
export const normal = (r = Math.random) => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
export const mean = a => a.reduce((s, x) => s + x, 0) / (a.length || 1);
export function correlation(xs, ys) {
  const mx = mean(xs), my = mean(ys); let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < xs.length; i++) { const dx = xs[i] - mx, dy = ys[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxy / Math.sqrt(sxx * syy);
}
