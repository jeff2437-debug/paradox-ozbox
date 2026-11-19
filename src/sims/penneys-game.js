import { $, $$, rand, pct, num, animate, bars, COLORS } from '../lab.js';

const ALL = ['HHH', 'HHT', 'HTH', 'HTT', 'THH', 'THT', 'TTH', 'TTT'];
// Conway's correlation: sum of 2^(k-1) over k where the last k of x equal the first k of y
const corr = (x, y) => { let s = 0; for (let k = 1; k <= 3; k++) if (x.slice(3 - k) === y.slice(0, k)) s += 2 ** (k - 1); return s; };
export const chanceBBeatsA = (a, b) => { if (a === b) return 0.5; const ob = corr(a, a) - corr(a, b), oa = corr(b, b) - corr(b, a); return ob / (ob + oa); };
const reply = a => (a[1] === 'H' ? 'T' : 'H') + a.slice(0, 2);
const coin = c => `<span class="coin ${c}">${c}</span>`;
const seqHtml = s => [...s].map(coin).join('');

/* ---------- play the computer ---------- */
const play = $('[data-play]');
let mine = 'HHH', cpu, flips = '', over = true, timer;
const score = { you: 0, cpu: 0 };
const pickBtns = $$('[data-pos]', play);
function showPick() { pickBtns.forEach((b, i) => { b.textContent = mine[i]; b.className = 'coin big ' + mine[i]; }); }
pickBtns.forEach((b, i) => b.addEventListener('click', () => {
  if (!over) return;
  mine = mine.slice(0, i) + (mine[i] === 'H' ? 'T' : 'H') + mine.slice(i + 1); showPick();
}));
function start() {
  clearInterval(timer);
  cpu = reply(mine); flips = ''; over = false;
  $('[data-cpu]', play).innerHTML = `The computer picks ${seqHtml(cpu)} — and expects to win ${pct(chanceBBeatsA(mine, cpu), 0)} of the time.`;
  $('[data-flips]', play).innerHTML = '';
  $('[data-msg]', play).textContent = 'Flip the coin until one of your sequences turns up.';
  $$('[data-flip],[data-auto]', play).forEach(b => b.disabled = false);
  $('[data-start]', play).textContent = 'Restart with this pick';
}
function flip() {
  if (over) return;
  flips += Math.random() < 0.5 ? 'H' : 'T';
  const tail = flips.slice(-3), n = flips.length;
  let winner = tail === mine ? 'you' : tail === cpu ? 'cpu' : null;
  $('[data-flips]', play).innerHTML = [...flips].map((c, i) => `<span class="coin ${c}${winner && i >= n - 3 ? ' hl ' + winner : ''}">${c}</span>`).join('');
  if (winner) {
    over = true; clearInterval(timer); score[winner]++;
    $('[data-msg]', play).innerHTML = winner === 'you' ? `🎉 <b>Your ${mine} came first</b> after ${n} flips.` : `🤖 <b>The computer's ${cpu} came first</b> after ${n} flips.`;
    $('[data-score]', play).textContent = `You ${score.you} – ${score.cpu} Computer`;
    $$('[data-flip],[data-auto]', play).forEach(b => b.disabled = true);
    $('[data-start]', play).textContent = 'Play again';
  }
}
$('[data-start]', play).addEventListener('click', start);
$('[data-flip]', play).addEventListener('click', flip);
$('[data-auto]', play).addEventListener('click', () => { clearInterval(timer); timer = setInterval(flip, 220); });
showPick();
$$('[data-flip],[data-auto]', play).forEach(b => b.disabled = true);

/* ---------- race any two ---------- */
const race = $('[data-race]');
for (const s of $$('select', race)) s.innerHTML = ALL.map(x => `<option>${x}</option>`).join('');
$('[name=a]', race).value = 'HTH'; $('[name=b]', race).value = 'HHT';
let stop;
function runRace() {
  stop && stop();
  const a = $('[name=a]', race).value, b = $('[name=b]', race).value, races = 10000;
  if (a === b) { $('[data-bars]', race).innerHTML = '<p class="hint">Pick two different sequences.</p>'; $('[data-out]', race).innerHTML = ''; return; }
  const pB = chanceBBeatsA(a, b);
  let winsA = 0, done = 0, flipsTotal = 0;
  stop = animate(races, () => {
    let s = '';
    for (;;) { s = (s + (Math.random() < 0.5 ? 'H' : 'T')).slice(-3); flipsTotal++; if (s === a) { winsA++; break; } if (s === b) break; }
    done++;
  }, () => {
    bars($('[data-bars]', race), [
      { label: `${a} first`, value: winsA / done, color: COLORS.s1, text: `${pct(winsA / done)} · theory ${pct(1 - pB)}`, ref: 1 - pB },
      { label: `${b} first`, value: 1 - winsA / done, color: COLORS.s2, text: `${pct(1 - winsA / done)} · theory ${pct(pB)}`, ref: pB }]);
    $('[data-out]', race).innerHTML = `${num(done)} races, averaging ${(flipsTotal / done).toFixed(1)} flips each. On its own, ${a} takes ${2 * corr(a, a)} flips on average to appear and ${b} takes ${2 * corr(b, b)}.`;
  }, null, 1200);
}
race.addEventListener('change', runRace);
$('[data-run]', race).addEventListener('click', runRace);
runRace();
