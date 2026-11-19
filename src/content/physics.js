const sel = (name, opts, chosen) => `<select name="${name}">${opts.map(([v, t]) => `<option value="${v}"${v === chosen ? ' selected' : ''}>${t}</option>`).join('')}</select>`;

export const PHYSICS = [
/* =============================== ARCHER'S PARADOX =============================== */
{
  slug: 'archers-paradox', category: 'Physics', icon: '🏹', short: 'Archer\'s paradox',
  title: 'The archer\'s paradox: how an arrow aimed off target hits the bullseye',
  metaTitle: 'Archer\'s Paradox Explained — Slow-Motion Arrow Flex Animation',
  description: 'A traditional bow makes you aim the arrow slightly to one side of the target, yet it flies straight to the bullseye. See the arrow flex around the bow in slow motion and why spine matters.',
  tagline: 'The arrow points to one side of the target, yet flies straight into it.',
  teaser: 'The arrow points off to the side, yet hits the middle. Watch it flex in slow motion.',
  puzzle: `<p>On a traditional bow, the arrow rests against the side of the bow's handle. At full draw, the string is lined up with the target, but the arrow itself runs from the string to the <em>side</em> of the handle, so it points slightly <b>off to one side</b>.</p>
<p>By simple geometry, the arrow should miss. Yet a well-matched arrow flies straight to the bullseye. Archers have called this the archer's paradox for over a century.</p>`,
  lab: `<div data-sim="archer">
<section class="card lab">
<h2>🏹 Shoot in slow motion</h2>
<div class="controls"><label class="grow">Arrow stiffness (spine): <b data-spinev>Matched to the bow</b><input type="range" name="spine" min="0" max="4" step="1" value="2"></label></div>
<svg class="net" data-scene viewBox="0 0 640 260" role="img" aria-label="Top-down view of a bow, an arrow and a target"></svg>
<div class="row"><button type="button" class="btn" data-shoot>Shoot</button><button type="button" class="btn alt" data-clear>Clear the target</button></div>
<p class="msg" data-msg aria-live="polite"></p>
<p class="hint">Seen from above, for a right-handed archer, with the bend exaggerated and everything slowed down hugely. It's a simplified illustration, not a physics model. Try a matched arrow, then a stiff one and a weak one.</p>
</section>
</div>`,
  explain: `<h2>The answer: the arrow bends around the bow</h2>
<p>An arrow isn't rigid. When the string is released, it shoves the back of the arrow forward with enormous force, and the arrow buckles. It then flexes back and forth like a plucked guitar string as it flies.</p>
<p>A well-matched arrow bends <em>away</em> from the bow handle at just the moment it passes it, snaking around the handle rather than slapping into it. The flexing also swings the arrow's heading back towards the line of the string, so it leaves the bow pointing at the target.</p>
<h2>Why "spine" matters</h2>
<p>Archers call an arrow's stiffness its <b>spine</b>. Each bow needs an arrow of the right spine for its draw weight and the archer's draw length:</p>
<ul>
<li><b>Too stiff:</b> it doesn't bend enough to get around the handle, so it stays pointing where it was aimed and lands to the left (for a right-handed archer).</li>
<li><b>Too weak:</b> it bends too much, over-corrects and lands to the right.</li>
<li><b>Matched:</b> it flexes just enough and flies straight.</li>
</ul>
<p>Getting this right ("tuning" a bow) is a big part of traditional archery. Archers check it with tests like shooting through paper and looking at the tear, or shooting bare shafts without feathers.</p>
<h2>Seen at last</h2>
<p>For centuries archers could only guess what was happening. The flexing was confirmed with high-speed photography in the 1930s, which showed the arrow bending visibly as it left the bow.</p>
<h2>Do modern bows avoid it?</h2>
<p>Partly. Modern target recurves cut the handle away past the centre line ("centre-shot"), so the arrow can point straight at the target. But the arrow still flexes, because a finger release rolls the string off sideways. With a compound bow and a mechanical release, the flexing happens mostly up and down rather than side to side. Every arrow bends; matching the spine is still what makes it fly true.</p>`,
  faq: [
    ['What is the archer\'s paradox?', 'On a traditional bow, the arrow must point slightly to one side of the target because it rests against the bow handle, yet it still flies straight to the target. It works because the arrow flexes around the handle when released.'],
    ['What happens if an arrow is too stiff?', 'For a right-handed archer using fingers, an over-stiff arrow tends to hit to the left, because it doesn\'t flex enough to correct its heading. An under-spined (weak) arrow tends to hit to the right.'],
    ['What is arrow spine?', 'Spine is a measure of an arrow\'s stiffness, usually tested by hanging a standard weight from the middle of the shaft and measuring how far it bends.'],
  ],
  related: ['twin-paradox', 'braess-paradox'],
},

/* =============================== TWIN PARADOX =============================== */
{
  slug: 'twin-paradox', category: 'Physics', icon: '🚀', short: 'Twin paradox',
  title: 'The twin paradox: why the space traveller comes home younger',
  metaTitle: 'Twin Paradox Calculator — How Much Younger Is the Travelling Twin?',
  description: 'One twin flies to a star at near light speed and back; the other stays home. Pick a speed and a destination to see how many years pass for each, and why the traveller ages less.',
  tagline: 'One twin rockets to a star and back. When they return, they\'re younger than the twin who stayed home.',
  teaser: 'Fly to a star at near light speed and come home younger than your twin. Pick a speed.',
  puzzle: `<p>Two 30-year-old twins say goodbye. One boards a spaceship and flies to a nearby star at close to the speed of light, then turns around and comes home. The other stays on Earth.</p>
<p>According to Einstein's special relativity, moving clocks run slow, so the traveller ages less. But from the traveller's point of view, <em>Earth</em> was moving, so shouldn't the Earth twin be younger? They can't both be younger. That's the paradox.</p>`,
  lab: `<div data-sim="twin">
<section class="card lab">
<h2>🚀 Plan the trip</h2>
<div class="controls">
<label class="grow">Ship speed: <b data-speedv></b><input type="range" name="speed" min="0" max="8" step="1" value="5"></label>
<label>Destination ${sel('dest', [['4.37', 'Alpha Centauri (4.37 light-years)'], ['8.6', 'Sirius (8.6 light-years)'], ['25', 'Vega (25 light-years)'], ['26000', 'Centre of the Milky Way (about 26,000 light-years)']], '4.37')}</label>
<button type="button" class="btn" data-fly>Fly</button>
</div>
<svg class="net" data-trip viewBox="0 0 640 120" role="img" aria-label="A spaceship flying to a star and back"></svg>
<div class="stats" data-out></div>
<p class="hint">Ignores the time spent speeding up and slowing down, and assumes the twins are 30 when the trip starts.</p>
</section>
</div>`,
  explain: `<h2>Moving clocks run slow</h2>
<p>Special relativity says that a clock moving relative to you ticks more slowly, by a factor called gamma:</p>
<p class="formula">γ = 1 ÷ √(1 − v²/c²)</p>
<p>At everyday speeds gamma is so close to 1 that nobody notices. At 99% of the speed of light it's about 7, so for every year on the ship, about 7 pass on Earth.</p>
<h2>Why the situation isn't symmetrical</h2>
<p>It's true that each twin sees the other's clock running slow while they're moving apart at a steady speed. The difference is that only the travelling twin <b>turns around</b>. To come home, they have to fire the engines, decelerate and accelerate back, changing from one frame of reference to another. The Earth twin never does.</p>
<p>That change of frame is what breaks the symmetry. When the traveller turns around, their sense of "what time is it on Earth right now?" jumps forward dramatically. Add everything up and both twins agree, once they're back together, that the traveller is younger. There's no contradiction; the two journeys through space and time simply aren't the same length.</p>
<h2>It's been measured</h2>
<ul>
<li><b>Atomic clocks on planes.</b> In 1971, Joseph Hafele and Richard Keating flew caesium atomic clocks around the world on commercial flights and compared them with clocks left behind. The differences, measured in billionths of a second, matched relativity's predictions.</li>
<li><b>GPS.</b> Satellite clocks are affected by both their speed (which slows them) and weaker gravity (which speeds them up). The net effect is about 38 microseconds a day, and GPS has to correct for it, or positions would drift by kilometres a day.</li>
<li><b>Muons.</b> These short-lived particles are created high in the atmosphere by cosmic rays. They shouldn't live long enough to reach the ground, but because they move at nearly light speed, their clocks run slow and many of them make it.</li>
</ul>`,
  faq: [
    ['Is the twin paradox real?', 'Yes. The travelling twin really does age less. It isn\'t a contradiction, because the two twins\' journeys aren\'t symmetrical: only the traveller changes direction.'],
    ['How much younger would the travelling twin be?', 'It depends on the speed and distance. A return trip to Alpha Centauri at 99% of light speed takes about 8.8 years on Earth but only about 1.2 years on the ship.'],
    ['Has time dilation been proven?', 'Yes. It has been measured with atomic clocks on aircraft, is corrected for every day in GPS satellites, and explains why cosmic-ray muons reach the ground.'],
  ],
  related: ['archers-paradox', 'zenos-paradox'],
},

/* =============================== BRAESS =============================== */
{
  slug: 'braess-paradox', category: 'Physics', icon: '🚗', short: 'Braess\'s paradox',
  title: 'Braess\'s paradox: when a new road makes traffic worse',
  metaTitle: 'Braess\'s Paradox Simulator — How a New Road Slows Everyone Down',
  description: 'Add a free shortcut to a road network and every driver\'s trip can get slower. Change the traffic level, open the shortcut and see Braess\'s paradox in action.',
  tagline: 'Open a free shortcut, and everyone\'s drive gets slower.',
  teaser: 'Add a free shortcut and every driver gets slower. Open it and see.',
  puzzle: `<p>Drivers travel from Start to End by one of two routes. Each route has one busy road, where the more cars use it the slower it gets, and one wide highway that always takes 45 minutes.</p>
<p>Now the council opens a new shortcut linking the two routes, and it takes no time at all. More options can't make things worse, surely? Yet once drivers start using it, <b>every single trip gets slower</b>.</p>`,
  lab: `<div data-sim="braess">
<section class="card lab">
<h2>🚗 Run the morning rush</h2>
<div class="controls">
<label class="grow">Cars on the road: <b data-carsv></b><input type="range" name="cars" min="1000" max="10000" step="500" value="4000"></label>
<label class="check"><input type="checkbox" name="shortcut" checked> Open the shortcut from A to B</label>
</div>
<svg class="net" data-net viewBox="0 0 640 300" role="img" aria-label="Road network with traffic flows"></svg>
<div class="stats" data-out></div>
<p class="verdict warn" data-msg aria-live="polite"></p>
<p class="hint">A busy road takes one minute for every 100 cars using it. Drivers each pick whichever route is fastest for them, given what everyone else is doing. Line thickness shows how many cars use each road.</p>
</section>
</div>`,
  explain: `<h2>What happens with 4,000 cars</h2>
<p><b>Without the shortcut:</b> drivers split evenly. 2,000 take each route, so each busy road takes 20 minutes, and every trip takes 20 + 45 = <b>65 minutes</b>.</p>
<p><b>With the shortcut:</b> any single driver can do better by taking the busy road to A (at most 40 minutes), the free shortcut to B, then the other busy road (at most 40 minutes), never touching a 45-minute highway. So everyone does it. Now all 4,000 cars are on both busy roads, each takes 40 minutes, and every trip takes <b>80 minutes</b>.</p>
<p>Nobody can improve by switching back, either: the highways still take 45 minutes plus a 40-minute busy road, which is worse. Everyone is stuck at 80.</p>
<h2>Selfish choices, worse for everyone</h2>
<p>Each driver makes the best choice for themselves, but their choices slow everyone else down. When everyone acts this way, the result (an <em>equilibrium</em>) can be worse for all of them than if the option didn't exist. Game theorists call the gap between this and the best possible outcome the "price of anarchy". It's closely related to the prisoner's dilemma.</p>
<p>The paradox appears only in a middle range of traffic. Move the slider: with light traffic the shortcut helps, and with very heavy traffic it makes no difference.</p>
<h2>In the real world</h2>
<p>German mathematician Dietrich Braess described the effect in 1968. Cities have reported traffic flowing no worse, or even better, after closing major roads, with examples often cited from Stuttgart, New York and Seoul, where a busy elevated highway was demolished and replaced by a stream and park in the 2000s. Real traffic is more complicated than this model, but planners now take seriously the idea that a new road doesn't always help.</p>
<p>The same maths turns up in electrical circuits and even in networks of springs, where adding a link can make a weight hang <em>lower</em>.</p>`,
  faq: [
    ['What is Braess\'s paradox?', 'Adding extra capacity to a network, such as a new road, can make everyone\'s travel time worse, because each driver\'s self-interested choice of route creates more congestion for all.'],
    ['Has Braess\'s paradox happened in real life?', 'Several cities have reported that traffic did not get worse, and sometimes improved, after major roads were closed. Seoul\'s removal of an elevated highway in the 2000s is a frequently cited example.'],
    ['Why doesn\'t everyone just go back to the old routes?', 'Because for any individual driver, switching back would be slower, given what everyone else is doing. Only a coordinated change, or closing the shortcut, gets everyone back to the faster outcome.'],
  ],
  related: ['parrondos-paradox', 'simpsons-paradox'],
},
];
