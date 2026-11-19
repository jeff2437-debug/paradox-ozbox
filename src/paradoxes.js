// Each paradox becomes /<slug>/ with its simulator in src/sims/<slug>.js
const sel = (name, opts, chosen) => `<select name="${name}">${opts.map(o => `<option${o === chosen ? ' selected' : ''} value="${o}">${Number(o).toLocaleString('en-AU')}</option>`).join('')}</select>`;

import { PROBABILITY } from './content/probability.js';
import { STATISTICS } from './content/statistics.js';
import { PHYSICS } from './content/physics.js';
import { LOGIC } from './content/logic.js';

export const CATEGORIES = ['Probability', 'Statistics', 'Physics', 'Maths and logic'];

const LAUNCH = [
/* =============================== MONTY HALL =============================== */
{
  slug: 'monty-hall-problem', category: 'Probability', icon: '🚪', short: 'Monty Hall problem',
  title: 'The Monty Hall problem: should you switch doors?',
  metaTitle: 'Monty Hall Problem Simulator — Play It and Run 10,000 Games',
  description: 'Play the Monty Hall game yourself, then simulate thousands of games to see why switching doors wins two-thirds of the time. Plain-English explanation included.',
  tagline: 'Three doors, one car, and a choice that fools almost everyone.',
  teaser: 'Switching wins 2 times in 3. Play it, then run 10,000 games.',
  puzzle: `<p>You're on a game show facing three closed doors. Behind one is a car; behind the other two are goats. You pick a door. The host, who knows what's behind every door, then opens one of the <em>other</em> doors to reveal a goat. He offers you a choice: stick with your door, or switch to the one remaining closed door.</p>
<p>Two doors are left, so it feels like a 50/50 coin toss. <b>It isn't.</b> Switching wins the car two times out of three.</p>`,
  lab: `<section class="card lab" data-play>
<h2>🚪 Play it yourself</h2>
<div class="doors">${[1, 2, 3].map(n => `<button class="door" type="button" aria-label="Door ${n}"><span class="num">${n}</span><span class="behind"></span></button>`).join('')}</div>
<p class="msg" data-msg aria-live="polite"></p>
<div class="row" data-choice hidden><button type="button" class="btn alt" data-act="stick"></button><button type="button" class="btn" data-act="switch"></button></div>
<div class="stats"><div class="stat s2"><small>When you stuck</small><b data-tally="stick"></b></div><div class="stat s1"><small>When you switched</small><b data-tally="switch"></b></div></div>
<p class="hint">Play ten or twenty rounds each way. Your own results will wobble, which is why the simulator below runs thousands.</p>
</section>
<section class="card lab" data-simulate>
<h2>📈 Run thousands of games</h2>
<div class="controls">
<label>Doors ${sel('doors', ['3', '10', '100'], '3')}</label>
<label>Games ${sel('games', ['100', '1000', '10000'], '1000')}</label>
<label class="check"><input type="checkbox" name="ignorant"> The host doesn't know where the car is</label>
<button type="button" class="btn" data-run>Run again</button>
</div>
<div data-chart></div>
<div class="stats" data-out></div>
<p class="hint">Dashed lines are the theoretical win rates. With more than three doors, the host opens every other door except one. Hover or tap the chart to read the rates after any number of games.</p>
</section>`,
  explain: `<h2>Why switching wins</h2>
<p>The key is that your first pick is made with no information, so it's right only <b>1 time in 3</b>. Nothing the host does afterwards can change that: he will always be able to open a goat door, whatever you picked. So the chance your original door hides the car stays at 1/3.</p>
<p>The remaining 2/3 has to go somewhere, and there's only one other closed door. Switching wins <b>whenever your first pick was wrong</b>, which happens 2 times in 3.</p>
<div class="tablewrap"><table><thead><tr><th>Car is behind</th><th>You pick</th><th>Host opens</th><th>Stick gets</th><th>Switch gets</th></tr></thead><tbody>
<tr><td>Door 1</td><td>Door 1</td><td>Door 2 or 3</td><td>🚗 Car</td><td>🐐 Goat</td></tr>
<tr><td>Door 2</td><td>Door 1</td><td>Door 3</td><td>🐐 Goat</td><td>🚗 Car</td></tr>
<tr><td>Door 3</td><td>Door 1</td><td>Door 2</td><td>🐐 Goat</td><td>🚗 Car</td></tr>
</tbody></table></div>
<h2>The 100-door version makes it obvious</h2>
<p>Imagine 100 doors. You pick one, and the host, who knows where the car is, opens 98 goat doors and leaves just one other door shut. Would you stick with your original 1-in-100 guess? The door he carefully avoided is now very suspicious: it hides the car 99 times in 100. Set the simulator to 100 doors to watch this happen.</p>
<h2>It only works because the host knows</h2>
<p>The host's knowledge is what transfers information to you. If he opens a door at random and it just happens to show a goat (sometimes called the "Monty Fall" version), switching and sticking really are 50/50. Tick <em>"The host doesn't know"</em> in the simulator: the games where he accidentally reveals the car are thrown out, and the two lines meet at 50%.</p>
<h2>A famous argument</h2>
<p>The puzzle is named after Monty Hall, host of the US game show <em>Let's Make a Deal</em>. Statistician Steve Selvin posed it in 1975, but it became famous in 1990 when Marilyn vos Savant answered it in <em>Parade</em> magazine. She said "switch", and thousands of readers, including many with maths PhDs, wrote in to tell her she was wrong. She wasn't. Even the great mathematician Paul Erdős is said to have stayed unconvinced until he saw a computer simulation.</p>`,
  faq: [
    ['Is the Monty Hall problem really 2/3?', 'Yes, as long as the host always opens a door, always reveals a goat, and always offers the switch. Under those rules switching wins 2/3 of the time, which you can confirm by running the simulator.'],
    ['Why isn\'t it 50/50 when there are two doors left?', 'Because the two remaining doors didn\'t get there the same way. Yours was chosen at random. The other one was chosen by a host who knew where the car was and had to avoid it. That asymmetry is what makes the other door more likely.'],
    ['Does it matter which door I pick first?', 'No. Every first pick has a 1/3 chance, and the host can always open a goat door, so the result is the same whichever door you start with.'],
  ],
  related: ['bertrands-box-paradox', 'false-positive-paradox'],
},

/* =============================== BIRTHDAY =============================== */
{
  slug: 'birthday-paradox', category: 'Probability', icon: '🎂', short: 'Birthday paradox',
  title: 'The birthday paradox: why 23 people are enough',
  metaTitle: 'Birthday Paradox Calculator and Simulator — Test It With Random Rooms',
  description: 'How many people do you need for two to share a birthday? Just 23 for a better-than-even chance. Fill random rooms, run 1,000 at once, and see why.',
  tagline: 'In a room of just 23 people, it\'s more likely than not that two share a birthday.',
  teaser: 'Just 23 people gives better than even odds. Fill random rooms and check.',
  puzzle: `<p>How many people need to be in a room before there's a better-than-even chance that two of them share a birthday? Most people guess somewhere around 180, about half of 365.</p>
<p>The real answer is <b>23</b>. With 50 people it's about 97%, and with 70 it's over 99.9%.</p>`,
  lab: `<section class="card lab" data-sim="birthday">
<h2>🎂 Fill a room</h2>
<div class="controls"><label class="grow">People in the room: <b data-n>23</b><input type="range" name="people" min="2" max="100" value="23"></label></div>
<div class="stats" data-out></div>
<div class="row"><button type="button" class="btn" data-room>Fill a new room</button><button type="button" class="btn alt" data-many>Fill 1,000 rooms</button></div>
<p class="msg" data-roommsg aria-live="polite"></p>
<p class="msg" data-manymsg aria-live="polite"></p>
<div class="cal" data-cal aria-label="Birthdays in this room, by date"></div>
<p class="hint">Each square is a day of the year. Pale squares have one birthday; dark squares with a number are shared. Birthdays are random and equally likely, ignoring 29 February.</p>
<h3>How the chance grows with the size of the room</h3>
<div data-chart></div>
</section>`,
  explain: `<h2>Why it happens: count the pairs, not the people</h2>
<p>Our intuition quietly answers a different question: "how likely is it that someone shares <em>my</em> birthday?" That really does need a big group: about 253 other people for an even chance.</p>
<p>But the paradox asks whether <em>any two</em> people match. With 23 people there are 23 × 22 ÷ 2 = <b>253 different pairs</b>, and every pair is a fresh chance of a match. The number of pairs grows much faster than the number of people, which is why the curve shoots up.</p>
<h2>The maths</h2>
<p>It's easiest to work out the chance that <b>nobody</b> shares a birthday, then subtract from 1. The second person avoids the first person's birthday with probability 364/365, the third avoids both with 363/365, and so on:</p>
<p class="formula">P(no match among <i>n</i>) = 365/365 × 364/365 × 363/365 × … × (365 − <i>n</i> + 1)/365</p>
<p>For 23 people that product is about 0.493, so the chance of at least one shared birthday is about <b>50.7%</b>.</p>
<div class="tablewrap"><table><thead><tr><th>People</th><th class="n">Chance of a shared birthday</th></tr></thead><tbody>
<tr><td>10</td><td class="n">11.7%</td></tr><tr><td>20</td><td class="n">41.1%</td></tr><tr><td>23</td><td class="n">50.7%</td></tr>
<tr><td>30</td><td class="n">70.6%</td></tr><tr><td>40</td><td class="n">89.1%</td></tr><tr><td>50</td><td class="n">97.0%</td></tr><tr><td>70</td><td class="n">99.9%</td></tr>
</tbody></table></div>
<h2>Real birthdays make it even more likely</h2>
<p>The calculation assumes every day is equally likely. Real birthdays aren't spread evenly: some months are noticeably busier than others. Any unevenness makes matches slightly <em>more</em> likely, so the true number for real people is, if anything, a little under 23.</p>
<h2>Where it matters</h2>
<p>The same maths explains "hash collisions" in computing and the <em>birthday attack</em> in cryptography: when you generate many random codes, duplicates turn up far sooner than you'd expect. A system with a million possible codes has a 50% chance of a repeat after only about 1,200 of them.</p>`,
  faq: [
    ['How many people do you need for a 50% chance of a shared birthday?', '23. With 23 people the chance is about 50.7%.'],
    ['How many people do you need to be certain?', 'To be 100% certain you need 367 people (366 possible birthdays, including 29 February, plus one). In practice 70 people already gives better than a 99.9% chance.'],
    ['How many people do you need for someone to share my birthday?', 'About 253 other people for a 50% chance. That\'s the question our intuition usually answers, and why the real answer of 23 feels so wrong.'],
  ],
  related: ['penneys-game', 'monty-hall-problem'],
},

/* =============================== SIMPSON'S =============================== */
{
  slug: 'simpsons-paradox', category: 'Statistics', icon: '⚖️', short: 'Simpson\'s paradox',
  title: 'Simpson\'s paradox: better in every group, worse overall',
  metaTitle: 'Simpson\'s Paradox Explained — Interactive Kidney Stone Example',
  description: 'A treatment can win in every group yet lose overall. Slide the patient mix in a real kidney stone study and watch Simpson\'s paradox appear and disappear.',
  tagline: 'A treatment can be better for every type of patient and still look worse overall.',
  teaser: 'A treatment that wins every group but loses overall. Slide the mix and watch it flip.',
  puzzle: `<p>A 1986 study compared two treatments for kidney stones. Treatment A had a higher success rate for <b>small stones</b>. It also had a higher success rate for <b>large stones</b>. But when the researchers added everyone together, <b>Treatment B</b> had the higher success rate.</p>
<p>How can something be better in every group but worse overall? No numbers were fudged. This is Simpson's paradox.</p>`,
  lab: `<div class="tablewrap"><table><thead><tr><th>Successful treatments</th><th class="n">Treatment A</th><th class="n">Treatment B</th></tr></thead><tbody>
<tr><td>Small stones</td><td class="n"><b>81 of 87 (93%)</b></td><td class="n">234 of 270 (87%)</td></tr>
<tr><td>Large stones</td><td class="n"><b>192 of 263 (73%)</b></td><td class="n">55 of 80 (69%)</td></tr>
<tr><td>All patients</td><td class="n">273 of 350 (78%)</td><td class="n"><b>289 of 350 (83%)</b></td></tr>
</tbody></table></div>
<p class="hint">Source: Charig and colleagues, <em>British Medical Journal</em>, 1986. A was open surgery; B was a less invasive keyhole procedure.</p>
<section class="card lab" data-sim="simpsons">
<h2>⚖️ Change who gets Treatment A</h2>
<p>Keep each treatment's success rate within each group exactly as in the study, but change the mix of patients sent to Treatment A.</p>
<div class="controls"><label class="grow"><span data-mixlabel></span><input type="range" name="mix" min="0" max="100" value="75"></label></div>
<div class="legend"><span><i style="background:#2a78d6"></i>Treatment A</span><span><i style="background:#eb6834"></i>Treatment B</span></div>
<div data-bars></div>
<p class="verdict" data-verdict aria-live="polite"></p>
<p class="hint">Treatment B's patients stay as in the study (270 small, 80 large). The flip happens once more than about 52% of A's patients have large stones.</p>
</section>`,
  explain: `<h2>Why it happens: the groups aren't the same size</h2>
<p>Large stones are harder to treat, whatever the method. In the study, doctors tended to give the tough cases (large stones) to Treatment A, the more invasive surgery, and the easier cases to Treatment B. So <b>three-quarters</b> of A's patients had large stones, compared with under a quarter of B's.</p>
<p>The overall success rate is a weighted average of the two groups. A's average is dragged down because most of its patients sit in the harder group. B's average is pulled up because most of its patients sit in the easier group. The comparison is really "A on hard cases versus B on easy cases".</p>
<p>The hidden factor (stone size) is called a <b>confounding variable</b>, sometimes a "lurking" variable. It affects both who gets which treatment and how well it works.</p>
<h2>So which treatment is better?</h2>
<p>For this data, A: it does better for both kinds of patient, and the overall figure is misleading because of who was sent where. But there's no purely mathematical rule that says "always split the data". Whether the grouped or the combined figures tell the true story depends on <em>what causes what</em>. Splitting by a confounder (like stone size) is right; splitting by something the treatment itself changed can be wrong.</p>
<h2>Other famous examples</h2>
<ul>
<li><b>University admissions:</b> in 1973 UC Berkeley's graduate school admitted a lower share of women than men overall, yet most individual departments admitted women at similar or higher rates. Women had mostly applied to the more competitive departments.</li>
<li><b>Batting averages:</b> one cricketer or baseballer can have a better average than another in each of two seasons but a worse average across both, when they batted very different numbers of times in each.</li>
<li><b>Hospital survival rates:</b> a top hospital can have worse overall survival than a small one simply because it takes the sickest patients.</li>
</ul>`,
  faq: [
    ['What is Simpson\'s paradox in simple terms?', 'A trend that appears in several groups of data disappears or reverses when the groups are combined. It happens when the groups are different sizes and a hidden factor affects both the group sizes and the outcome.'],
    ['How do you avoid being fooled by Simpson\'s paradox?', 'Ask whether something besides the thing you are comparing could affect both who ends up in each group and the result. If so, compare like with like within each group. Randomised trials avoid it by assigning treatments by chance.'],
    ['Is Simpson\'s paradox named after The Simpsons?', 'No. It\'s named after statistician Edward Simpson, who described it in 1951, though others had noticed the effect earlier.'],
  ],
  related: ['false-positive-paradox', 'birthday-paradox'],
},

/* =============================== PENNEY'S GAME =============================== */
{
  slug: 'penneys-game', category: 'Probability', icon: '🪙', short: 'Penney\'s game',
  title: 'Penney\'s game: the coin-flip bet you can\'t win',
  metaTitle: 'Penney\'s Game — Play the Coin Toss Paradox Against the Computer',
  description: 'Pick any three-coin sequence and the computer picks one that beats it up to 7 times in 8. Play Penney\'s game, race any two sequences, and see why.',
  tagline: 'Choose any three coin flips. Whatever you pick, there\'s a sequence that beats it.',
  teaser: 'Pick any three coin flips and the computer will beat you — up to 7 times in 8.',
  puzzle: `<p>Two players each choose a sequence of three coin flips, such as heads-heads-tails. A fair coin is flipped over and over, and whoever's sequence turns up first wins.</p>
<p>Every three-flip sequence is equally likely to appear in any three particular flips, so this sounds like a fair game. But the second player can <b>always</b> pick a sequence that beats the first player's, with odds of at least 2 to 1. It's like rock-paper-scissors: there is no best choice.</p>`,
  lab: `<section class="card lab" data-play>
<h2>🪙 Play the computer</h2>
<p>Tap the coins to choose your sequence, then start. The computer chooses second.</p>
<div class="row coins-pick">${[0, 1, 2].map(i => `<button type="button" class="coin big H" data-pos="${i}">H</button>`).join('')}<button type="button" class="btn" data-start>Start</button></div>
<p class="msg" data-cpu aria-live="polite"></p>
<div class="row"><button type="button" class="btn alt" data-flip>Flip once</button><button type="button" class="btn alt" data-auto>Flip until someone wins</button><span class="score" data-score></span></div>
<div class="flips" data-flips></div>
<p class="msg" data-msg aria-live="polite"></p>
</section>
<section class="card lab" data-race>
<h2>🏁 Race any two sequences</h2>
<div class="controls"><label>Sequence 1 <select name="a"></select></label><label>Sequence 2 <select name="b"></select></label><button type="button" class="btn" data-run>Race 10,000 times</button></div>
<div data-bars></div>
<p class="msg" data-out></p>
<p class="hint">The thin dark mark on each bar is the exact answer from Conway's formula (below).</p>
</section>`,
  explain: `<h2>The winning reply</h2>
<p>Whatever the first player picks, the second player should take the <b>opposite of the first player's middle flip</b>, then add the first player's <b>first two flips</b>. Against HHT, that's T + HH = <b>THH</b>.</p>
<div class="tablewrap"><table><thead><tr><th>If they pick</th><th>You pick</th><th class="n">Your chance of winning</th></tr></thead><tbody>
<tr><td>HHH</td><td>THH</td><td class="n">7 in 8 (87.5%)</td></tr><tr><td>HHT</td><td>THH</td><td class="n">3 in 4 (75%)</td></tr>
<tr><td>HTH</td><td>HHT</td><td class="n">2 in 3 (66.7%)</td></tr><tr><td>HTT</td><td>HHT</td><td class="n">2 in 3 (66.7%)</td></tr>
<tr><td>THH</td><td>TTH</td><td class="n">2 in 3 (66.7%)</td></tr><tr><td>THT</td><td>TTH</td><td class="n">2 in 3 (66.7%)</td></tr>
<tr><td>TTH</td><td>HTT</td><td class="n">3 in 4 (75%)</td></tr><tr><td>TTT</td><td>HTT</td><td class="n">7 in 8 (87.5%)</td></tr>
</tbody></table></div>
<h2>Why it works: overlap</h2>
<p>Take HHH against THH. The only way HHH can win is if the <em>very first three flips</em> are HHH, a 1-in-8 chance. If a tail appears anywhere before HHH is complete, then the first time two heads in a row follow it, THH has already happened. THH is always "one step ahead", sitting in wait just before HHH can finish.</p>
<p>The reply sequence is built to end with the start of the opponent's sequence, so it tends to appear on the way to their sequence.</p>
<h2>Fair coin, unequal waiting times</h2>
<p>A related surprise: on its own, HTH takes <b>10 flips</b> on average to appear, while HHT takes only <b>8</b>, and HHH takes <b>14</b>. When HTH fails at the last step (HTT), you have to start again from scratch. When HHT "fails" (HHH), you're still sitting on two heads, ready to go. The race simulator shows these averages too.</p>
<h2>Conway's formula</h2>
<p>Mathematician John Conway found a neat way to get the exact odds. For two sequences A and B, write down a number for how much A overlaps itself, B overlaps itself, and each overlaps the other (a binary "correlation"). The odds that B beats A are (AA − AB) : (BB − BA). The simulator uses exactly this to draw its "theory" marks. The game itself was described by Walter Penney in 1969.</p>
<h2>Try it on your friends</h2>
<p>Let a friend choose first, then use the reply rule above. You don't need to say anything about odds: just play ten rounds with a real coin. You should win around seven of them.</p>`,
  faq: [
    ['Is Penney\'s game fair?', 'No. The coin is fair, but the second player can always choose a sequence with at least a 2-in-3 chance of appearing first, so the game strongly favours whoever chooses second.'],
    ['What is the best sequence in Penney\'s game?', 'There isn\'t one. Every sequence is beaten by another, so the relationship goes round in a circle like rock-paper-scissors. Mathematicians call this non-transitive.'],
    ['Why does HTH take longer to appear than HHT?', 'When you almost get HTH but flip HTT, you lose all your progress. When you almost get HHT but flip HHH, you still have the two heads you need. On average HTH takes 10 flips and HHT takes 8.'],
  ],
  related: ['birthday-paradox', 'monty-hall-problem'],
},

/* =============================== BERTRAND'S BOX =============================== */
{
  slug: 'bertrands-box-paradox', category: 'Probability', icon: '📦', short: 'Bertrand\'s box paradox',
  title: 'Bertrand\'s box paradox: the other coin is probably gold',
  metaTitle: 'Bertrand\'s Box Paradox — Draw Coins and Simulate the 2/3 Answer',
  description: 'Three boxes, six coins: you draw a gold coin, so what are the chances the other coin in the box is gold? Not 1/2. Draw coins yourself and simulate thousands.',
  tagline: 'You pull a gold coin from a random box. Is the other coin gold? Not 50/50.',
  teaser: 'You draw gold. Is the other coin gold? The answer is 2/3, not 1/2.',
  puzzle: `<p>There are three boxes. One holds two gold coins, one holds two silver coins, and one holds one of each. You choose a box at random and, without looking, take out one coin. It's gold.</p>
<p>What's the chance the other coin in that box is also gold? Most people say <b>1/2</b>: it must be either the gold–gold box or the gold–silver box. The real answer is <b>2/3</b>.</p>`,
  lab: `<section class="card lab" data-play>
<h2>📦 Draw a coin</h2>
<div class="boxes">
<div class="box"><b>Gold–gold</b><span><span class="medal G">Gold</span><span class="medal G">Gold</span></span></div>
<div class="box"><b>Silver–silver</b><span><span class="medal S">Silver</span><span class="medal S">Silver</span></span></div>
<div class="box"><b>Gold–silver</b><span><span class="medal G">Gold</span><span class="medal S">Silver</span></span></div>
</div>
<div class="row"><button type="button" class="btn" data-draw>Pick a random box and draw a coin</button></div>
<p class="msg" data-msg aria-live="polite">The boxes are shown open here so you know what's in them. When you draw, they close.</p>
<div class="row" data-guess hidden><button type="button" class="btn" data-g="G">Gold</button><button type="button" class="btn alt" data-g="S">Silver</button></div>
<p class="msg" data-tally aria-live="polite"></p>
</section>
<section class="card lab" data-simulate>
<h2>📈 Simulate thousands of draws</h2>
<div class="controls"><label>Draws ${sel('draws', ['1000', '10000', '100000'], '10000')}</label><button type="button" class="btn" data-run>Run again</button></div>
<p>Of the draws that came up gold, how often was the other coin gold too?</p>
<div data-bars></div>
<p class="msg" data-out></p>
</section>`,
  explain: `<h2>Count the coins, not the boxes</h2>
<p>The mistake is to think of the two possible boxes as equally likely. They're not, because the gold–gold box gives you <b>two</b> ways to draw a gold coin and the gold–silver box gives you only one.</p>
<p>Label the three gold coins: G1 and G2 in the gold–gold box, and G3 in the mixed box. Drawing any one of them is equally likely. If you drew G1, the other coin is G2 (gold). If you drew G2, the other is G1 (gold). If you drew G3, the other is silver. That's <b>2 gold out of 3</b>.</p>
<p>The simulator shows the same thing: about two-thirds of gold draws come from the gold–gold box.</p>
<h2>Bayes' rule version</h2>
<p class="formula">P(gold–gold box | drew gold) = P(drew gold | gold–gold) × P(gold–gold) ÷ P(drew gold) = (1 × 1/3) ÷ (1/2) = 2/3</p>
<p>Seeing a gold coin is evidence. It's <em>certain</em> under the gold–gold box but only a coin-toss under the mixed box, so it shifts the odds towards gold–gold.</p>
<h2>Where it comes from</h2>
<p>French mathematician Joseph Bertrand posed it in his 1889 book on probability, as a warning about counting possibilities carelessly. Bertrand himself used the "two boxes left, so 1/2" argument as an example of reasoning that <em>looks</em> right but isn't. The same trap sits underneath the Monty Hall problem and the "boy or girl" puzzle.</p>`,
  faq: [
    ['What is the answer to Bertrand\'s box paradox?', '2/3. Given that you drew a gold coin, there is a 2/3 chance the other coin in the box is gold.'],
    ['Why isn\'t it 1/2?', 'Because the gold–gold box is twice as likely to produce a gold coin as the mixed box. Drawing gold is stronger evidence for the gold–gold box.'],
    ['How is it related to the Monty Hall problem?', 'Both come from treating outcomes as equally likely when they aren\'t. In both, the information you receive is more likely under one possibility than another, and that shifts the odds away from 50/50.'],
  ],
  related: ['monty-hall-problem', 'false-positive-paradox'],
},

/* =============================== FALSE POSITIVE =============================== */
{
  slug: 'false-positive-paradox', category: 'Statistics', icon: '🧪', short: 'False positive paradox',
  title: 'The false positive paradox: when a 99% accurate test is usually wrong',
  metaTitle: 'False Positive Paradox — Interactive Base Rate Calculator With 1,000 People',
  description: 'A test that\'s 99% accurate can still be wrong most of the time it says "positive". Adjust how rare the condition is and how accurate the test is, and watch 1,000 people.',
  tagline: 'A "99% accurate" test for a rare condition can be wrong most of the times it says yes.',
  teaser: 'A 99% accurate test can be wrong most times it says "positive". See 1,000 people.',
  puzzle: `<p>A condition affects 1 in 1,000 people. A test for it catches 99% of people who have it, and correctly clears 99% of people who don't. You test positive.</p>
<p>What's the chance you actually have it? Most people say about 99%. The real answer is <b>about 9%</b>. More than nine out of ten positive results are false alarms.</p>`,
  lab: `<section class="card lab" data-sim="false-positive">
<h2>🧪 Test 1,000 people</h2>
<div class="row presets"><span>Try:</span><button type="button" class="chip" data-preset="rare">Rare condition, very good test</button><button type="button" class="chip" data-preset="screen">Screening a 1-in-100 condition</button><button type="button" class="chip" data-preset="common">Common condition</button></div>
<div class="controls sliders">
<label>How common is the condition? <b data-v="prev"></b><input type="range" name="prev" min="0" max="9" step="1" value="0"></label>
<label>Sensitivity: positives caught <b data-v="sens"></b><input type="range" name="sens" min="50" max="100" step="1" value="99"></label>
<label>Specificity: negatives cleared <b data-v="spec"></b><input type="range" name="spec" min="0" max="9" step="1" value="7"></label>
</div>
<p class="result" data-result aria-live="polite"></p>
<div class="legend people-legend" data-legend></div>
<div class="people" data-people aria-hidden="true"></div>
<p class="msg" data-retest></p>
<p class="hint">The picture shows the expected numbers out of 1,000, rounded to whole people; the percentage is exact. These are illustrations, not figures for any real test.</p>
</section>`,
  explain: `<h2>Why it happens: the healthy outnumber the sick</h2>
<p>Picture 100,000 people. With a 1-in-1,000 condition, <b>100</b> have it and <b>99,900</b> don't.</p>
<ul>
<li>The test catches 99 of the 100 who have it.</li>
<li>It wrongly flags 1% of the 99,900 who don't: that's <b>999</b> false positives.</li>
</ul>
<p>So about 1,098 people test positive, and only 99 of them have the condition: <b>9%</b>. The test's 1% error rate is applied to a huge healthy group, and that swamps the small number of true cases.</p>
<p>This is the <b>base rate</b>: how common something is before you test for it. Ignoring it is called the base rate fallacy, and it's one of the most common reasoning mistakes, including among doctors, lawyers and juries.</p>
<h2>Accuracy has two halves</h2>
<ul>
<li><b>Sensitivity</b> is how many real cases the test catches. High sensitivity means few missed cases.</li>
<li><b>Specificity</b> is how many people without the condition the test correctly clears. For rare conditions, this is the number that matters most, because every fraction of a percent becomes a crowd of false positives. Try moving it from 99% to 99.9% in the simulator.</li>
</ul>
<h2>Bayes' rule</h2>
<p class="formula">P(has it | positive) = (sensitivity × prevalence) ÷ (sensitivity × prevalence + (1 − specificity) × (1 − prevalence))</p>
<p>Psychologist Gerd Gigerenzer showed that people get these questions right far more often when they're written as counts ("10 out of 1,000") rather than percentages, which is why the simulator shows a crowd of 1,000 people.</p>
<h2>What it doesn't mean</h2>
<p>It doesn't mean tests are useless. A positive result still raises the chance a lot (from 0.1% to 9% in the example), and a confirming second test can push it much higher. It's why screening programs follow a positive result with a different, more specific test. And if you have symptoms, you're no longer a random member of the population: your starting chance is higher, so a positive result means more. Always discuss real results with a doctor.</p>`,
  faq: [
    ['What is the false positive paradox?', 'When a condition is rare, even a very accurate test produces more false positives than true positives, so most positive results are wrong. It happens because the small error rate applies to the large number of people who don\'t have the condition.'],
    ['What is the difference between sensitivity and specificity?', 'Sensitivity is the share of people with the condition who test positive. Specificity is the share of people without the condition who test negative.'],
    ['Does a second test help?', 'Yes, if the second test is independent. Those who tested positive the first time are a group where the condition is far more common, so a second positive result is much more convincing.'],
  ],
  related: ['simpsons-paradox', 'bertrands-box-paradox'],
},
];

export const PARADOXES = [...LAUNCH, ...PROBABILITY, ...STATISTICS, ...PHYSICS, ...LOGIC];
