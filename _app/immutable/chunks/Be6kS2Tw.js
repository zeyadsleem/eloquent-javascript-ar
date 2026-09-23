const e="11",s="asynchronous_programming",n="البرمجة غير المتزامنة",a="Asynchronous Programming",l=[{depth:2,id:"اللاتزامنية",text:"اللاتزامنية"},{depth:2,id:"دوال-رد-النداء",text:"دوال رد النداء"},{depth:2,id:"الوعود",text:"الوعود"},{depth:2,id:"الفشل",text:"الفشل"},{depth:2,id:"كارلا",text:"كارلا"},{depth:2,id:"الاختراق",text:"الاختراق"},{depth:2,id:"دوال-async",text:"دوال async"},{depth:2,id:"الدوال-المولدة",text:"الدوال المولّدة"},{depth:2,id:"مشروع-فني-غرابي",text:"مشروع فني غرابي"},{depth:2,id:"حلقة-الأحداث",text:"حلقة الأحداث"},{depth:2,id:"العلل-غير-المتزامنة",text:"العلل غير المتزامنة"},{depth:2,id:"الملخص",text:"الملخص"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"أوقات-الهدوء",text:"أوقات الهدوء"},{depth:3,id:"وعود-حقيقية",text:"وعود حقيقية"},{depth:3,id:"بناء-promiseall",text:"بناء Promise.all"}],p=`<blockquote>
<p>من يستطيع الانتظار بهدوء حتى يترسّب الطين؟
من يستطيع أن يبقى ساكناً حتى لحظة الفعل؟</p>
<p>— لاو تزو، تاو تي تشينغ</p>
</blockquote>
<p><img src="/images/book/chapter_picture_11.jpg" alt="رسم توضيحي يُظهر غرابين على غصن شجرة"></p>
<p>الجزء المركزي من الحاسوب، الجزء الذي ينفّذ الخطوات الفردية التي تتكوّن منها برامجنا، يُسمى <em>المعالج</em> (processor). والبرامج التي رأيناها حتى الآن تُبقي المعالج مشغولاً حتى تنتهي من عملها. وتعتمد السرعة التي يمكن بها تنفيذ شيء مثل حلقة تتعامل مع الأعداد اعتماداً شبه كامل على سرعة معالج الحاسوب وذاكرته.</p>
<p>لكن برامج كثيرة تتفاعل مع أشياء خارج المعالج. فقد تتواصل مثلاً عبر شبكة حاسوبية أو تطلب بيانات من القرص الصلب — وهو أبطأ بكثير من جلبها من الذاكرة.</p>
<p>عندما يحدث شيء كهذا، يكون من المؤسف أن نترك المعالج عاطلاً — فقد تكون هناك أعمال أخرى يستطيع إنجازها في غضون ذلك. ويتولى نظام التشغيل معالجة هذا جزئياً، إذ يبدّل المعالج بين عدة برامج قيد التشغيل. لكن ذلك لا يفيد عندما نريد لبرنامج <em>واحد</em> أن يواصل التقدّم وهو ينتظر طلباً عبر الشبكة.</p>
<h2 id="اللاتزامنية">اللاتزامنية</h2>
<p>في نموذج البرمجة <em>المتزامنة</em> (synchronous)، تحدث الأشياء واحداً تلو الآخر. فعندما تستدعي دالة تنفّذ إجراءً طويل الأمد، لا ترجع إلا بعد انتهاء الإجراء وتمكّنها من إرجاع النتيجة. وهذا يوقف برنامجك طوال المدة التي يستغرقها الإجراء.</p>
<p>أما النموذج <em>غير المتزامن</em> (asynchronous) فيسمح بحدوث أشياء متعددة في الوقت نفسه. فعندما تبدأ إجراءً، يواصل برنامجك العمل. وعندما ينتهي الإجراء، يُبلَّغ البرنامج ويتاح له الوصول إلى النتيجة (مثل البيانات المقروءة من القرص).</p>
<p>يمكننا مقارنة البرمجة المتزامنة وغير المتزامنة بمثال صغير: برنامج يجري طلبين عبر الشبكة ثم يجمع نتيجتيهما.</p>
<p>في بيئة متزامنة، حيث لا ترجع دالة الطلب إلا بعد إنجاز عملها، أسهل طريقة لأداء هذه المهمة هي إجراء الطلبين الواحد تلو الآخر. ويعيب هذا أن الطلب الثاني لن يبدأ إلا بعد انتهاء الأول. وسيكون الوقت الإجمالي المستغرق على الأقل مجموع زمني الاستجابة.</p>
<p>الحل لهذه المشكلة، في نظام متزامن، هو بدء خيوط تحكّم إضافية. و<em>الخيط</em> (thread) برنامج آخر قيد التشغيل قد يتشابك تنفيذه مع برامج أخرى بفعل نظام التشغيل — ولأن معظم الحواسيب الحديثة تحتوي على معالجات متعددة، فقد تعمل خيوط متعددة بل في الوقت نفسه، على معالجات مختلفة. ويمكن لخيط ثانٍ أن يبدأ الطلب الثاني، ثم ينتظر الخيطان معاً عودة نتيجتيهما، وبعدها يعيدان التزامن لدمج نتيجتيهما.</p>
<p>في المخطط التالي، تمثّل الخطوط السميكة الوقت الذي يقضيه البرنامج في العمل بشكل طبيعي، وتمثّل الخطوط الرقيقة الوقت المقضي في انتظار الشبكة. في النموذج المتزامن، يكون الزمن الذي تستغرقه الشبكة <em>جزءاً</em> من الخط الزمني لخيط تحكّم معيّن. أما في النموذج غير المتزامن، فإن بدء إجراء شبكي يسمح للبرنامج بمواصلة العمل بينما يجري التواصل الشبكي إلى جانبه، مع إبلاغ البرنامج عند انتهائه.</p>
<p><img src="/images/book/control-io.svg" alt="مخطط يُظهر مسار التحكّم في البرامج المتزامنة وغير المتزامنة. يُظهر الجزء الأول برنامجاً متزامناً، حيث تحدث مرحلتا النشاط والانتظار في البرنامج على خط واحد متسلسل. ويُظهر الجزء الثاني برنامجاً متزامناً متعدد الخيوط، بخطين متوازيين تحدث عليهما مرحلتا الانتظار جنباً إلى جنب، ما يجعل البرنامج ينتهي أسرع. ويُظهر الجزء الأخير برنامجاً غير متزامن، تتفرّع فيه الإجراءات غير المتزامنة المتعددة من البرنامج الرئيسي، الذي يتوقف عند نقطة ما، ثم يستأنف كلما انتهى أول شيء كان ينتظره."></p>
<p>وثمة طريقة أخرى لوصف الفرق: أن انتظار انتهاء الإجراءات <em>ضمني</em> في النموذج المتزامن، بينما هو <em>صريح</em> — تحت سيطرتنا — في النموذج غير المتزامن.</p>
<p>واللاتزامنية سلاح ذو حدّين. فهي تسهّل التعبير عن البرامج التي لا تناسب نموذج التحكّم المستقيم، لكنها قد تجعل التعبير عن البرامج التي تتبع خطاً مستقيماً أكثر إرباكاً. وسنرى بعض الطرق لتقليل هذا الإرباك لاحقاً في هذا الفصل.</p>
<p>تجعل كلتا منصّتَي برمجة JavaScript البارزتين — المتصفحات وNode.js — العمليات التي قد تستغرق وقتاً غير متزامنة، بدلاً من الاعتماد على الخيوط. ولأن البرمجة بالخيوط صعبة بشكل مشهود (ففهم ما يفعله البرنامج يصبح أصعب بكثير عندما يفعل أشياء متعددة في وقت واحد)، يُعدّ هذا عموماً أمراً جيداً.</p>
<h2 id="دوال-رد-النداء">دوال رد النداء</h2>
<p>من مقاربات البرمجة غير المتزامنة أن تجعل الدوال التي تحتاج إلى انتظار شيء ما تأخذ معطى إضافياً هو <em>دالة رد النداء</em> (callback function). فالدالة غير المتزامنة تبدأ عملية، وترتّب الأمور بحيث تُستدعى دالة رد النداء عند انتهاء العملية، ثم ترجع.</p>
<p>ومن الأمثلة على ذلك الدالة <code>setTimeout</code>، المتاحة في Node.js وفي المتصفحات معاً، وهي تنتظر عدداً معطىً من المللي ثانية ثم تستدعي دالة.</p>
<pre><code class="language-js"><span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Tick&quot;</span>), <span class="hljs-number">500</span>);
</code></pre>
<p>ليس الانتظار عموماً عملاً مهماً، لكنه قد يكون مفيداً جداً عندما تحتاج إلى ترتيب حدوث شيء في وقت معيّن أو التحقق مما إذا كان إجراء ما يستغرق وقتاً أطول من المتوقع.</p>
<p>ومن الأمثلة الأخرى على عملية غير متزامنة شائعة قراءة ملف من وحدة تخزين الجهاز. تخيّل أن لديك دالة <code>readTextFile</code> تقرأ محتوى ملف كنص وتمرّره إلى دالة رد نداء.</p>
<pre><code class="language-js"><span class="hljs-title function_">readTextFile</span>(<span class="hljs-string">&quot;shopping_list.txt&quot;</span>, <span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Shopping List:\\n<span class="hljs-subst">\${content}</span>\`</span>);
});
<span class="hljs-comment">// → Shopping List:</span>
<span class="hljs-comment">// → Peanut butter</span>
<span class="hljs-comment">// → Bananas</span>
</code></pre>
<p>الدالة <code>readTextFile</code> ليست جزءاً من JavaScript القياسية. وسنرى كيفية قراءة الملفات في المتصفح وفي Node.js في فصول لاحقة.</p>
<p>تنفيذ عدة إجراءات غير متزامنة على التوالي باستخدام دوال رد النداء يعني أن عليك مواصلة تمرير دوال جديدة للتعامل مع استمرار الحساب بعد هذه الإجراءات. والدالة غير المتزامنة التي تقارن ملفين وتُنتج قيمة منطقية تشير إلى ما إذا كان محتواهما متطابقاً قد تبدو هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">compareFiles</span>(<span class="hljs-params">fileA, fileB, callback</span>) {
  <span class="hljs-title function_">readTextFile</span>(fileA, <span class="hljs-function"><span class="hljs-params">contentA</span> =&gt;</span> {
    <span class="hljs-title function_">readTextFile</span>(fileB, <span class="hljs-function"><span class="hljs-params">contentB</span> =&gt;</span> {
      <span class="hljs-title function_">callback</span>(contentA == contentB);
    });
  });
}
</code></pre>
<p>هذا الأسلوب من البرمجة قابل للعمل، لكن مستوى الإزاحة يزداد مع كل إجراء غير متزامن لأنك تنتهي داخل دالة أخرى. وقد يصبح فعل أشياء أكثر تعقيداً، مثل تغليف الإجراءات غير المتزامنة في حلقة، مربكاً.</p>
<p>واللاتزامنية <em>معدية</em> على نحو ما. فأي دالة تستدعي دالة تعمل بشكل غير متزامن يجب أن تكون هي نفسها غير متزامنة، باستخدام دالة رد نداء أو آلية مشابهة لتسليم نتيجتها. واستدعاء دالة رد نداء أعقد قليلاً وأكثر عرضة للأخطاء من مجرد إرجاع قيمة، لذا فالحاجة إلى بناء أجزاء كبيرة من برنامجك بهذه الطريقة ليست بالأمر الجيد.</p>
<h2 id="الوعود">الوعود</h2>
<p>ثمة طريقة مختلفة قليلاً لبناء برنامج غير متزامن، وهي أن تُرجع الدوال غير المتزامنة كائناً يمثّل نتيجتها (المستقبلية) بدلاً من تمرير دوال رد نداء. وبهذه الطريقة، تُرجع هذه الدوال فعلاً شيئاً ذا معنى، ويصبح شكل البرنامج أقرب إلى شكل البرامج المتزامنة.</p>
<p>وهذا هو الغرض من الصنف القياسي <code>Promise</code>. فالوعد (promise) إيصال يمثّل قيمة قد لا تكون متاحة بعد. وهو يوفّر طريقة <code>then</code> تتيح لك تسجيل دالة ينبغي استدعاؤها عند انتهاء الإجراء الذي ينتظره. وعندما <em>يُحلّ</em> الوعد (resolved)، أي تصبح قيمته متاحة، تُستدعى هذه الدوال (وقد تكون متعددة) بقيمة النتيجة. ومن الممكن استدعاء <code>then</code> على وعد حُلّ بالفعل — وستُستدعى دالتك رغم ذلك.</p>
<p>وأسهل طريقة لإنشاء وعد هي استدعاء <code>Promise.resolve</code>. تضمن هذه الدالة أن القيمة التي تعطيها إياها ملفوفة في وعد. فإن كانت القيمة وعداً بالفعل، أُعيدت كما هي. وإلا حصلت على وعد جديد يُحلّ فوراً بقيمتك كنتيجة له.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> fifteen = <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-number">15</span>);
fifteen.<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Got <span class="hljs-subst">\${value}</span>\`</span>));
<span class="hljs-comment">// → Got 15</span>
</code></pre>
<p>ولإنشاء وعد لا يُحلّ فوراً، يمكنك استخدام <code>Promise</code> كبانية. ولها واجهة غريبة بعض الشيء: إذ تتوقع البانية دالة كمعطى، تستدعيها فوراً وتمرّر إليها دالة يمكنها استخدامها لحلّ الوعد.</p>
<p>وعلى سبيل المثال، هكذا يمكنك إنشاء واجهة قائمة على الوعود للدالة <code>readTextFile</code>:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">textFile</span>(<span class="hljs-params">filename</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-title function_">readTextFile</span>(filename, <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> <span class="hljs-title function_">resolve</span>(text));
  });
}

<span class="hljs-title function_">textFile</span>(<span class="hljs-string">&quot;plans.txt&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
</code></pre>
<p>لاحظ كيف أن هذه الدالة غير المتزامنة، خلافاً للدوال بأسلوب رد النداء، تُرجع قيمة ذات معنى — وعداً بأن يعطيك محتويات الملف في وقت ما في المستقبل.</p>
<p>من الأمور المفيدة في طريقة <code>then</code> أنها هي نفسها تُرجع وعداً آخر. وهذا الوعد يُحلّ إلى القيمة التي أرجعتها دالة رد النداء، أو، إن كانت القيمة المُرجَعة وعداً، إلى القيمة التي يُحلّ إليها ذلك الوعد. وهكذا يمكنك «تسلسل» استدعاءات متعددة لـ<code>then</code> لبناء سلسلة من الإجراءات غير المتزامنة.</p>
<p>هذه الدالة، التي تقرأ ملفاً مليئاً بأسماء ملفات وتُرجع محتوى ملف عشوائي من تلك القائمة، تُظهر هذا النوع من خط أنابيب الوعود غير المتزامن:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">randomFile</span>(<span class="hljs-params">listFile</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">textFile</span>(listFile)
    .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> content.<span class="hljs-title function_">trim</span>().<span class="hljs-title function_">split</span>(<span class="hljs-string">&quot;\\n&quot;</span>))
    .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">ls</span> =&gt;</span> ls[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * ls.<span class="hljs-property">length</span>)])
    .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">filename</span> =&gt;</span> <span class="hljs-title function_">textFile</span>(filename));
}
</code></pre>
<p>تُرجع الدالة نتيجة سلسلة استدعاءات <code>then</code> هذه. الوعد الأولي يجلب قائمة الملفات كنص. ويحوّل استدعاء <code>then</code> الأول ذلك النص إلى مصفوفة من الأسطر، منتجاً وعداً جديداً. ويختار استدعاء <code>then</code> الثاني سطراً عشوائياً منها، منتجاً وعداً ثالثاً يُنتج اسم ملف واحد. ويقرأ استدعاء <code>then</code> الأخير هذا الملف، فتكون نتيجة الدالة ككل وعداً يُرجع محتوى ملف عشوائي.</p>
<p>في هذه الشيفرة، تُرجع الدالتان المستخدمتان في استدعاءَي <code>then</code> الأولين قيمة عادية ستُمرَّر فوراً إلى الوعد الذي يُرجعه <code>then</code> عندما ترجع الدالة. أما استدعاء <code>then</code> الأخير فيُرجع وعداً (<code>textFile(filename)</code>) مما يجعله خطوة غير متزامنة حقيقية.</p>
<p>كان من الممكن أيضاً تنفيذ كل هذه الخطوات داخل دالة رد نداء واحدة لـ<code>then</code>، لأن الخطوة الأخيرة وحدها غير متزامنة فعلاً. لكن هذا النوع من أغلفة <code>then</code> التي لا تفعل سوى بعض التحويل المتزامن للبيانات مفيد غالباً، كما حين تريد إرجاع وعد يُنتج نسخة معالَجة من نتيجة غير متزامنة ما.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">jsonFile</span>(<span class="hljs-params">filename</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">textFile</span>(filename).<span class="hljs-title function_">then</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-property">parse</span>);
}

<span class="hljs-title function_">jsonFile</span>(<span class="hljs-string">&quot;package.json&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
</code></pre>
<p>بشكل عام، من المفيد التفكير في الوعد كأداة تتيح للشيفرة تجاهل مسألة متى ستصل القيمة. فالقيمة العادية يجب أن تكون موجودة فعلاً قبل أن نستطيع الإشارة إليها. أما القيمة الموعودة فهي قيمة <em>قد</em> تكون موجودة بالفعل أو قد تظهر في وقت ما في المستقبل. والحسابات المعرَّفة بدلالة الوعود، بربطها معاً باستدعاءات <code>then</code>، تُنفَّذ بشكل غير متزامن مع توفّر مدخلاتها.</p>
<h2 id="الفشل">الفشل</h2>
<p>قد تفشل حسابات JavaScript العادية برمي استثناء. وكثيراً ما تحتاج الحسابات غير المتزامنة إلى شيء من هذا القبيل. فقد يفشل طلب شبكي، أو لا يوجد ملف، أو قد ترمي شيفرة ما جزءٌ من الحساب غير المتزامن استثناءً.</p>
<p>من أكثر المشكلات إلحاحاً في أسلوب رد النداء في البرمجة غير المتزامنة أنه يجعل ضمان الإبلاغ الصحيح عن حالات الفشل إلى دوال رد النداء أمراً بالغ الصعوبة.</p>
<p>ومن الاصطلاحات الشائعة استخدام المعطى الأول لدالة رد النداء للإشارة إلى فشل الإجراء، والثاني لتمرير القيمة التي أنتجها الإجراء عند نجاحه.</p>
<pre><code class="language-js"><span class="hljs-title function_">someAsyncFunction</span>(<span class="hljs-function">(<span class="hljs-params">error, value</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (error) <span class="hljs-title function_">handleError</span>(error);
  <span class="hljs-keyword">else</span> <span class="hljs-title function_">processValue</span>(value);
});
</code></pre>
<p>ويجب أن تتحقق دوال رد النداء هذه دائماً مما إذا كانت قد تلقت استثناءً، وأن تضمن التقاط أي مشكلات تسببها، بما في ذلك الاستثناءات التي ترميها الدوال التي تستدعيها، وتسليمها إلى الدالة الصحيحة.</p>
<p>والوعود تسهّل ذلك. إذ يمكن أن يكون الوعد إما محلولاً (انتهى الإجراء بنجاح) وإما مرفوضاً (فشل). ولا تُستدعى معالجات الحل (المسجَّلة بـ<code>then</code>) إلا عند نجاح الإجراء، وتنتقل حالات الرفض إلى الوعد الجديد الذي يُرجعه <code>then</code>. وعندما يرمي معالج استثناءً، يؤدي هذا تلقائياً إلى رفض الوعد الناتج عن استدعاء <code>then</code> الخاص به. وإن فشل أي عنصر في سلسلة إجراءات غير متزامنة، تُوسم نتيجة السلسلة كلها بالمرفوضة، ولا تُستدعى أي معالجات نجاح بعد النقطة التي فشلت فيها.</p>
<p>وكما يوفّر حلّ الوعد قيمة، يوفّر رفضه أيضاً قيمة، تُسمى عادة <em>سبب</em> الرفض. وعندما يتسبب استثناء في دالة معالج في الرفض، تُستخدم قيمة الاستثناء كسبب. وبالمثل، عندما يُرجع معالج وعداً مرفوضاً، ينتقل ذلك الرفض إلى الوعد التالي. وهناك دالة <code>Promise.reject</code> تنشئ وعداً جديداً مرفوضاً فوراً.</p>
<p>ولمعالجة حالات الرفض هذه صراحةً، للوعود طريقة <code>catch</code> تسجّل معالجاً يُستدعى عند رفض الوعد، على غرار طريقة تعامل معالجات <code>then</code> مع الحل العادي. وهي أيضاً شبيهة جداً بـ<code>then</code> من حيث إنها تُرجع وعداً جديداً يُحلّ إلى قيمة الوعد الأصلي عندما يُحلّ الأخير بشكل طبيعي، وإلى نتيجة معالج <code>catch</code> فيما عدا ذلك. وإن رمى معالج <code>catch</code> خطأً، يُرفض الوعد الجديد أيضاً.</p>
<p>وكتعبير مختصر، تقبل <code>then</code> أيضاً معالج رفض كمعطى ثانٍ، فيمكنك تثبيت نوعي المعالجات في استدعاء طريقة واحد: <code>.then(acceptHandler, rejectHandler)</code>.</p>
<p>والدالة التي تُمرَّر إلى بانية <code>Promise</code> تتلقى معطى ثانياً إلى جانب دالة الحل، يمكنها استخدامه لرفض الوعد الجديد.</p>
<p>عندما تصادف دالتنا <code>readTextFile</code> مشكلة، تمرّر الخطأ إلى دالة رد النداء الخاصة بها كمعطى ثانٍ. وينبغي أن يتحقق غلافنا <code>textFile</code> فعلاً من ذلك المعطى حتى يؤدي الفشل إلى رفض الوعد الذي يُرجعه.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">textFile</span>(<span class="hljs-params">filename</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-title function_">readTextFile</span>(filename, <span class="hljs-function">(<span class="hljs-params">text, error</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (error) <span class="hljs-title function_">reject</span>(error);
      <span class="hljs-keyword">else</span> <span class="hljs-title function_">resolve</span>(text);
    });
  });
}
</code></pre>
<p>وهكذا تشكّل سلاسل قيم الوعود المنشأة باستدعاءات <code>then</code> و<code>catch</code> خط أنابيب تنتقل عبره القيم غير المتزامنة أو حالات الفشل. ولأن هذه السلاسل تُنشأ بتسجيل المعالجات، فلكل حلقة فيها معالج نجاح أو معالج رفض (أو كلاهما) مرتبط بها. وتُتجاهل المعالجات التي لا تطابق نوع النتيجة (نجاح أو فشل). أما المعالجات المطابقة فتُستدعى، وتحدّد نتيجتها نوع القيمة التالية — نجاح عندما تُرجع قيمة ليست وعداً، ورفض عندما ترمي استثناءً، ونتيجة الوعد عندما تُرجع وعداً.</p>
<pre><code class="language-js"><span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">_, reject</span>) =&gt;</span> <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Fail&quot;</span>)))
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Handler 1:&quot;</span>, value))
  .<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Caught failure &quot;</span> + reason);
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;nothing&quot;</span>;
  })
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Handler 2:&quot;</span>, value));
<span class="hljs-comment">// → Caught failure Error: Fail</span>
<span class="hljs-comment">// → Handler 2: nothing</span>
</code></pre>
<p>لا تُستدعى دالة معالج <code>then</code> الأولى لأن الوعد يحمل عند تلك النقطة من خط الأنابيب رفضاً. ويتعامل معالج <code>catch</code> مع ذلك الرفض ويُرجع قيمة تُعطى لدالة معالج <code>then</code> الثانية.</p>
<p>وكما تتولى البيئة التعامل مع استثناء غير ملتقط، تستطيع بيئات JavaScript كشف حالة رفض وعد لم يُعالج، وستُبلّغ عن ذلك كخطأ.</p>
<h2 id="كارلا">كارلا</h2>
<p>إنه يوم مشمس في برلين. يعجّ مدرج المطار القديم المهجور بالدرّاجين ومتزلجين على العجلات. وفي العشب قرب حاوية قمامة، يتجمّع سرب من الغربان في صخب، محاولاً إقناع مجموعة من السياح بالتنازل عن شطائرهم.</p>
<p>وتبرز إحدى الغربان — أنثى كبيرة أشعث الريش، في جناحها الأيمن بضع ريشات بيضاء. وهي تستدرج الناس بمهارة وثقة تدلان على أنها تمارس هذا منذ زمن طويل. وعندما ينشغل رجل مسنّ بحركات غراب آخر، تنقضّ هي بهدوء، وتخطف من يده كعكة نصف مأكولة، وتحلّق بعيداً.</p>
<p>وخلافاً لبقية السرب، الذين يبدون سعداء بقضاء اليوم في العبث هنا، تبدو الغرابة الكبيرة هادفة. فتحمل غنيمتها وتطير مباشرة نحو سقف مبنى الحظيرة، لتختفي في فتحة تهوية.</p>
<p>وداخل المبنى، تسمع صوت نقر غريب — خفيف لكنه متواصل. إنه يأتي من مساحة ضيقة تحت سقف درج لم يكتمل بناؤه. تجلس الغرابة هناك، محاطة بوجباتها الخفيفة المسروقة، ونصف دستة من الهواتف الذكية (بعضها يعمل)، وكتلة من الكابلات. وهي تنقر بمنقارها بسرعة على شاشة أحد الهواتف. وتظهر عليها كلمات. وإن لم تكن تعرف الحقيقة، لظننت أنها تكتب.</p>
<p>تُعرف هذه الغرابة بين أقرانها باسم «كااو-كرو». لكن لأن تلك الأصوات غير ملائمة للأوتار الصوتية البشرية، سنشير إليها باسم كارلا.</p>
<p>كارلا غرابة غريبة الأطوار بعض الشيء. في شبابها، فتنتها لغة البشر، فكانت تتنصّت على الناس حتى صار لديها فهم جيد لما يقولونه. وفي وقت لاحق من حياتها، تحوّل اهتمامها إلى تقنية البشر، فبدأت تسرق الهواتف لتدرسها. ومشروعها الحالي هو تعلّم البرمجة. والنص الذي تكتبه في مختبرها الخفي هو في الحقيقة قطعة من شيفرة JavaScript غير المتزامنة.</p>
<h2 id="الاختراق">الاختراق</h2>
<p>تحب كارلا الإنترنت. ومن المزعج أن الهاتف الذي تعمل عليه على وشك أن تنفد منه بيانات الدفع المسبق. فالمبنى فيه شبكة لاسلكية، لكنها تتطلب رمزاً للوصول.</p>
<p>لحسن الحظ، أجهزة التوجيه اللاسلكية في المبنى عمرها 20 عاماً وأمنها ضعيف. وبعد بعض البحث، تكتشف كارلا أن آلية المصادقة على الشبكة فيها ثغرة يمكنها استغلالها. فعند الانضمام إلى الشبكة، يجب أن يرسل الجهاز رمز المرور الصحيح المكوّن من ستة أرقام. وسيردّ نقطة الوصول برسالة نجاح أو فشل حسب ما إذا قُدّم الرمز الصحيح. غير أن إرسال رمز جزئي (ثلاثة أرقام فقط، مثلاً) يعطي استجابة مختلفة حسب ما إذا كانت تلك الأرقام هي البداية الصحيحة للرمز أم لا. فإرسال أرقام خاطئة يُرجع رسالة فشل فوراً. أما إرسال الأرقام الصحيحة فيجعل نقطة الوصول تنتظر مزيداً من الأرقام.</p>
<p>وهذا يجعل من الممكن تسريع تخمين الرمز تسريعاً كبيراً. فتستطيع كارلا إيجاد الرقم الأول بتجربة كل رقم بدوره، حتى تجد رقماً لا يُرجع الفشل فوراً. وبعد معرفة رقم واحد، تستطيع إيجاد الرقم الثاني بالطريقة نفسها، وهكذا دواليك، حتى تعرف رمز المرور كاملاً.</p>
<p>افترض أن لدى كارلا دالة <code>joinWifi</code>. وبإعطائها اسم الشبكة ورمز المرور (كنص)، تحاول الدالة الانضمام إلى الشبكة، وتُرجع وعداً يُحلّ إذا نجحت ويُرفض إذا فشلت المصادقة. وأول ما تحتاجه هو طريقة لتغليف وعد بحيث يُرفض تلقائياً بعد استغراقه وقتاً طويلاً جداً، لتتيح للبرنامج المضي قدماً بسرعة إذا لم تستجب نقطة الوصول.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">withTimeout</span>(<span class="hljs-params">promise, time</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    promise.<span class="hljs-title function_">then</span>(resolve, reject);
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">reject</span>(<span class="hljs-string">&quot;Timed out&quot;</span>), time);
  });
}
</code></pre>
<p>وهذا يستفيد من كون الوعد لا يمكن حلّه أو رفضه إلا مرة واحدة. فإن حُلّ الوعد المعطى كوسيط أو رُفض أولاً، كانت تلك النتيجة نتيجة الوعد الذي يُرجعه <code>withTimeout</code>. أما إن انطلق <code>setTimeout</code> أولاً ورفض الوعد، تُتجاهل أي استدعاءات أخرى للحل أو الرفض.</p>
<p>ولإيجاد رمز المرور كاملاً، يحتاج البرنامج إلى البحث مراراً عن الرقم التالي بتجربة كل رقم. فإن نجحت المصادقة، علمنا أننا وجدنا ما نبحث عنه. وإن فشلت فوراً، علمنا أن ذلك الرقم خاطئ وعلينا تجربة الرقم التالي. وإن انتهت مهلة الطلب، فقد وجدنا رقماً صحيحاً آخر وعلينا المتابعة بإضافة رقم آخر.</p>
<p>ولأنك لا تستطيع انتظار وعد داخل حلقة <code>for</code>، تستخدم كارلا دالة تعاودية لقيادة هذه العملية. في كل استدعاء، تتلقى هذه الدالة الرمز كما نعرفه حتى الآن، وكذلك الرقم التالي المراد تجربته. وتبعاً لما يحدث، قد تُرجع رمزاً مكتملاً أو تستدعي نفسها، إما لبدء كسر الموضع التالي في الرمز أو لتجربة رقم آخر.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">crackPasscode</span>(<span class="hljs-params">networkID</span>) {
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">nextDigit</span>(<span class="hljs-params">code, digit</span>) {
    <span class="hljs-keyword">let</span> newCode = code + digit;
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">withTimeout</span>(<span class="hljs-title function_">joinWifi</span>(networkID, newCode), <span class="hljs-number">50</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> newCode)
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">failure</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (failure == <span class="hljs-string">&quot;Timed out&quot;</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-title function_">nextDigit</span>(newCode, <span class="hljs-number">0</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (digit &lt; <span class="hljs-number">9</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-title function_">nextDigit</span>(code, digit + <span class="hljs-number">1</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">throw</span> failure;
        }
      });
  }
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">nextDigit</span>(<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-number">0</span>);
}
</code></pre>
<p>تميل نقطة الوصول إلى الاستجابة لطلبات المصادقة الخاطئة خلال نحو 20 مللي ثانية، لذا وللاحتياط، تنتظر هذه الدالة 50 مللي ثانية قبل أن تنتهي مهلة الطلب.</p>
<pre><code class="language-js"><span class="hljs-title function_">crackPasscode</span>(<span class="hljs-string">&quot;HANGAR 2&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-comment">// → 555555</span>
</code></pre>
<p>تُميل كارلا رأسها وتتنهد. كان هذا سيكون أكثر إرضاءً لو كان الرمز أصعب قليلاً في التخمين.</p>
<h2 id="دوال-async">دوال async</h2>
<p>حتى مع الوعود، هذا النوع من الشيفرة غير المتزامنة مزعج في الكتابة. فكثيراً ما تحتاج الوعود إلى ربط بعضها ببعض بطرق مطوّلة وتبدو اعتباطية. ولإنشاء حلقة غير متزامنة، أُجبرت كارلا على إدخال دالة تعاودية.</p>
<p>ما تفعله دالة الكسر فعلاً خطّي تماماً — فهي تنتظر دائماً اكتمال الإجراء السابق قبل بدء التالي. وكان التعبير عنه في نموذج برمجة متزامن سيكون أبسط.</p>
<p>والخبر السار أن JavaScript تتيح لك كتابة شيفرة شبه متزامنة لوصف حساب غير متزامن. فدالة <code>async</code> تُرجع ضمناً وعداً، وتستطيع في جسمها أن تنتظر (<code>await</code>) وعوداً أخرى بطريقة <em>تبدو</em> متزامنة.</p>
<p>يمكننا إعادة كتابة <code>crackPasscode</code> هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">crackPasscode</span>(<span class="hljs-params">networkID</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> code = <span class="hljs-string">&quot;&quot;</span>;;) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> digit = <span class="hljs-number">0</span>;; digit++) {
      <span class="hljs-keyword">let</span> newCode = code + digit;
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">withTimeout</span>(<span class="hljs-title function_">joinWifi</span>(networkID, newCode), <span class="hljs-number">50</span>);
        <span class="hljs-keyword">return</span> newCode;
      } <span class="hljs-keyword">catch</span> (failure) {
        <span class="hljs-keyword">if</span> (failure == <span class="hljs-string">&quot;Timed out&quot;</span>) {
          code = newCode;
          <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (digit == <span class="hljs-number">9</span>) {
          <span class="hljs-keyword">throw</span> failure;
        }
      }
    }
  }
}
</code></pre>
<p>تُظهر هذه النسخة بوضوح أكبر بنية الحلقتين في الدالة (الحلقة الداخلية تجرّب الأرقام من 0 إلى 9، والحلقة الخارجية تضيف أرقاماً إلى رمز المرور).</p>
<p>تُوسم دالة <code>async</code> بالكلمة <code>async</code> قبل الكلمة المفتاحية <code>function</code>. ويمكن أيضاً جعل الطرائق <code>async</code> بكتابة <code>async</code> قبل اسمها. وعند استدعاء دالة أو طريقة كهذه، فإنها تُرجع وعداً. وبمجرد أن تُرجع الدالة شيئاً، يُحلّ ذلك الوعد. وإن رمى جسمها استثناءً، يُرفض الوعد.</p>
<p>وداخل دالة <code>async</code>، يمكن وضع الكلمة <code>await</code> أمام تعبير للانتظار حتى يُحلّ وعد، وبعدها فقط يواصل تنفيذ الدالة. وإن رُفض الوعد، يُرفع استثناء عند موضع <code>await</code>.</p>
<p>ولم تعد دالة كهذه تعمل من البداية إلى النهاية دفعة واحدة مثل دالة JavaScript عادية. بل يمكن <em>تجميدها</em> عند أي نقطة فيها <code>await</code>، واستئنافها في وقت لاحق.</p>
<p>ولمعظم الشيفرة غير المتزامنة، هذه الصيغة أكثر ملاءمة من استخدام الوعود مباشرة. لكنك ما زلت بحاجة إلى فهم الوعود، لأنك في حالات كثيرة ستتعامل معها مباشرة. غير أن دوال <code>async</code> أجمل عموماً في الكتابة من سلاسل استدعاءات <code>then</code> عندما يتعلق الأمر بربطها معاً.</p>
<h2 id="الدوال-المولدة">الدوال المولّدة</h2>
<p>ليست قدرة الدوال على التوقف ثم الاستئناف حكراً على دوال <code>async</code>. فلJavaScript أيضاً سمة تُسمى الدوال <em>المولّدة</em> (generator functions). وهي مشابهة، لكن من دون الوعود.</p>
<p>وعندما تعرّف دالة بـ<code>function*</code> (بوضع نجمة بعد كلمة <code>function</code>)، تصبح مولّداً. وعندما تستدعي مولّداً، فإنه يُرجع مكرِّراً (iterator)، وقد رأيناه من قبل في <a href="/chapter/the_secret_life_of_objects">الفصل 6</a>.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span>* <span class="hljs-title function_">powers</span>(<span class="hljs-params">n</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> current = n;; current *= n) {
    <span class="hljs-keyword">yield</span> current;
  }
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> power <span class="hljs-keyword">of</span> <span class="hljs-title function_">powers</span>(<span class="hljs-number">3</span>)) {
  <span class="hljs-keyword">if</span> (power &gt; <span class="hljs-number">50</span>) <span class="hljs-keyword">break</span>;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(power);
}
<span class="hljs-comment">// → 3</span>
<span class="hljs-comment">// → 9</span>
<span class="hljs-comment">// → 27</span>
</code></pre>
<p>في البداية، عندما تستدعي <code>powers</code>، تُجمَّد الدالة عند بدايتها. وفي كل مرة تستدعي فيها <code>next</code> على المكرِّر، تعمل الدالة حتى تصل إلى تعبير <code>yield</code>، الذي يوقفها مؤقتاً ويجعل القيمة المُسلَّمة هي القيمة التالية التي ينتجها المكرِّر. وعندما ترجع الدالة (ودالة المثال لا ترجع أبداً)، يكون المكرِّر قد انتهى.</p>
<p>غالباً ما تكون كتابة المكرِّرات أسهل بكثير عند استخدام دوال مولّدة. ويمكن كتابة المكرِّر الخاص بصنف <code>Group</code> (من تمرين <a href="/chapter/the_secret_life_of_objects#group_iterator">الفصل 6</a>) بهذا المولّد:</p>
<pre><code class="language-js"><span class="hljs-title class_">Group</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>[<span class="hljs-title class_">Symbol</span>.<span class="hljs-property">iterator</span>] = <span class="hljs-keyword">function</span>*() {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">members</span>.<span class="hljs-property">length</span>; i++) {
    <span class="hljs-keyword">yield</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">members</span>[i];
  }
};
</code></pre>
<p>ولم تعد هناك حاجة إلى إنشاء كائن لحفظ حالة التكرار — فالمولّدات تحفظ حالتها المحلية تلقائياً في كل مرة تُسلّم فيها.</p>
<p>ولا يجوز أن تظهر تعبيرات <code>yield</code> هذه إلا مباشرة في دالة المولّد نفسها، لا في دالة داخلية تعرّفها بداخلها. والحالة التي يحفظها المولّد عند التسليم هي بيئته <em>المحلية</em> فقط والموضع الذي سلّم عنده.</p>
<p>ودالة <code>async</code> نوع خاص من المولّدات. فهي تُنتج وعداً عند استدعائها، يُحلّ عند إرجاعها (انتهائها) ويُرفض عند رميها استثناءً. وكلما سلّمت (انتظرت) وعداً، كانت نتيجة ذلك الوعد (قيمة أو استثناء مرفوع) هي نتيجة تعبير <code>await</code>.</p>
<h2 id="مشروع-فني-غرابي">مشروع فني غرابي</h2>
<p>في صباح أحد الأيام، تستيقظ كارلا على ضجيج غير مألوف قادم من أرض المطار خارج حظيرتها. فتقفز إلى حافة السطح وترى البشر يجهّزون شيئاً ما. هناك الكثير من الكابلات الكهربائية، ومنصة، ونوع من جدار أسود كبير يجري بناؤه.</p>
<p>ولأنها غرابة فضولية، تُلقي كارلا نظرة أقرب على الجدار. يبدو أنه يتكوّن من عدد من الأجهزة الكبيرة ذات الواجهات الزجاجية الموصولة بالكابلات. وعلى ظهر الأجهزة كتابة «LedTec SIG-5030».</p>
<p>وبحث سريع على الإنترنت يُظهر دليل مستخدم لهذه الأجهزة. يبدو أنها لافتات مرور، بمصفوفة قابلة للبرمجة من أضواء LED كهرمانية. والأرجح أن البشر يريدون عرض نوع من المعلومات عليها خلال فعاليتهم. ومن المثير للاهتمام أن الشاشات يمكن برمجتها عبر شبكة لاسلكية. فهل يمكن أن تكون متصلة بالشبكة المحلية للمبنى؟</p>
<p>ويحصل كل جهاز على الشبكة على <em>عنوان IP</em>، يمكن للأجهزة الأخرى استخدامه لإرسال رسائل إليه. وسنتحدث عن ذلك أكثر في <a href="/chapter/javascript_and_the_browser">الفصل 13</a>. وتلاحظ كارلا أن هواتفها كلها تحصل على عناوين مثل <code>10.0.0.20</code> أو <code>10.0.0.33</code>. وقد يستحق الأمر محاولة إرسال رسائل إلى كل هذه العناوين ورؤية ما إذا كان أي منها يستجيب للواجهة الموصوفة في دليل اللافتات.</p>
<p>يوضح <a href="/chapter/http_and_forms">الفصل 18</a> كيفية إجراء طلبات حقيقية على شبكات حقيقية. وفي هذا الفصل، سنستخدم دالة صورية مبسّطة تُسمى <code>request</code> للتواصل الشبكي. تأخذ هذه الدالة معطيين — عنوان شبكة ورسالة، قد تكون أي شيء يمكن إرساله كـJSON — وتُرجع وعداً يُحلّ إما إلى استجابة من الجهاز الموجود على العنوان المعطى، وإما يُرفض إذا حدثت مشكلة.</p>
<p>ووفقاً للدليل، يمكنك تغيير ما يُعرض على لافتة SIG-5030 بإرسال رسالة بمحتوى مثل <code>{&quot;command&quot;: &quot;display&quot;, &quot;data&quot;: [0, 0, 3, …]}</code>، حيث يحمل <code>data</code> عدداً واحداً لكل نقطة LED، يحدّد سطوعها — 0 يعني إطفاءً، و3 يعني أقصى سطوع. وكل لافتة عرضها 50 ضوءاً وارتفاعها 30 ضوءاً، لذا ينبغي أن يرسل أمر التحديث 1,500 عدد.</p>
<p>ترسل هذه الشيفرة رسالة تحديث عرض إلى كل العناوين على الشبكة المحلية، لنرى ما سيعلق. ويمكن لكل عدد في عنوان IP أن يتراوح من 0 إلى 255. وفي البيانات التي ترسلها، تُشعل عدداً من الأضواء يوافق العدد الأخير في عنوان الشبكة.</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> addr = <span class="hljs-number">1</span>; addr &lt; <span class="hljs-number">256</span>; addr++) {
  <span class="hljs-keyword">let</span> data = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> n = <span class="hljs-number">0</span>; n &lt; <span class="hljs-number">1500</span>; n++) {
    data.<span class="hljs-title function_">push</span>(n &lt; addr ? <span class="hljs-number">3</span> : <span class="hljs-number">0</span>);
  }
  <span class="hljs-keyword">let</span> ip = <span class="hljs-string">\`10.0.0.<span class="hljs-subst">\${addr}</span>\`</span>;
  <span class="hljs-title function_">request</span>(ip, {<span class="hljs-attr">command</span>: <span class="hljs-string">&quot;display&quot;</span>, data})
    .<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Request to <span class="hljs-subst">\${ip}</span> accepted\`</span>))
    .<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> {});
}
</code></pre>
<p>ولأن معظم هذه العناوين لن يكون موجوداً أو لن يقبل رسائل كهذه، يضمن استدعاء <code>catch</code> ألا تتسبب أخطاء الشبكة في انهيار البرنامج. وتُرسل الطلبات كلها فوراً، دون انتظار انتهاء طلبات أخرى، لكي لا يضيع الوقت عندما لا تجيب بعض الأجهزة.</p>
<p>وبعد أن أطلقت مسحها الشبكي، تعود كارلا إلى الخارج لترى النتيجة. ولبهجتها، تُظهر كل الشاشات الآن شريطاً من الضوء في زواياها العلوية اليسرى. فهي <em>بالفعل</em> على الشبكة المحلية، و<em>بالفعل</em> تقبل الأوامر. وتسجّل سريعاً الأرقام المعروضة على كل شاشة. هناك تسع شاشات، مرتّبة في ثلاثة صفوف وثلاثة أعمدة. ولها عناوين الشبكة التالية:</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> screenAddresses = [
  <span class="hljs-string">&quot;10.0.0.44&quot;</span>, <span class="hljs-string">&quot;10.0.0.45&quot;</span>, <span class="hljs-string">&quot;10.0.0.41&quot;</span>,
  <span class="hljs-string">&quot;10.0.0.31&quot;</span>, <span class="hljs-string">&quot;10.0.0.40&quot;</span>, <span class="hljs-string">&quot;10.0.0.42&quot;</span>,
  <span class="hljs-string">&quot;10.0.0.48&quot;</span>, <span class="hljs-string">&quot;10.0.0.47&quot;</span>, <span class="hljs-string">&quot;10.0.0.46&quot;</span>
];
</code></pre>
<p>وهذا يفتح الآن إمكانات لشتى أنواع المشاغبات. فيمكنها أن تعرض على الجدار «الغربان تسود، والبشر يسيل لعابهم» بحروف عملاقة. لكن ذلك يبدو فظاً بعض الشيء. وبدلاً من ذلك، تخطّط لعرض فيديو لغراب طائر يغطي كل الشاشات في الليل.</p>
<p>تجد كارلا مقطع فيديو مناسباً، يمكن تكرار ثانية ونصف منه لإنشاء فيديو معادة حلقته يُظهر رفرفة جناح غراب. وملاءمةً للشاشات التسع (التي تستطيع كل منها عرض 50×30 بكسل)، تقصّ كارلا الفيديو وتغيّر مقاسه للحصول على سلسلة من الصور بمقاس 150×90، عشر صور في الثانية. ثم تُقطَّع كل منها إلى تسعة مستطيلات، وتُعالَج بحيث تُظهر البقع الداكنة في الفيديو (حيث يوجد الغراب) ضوءاً ساطعاً، وتُترك البقع الفاتحة (حيث لا غراب) داكنة، ما ينبغي أن يخلق تأثير غراب كهرماني يطير على خلفية سوداء.</p>
<p>وقد جهّزت ارتباط <code>clipImages</code> ليحمل مصفوفة من الإطارات، حيث يمثّل كل إطار بمصفوفة من تسع مجموعات من البكسلات — واحدة لكل شاشة — بالصيغة التي تتوقعها اللافتات.</p>
<p>ولعرض إطار واحد من الفيديو، تحتاج كارلا إلى إرسال طلب إلى كل الشاشات دفعة واحدة. لكنها تحتاج أيضاً إلى انتظار نتيجة هذه الطلبات، وذلك لكي لا تبدأ إرسال الإطار التالي قبل إرسال الإطار الحالي إرسالاً سليماً، ولكي تلاحظ عندما تفشل الطلبات.</p>
<p>وللصنف <code>Promise</code> طريقة ساكنة (static method) هي <code>all</code> يمكن استخدامها لتحويل مصفوفة من الوعود إلى وعد واحد يُحلّ إلى مصفوفة من النتائج. وهذا يوفّر طريقة ملائمة لجعل بعض الإجراءات غير المتزامنة تحدث جنباً إلى جنب، والانتظار حتى تنتهي كلها، ثم فعل شيء بنتائجها (أو على الأقل الانتظار للتأكد من أنها لا تفشل).</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">displayFrame</span>(<span class="hljs-params">frame</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(frame.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">data, i</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">request</span>(screenAddresses[i], {
      <span class="hljs-attr">command</span>: <span class="hljs-string">&quot;display&quot;</span>,
      data
    });
  }));
}
</code></pre>
<p>تُجري هذه الدالة <code>map</code> على الصور في <code>frame</code> (وهي مصفوفة من مصفوفات بيانات العرض) لإنشاء مصفوفة من وعود الطلبات. ثم تُرجع وعداً يجمعها كلها.</p>
<p>ولكي يكون ممكناً إيقاف فيديو قيد التشغيل، تُغلَّف العملية في صنف. وللصنف طريقة <code>play</code> غير متزامنة تُرجع وعداً لا يُحلّ إلا عند إيقاف التشغيل مرة أخرى عبر الطريقة <code>stop</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">wait</span>(<span class="hljs-params">time</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">accept</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(accept, time));
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">VideoPlayer</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">frames, frameTime</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frames</span> = frames;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTime</span> = frameTime;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">stopped</span> = <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">play</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">stopped</span> = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; !<span class="hljs-variable language_">this</span>.<span class="hljs-property">stopped</span>; i++) {
      <span class="hljs-keyword">let</span> nextFrame = <span class="hljs-title function_">wait</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTime</span>);
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">displayFrame</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">frames</span>[i % <span class="hljs-variable language_">this</span>.<span class="hljs-property">frames</span>.<span class="hljs-property">length</span>]);
      <span class="hljs-keyword">await</span> nextFrame;
    }
  }

  <span class="hljs-title function_">stop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">stopped</span> = <span class="hljs-literal">true</span>;
  }
}
</code></pre>
<p>تغلّف الدالة <code>wait</code> الدالة <code>setTimeout</code> في وعد يُحلّ بعد عدد المللي ثانية المعطى. وهذا مفيد للتحكم في سرعة التشغيل.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> video = <span class="hljs-keyword">new</span> <span class="hljs-title class_">VideoPlayer</span>(clipImages, <span class="hljs-number">100</span>);
video.<span class="hljs-title function_">play</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Playback failed: &quot;</span> + e);
});
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> video.<span class="hljs-title function_">stop</span>(), <span class="hljs-number">15000</span>);
</code></pre>
<p>وطوال الأسبوع الذي يبقى فيه جدار الشاشات قائماً، في كل مساء، عندما يحلّ الظلام، يظهر عليه بشكل غامض طائر برتقالي متوهج ضخم.</p>
<h2 id="حلقة-الأحداث">حلقة الأحداث</h2>
<p>يبدأ البرنامج غير المتزامن بتشغيل نصه الرئيسي، الذي غالباً ما يجهّز دوال رد نداء لاستدعائها لاحقاً. ويعمل ذلك النص الرئيسي، وكذلك دوال رد النداء، إلى نهايته دفعة واحدة دون انقطاع. لكن البرنامج قد يبقى بينها عاطلاً، منتظراً حدوث شيء ما.</p>
<p>إذن لا تُستدعى دوال رد النداء مباشرة من الشيفرة التي جدولتها. فإذا استدعيت <code>setTimeout</code> من داخل دالة، تكون تلك الدالة قد رجعت بحلول وقت استدعاء دالة رد النداء. وعندما ترجع دالة رد النداء، لا يعود التحكّم إلى الدالة التي جدولتها.</p>
<p>يحدث السلوك غير المتزامن على مكدّس استدعاء دوال فارغ خاص به. وهذا أحد أسباب صعوبة إدارة الاستثناءات عبر الشيفرة غير المتزامنة بدون الوعود. فلأن كل دالة رد نداء تبدأ بمكدّس فارغ في معظمه، لن تكون معالجات <code>catch</code> الخاصة بك على المكدّس عندما ترمي استثناءً.</p>
<pre><code class="language-js"><span class="hljs-keyword">try</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Woosh&quot;</span>);
  }, <span class="hljs-number">20</span>);
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-comment">// لن يعمل هذا</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Caught&quot;</span>, e);
}
</code></pre>
<p>ومهما حدثت الأحداث — مثل المهلات أو الطلبات الواردة — متقاربة، فلن تشغّل بيئة JavaScript إلا برنامجاً واحداً في كل مرة. ويمكنك تصوّر ذلك كأنها تدير حلقة كبيرة <em>حول</em> برنامجك تُسمى <em>حلقة الأحداث</em>. وعندما لا يكون هناك ما يُفعل، تُوقَف تلك الحلقة مؤقتاً. لكن مع ورود الأحداث، تُضاف إلى طابور، وتُنفَّذ شيفرتها الواحد تلو الآخر. ولأن شيئين لا يعملان في الوقت نفسه، فقد تؤخر الشيفرة بطيئة التشغيل معالجة أحداث أخرى.</p>
<p>يضبط هذا المثال مهلة لكنه يتمهّل بعد ذلك إلى ما بعد الوقت المقصود للمهلة، ما يجعل المهلة متأخرة.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> start = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Timeout ran at&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - start);
}, <span class="hljs-number">20</span>);
<span class="hljs-keyword">while</span> (<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() &lt; start + <span class="hljs-number">50</span>) {}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Wasted time until&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - start);
<span class="hljs-comment">// → Wasted time until 50</span>
<span class="hljs-comment">// → Timeout ran at 55</span>
</code></pre>
<p>تُحلّ الوعود أو تُرفض دائماً كحدث جديد. وحتى إذا كان الوعد محلولاً بالفعل، فإن انتظاره سيجعل دالة رد النداء الخاصة بك تعمل بعد انتهاء النص الحالي، لا فوراً.</p>
<pre><code class="language-js"><span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&quot;Done&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Me first!&quot;</span>);
<span class="hljs-comment">// → Me first!</span>
<span class="hljs-comment">// → Done</span>
</code></pre>
<p>وفي فصول لاحقة سنرى أنواعاً أخرى متنوعة من الأحداث التي تعمل على حلقة الأحداث.</p>
<h2 id="العلل-غير-المتزامنة">العلل غير المتزامنة</h2>
<p>عندما يعمل برنامجك بشكل متزامن، دفعة واحدة، لا تحدث تغيّرات في الحالة إلا تلك التي يُجريها البرنامج نفسه. أما البرامج غير المتزامنة فالأمر فيها مختلف — فقد يكون في تنفيذها <em>فجوات</em> يمكن لشيفرة أخرى أن تعمل خلالها.</p>
<p>لننظر إلى مثال. هذه دالة تحاول الإبلاغ عن حجم كل ملف في مصفوفة ملفات، مع الحرص على قراءتها كلها في الوقت نفسه لا بالتتابع.</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fileSizes</span>(<span class="hljs-params">files</span>) {
  <span class="hljs-keyword">let</span> list = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(files.<span class="hljs-title function_">map</span>(<span class="hljs-keyword">async</span> fileName =&gt; {
    list += fileName + <span class="hljs-string">&quot;: &quot;</span> +
      (<span class="hljs-keyword">await</span> <span class="hljs-title function_">textFile</span>(fileName)).<span class="hljs-property">length</span> + <span class="hljs-string">&quot;\\n&quot;</span>;
  }));
  <span class="hljs-keyword">return</span> list;
}
</code></pre>
<p>يوضح الجزء <code>async fileName =&gt;</code> كيف يمكن جعل دوال السهم <code>async</code> أيضاً بوضع الكلمة <code>async</code> أمامها.</p>
<p>لا تبدو الشيفرة مثيرة للشك فوراً... فهي تُجري <code>map</code> للدالة السهمية <code>async</code> على مصفوفة الأسماء، منشئة مصفوفة من الوعود، ثم تستخدم <code>Promise.all</code> للانتظار حتى تكتمل كلها قبل إرجاع القائمة التي تبنينها.</p>
<p>لكن هذا البرنامج معطوب تماماً. فسيُرجع دائماً سطراً واحداً فقط من المخرجات، يسرد الملف الذي استغرق أطول وقت في القراءة.</p>
<pre><code class="language-js"><span class="hljs-title function_">fileSizes</span>([<span class="hljs-string">&quot;plans.txt&quot;</span>, <span class="hljs-string">&quot;shopping_list.txt&quot;</span>])
  .<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
</code></pre>
<p>هل تستطيع أن تكتشف السبب؟</p>
<p>تكمن المشكلة في المعامل <code>+=</code>، فهو يأخذ القيمة <em>الحالية</em> لـ<code>list</code> عند بدء تنفيذ الجملة، ثم، عند انتهاء <code>await</code>، يضبط الارتباط <code>list</code> على تلك القيمة مضافاً إليها النص المضاف.</p>
<p>لكن بين وقت بدء تنفيذ الجملة ووقت انتهائها توجد فجوة غير متزامنة. فتعبير <code>map</code> يعمل قبل أن يُضاف أي شيء إلى القائمة، لذا يبدأ كل معامل من معاملات <code>+=</code> من نص فارغ، وينتهي، عند انتهاء جلب التخزين الخاص به، إلى ضبط <code>list</code> على نتيجة إضافة سطره إلى النص الفارغ.</p>
<p>كان يمكن تجنّب هذا بسهولة بإرجاع الأسطر من الوعود المعيَّنة عبر <code>map</code> واستدعاء <code>join</code> على نتيجة <code>Promise.all</code>، بدلاً من بناء القائمة بتغيير ارتباط. وكالعادة، حساب قيم جديدة أقل عرضة للأخطاء من تغيير قيم موجودة.</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fileSizes</span>(<span class="hljs-params">files</span>) {
  <span class="hljs-keyword">let</span> lines = files.<span class="hljs-title function_">map</span>(<span class="hljs-keyword">async</span> fileName =&gt; {
    <span class="hljs-keyword">return</span> fileName + <span class="hljs-string">&quot;: &quot;</span> +
      (<span class="hljs-keyword">await</span> <span class="hljs-title function_">textFile</span>(fileName)).<span class="hljs-property">length</span>;
  });
  <span class="hljs-keyword">return</span> (<span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(lines)).<span class="hljs-title function_">join</span>(<span class="hljs-string">&quot;\\n&quot;</span>);
}
</code></pre>
<p>من السهل ارتكاب أخطاء كهذه، خصوصاً عند استخدام <code>await</code>، وينبغي أن تكون واعياً بمواضع الفجوات في شيفرتك. ومن مزايا اللاتزامنية <em>الصريحة</em> في JavaScript (سواء عبر دوال رد النداء أو الوعود أو <code>await</code>) أن ملاحظة هذه الفجوات سهلة نسبياً.</p>
<h2 id="الملخص">الملخص</h2>
<p>تجعل البرمجة غير المتزامنة من الممكن التعبير عن انتظار إجراءات طويلة الأمد دون تجميد البرنامج كله. وعادةً ما تنفّذ بيئات JavaScript هذا الأسلوب من البرمجة باستخدام دوال رد النداء، وهي دوال تُستدعى عند اكتمال الإجراءات. وتجدول حلقة الأحداث هذه الدوال لتُستدعى عند الاقتضاء، الواحدة تلو الأخرى، بحيث لا يتداخل تنفيذها.</p>
<p>وتسهّل الوعود، وهي كائنات تمثّل إجراءات قد تكتمل في المستقبل، البرمجة غير المتزامنة، وكذلك دوال <code>async</code> التي تتيح لك كتابة برنامج غير متزامن كما لو كان متزامناً.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="أوقات-الهدوء">أوقات الهدوء</h3>
<p>توجد كاميرا مراقبة قرب مختبر كارلا تُفعّلها حساسة حركة. وهي متصلة بالشبكة وتبدأ بإرسال بث فيديو عندما تكون نشطة. ولأنها تفضّل ألا تُكتشف، أقامت كارلا نظاماً يلاحظ هذا النوع من حركة الشبكة اللاسلكية ويُشعل ضوءاً في وكرها كلما كان هناك نشاط في الخارج، لتعرف متى تلتزم الهدوء.</p>
<p>وقد كانت أيضاً تسجّل أوقات تفعّل الكاميرا منذ مدة، وتريد استخدام هذه المعلومات لتصوّر أي الأوقات، في أسبوع متوسط، تميل إلى الهدوء وأيها تميل إلى الازدحام. ويُخزَّن السجل في ملفات تحمل عدداً واحداً للطابع الزمني (كما تُرجعه <code>Date.now()</code>) في كل سطر.</p>
<pre><code>1695709940692
1695701068331
1695701189163
</code></pre>
<p>يحمل الملف <code>&quot;camera_logs.txt&quot;</code> قائمة بملفات السجل. اكتب دالة غير متزامنة <code>activityTable(day)</code> تُرجع، ليوم معيّن من الأسبوع، مصفوفة من 24 عدداً، عدداً لكل ساعة من ساعات اليوم، تحمل عدد ملاحظات حركة شبكة الكاميرا المسجلة في تلك الساعة من اليوم. وتُعرَّف الأيام بالأرقام وفق النظام الذي تستخدمه <code>Date.getDay</code>، حيث الأحد 0 والسبت 6.</p>
<p>وتلخّص الدالة <code>activityGraph</code>، التي يوفّرها صندوق الرمل (sandbox)، جدولاً كهذا في نص.</p>
<p>ولقراءة الملفات، استخدم الدالة <code>textFile</code> المعرَّفة سابقاً — بإعطائها اسم ملف، تُرجع وعداً يُحلّ إلى محتوى الملف. وتذكّر أن <code>new Date(timestamp)</code> ينشئ كائن <code>Date</code> لذلك الوقت، وله طريقتان هما <code>getDay</code> و<code>getHours</code> تُرجعان يوم الأسبوع وساعة اليوم.</p>
<p>وكلا نوعي الملفات — قائمة ملفات السجل وملفات السجل نفسها — فيه كل قطعة بيانات في سطرها الخاص، مفصولة بمحارف سطر جديد (<code>&quot;\\n&quot;</code>).</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">activityTable</span>(<span class="hljs-params">day</span>) {
  <span class="hljs-keyword">let</span> logFileList = <span class="hljs-keyword">await</span> <span class="hljs-title function_">textFile</span>(<span class="hljs-string">&quot;camera_logs.txt&quot;</span>);
  <span class="hljs-comment">// اكتب شيفرتك هنا</span>
}

<span class="hljs-title function_">activityTable</span>(<span class="hljs-number">1</span>)
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">table</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">activityGraph</span>(table)));
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>ستحتاج إلى تحويل محتوى هذه الملفات إلى مصفوفة. وأسهل طريقة لذلك هي استخدام طريقة <code>split</code> على النص الذي تُنتجه <code>textFile</code>. ولاحظ أن ذلك سيعطيك، في ملفات السجل، مصفوفة من النصوص، وعليك تحويلها إلى أعداد قبل تمريرها إلى <code>new Date</code>.</p>
<p>يمكن تلخيص كل النقاط الزمنية في جدول ساعات بإنشاء جدول (مصفوفة) يحمل عدداً لكل ساعة في اليوم. ثم يمكنك الدوران على كل الطوابع الزمنية (على ملفات السجل والأعداد في كل ملف سجل)، ولكل واحد منها، إن حدث في اليوم الصحيح، خذ الساعة التي وقع فيها وأضف واحداً إلى العدد المقابل في الجدول.</p>
<p>احرص على استخدام <code>await</code> على نتيجة الدوال غير المتزامنة قبل فعل أي شيء بها، وإلا انتهيت بـ<code>Promise</code> حيث كنت تتوقع نصاً.</p>
</details>
<h3 id="وعود-حقيقية">وعود حقيقية</h3>
<p>أعد كتابة الدالة من التمرين السابق بدون <code>async</code>/<code>await</code>، باستخدام طرائق <code>Promise</code> العادية.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">activityTable</span>(<span class="hljs-params">day</span>) {
  <span class="hljs-comment">// اكتب شيفرتك هنا</span>
}

<span class="hljs-title function_">activityTable</span>(<span class="hljs-number">6</span>)
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">table</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">activityGraph</span>(table)));
</code></pre>
<p>في هذا الأسلوب، سيكون استخدام <code>Promise.all</code> أكثر ملاءمة من محاولة نمذجة حلقة على ملفات السجل. أما في دالة <code>async</code>، فمجرد استخدام <code>await</code> في حلقة أبسط. وإذا استغرقت قراءة ملف بعض الوقت، فأي هذين المقاربتين سيستغرق أقل وقت للتشغيل؟</p>
<p>إذا كان في أحد الملفات المدرجة في قائمة الملفات خطأ مطبعي، وفشلت قراءته، فكيف ينتهي ذلك الفشل في كائن <code>Promise</code> الذي تُرجعه دالتك؟</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>أبسط مقاربة لكتابة هذه الدالة هي استخدام سلسلة من استدعاءات <code>then</code>. يُنتج الوعد الأول بقراءة قائمة ملفات السجل. وتستطيع دالة رد النداء الأولى تقسيم هذه القائمة وإجراء <code>map</code> للدالة <code>textFile</code> عليها للحصول على مصفوفة من الوعود تُمرَّر إلى <code>Promise.all</code>. ويمكنها إرجاع الكائن الذي يُرجعه <code>Promise.all</code>، بحيث تصبح أي قيمة يُرجعها هي نتيجة القيمة المُرجَعة لهذا الاستدعاء الأول لـ<code>then</code>.</p>
<p>صار لدينا الآن وعد يُرجع مصفوفة من ملفات السجل. ويمكننا استدعاء <code>then</code> مرة أخرى عليه، ووضع منطق عدّ الطوابع الزمنية هناك. شيء من هذا القبيل:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">activityTable</span>(<span class="hljs-params">day</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">textFile</span>(<span class="hljs-string">&quot;camera_logs.txt&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">files</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(files.<span class="hljs-title function_">split</span>(<span class="hljs-string">&quot;\\n&quot;</span>).<span class="hljs-title function_">map</span>(textFile));
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">logs</span> =&gt;</span> {
    <span class="hljs-comment">// حلّل...</span>
  });
}
</code></pre>
<p>أو يمكنك، لجدولة عمل أفضل، وضع تحليل كل ملف داخل <code>Promise.all</code>، بحيث يمكن بدء ذلك العمل لأول ملف يعود من القرص، حتى قبل عودة الملفات الأخرى.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">activityTable</span>(<span class="hljs-params">day</span>) {
  <span class="hljs-keyword">let</span> table = []; <span class="hljs-comment">// تهيئة...</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">textFile</span>(<span class="hljs-string">&quot;camera_logs.txt&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">files</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(files.<span class="hljs-title function_">split</span>(<span class="hljs-string">&quot;\\n&quot;</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">textFile</span>(name).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">log</span> =&gt;</span> {
        <span class="hljs-comment">// حلّل...</span>
      });
    }));
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> table);
}
</code></pre>
<p>يوضح هذا أن طريقة بناء وعودك يمكن أن يكون لها أثر حقيقي في طريقة جدولة العمل. فحلقة بسيطة فيها <code>await</code> ستجعل العملية خطّية تماماً — إذ تنتظر تحميل كل ملف قبل المتابعة. أما <code>Promise.all</code> فيتيح من حيث المبدأ العمل على مهام متعددة في الوقت نفسه، مما يسمح لها بالتقدم أثناء تحميل الملفات. وقد يكون هذا أسرع، لكنه يجعل أيضاً ترتيب حدوث الأشياء أقل قابلية للتنبؤ. وفي هذه الحالة، لن نفعل سوى زيادة أعداد في جدول، وهذا ليس صعباً فعله بطريقة آمنة. أما في أنواع أخرى من المشكلات، فقد يكون أصعب بكثير.</p>
<p>عندما لا يوجد ملف من القائمة، يُرفض الوعد الذي تُرجعه <code>textFile</code>. ولأن <code>Promise.all</code> يُرفض إذا فشل أي من الوعود المعطاة له، فإن القيمة المُرجَعة لدالة رد النداء المعطاة لاستدعاء <code>then</code> الأول ستكون أيضاً وعداً مرفوضاً. وهذا يجعل الوعد الذي يُرجعه <code>then</code> يفشل، فلا تُستدعى دالة رد النداء المعطاة لاستدعاء <code>then</code> الثاني أصلاً، ويُرجَع وعد مرفوض من الدالة.</p>
</details>
<h3 id="بناء-promiseall">بناء Promise.all</h3>
<p>كما رأينا، عند إعطائه مصفوفة من الوعود، يُرجع <code>Promise.all</code> وعداً ينتظر حتى تنتهي كل الوعود في المصفوفة. ثم ينجح، مُنتجاً مصفوفة من قيم النتائج. وإن فشل وعد في المصفوفة، يفشل الوعد الذي يُرجعه <code>all</code> أيضاً، ناقلاً سبب الفشل من الوعد الفاشل.</p>
<p>نفّذ شيئاً كهذا بنفسك كدالة عادية تُسمى <code>Promise_all</code>.</p>
<p>تذكّر أن الوعد بعد نجاحه أو فشله لا يمكن أن ينجح أو يفشل مرة أخرى، وتُتجاهل أي استدعاءات أخرى للدوال التي تحلّه. وهذا قد يبسّط طريقة تعاملك مع فشل وعدك.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Promise_all</span>(<span class="hljs-params">promises</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// اكتب شيفرتك هنا.</span>
  });
}

<span class="hljs-comment">// شيفرة اختبار.</span>
<span class="hljs-title class_">Promise</span>_all([]).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">array</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;This should be []:&quot;</span>, array);
});
<span class="hljs-keyword">function</span> <span class="hljs-title function_">soon</span>(<span class="hljs-params">val</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(val), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">500</span>);
  });
}
<span class="hljs-title class_">Promise</span>_all([<span class="hljs-title function_">soon</span>(<span class="hljs-number">1</span>), <span class="hljs-title function_">soon</span>(<span class="hljs-number">2</span>), <span class="hljs-title function_">soon</span>(<span class="hljs-number">3</span>)]).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">array</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;This should be [1, 2, 3]:&quot;</span>, array);
});
<span class="hljs-title class_">Promise</span>_all([<span class="hljs-title function_">soon</span>(<span class="hljs-number">1</span>), <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">reject</span>(<span class="hljs-string">&quot;X&quot;</span>), <span class="hljs-title function_">soon</span>(<span class="hljs-number">3</span>)])
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">array</span> =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;We should not get here&quot;</span>);
  })
  .<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (error != <span class="hljs-string">&quot;X&quot;</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Unexpected failure:&quot;</span>, error);
    }
  });
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>سيتعيّن على الدالة التي تُمرَّر إلى بانية <code>Promise</code> استدعاء <code>then</code> على كل وعد في المصفوفة المعطاة. وعندما ينجح أحدها، يجب أن يحدث أمران: تخزين القيمة الناتجة في الموضع الصحيح من مصفوفة النتائج، والتحقق مما إذا كان هذا آخر وعد معلّق وإنهاء وعدنا الخاص إن كان كذلك.</p>
<p>ويمكن فعل الأمر الثاني بعدّاد يُهيّأ على طول المصفوفة المُدخَلة ونطرح منه 1 في كل مرة ينجح فيها وعد. وعندما يصل إلى 0 نكون قد انتهينا. واحرص على أن تأخذ في الحسبان حالة كون المصفوفة المُدخَلة فارغة (وبالتالي لن يُحلّ أي وعد أبداً).</p>
<p>تتطلب معالجة الفشل بعض التفكير لكنها تبيّن أنها بالغة البساطة. ما عليك سوى تمرير دالة <code>reject</code> الخاصة بالوعد الغلاف إلى كل وعد في المصفوفة كمعالج <code>catch</code> أو كمعطى ثانٍ لـ<code>then</code>، بحيث يؤدي فشل أحدها إلى رفض وعد الغلاف كله.</p>
</details>
`,c={number:"11",slug:s,title:n,englishTitle:a,headings:l,html:p};export{c as default,a as englishTitle,l as headings,p as html,e as number,s as slug,n as title};
