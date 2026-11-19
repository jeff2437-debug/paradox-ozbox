const sel = (name, opts, chosen) => `<select name="${name}">${opts.map(([v, t]) => `<option value="${v}"${v === chosen ? ' selected' : ''}>${t}</option>`).join('')}</select>`;

export const STATISTICS = [
/* =============================== BENFORD =============================== */
{
  slug: 'benfords-law', category: 'Statistics', icon: '1️⃣', short: 'Benford\'s law',
  title: 'Benford\'s law: why so many numbers start with 1',
  metaTitle: 'Benford\'s Law Checker — Test Any List of Numbers for the First Digit Pattern',
  description: 'In many real-world lists of numbers, about 30% start with 1 and under 5% start with 9. Test built-in data sets or paste your own numbers to check Benford\'s law.',
  tagline: 'In many real-life lists of numbers, almost a third start with the digit 1.',
  teaser: 'Nearly a third of real-world numbers start with 1. Paste your own numbers and test it.',
  puzzle: `<p>Take a big list of real-world numbers: populations of towns, house prices, river lengths, company revenues, numbers in an annual report. What fraction start with the digit 1? You'd guess one in nine, about 11%, since there are nine possible leading digits.</p>
<p>In fact it's about <b>30%</b>. Numbers starting with 2 make up about 18%, and by the time you reach 9 it's under <b>5%</b>. This pattern is called Benford's law.</p>`,
  lab: `<div data-sim="benford">
<section class="card lab">
<h2>1️⃣ Test a data set</h2>
<div class="controls"><label>Numbers ${sel('data', [['powers', 'Powers of 2 (2, 4, 8, 16 …)'], ['fib', 'Fibonacci numbers (1, 1, 2, 3, 5, 8 …)'], ['growth', 'Towns growing at random rates for random years'], ['products', 'Random numbers multiplied together'], ['uniform', 'Random whole numbers from 1 to 999'], ['heights', 'Adult heights in centimetres']], 'powers')}</label><button type="button" class="btn alt" data-run>Regenerate</button></div>
<div data-bars></div>
<p class="msg" data-msg aria-live="polite"></p>
<p class="hint">Blue bars are the share of numbers starting with each digit. The thin dark marks show what Benford's law predicts.</p>
<h3>Try your own numbers</h3>
<p class="hint">Paste a column from a spreadsheet, your bank statement amounts, or populations from a table. At least a few hundred numbers spanning several orders of magnitude works best.</p>
<textarea name="mine" rows="4" placeholder="e.g. 1234, 56.7, 890 …"></textarea>
<div class="row"><button type="button" class="btn" data-mine>Check my numbers</button></div>
</section>
</div>`,
  explain: `<h2>The law</h2>
<p>The chance that a number starts with digit <i>d</i> is:</p>
<p class="formula">P(d) = log₁₀(1 + 1/d)</p>
<div class="tablewrap"><table><thead><tr><th>First digit</th><th class="n">1</th><th class="n">2</th><th class="n">3</th><th class="n">4</th><th class="n">5</th><th class="n">6</th><th class="n">7</th><th class="n">8</th><th class="n">9</th></tr></thead><tbody>
<tr><td>Share</td><td class="n">30.1%</td><td class="n">17.6%</td><td class="n">12.5%</td><td class="n">9.7%</td><td class="n">7.9%</td><td class="n">6.7%</td><td class="n">5.8%</td><td class="n">5.1%</td><td class="n">4.6%</td></tr>
</tbody></table></div>
<h2>Why it happens: growth spends longer in the 1s</h2>
<p>Picture a town growing by 10% a year. To go from 1,000 to 2,000 people it has to double, which takes over 7 years. To go from 9,000 to 10,000 it only needs to grow by 11%, which takes about a year. So if you check the town at a random moment, it's far more likely to have a population starting with 1 than with 9.</p>
<p>Anything that grows by multiplying (populations, prices, investments, physical quantities) behaves this way. Benford's law is what you get when numbers are spread evenly on a <em>logarithmic</em> scale, as on a slide rule: the stretch from 1 to 2 is much wider than the stretch from 9 to 10.</p>
<h2>When it doesn't apply</h2>
<p>Numbers that live in a narrow range don't follow it. Adult heights in centimetres nearly all start with 1, and random numbers from 1 to 999 are spread evenly. Numbers that are assigned rather than measured, like phone numbers or postcodes, don't follow it either. The data needs to span several orders of magnitude.</p>
<h2>Catching fraudsters</h2>
<p>When people invent numbers, they tend to spread the first digits too evenly. Forensic accountants use Benford's law to flag suspicious expense claims, tax returns and accounts for a closer look. It doesn't prove fraud on its own, but a big departure from the pattern is a good reason to dig deeper.</p>
<h2>History</h2>
<p>Astronomer Simon Newcomb noticed in 1881 that the early pages of books of logarithm tables, for numbers starting with 1, were far more worn than the later pages. Physicist Frank Benford rediscovered the pattern in 1938 and tested it on more than 20,000 numbers from sources as varied as river areas, baseball statistics and street addresses.</p>`,
  faq: [
    ['What is Benford\'s law?', 'In many real-world collections of numbers, the leading digit is more likely to be small: about 30% of numbers start with 1, and under 5% start with 9.'],
    ['Why does Benford\'s law work?', 'It applies to numbers that are spread across several orders of magnitude and grow multiplicatively. Such numbers spend proportionally longer with a leading 1 than with a leading 9.'],
    ['Can Benford\'s law detect fraud?', 'It can flag data that looks suspicious, because invented numbers often don\'t follow the pattern. Auditors use it to decide what to investigate, but it isn\'t proof on its own.'],
  ],
  related: ['regression-to-the-mean', 'coastline-paradox'],
},

/* =============================== BERKSON =============================== */
{
  slug: 'berksons-paradox', category: 'Statistics', icon: '🎭', short: 'Berkson\'s paradox',
  title: 'Berkson\'s paradox: why the best-looking actors seem worse at acting',
  metaTitle: 'Berkson\'s Paradox (Collider Bias) — Interactive Casting Simulation',
  description: 'Talent and looks are unrelated, but among the actors who get cast, the better-looking ones seem less talented. Adjust how picky the casting is and watch a fake link appear.',
  tagline: 'Select people on two qualities, and those qualities will seem to work against each other.',
  teaser: 'Talent and looks are unrelated, until you only look at actors who got cast.',
  puzzle: `<p>Suppose acting talent and good looks have nothing to do with each other. A casting director hires people who are strong on the two <em>combined</em>: an actor can get in by being very talented, very good-looking, or reasonably good at both.</p>
<p>Now look only at the actors who were hired. Among them, the best-looking ones really do tend to be <b>worse at acting</b>, and vice versa. A link has appeared out of nowhere.</p>`,
  lab: `<div data-sim="berkson">
<section class="card lab">
<h2>🎭 Run the auditions</h2>
<div class="controls"><label class="grow">Casting picks the <b data-pickv></b> on talent plus looks<input type="range" name="pick" min="5" max="100" value="20"></label><button type="button" class="btn alt" data-new>New crowd</button></div>
<svg class="net" data-plot viewBox="0 0 640 380" role="img" aria-label="Scatter plot of talent and looks, with cast actors highlighted"></svg>
<div class="legend"><span><i style="background:#2a78d6"></i>Cast</span><span><i style="background:#d3cfe0"></i>Not cast</span></div>
<div class="stats" data-out></div>
<p class="hint">Correlation runs from −1 (perfectly opposite) through 0 (no link) to +1 (perfectly together). Slide to 100% to include everyone and the link disappears.</p>
</section>
</div>`,
  explain: `<h2>Why it happens</h2>
<p>The selection rule cuts the crowd with a diagonal line. Everyone above it is in; everyone below is out. Within the selected group, someone with low talent can only be there because their looks are high, and someone with plain looks can only be there because their talent is high. The people who are low on both have been removed. What's left forms a band sloping the "wrong" way.</p>
<p>Statisticians call this <b>collider bias</b> or selection bias: when two things both affect whether something gets into your sample, looking only at the sample creates a link between them.</p>
<h2>Everyday examples</h2>
<ul>
<li><b>Restaurants:</b> places in great locations often seem to have worse food. A restaurant with a bad location and bad food closes; one with a great location can survive with average food.</li>
<li><b>Dating:</b> the very attractive people you've dated may seem less kind. You'd rarely date someone who was neither attractive nor kind, so those people are missing from your experience, and your own choices create the pattern.</li>
<li><b>Universities:</b> among students at a selective university, test scores and school grades can look negatively related, because admission needs a high combination of both.</li>
<li><b>Hospitals:</b> Joseph Berkson, a statistician at the Mayo Clinic, described the effect in 1946. Two diseases can appear linked (or protective of each other) in hospital patients simply because having either one gets you admitted.</li>
</ul>
<h2>How to avoid being fooled</h2>
<p>Ask how the things you're looking at got into your data. If they were filtered by a rule that involves both qualities, any link between them may be created by the filter. Looking at the whole population, not just the selected few, is the cure.</p>`,
  faq: [
    ['What is Berkson\'s paradox?', 'When a group is selected based on two qualities combined, those qualities can appear negatively related within the group even though they are unrelated in the wider population.'],
    ['What is an example of Berkson\'s paradox?', 'Among hired actors, better-looking ones may seem less talented, because people who were weak on both were never hired. Hospital patients and university students show similar effects.'],
    ['Is Berkson\'s paradox the same as collider bias?', 'Yes, essentially. Both describe a false association created by selecting a sample based on an outcome that both variables influence.'],
  ],
  related: ['simpsons-paradox', 'regression-to-the-mean'],
},

/* =============================== REGRESSION TO THE MEAN =============================== */
{
  slug: 'regression-to-the-mean', category: 'Statistics', icon: '📉', short: 'Regression to the mean',
  title: 'Regression to the mean: why top scorers do worse next time',
  metaTitle: 'Regression to the Mean Explained — Interactive Test Score Simulation',
  description: 'The top scorers on one test usually score lower on the next, and the bottom scorers improve, with no change in ability. Adjust how much luck is involved and watch it happen.',
  tagline: 'The best performers usually do worse next time, and the worst do better. Nothing changed but luck.',
  teaser: 'Top scorers slip and bottom scorers improve, without anyone changing. Dial up the luck.',
  puzzle: `<p>A class sits a test. The top 10% are praised; the bottom 10% are given a stern talking-to. On the next test, the top group's average <b>falls</b> and the bottom group's average <b>rises</b>.</p>
<p>It's tempting to conclude that praise makes people lazy and criticism works. But you'd see exactly the same pattern if nobody had said anything at all.</p>`,
  lab: `<div data-sim="regression">
<section class="card lab">
<h2>📉 Two tests, 1,000 students</h2>
<div class="controls"><label class="grow">Each score is <b data-luckv></b><input type="range" name="luck" min="0" max="100" value="40"></label><button type="button" class="btn alt" data-new>New class</button></div>
<div data-bars></div>
<svg class="net" data-plot viewBox="0 0 640 340" role="img" aria-label="Scatter plot of test 1 scores against test 2 scores"></svg>
<div class="legend"><span><i style="background:#2a78d6"></i>Top 10% on test 1</span><span><i style="background:#eb6834"></i>Bottom 10% on test 1</span></div>
<p class="hint">Each student's skill is the same for both tests; only their luck on the day changes. Points on the dashed line scored the same on both tests. Set luck to 0% and the effect disappears; set it to 100% and both groups fall back to average.</p>
</section>
</div>`,
  explain: `<h2>Why it happens</h2>
<p>Any score is part <b>skill</b> and part <b>luck</b>: a good night's sleep, the right questions coming up, a lucky guess. To get into the top 10%, you usually need skill <em>and</em> good luck. Next time, your skill is still there, but your luck is a fresh draw, and on average it's ordinary. So your score drifts back towards the middle. The bottom group had mostly bad luck, so they drift back up.</p>
<p>The more luck matters, the stronger the pull. If scores were pure skill, there would be no regression at all. If they were pure luck, the top group's next score would be completely average.</p>
<h2>Where it fools people</h2>
<ul>
<li><b>Praise and punishment.</b> Psychologist Daniel Kahneman described flight instructors who were convinced that praising a great landing made the next one worse, while shouting at a bad landing made the next one better. Regression to the mean explains both, with no effect from the praise or the shouting.</li>
<li><b>The "cover jinx".</b> Athletes who appear on magazine covers after a great season often have a worse one next. They were picked at a high point that included good luck.</li>
<li><b>Treatments that seem to work.</b> People tend to try a new remedy when their symptoms are at their worst, and symptoms often improve on their own afterwards. That's why medical trials need a comparison group.</li>
<li><b>Speed cameras and black spots.</b> Cameras placed at sites after a run of unusually many crashes will appear to cut crashes, partly because the next period was likely to be calmer anyway. Good evaluations allow for this.</li>
<li><b>Sports coaches and managers</b> sacked after a bad run often seem to be followed by an improvement, whoever replaces them.</li>
</ul>
<h2>History</h2>
<p>Francis Galton noticed in the 1880s that very tall parents tend to have children who are tall, but less extremely so, and short parents have children who are short but closer to average. He called it "regression towards mediocrity", which is where the word "regression" in statistics comes from.</p>`,
  faq: [
    ['What is regression to the mean?', 'When a measurement is partly due to chance, extreme results tend to be followed by results closer to the average, simply because the luck that helped produce the extreme result isn\'t repeated.'],
    ['What is an example of regression to the mean?', 'Students who score highest on one test tend to score a bit lower on the next, and the lowest scorers tend to improve, even if nothing about their ability has changed.'],
    ['How do you avoid being fooled by regression to the mean?', 'Compare with a control group that was selected the same way but didn\'t receive the treatment, praise or change you\'re testing. Any improvement in both groups is likely regression to the mean.'],
  ],
  related: ['berksons-paradox', 'simpsons-paradox'],
},

/* =============================== WILL ROGERS =============================== */
{
  slug: 'will-rogers-phenomenon', category: 'Statistics', icon: '🤠', short: 'Will Rogers phenomenon',
  title: 'The Will Rogers phenomenon: move one number, raise both averages',
  metaTitle: 'Will Rogers Phenomenon (Stage Migration) — Move Numbers and Raise Both Averages',
  description: 'Moving one item from one group to another can raise the average of both groups without changing anything. Try it, and see why it can make cancer survival rates look better.',
  tagline: 'Move one number from one group to another, and both averages go up.',
  teaser: 'Move one number between two groups and both averages rise. Try it.',
  puzzle: `<p>American humorist Will Rogers is said to have joked that when people from Oklahoma moved to California during the Great Depression, they <b>raised the average intelligence of both states</b>.</p>
<p>It sounds like a contradiction, but it's arithmetically possible. And it happens, with real consequences, in medical statistics.</p>`,
  lab: `<div data-sim="will-rogers">
<section class="card lab">
<h2>🤠 Move a number</h2>
<p>Click a number to move it to the other group.</p>
<div class="groups">
<div class="group"><h3>Group A</h3><div class="chips" data-group="A"></div><p data-avg="A"></p></div>
<div class="group"><h3>Group B</h3><div class="chips" data-group="B"></div><p data-avg="B"></p></div>
</div>
<p class="msg" data-msg aria-live="polite"></p>
<div class="row"><button type="button" class="btn alt" data-reset>Start again</button></div>
</section>
</div>`,
  explain: `<h2>Why it works</h2>
<p>Group A averages 70 and group B averages 25. The number 50 is <em>below</em> A's average, so taking it out of A raises A's average. But 50 is <em>above</em> B's average, so adding it to B raises B's average too. Both go up, while the overall average of all nine numbers stays exactly the same.</p>
<p>The rule: moving an item raises both averages whenever it sits between the two group averages.</p>
<h2>Stage migration in medicine</h2>
<p>Cancer patients are grouped into stages by how far the disease has spread. Suppose a new, more sensitive scan finds tiny spreads that older scans missed. Some patients who would have been called "early stage" are now called "late stage".</p>
<ul>
<li>Those patients were the sickest of the early-stage group, so removing them <b>raises survival</b> in the early group.</li>
<li>They are healthier than the typical late-stage patient, so adding them <b>raises survival</b> in the late group too.</li>
</ul>
<p>Survival improves in every stage, yet no individual patient lives a day longer. Doctor Alvan Feinstein and colleagues described this in lung cancer in 1985 and named it the Will Rogers phenomenon. It's one reason comparing survival rates across years or countries needs care.</p>
<h2>Other places it turns up</h2>
<ul>
<li><b>Sports leagues:</b> transferring a player who's below average for a strong team but above average for a weak one can make both teams' averages look better.</li>
<li><b>Moving a school boundary</b> can raise the average results of both schools without any student learning more.</li>
<li><b>Reclassifying employees</b> between grades can improve both grades' average performance ratings.</li>
</ul>`,
  faq: [
    ['What is the Will Rogers phenomenon?', 'Moving an element from one group to another raises the average of both groups. It happens when the element is below the average of the group it leaves and above the average of the group it joins.'],
    ['What is stage migration?', 'When better diagnosis moves patients into a more advanced cancer stage, survival can improve in every stage even though no one\'s outcome has changed. It\'s a medical example of the Will Rogers phenomenon.'],
    ['Did Will Rogers really say it?', 'The joke about Oklahomans moving to California is widely attributed to him, though like many famous quotes its exact origin is hard to pin down.'],
  ],
  related: ['simpsons-paradox', 'regression-to-the-mean'],
},
];
