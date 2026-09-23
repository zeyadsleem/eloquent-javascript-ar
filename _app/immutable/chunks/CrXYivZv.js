const e="17",s="drawing_on_canvas",a="الرسم على Canvas",n="Drawing on Canvas",l=[{depth:2,id:"svg",text:"SVG"},{depth:2,id:"عنصر-canvas",text:"عنصر canvas"},{depth:2,id:"الخطوط-والأسطح",text:"الخطوط والأسطح"},{depth:2,id:"المسارات",text:"المسارات"},{depth:2,id:"المنحنيات",text:"المنحنيات"},{depth:2,id:"رسم-مخطط-دائري",text:"رسم مخطط دائري"},{depth:2,id:"النص",text:"النص"},{depth:2,id:"الصور",text:"الصور"},{depth:2,id:"التحويلات",text:"التحويلات"},{depth:2,id:"تخزين-التحويلات-ومحوها",text:"تخزين التحويلات ومحوها"},{depth:2,id:"العودة-إلى-اللعبة",text:"العودة إلى اللعبة"},{depth:2,id:"اختيار-واجهة-الرسومات",text:"اختيار واجهة الرسومات"},{depth:2,id:"الملخص",text:"الملخص"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"الأشكال",text:"الأشكال"},{depth:3,id:"المخطط-الدائري",text:"المخطط الدائري"},{depth:3,id:"كرة-ترتد",text:"كرة ترتد"},{depth:3,id:"انعكاس-محسوب-مسبقا",text:"انعكاس محسوب مسبقاً"}],p=`<blockquote>
<p>الرسم خداع.</p>
<p>— م. ك. إيشر، نقلاً عن برونو إرنست في «المرآة السحرية لم. ك. إيشر»</p>
</blockquote>
<p><img src="/images/book/chapter_picture_17.jpg" alt="رسم توضيحي يظهر ذراع روبوت بمظهر صناعي ترسم مدينة على قطعة ورق"></p>
<p>تمنحنا المتصفحات عدة طرق لعرض الرسومات. أبسط طريقة هي استخدام الأنماط لتحديد موضع عناصر DOM العادية وتلوينها. وهذا يمكن أن يبلغ بنا شوطاً بعيداً، كما أظهرت اللعبة في <a href="/chapter/project_a_platform_game">الفصل السابق</a>. فبإضافة صور خلفية شفافة جزئياً إلى العقد، يمكننا جعلها تبدو بالضبط كما نريد. بل إن من الممكن تدوير العقد أو إمالتها باستخدام نمط <code>transform</code>.</p>
<p>لكننا سنكون حينها نستخدم DOM لشيء لم يُصمَّم له أصلاً. فبعض المهام، مثل رسم خط بين أي نقطتين، بالغة الصعوبة مع عناصر HTML العادية.</p>
<p>هناك بديلان. الأول مبني على DOM لكنه يستخدم <em>الرسومات المتجهة القابلة للتوسع</em> (Scalable Vector Graphics) واختصارها SVG بدلاً من HTML. فكّر في SVG كلهجة من لهجات ترميز المستندات تركّز على الأشكال بدلاً من النص. يمكنك تضمين مستند SVG مباشرة في مستند HTML أو إدراجه بوسم <code>&lt;img&gt;</code>.</p>
<p>أما البديل الثاني فيسمى <em>Canvas</em>. والـ Canvas عنصر DOM واحد يغلّف صورة. وهو يوفر واجهة برمجية لرسم الأشكال على المساحة التي تشغلها العقدة. الفرق الرئيسي بين Canvas وصورة SVG هو أن الوصف الأصلي للأشكال يبقى محفوظاً في SVG بحيث يمكن تحريكها أو تغيير حجمها في أي وقت. أما Canvas فيحوّل الأشكال إلى بكسلات (نقاط ملونة على شبكة نقطية) بمجرد رسمها ولا يتذكر ما تمثله هذه البكسلات. والطريقة الوحيدة لتحريك شكل على Canvas هي محو الـ Canvas (أو الجزء المحيط بالشكل منه) وإعادة رسمه والشكل في موضع جديد.</p>
<h2 id="svg">SVG</h2>
<p>لن يتعمق هذا الكتاب في SVG، لكنني سأشرح بإيجاز كيف يعمل. وفي <a href="/chapter/drawing_on_canvas#graphics_tradeoffs">نهاية الفصل</a>، سأعود إلى المقايضات التي يجب أن تأخذها في الحسبان عند تقرير آلية الرسم الملائمة لتطبيق معين.</p>
<p>هذا مستند HTML يحتوي صورة SVG بسيطة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Normal HTML here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">&quot;http://www.w3.org/2000/svg&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">r</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">&quot;50&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;red&quot;</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">x</span>=<span class="hljs-string">&quot;120&quot;</span> <span class="hljs-attr">y</span>=<span class="hljs-string">&quot;5&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;90&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;90&quot;</span>
        <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;blue&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
</code></pre>
<p>تغيّر خاصية <code>xmlns</code> العنصر (وأبناءه) إلى <em>فضاء أسماء XML</em> مختلف. وفضاء الأسماء هذا، المُعرَّف برابط URL، يحدد اللهجة التي نتحدث بها حالياً. ووسما <code>&lt;circle&gt;</code> و<code>&lt;rect&gt;</code>، وهما غير موجودين في HTML، لهما معنى في SVG—فهما يرسمان أشكالاً بالنمط والموضع المحددين بخصائصهما.</p>
<p>تنشئ هذه الوسوم عناصر DOM، تماماً مثل وسوم HTML، يمكن للسكربتات التفاعل معها. على سبيل المثال، هذا يغيّر عنصر <code>&lt;circle&gt;</code> ليصبح لونه سماوياً بدلاً من ذلك:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> circle = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;circle&quot;</span>);
circle.<span class="hljs-title function_">setAttribute</span>(<span class="hljs-string">&quot;fill&quot;</span>, <span class="hljs-string">&quot;cyan&quot;</span>);
</code></pre>
<h2 id="عنصر-canvas">عنصر canvas</h2>
<p>يمكن رسم رسومات Canvas على عنصر <code>&lt;canvas&gt;</code>. ويمكنك إعطاء عنصر كهذا خاصيتي <code>width</code> و<code>height</code> لتحديد حجمه بالبكسلات.</p>
<p>الـ Canvas الجديد فارغ، أي أنه شفاف تماماً، ولذلك يظهر كمساحة فارغة في المستند.</p>
<p>الغرض من وسم <code>&lt;canvas&gt;</code> هو السماح بأنماط مختلفة من الرسم. وللوصول إلى واجهة رسم فعلية، نحتاج أولاً إلى إنشاء <em>سياق</em> (context)، وهو كائن توفر طرقه واجهة الرسم. وهناك حالياً ثلاثة أنماط رسم مدعومة على نطاق واسع: <code>&quot;2d&quot;</code> للرسومات ثنائية الأبعاد، و<code>&quot;webgl&quot;</code> للرسومات ثلاثية الأبعاد عبر واجهة OpenGL، و<code>&quot;webgpu&quot;</code>، وهو بديل أكثر حداثة ومرونة من WebGL.</p>
<p>لن يناقش هذا الكتاب WebGL أو WebGPU—سنلتزم بالبعدين الاثنين. لكن إن كنت مهتماً بالرسومات ثلاثية الأبعاد، فأنا أشجعك حقاً على البحث في WebGPU. فهو يوفر واجهة مباشرة إلى عتاد الرسومات ويتيح لك عرض مشاهد حتى المعقدة منها بكفاءة، باستخدام JavaScript.</p>
<p>تُنشئ سياقاً بطريقة <code>getContext</code> على عنصر <code>&lt;canvas&gt;</code> في DOM.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Before canvas.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;120&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;60&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>After canvas.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> canvas = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>);
  <span class="hljs-keyword">let</span> context = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  context.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&quot;red&quot;</span>;
  context.<span class="hljs-title function_">fillRect</span>(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">50</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>بعد إنشاء كائن السياق، يرسم المثال مستطيلاً أحمر عرضه 100 بكسل وارتفاعه 50 بكسل، وتقع زاويته العلوية اليسرى عند الإحداثيين (10, 10).</p>
<p>وكما في HTML (وSVG)، يضع نظام الإحداثيات الذي يستخدمه Canvas النقطة (0, 0) في الزاوية العلوية اليسرى، ويمتد المحور y الموجب نزولاً من هناك. وهذا يعني أن (10, 10) تقع 10 بكسلات أسفل ويمين الزاوية العلوية اليسرى.</p>
<h2 id="الخطوط-والأسطح">الخطوط والأسطح</h2>
<p>في واجهة Canvas، يمكن <em>تعبئة</em> الشكل، أي إعطاء مساحته لوناً أو نمطاً معيناً، أو يمكن <em>تحديده بخط</em>، أي رسم خط على طول حافته. ويستخدم SVG المصطلحات نفسها.</p>
<p>تعبّئ طريقة <code>fillRect</code> مستطيلاً. وهي تأخذ أولاً إحداثيي x وy للزاوية العلوية اليسرى للمستطيل، ثم عرضه، ثم ارتفاعه. وهناك طريقة مشابهة تسمى <code>strokeRect</code> ترسم محيط مستطيل.</p>
<p>لا تأخذ أي من الطريقتين معاملات إضافية. فلون التعبئة، وسماكة الخط، وما إلى ذلك، لا تحددها معطى للطريقة، كما قد تتوقع بحق، بل تحددها خصائص كائن السياق.</p>
<p>تتحكم خاصية <code>fillStyle</code> في طريقة تعبئة الأشكال. ويمكن ضبطها على نص يحدد لوناً، باستخدام تدوين الألوان الذي تستخدمه CSS.</p>
<p>وتعمل خاصية <code>strokeStyle</code> بطريقة مشابهة لكنها تحدد اللون المستخدم لخط مرسوم. أما عرض ذلك الخط فتحدده خاصية <code>lineWidth</code>، التي قد تحمل أي عدد موجب.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-property">strokeStyle</span> = <span class="hljs-string">&quot;blue&quot;</span>;
  cx.<span class="hljs-title function_">strokeRect</span>(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
  cx.<span class="hljs-property">lineWidth</span> = <span class="hljs-number">5</span>;
  cx.<span class="hljs-title function_">strokeRect</span>(<span class="hljs-number">135</span>, <span class="hljs-number">5</span>, <span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>عندما لا تُحدد خاصية <code>width</code> أو <code>height</code>، كما في المثال، يحصل عنصر Canvas على عرض افتراضي قدره 300 بكسل وارتفاع 150 بكسل.</p>
<h2 id="المسارات">المسارات</h2>
<p>المسار سلسلة من الخطوط. وتتبع واجهة Canvas ثنائية الأبعاد نهجاً غريباً في وصف مسار كهذا. فالأمر يتم بالكامل عبر تأثيرات جانبية. فالمسارات ليست قيماً يمكن تخزينها وتمريرها. بل إن أردت فعل شيء بمسار، تجري سلسلة من نداءات الطرق لوصف شكله.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = <span class="hljs-number">10</span>; y &lt; <span class="hljs-number">100</span>; y += <span class="hljs-number">10</span>) {
    cx.<span class="hljs-title function_">moveTo</span>(<span class="hljs-number">10</span>, y);
    cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">90</span>, y);
  }
  cx.<span class="hljs-title function_">stroke</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>ينشئ هذا المثال مساراً بعدد من قطع الخطوط الأفقية ثم يرسمه بخط باستخدام طريقة <code>stroke</code>. وتبدأ كل قطعة تُنشأ بـ <code>lineTo</code> من الموضع <em>الحالي</em> للمسار. وهذا الموضع هو عادة نهاية القطعة الأخيرة، ما لم تُستدعَ <code>moveTo</code>. وفي هذه الحالة، تبدأ القطعة التالية من الموضع الممرر إلى <code>moveTo</code>.</p>
<p>عند تعبئة مسار (بطريقة <code>fill</code>)، يُعبَّأ كل شكل على حدة. ويمكن للمسار أن يحتوي أشكالاً متعددة—فكل حركة <code>moveTo</code> تبدأ شكلاً جديداً. لكن المسار يحتاج إلى أن يكون <em>مغلقاً</em> (أي أن بدايته ونهايته في الموضع نفسه) قبل أن يمكن تعبئته. وإن لم يكن المسار مغلقاً بالفعل، يُضاف خط من نهايته إلى بدايته، ويُعبَّأ الشكل المحصور بالمسار المكتمل.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  cx.<span class="hljs-title function_">moveTo</span>(<span class="hljs-number">50</span>, <span class="hljs-number">10</span>);
  cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">10</span>, <span class="hljs-number">70</span>);
  cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">90</span>, <span class="hljs-number">70</span>);
  cx.<span class="hljs-title function_">fill</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يرسم هذا المثال مثلثاً معبأً. لاحظ أن ضلعين فقط من أضلاع المثلث مرسومان صراحة. أما الضلع الثالث، من الزاوية السفلية اليمنى عودة إلى القمة، فمضمون ضمنياً ولن يكون موجوداً لو رسمت المسار بخط.</p>
<p>يمكنك أيضاً استخدام طريقة <code>closePath</code> لإغلاق مسار صراحة بإضافة قطعة خط فعلية عائدة إلى بداية المسار. وهذه القطعة <em>تُرسم</em> عند رسم المسار بخط.</p>
<h2 id="المنحنيات">المنحنيات</h2>
<p>قد يحتوي المسار أيضاً على خطوط منحنية. وهذه للأسف أصعب قليلاً في الرسم.</p>
<p>ترسم طريقة <code>quadraticCurveTo</code> منحنى إلى نقطة معينة. ولتحديد انحناء الخط، تُعطى الطريقة نقطة تحكم بالإضافة إلى نقطة وجهة. تخيّل نقطة التحكم هذه وهي <em>تجذب</em> الخط، فتمنحه انحنائه. ولن يمر الخط عبر نقطة التحكم، لكن اتجاهه عند نقطتي البداية والنهاية سيكون بحيث أن خطاً مستقيماً في ذلك الاتجاه سيشير نحو نقطة التحكم. يوضح المثال التالي ذلك:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  cx.<span class="hljs-title function_">moveTo</span>(<span class="hljs-number">10</span>, <span class="hljs-number">90</span>);
  <span class="hljs-comment">// نقطة التحكم=(60, 10) نقطة الهدف=(90, 90)</span>
  cx.<span class="hljs-title function_">quadraticCurveTo</span>(<span class="hljs-number">60</span>, <span class="hljs-number">10</span>, <span class="hljs-number">90</span>, <span class="hljs-number">90</span>);
  cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">60</span>, <span class="hljs-number">10</span>);
  cx.<span class="hljs-title function_">closePath</span>();
  cx.<span class="hljs-title function_">stroke</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>نرسم منحنى تربيعياً من اليسار إلى اليمين، ونقطة التحكم فيه هي (60, 10)، ثم نرسم قطعتَي خط تمران عبر نقطة التحكم تلك وتعودان إلى بداية الخط. وتشبه النتيجة إلى حد ما شارة <em>Star Trek</em>. ويمكنك رؤية أثر نقطة التحكم: فالخطان الخارجان من الزاويتين السفليتين يبدآن في اتجاه نقطة التحكم ثم ينحنيان نحو هدفهما.</p>
<p>ترسم طريقة <code>bezierCurveTo</code> نوعاً مشابهاً من المنحنيات. وبدلاً من نقطة تحكم واحدة، لهذه الطريقة نقطتان—واحدة لكل من طرفي الخط. وهنا رسم تخطيطي مشابه لتوضيح سلوك منحنى كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  cx.<span class="hljs-title function_">moveTo</span>(<span class="hljs-number">10</span>, <span class="hljs-number">90</span>);
  <span class="hljs-comment">// نقطة التحكم1=(10, 10) نقطة التحكم2=(90, 10) الهدف=(50, 90)</span>
  cx.<span class="hljs-title function_">bezierCurveTo</span>(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">90</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>, <span class="hljs-number">90</span>);
  cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">90</span>, <span class="hljs-number">10</span>);
  cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
  cx.<span class="hljs-title function_">closePath</span>();
  cx.<span class="hljs-title function_">stroke</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تحدد نقطتا التحكم الاتجاه عند طرفي المنحنى. وكلما ابتعدتا عن النقطة المقابلة لهما، زاد «انتفاخ» المنحنى في ذلك الاتجاه.</p>
<p>قد يكون التعامل مع منحنيات كهذه صعباً—فليس واضحاً دائماً كيف تجد نقاط التحكم التي تعطي الشكل الذي تبحث عنه. أحياناً يمكنك حسابها، وأحياناً سيكون عليك فقط إيجاد قيمة مناسبة بالتجربة والخطأ.</p>
<p>طريقة <code>arc</code> وسيلة لرسم خط ينحني على طول حافة دائرة. وهي تأخذ زوجاً من الإحداثيين لمركز القوس، ونصف قطر، ثم زاوية بداية وزاوية نهاية.</p>
<p>يتيح هذان المعامَلان الأخيران رسم جزء من الدائرة فقط. وتُقاس الزوايا بالراديان، لا بالدرجات. وهذا يعني أن الدائرة الكاملة لها زاوية مقدارها 2π، أو <code>2 * Math.PI</code>، أي نحو 6.28. وتبدأ الزاوية العدّ من النقطة الواقعة إلى يمين مركز الدائرة وتتجه من هناك في اتجاه عقارب الساعة. يمكنك استخدام بداية 0 ونهاية أكبر من 2π (لنقل 7) لرسم دائرة كاملة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  <span class="hljs-comment">// المركز=(50, 50) نصف القطر=40 الزاوية من 0 إلى 7</span>
  cx.<span class="hljs-title function_">arc</span>(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>);
  <span class="hljs-comment">// المركز=(150, 50) نصف القطر=40 الزاوية من 0 إلى ½π</span>
  cx.<span class="hljs-title function_">arc</span>(<span class="hljs-number">150</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.5</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span>);
  cx.<span class="hljs-title function_">stroke</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تحتوي الصورة الناتجة على خط من يمين الدائرة الكاملة (النداء الأول لـ <code>arc</code>) إلى يمين ربع الدائرة (النداء الثاني).</p>
<p>وكغيرها من طرق رسم المسارات، يُوصل الخط المرسوم بـ <code>arc</code> بقطعة المسار السابقة. ويمكنك استدعاء <code>moveTo</code> أو بدء مسار جديد لتجنب ذلك.</p>
<h2 id="رسم-مخطط-دائري">رسم مخطط دائري</h2>
<p>تخيّل أنك حصلت للتو على وظيفة في شركة EconomiCorp, Inc. ومهمتك الأولى هي رسم مخطط دائري لنتائج استبيان رضا العملاء لديها.</p>
<p>يحتوي ارتباط <code>results</code> على مصفوفة من الكائنات تمثل ردود الاستبيان.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> results = [
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Satisfied&quot;</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">1043</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;lightblue&quot;</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Neutral&quot;</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">563</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;lightgreen&quot;</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Unsatisfied&quot;</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">510</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink&quot;</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;No comment&quot;</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">175</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;silver&quot;</span>}
];
</code></pre>
<p>لرسم مخطط دائري، نرسم عدداً من شرائح الدائرة، تتكون كل واحدة من قوس وزوج من الخطوط إلى مركز ذلك القوس. ويمكننا حساب الزاوية التي يشغلها كل قوس بقسمة دائرة كاملة (2π) على العدد الإجمالي للردود ثم ضرب ذلك الناتج (الزاوية لكل رد) في عدد الأشخاص الذين اختاروا خياراً معيناً.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;200&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;200&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">let</span> total = results
    .<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, {count}</span>) =&gt;</span> sum + count, <span class="hljs-number">0</span>);
  <span class="hljs-comment">// ابدأ من الأعلى</span>
  <span class="hljs-keyword">let</span> currentAngle = -<span class="hljs-number">0.5</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> result <span class="hljs-keyword">of</span> results) {
    <span class="hljs-keyword">let</span> sliceAngle = (result.<span class="hljs-property">count</span> / total) * <span class="hljs-number">2</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span>;
    cx.<span class="hljs-title function_">beginPath</span>();
    <span class="hljs-comment">// المركز=100,100، نصف القطر=100</span>
    <span class="hljs-comment">// من الزاوية الحالية، باتجاه عقارب الساعة بمقدار زاوية الشريحة</span>
    cx.<span class="hljs-title function_">arc</span>(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
    cx.<span class="hljs-property">fillStyle</span> = result.<span class="hljs-property">color</span>;
    cx.<span class="hljs-title function_">fill</span>();
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>لكن مخططاً لا يخبرنا ماذا تعني الشرائح ليس مفيداً كثيراً. نحتاج إلى وسيلة لرسم نص على الـ Canvas.</p>
<h2 id="النص">النص</h2>
<p>يوفر سياق الرسم ثنائي الأبعاد للـ Canvas الطريقتين <code>fillText</code> و<code>strokeText</code>. وقد تكون الأخيرة مفيدة لتحديد حدود الحروف، لكن <code>fillText</code> هي عادة ما تحتاجه. فهي تعبّئ حدود النص المعطى بـ <code>fillStyle</code> الحالية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-property">font</span> = <span class="hljs-string">&quot;28px Georgia&quot;</span>;
  cx.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&quot;fuchsia&quot;</span>;
  cx.<span class="hljs-title function_">fillText</span>(<span class="hljs-string">&quot;I can draw text, too!&quot;</span>, <span class="hljs-number">10</span>, <span class="hljs-number">50</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يمكنك تحديد حجم النص ونمطه وخطه بخاصية <code>font</code>. وهذا المثال يعطي فقط حجم خط واسم عائلة. ومن الممكن أيضاً إضافة <code>italic</code> أو <code>bold</code> إلى بداية النص لاختيار نمط.</p>
<p>يوفر المعامَلان الأخيران لـ <code>fillText</code> و<code>strokeText</code> الموضع الذي يُرسم فيه الخط. وهما يشيران افتراضياً إلى موضع بداية خط الأساس الأبجدي للنص، وهو الخط الذي «تقف» عليه الحروف، دون احتساب الأجزاء المتدلية في حروف مثل <em>j</em> أو <em>p</em>. ويمكنك تغيير الموضع الأفقي بضبط خاصية <code>textAlign</code> على <code>&quot;end&quot;</code> أو <code>&quot;center&quot;</code>، والموضع الرأسي بضبط <code>textBaseline</code> على <code>&quot;top&quot;</code> أو <code>&quot;middle&quot;</code> أو <code>&quot;bottom&quot;</code>.</p>
<p>سنعود إلى مخططنا الدائري، وإلى مشكلة وسم الشرائح، في <a href="/chapter/drawing_on_canvas#exercise_pie_chart">التمارين</a> في نهاية الفصل.</p>
<h2 id="الصور">الصور</h2>
<p>في رسومات الحاسوب، كثيراً ما يُميَّز بين الرسومات <em>المتجهة</em> (vector) والرسومات <em>النقطية</em> (bitmap). فالأولى هي ما كنا نفعله حتى الآن في هذا الفصل—تحديد صورة بإعطاء وصف منطقي للأشكال. أما الرسومات النقطية فلا تحدد أشكالاً فعلية، بل تعمل ببيانات البكسلات (شبكات نقطية من النقاط الملونة).</p>
<p>تتيح لنا طريقة <code>drawImage</code> رسم بيانات البكسلات على Canvas. ويمكن أن تأتي بيانات البكسلات هذه من عنصر <code>&lt;img&gt;</code> أو من Canvas آخر. ينشئ المثال التالي عنصر <code>&lt;img&gt;</code> منفصلاً ويحمّل ملف صورة فيه. لكن الطريقة لا تستطيع البدء في الرسم من هذه الصورة فوراً لأن المتصفح قد لا يكون قد حمّلها بعد. وللتعامل مع ذلك، نسجّل معالج حدث <code>&quot;load&quot;</code> ونجري الرسم بعد تحميل الصورة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">let</span> img = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;img&quot;</span>);
  img.<span class="hljs-property">src</span> = <span class="hljs-string">&quot;img/hat.png&quot;</span>;
  img.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = <span class="hljs-number">10</span>; x &lt; <span class="hljs-number">200</span>; x += <span class="hljs-number">30</span>) {
      cx.<span class="hljs-title function_">drawImage</span>(img, x, <span class="hljs-number">10</span>);
    }
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>افتراضياً، ترسم <code>drawImage</code> الصورة بحجمها الأصلي. ويمكنك أيضاً إعطاؤها معامَلين إضافيين لتحديد عرض الصورة المرسومة وارتفاعها، عندما لا يكونان مماثلين للصورة الأصلية.</p>
<p>عندما تُعطى <code>drawImage</code> <em>تسعة</em> معاملات، يمكن استخدامها لرسم جزء من صورة فقط. وتشير المعاملات من الثاني إلى الخامس إلى المستطيل (x وy والعرض والارتفاع) في الصورة المصدر الذي ينبغي نسخه، بينما تعطي المعاملات من السادس إلى التاسع المستطيل (على الـ Canvas) الذي ينبغي النسخ إليه.</p>
<p>يمكن استخدام هذا لحزم عدة <em>sprites</em> (عناصر صور) في ملف صورة واحد ثم رسم الجزء الذي تحتاجه فقط. على سبيل المثال، تحتوي هذه الصورة على شخصية لعبة في أوضاع متعددة:</p>
<p><img src="/images/book/player_big.png" alt="فن بكسل يظهر شخصية لعبة حاسوب في 10 أوضاع مختلفة. تشكّل الأوضاع الثمانية الأولى دورة حركة الجري، والتاسع يظهر الشخصية واقفة ساكنة، والعاشر يظهرها تقفز."></p>
<p>وبتبديل الوضع الذي نرسمه، يمكننا عرض حركة تبدو كشخصية تمشي.</p>
<p>لتحريك صورة على Canvas، تكون طريقة <code>clearRect</code> مفيدة. فهي تشبه <code>fillRect</code>، لكنها بدلاً من تلوين المستطيل تجعله شفافاً، فتزيل البكسلات المرسومة سابقاً.</p>
<p>نعلم أن كل <em>sprite</em>، أي كل صورة فرعية، عرضها 24 بكسل وارتفاعها 30 بكسل. تحمّل الشيفرة التالية الصورة ثم تُنشئ فترة زمنية (مؤقت متكرر) لرسم الإطار التالي:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">let</span> img = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;img&quot;</span>);
  img.<span class="hljs-property">src</span> = <span class="hljs-string">&quot;img/player.png&quot;</span>;
  <span class="hljs-keyword">let</span> spriteW = <span class="hljs-number">24</span>, spriteH = <span class="hljs-number">30</span>;
  img.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> cycle = <span class="hljs-number">0</span>;
    <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      cx.<span class="hljs-title function_">clearRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, spriteW, spriteH);
      cx.<span class="hljs-title function_">drawImage</span>(img,
                   <span class="hljs-comment">// المستطيل المصدر</span>
                   cycle * spriteW, <span class="hljs-number">0</span>, spriteW, spriteH,
                   <span class="hljs-comment">// المستطيل الهدف</span>
                   <span class="hljs-number">0</span>,               <span class="hljs-number">0</span>, spriteW, spriteH);
      cycle = (cycle + <span class="hljs-number">1</span>) % <span class="hljs-number">8</span>;
    }, <span class="hljs-number">120</span>);
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يتتبع ارتباط <code>cycle</code> موضعنا في الحركة. وفي كل إطار، يُزاد ثم يُقصّ عائداً إلى المدى من 0 إلى 7 باستخدام معامل باقي القسمة. ثم يُستخدم هذا الارتباط لحساب الإحداثي x الذي يقع عنده الـ sprite الخاص بالوضع الحالي في الصورة.</p>
<h2 id="التحويلات">التحويلات</h2>
<p>ماذا لو أردنا أن تمشي شخصيتنا إلى اليسار بدلاً من اليمين؟ يمكننا بالطبع رسم مجموعة أخرى من الـ sprites. لكن يمكننا أيضاً أن نأمر الـ Canvas برسم الصورة بالاتجاه المعاكس.</p>
<p>استدعاء طريقة <code>scale</code> سيجعل كل ما يُرسم بعدها محجَّماً. وتأخذ هذه الطريقة معامَلين، أحدهما لضبط مقياس أفقي والآخر لضبط مقياس رأسي.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  cx.<span class="hljs-title function_">scale</span>(<span class="hljs-number">3</span>, <span class="hljs-number">.5</span>);
  cx.<span class="hljs-title function_">beginPath</span>();
  cx.<span class="hljs-title function_">arc</span>(<span class="hljs-number">50</span>, <span class="hljs-number">50</span>, <span class="hljs-number">40</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>);
  cx.<span class="hljs-property">lineWidth</span> = <span class="hljs-number">3</span>;
  cx.<span class="hljs-title function_">stroke</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>سيؤدي التحجيم إلى تمدد كل ما يتعلق بالصورة المرسومة، بما في ذلك عرض الخط، أو انضغاطه كما هو محدد. والتحجيم بمقدار سالب سيقلب الصورة. ويحدث القلب حول النقطة (0, 0)، ما يعني أنه سيقلب أيضاً اتجاه نظام الإحداثيات. فعند تطبيق تحجيم أفقي بمقدار -1، سينتهي شكل مرسوم عند الموضع <em>x</em> 100 إلى ما كان سابقاً الموضع -100.</p>
<p>لقلب صورة، لا يمكننا ببساطة إضافة <code>cx.scale(-1, 1)</code> قبل نداء <code>drawImage</code>. فذلك سينقل صورتنا خارج الـ Canvas حيث لن تكون مرئية. ويمكننا تعديل الإحداثيين المعطيين لـ <code>drawImage</code> للتعويض عن ذلك برسم الصورة عند الموضع <em>x</em> ‏-50 بدلاً من 0. وهناك حل آخر، لا يتطلب أن تعرف الشيفرة التي تجري الرسم شيئاً عن تغيير المقياس، وهو تعديل المحور الذي يحدث التحجيم حوله.</p>
<p>توجد عدة طرق أخرى غير <code>scale</code> تؤثر في نظام إحداثيات الـ Canvas. فيمكنك تدوير الأشكال المرسومة لاحقاً بطريقة <code>rotate</code> وتحريكها بطريقة <code>translate</code>. والأمر المثير—والمربك—هو أن هذه التحويلات <em>تتراكم</em>، أي أن كل واحد منها يحدث نسبة إلى التحويلات السابقة.</p>
<p>إذا حرّكنا بمقدار 10 بكسلات أفقية مرتين، فسيُرسم كل شيء على بعد 20 بكسل إلى اليمين. وإذا نقلنا أولاً مركز نظام الإحداثيات إلى (50, 50) ثم دوّرنا بمقدار 20 درجة (نحو 0.1π راديان)، فسيحدث ذلك الدوران <em>حول</em> النقطة (50, 50).</p>
<p><img src="/images/book/transform.svg" alt="رسم تخطيطي يظهر نتيجة تراكم التحويلات. المخطط الأول ينقل ثم يدوّر، فيحدث النقل بشكل عادي ويحدث الدوران حول هدف النقل. والمخطط الثاني يدوّر أولاً ثم ينقل، فيحدث الدوران حول نقطة الأصل ويميل اتجاه النقل بفعل ذلك الدوران."></p>
<p>لكن إذا دوّرنا <em>أولاً</em> بمقدار 20 درجة ثم نقلنا بـ (50, 50)، فسيحدث النقل في نظام الإحداثيات المدوَّر، ومن ثم ينتج توجيهاً مختلفاً. فالترتيب الذي تُطبَّق به التحويلات مهم.</p>
<p>لقلب صورة حول الخط العمودي عند موضع <em>x</em> معين، يمكننا فعل ما يلي:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">flipHorizontally</span>(<span class="hljs-params">context, around</span>) {
  context.<span class="hljs-title function_">translate</span>(around, <span class="hljs-number">0</span>);
  context.<span class="hljs-title function_">scale</span>(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
  context.<span class="hljs-title function_">translate</span>(-around, <span class="hljs-number">0</span>);
}
</code></pre>
<p>ننقل المحور y إلى حيث نريد أن يكون انعكاسنا، ونطبّق الانعكاس، ثم نعيد المحور y أخيراً إلى موضعه الصحيح في الكون المنعكس. وتوضح الصورة التالية لماذا يعمل هذا:</p>
<p><img src="/images/book/mirror.svg" alt="رسم تخطيطي يوضح أثر نقل مثلث وانعكاسه"></p>
<p>يوضح هذا نظامي الإحداثيات قبل الانعكاس عبر الخط المركزي وبعده. والمثلثات مرقمة لتوضيح كل خطوة. فإذا رسمنا مثلثاً عند موضع <em>x</em> موجب، فسيكون افتراضياً في الموضع الذي يوجد فيه المثلث 1. ونداء <code>flipHorizontally</code> يجري أولاً نقلاً إلى اليمين، ما ينقلنا إلى المثلث 2. ثم يحجّم، فيقلب المثلث إلى الموضع 3. وهذا ليس حيث ينبغي أن يكون لو كان منعكساً في الخط المعطى. ونداء <code>translate</code> الثاني يصلح هذا—فهو «يلغي» النقل الأولي ويجعل المثلث 4 يظهر بالضبط حيث ينبغي.</p>
<p>يمكننا الآن رسم شخصية منعكسة عند الموضع (100, 0) بقلب العالم حول المركز الرأسي للشخصية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">let</span> img = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;img&quot;</span>);
  img.<span class="hljs-property">src</span> = <span class="hljs-string">&quot;img/player.png&quot;</span>;
  <span class="hljs-keyword">let</span> spriteW = <span class="hljs-number">24</span>, spriteH = <span class="hljs-number">30</span>;
  img.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">flipHorizontally</span>(cx, <span class="hljs-number">100</span> + spriteW / <span class="hljs-number">2</span>);
    cx.<span class="hljs-title function_">drawImage</span>(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, spriteW, spriteH,
                 <span class="hljs-number">100</span>, <span class="hljs-number">0</span>, spriteW, spriteH);
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="تخزين-التحويلات-ومحوها">تخزين التحويلات ومحوها</h2>
<p>تبقى التحويلات سارية. فكل ما نرسمه بعد رسم تلك الشخصية المنعكسة سيكون منعكساً أيضاً. وقد يكون ذلك مزعجاً.</p>
<p>من الممكن حفظ التحويل الحالي، وإجراء بعض الرسم والتحويل، ثم استعادة التحويل القديم. وهذا عادة هو التصرف السليم لدالة تحتاج إلى تحويل نظام الإحداثيات مؤقتاً. أولاً، نحفظ أي تحويل كانت الشيفرة التي استدعت الدالة تستخدمه. ثم تفعل الدالة ما تفعله، مضيفة تحويلات أخرى فوق التحويل الحالي. وأخيراً، نعود إلى التحويل الذي بدأنا به.</p>
<p>تدير الطريقتان <code>save</code> و<code>restore</code> على سياق Canvas ثنائي الأبعاد هذه التحويلات. فهما تحفظان تصورياً مكدساً من حالات التحويل. فعندما تستدعي <code>save</code>، تُدفع الحالة الحالية إلى المكدس، وعندما تستدعي <code>restore</code>، تُسحب الحالة العليا من المكدس وتُستخدم كتحويل السياق الحالي. ويمكنك أيضاً استدعاء <code>resetTransform</code> لإعادة التحويل بالكامل.</p>
<p>توضح دالة <code>branch</code> في المثال التالي ما يمكنك فعله بدالة تغيّر التحويل ثم تستدعي دالة (هي نفسها في هذه الحالة)، تواصل الرسم بالتحويل المعطى.</p>
<p>ترسم هذه الدالة شكلاً شبيهاً بالشجرة برسم خط، ونقل مركز نظام الإحداثيات إلى نهاية الخط، واستدعاء نفسها مرتين—أولاً مدوَّرة إلى اليسار ثم مدوَّرة إلى اليمين. ويقلل كل استدعاء طول الفرع المرسوم، ويتوقف التعاود عندما يهبط الطول دون 8.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;600&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">branch</span>(<span class="hljs-params">length, angle, scale</span>) {
    cx.<span class="hljs-title function_">fillRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, length);
    <span class="hljs-keyword">if</span> (length &lt; <span class="hljs-number">8</span>) <span class="hljs-keyword">return</span>;
    cx.<span class="hljs-title function_">save</span>();
    cx.<span class="hljs-title function_">translate</span>(<span class="hljs-number">0</span>, length);
    cx.<span class="hljs-title function_">rotate</span>(-angle);
    <span class="hljs-title function_">branch</span>(length * scale, angle, scale);
    cx.<span class="hljs-title function_">rotate</span>(<span class="hljs-number">2</span> * angle);
    <span class="hljs-title function_">branch</span>(length * scale, angle, scale);
    cx.<span class="hljs-title function_">restore</span>();
  }
  cx.<span class="hljs-title function_">translate</span>(<span class="hljs-number">300</span>, <span class="hljs-number">0</span>);
  <span class="hljs-title function_">branch</span>(<span class="hljs-number">60</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>لو لم يكن نداءا <code>save</code> و<code>restore</code> موجودين، لانتهى النداء التعاودي الثاني لـ <code>branch</code> بالموضع والدوران اللذين أنشأهما النداء الأول. ولكان متصلاً لا بالفرع الحالي بل بالفرع الأعمق والأقصى يميناً الذي رسمه النداء الأول. وقد يكون الشكل الناتج مثيراً أيضاً، لكنه بالتأكيد ليس شجرة.</p>
<h2 id="العودة-إلى-اللعبة">العودة إلى اللعبة</h2>
<p>نعرف الآن ما يكفي عن الرسم على Canvas للبدء في العمل على نظام عرض قائم على Canvas للعبة من <a href="/chapter/project_a_platform_game">الفصل السابق</a>. ولن يعرض نظام العرض الجديد صناديق ملونة فقط. بل سنستخدم <code>drawImage</code> لرسم صور تمثل عناصر اللعبة.</p>
<p>نعرّف نوع كائن عرض آخر يسمى <code>CanvasDisplay</code>، يدعم الواجهة نفسها التي يدعمها <code>DOMDisplay</code> من <a href="/chapter/project_a_platform_game#domdisplay">الفصل 16</a>—أي الطريقتين <code>syncState</code> و<code>clear</code>.</p>
<p>يحتفظ هذا الكائن بمعلومات أكثر قليلاً من <code>DOMDisplay</code>. فبدلاً من استخدام موضع التمرير في عنصر DOM الخاص به، يتتبع منفذ عرضه (viewport) الخاص، الذي يخبرنا أي جزء من المستوى ننظر إليه حالياً. وأخيراً، يحتفظ بخاصية <code>flipPlayer</code> بحيث تظل الشخصية، حتى وهي واقفة ساكنة، متجهة نحو الاتجاه الذي تحركت فيه آخر مرة.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CanvasDisplay</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">parent, level</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span> = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;canvas&quot;</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">600</span>, level.<span class="hljs-property">width</span> * scale);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">450</span>, level.<span class="hljs-property">height</span> * scale);
    parent.<span class="hljs-title function_">appendChild</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">flipPlayer</span> = <span class="hljs-literal">false</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span> = {
      <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">width</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span> / scale,
      <span class="hljs-attr">height</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span> / scale
    };
  }

  <span class="hljs-title function_">clear</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-title function_">remove</span>();
  }
}
</code></pre>
<p>تحسب طريقة <code>syncState</code> أولاً منفذ عرض جديداً ثم ترسم مشهد اللعبة في الموضع المناسب.</p>
<pre><code class="language-js"><span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">syncState</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateViewport</span>(state);
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">clearDisplay</span>(state.<span class="hljs-property">status</span>);
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">drawBackground</span>(state.<span class="hljs-property">level</span>);
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">drawActors</span>(state.<span class="hljs-property">actors</span>);
};
</code></pre>
<p>على عكس <code>DOMDisplay</code>، <em>يجب</em> على نمط العرض هذا إعادة رسم الخلفية في كل تحديث. ولأن الأشكال على Canvas مجرد بكسلات، فلا توجد بعد رسمها طريقة جيدة لتحريكها (أو إزالتها). والطريقة الوحيدة لتحديث عرض الـ Canvas هي محوه وإعادة رسم المشهد. وقد نكون مررنا أيضاً، ما يتطلب أن تكون الخلفية في موضع مختلف.</p>
<p>تشبه طريقة <code>updateViewport</code> طريقة <code>scrollPlayerIntoView</code> في <code>DOMDisplay</code>. فهي تتحقق مما إذا كانت الشخصية قريبة جداً من حافة الشاشة وتحرك منفذ العرض عندما يكون الأمر كذلك.</p>
<pre><code class="language-js"><span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">updateViewport</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-keyword">let</span> view = <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>, margin = view.<span class="hljs-property">width</span> / <span class="hljs-number">3</span>;
  <span class="hljs-keyword">let</span> player = state.<span class="hljs-property">player</span>;
  <span class="hljs-keyword">let</span> center = player.<span class="hljs-property">pos</span>.<span class="hljs-title function_">plus</span>(player.<span class="hljs-property">size</span>.<span class="hljs-title function_">times</span>(<span class="hljs-number">0.5</span>));

  <span class="hljs-keyword">if</span> (center.<span class="hljs-property">x</span> &lt; view.<span class="hljs-property">left</span> + margin) {
    view.<span class="hljs-property">left</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(center.<span class="hljs-property">x</span> - margin, <span class="hljs-number">0</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (center.<span class="hljs-property">x</span> &gt; view.<span class="hljs-property">left</span> + view.<span class="hljs-property">width</span> - margin) {
    view.<span class="hljs-property">left</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(center.<span class="hljs-property">x</span> + margin - view.<span class="hljs-property">width</span>,
                         state.<span class="hljs-property">level</span>.<span class="hljs-property">width</span> - view.<span class="hljs-property">width</span>);
  }
  <span class="hljs-keyword">if</span> (center.<span class="hljs-property">y</span> &lt; view.<span class="hljs-property">top</span> + margin) {
    view.<span class="hljs-property">top</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(center.<span class="hljs-property">y</span> - margin, <span class="hljs-number">0</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (center.<span class="hljs-property">y</span> &gt; view.<span class="hljs-property">top</span> + view.<span class="hljs-property">height</span> - margin) {
    view.<span class="hljs-property">top</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(center.<span class="hljs-property">y</span> + margin - view.<span class="hljs-property">height</span>,
                        state.<span class="hljs-property">level</span>.<span class="hljs-property">height</span> - view.<span class="hljs-property">height</span>);
  }
};
</code></pre>
<p>تضمن نداءات <code>Math.max</code> و<code>Math.min</code> ألا ينتهي منفذ العرض بعرض مساحة خارج المستوى. فـ <code>Math.max(x, 0)</code> يضمن ألا يكون العدد الناتج أقل من صفر. وبالمثل يضمن <code>Math.min</code> أن تظل القيمة دون حد معين.</p>
<p>عند محو العرض، سنستخدم لوناً مختلفاً قليلاً حسب ما إذا كانت اللعبة قد كُسبت (أفتح) أو خُسرت (أغمق).</p>
<pre><code class="language-js"><span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">clearDisplay</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">status</span>) {
  <span class="hljs-keyword">if</span> (status == <span class="hljs-string">&quot;won&quot;</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&quot;rgb(68, 191, 255)&quot;</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (status == <span class="hljs-string">&quot;lost&quot;</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&quot;rgb(44, 136, 214)&quot;</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&quot;rgb(52, 166, 251)&quot;</span>;
  }
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">fillRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>,
                   <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span>);
};
</code></pre>
<p>لرسم الخلفية، نمر على البلاطات المرئية في منفذ العرض الحالي، باستخدام الحيلة نفسها المستخدمة في طريقة <code>touches</code> من <a href="/chapter/project_a_platform_game#touches">الفصل السابق</a>.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> otherSprites = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;img&quot;</span>);
otherSprites.<span class="hljs-property">src</span> = <span class="hljs-string">&quot;img/sprites.png&quot;</span>;

<span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">drawBackground</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">level</span>) {
  <span class="hljs-keyword">let</span> {left, top, width, height} = <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>;
  <span class="hljs-keyword">let</span> xStart = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(left);
  <span class="hljs-keyword">let</span> xEnd = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(left + width);
  <span class="hljs-keyword">let</span> yStart = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(top);
  <span class="hljs-keyword">let</span> yEnd = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(top + height);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = yStart; y &lt; yEnd; y++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = xStart; x &lt; xEnd; x++) {
      <span class="hljs-keyword">let</span> tile = level.<span class="hljs-property">rows</span>[y][x];
      <span class="hljs-keyword">if</span> (tile == <span class="hljs-string">&quot;empty&quot;</span>) <span class="hljs-keyword">continue</span>;
      <span class="hljs-keyword">let</span> screenX = (x - left) * scale;
      <span class="hljs-keyword">let</span> screenY = (y - top) * scale;
      <span class="hljs-keyword">let</span> tileX = tile == <span class="hljs-string">&quot;lava&quot;</span> ? scale : <span class="hljs-number">0</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">drawImage</span>(otherSprites,
                        tileX,         <span class="hljs-number">0</span>, scale, scale,
                        screenX, screenY, scale, scale);
    }
  }
};
</code></pre>
<p>تُرسم البلاطات غير الفارغة بـ <code>drawImage</code>. وتحتوي صورة <code>otherSprites</code> على الصور المستخدمة لعناصر غير الشخصية. وهي تحتوي، من اليسار إلى اليمين، على بلاطة الجدار، وبلاطة الحمم، وsprite العملة.</p>
<p><img src="/images/book/sprites_big.png" alt="فن بكسل يظهر ثلاثة sprites: قطعة جدار مصنوعة من حجارة بيضاء صغيرة، ومربع من حمم برتقالية، وعملة مستديرة."></p>
<p>عرض بلاطات الخلفية 20 بكسل وارتفاعها 20 بكسل، لأننا سنستخدم المقياس نفسه المستخدم في <code>DOMDisplay</code>. وهكذا تكون الإزاحة لبلاطات الحمم 20 (قيمة ارتباط <code>scale</code>)، والإزاحة للجدران 0.</p>
<p>لا نتكبد عناء انتظار تحميل صورة الـ sprite. فاستدعاء <code>drawImage</code> بصورة لم تُحمَّل بعد لن يفعل شيئاً ببساطة. وهكذا قد نفشل في رسم اللعبة بشكل صحيح في الإطارات الأولى بينما لا تزال الصورة تُحمَّل، لكن هذه ليست مشكلة خطيرة. ولأننا نستمر في تحديث الشاشة، سيظهر المشهد الصحيح بمجرد انتهاء التحميل.</p>
<p>ستُستخدم الشخصية الماشية المعروضة سابقاً لتمثيل اللاعب. وتحتاج الشيفرة التي ترسمها إلى اختيار الـ sprite والاتجاه الصحيحين بناءً على حركة اللاعب الحالية. تحتوي الـ sprites الثمانية الأولى على حركة مشي. وعندما يتحرك اللاعب على أرضية، نتنقل بينها بناءً على الوقت الحالي. ونريد تبديل الإطارات كل 60 مللي ثانية، لذا يُقسم الوقت على 60 أولاً. وعندما يقف اللاعب ساكناً، نرسم الـ sprite التاسع. وأثناء القفزات، التي تُعرف بكون السرعة الرأسية ليست صفراً، نستخدم الـ sprite العاشر، الأقصى يميناً.</p>
<p>ولأن الـ sprites أعرض قليلاً من كائن اللاعب—24 بدلاً من 16 بكسل لإفساح بعض المساحة للقدمين والذراعين—على الطريقة أن تعدّل الإحداثي x والعرض بمقدار معين (<code>playerXOverlap</code>).</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> playerSprites = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;img&quot;</span>);
playerSprites.<span class="hljs-property">src</span> = <span class="hljs-string">&quot;img/player.png&quot;</span>;
<span class="hljs-keyword">const</span> playerXOverlap = <span class="hljs-number">4</span>;

<span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">drawPlayer</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">player, x, y,
                                              width, height</span>){
  width += playerXOverlap * <span class="hljs-number">2</span>;
  x -= playerXOverlap;
  <span class="hljs-keyword">if</span> (player.<span class="hljs-property">speed</span>.<span class="hljs-property">x</span> != <span class="hljs-number">0</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">flipPlayer</span> = player.<span class="hljs-property">speed</span>.<span class="hljs-property">x</span> &lt; <span class="hljs-number">0</span>;
  }

  <span class="hljs-keyword">let</span> tile = <span class="hljs-number">8</span>;
  <span class="hljs-keyword">if</span> (player.<span class="hljs-property">speed</span>.<span class="hljs-property">y</span> != <span class="hljs-number">0</span>) {
    tile = <span class="hljs-number">9</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (player.<span class="hljs-property">speed</span>.<span class="hljs-property">x</span> != <span class="hljs-number">0</span>) {
    tile = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">60</span>) % <span class="hljs-number">8</span>;
  }

  <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">save</span>();
  <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">flipPlayer</span>) {
    <span class="hljs-title function_">flipHorizontally</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>, x + width / <span class="hljs-number">2</span>);
  }
  <span class="hljs-keyword">let</span> tileX = tile * width;
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">drawImage</span>(playerSprites, tileX, <span class="hljs-number">0</span>, width, height,
                                   x,     y, width, height);
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">restore</span>();
};
</code></pre>
<p>تُستدعى طريقة <code>drawPlayer</code> من <code>drawActors</code>، المسؤولة عن رسم جميع الفاعلين في اللعبة.</p>
<pre><code class="language-js"><span class="hljs-title class_">CanvasDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">drawActors</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">actors</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> actor <span class="hljs-keyword">of</span> actors) {
    <span class="hljs-keyword">let</span> width = actor.<span class="hljs-property">size</span>.<span class="hljs-property">x</span> * scale;
    <span class="hljs-keyword">let</span> height = actor.<span class="hljs-property">size</span>.<span class="hljs-property">y</span> * scale;
    <span class="hljs-keyword">let</span> x = (actor.<span class="hljs-property">pos</span>.<span class="hljs-property">x</span> - <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">left</span>) * scale;
    <span class="hljs-keyword">let</span> y = (actor.<span class="hljs-property">pos</span>.<span class="hljs-property">y</span> - <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">top</span>) * scale;
    <span class="hljs-keyword">if</span> (actor.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;player&quot;</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">drawPlayer</span>(actor, x, y, width, height);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">let</span> tileX = (actor.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;coin&quot;</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">1</span>) * scale;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cx</span>.<span class="hljs-title function_">drawImage</span>(otherSprites,
                        tileX, <span class="hljs-number">0</span>, width, height,
                        x,     y, width, height);
    }
  }
};
</code></pre>
<p>عند رسم شيء ليس اللاعب، ننظر إلى نوعه لإيجاد إزاحة الـ sprite الصحيح. فبلاطة الحمم موجودة عند الإزاحة 20، وsprite العملة موجود عند 40 (اثنان مضروباً في <code>scale</code>).</p>
<p>علينا طرح موضع منفذ العرض عند حساب موضع الفاعل، لأن (0, 0) على الـ Canvas عندنا يقابل أعلى يسار منفذ العرض، لا أعلى يسار المستوى. وكان يمكننا أيضاً استخدام <code>translate</code> لهذا. وكلتا الطريقتين تعمل.</p>
<p>يدمج هذا المستند نظام العرض الجديد في <code>runGame</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
    <span class="hljs-title function_">runGame</span>(<span class="hljs-variable constant_">GAME_LEVELS</span>, <span class="hljs-title class_">CanvasDisplay</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<h2 id="اختيار-واجهة-الرسومات">اختيار واجهة الرسومات</h2>
<p>عندما تحتاج إلى توليد رسومات في المتصفح، يمكنك الاختيار بين HTML العادي وSVG وCanvas. ولا يوجد نهج واحد <em>أفضل</em> يعمل في جميع الحالات. ولكل خيار نقاط قوة ونقاط ضعف.</p>
<p>يتمتع HTML العادي بميزة البساطة. وهو أيضاً يتكامل جيداً مع النص. ويتيح كل من SVG وCanvas رسم النص، لكنهما لن يساعداك في تحديد موضع ذلك النص أو لفّه عندما يشغل أكثر من سطر. أما في صورة قائمة على HTML، فإدراج كتل من النص أسهل بكثير.</p>
<p>يمكن استخدام SVG لإنتاج رسومات واضحة تبدو جيدة عند أي مستوى تكبير. وهو، بخلاف HTML، مصمم للرسم ومن ثمّ أنسب لهذا الغرض.</p>
<p>يبني كل من SVG وHTML بنية بيانات (DOM) تمثل صورتك. وهذا يجعل من الممكن تعديل العناصر بعد رسمها. وإذا احتجت إلى تغيير جزء صغير من صورة كبيرة مراراً استجابةً لما يفعله المستخدم أو كجزء من حركة، فقد يكون فعل ذلك على Canvas مكلفاً بلا داعٍ. كما يتيح لنا DOM تسجيل معالجات أحداث الفأرة على كل عنصر في الصورة (حتى على الأشكال المرسومة بـ SVG). ولا يمكنك فعل ذلك مع Canvas.</p>
<p>لكن نهج Canvas الموجّه نحو البكسلات قد يكون ميزة عند رسم عدد ضخم من العناصر الصغيرة. وكونه لا يبني بنية بيانات بل يرسم مراراً على سطح البكسلات نفسه فقط يمنح Canvas تكلفة أقل لكل شكل. وهناك أيضاً تأثيرات لا تكون عملية إلا مع عنصر Canvas، مثل عرض مشهد بكسل واحد في كل مرة (باستخدام متتبع أشعة مثلاً) أو معالجة صورة لاحقاً بـ JavaScript (تمويهها أو تشويهها).</p>
<p>في بعض الحالات، قد ترغب في الجمع بين عدة من هذه التقنيات. على سبيل المثال، قد ترسم مخططاً بـ SVG أو Canvas لكن تعرض معلومات نصية بوضع عنصر HTML فوق الصورة.</p>
<p>بالنسبة للتطبيقات غير المتطلبة، لا يهم كثيراً فعلاً أي واجهة تختار. فالعرض الذي بنيناه للعبتنا في هذا الفصل كان يمكن تنفيذه بأي من تقنيات الرسومات الثلاث هذه، لأنه لا يحتاج إلى رسم نص، ولا التعامل مع تفاعل الفأرة، ولا العمل مع عدد ضخم بشكل استثنائي من العناصر.</p>
<h2 id="الملخص">الملخص</h2>
<p>ناقشنا في هذا الفصل تقنيات رسم الرسومات في المتصفح، مع التركيز على عنصر <code>&lt;canvas&gt;</code>.</p>
<p>تمثل عقدة Canvas مساحة في مستند يجوز لبرنامجنا الرسم عليها. ويتم هذا الرسم عبر كائن سياق رسم، يُنشأ بطريقة <code>getContext</code>.</p>
<p>تتيح لنا واجهة الرسم ثنائية الأبعاد تعبئة أشكال مختلفة وتحديدها بخط. وتحدد خاصية <code>fillStyle</code> في السياق طريقة تعبئة الأشكال. وتتحكم خاصيتا <code>strokeStyle</code> و<code>lineWidth</code> في طريقة رسم الخطوط.</p>
<p>يمكن رسم المستطيلات وقطع النص بنداء طريقة واحد. فترسم الطريقتان <code>fillRect</code> و<code>strokeRect</code> المستطيلات، وترسم الطريقتان <code>fillText</code> و<code>strokeText</code> النص. ولإنشاء أشكال مخصصة، علينا أولاً بناء مسار.</p>
<p>يبدأ استدعاء <code>beginPath</code> مساراً جديداً. وتضيف عدة طرق أخرى خطوطاً ومنحنيات إلى المسار الحالي. فيمكن لـ <code>lineTo</code> مثلاً إضافة خط مستقيم. وعند انتهاء المسار، يمكن تعبئته بطريقة <code>fill</code> أو رسمه بخط بطريقة <code>stroke</code>.</p>
<p>تُنقل البكسلات من صورة أو من Canvas آخر إلى الـ Canvas الخاص بنا بطريقة <code>drawImage</code>. وافتراضياً ترسم هذه الطريقة الصورة المصدر كاملة، لكن بإعطائها معاملات أكثر يمكنك نسخ مساحة محددة من الصورة. استخدمنا هذا في لعبتنا بنسخ أوضاع فردية لشخصية اللعبة من صورة تحتوي على العديد من هذه الأوضاع.</p>
<p>تتيح لك التحويلات رسم شكل بتوجيهات متعددة. ولسياق الرسم ثنائي الأبعاد تحويل حالي يمكن تغييره بالطرق <code>translate</code> و<code>scale</code> و<code>rotate</code>. وستؤثر هذه في جميع عمليات الرسم اللاحقة. ويمكن حفظ حالة تحويل بطريقة <code>save</code> واستعادتها بطريقة <code>restore</code>.</p>
<p>عند عرض حركة على Canvas، يمكن استخدام طريقة <code>clearRect</code> لمحو جزء من الـ Canvas قبل إعادة رسمه.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="الأشكال">الأشكال</h3>
<p>اكتب برنامجاً يرسم الأشكال التالية على Canvas:</p>
<ol>
<li>شبه منحرف (مستطيل أعرض من جهة واحدة)</li>
<li>معيّن أحمر (مستطيل مدوَّر 45 درجة أو ¼π راديان)</li>
<li>خط متعرج</li>
<li>حلزون مكوَّن من 100 قطعة خط مستقيمة</li>
<li>نجمة صفراء</li>
</ol>
<p><img src="/images/book/exercise_shapes.png" alt="صورة تظهر الأشكال المطلوب منك رسمها"></p>
<p>عند رسم الشكلين الأخيرين، قد ترغب في الرجوع إلى شرح <code>Math.cos</code> و<code>Math.sin</code> في <a href="/chapter/the_document_object_model#sin_cos">الفصل 14</a>، الذي يصف كيفية الحصول على إحداثيات على دائرة باستخدام هاتين الدالتين.</p>
<p>أوصي بإنشاء دالة لكل شكل. مرّر الموضع، واختيارياً خصائص أخرى مثل الحجم أو عدد النقاط، كمعاملات. أما البديل، وهو ترميز الأعداد مباشرة في كل مكان في شيفرتك، فيميل إلى جعل الشيفرة صعبة القراءة والتعديل بلا داعٍ.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;600&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;200&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);

  <span class="hljs-comment">// شيفرتك هنا.</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>شبه المنحرف (1) أسهل ما يُرسم باستخدام مسار. اختر إحداثيات مركز مناسبة وأضف كل زاوية من الزوايا الأربع حول المركز.</p>
<p>يمكن رسم المعيّن (2) بالطريقة المباشرة، بمسار، أو بالطريقة المثيرة، بتحويل <code>rotate</code>. لاستخدام الدوران، سيكون عليك تطبيق حيلة مشابهة لما فعلناه في دالة <code>flipHorizontally</code>. ولأنك تريد الدوران حول مركز مستطيلك لا حول النقطة (0, 0)، عليك أولاً أن تنقل (<code>translate</code>) إلى هناك، ثم تدوّر، ثم تنقل عائداً.</p>
<p>احرص على إعادة ضبط التحويل بعد رسم أي شكل يُنشئ تحويلاً.</p>
<p>بالنسبة للخط المتعرج (3)، يصبح من غير العملي كتابة نداء جديد لـ <code>lineTo</code> لكل قطعة خط. وبدلاً من ذلك، ينبغي أن تستخدم حلقة. يمكنك أن تجعل كل تكرار يرسم قطعتَي خط (يميناً ثم يساراً مرة أخرى) أو قطعة واحدة، وفي هذه الحالة عليك استخدام زوجية فهرس الحلقة (<code>% 2</code>) لتحديد ما إذا كنت ستذهب يساراً أم يميناً.</p>
<p>ستحتاج أيضاً إلى حلقة للحلزون (4). فإذا رسمت سلسلة من النقاط، مع تحرك كل نقطة أبعد على دائرة حول مركز الحلزون، حصلت على دائرة. وإذا غيّرت أثناء الحلقة نصف قطر الدائرة التي تضع عليها النقطة الحالية ودرت أكثر من دورة واحدة، فالنتيجة حلزون.</p>
<p>النجمة (5) المرسومة مبنية من خطوط <code>quadraticCurveTo</code>. ويمكنك أيضاً رسم واحدة بخطوط مستقيمة. اقسم دائرة إلى ثمانية أجزاء لنجمة بثماني نقاط، أو أي عدد من الأجزاء تريده. ارسم خطوطاً بين هذه النقاط، واجعلها تنحني نحو مركز النجمة. وبـ <code>quadraticCurveTo</code>، يمكنك استخدام المركز كنقطة تحكم.</p>
</details>
<h3 id="المخطط-الدائري">المخطط الدائري</h3>
<p><a href="/chapter/drawing_on_canvas#pie_chart">سابقاً</a> في الفصل، رأينا برنامجاً مثالياً يرسم مخططاً دائرياً. عدّل هذا البرنامج بحيث يظهر اسم كل فئة بجانب الشريحة التي تمثلها. حاول إيجاد طريقة جميلة المظهر لتحديد موضع هذا النص تلقائياً وتصلح لمجموعات بيانات أخرى أيضاً. يمكنك افتراض أن الفئات كبيرة بما يكفي لترك مساحة كافية لتسمياتها.</p>
<p>قد تحتاج إلى <code>Math.sin</code> و<code>Math.cos</code> مرة أخرى، وهما مشروحان في <a href="/chapter/the_document_object_model#sin_cos">الفصل 14</a>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;600&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">let</span> total = results
    .<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, {count}</span>) =&gt;</span> sum + count, <span class="hljs-number">0</span>);
  <span class="hljs-keyword">let</span> currentAngle = -<span class="hljs-number">0.5</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span>;
  <span class="hljs-keyword">let</span> centerX = <span class="hljs-number">300</span>, centerY = <span class="hljs-number">150</span>;

  <span class="hljs-comment">// أضف شيفرة لرسم تسميات الشرائح في هذه الحلقة.</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> result <span class="hljs-keyword">of</span> results) {
    <span class="hljs-keyword">let</span> sliceAngle = (result.<span class="hljs-property">count</span> / total) * <span class="hljs-number">2</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span>;
    cx.<span class="hljs-title function_">beginPath</span>();
    cx.<span class="hljs-title function_">arc</span>(centerX, centerY, <span class="hljs-number">100</span>,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.<span class="hljs-title function_">lineTo</span>(centerX, centerY);
    cx.<span class="hljs-property">fillStyle</span> = result.<span class="hljs-property">color</span>;
    cx.<span class="hljs-title function_">fill</span>();
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>ستحتاج إلى استدعاء <code>fillText</code> وضبط خاصيتي <code>textAlign</code> و<code>textBaseline</code> في السياق بطريقة ينتهي بها النص حيث تريده.</p>
<p>من الطرق المعقولة لتحديد موضع التسميات وضع النص على الخط المار من مركز المخطط عبر منتصف الشريحة. ولا تريد وضع النص ملاصقاً لجانب المخطط مباشرة، بل تحريك النص إلى خارج المخطط بعدد معين من البكسلات.</p>
<p>زاوية هذا الخط هي <code>currentAngle + 0.5 * sliceAngle</code>. وتعثر الشيفرة التالية على موضع على هذا الخط يبعد 120 بكسل عن المركز:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> middleAngle = currentAngle + <span class="hljs-number">0.5</span> * sliceAngle;
<span class="hljs-keyword">let</span> textX = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">cos</span>(middleAngle) * <span class="hljs-number">120</span> + centerX;
<span class="hljs-keyword">let</span> textY = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sin</span>(middleAngle) * <span class="hljs-number">120</span> + centerY;
</code></pre>
<p>بالنسبة إلى <code>textBaseline</code>، القيمة <code>&quot;middle&quot;</code> مناسبة على الأرجح عند استخدام هذا النهج. أما ما تستخدمه لـ <code>textAlign</code> فيعتمد على أي جانب من الدائرة نحن فيه. فعلى اليسار، ينبغي أن تكون <code>&quot;right&quot;</code>، وعلى اليمين، ينبغي أن تكون <code>&quot;left&quot;</code>، حتى يوضع النص بعيداً عن المخطط.</p>
<p>إن لم تكن متأكداً من كيفية معرفة أي جانب من الدائرة تقع عليه زاوية معينة، فانظر إلى شرح <code>Math.cos</code> في <a href="/chapter/the_document_object_model#sin_cos">الفصل 14</a>. فجيب تمام الزاوية يخبرنا أي إحداثي x يقابلها، وهذا بدوره يخبرنا بالضبط أي جانب من الدائرة نحن فيه.</p>
</details>
<h3 id="كرة-ترتد">كرة ترتد</h3>
<p>استخدم تقنية <code>requestAnimationFrame</code> التي رأيناها في <a href="/chapter/the_document_object_model#animationFrame">الفصل 14</a> و<a href="/chapter/project_a_platform_game#runAnimation">الفصل 16</a> لرسم صندوق فيه كرة ترتد. وتتحرك الكرة بسرعة ثابتة وترتد عن جوانب الصندوق عندما تصطدم بها.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;400&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;400&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> cx = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;canvas&quot;</span>).<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&quot;2d&quot;</span>);

  <span class="hljs-keyword">let</span> lastTime = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">frame</span>(<span class="hljs-params">time</span>) {
    <span class="hljs-keyword">if</span> (lastTime != <span class="hljs-literal">null</span>) {
      <span class="hljs-title function_">updateAnimation</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">100</span>, time - lastTime) / <span class="hljs-number">1000</span>);
    }
    lastTime = time;
    <span class="hljs-title function_">requestAnimationFrame</span>(frame);
  }
  <span class="hljs-title function_">requestAnimationFrame</span>(frame);

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">updateAnimation</span>(<span class="hljs-params">step</span>) {
    <span class="hljs-comment">// شيفرتك هنا.</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>الصندوق سهل الرسم بـ <code>strokeRect</code>. عرّف ارتباطاً يحمل حجمه، أو عرّف ارتباطين إن اختلف عرض صندوقك وارتفاعه. لإنشاء كرة مستديرة، ابدأ مساراً واستدعِ <code>arc(x, y, radius, 0, 7)</code>، ما يُنشئ قوساً يمتد من صفر إلى أكثر من دائرة كاملة. ثم عبّئ المسار.</p>
<p>لنمذجة موضع الكرة وسرعتها، يمكنك استخدام صنف <code>Vec</code> من <a href="/chapter/project_a_platform_game#vector">الفصل 16</a> (وهو متاح في هذه الصفحة). أعطه سرعة ابتدائية، ويُفضّل ألا تكون رأسية أو أفقية بحتة، وفي كل إطار اضرب تلك السرعة في مقدار الوقت المنقضي. وعندما تقترب الكرة كثيراً من جدار رأسي، اعكس المركّبة <em>x</em> في سرعتها. وبالمثل، اعكس المركّبة <em>y</em> عندما تصطدم بجدار أفقي.</p>
<p>بعد إيجاد موضع الكرة الجديد وسرعتها، استخدم <code>clearRect</code> لحذف المشهد وإعادة رسمه بالموضع الجديد.</p>
</details>
<h3 id="انعكاس-محسوب-مسبقا">انعكاس محسوب مسبقاً</h3>
<p>من الأمور المؤسفة في التحويلات أنها تبطئ رسم الصور النقطية. فيجب تحويل موضع كل بكسل وحجمه، ورغم أنه ممكن أن تصبح المتصفحات أذكى في التعامل مع التحويل مستقبلاً، فإنها تسبب حالياً زيادة قابلة للقياس في الوقت الذي يستغرقه رسم صورة نقطية.</p>
<p>في لعبة مثل لعبتنا، حيث نرسم sprite واحداً محوَّلاً فقط، لا تمثل هذه مشكلة. لكن تخيّل أننا نحتاج إلى رسم مئات الشخصيات أو آلاف الجسيمات الدوارة من انفجار.</p>
<p>فكّر في طريقة لرسم شخصية مقلوبة دون تحميل ملفات صور إضافية ودون الاضطرار إلى إجراء نداءات <code>drawImage</code> محوَّلة في كل إطار.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>مفتاح الحل هو حقيقة أننا نستطيع استخدام عنصر Canvas كصورة مصدر عند استخدام <code>drawImage</code>. فمن الممكن إنشاء عنصر <code>&lt;canvas&gt;</code> إضافي، دون إضافته إلى المستند، ورسم spritesنا المقلوبة عليه، مرة واحدة. وعند رسم إطار فعلي، ننسخ ببساطة الـ sprites المقلوبة مسبقاً إلى الـ Canvas الرئيسي.</p>
<p>سيلزم بعض الحرص لأن الصور لا تُحمَّل فوراً. فنحن نجري الرسم المقلوب مرة واحدة فقط، وإذا أجريناه قبل تحميل الصورة فلن يرسم شيئاً. ويمكن استخدام معالج <code>&quot;load&quot;</code> على الصورة لرسم الصور المقلوبة على الـ Canvas الإضافي. وهذا الـ Canvas يمكن استخدامه كمصدر رسم فوراً (سيكون فارغاً ببساطة حتى نرسم الشخصية عليه).</p>
</details>
`,t={number:"17",slug:s,title:a,englishTitle:n,headings:l,html:p};export{t as default,n as englishTitle,l as headings,p as html,e as number,s as slug,a as title};
