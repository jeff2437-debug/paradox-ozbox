import { $, pct, bars, COLORS } from '../lab.js';

// Charig et al. (1986), kidney stone treatments. A = open surgery, B = percutaneous nephrolithotomy.
const A = { small: 81 / 87, large: 192 / 263 }, B = { small: 234 / 270, large: 55 / 80 };
const bOverall = 289 / 350;
const root = $('[data-sim="simpsons"]');
const slider = $('[name=mix]', root);

function draw() {
  const share = slider.value / 100, total = 350, large = Math.round(total * share);
  const aOverall = A.small * (1 - share) + A.large * share;
  $('[data-mixlabel]', root).textContent = `${slider.value}% of A's patients had large stones (${total - large} small, ${large} large)`;
  const row = (label, a, b) => [
    { label: `${label}: A`, value: a, color: COLORS.s1, text: pct(a) },
    { label: `${label}: B`, value: b, color: COLORS.s2, text: pct(b) }];
  bars($('[data-bars]', root), [...row('Small stones', A.small, B.small), ...row('Large stones', A.large, B.large), ...row('All patients', aOverall, bOverall)]);
  const flipped = aOverall < bOverall;
  $('[data-verdict]', root).innerHTML = flipped
    ? `<b>Paradox!</b> A has the higher success rate for small stones <em>and</em> for large stones, yet B looks better overall (${pct(bOverall)} vs ${pct(aOverall)}). A is being handed most of the hard cases.`
    : `<b>No paradox.</b> With this mix A wins in each group and overall (${pct(aOverall)} vs ${pct(bOverall)}). Push the slider right to give A more of the hard cases.`;
  $('[data-verdict]', root).className = 'verdict ' + (flipped ? 'warn' : 'ok');
}
slider.addEventListener('input', draw);
draw();
