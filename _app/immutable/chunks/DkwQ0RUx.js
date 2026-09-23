const c="05",s="higher_order_functions",n="الدوال ذات الرتبة الأعلى",a="Higher-order Functions",l=[{depth:2,id:"التجريد",text:"التجريد"},{depth:2,id:"تجريد-التكرار",text:"تجريد التكرار"},{depth:2,id:"الدوال-ذات-رتبة-أعلى",text:"الدوال ذات رتبة أعلى"},{depth:2,id:"مجموعة-بيانات-الكتابات",text:"مجموعة بيانات الكتابات"},{depth:2,id:"تصفية-المصفوفات",text:"تصفية المصفوفات"},{depth:2,id:"التحويل-باستخدام-map",text:"التحويل باستخدام map"},{depth:2,id:"التلخيص-باستخدام-reduce",text:"التلخيص باستخدام reduce"},{depth:2,id:"قابلية-التركيب",text:"قابلية التركيب"},{depth:2,id:"النصوص-ورموز-المحارف",text:"النصوص ورموز المحارف"},{depth:2,id:"التعرف-على-النصوص",text:"التعرّف على النصوص"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"التسطيح",text:"التسطيح"},{depth:3,id:"حلقتك-الخاصة",text:"حلقتك الخاصة"},{depth:3,id:"كل-شيء",text:"كل شيء"},{depth:3,id:"اتجاه-الكتابة-السائد",text:"اتجاه الكتابة السائد"}],p=`<blockquote>
<p>هناك طريقتان لبناء تصميم برمجي: إحداهما أن تجعله بسيطاً بحيث لا تكون فيه عيوب ظاهرة، والأخرى أن تجعله معقداً بحيث لا تكون فيه عيوب واضحة.</p>
<p>— C.A.R. Hoare، محاضرة جائزة تورينغ من ACM عام 1980</p>
</blockquote>
<p><img src="/images/book/chapter_picture_5.jpg" alt="رسم توضيحي يظهر حروفاً وهيروغليفية من كتابات مختلفة — اللاتينية واليونانية والعربية والمصرية القديمة وغيرها"></p>
<p>البرنامج الكبير برنامج مكلف، وليس فقط بسبب الوقت الذي يستغرقه بناؤه. فالحجم ينطوي دائماً تقريباً على تعقيد، والتعقيد يربك المبرمجين. والمبرمجون المرتبكون بدورهم يُدخلون أخطاء (<em>عللاً</em>) في البرامج. عندئذ يوفر البرنامج الكبير مساحة كبيرة تختبئ فيها هذه العلل، مما يجعل العثور عليها صعباً.</p>
<p>لنعد بإيجاز إلى آخر برنامجين مثالين في المقدمة. الأول قائم بذاته وطوله ستة أسطر.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>, count = <span class="hljs-number">1</span>;
<span class="hljs-keyword">while</span> (count &lt;= <span class="hljs-number">10</span>) {
  total += count;
  count += <span class="hljs-number">1</span>;
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(total);
</code></pre>
<p>أما الثاني فيعتمد على دالتين خارجيتين وطوله سطر واحد.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">sum</span>(<span class="hljs-title function_">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>)));
</code></pre>
<p>أيّهما أكثر احتمالاً لاحتوائه على علّة؟</p>
<p>إذا حسبنا حجم تعريفَي <code>sum</code> و<code>range</code>، فالبرنامج الثاني كبير أيضاً — بل أكبر من الأول. لكنني مع ذلك أزعم أنه أكثر احتمالاً لأن يكون صحيحاً.</p>
<p>يعود ذلك إلى أن الحل معبَّر عنه بمفردات تقابل المشكلة التي نحلها. فجمع مدى من الأعداد لا علاقة له بالحلقات والعدادات، بل يتعلق بالمدايات والمجاميع.</p>
<p>ستظل تعريفات هذه المفردات (الدالتان <code>sum</code> و<code>range</code>) تنطوي على حلقات وعدادات وتفاصيل عارضة أخرى. لكن لأنها تعبّر عن مفاهيم أبسط من البرنامج ككل، فمن الأسهل إتقانها.</p>
<h2 id="التجريد">التجريد</h2>
<p>في سياق البرمجة، تُسمى هذه الأنواع من المفردات عادة <em>تجريدات</em> (abstractions). فالتجريدات تمنحنا القدرة على الحديث عن المشكلات في مستوى أعلى (أو أكثر تجريداً)، دون أن تشتتنا تفاصيل غير مهمة.</p>
<p>وعلى سبيل المقارنة، قارن وصفتَي شوربة البازلاء هاتين. الأولى تقول:</p>
<blockquote>
<p>ضع كوباً واحداً من البازلاء المجففة لكل شخص في وعاء. أضف الماء حتى تغمر البازلاء جيداً. اترك البازلاء في الماء 12 ساعة على الأقل. أخرج البازلاء من الماء وضعها في قدر للطهي. أضف 4 أكواب من الماء لكل شخص. غطِّ القدر واترك البازلاء تغلي على نار هادئة لمدة ساعتين. خذ نصف بصلة لكل شخص. قطّعها إلى قطع بسكين. أضفها إلى البازلاء. خذ عود كرفس لكل شخص. قطّعه إلى قطع بسكين. أضفه إلى البازلاء. خذ جزرة لكل شخص. قطّعها إلى قطع. بسكين! أضفها إلى البازلاء. اطبخ 10 دقائق أخرى.</p>
</blockquote>
<p>وهذه هي الوصفة الثانية:</p>
<blockquote>
<p>لكل شخص: كوب من البازلاء المجففة المنقسمة، و4 أكواب من الماء، ونصف بصلة مفرومة، وعود كرفس، وجزرة.
انقع البازلاء 12 ساعة. اغلِها على نار هادئة ساعتين. افرم الخضروات وأضفها. اطبخ 10 دقائق أخرى.</p>
</blockquote>
<p>الوصفة الثانية أقصر وأسهل تفسيراً. لكنك تحتاج إلى فهم بضع كلمات إضافية متعلقة بالطهي مثل <em>انقع</em> و<em>اغلِ على نار هادئة</em> و<em>افرم</em>، وأظن أيضاً <em>خضروات</em>.</p>
<p>عند البرمجة، لا يمكننا الاعتماد على أن كل الكلمات التي نحتاجها تنتظرنا في القاموس. لذلك قد نقع في نمط الوصفة الأولى — نحدد الخطوات الدقيقة التي على الحاسوب تنفيذها، واحدة تلو الأخرى، عمياً عن المفاهيم الأعلى التي تعبّر عنها.</p>
<p>من المهارات المفيدة في البرمجة أن تلاحظ عندما تعمل في مستوى تجريد منخفض جداً.</p>
<h2 id="تجريد-التكرار">تجريد التكرار</h2>
<p>الدوال العادية، كما رأيناها حتى الآن، طريقة جيدة لبناء التجريدات. لكنها تقصر أحياناً.</p>
<p>من الشائع أن يفعل البرنامج شيئاً عدداً معيناً من المرات. يمكنك كتابة حلقة <code>for</code> لذلك، هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);
}
</code></pre>
<p>هل يمكننا تجريد «فعل شيء ما <em>N</em> مرة» في صورة دالة؟ حسناً، من السهل كتابة دالة تستدعي <code>console.log</code> عدد <em>N</em> من المرات.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">repeatLog</span>(<span class="hljs-params">n</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);
  }
}
</code></pre>
<p>لكن ماذا لو أردنا فعل شيء غير تسجيل الأعداد؟ بما أن «فعل شيء ما» يمكن تمثيله بدالة، والدوال مجرد قيم، يمكننا تمرير فعلنا كقيمة دالة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">repeat</span>(<span class="hljs-params">n, action</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
    <span class="hljs-title function_">action</span>(i);
  }
}

<span class="hljs-title function_">repeat</span>(<span class="hljs-number">3</span>, <span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-comment">// → 0</span>
<span class="hljs-comment">// → 1</span>
<span class="hljs-comment">// → 2</span>
</code></pre>
<p>لا يلزم تمرير دالة معرَّفة مسبقاً إلى <code>repeat</code>. غالباً ما يكون إنشاء قيمة دالة في الحال أسهل بدلاً من ذلك.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> labels = [];
<span class="hljs-title function_">repeat</span>(<span class="hljs-number">5</span>, <span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> {
  labels.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`Unit <span class="hljs-subst">\${i + <span class="hljs-number">1</span>}</span>\`</span>);
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(labels);
<span class="hljs-comment">// → [&quot;Unit 1&quot;, &quot;Unit 2&quot;, &quot;Unit 3&quot;, &quot;Unit 4&quot;, &quot;Unit 5&quot;]</span>
</code></pre>
<p>هذا مبني قليلاً مثل حلقة <code>for</code> — فهو يصف أولاً نوع الحلقة ثم يقدم جسمها. لكن الجسم الآن مكتوب كقيمة دالة، ملفوفة بين قوسي الاستدعاء إلى <code>repeat</code>. لهذا يجب إغلاقه بالقوس المعقوف الختامي <em>و</em> القوس الهلالي الختامي. وفي حالات كهذا المثال، حيث يكون الجسم تعبيراً صغيراً واحداً، يمكنك أيضاً حذف الأقواس المعقوفة وكتابة الحلقة في سطر واحد.</p>
<h2 id="الدوال-ذات-رتبة-أعلى">الدوال ذات رتبة أعلى</h2>
<p>الدوال التي تعمل على دوال أخرى، إما بأخذها كمعطيات أو بإرجاعها، تُسمى <em>دوالاً ذات رتبة أعلى</em> (higher-order functions). وبما أننا رأينا بالفعل أن الدوال قيم عادية، فلا شيء لافتاً بشكل خاص في وجود مثل هذه الدوال. المصطلح قادم من الرياضيات، حيث يُؤخذ التمييز بين الدوال وغيرها من القيم على محمل الجد أكثر.</p>
<p>تسمح لنا الدوال ذات رتبة أعلى بالتجريد فوق <em>الأفعال</em>، لا القيم فقط. وهي تأتي في عدة صور. مثلاً، يمكن أن تكون لدينا دوال تُنشئ دوال جديدة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">greaterThan</span>(<span class="hljs-params">n</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> m &gt; n;
}
<span class="hljs-keyword">let</span> greaterThan10 = <span class="hljs-title function_">greaterThan</span>(<span class="hljs-number">10</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">greaterThan10</span>(<span class="hljs-number">11</span>));
<span class="hljs-comment">// → true</span>
</code></pre>
<p>ويمكن أيضاً أن تكون لدينا دوال تغيّر دوال أخرى.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">noisy</span>(<span class="hljs-params">f</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;calling with&quot;</span>, args);
    <span class="hljs-keyword">let</span> result = <span class="hljs-title function_">f</span>(...args);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;called with&quot;</span>, args, <span class="hljs-string">&quot;, returned&quot;</span>, result);
    <span class="hljs-keyword">return</span> result;
  };
}
<span class="hljs-title function_">noisy</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-property">min</span>)(<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>);
<span class="hljs-comment">// → calling with [3, 2, 1]</span>
<span class="hljs-comment">// → called with [3, 2, 1] , returned 1</span>
</code></pre>
<p>ويمكننا حتى كتابة دوال توفر أنواعاً جديدة من تدفق التحكم.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">unless</span>(<span class="hljs-params">test, then</span>) {
  <span class="hljs-keyword">if</span> (!test) <span class="hljs-title function_">then</span>();
}

<span class="hljs-title function_">repeat</span>(<span class="hljs-number">3</span>, <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
  <span class="hljs-title function_">unless</span>(n % <span class="hljs-number">2</span> == <span class="hljs-number">1</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(n, <span class="hljs-string">&quot;is even&quot;</span>);
  });
});
<span class="hljs-comment">// → 0 is even</span>
<span class="hljs-comment">// → 2 is even</span>
</code></pre>
<p>ثمة طريقة مدمجة في المصفوفات، <code>forEach</code>، توفر شيئاً مثل حلقة <code>for</code>/<code>of</code> في صورة دالة ذات رتبة أعلى.</p>
<pre><code class="language-js">[<span class="hljs-string">&quot;A&quot;</span>, <span class="hljs-string">&quot;B&quot;</span>].<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">l</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(l));
<span class="hljs-comment">// → A</span>
<span class="hljs-comment">// → B</span>
</code></pre>
<h2 id="مجموعة-بيانات-الكتابات">مجموعة بيانات الكتابات</h2>
<p>من المجالات التي تتألق فيها الدوال ذات رتبة أعلى معالجة البيانات. ولمعالجة البيانات، سنحتاج إلى بعض البيانات المثال الفعلية. سيستخدم هذا الفصل مجموعة بيانات عن الكتابات — أنظمة كتابة مثل اللاتينية والسيريلية والعربية.</p>
<p>أتذكر Unicode، النظام الذي يخصص عدداً لكل حرف في اللغة المكتوبة، من <a href="/chapter/values_types_and_operators#unicode">الفصل الأول</a>؟ معظم هذه الحروف مرتبطة بكتابة معينة. يحتوي المعيار على 140 كتابة مختلفة، منها 81 ما تزال مستخدمة اليوم و59 تاريخية.</p>
<p>رغم أنني لا أقرأ بطلاقة سوى الحروف اللاتينية، فأنا أقدّر حقيقة أن الناس يكتبون نصوصاً بما لا يقل عن 80 نظام كتابة آخر، كثير منها لن أتعرف عليه حتى. مثلاً، هذه عيّنة من الكتابة اليدوية بالتاميلية:</p>
<p><img src="/images/book/tamil.png" alt="سطر من الشعر بخط التاميلية اليدوي. الحروف بسيطة نسبياً ومفصولة بعناية، لكنها مختلفة تماماً عن اللاتينية."></p>
<p>تحتوي مجموعة البيانات المثال على بعض المعلومات عن الكتابات الـ140 المعرَّفة في Unicode. وهي متاحة في <a href="https://eloquentjavascript.net/code#5">بيئة التجربة</a> لهذا الفصل باسم الارتباط <code>SCRIPTS</code>. يحتوي الارتباط على مصفوفة من الكائنات، يصف كل منها كتابة.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  name<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Coptic&quot;</span><span class="hljs-punctuation">,</span>
  ranges<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">994</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1008</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">[</span><span class="hljs-number">11392</span><span class="hljs-punctuation">,</span> <span class="hljs-number">11508</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">[</span><span class="hljs-number">11513</span><span class="hljs-punctuation">,</span> <span class="hljs-number">11520</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  direction<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ltr&quot;</span><span class="hljs-punctuation">,</span>
  year<span class="hljs-punctuation">:</span> <span class="hljs-number">-200</span><span class="hljs-punctuation">,</span>
  living<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  link<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://en.wikipedia.org/wiki/Coptic_alphabet&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يخبرنا مثل هذا الكائن باسم الكتابة، ونطاقات Unicode المخصصة لها، والاتجاه الذي تُكتب به، وزمن نشوئها (التقريبي)، وما إذا كانت ما تزال مستخدمة، ورابطاً لمزيد من المعلومات. وقد يكون الاتجاه <code>&quot;ltr&quot;</code> من اليسار إلى اليمين، أو <code>&quot;rtl&quot;</code> من اليمين إلى اليسار (كما تُكتب النصوص العربية والعبرية)، أو <code>&quot;ttb&quot;</code> من الأعلى إلى الأسفل (كما في الكتابة المنغولية).</p>
<p>تحتوي خاصية <code>ranges</code> على مصفوفة من نطاقات محارف Unicode، كل منها مصفوفة من عنصرين تضم حداً أدنى وحداً أعلى. ويُخصص أي رمز حرف يقع ضمن هذه النطاقات للكتابة. الحد الأدنى شامل (الرمز 994 حرف قبطي) والحد الأعلى غير شامل (الرمز 1008 ليس كذلك).</p>
<h2 id="تصفية-المصفوفات">تصفية المصفوفات</h2>
<p>إذا أردنا العثور على الكتابات التي ما تزال مستخدمة في مجموعة البيانات، فقد تكون الدالة التالية مفيدة. فهي تستبعد العناصر التي لا تجتاز اختباراً في مصفوفة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">filter</span>(<span class="hljs-params">array, test</span>) {
  <span class="hljs-keyword">let</span> passed = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> element <span class="hljs-keyword">of</span> array) {
    <span class="hljs-keyword">if</span> (<span class="hljs-title function_">test</span>(element)) {
      passed.<span class="hljs-title function_">push</span>(element);
    }
  }
  <span class="hljs-keyword">return</span> passed;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">filter</span>(<span class="hljs-variable constant_">SCRIPTS</span>, <span class="hljs-function"><span class="hljs-params">script</span> =&gt;</span> script.<span class="hljs-property">living</span>));
<span class="hljs-comment">// → [{name: &quot;Adlam&quot;, …}, …]</span>
</code></pre>
<p>تستخدم الدالة المعطى المسمى <code>test</code>، وهو قيمة دالة، لملء «فجوة» في الحساب — عملية تحديد العناصر التي يجب جمعها.</p>
<p>لاحظ كيف تبني دالة <code>filter</code>، بدلاً من حذف عناصر من المصفوفة القائمة، مصفوفة جديدة لا تحتوي إلا العناصر التي تجتاز الاختبار. هذه الدالة <em>نقية</em>، فهي لا تعدّل المصفوفة المعطاة لها.</p>
<p>مثل <code>forEach</code>، فإن <code>filter</code> طريقة قياسية في المصفوفات. عرّف المثال الدالة فقط لنبيّن ما تفعله داخلياً. ومن الآن فصاعداً، سنستخدمها هكذا بدلاً من ذلك:</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable constant_">SCRIPTS</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">direction</span> == <span class="hljs-string">&quot;ttb&quot;</span>));
<span class="hljs-comment">// → [{name: &quot;Mongolian&quot;, …}, …]</span>
</code></pre>
<h2 id="التحويل-باستخدام-map">التحويل باستخدام map</h2>
<p>لنفترض أن لدينا مصفوفة من الكائنات تمثل كتابات، ناتجة عن تصفية مصفوفة <code>SCRIPTS</code> بطريقة ما. نريد بدلاً منها مصفوفة من الأسماء، لأن فحصها أسهل.</p>
<p>تحوّل طريقة <code>map</code> مصفوفة بتطبيق دالة على جميع عناصرها وبناء مصفوفة جديدة من القيم المُرجَعة. سيكون طول المصفوفة الجديدة مساوياً لطول المصفوفة المدخلة، لكن محتواها سيكون قد <em>قُوبل</em> إلى صورة جديدة بواسطة الدالة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">map</span>(<span class="hljs-params">array, transform</span>) {
  <span class="hljs-keyword">let</span> mapped = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> element <span class="hljs-keyword">of</span> array) {
    mapped.<span class="hljs-title function_">push</span>(<span class="hljs-title function_">transform</span>(element));
  }
  <span class="hljs-keyword">return</span> mapped;
}

<span class="hljs-keyword">let</span> rtlScripts = <span class="hljs-variable constant_">SCRIPTS</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">direction</span> == <span class="hljs-string">&quot;rtl&quot;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">map</span>(rtlScripts, <span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">name</span>));
<span class="hljs-comment">// → [&quot;Adlam&quot;, &quot;Arabic&quot;, &quot;Imperial Aramaic&quot;, …]</span>
</code></pre>
<p>مثل <code>forEach</code> و<code>filter</code>، فإن <code>map</code> طريقة قياسية في المصفوفات.</p>
<h2 id="التلخيص-باستخدام-reduce">التلخيص باستخدام reduce</h2>
<p>من الأمور الشائعة الأخرى مع المصفوفات حساب قيمة واحدة منها. ومثالنا المتكرر، جمع مجموعة من الأعداد، حالة من هذا. ومثال آخر هو إيجاد الكتابة التي تضم أكبر عدد من الحروف.</p>
<p>تُسمى العملية ذات الرتبة الأعلى التي تمثل هذا النمط <em>reduce</em> (وتسمى أحياناً أيضاً <em>fold</em>). وهي تبني قيمة بأخذ عنصر واحد من المصفوفة مراراً ودمجه مع القيمة الحالية. عند جمع الأعداد، ستبدأ بالعدد صفر، ولكل عنصر تضيفه إلى المجموع.</p>
<p>وسائط <code>reduce</code>، عدا المصفوفة، هي دالة دمج وقيمة بداية. هذه الدالة أقل بساطة بقليل من <code>filter</code> و<code>map</code>، فألقِ عليها نظرة فاحصة:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">reduce</span>(<span class="hljs-params">array, combine, start</span>) {
  <span class="hljs-keyword">let</span> current = start;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> element <span class="hljs-keyword">of</span> array) {
    current = <span class="hljs-title function_">combine</span>(current, element);
  }
  <span class="hljs-keyword">return</span> current;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">reduce</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>));
<span class="hljs-comment">// → 10</span>
</code></pre>
<p>طريقة المصفوفات القياسية <code>reduce</code>، التي تقابل هذه الدالة بالطبع، لها ميزة إضافية. إذا كانت مصفوفتك تحتوي على عنصر واحد على الأقل، يُسمح لك بحذف المعطى <code>start</code>. ستأخذ الطريقة العنصر الأول من المصفوفة كقيمة بداية وتبدأ التقليل من العنصر الثاني.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b));
<span class="hljs-comment">// → 10</span>
</code></pre>
<p>لاستخدام <code>reduce</code> (مرتين) لإيجاد الكتابة التي تضم أكبر عدد من الحروف، يمكننا كتابة شيء مثل هذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">characterCount</span>(<span class="hljs-params">script</span>) {
  <span class="hljs-keyword">return</span> script.<span class="hljs-property">ranges</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">count, [<span class="hljs-keyword">from</span>, to]</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> count + (to - <span class="hljs-keyword">from</span>);
  }, <span class="hljs-number">0</span>);
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable constant_">SCRIPTS</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">characterCount</span>(a) &lt; <span class="hljs-title function_">characterCount</span>(b) ? b : a;
}));
<span class="hljs-comment">// → {name: &quot;Han&quot;, …}</span>
</code></pre>
<p>تختصر دالة <code>characterCount</code> النطاقات المخصصة لكتابة بجمع أحجامها. لاحظ استخدام التفكيك (destructuring) في قائمة وسائط دالة التقليل. ثم تستخدم ندوة <code>reduce</code> الثانية هذا لإيجاد أكبر كتابة بمقارنة كتابتين مراراً وإرجاع الأكبر.</p>
<p>الكتابة الهانية (Han) مخصص لها أكثر من 89,000 حرف في معيار Unicode، مما يجعلها أكبر نظام كتابة في مجموعة البيانات بفارق كبير. والهانية كتابة تُستخدم أحياناً للنصوص الصينية واليابانية والكورية. تتشارك هذه اللغات كثيراً من الحروف، وإن كانت تميل إلى كتابتها بشكل مختلف. قررت جمعية Unicode (المقرّة في الولايات المتحدة) التعامل معها كنظام كتابة واحد لتوفير رموز الحروف. ويسمى هذا <em>توحيد الهانية</em> (Han unification)، وما يزال يغضب بعض الناس كثيراً.</p>
<h2 id="قابلية-التركيب">قابلية التركيب</h2>
<p>تأمل كيف كنا سنكتب المثال السابق (إيجاد أكبر كتابة) بدون الدوال ذات رتبة أعلى. الشيفرة ليست أسوأ بكثير.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> biggest = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> script <span class="hljs-keyword">of</span> <span class="hljs-variable constant_">SCRIPTS</span>) {
  <span class="hljs-keyword">if</span> (biggest == <span class="hljs-literal">null</span> ||
      <span class="hljs-title function_">characterCount</span>(biggest) &lt; <span class="hljs-title function_">characterCount</span>(script)) {
    biggest = script;
  }
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(biggest);
<span class="hljs-comment">// → {name: &quot;Han&quot;, …}</span>
</code></pre>
<p>ثمة ارتباطات إضافية قليلة، والبرنامج أطول بأربعة أسطر، لكنه ما يزال مقروءاً جداً.</p>
<p>تتألق التجريدات التي توفرها هذه الدوال حقاً عندما تحتاج إلى <em>تركيب</em> عمليات. ومثالاً على ذلك، لنكتب شيفرة تجد متوسط سنة النشوء للكتابات الحية والميتة في مجموعة البيانات.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">average</span>(<span class="hljs-params">array</span>) {
  <span class="hljs-keyword">return</span> array.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b) / array.<span class="hljs-property">length</span>;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(<span class="hljs-title function_">average</span>(
  <span class="hljs-variable constant_">SCRIPTS</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">living</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">year</span>))));
<span class="hljs-comment">// → 1165</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(<span class="hljs-title function_">average</span>(
  <span class="hljs-variable constant_">SCRIPTS</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> !s.<span class="hljs-property">living</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.<span class="hljs-property">year</span>))));
<span class="hljs-comment">// → 204</span>
</code></pre>
<p>كما ترى، الكتابات الميتة في Unicode أقدم في المتوسط من الحية. هذه إحصاءة ليست ذات مغزى كبير ولا مفاجئة. لكنني آمل أن توافق على أن الشيفرة المستخدمة لحسابها ليست صعبة القراءة. يمكنك رؤيتها كخط أنابيب: نبدأ بجميع الكتابات، ونستبعد الحية (أو الميتة)، ونأخذ السنوات منها، ونحسب متوسطها، ونقرب النتيجة.</p>
<p>يمكنك بالتأكيد أيضاً كتابة هذا الحساب كحلقة واحدة كبيرة.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>, count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> script <span class="hljs-keyword">of</span> <span class="hljs-variable constant_">SCRIPTS</span>) {
  <span class="hljs-keyword">if</span> (script.<span class="hljs-property">living</span>) {
    total += script.<span class="hljs-property">year</span>;
    count += <span class="hljs-number">1</span>;
  }
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(total / count));
<span class="hljs-comment">// → 1165</span>
</code></pre>
<p>لكن من الأصعب رؤية ما الذي كان يُحسب وكيف. ولأن النتائج الوسيطة لا تُمثَّل كقيم متماسكة، فسيكون استخلاص شيء مثل <code>average</code> في دالة منفصلة عملاً أكبر بكثير.</p>
<p>ومن حيث ما يفعله الحاسوب فعلاً، فإن المقاربتين مختلفتان أيضاً اختلافاً كبيراً. الأولى تبني مصفوفات جديدة عند تشغيل <code>filter</code> و<code>map</code>، بينما الثانية تحسب بعض الأعداد فقط، فتبذل عملاً أقل. ويمكنك عادة تحمّل المقاربة المقروءة، لكن إن كنت تعالج مصفوفات ضخمة وتفعل ذلك مرات كثيرة، فقد يستحق النمط الأقل تجريداً سرعته الإضافية.</p>
<h2 id="النصوص-ورموز-المحارف">النصوص ورموز المحارف</h2>
<p>من الاستخدامات المثيرة لهذه المجموعة تحديد الكتابة التي يستخدمها نص ما. لنستعرض برنامجاً يفعل ذلك.</p>
<p>تذكّر أن لكل كتابة مصفوفة من نطاقات رموز المحارف المرتبطة بها. وبإعطائنا رمز محرف، يمكننا استخدام دالة كهذه لإيجاد الكتابة المقابلة (إن وُجدت):</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">characterScript</span>(<span class="hljs-params">code</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> script <span class="hljs-keyword">of</span> <span class="hljs-variable constant_">SCRIPTS</span>) {
    <span class="hljs-keyword">if</span> (script.<span class="hljs-property">ranges</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">[<span class="hljs-keyword">from</span>, to]</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> code &gt;= <span class="hljs-keyword">from</span> &amp;&amp; code &lt; to;
    })) {
      <span class="hljs-keyword">return</span> script;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">characterScript</span>(<span class="hljs-number">121</span>));
<span class="hljs-comment">// → {name: &quot;Latin&quot;, …}</span>
</code></pre>
<p>طريقة <code>some</code> دالة ذات رتبة أعلى أخرى. تأخذ دالة اختبار وتخبرك ما إذا كانت تلك الدالة تُرجع true لأي من عناصر المصفوفة.</p>
<p>لكن كيف نحصل على رموز المحارف في نص؟</p>
<p>ذكرت في <a href="/chapter/values_types_and_operators">الفصل الأول</a> أن نصوص JavaScript مُرمَّزة كتسلسل من أعداد 16-بت. وتسمى هذه <em>وحدات الرموز</em> (code units). كان من المفترض في البداية أن يتسع رمز حرف Unicode لوحدة كهذه (وهذا يمنحك ما يزيد قليلاً على 65,000 حرف). وعندما اتضح أن ذلك لن يكون كافياً، تردد كثيرون من الحاجة إلى استخدام ذاكرة أكبر لكل حرف. ولمعالجة هذه المخاوف، اخترع UTF-16، وهو الترميز الذي تستخدمه نصوص JavaScript أيضاً. يصف معظم الحروف الشائعة بوحدة رموز واحدة من 16 بت، لكنه يستخدم زوجاً من وحدتين لحروف أخرى.</p>
<p>يُعتبر UTF-16 عموماً فكرة سيئة اليوم. يبدو كأنه مصمم عن قصد تقريباً ليدعو إلى الأخطاء. فمن السهل كتابة برامج تتظاهر بأن وحدات الرموز والحروف شيء واحد. وإن كانت لغتك لا تستخدم حروفاً من وحدتين، فسيبدو ذلك عاملاً بشكل جيد. لكن بمجرد أن يحاول أحدهم استخدام مثل هذا البرنامج مع بعض الحروف الصينية الأقل شيوعاً، ينكسر. ولحسن الحظ، مع ظهور الإيموجي، بدأ الجميع باستخدام حروف من وحدتين، فصار عبء التعامل مع هذه المشكلات موزعاً بعدالة أكبر.</p>
<p>لسوء الحظ، فإن العمليات البديهية على نصوص JavaScript، مثل الحصول على طولها عبر خاصية <code>length</code> والوصول إلى محتواها باستخدام الأقواس المربعة، تتعامل مع وحدات الرموز فقط.</p>
<pre><code class="language-js"><span class="hljs-comment">// حرفان إيموجي: حصان وحذاء</span>
<span class="hljs-keyword">let</span> horseShoe = <span class="hljs-string">&quot;🐴👟&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(horseShoe.<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 4</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(horseShoe[<span class="hljs-number">0</span>]);
<span class="hljs-comment">// → (نصف حرف غير صالح)</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(horseShoe.<span class="hljs-title function_">charCodeAt</span>(<span class="hljs-number">0</span>));
<span class="hljs-comment">// → 55357 (رمز نصف الحرف)</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(horseShoe.<span class="hljs-title function_">codePointAt</span>(<span class="hljs-number">0</span>));
<span class="hljs-comment">// → 128052 (الرمز الفعلي لإيموجي الحصان)</span>
</code></pre>
<p>تمنحك طريقة <code>charCodeAt</code> في JavaScript وحدة رموز، لا رمز حرف كاملاً. أما طريقة <code>codePointAt</code>، التي أُضيفت لاحقاً، فتمنحك حرف Unicode كاملاً، فيمكننا استخدامها للحصول على الحروف من نص. لكن المعطى الممرر إلى <code>codePointAt</code> ما يزال فهرساً في تسلسل وحدات الرموز. وللطواف على جميع الحروف في نص، سنظل بحاجة إلى التعامل مع مسألة ما إذا كان الحرف يشغل وحدة رموز واحدة أو وحدتين.</p>
<p>ذكرت في <a href="/chapter/data_structures_objects_and_arrays#for_of_loop">الفصل السابق</a> أنه يمكن استخدام حلقة <code>for</code>/<code>of</code> على النصوص أيضاً. ومثل <code>codePointAt</code>، أُدخل هذا النوع من الحلقات في وقت كان الناس فيه مدركين إدراكاً حاداً لمشكلات UTF-16. وعندما تستخدمها للطواف على نص، فإنها تعطيك حروفاً حقيقية، لا وحدات رموز.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> roseDragon = <span class="hljs-string">&quot;🌹🐉&quot;</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> char <span class="hljs-keyword">of</span> roseDragon) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(char);
}
<span class="hljs-comment">// → 🌹</span>
<span class="hljs-comment">// → 🐉</span>
</code></pre>
<p>وإذا كان لديك حرف (وهو نص من وحدة رموز واحدة أو وحدتين)، فيمكنك استخدام <code>codePointAt(0)</code> للحصول على رمزه.</p>
<h2 id="التعرف-على-النصوص">التعرّف على النصوص</h2>
<p>لدينا دالة <code>characterScript</code> وطريقة للطواف على الحروف بشكل صحيح. الخطوة التالية هي عدّ الحروف التي تنتمي إلى كل كتابة. وسيكون التجريد التالي للعدّ مفيداً هنا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">countBy</span>(<span class="hljs-params">items, groupName</span>) {
  <span class="hljs-keyword">let</span> counts = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> items) {
    <span class="hljs-keyword">let</span> name = <span class="hljs-title function_">groupName</span>(item);
    <span class="hljs-keyword">let</span> known = counts.<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c.<span class="hljs-property">name</span> == name);
    <span class="hljs-keyword">if</span> (!known) {
      counts.<span class="hljs-title function_">push</span>({name, <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>});
    } <span class="hljs-keyword">else</span> {
      known.<span class="hljs-property">count</span>++;
    }
  }
  <span class="hljs-keyword">return</span> counts;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">countBy</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &gt; <span class="hljs-number">2</span>));
<span class="hljs-comment">// → [{name: false, count: 2}, {name: true, count: 3}]</span>
</code></pre>
<p>تتوقع دالة <code>countBy</code> مجموعة (أي شيء يمكننا الطواف عليه بـ<code>for</code>/<code>of</code>) ودالة تحسب اسم مجموعة لعنصر معطى. وتُرجع مصفوفة من الكائنات، يسمي كل منها مجموعة ويخبرك بعدد العناصر التي وُجدت في تلك المجموعة.</p>
<p>وهي تستخدم طريقة أخرى للمصفوفات، <code>find</code>، التي تطوف على عناصر المصفوفة وتُرجع أول عنصر تُرجع فيه دالة القيمة true. وتُرجع <code>undefined</code> عندما لا تجد مثل هذا العنصر.</p>
<p>باستخدام <code>countBy</code>، يمكننا كتابة الدالة التي تخبرنا بالكتابات المستخدمة في نص ما.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">textScripts</span>(<span class="hljs-params">text</span>) {
  <span class="hljs-keyword">let</span> scripts = <span class="hljs-title function_">countBy</span>(text, <span class="hljs-function"><span class="hljs-params">char</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> script = <span class="hljs-title function_">characterScript</span>(char.<span class="hljs-title function_">codePointAt</span>(<span class="hljs-number">0</span>));
    <span class="hljs-keyword">return</span> script ? script.<span class="hljs-property">name</span> : <span class="hljs-string">&quot;none&quot;</span>;
  }).<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">{name}</span>) =&gt;</span> name != <span class="hljs-string">&quot;none&quot;</span>);

  <span class="hljs-keyword">let</span> total = scripts.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">n, {count}</span>) =&gt;</span> n + count, <span class="hljs-number">0</span>);
  <span class="hljs-keyword">if</span> (total == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;No scripts found&quot;</span>;

  <span class="hljs-keyword">return</span> scripts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">{name, count}</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.round(count * <span class="hljs-number">100</span> / total)}</span>% <span class="hljs-subst">\${name}</span>\`</span>;
  }).<span class="hljs-title function_">join</span>(<span class="hljs-string">&quot;, &quot;</span>);
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">textScripts</span>(<span class="hljs-string">&#x27;英国的狗说&quot;woof&quot;, 俄罗斯的狗说&quot;тяв&quot;&#x27;</span>));
<span class="hljs-comment">// → 61% Han, 22% Latin, 17% Cyrillic</span>
</code></pre>
<p>تعدّ الدالة أولاً الحروف بالاسم، باستخدام <code>characterScript</code> لتخصيص اسم لها والرجوع إلى النص <code>&quot;none&quot;</code> للحروف التي ليست جزءاً من أي كتابة. ويُسقط استدعاء <code>filter</code> مدخلة <code>&quot;none&quot;</code> من المصفوفة الناتجة، لأننا غير مهتمين بهذه الحروف.</p>
<p>ولكي نتمكن من حساب النسب المئوية، نحتاج أولاً إلى العدد الإجمالي للحروف التي تنتمي إلى كتابة، ويمكننا حسابه بـ<code>reduce</code>. وإذا لم نجد مثل هذه الحروف، تُرجع الدالة نصاً محدداً. وإلا، فتحوّل مدخلات العدّ إلى نصوص مقروءة بـ<code>map</code> ثم تدمجها بـ<code>join</code>.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>القدرة على تمرير قيم الدوال إلى دوال أخرى جانب مفيد للغاية في JavaScript. فهي تتيح لنا كتابة دوال تمثل حسابات فيها «فجوات». ويمكن للشيفرة التي تستدعي هذه الدوال أن تملأ الفجوات بتقديم قيم دوال.</p>
<p>توفر المصفوفات عدداً من الطرق المفيدة ذات رتبة أعلى. يمكنك استخدام <code>forEach</code> للطواف على عناصر مصفوفة. وتُرجع طريقة <code>filter</code> مصفوفة جديدة تحتوي فقط العناصر التي تجتاز دالة الإسناد (predicate). ويمكنك تحويل مصفوفة بإمرار كل عنصر عبر دالة باستخدام <code>map</code>. ويمكنك استخدام <code>reduce</code> لدمج جميع عناصر مصفوفة في قيمة واحدة. وتختبر طريقة <code>some</code> ما إذا كان أي عنصر يطابق دالة إسناد معطاة، بينما يجد <code>find</code> أول عنصر يطابق إسناداً.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="التسطيح">التسطيح</h3>
<p>استخدم طريقة <code>reduce</code> مع طريقة <code>concat</code> لـ«تسوية» مصفوفة من المصفوفات في مصفوفة واحدة تضم جميع عناصر المصفوفات الأصلية.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> arrays = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">6</span>]];
<span class="hljs-comment">// شيفرتك هنا.</span>
<span class="hljs-comment">// → [1, 2, 3, 4, 5, 6]</span>
</code></pre>
<h3 id="حلقتك-الخاصة">حلقتك الخاصة</h3>
<p>اكتب دالة ذات رتبة أعلى <code>loop</code> توفر شيئاً مثل جملة حلقة <code>for</code>. ينبغي أن تأخذ قيمة، ودالة اختبار، ودالة تحديث، ودالة جسم. وفي كل تكرار، ينبغي أن تشغّل أولاً دالة الاختبار على قيمة الحلقة الحالية وتتوقف إن أرجعت <code>false</code>. ثم تستدعي دالة الجسم، معطيةً إياها القيمة الحالية، وأخيراً تستدعي دالة التحديث لإنشاء قيمة جديدة والبدء من البداية.</p>
<p>عند تعريف الدالة، يمكنك استخدام حلقة عادية للقيام بالطواف الفعلي.</p>
<pre><code class="language-js"><span class="hljs-comment">// شيفرتك هنا.</span>

<span class="hljs-title function_">loop</span>(<span class="hljs-number">3</span>, <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &gt; <span class="hljs-number">0</span>, <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n - <span class="hljs-number">1</span>, <span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-comment">// → 3</span>
<span class="hljs-comment">// → 2</span>
<span class="hljs-comment">// → 1</span>
</code></pre>
<h3 id="كل-شيء">كل شيء</h3>
<p>للمصفوفات أيضاً طريقة <code>every</code> مماثلة لطريقة <code>some</code>. وتُرجع هذه الطريقة <code>true</code> عندما تُرجع الدالة المعطاة <code>true</code> لكل عنصر في المصفوفة. وبطريقة ما، <code>some</code> نسخة من المعامل <code>||</code> تعمل على المصفوفات، و<code>every</code> مثل المعامل <code>&amp;&amp;</code>.</p>
<p>نفّذ <code>every</code> كدالة تأخذ مصفوفة ودالة إسناد كوسيطين. واكتب نسختين، واحدة باستخدام حلقة وأخرى باستخدام طريقة <code>some</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">every</span>(<span class="hljs-params">array, test</span>) {
  <span class="hljs-comment">// شيفرتك هنا.</span>
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">every</span>([<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>], <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &lt; <span class="hljs-number">10</span>));
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">every</span>([<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">16</span>], <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &lt; <span class="hljs-number">10</span>));
<span class="hljs-comment">// → false</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">every</span>([], <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> n &lt; <span class="hljs-number">10</span>));
<span class="hljs-comment">// → true</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>مثل المعامل <code>&amp;&amp;</code>، يمكن لطريقة <code>every</code> أن تتوقف عن تقييم عناصر أخرى بمجرد أن تجد عنصراً لا يطابق. لذا يمكن للنسخة القائمة على الحلقة أن تقفز خارج الحلقة — بـ<code>break</code> أو <code>return</code> — بمجرد أن تصادف عنصراً تُرجع فيه دالة الإسناد <code>false</code>. وإذا وصلت الحلقة إلى نهايتها دون العثور على مثل هذا العنصر، علمنا أن جميع العناصر طابقت وينبغي أن نُرجع <code>true</code>.</p>
<p>ولبناء <code>every</code> فوق <code>some</code>، يمكننا تطبيق <em>قوانين دي مورغان</em>، التي تنص على أن <code>a &amp;&amp; b</code> تساوي <code>!(!a || !b)</code>. ويمكن تعميم ذلك على المصفوفات، حيث تطابق جميع العناصر في المصفوفة إذا لم يكن فيها عنصر لا يطابق.</p>
</details>
<h3 id="اتجاه-الكتابة-السائد">اتجاه الكتابة السائد</h3>
<p>اكتب دالة تحسب اتجاه الكتابة السائد في نص. تذكّر أن لكل كائن كتابة خاصية <code>direction</code> يمكن أن تكون <code>&quot;ltr&quot;</code> (من اليسار إلى اليمين)، أو <code>&quot;rtl&quot;</code> (من اليمين إلى اليسار)، أو <code>&quot;ttb&quot;</code> (من الأعلى إلى الأسفل).</p>
<p>الاتجاه السائد هو اتجاه أغلبية الحروف المرتبطة بكتابة. ومن المحتمل أن تكون دالتا <code>characterScript</code> و<code>countBy</code> المعرَّفتان سابقاً في الفصل مفيدتين هنا.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">dominantDirection</span>(<span class="hljs-params">text</span>) {
  <span class="hljs-comment">// شيفرتك هنا.</span>
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">dominantDirection</span>(<span class="hljs-string">&quot;Hello!&quot;</span>));
<span class="hljs-comment">// → ltr</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">dominantDirection</span>(<span class="hljs-string">&quot;Hey, مساء الخير&quot;</span>));
<span class="hljs-comment">// → rtl</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>قد يشبه حلك كثيراً النصف الأول من مثال <code>textScripts</code>. فعليك مجدداً عدّ الحروف وفق معيار قائم على <code>characterScript</code> ثم استبعاد الجزء من النتيجة الذي يشير إلى حروف غير مهمة (بلا كتابة).</p>
<p>ويمكن إيجاد الاتجاه ذي أكبر عدد من الحروف بـ<code>reduce</code>. وإن لم يتضح كيف، فارجع إلى المثال السابق في الفصل، حيث استُخدم <code>reduce</code> لإيجاد الكتابة التي تضم أكبر عدد من الحروف.</p>
</details>
`,e={number:"05",slug:s,title:n,englishTitle:a,headings:l,html:p};export{e as default,a as englishTitle,l as headings,p as html,c as number,s as slug,n as title};
