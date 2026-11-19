import { $, $$, pct, num } from '../lab.js';

const PREV = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 30, 50];
const SPEC = [50, 70, 80, 90, 95, 97, 98, 99, 99.5, 99.9];
const root = $('[data-sim="false-positive"]');
const el = n => $(`[name=${n}]`, root);
const pop = 1000;
const grid = $('[data-people]', root);
grid.innerHTML = '<i></i>'.repeat(pop);
const people = [...grid.children];

function draw() {
  const prev = PREV[+el('prev').value] / 100, sens = +el('sens').value / 100, spec = SPEC[+el('spec').value] / 100;
  $('[data-v=prev]', root).textContent = `${PREV[+el('prev').value]}% (${prev >= 0.01 ? Math.round(prev * pop) + ' in 1,000' : '1 in ' + num(1 / prev)})`;
  $('[data-v=sens]', root).textContent = pct(sens);
  $('[data-v=spec]', root).textContent = pct(spec);
  const ppv = prev * sens / (prev * sens + (1 - prev) * (1 - spec));
  // expected counts out of 1,000 for the picture
  const sick = Math.max(prev > 0 ? 1 : 0, Math.round(pop * prev)), tp = Math.round(sick * sens), fn = sick - tp;
  const fp = Math.round((pop - sick) * (1 - spec)), tn = pop - sick - fp;
  const kinds = [...Array(tp).fill('tp'), ...Array(fn).fill('fn'), ...Array(fp).fill('fp'), ...Array(tn).fill('tn')];
  people.forEach((p, i) => p.className = kinds[i]);
  $('[data-legend]', root).innerHTML =
    `<span><i class="tp"></i>Has it, tests positive: <b>${tp}</b></span><span><i class="fp"></i>Doesn't have it, tests positive: <b>${fp}</b></span>` +
    `<span><i class="fn"></i>Has it, tests negative: <b>${fn}</b></span><span><i class="tn"></i>Doesn't have it, tests negative: <b>${tn}</b></span>`;
  $('[data-result]', root).innerHTML = `Out of every 1,000 people tested, about <b>${tp + fp} test positive</b>, but only <b>${tp}</b> of them actually have the condition. ` +
    `So a positive result means a <b class="big">${pct(ppv)}</b> chance of having it.`;
  const ppv2 = ppv * sens / (ppv * sens + (1 - ppv) * (1 - spec));
  $('[data-retest]', root).innerHTML = `If everyone who tests positive takes a second, independent test and is positive again, the chance rises to <b>${pct(ppv2)}</b>.`;
  $$('[data-preset]', root).forEach(b => b.setAttribute('aria-pressed', 'false'));
}
const PRESETS = { rare: [0, 99, 7], screen: [3, 90, 4], common: [7, 95, 4] }; // [prev index, sensitivity, spec index]
$$('[data-preset]', root).forEach(b => b.addEventListener('click', () => {
  const [p, s, sp] = PRESETS[b.dataset.preset];
  el('prev').value = p; el('sens').value = s; el('spec').value = sp; draw(); b.setAttribute('aria-pressed', 'true');
}));
root.addEventListener('input', draw);
draw();
