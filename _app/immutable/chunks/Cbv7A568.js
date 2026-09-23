const c="02",s="program_structure",n="بنية البرنامج",a="Program Structure",e=[{depth:2,id:"التعبيرات-والجمل",text:"التعبيرات والجمل"},{depth:2,id:"الارتباطات",text:"الارتباطات"},{depth:2,id:"أسماء-الارتباطات",text:"أسماء الارتباطات"},{depth:2,id:"البيئة",text:"البيئة"},{depth:2,id:"الدوال",text:"الدوال"},{depth:2,id:"دالة-consolelog",text:"دالة console.log"},{depth:2,id:"القيم-المعادة",text:"القيم المعادة"},{depth:2,id:"مسار-التحكم",text:"مسار التحكم"},{depth:2,id:"التنفيذ-الشرطي",text:"التنفيذ الشرطي"},{depth:2,id:"حلقتا-while-وdo",text:"حلقتا while وdo"},{depth:2,id:"إزاحة-الشيفرة",text:"إزاحة الشيفرة"},{depth:2,id:"حلقات-for",text:"حلقات for"},{depth:2,id:"الخروج-من-حلقة",text:"الخروج من حلقة"},{depth:2,id:"تحديث-الارتباطات-بإيجاز",text:"تحديث الارتباطات بإيجاز"},{depth:2,id:"التوزيع-حسب-قيمة-باستخدام-switch",text:"التوزيع حسب قيمة باستخدام switch"},{depth:2,id:"كتابة-الأحرف-الكبيرة",text:"كتابة الأحرف الكبيرة"},{depth:2,id:"التعليقات",text:"التعليقات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"تكرار-مثلث",text:"تكرار مثلث"},{depth:3,id:"fizzbuzz",text:"FizzBuzz"},{depth:3,id:"رقعة-الشطرنج",text:"رقعة الشطرنج"}],l=`<blockquote>
<p>ويتوهج قلبي أحمرَ زاهياً تحت جلدي الغشائي الشفاف، وعليهم أن يحقنوني بـ10 سم مكعب من JavaScript لأعود. (أستجيب جيداً للسموم في الدم.) يا رجل، تلك المادة ستقذف حبات الخوخ من خياشيمك مباشرة!</p>
<p>— _why, Why's (Poignant) Guide to Ruby</p>
</blockquote>
<p><img src="/images/book/chapter_picture_2.jpg" alt="رسم توضيحي يظهر عدداً من المجسّات وهي تحمل قطع شطرنج"></p>
<p>في هذا الفصل، سنبدأ بفعل أشياء يمكن أن تُسمى فعلاً <em>برمجة</em>. سنوسع تمكننا من لغة JavaScript بما يتجاوز الأسماء والجمل الناقصة التي رأيناها حتى الآن، إلى حد نستطيع فيه التعبير بنثر ذي معنى.</p>
<h2 id="التعبيرات-والجمل">التعبيرات والجمل</h2>
<p>في <a href="/chapter/values_types_and_operators">الفصل 1</a>، أنشأنا قيماً وطبقنا عليها معاملات للحصول على قيم جديدة. إن إنشاء قيم كهذه هو الجوهر الأساسي لأي برنامج JavaScript. لكن هذا الجوهر يجب أن يُؤطَّر في بنية أكبر ليكون مفيداً. وهذا ما سنتناوله في هذا الفصل.</p>
<p>يُسمى جزء الشيفرة الذي ينتج قيمة <em>تعبيراً</em> (expression). وكل قيمة تُكتب حرفياً (مثل <code>22</code> أو <code>&quot;psychoanalysis&quot;</code>) هي تعبير. والتعبير الموضوع بين قوسين هو أيضاً تعبير، وكذلك المعامل الثنائي المطبَّق على تعبيرين أو المعامل الأحادي المطبَّق على تعبير واحد.</p>
<p>يوضح هذا جزءاً من جمال الواجهة القائمة على اللغة. يمكن للتعبيرات أن تحتوي تعبيرات أخرى بطريقة تشبه تداخل الجمل الفرعية في اللغات البشرية — إذ يمكن للجملة الفرعية أن تحتوي جملها الفرعية الخاصة، وهكذا. وهذا يتيح لنا بناء تعبيرات تصف حسابات معقدة كما نشاء.</p>
<p>إذا كان التعبير يقابل جزء جملة، فإن <em>الجملة</em> (statement) في JavaScript تقابل جملة كاملة. والبرنامج قائمة من الجمل.</p>
<p>أبسط أنواع الجمل هو تعبير تليه فاصلة منقوطة. وهذا برنامج:</p>
<pre><code class="language-js"><span class="hljs-number">1</span>;
!<span class="hljs-literal">false</span>;
</code></pre>
<p>لكنه برنامج عديم الفائدة. يمكن للتعبير أن يكتفي بإنتاج قيمة، يمكن للشيفرة المحيطة به استخدامها. غير أن الجملة قائمة بذاتها، لذا إن لم تؤثر في العالم فهي عديمة الفائدة. قد تعرض شيئاً على الشاشة، كما في <code>console.log</code>، أو تغيّر حالة الآلة بطريقة تؤثر في الجمل التي تأتي بعدها. تُسمى هذه التغييرات <em>تأثيرات جانبية</em> (side effects). والجمل في المثال السابق تنتج فقط القيمتين <code>1</code> و<code>true</code> ثم تطرحهما فوراً. لا يترك هذا أي أثر في العالم إطلاقاً. وعند تشغيل هذا البرنامج، لا يحدث شيء ملحوظ.</p>
<p>في بعض الحالات، تسمح لك JavaScript بحذف الفاصلة المنقوطة في نهاية الجملة. وفي حالات أخرى، يجب أن تكون موجودة، وإلا سيُعامل السطر التالي كجزء من الجملة نفسها. وقواعد تحديد متى يمكن حذفها بأمان معقدة نوعاً ما وعرضة للخطأ. لذا في هذا الكتاب، ستحصل كل جملة تحتاج فاصلة منقوطة عليها دائماً. وأنصحك بفعل الشيء نفسه، على الأقل حتى تتعلم أكثر عن دقائق حذف الفواصل المنقوطة.</p>
<h2 id="الارتباطات">الارتباطات</h2>
<p>كيف يحافظ البرنامج على حالة داخلية؟ وكيف يتذكر الأشياء؟ رأينا كيفية إنتاج قيم جديدة من قيم قديمة، لكن هذا لا يغيّر القيم القديمة، ويجب استخدام القيمة الجديدة فوراً وإلا تبددت مجدداً. للإمساك بالقيم والاحتفاظ بها، توفر JavaScript شيئاً يسمى <em>ارتباطاً</em> (binding)، أو <em>متغيراً</em>.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> caught = <span class="hljs-number">5</span> * <span class="hljs-number">5</span>;
</code></pre>
<p>يمنحنا هذا نوعاً ثانياً من الجمل. والكلمة الخاصة (<em>الكلمة المفتاحية</em>) <code>let</code> تدل على أن هذه الجملة ستعرف ارتباطاً. ويتبعها اسم الارتباط، وإن أردنا إعطاءه قيمة فوراً، يتبعها معامل <code>=</code> وتعبير.</p>
<p>ينشئ المثال ارتباطاً يسمى <code>caught</code> ويستخدمه للإمساك بالعدد الناتج عن ضرب 5 في 5.</p>
<p>بعد تعريف ارتباط، يمكن استخدام اسمه كتعبير. وقيمة هذا التعبير هي القيمة التي يحملها الارتباط حالياً. إليك مثالاً:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> ten = <span class="hljs-number">10</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(ten * ten);
<span class="hljs-comment">// → 100</span>
</code></pre>
<p>عندما يشير ارتباط إلى قيمة، فهذا لا يعني أنه مرتبط بها إلى الأبد. يمكن استخدام المعامل <code>=</code> في أي وقت مع الارتباطات الموجودة لفصلها عن قيمتها الحالية وجعلها تشير إلى قيمة جديدة:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> mood = <span class="hljs-string">&quot;light&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(mood);
<span class="hljs-comment">// → light</span>
mood = <span class="hljs-string">&quot;dark&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(mood);
<span class="hljs-comment">// → dark</span>
</code></pre>
<p>تخيل الارتباطات مجسّات (tentacles) لا صناديق. فهي لا <em>تحتوي</em> القيم؛ بل <em>تمسك</em> بها — ويمكن لارتباطين الإشارة إلى القيمة نفسها. ولا يمكن للبرنامج الوصول إلا إلى القيم التي ما زال يملك مرجعاً إليها. وعندما تحتاج إلى تذكر شيء ما، إما أن تنبت مجسّاً جديداً للإمساك به، أو تعيد توجيه أحد مجسّاتك الموجودة إليه.</p>
<p>لننظر إلى مثال آخر. لتتذكر عدد الدولارات التي ما زال لويجي مديناً بها لك، تنشئ ارتباطاً. وعندما يسدد 35 دولاراً، تعطي هذا الارتباط قيمة جديدة.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> luigisDebt = <span class="hljs-number">140</span>;
luigisDebt = luigisDebt - <span class="hljs-number">35</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(luigisDebt);
<span class="hljs-comment">// → 105</span>
</code></pre>
<p>عندما تعرّف ارتباطاً دون إعطائه قيمة، لا يجد المجسّ شيئاً يمسكه، فينتهي في الهواء. وإذا طلبت قيمة ارتباط فارغ، فستحصل على القيمة <code>undefined</code>.</p>
<p>ويمكن لجملة <code>let</code> واحدة تعريف عدة ارتباطات. ويجب فصل التعريفات بفواصل:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> one = <span class="hljs-number">1</span>, two = <span class="hljs-number">2</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(one + two);
<span class="hljs-comment">// → 3</span>
</code></pre>
<p>ويمكن أيضاً استخدام الكلمتين <code>var</code> و<code>const</code> لإنشاء ارتباطات، بطريقة مشابهة لـ <code>let</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">&quot;Ayda&quot;</span>;
<span class="hljs-keyword">const</span> greeting = <span class="hljs-string">&quot;Hello &quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(greeting + name);
<span class="hljs-comment">// → Hello Ayda</span>
</code></pre>
<p>الأولى منهما، <code>var</code> (اختصار «variable»)، هي الطريقة التي كانت تُعلن بها الارتباطات في JavaScript قبل 2015، حين لم يكن <code>let</code> موجوداً بعد. سأعود إلى الطريقة الدقيقة التي تختلف بها عن <code>let</code> في <a href="/chapter/functions">الفصل التالي</a>. في الوقت الحالي، تذكر أنها تفعل الشيء نفسه غالباً، لكننا سنادراً ما نستخدمها في هذا الكتاب لأنها تتصرف بغرابة في بعض الحالات.</p>
<p>أما الكلمة <code>const</code> فتعني <em>ثابتاً</em> (constant). وهي تعرّف ارتباطاً ثابتاً يشير إلى القيمة نفسها طوال حياته. وهذا مفيد للارتباطات التي تمنح قيمة اسماً لتسهيل الإشارة إليها لاحقاً.</p>
<h2 id="أسماء-الارتباطات">أسماء الارتباطات</h2>
<p>يمكن أن تكون أسماء الارتباطات أي سلسلة من حرف واحد أو أكثر. ويمكن أن تكون الأرقام جزءاً من أسماء الارتباطات — <code>catch22</code> اسم صالح مثلاً — لكن يجب ألا يبدأ الاسم برقم. وقد يتضمن اسم الارتباط علامات الدولار (<code>$</code>) أو الشرطات السفلية (<code>_</code>) لكن دون أي علامات ترقيم أو رموز خاصة أخرى.</p>
<p>الكلمات ذات المعنى الخاص، مثل <code>let</code>، هي <em>كلمات مفتاحية</em>، ولا يجوز استخدامها كأسماء ارتباطات. وهناك أيضاً عدد من الكلمات «المحجوزة للاستخدام» في إصدارات JavaScript المستقبلية، والتي لا يمكن استخدامها كذلك كأسماء ارتباطات. والقائمة الكاملة للكلمات المفتاحية والكلمات المحجوزة طويلة نوعاً ما:</p>
<pre><code>break case catch class const continue debugger default
delete do else enum export extends false finally for
function if implements import interface in instanceof let
new package private protected public return static super
switch this throw true try typeof var void while with yield
</code></pre>
<p>لا تقلق بشأن حفظ هذه القائمة. وعندما ينتج عن إنشاء ارتباط خطأ نحوي غير متوقع، تحقق مما إذا كنت تحاول تعريف كلمة محجوزة.</p>
<h2 id="البيئة">البيئة</h2>
<p>تسمى مجموعة الارتباطات وقيمها الموجودة في لحظة معينة <em>البيئة</em> (environment). وعند بدء تشغيل برنامج، لا تكون هذه البيئة فارغة. فهي تحتوي دائماً على ارتباطات تشكل جزءاً من معيار اللغة، وفي معظم الأحيان تحتوي أيضاً على ارتباطات توفر طرقاً للتفاعل مع النظام المحيط. فمثلاً، في المتصفح توجد دوال للتفاعل مع الموقع المحمَّل حالياً وقراءة إدخال الفأرة ولوحة المفاتيح.</p>
<h2 id="الدوال">الدوال</h2>
<p>الكثير من القيم الموفرة في البيئة الافتراضية من النوع <em>دالة</em>. والدالة قطعة برنامج ملفوفة في قيمة. ويمكن <em>تطبيق</em> مثل هذه القيم لتشغيل البرنامج الملفوف. فمثلاً، في بيئة المتصفح، يحمل الارتباط <code>prompt</code> دالة تعرض مربع حوار صغيراً يطلب إدخال المستخدم. وتُستخدم هكذا:</p>
<pre><code class="language-js"><span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Enter passcode&quot;</span>);
</code></pre>
<p><img src="/images/book/prompt.png" alt="مربع حوار يطلب إدخال رمز المرور"></p>
<p>يُسمى تنفيذ الدالة <em>استدعاءها</em> أو <em>نداءها</em> أو <em>تطبيقها</em>. ويمكنك استدعاء دالة بوضع قوسين بعد تعبير ينتج قيمة دالة. وعادةً ستستخدم مباشرة اسم الارتباط الذي يحمل الدالة. والقيم الموضوعة بين القوسين تُعطى للبرنامج داخل الدالة. وفي المثال، تستخدم دالة <code>prompt</code> النص الذي نعطيها إياه كنص يُعرض في مربع الحوار. وتسمى القيم المعطاة للدوال <em>معطيات</em> (arguments). وقد تحتاج دوال مختلفة إلى عدد مختلف أو أنواع مختلفة من المعطيات.</p>
<p>لا تُستخدم دالة <code>prompt</code> كثيراً في برمجة الويب الحديثة، لأنك لا تملك تحكماً في شكل الحوار الناتج غالباً، لكنها قد تكون مفيدة في البرامج التجريبية والتجارب.</p>
<h2 id="دالة-consolelog">دالة console.log</h2>
<p>في الأمثلة، استخدمت <code>console.log</code> لإخراج القيم. وتوفر معظم أنظمة JavaScript (بما فيها جميع متصفحات الويب الحديثة وNode.js) دالة <code>console.log</code> تكتب معطياتها إلى <em>بعض</em> أجهزة إخراج النصوص. وفي المتصفحات، يظهر الإخراج في وحدة تحكم JavaScript. وهذا الجزء من واجهة المتصفح مخفي افتراضياً، لكن معظم المتصفحات تفتحه عند الضغط على F12 أو، على Mac، command-option-I. وإن لم ينجح ذلك، فابحث في القوائم عن عنصر باسم Developer Tools أو ما شابه.</p>
<p>عند تشغيل الأمثلة (أو شيفرتك الخاصة) في صفحات هذا الكتاب، سيظهر إخراج <code>console.log</code> بعد المثال بدلاً من وحدة تحكم JavaScript في المتصفح.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> x = <span class="hljs-number">30</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;the value of x is&quot;</span>, x);
<span class="hljs-comment">// → the value of x is 30</span>
</code></pre>
<p>رغم أن أسماء الارتباطات لا يمكن أن تحتوي على نقطة، فإن <code>console.log</code> يحتوي عليها. والسبب أن <code>console.log</code> ليس ارتباطاً بسيطاً، بل تعبير يسترجع الخاصية <code>log</code> من القيمة التي يحملها الارتباط <code>console</code>. وسنكتشف بالضبط ما يعنيه هذا في <a href="/chapter/data_structures_objects_and_arrays#properties">الفصل 4</a>.</p>
<h2 id="القيم-المعادة">القيم المعادة</h2>
<p>عرض مربع حوار أو كتابة نص على الشاشة هو <em>تأثير جانبي</em>. وكثير من الدوال مفيدة بسبب تأثيراتها الجانبية. وقد تنتج الدوال قيماً أيضاً، وفي هذه الحالة لا تحتاج إلى تأثير جانبي لتكون مفيدة. فمثلاً، تأخذ الدالة <code>Math.max</code> أي عدد من المعطيات العددية وتعيد أكبرها.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>));
<span class="hljs-comment">// → 4</span>
</code></pre>
<p>عندما تنتج دالة قيمة، يقال إنها <em>تعيد</em> (return) تلك القيمة. وكل ما ينتج قيمة هو تعبير في JavaScript، ما يعني أن استدعاءات الدوال يمكن استخدامها داخل تعبيرات أكبر. وفي الشيفرة التالية، يُستخدم استدعاء <code>Math.min</code>، وهو عكس <code>Math.max</code>، كجزء من تعبير جمع:</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>) + <span class="hljs-number">100</span>);
<span class="hljs-comment">// → 102</span>
</code></pre>
<p>سيشرح <a href="/chapter/functions">الفصل 3</a> كيفية كتابة دوالك الخاصة.</p>
<h2 id="مسار-التحكم">مسار التحكم</h2>
<p>عندما يحتوي برنامجك على أكثر من جملة، تُنفذ الجمل كما لو كانت قصة، من الأعلى إلى الأسفل. فمثلاً، البرنامج التالي فيه جملتان. الأولى تطلب رقماً من المستخدم، والثانية، التي تُنفذ بعد الأولى، تعرض مربع ذلك الرقم:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> theNumber = <span class="hljs-title class_">Number</span>(<span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Pick a number&quot;</span>));
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Your number is the square root of &quot;</span> +
            theNumber * theNumber);
</code></pre>
<p>تحوّل الدالة <code>Number</code> قيمة إلى عدد. ونحتاج هذا التحويل لأن نتيجة <code>prompt</code> قيمة نصية، ونريد عدداً. وهناك دوال مشابهة تسمى <code>String</code> و<code>Boolean</code> تحوّل القيم إلى هذين النوعين.</p>
<p>إليك التمثيل التخطيطي البسيط نوعاً ما لمسار التحكم المستقيم:</p>
<p><img src="/images/book/controlflow-straight.svg" alt="مخطط يظهر سهماً مستقيماً"></p>
<h2 id="التنفيذ-الشرطي">التنفيذ الشرطي</h2>
<p>ليست كل البرامج طرقاً مستقيمة. قد نريد مثلاً إنشاء طريق متشعب يأخذ فيه البرنامج الفرع المناسب حسب الحالة القائمة. ويسمى هذا <em>التنفيذ الشرطي</em>.</p>
<p><img src="/images/book/controlflow-if.svg" alt="مخطط لسهم ينقسم إلى اثنين ثم يلتقيان مجدداً"></p>
<p>يُنشأ التنفيذ الشرطي بالكلمة المفتاحية <code>if</code> في JavaScript. وفي الحالة البسيطة، نريد تنفيذ بعض الشيفرة إذا، وفقط إذا، تحقق شرط معين. وقد نريد مثلاً عرض مربع المُدخل فقط إذا كان المُدخل عدداً فعلاً:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> theNumber = <span class="hljs-title class_">Number</span>(<span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Pick a number&quot;</span>));
<span class="hljs-keyword">if</span> (!<span class="hljs-title class_">Number</span>.<span class="hljs-built_in">isNaN</span>(theNumber)) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Your number is the square root of &quot;</span> +
              theNumber * theNumber);
}
</code></pre>
<p>مع هذا التعديل، إذا أدخلت &quot;parrot&quot; فلن يظهر أي إخراج.</p>
<p>تنفذ الكلمة المفتاحية <code>if</code> جملة أو تتخطاها حسب قيمة تعبير منطقي. وتُكتب الجملة الحاسمة بعد الكلمة المفتاحية، بين قوسين، وتليها الجملة المراد تنفيذها.</p>
<p>ودالة <code>Number.isNaN</code> دالة JavaScript قياسية تعيد <code>true</code> فقط إذا كان المعطى لها هو <code>NaN</code>. وتعيد دالة <code>Number</code> بالمناسبة <code>NaN</code> عند إعطائها نصاً لا يمثل عدداً صالحاً. وهكذا تصبح الجملة الشرطية: «ما لم يكن <code>theNumber</code> ليس عدداً، فنفّذ هذا».</p>
<p>الجملة التي تلي <code>if</code> ملفوفة بأقواس (<code>{</code> و<code>}</code>) في هذا المثال. ويمكن استخدام الأقواس لتجميع أي عدد من الجمل في جملة واحدة تسمى <em>كتلة</em> (block). وكان يمكنك أيضاً حذفها في هذه الحالة، لأنها تحمل جملة واحدة فقط، لكن لتجنب التفكير فيما إذا كانت ضرورية، يستخدم معظم مبرمجي JavaScript الأقواس في كل جملة ملفوفة كهذه. وسنتبع هذه العادة غالباً في هذا الكتاب، باستثناء الأسطر الواحدة العرضية.</p>
<pre><code class="language-js"><span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> + <span class="hljs-number">1</span> == <span class="hljs-number">2</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;It&#x27;s true&quot;</span>);
<span class="hljs-comment">// → It&#x27;s true</span>
</code></pre>
<p>غالباً لن تكون لديك شيفرة تُنفذ عند تحقق الشرط فقط، بل أيضاً شيفرة تتعامل مع الحالة الأخرى. ويُمثل هذا المسار البديل بالسهم الثاني في المخطط. ويمكنك استخدام الكلمة المفتاحية <code>else</code> مع <code>if</code> لإنشاء مساري تنفيذ بديلين منفصلين:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> theNumber = <span class="hljs-title class_">Number</span>(<span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Pick a number&quot;</span>));
<span class="hljs-keyword">if</span> (!<span class="hljs-title class_">Number</span>.<span class="hljs-built_in">isNaN</span>(theNumber)) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Your number is the square root of &quot;</span> +
              theNumber * theNumber);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Hey. Why didn&#x27;t you give me a number?&quot;</span>);
}
</code></pre>
<p>إذا كان لديك أكثر من مسارين للاختيار بينهما، يمكنك «سلسلة» أزواج متعددة من <code>if</code>/<code>else</code>. إليك مثالاً:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> num = <span class="hljs-title class_">Number</span>(<span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Pick a number&quot;</span>));

<span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">10</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Small&quot;</span>);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">100</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Medium&quot;</span>);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Large&quot;</span>);
}
</code></pre>
<p>سيتحقق البرنامج أولاً مما إذا كان <code>num</code> أقل من 10. فإن كان كذلك، يختار ذلك الفرع ويعرض <code>&quot;Small&quot;</code> وينتهي. وإن لم يكن، يسلك فرع <code>else</code> الذي يحتوي بدوره على <code>if</code> ثانٍ. وإذا تحقق الشرط الثاني (<code>&lt; 100</code>)، فهذا يعني أن العدد 10 على الأقل وأقل من 100، ويُعرض <code>&quot;Medium&quot;</code>. وإن لم يتحقق، يُختار الفرع الثاني والأخير <code>else</code>.</p>
<p>ويكون مخطط هذا البرنامج على هذا النحو:</p>
<p><img src="/images/book/controlflow-nested-if.svg" alt="مخطط يظهر سهماً ينقسم إلى اثنين، ثم ينقسم أحد الفرعين مجدداً، قبل أن تلتقي كل الفروع مرة أخرى"></p>
<h2 id="حلقتا-while-وdo">حلقتا while وdo</h2>
<p>فكر في برنامج يخرج كل الأعداد الزوجية من 0 إلى 12. إحدى طرق كتابته كما يلي:</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">0</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">2</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">4</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">6</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">8</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">10</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">12</span>);
</code></pre>
<p>هذا يعمل، لكن فكرة كتابة برنامج هي جعل العمل <em>أقل</em>، لا أكثر. ولو احتجنا كل الأعداد الزوجية الأقل من 1000، فلن يكون هذا الأسلوب عملياً. ما نحتاجه هو طريقة لتشغيل قطعة شيفرة عدة مرات. ويسمى هذا الشكل من مسار التحكم <em>حلقة</em> (loop).</p>
<p><img src="/images/book/controlflow-loop.svg" alt="مخطط يظهر سهماً يصل إلى نقطة لها سهم دائري يعود إلى نفسه وسهم آخر يواصل المسير"></p>
<p>يتيح لنا مسار التحكم الحلقي العودة إلى نقطة سابقة في البرنامج وتكرارها بحالة برنامجنا الحالية. وإذا دمجنا هذا مع ارتباط يعدّ، أمكننا فعل شيء كهذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> number = <span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span> (number &lt;= <span class="hljs-number">12</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(number);
  number = number + <span class="hljs-number">2</span>;
}
<span class="hljs-comment">// → 0</span>
<span class="hljs-comment">// → 2</span>
<span class="hljs-comment">//   … وهكذا</span>
</code></pre>
<p>تنشئ الجملة التي تبدأ بالكلمة المفتاحية <code>while</code> حلقة. وتتبع كلمة <code>while</code> تعبير بين قوسين ثم جملة، تماماً مثل <code>if</code>. وتظل الحلقة تدخل تلك الجملة ما دام التعبير ينتج قيمة تعطي <code>true</code> عند تحويلها إلى قيمة منطقية.</p>
<p>ويوضح ارتباط <code>number</code> الطريقة التي يمكن بها للارتباط تتبع تقدم البرنامج. ففي كل مرة تتكرر الحلقة، يحصل <code>number</code> على قيمة تزيد بمقدار 2 عن قيمته السابقة. وفي بداية كل تكرار، يُقارن بالعدد 12 لتحديد ما إذا كان عمل البرنامج قد انتهى.</p>
<p>وكمثال يؤدي شيئاً مفيداً فعلاً، يمكننا الآن كتابة برنامج يحسب ويعرض قيمة 2¹⁰ (2 مرفوعاً للقوة 10). نستخدم ارتباطين: واحداً لتتبع النتيجة وآخر لعدّ عدد مرات ضرب هذه النتيجة في 2. وتختبر الحلقة ما إذا كان الارتباط الثاني قد بلغ 10 بعد، وإن لم يبلغ، تحدّث كلا الارتباطين.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> result = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> counter = <span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span> (counter &lt; <span class="hljs-number">10</span>) {
  result = result * <span class="hljs-number">2</span>;
  counter = counter + <span class="hljs-number">1</span>;
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result);
<span class="hljs-comment">// → 1024</span>
</code></pre>
<p>كان بإمكان العداد أن يبدأ أيضاً من <code>1</code> ويتحقق من <code>&lt;= 10</code>، لكن لأسباب ستتضح في <a href="/chapter/data_structures_objects_and_arrays#array_indexing">الفصل 4</a>، من الجيد الاعتياد على العد من 0.</p>
<p>لاحظ أن JavaScript تحتوي أيضاً على معامل للرفع إلى قوة (<code>2 ** 10</code>)، وكنت ستستخدمه لحساب هذا في شيفرة حقيقية — لكن ذلك كان سيفسد المثال.</p>
<p>وحلقة <code>do</code> بنية تحكم مشابهة لحلقة <code>while</code>. وهي تختلف في نقطة واحدة فقط: حلقة <code>do</code> تنفذ جسمها دائماً مرة واحدة على الأقل، ولا تبدأ في اختبار ما إذا كان ينبغي أن تتوقف إلا بعد ذلك التنفيذ الأول. وللتعبير عن ذلك، يظهر الاختبار بعد جسم الحلقة:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> yourName;
<span class="hljs-keyword">do</span> {
  yourName = <span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Who are you?&quot;</span>);
} <span class="hljs-keyword">while</span> (!yourName);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Hello &quot;</span> + yourName);
</code></pre>
<p>سيجبرك هذا البرنامج على إدخال اسم. وسيسأل مرة تلو الأخرى حتى يحصل على شيء ليس نصاً فارغاً. وإن تطبيق المعامل <code>!</code> سيحول القيمة إلى النوع المنطقي قبل نفيها، وكل النصوص باستثناء <code>&quot;&quot;</code> تتحول إلى <code>true</code>. وهذا يعني أن الحلقة تستمر في الدوران حتى تقدم اسماً غير فارغ.</p>
<h2 id="إزاحة-الشيفرة">إزاحة الشيفرة</h2>
<p>في الأمثلة، كنت أضيف مسافات أمام الجمل التي تشكل جزءاً من جملة أكبر. وهذه المسافات غير مطلوبة — فسيقبل الحاسوب البرنامج دونها بلا مشكلة. بل إن فواصل الأسطر نفسها في البرامج اختيارية. ويمكنك كتابة برنامج في سطر واحد طويل إن أردت.</p>
<p>ودور هذه الإزاحة داخل الكتل هو إبراز بنية الشيفرة للقارئ البشري. ففي الشيفرة التي تُفتح فيها كتل جديدة داخل كتل أخرى، قد يصعب رؤية أين تنتهي إحدى الكتل وتبدأ أخرى. ومع الإزاحة الصحيحة، يقابل الشكل البصري للبرنامج شكل الكتل بداخله. وأحب استخدام مسافتين لكل كتلة مفتوحة، لكن الأذواق تختلف — فبعض الناس يستخدمون أربع مسافات، وبعضهم يستخدم محارف الجدولة. والمهم أن تضيف كل كتلة جديدة القدر نفسه من المسافة.</p>
<pre><code class="language-js"><span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span> != <span class="hljs-literal">true</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;That makes sense.&quot;</span>);
  <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> &lt; <span class="hljs-number">2</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;No surprise there.&quot;</span>);
  }
}
</code></pre>
<p>ومعظم برامج تحرير الشيفرة (بما فيها الموجود في هذا الكتاب) ستساعدك بإزاحة الأسطر الجديدة تلقائياً بالقدر المناسب.</p>
<h2 id="حلقات-for">حلقات for</h2>
<p>تتبع حلقات كثيرة النمط المعروض في أمثلة <code>while</code>. فأولاً يُنشأ ارتباط «عداد» لتتبع تقدم الحلقة. ثم تأتي حلقة <code>while</code>، عادةً بتعبير اختبار يتحقق مما إذا كان العداد قد بلغ قيمة نهايته. وفي نهاية جسم الحلقة، يُحدَّث العداد لتتبع التقدم.</p>
<p>ولأن هذا النمط شائع جداً، توفر JavaScript واللغات المشابهة صيغة أقصر قليلاً وأشمل، هي حلقة <code>for</code>:</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> number = <span class="hljs-number">0</span>; number &lt;= <span class="hljs-number">12</span>; number = number + <span class="hljs-number">2</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(number);
}
<span class="hljs-comment">// → 0</span>
<span class="hljs-comment">// → 2</span>
<span class="hljs-comment">//   … وهكذا</span>
</code></pre>
<p>هذا البرنامج مكافئ تماماً لمثال <a href="/chapter/program_structure#loops">طباعة الأعداد الزوجية</a> السابق. والتغيير الوحيد أن كل الجمل المتعلقة بـ«حالة» الحلقة مجمعة معاً بعد <code>for</code>.</p>
<p>ويجب أن يحتوي القوسان بعد الكلمة المفتاحية <code>for</code> على فاصلتين منقوطتين. فالجزء قبل الفاصلة الأولى <em>يُهيئ</em> الحلقة، عادةً بتعريف ارتباط. والجزء الثاني هو التعبير الذي <em>يتحقق</em> مما إذا كان يجب أن تستمر الحلقة. والجزء الأخير <em>يحدّث</em> حالة الحلقة بعد كل تكرار. وفي معظم الحالات، يكون هذا أقصر وأوضح من بنية <code>while</code>.</p>
<p>وهذه هي الشيفرة التي تحسب 2¹⁰ باستخدام <code>for</code> بدلاً من <code>while</code>:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> result = <span class="hljs-number">1</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> counter = <span class="hljs-number">0</span>; counter &lt; <span class="hljs-number">10</span>; counter = counter + <span class="hljs-number">1</span>) {
  result = result * <span class="hljs-number">2</span>;
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result);
<span class="hljs-comment">// → 1024</span>
</code></pre>
<h2 id="الخروج-من-حلقة">الخروج من حلقة</h2>
<p>ليس إنتاج شرط الحلقة <code>false</code> هو الطريقة الوحيدة لانتهاء الحلقة. فلجملة <code>break</code> أثر القفز فوراً خارج الحلقة المحيطة. ويُعرض استخدامها في البرنامج التالي الذي يجد أول عدد أكبر من أو يساوي 20 ويقبل القسمة على 7:</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> current = <span class="hljs-number">20</span>; ; current = current + <span class="hljs-number">1</span>) {
  <span class="hljs-keyword">if</span> (current % <span class="hljs-number">7</span> == <span class="hljs-number">0</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(current);
    <span class="hljs-keyword">break</span>;
  }
}
<span class="hljs-comment">// → 21</span>
</code></pre>
<p>واستخدام معامل الباقي (<code>%</code>) طريقة سهلة لاختبار ما إذا كان عدد يقبل القسمة على عدد آخر. فإن كان كذلك، يكون باقي قسمتهما صفراً.</p>
<p>ولا تحتوي بنية <code>for</code> في المثال على جزء يتحقق من نهاية الحلقة. وهذا يعني أن الحلقة لن تتوقف أبداً ما لم تُنفذ جملة <code>break</code> بداخلها.</p>
<p>ولو حذفت جملة <code>break</code> تلك أو كتبت عن غير قصد شرط نهاية ينتج <code>true</code> دائماً، لعلّ برنامجك في <em>حلقة لا نهائية</em>. والبرنامج العالق في حلقة لا نهائية لن ينتهي تشغيله أبداً، وهذا أمر سيئ عادة.</p>
<p>وإذا أنشأت حلقة لا نهائية في أحد الأمثلة في هذه الصفحات، فسيُسألك عادةً بعد بضع ثوانٍ ما إذا كنت تريد إيقاف النص البرمجي. وإن فشل ذلك، فسيتعين عليك إغلاق التبويب الذي تعمل فيه للتعافي.</p>
<p>وتشبه الكلمة المفتاحية <code>continue</code> كلمة <code>break</code> من حيث تأثيرها في تقدم الحلقة. فعندما يُصادف <code>continue</code> في جسم حلقة، يقفز التحكم خارج الجسم ويواصل التكرار التالي للحلقة.</p>
<h2 id="تحديث-الارتباطات-بإيجاز">تحديث الارتباطات بإيجاز</h2>
<p>خصوصاً عند التكرار، يحتاج البرنامج غالباً إلى «تحديث» ارتباط ليحمل قيمة مبنية على قيمته السابقة.</p>
<pre><code class="language-js">counter = counter + <span class="hljs-number">1</span>;
</code></pre>
<p>وتوفر JavaScript اختصاراً لهذا:</p>
<pre><code class="language-js">counter += <span class="hljs-number">1</span>;
</code></pre>
<p>وتعمل اختصارات مشابهة مع معاملات أخرى كثيرة، مثل <code>result *= 2</code> لمضاعفة <code>result</code> أو <code>counter -= 1</code> للعد تنازلياً.</p>
<p>ويتيح لنا هذا تقصير مثال العد أكثر:</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> number = <span class="hljs-number">0</span>; number &lt;= <span class="hljs-number">12</span>; number += <span class="hljs-number">2</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(number);
}
</code></pre>
<p>وبالنسبة إلى <code>counter += 1</code> و<code>counter -= 1</code>، هناك مكافئان أقصر: <code>counter++</code> و<code>counter--</code>.</p>
<h2 id="التوزيع-حسب-قيمة-باستخدام-switch">التوزيع حسب قيمة باستخدام switch</h2>
<p>ليس غريباً أن تبدو الشيفرة هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">if</span> (x == <span class="hljs-string">&quot;value1&quot;</span>) <span class="hljs-title function_">action1</span>();
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (x == <span class="hljs-string">&quot;value2&quot;</span>) <span class="hljs-title function_">action2</span>();
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (x == <span class="hljs-string">&quot;value3&quot;</span>) <span class="hljs-title function_">action3</span>();
<span class="hljs-keyword">else</span> <span class="hljs-title function_">defaultAction</span>();
</code></pre>
<p>وتوجد بنية تسمى <code>switch</code> يقصد بها التعبير عن مثل هذا «التوزيع» بطريقة أكثر مباشرة. وللأسف، الصيغة التي تستخدمها JavaScript لهذا (والتي ورثتها عن سلسلة لغات البرمجة C/Java) ركيكة نوعاً ما — وقد تبدو سلسلة جمل <code>if</code> أفضل. إليك مثالاً:</p>
<pre><code class="language-js"><span class="hljs-keyword">switch</span> (<span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;What is the weather like?&quot;</span>)) {
  <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;rainy&quot;</span>:
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Remember to bring an umbrella.&quot;</span>);
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;sunny&quot;</span>:
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Dress lightly.&quot;</span>);
  <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;cloudy&quot;</span>:
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Go outside.&quot;</span>);
    <span class="hljs-keyword">break</span>;
  <span class="hljs-attr">default</span>:
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Unknown weather type!&quot;</span>);
    <span class="hljs-keyword">break</span>;
}
</code></pre>
<p>ويمكنك وضع أي عدد من تسميات <code>case</code> داخل الكتلة التي يفتحها <code>switch</code>. وسيبدأ البرنامج التنفيذ عند التسمية المقابلة للقيمة التي أُعطيها <code>switch</code>، أو عند <code>default</code> إن لم توجد قيمة مطابقة. وسيواصل التنفيذ، حتى عبر تسميات أخرى، حتى يصل إلى جملة <code>break</code>. وفي بعض الحالات، مثل حالة <code>&quot;sunny&quot;</code> في المثال، يمكن استخدام هذا لمشاركة بعض الشيفرة بين الحالات (فهو يوصي بالخروج إلى الخارج في الطقس المشمس والغائم معاً). لكن كن حذراً — فمن السهل نسيان جملة <code>break</code> كهذه، ما يجعل البرنامج ينفذ شيفرة لا تريد تنفيذها.</p>
<h2 id="كتابة-الأحرف-الكبيرة">كتابة الأحرف الكبيرة</h2>
<p>لا يمكن أن تحتوي أسماء الارتباطات على مسافات، ومع ذلك يكون من المفيد غالباً استخدام عدة كلمات لوصف ما يمثله الارتباط بوضوح. وهذه تقريباً خياراتك لكتابة اسم ارتباط من عدة كلمات:</p>
<pre><code>fuzzylittleturtle
fuzzy_little_turtle
FuzzyLittleTurtle
fuzzyLittleTurtle
</code></pre>
<p>قد يكون النمط الأول صعب القراءة. وأنا أحب شكل الشرطات السفلية، رغم أن ذلك النمط مؤلم قليلاً في الكتابة. وتتبع دوال JavaScript القياسية، ومعظم مبرمجي JavaScript، النمط الأخير — إذ يبدؤون كل كلمة بحرف كبير باستثناء الأولى. وليس صعباً الاعتياد على تفاصيل صغيرة كهذه، والشيفرة ذات أنماط التسمية المختلطة قد تكون منفرة في القراءة، لذا نتبع هذه العادة.</p>
<p>وفي حالات قليلة، مثل دالة <code>Number</code>، يُكتب الحرف الأول من الارتباط بحرف كبير أيضاً. وقد فُعل ذلك لتمييز هذه الدالة كدالة بناء (constructor). وسيتضح ما هي دالة البناء في <a href="/chapter/the_secret_life_of_objects#constructors">الفصل 6</a>. والمهم الآن ألا تنزعج من هذا الافتقار الظاهري إلى الاتساق.</p>
<h2 id="التعليقات">التعليقات</h2>
<p>غالباً ما لا تنقل الشيفرة الخام كل المعلومات التي تريد أن ينقلها البرنامج إلى القراء البشر، أو تنقلها بطريقة غامضة قد لا يفهمها الناس. وفي أحيان أخرى، قد تريد فقط تضمين بعض الأفكار ذات الصلة كجزء من برنامجك. ولهذا الغرض توجد <em>التعليقات</em> (comments).</p>
<p>والتعليق قطعة نص تشكل جزءاً من برنامج لكن الحاسوب يتجاهلها تماماً. ولJavaScript طريقتان لكتابة التعليقات. ولكتابة تعليق من سطر واحد، يمكنك استخدام محرفي الشرطة المائلة (<code>//</code>) ثم نص التعليق بعدهما:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> accountBalance = <span class="hljs-title function_">calculateBalance</span>(account);
<span class="hljs-comment">// إنه وادٍ أخضر يغني فيه نهر</span>
accountBalance.<span class="hljs-title function_">adjust</span>();
<span class="hljs-comment">// يلتقط بجنون خِرَقاً بيضاء في العشب.</span>
<span class="hljs-keyword">let</span> report = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Report</span>();
<span class="hljs-comment">// حيث ترنّ الشمس على الجبل المتشامخ:</span>
<span class="hljs-title function_">addToReport</span>(accountBalance, report);
<span class="hljs-comment">// إنه وادٍ صغير، يزبد كالضوء في كأس.</span>
</code></pre>
<p>وتعليق <code>//</code> يمتد إلى نهاية السطر فقط. أما مقطع النص بين <code>/*</code> و<code>*/</code> فيُتجاهل بالكامل، بصرف النظر عما إذا كان يحتوي على فواصل أسطر. وهذا مفيد لإضافة كتل من المعلومات عن ملف أو جزء من برنامج:</p>
<pre><code class="language-js"><span class="hljs-comment">/*
  وجدت هذا العدد أول مرة مخربشاً على ظهر دفتر
  قديم. ومنذ ذلك الحين، كثيراً ما مرّ بي، ظاهراً في
  أرقام هواتف وأرقام تسلسلية لمنتجات اشتريتها.
  من الواضح أنه يحبني، لذا قررت الاحتفاظ به.
*/</span>
<span class="hljs-keyword">const</span> myNumber = <span class="hljs-number">11213</span>;
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تعرف الآن أن البرنامج يُبنى من جمل، وهذه الجمل تحتوي أحياناً على مزيد من الجمل. وتميل الجمل إلى احتواء تعبيرات، وهذه بدورها يمكن بناؤها من تعبيرات أصغر.</p>
<p>ووضع الجمل إحداها بعد الأخرى يمنحك برنامجاً يُنفذ من الأعلى إلى الأسفل. ويمكنك إدخال اضطرابات في مسار التحكم باستخدام جمل شرطية (<code>if</code> و<code>else</code> و<code>switch</code>) وحلقات (<code>while</code> و<code>do</code> و<code>for</code>).</p>
<p>ويمكن استخدام الارتباطات لحفظ قطع من البيانات تحت اسم، وهي مفيدة لتتبع الحالة في برنامجك. والبيئة هي مجموعة الارتباطات المعرَّفة. وتضع أنظمة JavaScript دائماً عدداً من الارتباطات القياسية المفيدة في بيئتك.</p>
<p>والدوال قيم خاصة تغلف قطعة برنامج. ويمكنك استدعاؤها بكتابة <code>functionName(argument1, argument2)</code>. واستدعاء الدالة هذا تعبير وقد ينتج قيمة.</p>
<h2 id="التمارين">التمارين</h2>
<p>إذا لم تكن متأكداً من كيفية اختبار حلولك للتمارين، فراجع <a href="/chapter/introduction">المقدمة</a>.</p>
<p>يبدأ كل تمرين بوصف للمسألة. اقرأ هذا الوصف وحاول حل التمرين. وإذا واجهتك مشكلات، فكر في قراءة التلميحات بعد التمرين. ويمكنك العثور على حلول كاملة للتمارين على الإنترنت في <a href="https://eloquentjavascript.net/code#2"><em>https://eloquentjavascript.net/code</em></a>. وإذا أردت أن تتعلم شيئاً من التمارين، أنصحك بالنظر في الحلول فقط بعد أن تحل التمرين، أو على الأقل بعد أن تهاجمه طويلاً وبقوة حتى تصاب بصداع خفيف.</p>
<h3 id="تكرار-مثلث">تكرار مثلث</h3>
<p>اكتب حلقة تجري سبعة استدعاءات لـ <code>console.log</code> لإخراج المثلث التالي:</p>
<pre><code>#
##
###
####
#####
######
#######
</code></pre>
<p>قد يكون مفيداً أن تعرف أنه يمكنك إيجاد طول نص بكتابة <code>.length</code> بعده.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> abc = <span class="hljs-string">&quot;abc&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(abc.<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 3</span>
</code></pre>
<p>تحتوي معظم التمارين على قطعة شيفرة يمكنك تعديلها لحل التمرين. وتذكر أنه يمكنك النقر على كتل الشيفرة لتحريرها.</p>
<pre><code class="language-js"><span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يمكنك البدء ببرنامج يطبع الأعداد من 1 إلى 7، يمكنك استخلاصه بإجراء بعض التعديلات على <a href="/chapter/program_structure#loops">مثال طباعة الأعداد الزوجية</a> الوارد سابقاً في الفصل، حيث قُدمت حلقة <code>for</code>.</p>
<p>فكر الآن في التكافؤ بين الأعداد والنصوص المكونة من محارف الشباك (#). فيمكنك الانتقال من 1 إلى 2 بإضافة 1 (<code>+= 1</code>). ويمكنك الانتقال من <code>&quot;#&quot;</code> إلى <code>&quot;##&quot;</code> بإضافة محرف (<code>+= &quot;#&quot;</code>). وهكذا يمكن لحلك أن يتبع برنامج طباعة الأعداد عن قرب.</p>
</details>
<h3 id="fizzbuzz">FizzBuzz</h3>
<p>اكتب برنامجاً يستخدم <code>console.log</code> لطباعة كل الأعداد من 1 إلى 100، باستثناءين اثنين. فبالنسبة إلى الأعداد التي تقبل القسمة على 3، اطبع <code>&quot;Fizz&quot;</code> بدلاً من العدد، وبالنسبة إلى الأعداد التي تقبل القسمة على 5 (وليس على 3)، اطبع <code>&quot;Buzz&quot;</code> بدلاً من ذلك.</p>
<p>وعندما يعمل ذلك، عدّل برنامجك ليطبع <code>&quot;FizzBuzz&quot;</code> للأعداد التي تقبل القسمة على 3 و5 معاً (مع الاستمرار في طباعة <code>&quot;Fizz&quot;</code> أو <code>&quot;Buzz&quot;</code> للأعداد التي تقبل القسمة على واحد منهما فقط).</p>
<p>(هذا في الواقع سؤال مقابلات عمل زُعم أنه يستبعد نسبة كبيرة من المرشحين للمبرمجين. لذا إن حللته، فقد ارتفعت قيمتك في سوق العمل للتو.)</p>
<pre><code class="language-js"><span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>مراجعة الأعداد مهمة تكرار بوضوح، واختيار ما تطبعه مسألة تنفيذ شرطي. وتذكر حيلة استخدام معامل الباقي (<code>%</code>) للتحقق مما إذا كان عدد يقبل القسمة على آخر (أي باقيه صفر).</p>
<p>وفي الإصدار الأول، هناك ثلاث نتائج محتملة لكل عدد، لذا سيتعين عليك إنشاء سلسلة <code>if</code>/<code>else if</code>/<code>else</code>.</p>
<p>والإصدار الثاني من البرنامج له حل مباشر وحل ذكي. فالحل البسيط هو إضافة «فرع» شرطي آخر لاختبار الشرط المعطى بدقة. أما الحل الذكي فابنِ نصاً يحتوي الكلمة أو الكلمات المراد إخراجها واطبع هذه الكلمة أو العدد إن لم توجد كلمة، ويمكن أن تفيد هنا من المعامل <code>||</code> إفادة جيدة.</p>
</details>
<h3 id="رقعة-الشطرنج">رقعة الشطرنج</h3>
<p>اكتب برنامجاً ينشئ نصاً يمثل شبكة 8×8، باستخدام محارف الأسطر الجديدة لفصل الأسطر. وفي كل موضع من الشبكة توجد إما مسافة أو محرف <code>&quot;#&quot;</code>. ويجب أن تشكل المحارف رقعة شطرنج.</p>
<p>ويجب أن يعرض تمرير هذا النص إلى <code>console.log</code> شيئاً كهذا:</p>
<pre><code> # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
</code></pre>
<p>وعندما يصبح لديك برنامج يولد هذا النمط، عرّف ارتباطاً <code>size = 8</code> وعدّل البرنامج ليعمل مع أي <code>size</code>، فيخرج شبكة بالعرض والارتفاع المعطيين.</p>
<pre><code class="language-js"><span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يمكنك بناء النص بالبدء بنص فارغ (<code>&quot;&quot;</code>) وإضافة المحارف إليه مراراً. ويُكتب محرف السطر الجديد <code>&quot;\\n&quot;</code>.</p>
<p>وللعمل مع بُعدين، ستحتاج إلى حلقة داخل حلقة. وضع أقواساً حول جسمي الحلقتين ليسهل رؤية أين يبدأ كل منهما وينتهي. وحاول إزاحة هذين الجسمين إزاحة صحيحة. ويجب أن يتبع ترتيب الحلقتين الترتيب الذي نبني به النص (سطراً سطراً، من اليسار إلى اليمين، ومن الأعلى إلى الأسفل). لذا تتعامل الحلقة الخارجية مع الأسطر، والحلقة الداخلية مع المحارف في السطر.</p>
<p>وستحتاج إلى ارتباطين لتتبع تقدمك. ولمعرفة ما إذا كان ينبغي وضع مسافة أو علامة شباك في موضع معين، يمكنك اختبار ما إذا كان مجموع العدادين زوجياً (<code>% 2</code>).</p>
<p>ويجب أن يحدث إنهاء السطر بإضافة محرف سطر جديد بعد بناء السطر، لذا افعل ذلك بعد الحلقة الداخلية لكن داخل الحلقة الخارجية.</p>
</details>
`,p={number:"02",slug:s,title:n,englishTitle:a,headings:e,html:l};export{p as default,a as englishTitle,e as headings,l as html,c as number,s as slug,n as title};
