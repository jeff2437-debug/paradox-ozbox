import { $ } from '../lab.js';

const root = $('[data-sim="hilbert"]');
const ROOMS = 40;
const ODD_PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
// occupant(n) -> { label, kind } ; kind: guest | new | coach | empty
let occupant, history;
const MOVES = {
  one: {
    text: 'Every guest moves from room <i>n</i> to room <i>n</i> + 1. Room 1 is now free for the newcomer.',
    apply: prev => n => n === 1 ? { label: 'New', kind: 'new' } : prev(n - 1),
  },
  coach: {
    text: 'Every guest moves from room <i>n</i> to room 2<i>n</i>. All the odd-numbered rooms are now free, and coach passenger <i>k</i> takes room 2<i>k</i> − 1.',
    apply: prev => n => n % 2 === 0 ? prev(n / 2) : { label: `C${(n + 1) / 2}`, kind: 'coach' },
  },
  coaches: {
    text: 'Current guests move from room <i>n</i> to room 2<sup><i>n</i></sup>. Passenger <i>k</i> of coach 1 goes to 3<sup><i>k</i></sup>, coach 2 uses powers of 5, coach 3 powers of 7, and so on through the primes. No two people ever share a room, though many rooms are left empty.',
    apply: prev => n => {
      let k = 0, m = n; while (m > 1 && m % 2 === 0) { m /= 2; k++; } if (m === 1 && k > 0) return prev(k);
      for (let c = 0; c < ODD_PRIMES.length; c++) { const p = ODD_PRIMES[c]; let j = 0, q = n; while (q > 1 && q % p === 0) { q /= p; j++; } if (q === 1 && j > 0) return { label: `${c + 1}·${j}`, kind: 'coach' }; }
      return { label: '', kind: 'empty' };
    },
  },
};
function reset() { occupant = n => ({ label: `G${n}`, kind: 'guest' }); history = []; draw('The hotel has infinitely many rooms, and every one is full. Guest G<i>n</i> is in room <i>n</i>.'); }
function draw(text) {
  $('[data-rooms]', root).innerHTML = Array.from({ length: ROOMS }, (_, i) => { const o = occupant(i + 1); return `<div class="room ${o.kind}"><small>${i + 1}</small><b>${o.label || '—'}</b></div>`; }).join('') + '<div class="room more">…</div>';
  $('[data-msg]', root).innerHTML = text;
  const empty = Array.from({ length: ROOMS }, (_, i) => occupant(i + 1).kind === 'empty').filter(Boolean).length;
  $('[data-count]', root).textContent = history.length ? `Moves so far: ${history.join(', then ')}.${empty ? ` ${empty} of the first ${ROOMS} rooms are empty.` : ' Still no empty rooms.'}` : '';
}
for (const [key, mv] of Object.entries(MOVES)) $(`[data-move=${key}]`, root).addEventListener('click', e => {
  occupant = mv.apply(occupant); history.push(e.currentTarget.textContent.toLowerCase()); draw(mv.text);
});
$('[data-reset]', root).addEventListener('click', reset);
reset();
