import { $, rand, pct, num, animate, lineChart, COLORS } from '../lab.js';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const exact = n => { let q = 1; for (let k = 0; k < n; k++) q *= (365 - k) / 365; return 1 - q; };
const dateOf = d => { let m = 0; while (d >= DAYS[m]) d -= DAYS[m++]; return `${d + 1} ${MONTHS[m]}`; };

const root = $('[data-sim="birthday"]');
const slider = $('[name=people]', root);
const curve = Array.from({ length: 100 }, (_, i) => exact(i + 1));
const chart = lineChart($('[data-chart]', root), {
  series: [{ name: 'Chance of a shared birthday', short: '', color: COLORS.s1 }],
  xLabel: 'People in the room', label: 'Chance at least two people share a birthday, by group size',
  xTip: x => `${x} ${x === 1 ? 'person' : 'people'}`, tipFmt: v => pct(v), refs: [{ y: 0.5 }],
});
chart.update([curve], 100);

// calendar grid
const cal = $('[data-cal]', root);
cal.innerHTML = MONTHS.map((m, mi) => `<div class="calrow"><span>${m}</span>${Array.from({ length: 31 }, (_, d) =>
  d < DAYS[mi] ? `<i data-d="${DAYS.slice(0, mi).reduce((a, b) => a + b, 0) + d}"></i>` : '<i class="na"></i>').join('')}</div>`).join('');
const cells = [...cal.querySelectorAll('i[data-d]')].sort((a, b) => a.dataset.d - b.dataset.d);

function stats() {
  const n = +slider.value;
  $('[data-n]', root).textContent = n;
  $('[data-out]', root).innerHTML =
    `<div class="stat s1"><small>Chance two or more share a birthday</small><b>${pct(exact(n))}</b></div>` +
    `<div class="stat"><small>Pairs of people to compare</small><b>${num(n * (n - 1) / 2)}</b></div>` +
    `<div class="stat"><small>Chance someone shares <em>your</em> birthday</small><b>${pct(1 - (364 / 365) ** (n - 1))}</b></div>`;
  chart.setMarker(n);
}
function room() {
  const n = +slider.value, count = new Array(365).fill(0);
  for (let i = 0; i < n; i++) count[rand(365)]++;
  cells.forEach((c, d) => { c.className = count[d] > 1 ? 'hit' : count[d] ? 'one' : ''; c.textContent = count[d] > 1 ? count[d] : ''; c.title = count[d] ? `${dateOf(d)}: ${count[d]} ${count[d] > 1 ? 'people' : 'person'}` : ''; });
  const shared = count.map((c, d) => [c, d]).filter(([c]) => c > 1);
  $('[data-roommsg]', root).innerHTML = shared.length
    ? `<b>Match!</b> ${shared.map(([c, d]) => `${c} people born on ${dateOf(d)}`).join('; ')}.`
    : `<b>No match</b> this time among ${n} people. Try again, or add more people.`;
}
let stop;
function many() {
  stop && stop();
  const n = +slider.value, rooms = 1000; let hits = 0, done = 0;
  const seen = new Uint16Array(365); let stamp = 0;
  stop = animate(rooms, () => {
    stamp++; if (stamp > 65000) { seen.fill(0); stamp = 1; }
    for (let i = 0; i < n; i++) { const d = rand(365); if (seen[d] === stamp) { hits++; break; } seen[d] = stamp; }
    done++;
  }, () => {
    $('[data-manymsg]', root).innerHTML = `${num(hits)} of ${num(done)} rooms of ${n} people had a shared birthday: <b>${pct(hits / done)}</b> (the maths says ${pct(exact(n))}).`;
  }, null, 900);
}
slider.addEventListener('input', () => { stats(); });
slider.addEventListener('change', () => { room(); $('[data-manymsg]', root).textContent = ''; });
$('[data-room]', root).addEventListener('click', room);
$('[data-many]', root).addEventListener('click', many);
stats(); room();
