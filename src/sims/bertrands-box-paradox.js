import { $, $$, rand, pct, num, animate, bars, COLORS } from '../lab.js';

const BOXES = [['G', 'G'], ['S', 'S'], ['G', 'S']];
const NAMES = ['Gold–gold', 'Silver–silver', 'Gold–silver'];
const coin = c => `<span class="medal ${c}">${c === 'G' ? 'Gold' : 'Silver'}</span>`;

/* ---------- draw yourself ---------- */
const play = $('[data-play]');
const boxEls = $$('.box', play);
let box, other, phase = 'ready';
const tally = { gold: 0, right: 0, guesses: 0 };
function draw() {
  box = rand(3); const i = rand(2), drawn = BOXES[box][i]; other = BOXES[box][1 - i];
  boxEls.forEach(b => b.classList.remove('chosen')); // don't give the answer away
  boxEls.forEach(b => b.classList.add('shut'));
  $('[data-guess]', play).hidden = drawn !== 'G';
  if (drawn === 'S') {
    phase = 'ready';
    $('[data-msg]', play).innerHTML = `You reached into a random box and pulled out ${coin('S')}. We only care about gold draws, so this one doesn't count. Draw again.`;
  } else {
    phase = 'guess';
    $('[data-msg]', play).innerHTML = `You reached into a random box and pulled out ${coin('G')}. <b>Is the other coin in that box gold or silver?</b>`;
  }
}
$('[data-draw]', play).addEventListener('click', draw);
$$('[data-g]', play).forEach(b => b.addEventListener('click', () => {
  if (phase !== 'guess') return;
  phase = 'ready';
  const g = b.dataset.g, right = g === other;
  tally.gold++; if (other === 'G') tally.right++; tally.guesses++;
  boxEls.forEach((x, j) => { x.classList.remove('shut'); x.classList.toggle('chosen', j === box); });
  $('[data-guess]', play).hidden = true;
  $('[data-msg]', play).innerHTML = `${right ? '✅ Right' : '❌ Not this time'}: it was the ${NAMES[box]} box, so the other coin is ${coin(other)}.`;
  $('[data-tally]', play).textContent = `So far the other coin has been gold in ${tally.right} of ${tally.gold} gold draws (${pct(tally.right / tally.gold, 0)}).`;
}));

/* ---------- simulate ---------- */
const sim = $('[data-simulate]');
let stop;
function run() {
  stop && stop();
  const n = +$('[name=draws]', sim).value;
  let gold = 0, otherGold = 0, fromBox = [0, 0, 0];
  stop = animate(n, () => {
    const b = rand(3), i = rand(2);
    if (BOXES[b][i] !== 'G') return;
    gold++; fromBox[b]++; if (BOXES[b][1 - i] === 'G') otherGold++;
  }, () => {
    if (!gold) return;
    bars($('[data-bars]', sim), [
      { label: 'Other coin gold', value: otherGold / gold, color: COLORS.s1, text: `${pct(otherGold / gold)} · theory 66.7%`, ref: 2 / 3 },
      { label: 'Other coin silver', value: 1 - otherGold / gold, color: COLORS.s2, text: `${pct(1 - otherGold / gold)} · theory 33.3%`, ref: 1 / 3 }]);
    $('[data-out]', sim).innerHTML = `${num(n)} draws gave ${num(gold)} gold coins: ${num(fromBox[0])} came from the gold–gold box and ${num(fromBox[2])} from the gold–silver box.`;
  }, null, 1000);
}
$('[data-run]', sim).addEventListener('click', run);
sim.addEventListener('change', run);
run();
