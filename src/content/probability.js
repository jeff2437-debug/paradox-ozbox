const sel = (name, opts, chosen) => `<select name="${name}">${opts.map(([v, t]) => `<option value="${v}"${v === chosen ? ' selected' : ''}>${t}</option>`).join('')}</select>`;

export const PROBABILITY = [
/* =============================== ST PETERSBURG =============================== */
{
  slug: 'st-petersburg-paradox', category: 'Probability', icon: '🎰', short: 'St Petersburg paradox',
  title: 'The St Petersburg paradox: a game worth infinite money',
  metaTitle: 'St Petersburg Paradox Simulator — Why an Infinite Expected Value Is Worth So Little',
  description: 'A coin-flip game with an infinite expected payout that nobody would pay much to play. Play it, simulate a million games, and see why.',
  tagline: 'A coin game whose average payout is infinite. So why wouldn\'t anyone pay $100 to play?',
  teaser: 'Its average payout is infinite, yet nobody would pay $100 to play. Run a million games.',
  puzzle: `<p>A casino offers a game. It flips a fair coin until it lands heads. If heads comes up on the first flip you win $2, on the second flip $4, on the third $8, and so on: the prize doubles with every tail.</p>
<p>How much should you pay to play? The maths says the average prize is <b>infinite</b>, so any price is a bargain. Yet most people wouldn't pay more than a few dollars, and they're arguably right.</p>`,
  lab: `<div data-sim="st-petersburg">
<section class="card lab">
<h2>🎰 Play one game</h2>
<div class="row"><button type="button" class="btn" data-play>Flip until heads</button></div>
<div class="flips" data-flips></div>
<p class="msg" data-msg aria-live="polite">Half the time you'll win just $2.</p>
<p class="msg" data-tally></p>
</section>
<section class="card lab">
<h2>📈 Play thousands of games</h2>
<div class="controls"><label>Games ${sel('games', [['1000', '1,000'], ['100000', '100,000'], ['1000000', '1,000,000']], '100000')}</label><button type="button" class="btn" data-run>Run again</button></div>
<div data-chart></div>
<div class="stats" data-out></div>
<p class="hint">Watch the jumps: the average sits low for long stretches, then one lucky long run of tails drags it up. Run it again and the final average will be quite different.</p>
</section>
<section class="card lab">
<h2>🏦 A casino with a limited bank</h2>
<div class="controls"><label>Most the casino can pay ${sel('bank', [['100', '$100'], ['10000', '$10,000'], ['1000000', '$1 million'], ['1000000000', '$1 billion'], ['1000000000000', '$1 trillion']], '1000000000')}</label></div>
<p class="msg" data-fair></p>
</section>
</div>`,
  explain: `<h2>Why the average is infinite</h2>
<p>There's a 1/2 chance of winning $2, a 1/4 chance of $4, a 1/8 chance of $8, and so on. Each possibility adds the same amount to the average:</p>
<p class="formula">½ × $2 + ¼ × $4 + ⅛ × $8 + … = $1 + $1 + $1 + … = ∞</p>
<p>The sum never stops growing. That's why the simulator's average never settles down: the more games you play, the more likely you are to hit a huge prize that drags it upwards.</p>
<h2>So why won't people pay much?</h2>
<p>Several answers have been proposed, and each says something useful about decisions under risk.</p>
<ul>
<li><b>Money matters less the more you have.</b> Daniel Bernoulli argued in 1738 that an extra $1,000 means far more to someone with nothing than to a millionaire. Measured in usefulness rather than dollars, the game is worth only a small, sensible amount. This idea, called diminishing marginal utility, is now a cornerstone of economics.</li>
<li><b>No casino has infinite money.</b> Once the prize would be bigger than the casino can pay, those outcomes stop counting. Even a casino with $1 billion makes the game worth only about $31. Try the bank setting above.</li>
<li><b>Tiny chances get ignored.</b> Most of the "infinite" value comes from outcomes so unlikely they will never happen in your lifetime. Half the time you get $2; nearly 97% of the time you get $32 or less.</li>
</ul>
<h2>Where the name comes from</h2>
<p>Nicolaus Bernoulli described the game in 1713. His cousin Daniel Bernoulli published his famous solution in the journal of the Imperial Academy of Sciences in St Petersburg, which gave the paradox its name.</p>
<h2>The lesson</h2>
<p>"Expected value" is a powerful tool, but it isn't the whole story when outcomes are extreme. It's the same reason a lottery ticket can have a terrible <a href="https://lotto.ozbox.org/guides/how-lottery-odds-work/">average return</a> yet still feel worth a few dollars, and why insurance is worth buying even though, on average, you pay more than you get back.</p>`,
  faq: [
    ['What is the expected value of the St Petersburg game?', 'Infinite. Each possible outcome contributes $1 to the average, and there are infinitely many outcomes.'],
    ['How much should you pay to play the St Petersburg game?', 'There\'s no single right answer. With a casino that can pay at most $1 billion, the game is worth about $31 on average. Using Bernoulli\'s idea of diminishing value of money, most people would sensibly pay somewhere between a few dollars and about $20.'],
    ['Who solved the St Petersburg paradox?', 'Daniel Bernoulli proposed the best-known solution in 1738, arguing that people care about the usefulness (utility) of money rather than the amount, and that each extra dollar matters less the more you have.'],
  ],
  related: ['two-envelopes-paradox', 'parrondos-paradox'],
},

/* =============================== BOY OR GIRL =============================== */
{
  slug: 'boy-or-girl-paradox', category: 'Probability', icon: '👧', short: 'Boy or girl paradox',
  title: 'The boy or girl paradox: why "at least one boy" changes everything',
  metaTitle: 'Boy or Girl Paradox (Two Child Problem) — Simulate 100,000 Families',
  description: 'A family has two children and at least one is a boy. What are the chances both are boys? 1/3, not 1/2. And a boy born on a Tuesday changes it again. Simulate it.',
  tagline: 'A family has two children, and at least one is a boy. Chance of two boys? Not 1/2.',
  teaser: 'At least one is a boy: chance of two boys is 1/3. Add "born on a Tuesday" and it changes again.',
  puzzle: `<p>Mr Smith has two children. You learn that <b>at least one of them is a boy</b>. What's the chance that both are boys?</p>
<p>It seems like it should be 1/2: the other child is either a boy or a girl. But the answer is <b>1/3</b>. And if you learn instead that the <em>older</em> child is a boy, the answer goes back to 1/2.</p>
<p>Stranger still: if you learn that at least one is <b>a boy born on a Tuesday</b>, the answer becomes 13/27, about 48%.</p>`,
  lab: `<div data-sim="boy-or-girl">
<section class="card lab">
<h2>👨‍👩‍👧‍👦 Forty random families</h2>
<div class="controls"><label>What do you know? ${sel('rule', [['any', 'At least one is a boy'], ['older', 'The older child is a boy'], ['tuesday', 'At least one is a boy born on a Tuesday'], ['met', 'You met one child at random: a boy']], 'any')}</label><button type="button" class="btn alt" data-new>New families</button></div>
<div class="fams" data-families></div>
<p class="msg" data-samplemsg aria-live="polite"></p>
<p class="hint">Each card is a family, older child first, with the weekday each was born. Faded families don't fit what you know; highlighted ones have two boys.</p>
</section>
<section class="card lab">
<h2>📊 Simulate 100,000 families</h2>
<p>Out of the families that fit each piece of information, how many have two boys?</p>
<div data-bars></div>
<p class="hint" data-simmsg></p>
<div class="row"><button type="button" class="btn" data-run>Run again</button></div>
</section>
</div>`,
  explain: `<h2>List the families</h2>
<p>Two-child families come in four equally likely kinds, listing the older child first: <b>boy–boy, boy–girl, girl–boy, girl–girl</b>.</p>
<ul>
<li><b>"At least one is a boy"</b> rules out only girl–girl. Three kinds remain, and only one of them is boy–boy: <b>1/3</b>.</li>
<li><b>"The older one is a boy"</b> rules out girl–boy and girl–girl. Two kinds remain: <b>1/2</b>.</li>
</ul>
<p>The difference is that "at least one is a boy" doesn't tell you <em>which</em> child, so boy–girl and girl–boy both survive.</p>
<h2>Why does Tuesday matter?</h2>
<p>Adding the weekday makes the boy you've been told about more "specific", almost like being told which child it is. Counting child-and-day combinations, there are 27 equally likely families with at least one Tuesday boy, and 13 of them have two boys: <b>13/27</b>, between 1/3 and 1/2. The more specific the detail (a birthday rather than a weekday), the closer the answer gets to 1/2.</p>
<h2>It depends how you found out</h2>
<p>The 1/3 answer assumes you learned "at least one is a boy" in a way that would be said whenever it's true, such as asking "Do you have at least one son?". If instead you simply meet one of the children at random and it happens to be a boy, the answer is 1/2. Same words, different process. The simulator's last option shows this.</p>
<p>That's the real lesson, and it matters well beyond puzzles: <b>the probability depends not only on what you know, but on how you came to know it</b>. Martin Gardner posed the puzzle in <em>Scientific American</em> in 1959, and later admitted the wording was ambiguous for exactly this reason. The Tuesday version was posed by puzzle designer Gary Foshee in 2010.</p>
<h2>Real families</h2>
<p>The puzzle assumes boys and girls are equally likely and independent. In reality slightly more boys are born than girls, but it barely changes the answers.</p>`,
  faq: [
    ['What is the answer to the boy or girl paradox?', 'If you know at least one of two children is a boy, the chance both are boys is 1/3. If you know a specific child (say the older one) is a boy, it\'s 1/2.'],
    ['Why is the Tuesday boy answer 13/27?', 'There are 27 equally likely combinations of sex and weekday in which at least one child is a boy born on a Tuesday, and 13 of those have two boys.'],
    ['Is the answer really 1/3 or 1/2?', 'It depends on how the information was obtained. If you asked "is at least one a boy?" and were told yes, it\'s 1/3. If you met one of the children at random and it was a boy, it\'s 1/2.'],
  ],
  related: ['bertrands-box-paradox', 'monty-hall-problem'],
},

/* =============================== TWO ENVELOPES =============================== */
{
  slug: 'two-envelopes-paradox', category: 'Probability', icon: '✉️', short: 'Two envelopes paradox',
  title: 'The two envelopes paradox: should you always switch?',
  metaTitle: 'Two Envelopes Paradox — Play It and Test Switching Strategies',
  description: 'One envelope holds twice the other. A seemingly perfect argument says you should always switch, forever. Play the game, test strategies, and find the flaw.',
  tagline: 'One envelope holds twice as much as the other. A neat argument says always switch. It can\'t be right.',
  teaser: 'A neat argument says always switch envelopes. Test it and find the flaw.',
  puzzle: `<p>You're given two sealed envelopes. One contains twice as much money as the other. You pick one and open it: there's $40 inside. You may keep it or switch.</p>
<p>Here's an argument for switching: the other envelope holds either $20 or $80, each equally likely. On average that's (20 + 80) ÷ 2 = <b>$50</b>, which beats $40. So switch!</p>
<p>But the same argument works whatever you find, and even before you open your envelope. So you should switch, then switch back, then switch again, forever. Something has gone wrong.</p>`,
  lab: `<div data-sim="two-envelopes">
<section class="card lab" data-play>
<h2>✉️ Play the game</h2>
<div class="envs"><button type="button" class="env"><span>Envelope A</span><b>?</b></button><button type="button" class="env"><span>Envelope B</span><b>?</b></button></div>
<p class="msg" data-msg aria-live="polite"></p>
<div class="row" data-choice hidden><button type="button" class="btn alt" data-act="keep">Keep it</button><button type="button" class="btn" data-act="swap">Switch</button></div>
<div class="stats"><div class="stat s1"><small>When you kept</small><b data-tally="keep"></b></div><div class="stat s2"><small>When you switched</small><b data-tally="swap"></b></div></div>
</section>
<section class="card lab" data-simulate>
<h2>📊 Test three strategies</h2>
<div class="controls"><label class="grow">Switch only if your envelope has less than <b data-tval></b><input type="range" name="threshold" min="1" max="250" value="100"></label><button type="button" class="btn" data-run>Run again</button></div>
<div data-bars></div>
<p class="hint" data-out></p>
</section>
</div>`,
  explain: `<h2>Where the argument goes wrong</h2>
<p>The argument treats "the other envelope has double" and "the other envelope has half" as equally likely <em>whatever amount you see</em>. That can't be true for every amount.</p>
<p>Think about it the other way round. Call the smaller amount <i>x</i>, so the pair is <i>x</i> and 2<i>x</i>. If you switch, you gain <i>x</i> when you had the small one and lose <i>x</i> when you had the big one. Each happens half the time, so switching gains nothing on average. The flawed argument mixes up two different values of <i>x</i> (one where you hold the small envelope and one where you hold the large one) as if they were the same.</p>
<p>The simulation agrees: always keeping and always switching give the same average.</p>
<h2>Once you look inside, the amount is a clue</h2>
<p>In any real game there's a limit to how much money is involved, so the amount you see tells you something. In our simulator the smaller amount is between $1 and $100. If you open an envelope with $150, it must be the larger one, so keep it. If you see $3, it's probably the smaller one.</p>
<p>That's why the third strategy, "switch only if the amount is low", beats both "always" strategies. Set the slider near $100 and it wins noticeably more. Surprisingly, mathematician Thomas Cover showed that even if you know nothing about how the amounts were chosen, picking a <em>random</em> threshold and switching below it still gives you better than a 50% chance of ending up with the bigger envelope.</p>
<h2>Is it fully solved?</h2>
<p>The simple version is: the switching argument uses an invalid probability. But variants where the amounts are drawn from strange, unbounded distributions still get debated by philosophers and statisticians, which is why the paradox keeps turning up. An earlier form, about two men comparing the price of their neckties, appeared in Maurice Kraitchik's puzzle book in 1953.</p>`,
  faq: [
    ['Should you switch in the two envelopes problem?', 'If you haven\'t looked inside, switching makes no difference: both envelopes have the same expected value. If you have looked, the amount can be a clue, and switching when the amount seems small is a good strategy.'],
    ['What is wrong with the two envelopes argument?', 'It assumes the other envelope is equally likely to hold double or half whatever amount you found. For any realistic way of choosing the amounts, that can\'t be true for every amount.'],
    ['Is there a strategy that beats 50%?', 'Yes. Switching only when the amount is below a threshold does better than 50%, provided the threshold sometimes falls between the two amounts. Even a randomly chosen threshold works.'],
  ],
  related: ['st-petersburg-paradox', 'monty-hall-problem'],
},

/* =============================== PARRONDO =============================== */
{
  slug: 'parrondos-paradox', category: 'Probability', icon: '🔀', short: 'Parrondo\'s paradox',
  title: 'Parrondo\'s paradox: two losing games that win together',
  metaTitle: 'Parrondo\'s Paradox Simulator — Combine Two Losing Games and Win',
  description: 'Game A loses money. Game B loses money. Play them in the right mix and you win. Simulate 2,000 players and see how Parrondo\'s paradox works.',
  tagline: 'Two gambling games that each lose money in the long run. Alternate them, and you win.',
  teaser: 'Two losing games. Play them alternately and you win. Simulate 2,000 players.',
  puzzle: `<p>You have two coin-flip games, and each pays $1 for a win and takes $1 for a loss:</p>
<ul>
<li><b>Game A:</b> a coin that wins slightly less than half the time (49.5%).</li>
<li><b>Game B:</b> if your money is a multiple of 3, a bad coin that wins only 9.5% of the time. Otherwise, a good coin that wins 74.5% of the time.</li>
</ul>
<p>Played on its own, each game slowly loses money. But switch between them, even at random, and <b>you start winning</b>. Two losing games make a winning one.</p>`,
  lab: `<div data-sim="parrondo">
<section class="card lab">
<h2>🔀 Simulate 2,000 players</h2>
<div class="controls"><label>Rounds ${sel('rounds', [['200', '200'], ['500', '500'], ['1000', '1,000']], '500')}</label><button type="button" class="btn" data-run>Run again</button></div>
<div data-chart></div>
<div class="stats" data-out></div>
<p class="hint">Each line is the average winnings of 2,000 simulated players who all start with $0. The dashed line is break-even.</p>
</section>
</div>`,
  explain: `<h2>Why game B loses on its own</h2>
<p>Game B's bad coin is used whenever your money is a multiple of 3. Played alone, game B keeps steering you back to multiples of 3, so you use the bad coin about 38% of the time rather than a third. That's just enough to make it a losing game.</p>
<h2>Why mixing in game A helps</h2>
<p>Game A is close to a fair coin flip, so it "shakes up" your money and breaks the pattern that game B creates. After a round of A, you're on a multiple of 3 about a third of the time, and game B's good coin gets used more often. B's gains on the good coin then outweigh A's small losses.</p>
<p>In other words, game B has a hidden structure that works against you when you play it alone, and game A disrupts that structure. Neither game is a winner, but together they are.</p>
<h2>It isn't a free lunch</h2>
<p>This doesn't mean you can beat a casino by switching tables. Parrondo's trick depends on game B's odds depending on your current money, which real casino games don't. But the idea that combining two losing strategies can win shows up in real systems:</p>
<ul>
<li><b>Biology:</b> a population can survive by switching between two behaviours that would each lead to extinction on their own.</li>
<li><b>Investing:</b> regularly rebalancing between two volatile assets can grow, even when each one alone tends to shrink. This is sometimes called "volatility pumping".</li>
<li><b>Physics:</b> it's a game version of the "Brownian ratchet", where random jiggling plus a switching barrier produces steady motion.</li>
</ul>
<h2>History</h2>
<p>Spanish physicist Juan Parrondo devised the games in 1996 to illustrate the Brownian ratchet. They became widely known after Gregory Harmer and Derek Abbott, at the University of Adelaide, published them in <em>Nature</em> in 1999.</p>`,
  faq: [
    ['What is Parrondo\'s paradox?', 'Two games that each lose money when played alone can produce a winning result when played in alternation or in a random mix.'],
    ['How does Parrondo\'s paradox work?', 'One game\'s odds depend on your current capital. Played alone, it keeps you in its worst state too often. Mixing in a second, nearly fair game breaks that pattern, so the good odds get used more often.'],
    ['Can Parrondo\'s paradox beat a casino?', 'No. It needs a game whose odds depend on how much money you have, and real casino games don\'t work that way.'],
  ],
  related: ['st-petersburg-paradox', 'penneys-game'],
},

/* =============================== INSPECTION =============================== */
{
  slug: 'inspection-paradox', category: 'Probability', icon: '🚌', short: 'Inspection paradox',
  title: 'The inspection paradox: why you always seem to wait longer for the bus',
  metaTitle: 'Inspection Paradox (Waiting Time Paradox) — Bus Stop Simulator',
  description: 'Buses come every 10 minutes on average, so you should wait 5 minutes. But if they\'re irregular you wait longer, up to 10. Simulate a bus stop and see why.',
  tagline: 'Buses come every 10 minutes on average. So why do you wait more than 5?',
  teaser: 'Buses every 10 minutes on average, yet your wait can be 10 minutes too. Simulate a stop.',
  puzzle: `<p>Buses on your route come every 10 minutes on average. If you turn up at a random time, you'd expect to wait half of that: 5 minutes.</p>
<p>That's only true if the buses run like clockwork. If they're irregular, your average wait is <b>longer than 5 minutes</b>. If they arrive completely at random, it's <b>10 minutes</b>, the same as the average gap between buses.</p>`,
  lab: `<div data-sim="inspection">
<section class="card lab">
<h2>🚌 Simulate a bus stop</h2>
<div class="controls"><label>How the buses run ${sel('pattern', [['clockwork', 'Like clockwork: every 10 minutes'], ['irregular', 'A bit irregular: 2 to 18 minutes apart'], ['bunched', 'Bunched: 2 minutes, then 18'], ['random', 'Completely random (average 10)']], 'random')}</label><button type="button" class="btn" data-run>Run again</button></div>
<svg class="timeline" data-timeline viewBox="0 0 640 100" role="img" aria-label="Bus arrivals and passenger waits over three hours"></svg>
<div class="legend"><span><i style="background:#2a78d6"></i>Bus arrives</span><span><i style="background:#eb6834"></i>A passenger arrives and waits</span></div>
<div class="stats" data-out></div>
<p class="hint" data-note></p>
</section>
</div>`,
  explain: `<h2>Why it happens: you're more likely to arrive during a long gap</h2>
<p>Suppose buses alternate between a 2-minute gap and an 18-minute gap. The average gap is 10 minutes. But if you turn up at a random moment, you're 9 times more likely to land in an 18-minute gap than a 2-minute one, simply because it lasts 9 times longer.</p>
<p>So the gaps that passengers <em>experience</em> are longer than the gaps the timetable promises. Long gaps get "inspected" more often. In the simulator, compare the average time between buses with the average gap a passenger lands in.</p>
<p>The formula is that your average wait equals the average of the <em>squared</em> gaps divided by twice the average gap. The more the gaps vary, the bigger it gets:</p>
<p class="formula">average wait = E[gap²] ÷ (2 × E[gap])</p>
<h2>It's everywhere</h2>
<ul>
<li><b>Class sizes.</b> A university can truthfully say its average class has 30 students, while the average student is in a class of 80. Big classes contain more students, so more students experience them.</li>
<li><b>Crowded places.</b> The beach, the gym and the restaurant always seem busier than the average, because you're one of the crowd on the busy days.</li>
<li><b>Family size.</b> Ask people how many siblings they have, and the answers will be higher than the average family suggests: big families contribute more children to ask.</li>
<li><b>Prison sentences.</b> A survey of prisoners on any given day over-represents long sentences, since people serving long sentences are more likely to be there when you look.</li>
</ul>
<p>The same effect is behind the <a href="/friendship-paradox/">friendship paradox</a>: popular people show up in more friend lists.</p>`,
  faq: [
    ['What is the inspection paradox?', 'When you sample something by arriving at a random time or picking a random person, longer intervals and larger groups are more likely to be picked. So what you observe is biased towards the large ones.'],
    ['How long will I wait for a bus that comes every 10 minutes?', 'If the buses are perfectly regular, 5 minutes on average. If they\'re irregular, longer. If they arrive completely at random, 10 minutes.'],
    ['Why does my bus always seem late?', 'Partly because of the inspection paradox. You are more likely to arrive during a long gap between buses than a short one, so your typical wait is longer than half the average gap.'],
  ],
  related: ['friendship-paradox', 'birthday-paradox'],
},

/* =============================== FRIENDSHIP =============================== */
{
  slug: 'friendship-paradox', category: 'Probability', icon: '🫂', short: 'Friendship paradox',
  title: 'The friendship paradox: your friends have more friends than you',
  metaTitle: 'Friendship Paradox — Interactive Network Shows Why Your Friends Are More Popular',
  description: 'On average, your friends have more friends than you do. It\'s true for most people, and it\'s just maths. Explore a network and see why.',
  tagline: 'On average, your friends have more friends than you do. It\'s not you; it\'s maths.',
  teaser: 'Most people\'s friends have more friends than they do. Tap through a network to see why.',
  puzzle: `<p>Count your friends. Now count how many friends each of your friends has, and average it. For most people, the second number is <b>bigger</b>.</p>
<p>It sounds like a statement about popularity or self-esteem, but it's a mathematical certainty in almost any network: on average, people's friends are more popular than they are.</p>`,
  lab: `<div data-sim="friendship">
<section class="card lab">
<h2>🫂 Explore a friendship network</h2>
<p>Each circle is a person; the number is how many friends they have. Lines are friendships.</p>
<svg class="net" data-net viewBox="0 0 640 380" role="img" aria-label="A friendship network of 50 people"></svg>
<p class="msg" data-person aria-live="polite"></p>
<p class="msg" data-small></p>
<div class="row"><button type="button" class="btn alt" data-new>New network</button></div>
</section>
<section class="card lab">
<h2>📊 In a bigger network</h2>
<div class="stats" data-out></div>
<p class="hint" data-bignote></p>
</section>
</div>`,
  explain: `<h2>Why it happens: popular people are on more lists</h2>
<p>Imagine asking everyone to list their friends. A person with 20 friends appears on 20 lists. A person with 1 friend appears on just one. When you average "how many friends do my friends have" across everyone, the popular people get counted over and over, so they pull the average up.</p>
<p>That's the same idea as the <a href="/inspection-paradox/">inspection paradox</a>: when you sample by following a friendship, you're more likely to land on someone well-connected.</p>
<p>Counted friendship by friendship, the average number of friends a friend has is the ordinary average plus an extra amount that depends on how unequal people are:</p>
<p class="formula">average friends of friends = mean + variance ÷ mean</p>
<p>The more unequal the network (a few very popular people and many with few friends), the bigger the gap. Real social networks are very unequal, so the effect is strong.</p>
<h2>Useful, not just humbling</h2>
<ul>
<li><b>Spotting outbreaks early.</b> Researchers have found that if you monitor the <em>friends</em> of randomly chosen people, they tend to catch the flu earlier than the people themselves, giving early warning of an epidemic.</li>
<li><b>Vaccination.</b> Vaccinating a random person's friend, rather than the random person, tends to reach better-connected people who would otherwise spread disease more.</li>
<li><b>Social media.</b> The same effect means the accounts you follow usually have more followers than you, and your feed over-represents the most active posters.</li>
</ul>
<h2>History</h2>
<p>Sociologist Scott Feld described the friendship paradox in 1991, in a paper titled "Why your friends have more friends than you do".</p>`,
  faq: [
    ['Is the friendship paradox true?', 'Yes. In almost any network where people have different numbers of friends, the average number of friends of a person\'s friends is higher than the average number of friends. It\'s a mathematical result, not a survey finding.'],
    ['Why do my friends have more friends than me?', 'Because people with many friends appear in many friend lists, they are over-represented when you look at "friends of someone". Your friends are more likely than a random person to be well-connected.'],
    ['Does the friendship paradox apply to everyone?', 'Not to every individual, but to most people and on average. Very popular people are the exception: their friends often have fewer friends than they do.'],
  ],
  related: ['inspection-paradox', 'simpsons-paradox'],
},
];
