export const LOGIC = [
/* =============================== ZENO =============================== */
{
  slug: 'zenos-paradox', category: 'Maths and logic', icon: '🐢', short: 'Zeno\'s paradox: Achilles and the tortoise',
  title: 'Zeno\'s paradox: can Achilles ever catch the tortoise?',
  metaTitle: 'Zeno\'s Paradox of Achilles and the Tortoise — Step Through It Interactively',
  description: 'Achilles must first reach where the tortoise was, by which time it has moved on, forever. Step through Zeno\'s infinite steps and see how they add up to a finite time.',
  tagline: 'To catch the tortoise, Achilles must first reach where it was. By then, it has moved on. Forever?',
  teaser: 'Infinitely many steps, yet Achilles catches up in 11.1 seconds. Step through it.',
  puzzle: `<p>Achilles, the fastest runner in Greece, races a tortoise and gives it a 100-metre head start. Achilles runs 10 times faster.</p>
<p>By the time Achilles reaches the tortoise's starting point, it has crawled 10 m further. When he covers those 10 m, it has moved another 1 m. Then 10 cm, then 1 cm… Every time he reaches where it was, it has moved on. So, argued the Greek philosopher Zeno, Achilles can <b>never</b> catch it.</p>`,
  lab: `<div data-sim="zeno">
<section class="card lab">
<h2>🐢 Run the race Zeno's way</h2>
<svg class="net" data-track viewBox="0 0 640 100" role="img" aria-label="Race track with Achilles and the tortoise"></svg>
<p class="msg" data-now></p>
<div class="row"><button type="button" class="btn" data-step>Next Zeno step</button><button type="button" class="btn alt" data-race>Run it in real time</button><button type="button" class="btn alt" data-reset>Reset</button></div>
<p class="msg" data-msg aria-live="polite"></p>
<div class="tablewrap"><table><thead><tr><th>Step</th><th class="n">Time for this step</th><th class="n">Achilles has run</th><th class="n">Gap left</th></tr></thead><tbody data-steps></tbody></table></div>
<p class="hint">Achilles runs 10 m/s, the tortoise 1 m/s, with a 100 m head start.</p>
</section>
</div>`,
  explain: `<h2>Infinitely many steps can take a finite time</h2>
<p>Zeno is right that there are infinitely many steps. What he missed is that the steps get shorter, and take less time, fast enough that their total is finite:</p>
<p class="formula">10 s + 1 s + 0.1 s + 0.01 s + … = 11.111… s</p>
<p>The distances behave the same way: 100 + 10 + 1 + 0.1 + … = 111.111… m. So Achilles draws level at 111.1 m, after 11.1 seconds, and then simply runs past. Zeno's argument only describes the race <em>up to</em> that moment, in ever finer detail.</p>
<p>This is a <b>geometric series</b>: each term is a fixed fraction of the one before. When that fraction is less than 1, the sum settles on a limit, given by:</p>
<p class="formula">a + ar + ar² + … = a ÷ (1 − r) &nbsp; → &nbsp; 10 ÷ (1 − 0.1) = 11.1 s</p>
<h2>So was Zeno just wrong?</h2>
<p>Zeno, who lived in the 5th century BC, probably wasn't trying to prove that motion is impossible so much as to show that our ideas about space, time and infinity didn't fit together. It took about 2,000 years and the invention of calculus, with a careful definition of limits in the 1800s, to give a mathematically rigorous answer.</p>
<p>Some philosophers argue there's still something left to explain: how can anyone <em>complete</em> an infinite sequence of tasks? Those questions about "supertasks" are still discussed today.</p>
<h2>Zeno's other paradoxes</h2>
<ul>
<li><b>The dichotomy:</b> to walk across a room, you must first walk halfway, then half the remaining distance, and so on. Same answer: ½ + ¼ + ⅛ + … = 1.</li>
<li><b>The arrow:</b> at any single instant, a flying arrow occupies one position and isn't moving. So when does it move? Calculus answers with the idea of instantaneous speed.</li>
</ul>`,
  faq: [
    ['Does Achilles ever catch the tortoise?', 'Yes. With a 100 m head start and 10 times the speed, Achilles catches the tortoise after 111.1 m and 11.1 seconds. Zeno\'s infinite steps add up to that finite time.'],
    ['How do you solve Zeno\'s paradox?', 'The infinitely many steps form a geometric series whose sum is finite. Calculus and the idea of a limit show that an infinite number of ever-shorter intervals can add up to a finite total.'],
    ['Who was Zeno?', 'Zeno of Elea was a Greek philosopher of the 5th century BC, known for a set of paradoxes about motion and infinity that were preserved in the writings of Aristotle.'],
  ],
  related: ['hilberts-hotel', 'coastline-paradox'],
},

/* =============================== COASTLINE =============================== */
{
  slug: 'coastline-paradox', category: 'Maths and logic', icon: '🏝️', short: 'Coastline paradox',
  title: 'The coastline paradox: the shorter your ruler, the longer the coast',
  metaTitle: 'Coastline Paradox — Measure a Fractal Island With Shorter and Shorter Rulers',
  description: 'How long is a coastline? It depends on the length of your ruler: the shorter it is, the longer the coast gets. Measure a fractal island yourself and see why.',
  tagline: 'How long is a coastline? The shorter your ruler, the longer it gets, without limit.',
  teaser: 'The shorter your ruler, the longer the coast. Measure an island yourself.',
  puzzle: `<p>How long is the coast of an island? Walk a pair of dividers set to 50 km around a map and count the steps, and you get one answer. Set them to 10 km and the dividers follow bays and headlands the bigger setting skipped, so you get a <b>longer</b> answer. At 1 km, longer still.</p>
<p>It never settles down. For a real coastline, there's no single "true" length.</p>`,
  lab: `<div data-sim="coastline">
<section class="card lab">
<h2>🏝️ Measure the island</h2>
<div class="controls"><label class="grow">Ruler length: <b data-rulerv></b><input type="range" name="ruler" min="0" max="5" step="1" value="0"></label><button type="button" class="btn alt" data-new>New island</button></div>
<svg class="net" data-map viewBox="0 0 640 380" role="img" aria-label="Fractal island with a ruler path around the coast"></svg>
<p class="msg" data-msg aria-live="polite"></p>
<h3>Every ruler compared</h3>
<div data-bars></div>
<p class="hint">The orange path shows the ruler steps. The island is a computer-generated fractal; on a real coast, the length would keep growing down to the size of rocks and pebbles.</p>
</section>
</div>`,
  explain: `<h2>Why it happens: coasts are wiggly at every scale</h2>
<p>A circle's measured length settles down as your ruler gets shorter: the steps just fit the curve more and more closely. A coastline doesn't, because zooming in reveals more detail. Bays have coves, coves have inlets, inlets have rocks, rocks have cracks. Each finer ruler finds new wiggles to follow, so the total keeps growing.</p>
<p>Shapes like this, that look similarly rough at every scale, are called <b>fractals</b>.</p>
<h2>A dimension between 1 and 2</h2>
<p>How quickly the length grows tells you how rough the coast is. Mandelbrot turned this into a <b>fractal dimension</b>: a smooth line has dimension 1, a filled-in area has dimension 2, and a coastline is somewhere in between. The west coast of Britain comes out at about 1.25. A smooth coastline like South Africa's is close to 1; a very ragged one like Norway's, with its fjords, is higher.</p>
<h2>History</h2>
<p>English mathematician Lewis Fry Richardson noticed the problem while studying whether the length of a shared border affected the chance of war. He found that Spain and Portugal quoted very different lengths for their common border (987 km versus 1,214 km), largely because they measured at different scales. Benoit Mandelbrot made the idea famous in a 1967 paper titled "How long is the coast of Britain?".</p>
<h2>What it means in practice</h2>
<p>Any published coastline length is only meaningful with the scale it was measured at. That's why figures for the same country's coast can differ by tens of thousands of kilometres between sources, including for Australia's coastline. Areas don't have this problem: the area of an island does settle down as you measure more finely.</p>`,
  faq: [
    ['What is the coastline paradox?', 'The measured length of a coastline depends on the length of the ruler used. The shorter the ruler, the more detail it follows and the longer the coastline comes out, without settling on a final value.'],
    ['How long is Australia\'s coastline?', 'There\'s no single answer: published figures vary widely depending on the map scale used and whether islands are included. Any figure should be quoted with the scale it was measured at.'],
    ['What is a fractal?', 'A shape that shows similar detail at every scale, so zooming in reveals more structure. Coastlines, clouds, mountain ranges and river networks are natural examples.'],
  ],
  related: ['zenos-paradox', 'benfords-law'],
},

/* =============================== HILBERT =============================== */
{
  slug: 'hilberts-hotel', category: 'Maths and logic', icon: '🏨', short: 'Hilbert\'s hotel',
  title: 'Hilbert\'s hotel: a full hotel that always has room',
  metaTitle: 'Hilbert\'s Hotel Explained — Interactive Infinite Hotel',
  description: 'A hotel with infinitely many rooms is full, yet it can take one more guest, infinitely many more, even infinitely many coachloads. Move the guests yourself and see how.',
  tagline: 'Every room in the infinite hotel is full. Yet there\'s always room for more.',
  teaser: 'A full hotel that fits one more guest, then infinitely many more. Move the guests yourself.',
  puzzle: `<p>The Grand Hotel has infinitely many rooms, numbered 1, 2, 3, and on forever, and every room is occupied. A new guest arrives. In any normal hotel, the answer would be "sorry, we're full".</p>
<p>But the manager finds a room. Then a coach turns up with infinitely many passengers, and he finds rooms for all of them too. Then infinitely many coaches arrive…</p>`,
  lab: `<div data-sim="hilbert">
<section class="card lab">
<h2>🏨 Manage the hotel</h2>
<div class="row"><button type="button" class="btn" data-move="one">One new guest</button><button type="button" class="btn" data-move="coach">An infinite coach</button><button type="button" class="btn" data-move="coaches">Infinitely many coaches</button><button type="button" class="btn alt" data-reset>Start again</button></div>
<p class="msg" data-msg aria-live="polite"></p>
<div class="rooms" data-rooms></div>
<div class="legend"><span><i style="background:#dbe8f9"></i>Original guests (G)</span><span><i style="background:#d8f1e6"></i>New guest</span><span><i style="background:#fbe1d6"></i>Coach passengers</span><span><i style="background:#f1eff6"></i>Empty</span></div>
<p class="hint" data-count></p>
<p class="hint">Showing the first 40 rooms of infinitely many. With infinitely many coaches, "2·3" means coach 2, passenger 3.</p>
</section>
</div>`,
  explain: `<h2>The trick: infinity plus one is still infinity</h2>
<p>In a finite hotel, "full" means there's no spare room. In an infinite hotel, every guest can shuffle along: the guest in room 1 moves to room 2, the guest in room 2 to room 3, and so on. Nobody is left without a room, because there's no last room for anyone to fall off the end of. Room 1 is now free.</p>
<p>For an infinite coach, each guest moves from room <i>n</i> to room 2<i>n</i>. Everyone fits in the even-numbered rooms, freeing every odd-numbered room for the coach passengers.</p>
<p>For infinitely many coaches, the manager uses prime numbers: current guests go to the powers of 2, coach 1's passengers to the powers of 3, coach 2's to the powers of 5, and so on. Because every whole number breaks into primes in only one way, no two people are ever sent to the same room.</p>
<h2>What it really shows</h2>
<p>The hotel illustrates an idea of Georg Cantor's: two infinite sets are the "same size" if you can pair their members off one to one. The whole numbers, the even numbers, and even all the fractions can be paired off with each other, so they're all the same size of infinity, called <b>countable</b>.</p>
<h2>A coach the hotel can't fit</h2>
<p>Suppose a coach arrives carrying one passenger for every point on a number line, every real number, like 0.5, π and √2. Cantor proved with his famous "diagonal argument" that there is no way to give them all rooms. Whatever list you make, you can always build a number that's not on it. Some infinities really are bigger than others.</p>
<h2>History</h2>
<p>David Hilbert, one of the most influential mathematicians of the 20th century, described the hotel in a 1924 lecture. Physicist George Gamow popularised it in his 1947 book <em>One Two Three… Infinity</em>.</p>`,
  faq: [
    ['What is Hilbert\'s hotel?', 'A thought experiment about a hotel with infinitely many rooms, all occupied, which can still accommodate new guests by moving existing guests to other rooms. It illustrates the strange arithmetic of infinite sets.'],
    ['How does Hilbert\'s hotel fit a new guest?', 'Every guest moves from room n to room n + 1, freeing room 1. Because there are infinitely many rooms, there\'s no last guest who has nowhere to go.'],
    ['Can Hilbert\'s hotel fit everyone?', 'It can fit any countable number of new guests, including infinitely many coachloads. But it cannot fit one guest for every real number, because that infinity is larger.'],
  ],
  related: ['zenos-paradox', 'ship-of-theseus'],
},

/* =============================== THESEUS =============================== */
{
  slug: 'ship-of-theseus', category: 'Maths and logic', icon: '⛵', short: 'Ship of Theseus',
  title: 'The Ship of Theseus: replace every plank, is it the same ship?',
  metaTitle: 'Ship of Theseus Paradox — Replace the Planks Yourself and Decide',
  description: 'If you replace every plank of a ship one at a time, is it still the same ship? And what if someone rebuilds the old planks into a second ship? Replace them yourself and decide.',
  tagline: 'Replace every plank, one at a time. Is it still the same ship?',
  teaser: 'Replace every plank, then rebuild the old ones. Which is the real ship? You decide.',
  puzzle: `<p>The Athenians preserved the ship of the hero Theseus for centuries. As its planks rotted, they were replaced one by one, until eventually no original timber was left. Was it still the Ship of Theseus?</p>
<p>Then a twist, added centuries later: suppose someone had kept every old plank and reassembled them. Now there are two ships. <b>Which one is the real Ship of Theseus?</b></p>`,
  lab: `<div data-sim="theseus">
<section class="card lab">
<h2>⛵ Repair the ship</h2>
<svg class="net" data-ship viewBox="0 0 600 200" role="img" aria-label="A ship made of old and new planks"></svg>
<div class="legend"><span><i style="background:#6b4b22"></i>Original plank</span><span><i style="background:#e8c27a"></i>New plank</span></div>
<div class="controls"><label class="grow"><b data-count></b><input type="range" name="planks" min="0" max="60" value="0"></label><button type="button" class="btn alt" data-one>Replace one plank</button></div>
<p><b>Is it still the Ship of Theseus?</b></p>
<div class="row"><button type="button" class="btn" data-same="yes">Yes</button><button type="button" class="btn alt" data-same="no">No</button></div>
<p class="msg" data-verdict aria-live="polite"></p>
<div data-twist hidden>
<h3>The twist</h3>
<p>Every plank has now been replaced. But a collector kept all 60 original planks…</p>
<div class="row"><button type="button" class="btn" data-rebuild>Rebuild the old planks into a ship</button></div>
<div data-second hidden>
<svg class="net" data-ship2 viewBox="0 0 600 200" role="img" aria-label="A second ship rebuilt from the original planks"></svg>
<p><b>Which one is the real Ship of Theseus?</b></p>
<div class="row"><button type="button" class="chip" data-view="repaired">The repaired ship</button><button type="button" class="chip" data-view="rebuilt">The rebuilt ship</button><button type="button" class="chip" data-view="both">Both, in different ways</button><button type="button" class="chip" data-view="neither">Neither</button></div>
<p class="msg" data-viewmsg aria-live="polite"></p>
</div>
</div>
</section>
</div>`,
  explain: `<h2>Why it's hard</h2>
<p>Replacing one plank obviously doesn't make a new ship. Replacing two doesn't either. But if no single plank makes the difference, then by repeating the step you reach a ship with no original parts that is somehow still the same ship. If you think it isn't, you need to say at which plank it changed, and any answer seems arbitrary. This is related to the <b>sorites paradox</b>: one grain of sand isn't a heap, adding one grain never turns a non-heap into a heap, yet heaps exist.</p>
<p>The rebuilt ship makes things worse. If identity is about the material, the rebuilt ship is the original. If identity is about continuity of use and history, the repaired ship is. Both claims sound reasonable, and they can't both be fully right.</p>
<h2>The main answers</h2>
<ul>
<li><b>Continuity:</b> things keep their identity through gradual change. The repaired ship is the original.</li>
<li><b>Original material:</b> what something is made of is what matters. The rebuilt ship is the original.</li>
<li><b>"Same" is ambiguous:</b> the ships are the same in different senses (same material, same function, same history), and the puzzle only arises because we expect one word to do every job.</li>
<li><b>Identity is a convention:</b> there's no deep fact of the matter. We decide what counts as "the same", and different decisions suit different purposes.</li>
</ul>
<h2>Not just about ships</h2>
<ul>
<li><b>You:</b> many of the cells in your body are replaced over the years, though not all of them. Are you the same person you were as a child? Most would say yes, because of continuity of memory and body.</li>
<li><b>Bands and teams:</b> is a band with no original members the same band? Is a footy club that has moved cities the same club?</li>
<li><b>Restored cars and heritage buildings:</b> collectors pay far more for "original" parts, and heritage rules have to define how much replacement still counts as preservation.</li>
<li><b>Grandfather's axe:</b> "This is my grandfather's axe. My father replaced the head and I replaced the handle." The same puzzle as a joke, also famous as Trigger's broom in the British sitcom <em>Only Fools and Horses</em>.</li>
</ul>
<h2>History</h2>
<p>The Greek writer Plutarch recorded the puzzle in his life of Theseus, written around 100 AD, saying philosophers used the ship as an example on both sides of the argument. The English philosopher Thomas Hobbes added the rebuilt ship in the 17th century.</p>`,
  faq: [
    ['What is the Ship of Theseus paradox?', 'A puzzle about identity: if every part of a ship is gradually replaced, is it still the same ship? And if the old parts are reassembled, which of the two ships is the original?'],
    ['What is the answer to the Ship of Theseus?', 'There\'s no agreed answer. Some philosophers say continuity keeps it the same ship, some say the original material matters, and others say the word "same" covers several different ideas.'],
    ['Who came up with the Ship of Theseus?', 'Plutarch recorded it in the first century AD, describing it as a well-known puzzle among philosophers. Thomas Hobbes added the twist of rebuilding the ship from the old planks.'],
  ],
  related: ['hilberts-hotel', 'zenos-paradox'],
},
];
