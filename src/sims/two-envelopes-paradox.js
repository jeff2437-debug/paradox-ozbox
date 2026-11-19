import { $, $$, rand, num, bars, COLORS } from '../lab.js';

const root = $('[data-sim="two-envelopes"]');
const money = v => '$' + num(v);
const deal = () => { const small = 1 + rand(100); return Math.random() < 0.5 ? [small, 2 * small] : [2 * small, small]; };

/* ---------- play ---------- */
const play = $('[data-play]', root), envs = $$('.env', play);
let pair, pick, phase;
const tally = { keep: [0, 0], swap: [0, 0] };
function newRound() {
  pair = deal(); pick = null; phase = 'pick';
  envs.forEach(e => { e.className = 'env'; e.disabled = false; e.querySelector('b').textContent = '?'; });
  $('[data-choice]', play).hidden = true;
  $('[data-msg]', play).textContent = 'One envelope holds twice as much as the other. Pick one.';
}
envs.forEach((e, i) => e.addEventListener('click', () => {
  if (phase !== 'pick') return;
  pick = i; phase = 'decide';
  e.classList.add('picked'); e.querySelector('b').textContent = money(pair[i]);
  envs.forEach(x => x.disabled = true);
  $('[data-msg]', play).innerHTML = `Your envelope has <b>${money(pair[i])}</b>. The other has either ${money(pair[i] / 2)} or ${money(pair[i] * 2)}. Keep it or switch?`;
  $('[data-choice]', play).hidden = false;
}));
$$('[data-act]', play).forEach(b => b.addEventListener('click', () => {
  if (phase !== 'decide') return;
  phase = 'done';
  const how = b.dataset.act, got = how === 'keep' ? pair[pick] : pair[1 - pick];
  tally[how][0] += got; tally[how][1]++;
  envs.forEach((e, j) => e.querySelector('b').textContent = money(pair[j]));
  $('[data-choice]', play).hidden = true;
  $('[data-msg]', play).innerHTML = `You ${how === 'keep' ? 'kept' : 'switched'} and got <b>${money(got)}</b>. <button type="button" class="btn small" data-again>Play again</button>`;
  $('[data-again]', play).addEventListener('click', newRound);
  for (const k of ['keep', 'swap']) {
    const [s, n] = tally[k];
    $(`[data-tally=${k}]`, play).textContent = n ? `${money(s / n)} average over ${n}` : 'not tried yet';
  }
}));
newRound();

/* ---------- simulate strategies ---------- */
const sim = $('[data-simulate]', root), thr = $('[name=threshold]', sim);
function run() {
  const T = +thr.value, n = 100000; let keep = 0, swap = 0, smart = 0;
  for (let i = 0; i < n; i++) {
    const [mine, other] = deal();
    keep += mine; swap += other; smart += mine < T ? other : mine;
  }
  $('[data-tval]', sim).textContent = money(T);
  const max = Math.max(keep, swap, smart) / n;
  bars($('[data-bars]', sim), [
    { label: 'Always keep', value: keep / n / max, color: COLORS.s1, text: money(keep / n) },
    { label: 'Always switch', value: swap / n / max, color: COLORS.s2, text: money(swap / n) },
    { label: `Switch if under ${money(T)}`, value: smart / n / max, color: COLORS.s3, text: money(smart / n) }]);
  $('[data-out]', sim).textContent = `Average winnings over ${num(n)} rounds. The smaller amount is a random whole number of dollars from $1 to $100, so the expected winnings for "always keep" and "always switch" are both $75.75.`;
}
thr.addEventListener('input', run);
$('[data-run]', sim).addEventListener('click', run);
run();
