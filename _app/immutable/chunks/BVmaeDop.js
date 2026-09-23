const p="20",s="node_js",n="Node.js",e="Node.js",a=[{depth:2,id:"الخلفية",text:"الخلفية"},{depth:2,id:"أمر-node",text:"أمر node"},{depth:2,id:"الوحدات",text:"الوحدات"},{depth:2,id:"التثبيت-باستخدام-npm",text:"التثبيت باستخدام NPM"},{depth:3,id:"ملفات-الحزم",text:"ملفات الحزم"},{depth:3,id:"الإصدارات",text:"الإصدارات"},{depth:2,id:"وحدة-نظام-الملفات",text:"وحدة نظام الملفات"},{depth:2,id:"وحدة-http",text:"وحدة HTTP"},{depth:2,id:"المجاري-streams",text:"المجاري (Streams)"},{depth:2,id:"خادم-ملفات",text:"خادم ملفات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"أداة-بحث",text:"أداة بحث"},{depth:3,id:"إنشاء-دليل",text:"إنشاء دليل"},{depth:3,id:"مساحة-عامة-على-الويب",text:"مساحة عامة على الويب"}],o=`<blockquote>
<p>سأل طالب: «كان المبرمجون القدامى يستخدمون آلات بسيطة فقط، ولم تكن لديهم لغات برمجة، ومع ذلك صنعوا برامج جميلة. فلماذا نستخدم آلات معقدة ولغات برمجة؟» فأجاب فو-تزو: «كان البناؤون القدامى يستخدمون العصي والطين فقط، ومع ذلك بنوا أكواخاً جميلة.»</p>
<p>— المعلم يوان-ما، كتاب البرمجة</p>
</blockquote>
<p><img src="/images/book/chapter_picture_20.jpg" alt="رسم توضيحي يُظهر عمود هاتف تتشابك حوله أسلاك تمتد في كل الاتجاهات"></p>
<p>حتى الآن، استخدمنا لغة JavaScript في بيئة واحدة: المتصفح. سيقدّم هذا الفصل و<a href="/chapter/project_skill_sharing_website">الفصل التالي</a> تعريفاً موجزاً بـ Node.js، وهو برنامج يتيح لك تطبيق مهاراتك في JavaScript خارج المتصفح. وبواسطته يمكنك بناء أي شيء، من أدوات سطر الأوامر الصغيرة إلى خوادم HTTP التي تشغّل مواقع الويب الديناميكية.</p>
<p>يهدف هذان الفصلان إلى تعليمك المفاهيم الرئيسية التي يستخدمها Node.js، وإعطائك معلومات كافية لكتابة برامج مفيدة له. وهما لا يحاولان تقديم معالجة كاملة أو حتى شاملة للمنصة.</p>
<p>بينما كان بإمكانك تشغيل الشيفرة في الفصول السابقة مباشرة على هذه الصفحات، لأنها كانت إما JavaScript خاماً أو مكتوبة للمتصفح، فإن أمثلة الشيفرة في هذا الفصل مكتوبة لـ Node ولن تعمل غالباً في المتصفح.</p>
<p>إذا أردت المتابعة وتشغيل الشيفرة في هذا الفصل، فستحتاج إلى تثبيت Node.js إصدار 18 أو أحدث. للقيام بذلك، اذهب إلى <a href="https://nodejs.org"><em>https://nodejs.org</em></a> واتبع تعليمات التثبيت الخاصة بنظام تشغيلك. يمكنك أيضاً العثور هناك على مزيد من التوثيق لـ Node.js.</p>
<h2 id="الخلفية">الخلفية</h2>
<p>عند بناء أنظمة تتواصل عبر الشبكة، فإن طريقة إدارتك للمدخلات والمخرجات — أي قراءة البيانات وكتابتها من وإلى الشبكة والقرص الصلب — قد تُحدث فرقاً كبيراً في مدى سرعة استجابة النظام للمستخدم أو لطلبات الشبكة.</p>
<p>في مثل هذه البرامج، غالباً ما تكون البرمجة غير المتزامنة مفيدة. فهي تتيح للبرنامج إرسال البيانات واستقبالها من وإلى أجهزة متعددة في الوقت نفسه، دون إدارة معقدة للخيوط (threads) ومزامنتها.</p>
<p>لقد تصوّر Node في البداية بغرض جعل البرمجة غير المتزامنة سهلة ومريحة. وتناسب JavaScript نظاماً مثل Node جيداً. فهي واحدة من لغات البرمجة القليلة التي لا تملك طريقة مدمجة لإجراء المدخلات والمخرجات. وهكذا أمكن تركيب JavaScript على نهج Node الغريب نوعاً ما في برمجة الشبكة ونظام الملفات، دون أن ننتهي بواجهتين غير متسقتين. في عام 2009، حين كان يجري تصميم Node، كان الناس يبرمجون بالفعل بأسلوب دوال رد النداء (callbacks) في المتصفح، فكان المجتمع المحيط باللغة معتاداً على أسلوب البرمجة غير المتزامنة.</p>
<h2 id="أمر-node">أمر node</h2>
<p>عند تثبيت Node.js على نظام ما، فإنه يوفر برنامجاً يسمى <code>node</code>، يُستخدم لتشغيل ملفات JavaScript. لنفترض أن لديك ملفاً باسم <code>hello.js</code> يحتوي على هذه الشيفرة:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">&quot;Hello world&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(message);
</code></pre>
<p>يمكنك بعد ذلك تشغيل <code>node</code> من سطر الأوامر هكذا لتنفيذ البرنامج:</p>
<pre><code>$ node hello.js
Hello world
</code></pre>
<p>تفعل طريقة <code>console.log</code> في Node شيئاً مشابهاً لما تفعله في المتصفح. فهي تطبع قطعة من النص. لكن في Node، سيذهب النص إلى مجرى المخرجات القياسي للعملية (standard output) بدلاً من وحدة تحكم JavaScript في المتصفح. وعند تشغيل <code>node</code> من سطر الأوامر، يعني ذلك أنك ترى القيم المسجَّلة في طرفيتك.</p>
<p>إذا شغّلت <code>node</code> دون إعطائه ملفاً، فسيوفر لك موجهاً (prompt) يمكنك أن تكتب فيه شيفرة JavaScript وترى النتيجة فوراً.</p>
<pre><code>$ node
&gt; 1 + 1
2
&gt; [-1, -2, -3].map(Math.abs)
[1, 2, 3]
&gt; process.exit(0)
$
</code></pre>
<p>إن ارتباط <code>process</code>، تماماً مثل ارتباط <code>console</code>، متاح عالمياً في Node. وهو يوفر طرقاً متنوعة لفحص البرنامج الحالي والتلاعب به. تُنهي طريقة <code>exit</code> العملية، ويمكن إعطاؤها رمز حالة خروج يخبر البرنامج الذي شغّل <code>node</code> (في هذه الحالة، صدفة سطر الأوامر) بما إذا كان البرنامج قد اكتمل بنجاح (الرمز صفر) أو واجه خطأ (أي رمز آخر).</p>
<p>لمعرفة معطيات سطر الأوامر المعطاة لسكربتك، يمكنك قراءة <code>process.argv</code>، وهي مصفوفة من النصوص. لاحظ أنها تتضمن أيضاً اسم أمر <code>node</code> واسم سكربتك، لذا تبدأ المعطيات الفعلية عند الفهرس 2. إذا كان الملف <code>showargv.js</code> يحتوي على الجملة <code>console.log(process.argv)</code>، يمكنك تشغيله هكذا:</p>
<pre><code>$ node showargv.js one --and two
[&quot;node&quot;, &quot;/tmp/showargv.js&quot;, &quot;one&quot;, &quot;--and&quot;, &quot;two&quot;]
</code></pre>
<p>جميع ارتباطات JavaScript العالمية القياسية، مثل <code>Array</code> و<code>Math</code> و<code>JSON</code>، موجودة أيضاً في بيئة Node. أما الوظائف المتعلقة بالمتصفح، مثل <code>document</code> أو <code>prompt</code>، فليست موجودة.</p>
<h2 id="الوحدات">الوحدات</h2>
<p>إلى جانب الارتباطات التي ذكرتها، مثل <code>console</code> و<code>process</code>، يضع Node ارتباطات إضافية قليلة في النطاق العالمي. إذا أردت الوصول إلى وظيفة مدمجة، فعليك أن تطلبها من نظام الوحدات.</p>
<p>بدأ Node باستخدام نظام وحدات CommonJS، القائم على دالة <code>require</code>، التي رأيناها في <a href="/chapter/modules#commonjs">الفصل 10</a>. وما زال يستخدم هذا النظام افتراضياً عند تحميل ملف <code>.js</code>.</p>
<p>لكن Node يدعم اليوم أيضاً نظام وحدات ES الأكثر حداثة. عندما ينتهي اسم ملف سكربت بـ <code>.mjs</code>، فإنه يُعتبر وحدة من هذا النوع، ويمكنك استخدام <code>import</code> و<code>export</code> فيه (لكن ليس <code>require</code>). سنستخدم وحدات ES في هذا الفصل.</p>
<p>عند استيراد وحدة — سواء بـ <code>require</code> أو <code>import</code> — على Node أن يحل النص المعطى إلى ملف فعلي يمكنه تحميله. الأسماء التي تبدأ بـ <code>/</code> أو <code>./</code> أو <code>../</code> تُحل كملفات، نسبةً إلى مسار الوحدة الحالية. هنا، تعني <code>.</code> الدليل الحالي، وتعني <code>../</code> دليلاً واحداً للأعلى، وتعني <code>/</code> جذر نظام الملفات. إذا طلبت <code>&quot;./graph.mjs&quot;</code> من الملف <code>/tmp/robot/robot.mjs</code>، فسيحاول Node تحميل الملف <code>/tmp/robot/graph.mjs</code>.</p>
<p>عند استيراد نص لا يبدو مساراً نسبياً أو مطلقاً، يُفترض أنه يشير إما إلى وحدة مدمجة أو إلى وحدة مثبَّتة في دليل <code>node_modules</code>. مثلاً، الاستيراد من <code>&quot;node:fs&quot;</code> سيعطيك وحدة نظام الملفات المدمجة في Node. واستيراد <code>&quot;robot&quot;</code> قد يحاول تحميل المكتبة الموجودة في <code>node_modules/robot/</code>. ومن الشائع تثبيت مثل هذه المكتبات باستخدام NPM، وسنعود إليه بعد قليل.</p>
<p>لنُعِدّ مشروعاً صغيراً يتكون من ملفين. الأول، ويسمى <code>main.mjs</code>، يعرّف سكربتاً يمكن استدعاؤه من سطر الأوامر لعكس نص.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {reverse} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./reverse.mjs&quot;</span>;

<span class="hljs-comment">// الفهرس 2 يحمل أول معطى فعلي في سطر الأوامر</span>
<span class="hljs-keyword">let</span> argument = process.<span class="hljs-property">argv</span>[<span class="hljs-number">2</span>];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">reverse</span>(argument));
</code></pre>
<p>يعرّف الملف <code>reverse.mjs</code> مكتبة لعكس النصوص، يمكن استخدامها بواسطة أداة سطر الأوامر هذه وبواسطة سكربتات أخرى تحتاج وصولاً مباشراً إلى دالة تعكس النصوص.</p>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">reverse</span>(<span class="hljs-params">string</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(string).<span class="hljs-title function_">reverse</span>().<span class="hljs-title function_">join</span>(<span class="hljs-string">&quot;&quot;</span>);
}
</code></pre>
<p>تذكّر أن <code>export</code> تُستخدم للإعلان عن أن ارتباطاً ما جزء من واجهة الوحدة. وهذا يتيح لـ <code>main.mjs</code> استيراد الدالة واستخدامها.</p>
<p>يمكننا الآن استدعاء أداتنا هكذا:</p>
<pre><code>$ node main.mjs JavaScript
tpircSavaJ
</code></pre>
<h2 id="التثبيت-باستخدام-npm">التثبيت باستخدام NPM</h2>
<p>NPM، الذي قُدّم في <a href="/chapter/modules#modules_npm">الفصل 10</a>، مستودع على الإنترنت لوحدات JavaScript، وكثير منها مكتوب خصيصاً لـ Node. عند تثبيت Node على حاسوبك، تحصل أيضاً على أمر <code>npm</code>، الذي يمكنك استخدامه للتفاعل مع هذا المستودع.</p>
<p>الاستخدام الرئيسي لـ NPM هو تنزيل الحزم. رأينا حزمة <code>ini</code> في <a href="/chapter/modules#modules_ini">الفصل 10</a>. يمكننا استخدام NPM لجلب هذه الحزمة وتثبيتها على حاسوبنا.</p>
<pre><code>$ npm install ini
added 1 package in 723ms

$ node
&gt; const {parse} = require(&quot;ini&quot;);
&gt; parse(&quot;x = 1\\ny = 2&quot;);
{ x: '1', y: '2' }
</code></pre>
<p>بعد تشغيل <code>npm install</code>، سيكون NPM قد أنشأ دليلاً يسمى <code>node_modules</code>. وداخل ذلك الدليل سيكون دليل <code>ini</code> الذي يحتوي على المكتبة. يمكنك فتحه والنظر في الشيفرة. عندما نستورد <code>&quot;ini&quot;</code>، تُحمَّل هذه المكتبة، ويمكننا استدعاء خاصيتها <code>parse</code> لتحليل ملف إعدادات.</p>
<p>افتراضياً، يثبّت NPM الحزم تحت الدليل الحالي بدلاً من مكان مركزي. إذا كنت معتاداً على مديري حزم آخرين، فقد يبدو هذا غير معتاد، لكن له مزايا — فهو يمنح كل تطبيق سيطرة كاملة على الحزم التي يثبتها، ويجعل إدارة الإصدارات والتنظيف عند إزالة تطبيق أسهل.</p>
<h3 id="ملفات-الحزم">ملفات الحزم</h3>
<p>بعد تشغيل <code>npm install</code> لتثبيت حزمة ما، ستجد ليس فقط دليل <code>node_modules</code> بل أيضاً ملفاً يسمى <code>package.json</code> في دليلك الحالي. يُستحسن أن يكون لديك ملف كهذا لكل مشروع. يمكنك إنشاؤه يدوياً أو تشغيل <code>npm init</code>. يحتوي هذا الملف على معلومات عن المشروع، مثل اسمه وإصداره، ويسرد تبعياته.</p>
<p>محاكاة الروبوت من <a href="/chapter/project_a_robot">الفصل 7</a>، كما جُعلت وحدات في تمرين <a href="/chapter/modules#modular_robot">الفصل 10</a>، قد يكون لها ملف <code>package.json</code> كهذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;author&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Marijn Haverbeke&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eloquent-javascript-robot&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Simulation of a package-delivery robot&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;run.mjs&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dijkstrajs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.0.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;random-item&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.0.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;license&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ISC&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>عند تشغيل <code>npm install</code> دون تسمية حزمة لتثبيتها، سيثبّت NPM التبعيات المدرجة في <code>package.json</code>. وعند تثبيت حزمة محددة غير مدرجة بعد كتبعية، سيضيفها NPM إلى <code>package.json</code>.</p>
<h3 id="الإصدارات">الإصدارات</h3>
<p>يسرد ملف <code>package.json</code> كلاً من إصدار البرنامج نفسه وإصدارات تبعياته. والإصدارات طريقة للتعامل مع حقيقة أن الحزم تتطور بشكل منفصل، وأن الشيفرة المكتوبة لتعمل مع حزمة كما كانت في وقت ما قد لا تعمل مع إصدار لاحق معدَّل من الحزمة.</p>
<p>يشترط NPM أن تتبع حزمه مخططاً يسمى <em>الإصدار الدلالي</em> (semantic versioning)، وهو يرمّز بعض المعلومات حول الإصدارات <em>المتوافقة</em> (التي لا تكسر الواجهة القديمة) في رقم الإصدار. يتكون الإصدار الدلالي من ثلاثة أرقام تفصل بينها نقاط، مثل <code>2.3.0</code>. في كل مرة تُضاف وظيفة جديدة، يجب زيادة الرقم الأوسط. وفي كل مرة تُكسر التوافقية، بحيث قد لا تعمل الشيفرة الموجودة التي تستخدم الحزمة مع الإصدار الجديد، يجب زيادة الرقم الأول.</p>
<p>تشير علامة الإقحام (<code>^</code>) أمام رقم إصدار تبعية في <code>package.json</code> إلى أن أي إصدار متوافق مع الرقم المعطى يمكن تثبيته. مثلاً، <code>&quot;^2.3.0&quot;</code> تعني أن أي إصدار أكبر من أو يساوي 2.3.0 وأقل من 3.0.0 مسموح به.</p>
<p>يُستخدم أمر <code>npm</code> أيضاً لنشر حزم جديدة أو إصدارات جديدة من الحزم. إذا شغّلت <code>npm publish</code> في دليل يحتوي على ملف <code>package.json</code>، فستُنشر إلى السجل (registry) حزمة بالاسم والإصدار المدرجين في ملف JSON. يمكن لأي شخص نشر حزم على NPM — لكن فقط باسم حزمة غير مستخدم بعد، لأنه لن يكون جيداً أن يتمكن أشخاص عشوائيون من تحديث حزم موجودة.</p>
<p>لن يتعمق هذا الكتاب أكثر في تفاصيل استخدام NPM. راجع <a href="https://npmjs.com"><em>https://npmjs.com</em></a> لمزيد من التوثيق وطريقة للبحث عن الحزم.</p>
<h2 id="وحدة-نظام-الملفات">وحدة نظام الملفات</h2>
<p>من أكثر الوحدات المدمجة استخداماً في Node وحدة <code>node:fs</code>، التي تعني <em>نظام الملفات</em> (filesystem). وهي تصدّر دوال للتعامل مع الملفات والأدلة.</p>
<p>مثلاً، الدالة المسماة <code>readFile</code> تقرأ ملفاً ثم تستدعي دالة رد نداء (callback) بمحتويات الملف.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {readFile} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;
<span class="hljs-title function_">readFile</span>(<span class="hljs-string">&quot;file.txt&quot;</span>, <span class="hljs-string">&quot;utf8&quot;</span>, <span class="hljs-function">(<span class="hljs-params">error, text</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> error;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;The file contains:&quot;</span>, text);
});
</code></pre>
<p>يشير المعطى الثاني لـ <code>readFile</code> إلى <em>ترميز المحارف</em> (character encoding) المستخدم لفك ترميز الملف إلى نص. هناك عدة طرق يمكن بها ترميز النص إلى بيانات ثنائية، لكن معظم الأنظمة الحديثة تستخدم UTF-8. وما لم تكن لديك أسباب للاعتقاد بأن ترميزاً آخر مستخدم، فمرّر <code>&quot;utf8&quot;</code> عند قراءة ملف نصي. إذا لم تمرر ترميزاً، سيفترض Node أنك مهتم بالبيانات الثنائية وسيعطيك كائن <code>Buffer</code> بدلاً من نص. وهو كائن شبيه بالمصفوفة يحتوي على أعداد تمثل البايتات (قطع بيانات من 8 بتات) في الملفات.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {readFile} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;
<span class="hljs-title function_">readFile</span>(<span class="hljs-string">&quot;file.txt&quot;</span>, <span class="hljs-function">(<span class="hljs-params">error, buffer</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> error;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;The file contained&quot;</span>, buffer.<span class="hljs-property">length</span>, <span class="hljs-string">&quot;bytes.&quot;</span>,
              <span class="hljs-string">&quot;The first byte is:&quot;</span>, buffer[<span class="hljs-number">0</span>]);
});
</code></pre>
<p>تُستخدم دالة مشابهة، <code>writeFile</code>، لكتابة ملف إلى القرص.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {writeFile} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;
<span class="hljs-title function_">writeFile</span>(<span class="hljs-string">&quot;graffiti.txt&quot;</span>, <span class="hljs-string">&quot;Node was here&quot;</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Failed to write file: <span class="hljs-subst">\${err}</span>\`</span>);
  <span class="hljs-keyword">else</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;File written.&quot;</span>);
});
</code></pre>
<p>هنا لم يكن ضرورياً تحديد الترميز — سيفترض <code>writeFile</code> أنه عندما يُعطى نصاً ليكتبه، بدلاً من كائن <code>Buffer</code>، فعليه كتابته كنص باستخدام ترميز محارفه الافتراضي، وهو UTF-8.</p>
<p>تحتوي وحدة <code>node:fs</code> على دوال مفيدة أخرى كثيرة: <code>readdir</code> ستعطيك الملفات في دليل كمصفوفة من النصوص، و<code>stat</code> ستسترجع معلومات عن ملف، و<code>rename</code> ستغيّر اسم ملف، و<code>unlink</code> ستحذف ملفاً، وهكذا. انظر التوثيق على <a href="https://nodejs.org"><em>https://nodejs.org</em></a> للتفاصيل.</p>
<p>معظم هذه الدوال تأخذ دالة رد نداء كوسيط أخير، وتستدعيها إما بخطأ (المعطى الأول) أو بنتيجة ناجحة (المعطى الثاني). وكما رأينا في <a href="/chapter/asynchronous_programming">الفصل 11</a>، هناك مساوئ لهذا الأسلوب من البرمجة — وأكبرها أن معالجة الأخطاء تصبح مطوَّلة وعرضة للخطأ.</p>
<p>تصدّر وحدة <code>node:fs/promises</code> معظم الدوال نفسها التي تصدّرها وحدة <code>node:fs</code> القديمة، لكنها تستخدم الوعود (promises) بدلاً من دوال رد النداء.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {readFile} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs/promises&quot;</span>;
<span class="hljs-title function_">readFile</span>(<span class="hljs-string">&quot;file.txt&quot;</span>, <span class="hljs-string">&quot;utf8&quot;</span>)
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;The file contains:&quot;</span>, text));
</code></pre>
<p>أحياناً لا تحتاج إلى اللا تزامن ويكون فقط في طريقك. كثير من دوال <code>node:fs</code> لها أيضاً نسخة متزامنة، تحمل الاسم نفسه مع إضافة <code>Sync</code> في نهايته. مثلاً، النسخة المتزامنة من <code>readFile</code> تسمى <code>readFileSync</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {readFileSync} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;The file contains:&quot;</span>,
            <span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">&quot;file.txt&quot;</span>, <span class="hljs-string">&quot;utf8&quot;</span>));
</code></pre>
<p>لاحظ أنه أثناء تنفيذ عملية متزامنة كهذه، يتوقف برنامجك كلياً. وإذا كان ينبغي أن يستجيب للمستخدم أو لآلات أخرى على الشبكة، فقد يؤدي تعلقه بإجراء متزامن إلى تأخيرات مزعجة.</p>
<h2 id="وحدة-http">وحدة HTTP</h2>
<p>هناك وحدة محورية أخرى تسمى <code>node:http</code>. وهي توفر وظائف لتشغيل خادم HTTP.</p>
<p>هذا كل ما يلزم لبدء خادم HTTP:</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createServer} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:http&quot;</span>;
<span class="hljs-keyword">let</span> server = <span class="hljs-title function_">createServer</span>(<span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
  response.<span class="hljs-title function_">writeHead</span>(<span class="hljs-number">200</span>, {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;text/html&quot;</span>});
  response.<span class="hljs-title function_">write</span>(<span class="hljs-string">\`
    &lt;h1&gt;Hello!&lt;/h1&gt;
    &lt;p&gt;You asked for &lt;code&gt;<span class="hljs-subst">\${request.url}</span>&lt;/code&gt;&lt;/p&gt;\`</span>);
  response.<span class="hljs-title function_">end</span>();
});
server.<span class="hljs-title function_">listen</span>(<span class="hljs-number">8000</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Listening! (port 8000)&quot;</span>);
</code></pre>
<p>إذا شغّلت هذا السكربت على جهازك، يمكنك توجيه متصفحك إلى <a href="http://localhost:8000/hello"><em>http://localhost:8000/hello</em></a> لإرسال طلب إلى خادمك. وسيستجيب بصفحة HTML صغيرة.</p>
<p>الدالة التي تُمرَّر كمعطى إلى <code>createServer</code> تُستدعى في كل مرة يتصل فيها عميل بالخادم. وارتباطا <code>request</code> و<code>response</code> كائنان يمثلان البيانات الواردة والصادرة. يحتوي الأول على معلومات عن الطلب، مثل خاصيته <code>url</code> التي تخبرنا إلى أي عنوان URL أُرسل الطلب.</p>
<p>عند فتح تلك الصفحة في متصفحك، يرسل المتصفح طلباً إلى حاسوبك نفسه. وهذا يجعل دالة الخادم تعمل وترسل استجابة، يمكنك حينها رؤيتها في المتصفح.</p>
<p>لإرسال شيء إلى العميل، تستدعي طرقاً على كائن <code>response</code>. الأولى، <code>writeHead</code>، ستكتب ترويسات الاستجابة (انظر <a href="/chapter/http_and_forms#headers">الفصل 18</a>). وتعطيها رمز الحالة (200 وتعني «موافق» في هذه الحالة) وكائناً يحتوي على قيم الترويسات. يضبط المثال ترويسة <code>Content-Type</code> لإبلاغ العميل بأننا سنرسل مستند HTML.</p>
<p>بعد ذلك، يُرسل جسم الاستجابة الفعلي (المستند نفسه) بـ <code>response.write</code>. ويُسمح لك باستدعاء هذه الطريقة عدة مرات إذا أردت إرسال الاستجابة قطعة قطعة — مثلاً، لبث البيانات إلى العميل عند توفرها. وأخيراً، تشير <code>response.end</code> إلى نهاية الاستجابة.</p>
<p>يؤدي استدعاء <code>server.listen</code> إلى بدء الخادم في انتظار الاتصالات على المنفذ 8000. ولهذا عليك الاتصال بـ <em>localhost:8000</em> للتحدث مع هذا الخادم، بدلاً من <em>localhost</em> فقط، الذي سيستخدم المنفذ الافتراضي 80.</p>
<p>عند تشغيل هذا السكربت، تظل العملية جالسة هناك وتنتظر. عندما يستمع سكربت إلى أحداث — في هذه الحالة، اتصالات الشبكة — لن يخرج <code>node</code> تلقائياً عند وصوله إلى نهاية السكربت. لإغلاقه، اضغط ctrl-C.</p>
<p>عادةً يفعل خادم ويب حقيقي أكثر مما في المثال — فهو ينظر إلى طريقة الطلب (خاصية <code>method</code>) ليرى ما الإجراء الذي يحاول العميل تنفيذه، وينظر إلى عنوان URL للطلب ليعرف على أي مورد يُنفَّذ هذا الإجراء. سنرى خادماً أكثر تطوراً <a href="/chapter/node_js#file_server">لاحقاً في هذا الفصل</a>.</p>
<p>توفر وحدة <code>node:http</code> أيضاً دالة <code>request</code> يمكن استخدامها لإرسال طلبات HTTP. لكن استخدامها أكثر تعقيداً بكثير من <code>fetch</code>، الذي رأيناه في <a href="/chapter/http_and_forms">الفصل 18</a>. لحسن الحظ، <code>fetch</code> متاح أيضاً في Node كارتباط عالمي. وما لم ترد فعل شيء محدد جداً، مثل معالجة مستند الاستجابة قطعة قطعة مع وصول البيانات عبر الشبكة، أنصحك بالالتزام بـ <code>fetch</code>.</p>
<h2 id="المجاري-streams">المجاري (Streams)</h2>
<p>كائن الاستجابة الذي يمكن لخادم HTTP أن يكتب إليه مثال على كائن <em>مجرى قابل للكتابة</em> (writable stream)، وهو مفهوم واسع الاستخدام في Node. لهذه الكائنات طريقة <code>write</code> يمكن تمرير نص أو كائن <code>Buffer</code> إليها لكتابة شيء إلى المجرى. وطريقتها <code>end</code> تغلق المجرى ويمكن أن تأخذ اختيارياً قيمة تُكتب إلى المجرى قبل الإغلاق. ويمكن أيضاً إعطاء كلتا الطريقتين دالة رد نداء كمعطى إضافي، تستدعيها عند انتهاء الكتابة أو الإغلاق.</p>
<p>من الممكن إنشاء مجرى قابل للكتابة يشير إلى ملف باستخدام الدالة <code>createWriteStream</code> من وحدة <code>node:fs</code>. يمكنك حينها استخدام طريقة <code>write</code> على الكائن الناتج لكتابة الملف قطعة قطعة بدلاً من كتابته دفعة واحدة، كما في <code>writeFile</code>.</p>
<p><em>المجاري القابلة للقراءة</em> (readable streams) أكثر تعقيداً قليلاً. معطى <code>request</code> لدالة رد نداء خادم HTTP مجرى قابل للقراءة. وتُجرى القراءة من مجرى باستخدام معالجات الأحداث بدلاً من الطرق.</p>
<p>الكائنات التي تصدر أحداثاً في Node لها طريقة تسمى <code>on</code> تشبه طريقة <code>addEventListener</code> في المتصفح. تعطيها اسم حدث ثم دالة، فتُسجّل تلك الدالة لتُستدعى كلما وقع الحدث المعطى.</p>
<p>للمجاري القابلة للقراءة حدثا <code>&quot;data&quot;</code> و<code>&quot;end&quot;</code>. يُطلق الأول في كل مرة تصل فيها بيانات، ويُستدعى الثاني كلما وصل المجرى إلى نهايته. هذا النموذج أنسب <em>لبث</em> البيانات التي يمكن معالجتها فوراً، حتى عندما لا يكون المستند كاملاً متاحاً بعد. ويمكن قراءة ملف كمجرى قابل للقراءة باستخدام الدالة <code>createReadStream</code> من <code>node:fs</code>.</p>
<p>تُنشئ هذه الشيفرة خادماً يقرأ أجسام الطلبات ويبثها مرة أخرى إلى العميل كنص بأحرف كبيرة كلها:</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createServer} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:http&quot;</span>;
<span class="hljs-title function_">createServer</span>(<span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
  response.<span class="hljs-title function_">writeHead</span>(<span class="hljs-number">200</span>, {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;text/plain&quot;</span>});
  request.<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-function"><span class="hljs-params">chunk</span> =&gt;</span>
    response.<span class="hljs-title function_">write</span>(chunk.<span class="hljs-title function_">toString</span>().<span class="hljs-title function_">toUpperCase</span>()));
  request.<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;end&quot;</span>, <span class="hljs-function">() =&gt;</span> response.<span class="hljs-title function_">end</span>());
}).<span class="hljs-title function_">listen</span>(<span class="hljs-number">8000</span>);
</code></pre>
<p>ستكون قيمة <code>chunk</code> التي تُمرَّر إلى معالج البيانات كائن <code>Buffer</code> ثنائياً. يمكننا تحويله إلى نص بفك ترميزه كمحارف مرمَّزة بـ UTF-8 بواسطة طريقته <code>toString</code>.</p>
<p>قطعة الشيفرة التالية، عند تشغيلها بينما خادم التحويل إلى أحرف كبيرة نشط، سترسل طلباً إلى ذلك الخادم وتكتب الاستجابة التي تتلقاها:</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;http://localhost:8000/&quot;</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;POST&quot;</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;Hello server&quot;</span>
}).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> resp.<span class="hljs-title function_">text</span>()).<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-comment">// → HELLO SERVER</span>
</code></pre>
<h2 id="خادم-ملفات">خادم ملفات</h2>
<p>لنجمع معرفتنا الجديدة بخوادم HTTP والتعامل مع نظام الملفات لإنشاء جسر بين الاثنين: خادم HTTP يتيح وصولاً عن بعد إلى نظام ملفات. لمثل هذا الخادم استخدامات من كل نوع — فهو يتيح لتطبيقات الويب تخزين البيانات ومشاركتها، أو يمكنه منح مجموعة من الناس وصولاً مشتركاً إلى مجموعة من الملفات.</p>
<p>عندما نتعامل مع الملفات كموارد HTTP، يمكن استخدام طرق HTTP وهي <code>GET</code> و<code>PUT</code> و<code>DELETE</code> لقراءة الملفات وكتابتها وحذفها على التوالي. وسنفسّر المسار في الطلب على أنه مسار الملف الذي يشير إليه الطلب.</p>
<p>من المحتمل ألا نريد مشاركة نظام الملفات كله، لذا سنفسّر هذه المسارات على أنها تبدأ من دليل عمل الخادم، وهو الدليل الذي شُغّل منه. إذا شغّلت الخادم من <code>/tmp/public/</code> (أو <code>C:\\tmp\\public\\</code> على Windows)، فينبغي أن يشير طلب <code>/file.txt</code> إلى <code>/tmp/public/file.txt</code> (أو <code>C:\\tmp\\public\\file.txt</code>).</p>
<p>سنبني البرنامج قطعة قطعة، باستخدام كائن يسمى <code>methods</code> لتخزين الدوال التي تعالج طرق HTTP المختلفة. معالجات الطرق دوال <code>async</code> تأخذ كائن الطلب كمعطى لها وتُرجع وعداً يُحلّ إلى كائن يصف الاستجابة.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createServer} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:http&quot;</span>;

<span class="hljs-keyword">const</span> methods = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>);

<span class="hljs-title function_">createServer</span>(<span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> handler = methods[request.<span class="hljs-property">method</span>] || notAllowed;
  <span class="hljs-title function_">handler</span>(request).<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">status</span> != <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> error;
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">body</span>: <span class="hljs-title class_">String</span>(error), <span class="hljs-attr">status</span>: <span class="hljs-number">500</span>};
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{body, status = <span class="hljs-number">200</span>, type = <span class="hljs-string">&quot;text/plain&quot;</span>}</span>) =&gt;</span> {
    response.<span class="hljs-title function_">writeHead</span>(status, {<span class="hljs-string">&quot;Content-Type&quot;</span>: type});
    <span class="hljs-keyword">if</span> (body?.<span class="hljs-property">pipe</span>) body.<span class="hljs-title function_">pipe</span>(response);
    <span class="hljs-keyword">else</span> response.<span class="hljs-title function_">end</span>(body);
  });
}).<span class="hljs-title function_">listen</span>(<span class="hljs-number">8000</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">notAllowed</span>(<span class="hljs-params">request</span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">status</span>: <span class="hljs-number">405</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-string">\`Method <span class="hljs-subst">\${request.method}</span> not allowed.\`</span>
  };
}
</code></pre>
<p>هذا يبدأ خادماً يُرجع فقط استجابات خطأ 405، وهو الرمز المستخدم للإشارة إلى أن الخادم يرفض معالجة طريقة معينة.</p>
<p>عندما يُرفض وعد معالج طلب، يحوّل استدعاء <code>catch</code> الخطأ إلى كائن استجابة، إن لم يكن كذلك بالفعل، حتى يتمكن الخادم من إرسال استجابة خطأ لإبلاغ العميل بأنه فشل في معالجة الطلب.</p>
<p>قد يُحذف الحقل <code>status</code> من وصف الاستجابة، وفي هذه الحالة تكون قيمته الافتراضية 200 (موافق). ويمكن أيضاً ترك نوع المحتوى، في الخاصية <code>type</code>، وفي هذه الحالة يُفترض أن الاستجابة نص عادي.</p>
<p>عندما تكون قيمة <code>body</code> مجرى قابلاً للقراءة، سيكون له طريقة <code>pipe</code> يمكننا استخدامها لتمرير كل المحتوى من مجرى قابل للقراءة إلى مجرى قابل للكتابة. وإلا، فيُفترض أنه إما <code>null</code> (لا جسم)، أو نص، أو مخزن مؤقت، ويُمرَّر مباشرة إلى طريقة <code>end</code> للاستجابة.</p>
<p>لمعرفة مسار الملف الذي يقابل عنوان URL لطلب ما، تستخدم الدالة <code>urlPath</code> صنف <code>URL</code> المدمج (الموجود أيضاً في المتصفح) لتحليل عنوان URL. يتوقع هذا الباني عنوان URL كاملاً، لا الجزء الذي يبدأ بالشرطة المائلة فقط والذي نحصل عليه من <code>request.url</code>، لذا نعطيه اسم نطاق وهمياً ليكمل به. وتستخرج منه اسم المسار (pathname)، الذي سيكون شيئاً مثل <code>&quot;/file.txt&quot;</code>، وتفك ترميزه للتخلص من رموز التخطي (escape) من نمط <code>%20</code>، وتحلّه نسبةً إلى دليل عمل البرنامج.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {resolve, sep} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:path&quot;</span>;

<span class="hljs-keyword">const</span> baseDirectory = process.<span class="hljs-title function_">cwd</span>();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">urlPath</span>(<span class="hljs-params">url</span>) {
  <span class="hljs-keyword">let</span> {pathname} = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(url, <span class="hljs-string">&quot;http://d&quot;</span>);
  <span class="hljs-keyword">let</span> path = <span class="hljs-title function_">resolve</span>(<span class="hljs-built_in">decodeURIComponent</span>(pathname).<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>));
  <span class="hljs-keyword">if</span> (path != baseDirectory &amp;&amp;
      !path.<span class="hljs-title function_">startsWith</span>(baseDirectory + sep)) {
    <span class="hljs-keyword">throw</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">403</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;Forbidden&quot;</span>};
  }
  <span class="hljs-keyword">return</span> path;
}
</code></pre>
<p>بمجرد أن تُعِدّ برنامجاً لقبول طلبات الشبكة، عليك أن تبدأ بالقلق بشأن الأمان. في هذه الحالة، إذا لم نكن حذرين، فمن المرجح أن نكشف نظام ملفاتنا كله للشبكة عن غير قصد.</p>
<p>مسارات الملفات نصوص في Node. ولتحويل نص كهذا إلى ملف فعلي، يجري قدر غير تافه من التفسير. فقد تتضمن المسارات، مثلاً، <code>../</code> للإشارة إلى دليل أب. وأحد المصادر الواضحة للمشاكل سيكون طلبات لمسارات مثل <code>/../secret_file</code>.</p>
<p>لتجنب مثل هذه المشاكل، تستخدم <code>urlPath</code> الدالة <code>resolve</code> من وحدة <code>node:path</code>، التي تحل المسارات النسبية. ثم تتحقق من أن النتيجة <em>تحت</em> دليل العمل. ويمكن استخدام الدالة <code>process.cwd</code> (حيث <code>cwd</code> تعني <em>دليل العمل الحالي</em>، current working directory) للعثور على دليل العمل هذا. وارتباط <code>sep</code> من حزمة <code>node:path</code> هو فاصل المسار في النظام — شرطة مائلة معكوسة على Windows وشرطة مائلة عادية على معظم الأنظمة الأخرى. وعندما لا يبدأ المسار بدليل الأساس، تطلق الدالة كائن استجابة خطأ، باستخدام رمز حالة HTTP الذي يشير إلى أن الوصول إلى المورد محظور.</p>
<p>سنُعِدّ طريقة <code>GET</code> لتُرجع قائمة ملفات عند قراءة دليل، وتُرجع محتوى الملف عند قراءة ملف عادي.</p>
<p>سؤال محيّر هو أي نوع من ترويسة <code>Content-Type</code> ينبغي أن نضبط عند إرجاع محتوى ملف. وبما أن هذه الملفات قد تكون أي شيء، لا يمكن لخادمنا ببساطة إرجاع نوع المحتوى نفسه لكلها. يمكن لـ NPM مساعدتنا هنا مجدداً. حزمة <code>mime-types</code> (مؤشرات نوع المحتوى مثل <code>text/plain</code> تسمى أيضاً <em>أنواع MIME</em>) تعرف النوع الصحيح لعدد كبير من امتدادات الملفات.</p>
<p>أمر <code>npm</code> التالي، في الدليل الذي يعيش فيه سكربت الخادم، يثبّت إصداراً محدداً من <code>mime</code>:</p>
<pre><code>$ npm install mime-types@2.1.0
</code></pre>
<p>عندما لا يوجد ملف مطلوب، رمز حالة HTTP الصحيح للإرجاع هو 404. سنستخدم الدالة <code>stat</code>، التي تبحث عن معلومات حول ملف، لمعرفة ما إذا كان الملف موجوداً وما إذا كان دليلاً.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createReadStream} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;
<span class="hljs-keyword">import</span> {stat, readdir} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs/promises&quot;</span>;
<span class="hljs-keyword">import</span> {lookup} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;mime-types&quot;</span>;

methods.<span class="hljs-property">GET</span> = <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">request</span>) {
  <span class="hljs-keyword">let</span> path = <span class="hljs-title function_">urlPath</span>(request.<span class="hljs-property">url</span>);
  <span class="hljs-keyword">let</span> stats;
  <span class="hljs-keyword">try</span> {
    stats = <span class="hljs-keyword">await</span> <span class="hljs-title function_">stat</span>(path);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">code</span> != <span class="hljs-string">&quot;ENOENT&quot;</span>) <span class="hljs-keyword">throw</span> error;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">404</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;File not found&quot;</span>};
  }
  <span class="hljs-keyword">if</span> (stats.<span class="hljs-title function_">isDirectory</span>()) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">body</span>: (<span class="hljs-keyword">await</span> <span class="hljs-title function_">readdir</span>(path)).<span class="hljs-title function_">join</span>(<span class="hljs-string">&quot;\\n&quot;</span>)};
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">body</span>: <span class="hljs-title function_">createReadStream</span>(path),
            <span class="hljs-attr">type</span>: <span class="hljs-title function_">lookup</span>(path)};
  }
};
</code></pre>
<p>لأنها يجب أن تلمس القرص وبالتالي قد تستغرق وقتاً، فإن <code>stat</code> غير متزامنة. وبما أننا نستخدم الوعود بدلاً من أسلوب دوال رد النداء، فيجب استيرادها من <code>node:fs/promises</code> بدلاً من <code>node:fs</code> مباشرة.</p>
<p>عندما لا يوجد الملف، ستطلق <code>stat</code> كائن خطأ بخاصية <code>code</code> قيمتها <code>&quot;ENOENT&quot;</code>. هذه الرموز الغامضة نوعاً ما، المستوحاة من Unix، هي طريقتك للتعرف على أنواع الأخطاء في Node.</p>
<p>كائن <code>stats</code> الذي تُرجعه <code>stat</code> يخبرنا بعدة أشياء عن ملف، مثل حجمه (خاصية <code>size</code>) وتاريخ تعديله (خاصية <code>mtime</code>). ونحن مهتمون هنا بمسألة ما إذا كان دليلاً أم ملفاً عادياً، وهو ما تخبرنا به طريقة <code>isDirectory</code>.</p>
<p>نستخدم <code>readdir</code> لقراءة مصفوفة الملفات في دليل وإرجاعها إلى العميل. أما الملفات العادية، فسننشئ مجرى قابلاً للقراءة بـ <code>createReadStream</code> ونرجعه كجسم، إلى جانب نوع المحتوى الذي تعطينا إياه حزمة <code>mime</code> لاسم الملف.</p>
<p>الشيفرة لمعالجة طلبات <code>DELETE</code> أبسط قليلاً.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {rmdir, unlink} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs/promises&quot;</span>;

methods.<span class="hljs-property">DELETE</span> = <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">request</span>) {
  <span class="hljs-keyword">let</span> path = <span class="hljs-title function_">urlPath</span>(request.<span class="hljs-property">url</span>);
  <span class="hljs-keyword">let</span> stats;
  <span class="hljs-keyword">try</span> {
    stats = <span class="hljs-keyword">await</span> <span class="hljs-title function_">stat</span>(path);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">code</span> != <span class="hljs-string">&quot;ENOENT&quot;</span>) <span class="hljs-keyword">throw</span> error;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
  }
  <span class="hljs-keyword">if</span> (stats.<span class="hljs-title function_">isDirectory</span>()) <span class="hljs-keyword">await</span> <span class="hljs-title function_">rmdir</span>(path);
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">unlink</span>(path);
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
};
</code></pre>
<p>عندما لا تحتوي استجابة HTTP على أي بيانات، يمكن استخدام رمز الحالة 204 («لا محتوى») للإشارة إلى ذلك. وبما أن الاستجابة للحذف لا تحتاج إلى نقل أي معلومات تتجاوز ما إذا نجحت العملية، فمن المنطقي إرجاع ذلك هنا.</p>
<p>قد تتساءل لماذا إرجاع رمز حالة نجاح بدلاً من خطأ عند محاولة حذف ملف غير موجود. عندما لا يكون الملف المحذوف موجوداً، يمكنك القول إن هدف الطلب قد تحقق بالفعل. يشجعنا معيار HTTP على جعل الطلبات <em>عديمة الأثر</em> (idempotent)، وهو ما يعني أن إرسال الطلب نفسه عدة مرات ينتج النتيجة نفسها التي ينتجها إرساله مرة واحدة. وبطريقة ما، إذا حاولت حذف شيء ذهب بالفعل، فقد تحقق الأثر الذي كنت تحاول إحداثه — فالشيء لم يعد هناك.</p>
<p>هذا هو معالج طلبات <code>PUT</code>:</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createWriteStream} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:fs&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">pipeStream</span>(<span class="hljs-params"><span class="hljs-keyword">from</span>, to</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">from</span>.<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;error&quot;</span>, reject);
    to.<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;error&quot;</span>, reject);
    to.<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;finish&quot;</span>, resolve);
    <span class="hljs-keyword">from</span>.<span class="hljs-title function_">pipe</span>(to);
  });
}

methods.<span class="hljs-property">PUT</span> = <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">request</span>) {
  <span class="hljs-keyword">let</span> path = <span class="hljs-title function_">urlPath</span>(request.<span class="hljs-property">url</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">pipeStream</span>(request, <span class="hljs-title function_">createWriteStream</span>(path));
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
};
</code></pre>
<p>لا نحتاج هذه المرة إلى التحقق مما إذا كان الملف موجوداً — إذا كان موجوداً، فسنكتب فوقه فقط. نستخدم <code>pipe</code> مجدداً لنقل البيانات من مجرى قابل للقراءة إلى مجرى قابل للكتابة، في هذه الحالة من الطلب إلى الملف. لكن بما أن <code>pipe</code> ليست مكتوبة لتُرجع وعداً، فعلينا كتابة غلاف، <code>pipeStream</code>، ينشئ وعداً حول نتيجة استدعاء <code>pipe</code>.</p>
<p>عندما يسوء شيء ما عند فتح الملف، ستظل <code>createWriteStream</code> تُرجع مجرى، لكن ذلك المجرى سيطلق حدث <code>&quot;error&quot;</code>. وقد يفشل المجرى القادم من الطلب أيضاً — مثلاً، إذا انقطعت الشبكة. لذا نوصل حدثي <code>&quot;error&quot;</code> في كلا المجريين لرفض الوعد. وعندما ينتهي <code>pipe</code>، سيغلق مجرى المخرجات، ما يجعله يطلق حدث <code>&quot;finish&quot;</code>. عند هذه النقطة يمكننا حل الوعد بنجاح (دون إرجاع شيء).</p>
<p>السكربت الكامل للخادم متاح على <a href="https://eloquentjavascript.net/code/file_server.mjs"><em>https://eloquentjavascript.net/code/file_server.mjs</em></a>. يمكنك تنزيله، وبعد تثبيت تبعياته، تشغيله بـ Node لبدء خادم ملفاتك الخاص. وبالطبع، يمكنك تعديله وتوسيعه لحل تمارين هذا الفصل أو للتجربة.</p>
<p>أداة سطر الأوامر <code>curl</code>، المتاحة على نطاق واسع في الأنظمة الشبيهة بـ Unix (مثل macOS وLinux)، يمكن استخدامها لإرسال طلبات HTTP. الجلسة التالية تختبر خادمنا باختصار. يُستخدم الخيار <code>-X</code> لضبط طريقة الطلب، و<code>-d</code> لتضمين جسم الطلب.</p>
<pre><code>$ curl http://localhost:8000/file.txt
File not found
$ curl -X PUT -d CONTENT http://localhost:8000/file.txt
$ curl http://localhost:8000/file.txt
CONTENT
$ curl -X DELETE http://localhost:8000/file.txt
$ curl http://localhost:8000/file.txt
File not found
</code></pre>
<p>يفشل الطلب الأول لـ <code>file.txt</code> لأن الملف غير موجود بعد. ينشئ طلب <code>PUT</code> الملف، وها هو ذا، الطلب التالي يسترجعه بنجاح. وبعد حذفه بطلب <code>DELETE</code>، يغيب الملف مجدداً.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>Node نظام صغير لطيف يتيح لنا تشغيل JavaScript في سياق خارج المتصفح. صُمم أصلاً لمهام الشبكة ليؤدي دور عقدة في شبكة، لكنه يناسب جميع أنواع مهام السكربتات. وإذا كانت كتابة JavaScript شيئاً تستمتع به، فقد تناسبك أتمتة المهام بـ Node جيداً.</p>
<p>يوفر NPM حزماً لكل ما يمكن أن يخطر ببالك (وكثير من الأشياء التي لن تخطر ببالك على الأرجح)، ويتيح لك جلب تلك الحزم وتثبيتها ببرنامج <code>npm</code>. ويأتي Node بعدد من الوحدات المدمجة، منها وحدة <code>node:fs</code> للتعامل مع نظام الملفات ووحدة <code>node:http</code> لتشغيل خوادم HTTP.</p>
<p>تُجرى كل المدخلات والمخرجات في Node بشكل غير متزامن، إلا إذا استخدمت صراحة نسخة متزامنة من دالة، مثل <code>readFileSync</code>. استخدم Node أصلاً دوال رد النداء للوظائف غير المتزامنة، لكن حزمة <code>node:fs/promises</code> توفر واجهة قائمة على الوعود لنظام الملفات.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="أداة-بحث">أداة بحث</h3>
<p>في أنظمة Unix، هناك أداة سطر أوامر تسمى <code>grep</code> يمكن استخدامها للبحث سريعاً في الملفات عن تعبير نمطي.</p>
<p>اكتب سكربت Node يمكن تشغيله من سطر الأوامر ويعمل بشكل مشابه إلى حد ما لـ <code>grep</code>. يعامل معطاه الأول في سطر الأوامر كتعبير نمطي، ويعامل أي معطيات أخرى كملفات للبحث فيها. ويُخرج أسماء أي ملف يطابق محتواه التعبير النمطي.</p>
<p>عندما يعمل ذلك، وسّعه بحيث إذا كان أحد المعطيات دليلاً، بحث في كل الملفات في ذلك الدليل وأدلته الفرعية.</p>
<p>استخدم دوال نظام الملفات غير المتزامنة أو المتزامنة كما تراه مناسباً. قد يؤدي إعداد الأمور بحيث تُطلب إجراءات غير متزامنة متعددة في الوقت نفسه إلى تسريع الأمور قليلاً، لكن ليس بقدر كبير، لأن معظم أنظمة الملفات لا تستطيع قراءة أكثر من شيء واحد في كل مرة.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>معطاك الأول في سطر الأوامر، وهو التعبير النمطي، يمكن العثور عليه في <code>process.argv[2]</code>. وتأتي ملفات الإدخال بعده. يمكنك استخدام باني <code>RegExp</code> للانتقال من نص إلى كائن تعبير نمطي.</p>
<p>فعل هذا بشكل متزامن، بـ <code>readFileSync</code>، أبسط، لكن إذا استخدمت <code>node:fs/promises</code> للحصول على دوال تُرجع وعوداً وكتبت دالة <code>async</code>، فستبدو الشيفرة مشابهة.</p>
<p>لمعرفة ما إذا كان شيء ما دليلاً، يمكنك مجدداً استخدام <code>stat</code> (أو <code>statSync</code>) وطريقة <code>isDirectory</code> في كائن الإحصاءات.</p>
<p>استكشاف دليل عملية متفرعة. يمكنك فعلها إما باستخدام دالة تعاودية أو بالاحتفاظ بمصفوفة عمل (ملفات لا تزال بحاجة إلى استكشاف). وللعثور على الملفات في دليل، يمكنك استدعاء <code>readdir</code> أو <code>readdirSync</code>. لاحظ الكتابة الكبيرة الغريبة — تسمية دوال نظام الملفات في Node مبنية بشكل فضفاض على دوال Unix القياسية، مثل <code>readdir</code>، التي كلها بأحرف صغيرة، لكنها تضيف بعدها <code>Sync</code> بحرف كبير.</p>
<p>للانتقال من اسم ملف مقروء بـ <code>readdir</code> إلى اسم مسار كامل، عليك دمجه مع اسم الدليل، إما بوضع <code>sep</code> من <code>node:path</code> بينهما أو باستخدام الدالة <code>join</code> من الحزمة نفسها.</p>
</details>
<h3 id="إنشاء-دليل">إنشاء دليل</h3>
<p>رغم أن طريقة <code>DELETE</code> في خادم ملفاتنا قادرة على حذف الأدلة (باستخدام <code>rmdir</code>)، فإن الخادم لا يوفر حالياً أي طريقة <em>لإنشاء</em> دليل.</p>
<p>أضف دعماً لطريقة <code>MKCOL</code> («أنشئ مجموعة»، make collection)، التي ينبغي أن تنشئ دليلاً باستدعاء <code>mkdir</code> من وحدة <code>node:fs</code>. ليست <code>MKCOL</code> طريقة HTTP واسعة الاستخدام، لكنها موجودة لهذا الغرض نفسه في معيار <em>WebDAV</em>، الذي يحدد مجموعة من الاصطلاحات فوق HTTP تجعله مناسباً لإنشاء المستندات.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يمكنك استخدام الدالة التي تنفذ طريقة <code>DELETE</code> كمخطط لطريقة <code>MKCOL</code>. عندما لا يوجد ملف، حاول إنشاء دليل بـ <code>mkdir</code>. وعندما يوجد دليل في ذلك المسار، يمكنك إرجاع استجابة 204 حتى تكون طلبات إنشاء الدليل عديمة الأثر. وإذا وُجد ملف ليس دليلاً هناك، فأرجع رمز خطأ. الرمز 400 («طلب سيئ») سيكون مناسباً.</p>
</details>
<h3 id="مساحة-عامة-على-الويب">مساحة عامة على الويب</h3>
<p>بما أن خادم الملفات يقدّم أي نوع من الملفات ويتضمن حتى ترويسة <code>Content-Type</code> الصحيحة، يمكنك استخدامه لتقديم موقع ويب. وبما أن هذا الخادم يتيح للجميع حذف الملفات واستبدالها، فسيصنع هذا نوعاً مثيراً من المواقع: موقع يمكن تعديله وتحسينه وتخريبه من كل من يستغرق الوقت لإرسال طلب HTTP الصحيح.</p>
<p>اكتب صفحة HTML أساسية تتضمن ملف JavaScript بسيطاً. ضع الملفات في دليل يقدمه خادم الملفات وافتحها في متصفحك.</p>
<p>بعد ذلك، كتمرين متقدم أو حتى مشروع نهاية أسبوع، اجمع كل المعرفة التي اكتسبتها من هذا الكتاب لبناء واجهة أسهل استخداماً لتعديل الموقع — من <em>داخل</em> الموقع.</p>
<p>استخدم نموذج HTML لتحرير محتوى الملفات التي يتكون منها الموقع، بحيث يتيح للمستخدم تحديثها على الخادم باستخدام طلبات HTTP، كما هو موصوف في <a href="/chapter/http_and_forms">الفصل 18</a>.</p>
<p>ابدأ بجعل ملف واحد فقط قابلاً للتحرير. ثم اجعل الأمر بحيث يستطيع المستخدم اختيار الملف الذي يريد تحريره. واستفد من كون خادم ملفاتنا يُرجع قوائم ملفات عند قراءة دليل.</p>
<p>لا تعمل مباشرة في الشيفرة التي يكشفها خادم الملفات، لأنه إن ارتكبت خطأ، فمن المرجح أن تلحق الضرر بالملفات هناك. بدلاً من ذلك، أبقِ عملك خارج الدليل المتاح للعامة وانسخه هناك عند الاختبار.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يمكنك إنشاء عنصر <code>&lt;textarea&gt;</code> ليحتفظ بمحتوى الملف الجاري تحريره. طلب <code>GET</code>، باستخدام <code>fetch</code>، يمكنه استرجاع المحتوى الحالي للملف. يمكنك استخدام عناوين URL نسبية مثل <em>index.html</em>، بدلاً من <a href="http://localhost:8000/index.html"><em>http://localhost:8000/index.html</em></a>، للإشارة إلى ملفات على الخادم نفسه الذي يعمل عليه السكربت.</p>
<p>ثم، عندما ينقر المستخدم زراً (يمكنك استخدام عنصر <code>&lt;form&gt;</code> وحدث <code>&quot;submit&quot;</code>)، أرسل طلب <code>PUT</code> إلى عنوان URL نفسه، مع محتوى <code>&lt;textarea&gt;</code> كجسم للطلب، لحفظ الملف.</p>
<p>يمكنك بعد ذلك إضافة عنصر <code>&lt;select&gt;</code> يحتوي على كل الملفات في الدليل الأعلى للخادم بإضافة عناصر <code>&lt;option&gt;</code> تحتوي على الأسطر التي يُرجعها طلب <code>GET</code> إلى عنوان URL <code>/</code>. وعندما يختار المستخدم ملفاً آخر (حدث <code>&quot;change&quot;</code> على الحقل)، يجب أن يجلب السكربت ذلك الملف ويعرضه. وعند حفظ ملف، استخدم اسم الملف المحدد حالياً.</p>
</details>
`,t={number:"20",slug:s,title:n,englishTitle:e,headings:a,html:o};export{t as default,e as englishTitle,a as headings,o as html,p as number,s as slug,n as title};
