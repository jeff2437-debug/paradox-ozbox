import { $, $$, svgEl, seeded } from '../lab.js';

const root = $('[data-sim="theseus"]');
const N = 60;
const order = (() => { const r = seeded(11), a = Array.from({ length: N }, (_, i) => i); for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
let replaced = 0, answerChange = null, lastAnswer = 'yes';

function ship(svg, newSet, allOld = false) {
  svg.innerHTML = '';
  svg.append(svgEl('line', { x1: 300, y1: 20, x2: 300, y2: 110, stroke: '#6b4b22', 'stroke-width': 4 }));
  svg.append(svgEl('path', { d: 'M302 26 L380 100 L302 100 Z', fill: '#f4efe2', stroke: '#c8bfa3' }));
  // hull: 4 rows of 15 planks, narrowing towards the keel
  for (let row = 0; row < 4; row++) for (let c = 0; c < 15; c++) {
    const i = row * 15 + c, inset = row * 22, w = (440 - 2 * inset) / 15, x = 80 + inset + c * w, y = 112 + row * 20;
    const isNew = !allOld && newSet.has(i);
    svg.append(svgEl('rect', { x: x + 1, y, width: w - 2, height: 18, rx: 2, fill: isNew ? '#e8c27a' : '#6b4b22', stroke: isNew ? '#b98b3a' : '#4a3216' }));
  }
}
function draw() {
  const newSet = new Set(order.slice(0, replaced));
  ship($('[data-ship]', root), newSet);
  $('[data-count]', root).textContent = `${replaced} of ${N} planks replaced`;
  $('[name=planks]', root).value = replaced;
  $('[data-twist]', root).hidden = replaced < N;
}
function setPlanks(v) { replaced = v; draw(); }
$('[name=planks]', root).addEventListener('input', e => setPlanks(+e.target.value));
$('[data-one]', root).addEventListener('click', () => setPlanks(Math.min(N, replaced + 1)));
$$('[data-same]', root).forEach(b => b.addEventListener('click', () => {
  const a = b.dataset.same;
  if (a !== lastAnswer) { answerChange = replaced; lastAnswer = a; }
  $('[data-verdict]', root).innerHTML = a === 'yes'
    ? `You say it's <b>still the Ship of Theseus</b> with ${replaced} new planks.`
    : `You say it <b>stopped being the Ship of Theseus</b>${answerChange != null ? ` somewhere around ${answerChange} new planks` : ''}. Which single plank made the difference?`;
}));
$('[data-rebuild]', root).addEventListener('click', () => {
  ship($('[data-ship2]', root), new Set(), true);
  $('[data-second]', root).hidden = false;
});
const VIEWS = {
  repaired: 'You value <b>continuity</b>: the ship changed gradually while always staying in use, like a person whose cells are replaced over the years. Most legal systems would agree: ownership stays with the repaired ship.',
  rebuilt: 'You value <b>the original material</b>: the identity lives in the planks themselves. This is the view of anyone who prizes an antique for being "all original".',
  both: 'You think the question has <b>more than one right answer</b> depending on what we mean by "same": same in material, or same in history and function. Many philosophers say the puzzle shows our word "same" covers several different ideas.',
  neither: 'You think neither ship has a perfect claim, so <b>"the" Ship of Theseus no longer exists</b> once its story splits in two. A tidy answer, though it means the original ship stopped existing even though nothing was destroyed.',
};
$$('[data-view]', root).forEach(b => b.addEventListener('click', () => { $('[data-viewmsg]', root).innerHTML = VIEWS[b.dataset.view]; }));
draw();
