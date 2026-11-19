import { $, $$, rand, pct, num, animate, lineChart, COLORS } from '../lab.js';

/* ---------- play it yourself ---------- */
const play = $('[data-play]');
const doors = $$('.door', play), msg = $('[data-msg]', play), choice = $('[data-choice]', play);
const tally = { stick: [0, 0], switch: [0, 0] };
let car, pick, closed, phase;

function newGame() {
  car = rand(3); pick = null; closed = null; phase = 'pick';
  doors.forEach(d => { d.className = 'door'; d.disabled = false; d.querySelector('.behind').textContent = ''; });
  choice.hidden = true;
  msg.innerHTML = 'Pick a door. One hides a car; the other two hide goats.';
}
function showTally() {
  for (const k of ['stick', 'switch']) {
    const [w, n] = tally[k];
    $(`[data-tally=${k}]`, play).textContent = n ? `${w} of ${n} won (${pct(w / n, 0)})` : 'not tried yet';
  }
}
doors.forEach((d, i) => d.addEventListener('click', () => {
  if (phase !== 'pick') return;
  pick = i; phase = 'decide';
  const goats = [0, 1, 2].filter(j => j !== pick && j !== car);
  const open = goats[rand(goats.length)];
  closed = [0, 1, 2].find(j => j !== pick && j !== open);
  doors[pick].classList.add('picked');
  doors[open].classList.add('open'); doors[open].querySelector('.behind').textContent = '🐐';
  doors.forEach(x => x.disabled = true);
  msg.innerHTML = `You picked door ${pick + 1}. The host, who knows where the car is, opens door ${open + 1} to show a goat.<br><b>Do you stick with door ${pick + 1}, or switch to door ${closed + 1}?</b>`;
  $('[data-act=stick]', play).textContent = `Stick with door ${pick + 1}`;
  $('[data-act=switch]', play).textContent = `Switch to door ${closed + 1}`;
  choice.hidden = false;
}));
$$('[data-act]', play).forEach(b => b.addEventListener('click', () => {
  if (phase !== 'decide') return;
  phase = 'done';
  const how = b.dataset.act, final = how === 'stick' ? pick : closed, won = final === car;
  tally[how][1]++; if (won) tally[how][0]++;
  doors.forEach((d, j) => { d.classList.add('open'); d.querySelector('.behind').textContent = j === car ? '🚗' : '🐐'; });
  doors[final].classList.add(won ? 'win' : 'lose');
  choice.hidden = true;
  msg.innerHTML = `${won ? '🎉 <b>You win the car!</b>' : '🐐 <b>A goat.</b>'} You ${how === 'stick' ? 'stuck with' : 'switched to'} door ${final + 1}; the car was behind door ${car + 1}. <button type="button" class="btn small" data-again>Play again</button>`;
  $('[data-again]', msg).addEventListener('click', newGame);
  showTally();
}));
newGame(); showTally();

/* ---------- simulate thousands of games ---------- */
const sim = $('[data-simulate]');
const chart = lineChart($('[data-chart]', sim), {
  series: [{ name: 'Always switch', short: 'Switch', color: COLORS.s1 }, { name: 'Always stick', short: 'Stick', color: COLORS.s2 }],
  xLabel: 'Games played', label: 'Running win rate for switching and sticking',
  xTip: x => `After ${num(x)} game${x > 1 ? 's' : ''}`, tipFmt: v => pct(v),
});
let stop;
function run() {
  stop && stop();
  const n = +$('[name=doors]', sim).value, games = +$('[name=games]', sim).value, ignorant = $('[name=ignorant]', sim).checked;
  const theory = ignorant ? [0.5, 0.5] : [(n - 1) / n, 1 / n];
  chart.setRefs([{ y: theory[0], color: COLORS.s1 }, { y: theory[1], color: COLORS.s2 }]);
  const sw = [], st = []; let swWins = 0, stWins = 0, played = 0, discarded = 0;
  stop = animate(games, () => {
    const c = rand(n), p = rand(n);
    let left; // the one other door the host leaves closed
    if (p === c) { left = rand(n - 1); if (left >= p) left++; }
    else if (!ignorant) left = c;
    else { left = rand(n - 1); if (left >= p) left++; if (left !== c) { discarded++; return; } } // host revealed the car by accident
    played++;
    if (left === c) swWins++; if (p === c) stWins++;
    sw.push(swWins / played); st.push(stWins / played);
  }, () => {
    chart.update([sw, st]);
    $('[data-out]', sim).innerHTML = `<div class="stat s1"><small>Always switch</small><b>${pct(swWins / played)}</b><small>won ${num(swWins)} of ${num(played)} · theory ${pct(theory[0])}</small></div>` +
      `<div class="stat s2"><small>Always stick</small><b>${pct(stWins / played)}</b><small>won ${num(stWins)} of ${num(played)} · theory ${pct(theory[1])}</small></div>` +
      (ignorant ? `<div class="stat"><small>Games thrown out</small><b>${num(discarded)}</b><small>the host accidentally showed the car</small></div>` : '');
  });
}
$('[data-run]', sim).addEventListener('click', run);
sim.addEventListener('change', run);
run();
