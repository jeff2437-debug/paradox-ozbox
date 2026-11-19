import { $, svgEl, COLORS } from '../lab.js';

// A simplified, top-down slow-motion view (not to scale). Screen y grows towards the archer's right.
const root = $('[data-sim="archer"]');
const svg = $('[data-scene]', root);
const LINE = 130, RISER_X = 170, REST_Y = 117, TARGET_X = 600, LEN = 150;
const SPINES = [
  { name: 'Much too stiff', k: 0.35 }, { name: 'A bit stiff', k: 0.7 }, { name: 'Matched to the bow', k: 1 },
  { name: 'A bit weak', k: 1.3 }, { name: 'Much too weak', k: 1.65 }];
const hits = [];
let raf;

function scene() {
  svg.innerHTML = '';
  svg.append(svgEl('line', { x1: 20, x2: TARGET_X, y1: LINE, y2: LINE, stroke: '#cfc9df', 'stroke-dasharray': '4 5' }));
  const aim = svgEl('text', { x: 470, y: LINE + 18, class: 'tick', 'text-anchor': 'middle' }); aim.textContent = 'line from the string to the bullseye'; svg.append(aim);
  // bow (top view): limbs as an arc, riser block below the arrow pass
  svg.append(svgEl('path', { d: `M ${RISER_X - 30} 20 Q ${RISER_X + 18} ${LINE} ${RISER_X - 30} 240`, fill: 'none', stroke: '#7a5a2b', 'stroke-width': 5 }));
  svg.append(svgEl('rect', { x: RISER_X - 8, y: REST_Y + 3, width: 22, height: 40, rx: 4, fill: '#5b4223' }));
  const rl = svgEl('text', { x: RISER_X + 22, y: REST_Y + 38, class: 'tick' }); rl.textContent = 'bow handle (riser)'; svg.append(rl);
  // target edge-on
  svg.append(svgEl('rect', { x: TARGET_X, y: LINE - 60, width: 14, height: 120, fill: '#f3efe2', stroke: '#c8bfa3' }));
  [[45, '#f2f2f2'], [32, '#2a2a2a'], [22, '#2a78d6'], [12, '#d93a2b'], [5, '#f2c200']].forEach(([h, c]) => svg.append(svgEl('rect', { x: TARGET_X, y: LINE - h, width: 6, height: 2 * h, fill: c })));
  const tl = svgEl('text', { x: TARGET_X - 6, y: LINE - 66, class: 'tick', 'text-anchor': 'end' }); tl.textContent = 'target (seen from above)'; svg.append(tl);
  for (const h of hits) svg.append(svgEl('circle', { cx: TARGET_X - 1, cy: h.y, r: 4, fill: h.color, stroke: '#fff', 'stroke-width': 1.5 }));
}
const arrowEl = () => { const g = svgEl('g'); g.append(svgEl('polyline', { fill: 'none', stroke: COLORS.s1, 'stroke-width': 3, 'stroke-linecap': 'round' }), svgEl('polygon', { fill: '#333' })); return g; };

function shoot() {
  cancelAnimationFrame(raf); scene();
  const spine = SPINES[+$('[name=spine]', root).value];
  const theta0 = Math.atan2(REST_Y - LINE, RISER_X - 40);           // aims left of the bullseye at full draw
  const missY = (1 - spine.k) * -38;                                    // where the arrow ends up on the target
  const startMid = [40 + LEN / 2 * Math.cos(theta0), LINE + LEN / 2 * Math.sin(theta0)];
  const leaveX = RISER_X + LEN / 2 + 20, leaveY = REST_Y + 2;           // the arrow's middle as its tail clears the bow
  const thetaF = Math.atan2(LINE + missY - leaveY, TARGET_X - leaveX);
  const g = arrowEl(); svg.append(g);
  const [line, head] = g.children;
  const T = 3200, t0 = performance.now();
  const ease = u => u * u * (3 - 2 * u);
  function frame(now) {
    const t = Math.min(1, (now - t0) / T);
    let mx, my, h;
    if (t < 0.3) { const u = ease(t / 0.3); mx = startMid[0] + (leaveX - startMid[0]) * u; my = startMid[1] + (leaveY - startMid[1]) * u; h = theta0 + (thetaF - theta0) * u; }
    else { const u = (t - 0.3) / 0.7; mx = leaveX + (TARGET_X - LEN / 2 - leaveX) * u; my = leaveY + Math.tan(thetaF) * (mx - leaveX); h = thetaF; }
    // first bending mode: ends and middle flex in opposite directions, decaying after release
    const amp = 13 * spine.k * Math.sin(t * Math.PI * 9) * Math.exp(-t * 2.2);
    const pts = [];
    for (let s = 0; s <= 1.0001; s += 0.05) {
      const along = (s - 0.5) * LEN, off = amp * Math.cos(2 * Math.PI * (s - 0.5));
      pts.push([mx + along * Math.cos(h) - off * Math.sin(h), my + along * Math.sin(h) + off * Math.cos(h)]);
    }
    line.setAttribute('points', pts.map(p => p.join(',')).join(' '));
    const [tx, ty] = pts[pts.length - 1], [bx, by] = pts[pts.length - 2], a = Math.atan2(ty - by, tx - bx);
    head.setAttribute('points', [[tx + 8 * Math.cos(a), ty + 8 * Math.sin(a)], [tx - 4 * Math.sin(a), ty + 4 * Math.cos(a)], [tx + 4 * Math.sin(a), ty - 4 * Math.cos(a)]].map(p => p.join(',')).join(' '));
    if (t < 1) raf = requestAnimationFrame(frame);
    else {
      hits.push({ y: LINE + missY, color: spine.k === 1 ? COLORS.s1 : COLORS.s2 }); if (hits.length > 8) hits.shift();
      scene(); svg.append(g);
      const where = Math.abs(missY) < 2 ? 'right in the middle' : missY < 0 ? 'to the left (for a right-handed archer)' : 'to the right (for a right-handed archer)';
      $('[data-msg]', root).innerHTML = `<b>${spine.name}:</b> the arrow lands ${where}.`;
    }
  }
  raf = requestAnimationFrame(frame);
}
$('[name=spine]', root).addEventListener('input', () => { $('[data-spinev]', root).textContent = SPINES[+$('[name=spine]', root).value].name; });
$('[data-shoot]', root).addEventListener('click', shoot);
$('[data-clear]', root).addEventListener('click', () => { hits.length = 0; atRest(); $('[data-msg]', root).textContent = ''; });

function atRest() {
  scene();
  const g = arrowEl(); svg.append(g);
  const theta0 = Math.atan2(REST_Y - LINE, RISER_X - 40), tip = [40 + LEN * Math.cos(theta0), LINE + LEN * Math.sin(theta0)];
  g.children[0].setAttribute('points', `40,${LINE} ${tip[0]},${tip[1]}`);
  const a = theta0; g.children[1].setAttribute('points', [[tip[0] + 8 * Math.cos(a), tip[1] + 8 * Math.sin(a)], [tip[0] - 4 * Math.sin(a), tip[1] + 4 * Math.cos(a)], [tip[0] + 4 * Math.sin(a), tip[1] - 4 * Math.cos(a)]].map(p => p.join(',')).join(' '));
  svg.append(svgEl('path', { d: `M ${RISER_X - 30} 20 L 40 ${LINE} L ${RISER_X - 30} 240`, fill: 'none', stroke: '#999', 'stroke-width': 1 }));
}
atRest();
