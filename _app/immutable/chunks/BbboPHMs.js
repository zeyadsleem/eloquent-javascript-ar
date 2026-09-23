const e="06",s="the_secret_life_of_objects",a="الحياة السرية للكائنات",n="The Secret Life of Objects",l=[{depth:2,id:"الأنواع-البياناتية-المجردة",text:"الأنواع البياناتية المجرّدة"},{depth:2,id:"الطرق",text:"الطرق"},{depth:2,id:"النماذج-الأولية",text:"النماذج الأولية"},{depth:2,id:"الأصناف",text:"الأصناف"},{depth:2,id:"الخصائص-الخاصة",text:"الخصائص الخاصة"},{depth:2,id:"تجاوز-الخصائص-المنحدرة",text:"تجاوز الخصائص المنحدرة"},{depth:2,id:"الخرائط",text:"الخرائط"},{depth:2,id:"تعدد-الأشكال",text:"تعدد الأشكال"},{depth:2,id:"الـgetters-والـsetters-والطرق-الساكنة",text:"الـgetters والـsetters والطرق الساكنة"},{depth:2,id:"الرموز",text:"الرموز"},{depth:2,id:"واجهة-المكرر",text:"واجهة المكرِّر"},{depth:2,id:"الوراثة",text:"الوراثة"},{depth:2,id:"المعامل-instanceof",text:"المعامل instanceof"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"نوع-متجه",text:"نوع متجه"},{depth:3,id:"المجموعات",text:"المجموعات"},{depth:3,id:"مجموعات-قابلة-للتكرار",text:"مجموعات قابلة للتكرار"}],p=`<blockquote>
<p>يتحقق نوع البيانات المجرّد بكتابة نوع خاص من البرامج […] يعرّف النوع من حيث العمليات التي يمكن إجراؤها عليه.</p>
<p>— باربرا ليسكوف، البرمجة بالأنواع البياناتية المجرّدة</p>
</blockquote>
<p><img src="/images/book/chapter_picture_6.jpg" alt="رسم توضيحي لأرنب بجوار نموذجه الأولي، تمثيل تخطيطي لأرنب"></p>
<p>قدّم <a href="/chapter/data_structures_objects_and_arrays">الفصل 4</a> كائنات JavaScript بوصفها حاويات تحمل بيانات أخرى. وفي ثقافة البرمجة، تُعدّ <em>البرمجة كائنية التوجه</em> مجموعة من التقنيات تستخدم الكائنات مبدأً مركزياً في تنظيم البرامج. ومع أن لا أحد يتفق حقاً على تعريفها الدقيق، فقد شكّلت البرمجة كائنية التوجه تصميم كثير من لغات البرمجة، بما فيها JavaScript. يصف هذا الفصل الطريقة التي يمكن بها تطبيق هذه الأفكار في JavaScript.</p>
<h2 id="الأنواع-البياناتية-المجردة">الأنواع البياناتية المجرّدة</h2>
<p>الفكرة الرئيسية في البرمجة كائنية التوجه هي استخدام الكائنات، أو بالأحرى <em>أنواعاً</em> من الكائنات، بوصفها وحدة تنظيم البرامج. فإعداد برنامج في صورة عدد من أنواع الكائنات المنفصلة انفصالاً صارماً يوفر طريقة للتفكير في بنيته، وبالتالي لفرض نوع من الانضباط يمنع كل شيء من أن يتشابك.</p>
<p>والطريقة لفعل ذلك هي أن تفكر في الكائنات على نحو يشبه تفكيرك في خلاط كهربائي أو غيره من الأجهزة المنزلية. فالأشخاص الذين يصممون الخلاط ويجمّعونه عليهم القيام بعمل متخصص يتطلب علم المواد وفهماً للكهرباء. وهم يغطون كل ذلك بقشرة بلاستيكية ملساء حتى لا يضطر من يريد فقط خفق عجينة الفطائر إلى القلق بشأن كل ذلك — إذ يكفيه أن يفهم المقابض القليلة التي يُشغَّل بها الخلاط.</p>
<p>وبالمثل، فإن <em>نوع البيانات المجرّد</em>، أو <em>صنف الكائنات</em>، برنامج فرعي قد يحتوي شيفرة معقدة اعتباطاً لكنه يكشف مجموعة محدودة من الطرق والخصائص التي يُفترض بمن يعمل معه أن يستخدمها. وهذا يسمح ببناء برامج كبيرة من عدد من أنواع الأجهزة، ويحدّ من درجة تشابك هذه الأجزاء المختلفة بأن يطلب منها ألا تتفاعل مع بعضها إلا بطرق محددة.</p>
<p>إذا ظهرت مشكلة في أحد أصناف الكائنات هذه، فغالباً ما يمكن إصلاحه أو حتى إعادة كتابته بالكامل دون التأثير في بقية البرنامج. والأفضل من ذلك، قد يكون من الممكن استخدام أصناف الكائنات في برامج مختلفة متعددة، مما يغني عن إعادة إنشاء وظائفها من الصفر. يمكنك أن تنظر إلى بنى البيانات المدمجة في JavaScript، مثل المصفوفات والنصوص، بوصفها أنواعاً بياناتية مجرّدة قابلة لإعادة الاستخدام كهذه.</p>
<p>لكل نوع بيانات مجرّد <em>واجهة</em>، هي مجموعة العمليات التي يمكن للشيفرة الخارجية تنفيذها عليه. وأي تفاصيل تتجاوز تلك الواجهة تكون <em>مغلَّفة</em> (encapsulated)، وتُعامل باعتبارها داخلية للنوع ولا تهم بقية البرنامج.</p>
<p>حتى الأشياء الأساسية مثل الأعداد يمكن التفكير فيها كنوع بيانات مجرّد تسمح واجهته بجمعها وضربها ومقارنتها وما إلى ذلك. في الواقع، إن التركيز على <em>الكائنات</em> المفردة بوصفها الوحدة الرئيسية للتنظيم في البرمجة كائنية التوجه الكلاسيكية مؤسف إلى حد ما، لأن قطعاً مفيدة من الوظائف كثيراً ما تتضمن مجموعة من أصناف الكائنات المختلفة تعمل معاً عن كثب.</p>
<h2 id="الطرق">الطرق</h2>
<p>في JavaScript، ليست الطرق سوى خصائص تحمل قيم دوال. هذه طريقة بسيطة:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">speak</span>(<span class="hljs-params">line</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.type}</span> rabbit says &#x27;<span class="hljs-subst">\${line}</span>&#x27;\`</span>);
}
<span class="hljs-keyword">let</span> whiteRabbit = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;white&quot;</span>, speak};
<span class="hljs-keyword">let</span> hungryRabbit = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;hungry&quot;</span>, speak};

whiteRabbit.<span class="hljs-title function_">speak</span>(<span class="hljs-string">&quot;Oh my fur and whiskers&quot;</span>);
<span class="hljs-comment">// → The white rabbit says &#x27;Oh my fur and whiskers&#x27;</span>
hungryRabbit.<span class="hljs-title function_">speak</span>(<span class="hljs-string">&quot;Got any carrots?&quot;</span>);
<span class="hljs-comment">// → The hungry rabbit says &#x27;Got any carrots?&#x27;</span>
</code></pre>
<p>عادةً ما تحتاج الطريقة إلى فعل شيء بالكائن الذي استُدعيت عليه. وعندما تُستدعى دالة كطريقة — بأن يُبحث عنها كخاصية ثم تُستدعى فوراً، كما في <code>object.method()</code> — فإن الارتباط المسمى <code>this</code> في جسمها يشير تلقائياً إلى الكائن الذي استُدعيت عليه.</p>
<p>يمكنك أن تفكر في <code>this</code> كوسيط إضافي يُمرَّر إلى الدالة بطريقة مختلفة عن الوسائط العادية. وإذا أردت تقديمه صراحةً، فيمكنك استخدام طريقة <code>call</code> الخاصة بالدالة، وهي تأخذ قيمة <code>this</code> كمعطى أول وتتعامل مع المعطيات التالية كوسائط عادية.</p>
<pre><code class="language-js">speak.<span class="hljs-title function_">call</span>(whiteRabbit, <span class="hljs-string">&quot;Hurry&quot;</span>);
<span class="hljs-comment">// → The white rabbit says &#x27;Hurry&#x27;</span>
</code></pre>
<p>وبما أن لكل دالة ارتباط <code>this</code> خاصاً بها تعتمد قيمته على طريقة استدعائها، فلا يمكنك الإشارة إلى <code>this</code> الخاص بالنطاق الحاوي في دالة عادية معرَّفة بالكلمة <code>function</code>.</p>
<p>أما الدوال السهمية فمختلفة — فهي لا ترتبط بـ<code>this</code> خاص بها، لكنها تستطيع رؤية ارتباط <code>this</code> في النطاق المحيط بها. ولذلك يمكنك فعل شيء كالشيفرة التالية، التي تشير إلى <code>this</code> من داخل دالة محلية:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> finder = {
  <span class="hljs-title function_">find</span>(<span class="hljs-params">array</span>) {
    <span class="hljs-keyword">return</span> array.<span class="hljs-title function_">some</span>(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v == <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span>);
  },
  <span class="hljs-attr">value</span>: <span class="hljs-number">5</span>
};
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(finder.<span class="hljs-title function_">find</span>([<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]));
<span class="hljs-comment">// → true</span>
</code></pre>
<p>خاصية مثل <code>find(array)</code> في تعبير كائن هي طريقة مختصرة لتعريف طريقة. فهي تُنشئ خاصية تسمى <code>find</code> وتعطيها دالة كقيمة.</p>
<p>لو كنت قد كتبت معطى <code>some</code> باستخدام الكلمة <code>function</code>، لما عملت هذه الشيفرة.</p>
<h2 id="النماذج-الأولية">النماذج الأولية</h2>
<p>إحدى طرق إنشاء نوع كائن أرنب له طريقة <code>speak</code> أن تُنشئ دالة مساعدة يكون نوع الأرنب وسيطها وتُرجع كائناً يحمل ذلك في خاصيته <code>type</code> ودالة speak لدينا في خاصيته <code>speak</code>.</p>
<p>تتشارك جميع الأرانب الطريقة نفسها. ولاسيما في الأنواع ذات الطرق الكثيرة، سيكون جميلاً لو وُجدت طريقة لحفظ طرق النوع في مكان واحد بدلاً من إضافتها إلى كل كائن على حدة.</p>
<p>في JavaScript، <em>النماذج الأولية</em> (prototypes) هي الطريقة لفعل ذلك. يمكن ربط الكائنات بكائنات أخرى لتكتسب سحرياً كل الخصائص التي يملكها الكائن الآخر. والكائنات العادية القديمة المنشأة بصيغة <code>{}</code> مرتبطة بكائن يسمى <code>Object.prototype</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> empty = {};
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(empty.<span class="hljs-property">toString</span>);
<span class="hljs-comment">// → function toString(){…}</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(empty.<span class="hljs-title function_">toString</span>());
<span class="hljs-comment">// → [object Object]</span>
</code></pre>
<p>يبدو الأمر وكأننا انتزعنا خاصية من كائن فارغ للتو. لكن في الحقيقة، <code>toString</code> طريقة مخزّنة في <code>Object.prototype</code>، أي أنها متاحة في معظم الكائنات.</p>
<p>عندما يتلقى كائن طلباً لخاصية لا يملكها، يُبحث عن الخاصية في نموذجه الأولي. فإن لم يملكها هو الآخر، يُبحث في النموذج الأولي <em>للنموذج الأولي</em>، وهكذا حتى الوصول إلى كائن بلا نموذج أولي (<code>Object.prototype</code> كائن كهذا).</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>({}) == <span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>));
<span class="hljs-comment">// → null</span>
</code></pre>
<p>كما تتوقع، تُرجع <code>Object.getPrototypeOf</code> النموذج الأولي لكائن.</p>
<p>كثير من الكائنات ليس <code>Object.prototype</code> نموذجها الأولي مباشرةً، بل لها كائن آخر يوفر مجموعة مختلفة من الخصائص الافتراضية. فالدوال تنحدر من <code>Function.prototype</code> والمصفوفات تنحدر من <code>Array.prototype</code>.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-property">max</span>) ==
            <span class="hljs-title class_">Function</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>([]) == <span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
<span class="hljs-comment">// → true</span>
</code></pre>
<p>وسيكون لكائن النموذج الأولي هذا نموذج أولي خاص به، غالباً <code>Object.prototype</code>، بحيث يوفر بدوره طرقاً مثل <code>toString</code> بصورة غير مباشرة.</p>
<p>يمكنك استخدام <code>Object.create</code> لإنشاء كائن بنموذج أولي محدد.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> protoRabbit = {
  <span class="hljs-title function_">speak</span>(<span class="hljs-params">line</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.type}</span> rabbit says &#x27;<span class="hljs-subst">\${line}</span>&#x27;\`</span>);
  }
};
<span class="hljs-keyword">let</span> blackRabbit = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(protoRabbit);
blackRabbit.<span class="hljs-property">type</span> = <span class="hljs-string">&quot;black&quot;</span>;
blackRabbit.<span class="hljs-title function_">speak</span>(<span class="hljs-string">&quot;I am fear and darkness&quot;</span>);
<span class="hljs-comment">// → The black rabbit says &#x27;I am fear and darkness&#x27;</span>
</code></pre>
<p>يعمل أرنب «proto» كحاوية للخصائص المشتركة بين جميع الأرانب. أما كائن الأرنب الفردي، مثل الأرنب الأسود، فيحتوي خصائص لا تنطبق إلا عليه — في هذه الحالة نوعه — ويكتسب الخصائص المشتركة من نموذجه الأولي.</p>
<h2 id="الأصناف">الأصناف</h2>
<p>يمكن تفسير نظام النماذج الأولية في JavaScript كنظرة أكثر تحرراً إلى حد ما إلى الأنواع البياناتية المجرّدة أو الأصناف. فـ<em>الصنف</em> يعرّف شكل نوع من الكائنات — ما الطرق والخصائص التي يملكها. ويسمى كائن كهذا <em>نسخة</em> من الصنف.</p>
<p>النماذج الأولية مفيدة لتعريف الخصائص التي تتشارك فيها جميع نسخ صنف القيمة نفسها. أما الخصائص التي تختلف من نسخة إلى أخرى، مثل خاصية <code>type</code> لدى أرانبنا، فتحتاج إلى تخزين مباشر في الكائنات نفسها.</p>
<p>لإنشاء نسخة من صنف معين، عليك صنع كائن ينحدر من النموذج الأولي الصحيح، لكن عليك <em>أيضاً</em> التأكد من أنه هو نفسه يملك الخصائص التي يُفترض أن تملكها نسخ هذا الصنف. وهذا ما تفعله دالة <em>البناء</em> (constructor).</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">makeRabbit</span>(<span class="hljs-params">type</span>) {
  <span class="hljs-keyword">let</span> rabbit = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(protoRabbit);
  rabbit.<span class="hljs-property">type</span> = type;
  <span class="hljs-keyword">return</span> rabbit;
}
</code></pre>
<p>تجعل صيغة الأصناف في JavaScript تعريف هذا النوع من الدوال أسهل، مع كائن نموذج أولي.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Rabbit</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">type</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">type</span> = type;
  }
  <span class="hljs-title function_">speak</span>(<span class="hljs-params">line</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.type}</span> rabbit says &#x27;<span class="hljs-subst">\${line}</span>&#x27;\`</span>);
  }
}
</code></pre>
<p>تبدأ الكلمة <code>class</code> إعلان صنف، يتيح لنا تعريف دالة بناء ومجموعة من الطرق معاً. ويمكن كتابة أي عدد من الطرق داخل قوسي الإعلان المعقوفين. وتأثير هذه الشيفرة تعريف ارتباط يسمى <code>Rabbit</code>، يحمل دالة تشغّل الشيفرة في <code>constructor</code> وتملك خاصية <code>prototype</code> تحمل طريقة <code>speak</code>.</p>
<p>لا يمكن استدعاء هذه الدالة كدالة عادية. فدوال البناء في JavaScript تُستدعى بوضع الكلمة <code>new</code> أمامها. وفعل ذلك يُنشئ كائن نسخة جديداً نموذجه الأولي هو الكائن الموجود في خاصية <code>prototype</code> الخاصة بالدالة، ثم يشغّل الدالة و<code>this</code> مرتبط بالكائن الجديد، وأخيراً يُرجع الكائن.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> killerRabbit = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Rabbit</span>(<span class="hljs-string">&quot;killer&quot;</span>);
</code></pre>
<p>في الواقع، لم تُدخَل <code>class</code> إلا في طبعة 2015 من JavaScript. فأي دالة يمكن استخدامها كدالة بناء، وقبل 2015 كانت طريقة تعريف صنف هي كتابة دالة عادية ثم التلاعب بخاصيتها <code>prototype</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ArchaicRabbit</span>(<span class="hljs-params">type</span>) {
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">type</span> = type;
}
<span class="hljs-title class_">ArchaicRabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">speak</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">line</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.type}</span> rabbit says &#x27;<span class="hljs-subst">\${line}</span>&#x27;\`</span>);
};
<span class="hljs-keyword">let</span> oldSchoolRabbit = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArchaicRabbit</span>(<span class="hljs-string">&quot;old school&quot;</span>);
</code></pre>
<p>ولهذا السبب، تبدأ جميع الدوال غير السهمية بخاصية <code>prototype</code> تحمل كائناً فارغاً.</p>
<p>وبحسب الاصطلاح، تُكتب أسماء دوال البناء بحرف أول كبير حتى يسهل تمييزها عن الدوال الأخرى.</p>
<p>من المهم أن تفهم التمييز بين الطريقة التي يرتبط بها النموذج الأولي بدالة البناء (عبر خاصيتها <code>prototype</code>) والطريقة التي <em>تملك</em> بها الكائنات نموذجاً أولياً (يمكن إيجاده بـ<code>Object.getPrototypeOf</code>). النموذج الأولي الفعلي لدالة البناء هو <code>Function.prototype</code> لأن دوال البناء دوال. أما <em>خاصية</em> <code>prototype</code> في دالة البناء فتحمل النموذج الأولي المستخدم للنسخ المنشأة عبرها.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(<span class="hljs-title class_">Rabbit</span>) ==
            <span class="hljs-title class_">Function</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(killerRabbit) ==
            <span class="hljs-title class_">Rabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
<span class="hljs-comment">// → true</span>
</code></pre>
<p>تضيف دوال البناء عادةً بعض الخصائص الخاصة بكل نسخة إلى <code>this</code>. ومن الممكن أيضاً إعلان خصائص مباشرة في إعلان الصنف. وخلافاً للطرق، تُضاف هذه الخصائص إلى كائنات النسخ لا إلى النموذج الأولي.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Particle</span> {
  speed = <span class="hljs-number">0</span>;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">position</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">position</span> = position;
  }
}
</code></pre>
<p>ومثل <code>function</code>، يمكن استخدام <code>class</code> في الجمل والتعبيرات معاً. وعند استخدامها كتعبير، لا تعرّف ارتباطاً بل تنتج دالة البناء كقيمة فحسب. ويُسمح لك بحذف اسم الصنف في تعبير الصنف.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> object = <span class="hljs-keyword">new</span> <span class="hljs-keyword">class</span> { <span class="hljs-title function_">getWord</span>(<span class="hljs-params"></span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;hello&quot;</span>; } };
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(object.<span class="hljs-title function_">getWord</span>());
<span class="hljs-comment">// → hello</span>
</code></pre>
<h2 id="الخصائص-الخاصة">الخصائص الخاصة</h2>
<p>من الشائع أن تعرّف الأصناف بعض الخصائص والطرق للاستخدام الداخلي لا تكون جزءاً من واجهتها. وتسمى هذه خصائص <em>خاصة</em> (private)، في مقابل الخصائص <em>العامة</em> (public) التي تكون جزءاً من الواجهة الخارجية للكائن.</p>
<p>لإعلان طريقة خاصة، ضع علامة <code>#</code> أمام اسمها. ولا يمكن استدعاء هذه الطرق إلا من داخل إعلان الصنف <code>class</code> الذي يعرّفها.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SecretiveObject</span> {
  #<span class="hljs-title function_">getSecret</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;I ate all the plums&quot;</span>;
  }
  <span class="hljs-title function_">interrogate</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">let</span> shallISayIt = <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">getSecret</span>();
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;never&quot;</span>;
  }
}
</code></pre>
<p>عندما لا يعلن صنف دالة بناء، يحصل تلقائياً على دالة بناء فارغة.</p>
<p>وإذا حاولت استدعاء <code>#getSecret</code> من خارج الصنف، فستحصل على خطأ. فوجودها مخفي تماماً داخل إعلان الصنف.</p>
<p>لاستخدام خصائص النسخة الخاصة، عليك إعلانها. فالخصائص العادية يمكن إنشاؤها بمجرد الإسناد إليها، أما الخصائص الخاصة <em>فيجب</em> إعلانها في إعلان الصنف لتكون متاحة أصلاً.</p>
<p>ينفّذ هذا الصنف جهازاً للحصول على عدد صحيح عشوائي أقل من عدد أقصى معطى. وله خاصية عامة واحدة فقط: <code>getNumber</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RandomSource</span> {
  #max;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">max</span>) {
    <span class="hljs-variable language_">this</span>.#max = max;
  }
  <span class="hljs-title function_">getNumber</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-variable language_">this</span>.#max);
  }
}
</code></pre>
<h2 id="تجاوز-الخصائص-المنحدرة">تجاوز الخصائص المنحدرة</h2>
<p>عندما تضيف خاصية إلى كائن، سواء أكانت موجودة في النموذج الأولي أم لا، تُضاف الخاصية إلى الكائن <em>نفسه</em>. وإن كانت هناك بالفعل خاصية بالاسم نفسه في النموذج الأولي، فلن تؤثر هذه الخاصية في الكائن بعد الآن، لأنها صارت مخفية خلف خاصية الكائن الخاصة به.</p>
<pre><code class="language-js"><span class="hljs-title class_">Rabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">teeth</span> = <span class="hljs-string">&quot;small&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(killerRabbit.<span class="hljs-property">teeth</span>);
<span class="hljs-comment">// → small</span>
killerRabbit.<span class="hljs-property">teeth</span> = <span class="hljs-string">&quot;long, sharp, and bloody&quot;</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(killerRabbit.<span class="hljs-property">teeth</span>);
<span class="hljs-comment">// → long, sharp, and bloody</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>((<span class="hljs-keyword">new</span> <span class="hljs-title class_">Rabbit</span>(<span class="hljs-string">&quot;basic&quot;</span>)).<span class="hljs-property">teeth</span>);
<span class="hljs-comment">// → small</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Rabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">teeth</span>);
<span class="hljs-comment">// → small</span>
</code></pre>
<p>يرسم المخطط التالي الحالة بعد تشغيل هذه الشيفرة. يقع نموذجا <code>Rabbit</code> و<code>Object</code> الأوليان خلف <code>killerRabbit</code> كنوع من الخلفية، حيث يمكن البحث عن الخصائص غير الموجودة في الكائن نفسه.</p>
<p><img src="/images/book/rabbits.svg" alt="مخطط يوضح بنية كائنات الأرانب ونماذجها الأولية. يوجد صندوق لنسخة 'killerRabbit' (يحمل خصائص النسخة مثل 'type')، وخلفه نموذجاه الأوليان 'Rabbit.prototype' (الذي يحمل طريقة 'speak') و'Object.prototype' (الذي يحمل طرقاً مثل 'toString')."></p>
<p>يمكن أن يكون تجاوز الخصائص الموجودة في نموذج أولي أمراً مفيداً. وكما يوضح مثال أسنان الأرنب، يمكن استخدام التجاوز للتعبير عن خصائص استثنائية في نسخ من صنف كائنات أعم، مع ترك الكائنات غير الاستثنائية تأخذ قيمة قياسية من نموذجها الأولي.</p>
<p>ويُستخدم التجاوز أيضاً لإعطاء النموذجين الأوليين القياسيين للدوال والمصفوفات طريقة <code>toString</code> مختلفة عن النموذج الأولي الأساسي للكائنات.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">toString</span> ==
            <span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">toString</span>);
<span class="hljs-comment">// → false</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].<span class="hljs-title function_">toString</span>());
<span class="hljs-comment">// → 1,2</span>
</code></pre>
<p>استدعاء <code>toString</code> على مصفوفة يعطي نتيجة مشابهة لاستدعاء <code>.join(&quot;,&quot;)</code> عليها — فهو يضع فواصل بين القيم في المصفوفة. أما استدعاء <code>Object.prototype.toString</code> مباشرةً على مصفوفة فينتج نصاً مختلفاً. فتلك الدالة لا تعرف شيئاً عن المصفوفات، لذا تضع ببساطة كلمة <em>object</em> واسم النوع بين قوسين مربعين.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">toString</span>.<span class="hljs-title function_">call</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]));
<span class="hljs-comment">// → [object Array]</span>
</code></pre>
<h2 id="الخرائط">الخرائط</h2>
<p>رأينا كلمة <em>map</em> مستخدمة في <a href="/chapter/higher_order_functions#map">الفصل السابق</a> للدلالة على عملية تحوّل بنية بيانات بتطبيق دالة على عناصرها. ومن المربك أن الكلمة نفسها تُستخدم في البرمجة لشيء ذي صلة لكنه مختلف تماماً.</p>
<p><em>الخريطة</em> (map، اسم) بنية بيانات تربط قيماً (المفاتيح) بقيَم أخرى. فقد تريد مثلاً ربط الأسماء بالأعمار. ومن الممكن استخدام الكائنات لذلك.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> ages = {
  <span class="hljs-title class_">Boris</span>: <span class="hljs-number">39</span>,
  <span class="hljs-title class_">Liang</span>: <span class="hljs-number">22</span>,
  Jú<span class="hljs-attr">lia</span>: <span class="hljs-number">62</span>
};

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Júlia is <span class="hljs-subst">\${ages[<span class="hljs-string">&quot;Júlia&quot;</span>]}</span>\`</span>);
<span class="hljs-comment">// → Júlia is 62</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Is Jack&#x27;s age known?&quot;</span>, <span class="hljs-string">&quot;Jack&quot;</span> <span class="hljs-keyword">in</span> ages);
<span class="hljs-comment">// → Is Jack&#x27;s age known? false</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Is toString&#x27;s age known?&quot;</span>, <span class="hljs-string">&quot;toString&quot;</span> <span class="hljs-keyword">in</span> ages);
<span class="hljs-comment">// → Is toString&#x27;s age known? true</span>
</code></pre>
<p>هنا، أسماء خصائص الكائن أسماء الأشخاص وقيم الخصائص أعمارهم. لكننا بالتأكيد لم نُدرج أي شخص اسمه toString في خريطتنا. ومع ذلك، لأن الكائنات العادية تنحدر من <code>Object.prototype</code>، يبدو الأمر وكأن الخاصية موجودة.</p>
<p>ولهذا السبب، فإن استخدام الكائنات العادية كخرائط خطير. وهناك عدة طرق ممكنة لتجنب هذه المشكلة. أولاً، يمكنك إنشاء كائنات بـ<em>لا</em> نموذج أولي. فإذا مررت <code>null</code> إلى <code>Object.create</code>، فلن ينحدر الكائن الناتج من <code>Object.prototype</code> ويمكن استخدامه بأمان كخريطة.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;toString&quot;</span> <span class="hljs-keyword">in</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>));
<span class="hljs-comment">// → false</span>
</code></pre>
<p>يجب أن تكون أسماء خصائص الكائن نصوصاً. وإذا احتجت إلى خريطة يصعب تحويل مفاتيحها إلى نصوص — مثل الكائنات — فلا يمكنك استخدام كائن كخريطتك.</p>
<p>لحسن الحظ، تأتي JavaScript مع صنف يسمى <code>Map</code> مكتوب لهذا الغرض تحديداً. فهو يخزّن ربطاً ويسمح بأي نوع من المفاتيح.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> ages = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
ages.<span class="hljs-title function_">set</span>(<span class="hljs-string">&quot;Boris&quot;</span>, <span class="hljs-number">39</span>);
ages.<span class="hljs-title function_">set</span>(<span class="hljs-string">&quot;Liang&quot;</span>, <span class="hljs-number">22</span>);
ages.<span class="hljs-title function_">set</span>(<span class="hljs-string">&quot;Júlia&quot;</span>, <span class="hljs-number">62</span>);

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Júlia is <span class="hljs-subst">\${ages.get(<span class="hljs-string">&quot;Júlia&quot;</span>)}</span>\`</span>);
<span class="hljs-comment">// → Júlia is 62</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Is Jack&#x27;s age known?&quot;</span>, ages.<span class="hljs-title function_">has</span>(<span class="hljs-string">&quot;Jack&quot;</span>));
<span class="hljs-comment">// → Is Jack&#x27;s age known? false</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(ages.<span class="hljs-title function_">has</span>(<span class="hljs-string">&quot;toString&quot;</span>));
<span class="hljs-comment">// → false</span>
</code></pre>
<p>الطرق <code>set</code> و<code>get</code> و<code>has</code> جزء من واجهة كائن <code>Map</code>. فكتابة بنية بيانات تستطيع تحديث مجموعة كبيرة من القيم والبحث فيها بسرعة ليست سهلة، لكن لا داعي لأن نقلق بشأن ذلك. فقد فعلها شخص آخر من أجلنا، ويمكننا استخدام عمله عبر هذه الواجهة البسيطة.</p>
<p>إذا كان لديك كائن عادي تحتاج إلى معاملته كخريطة لسبب ما، فمن المفيد أن تعرف أن <code>Object.keys</code> تُرجع فقط المفاتيح <em>الخاصة</em> بالكائن، لا تلك الموجودة في النموذج الأولي. وبديلاً عن المعامل <code>in</code>، يمكنك استخدام الدالة <code>Object.hasOwn</code>، التي تتجاهل النموذج الأولي للكائن.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">hasOwn</span>({<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>}, <span class="hljs-string">&quot;x&quot;</span>));
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">hasOwn</span>({<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>}, <span class="hljs-string">&quot;toString&quot;</span>));
<span class="hljs-comment">// → false</span>
</code></pre>
<h2 id="تعدد-الأشكال">تعدد الأشكال</h2>
<p>عندما تستدعي الدالة <code>String</code> (التي تحوّل قيمة إلى نص) على كائن، فإنها ستستدعي طريقة <code>toString</code> على ذلك الكائن محاولةً إنشاء نص ذي معنى منه. ذكرت أن بعض النماذج الأولية القياسية تعرّف نسختها الخاصة من <code>toString</code> لتستطيع إنشاء نص يحمل معلومات أنفع من <code>&quot;[object Object]&quot;</code>. ويمكنك أن تفعل ذلك بنفسك أيضاً.</p>
<pre><code class="language-js"><span class="hljs-title class_">Rabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">toString</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`a <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.type}</span> rabbit\`</span>;
};

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">String</span>(killerRabbit));
<span class="hljs-comment">// → a killer rabbit</span>
</code></pre>
<p>هذه حالة بسيطة لفكرة قوية. فعندما تُكتب قطعة شيفرة لتعمل مع كائنات تملك واجهة معينة — في هذه الحالة طريقة <code>toString</code> — يمكن وصل أي نوع من الكائنات يدعم هذه الواجهة بالشيفرة وسيستطيع العمل معها.</p>
<p>تسمى هذه التقنية <em>تعدد الأشكال</em> (polymorphism). ويمكن للشيفرة متعددة الأشكال أن تعمل مع قيم مختلفة الأشكال، ما دامت تدعم الواجهة التي تتوقعها.</p>
<p>ومن الأمثلة على واجهة مستخدمة على نطاق واسع واجهة الكائنات الشبيهة بالمصفوفات، التي تملك خاصية <code>length</code> تحمل عدداً وخصائص مرقّمة لكل عنصر من عناصرها. وتدعم هذه الواجهة كل من المصفوفات والنصوص، وكذلك كائنات أخرى متنوعة سنرى بعضها لاحقاً في الفصول المتعلقة بالمتصفح. ويمكنك استدعاء معظم طرق المصفوفات — مثل <code>Array.prototype.forEach</code> — على أي شيء يوفر هذه الواجهة.</p>
<pre><code class="language-js"><span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">forEach</span>.<span class="hljs-title function_">call</span>({
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>,
  <span class="hljs-number">0</span>: <span class="hljs-string">&quot;A&quot;</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">&quot;B&quot;</span>
}, <span class="hljs-function"><span class="hljs-params">elt</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(elt));
<span class="hljs-comment">// → A</span>
<span class="hljs-comment">// → B</span>
</code></pre>
<h2 id="الـgetters-والـsetters-والطرق-الساكنة">الـgetters والـsetters والطرق الساكنة</h2>
<p>غالباً ما تحتوي الواجهات على خصائص عادية، لا طرق فحسب. فمثلاً، تملك كائنات <code>Map</code> خاصية <code>size</code> تخبرك بعدد المفاتيح المخزّنة فيها.</p>
<p>ولا يلزم أن يحسب كائن كهذا خاصية كهذه ويخزّنها مباشرةً في النسخة. فحتى الخصائص التي يُوصَل إليها مباشرة قد تخفي استدعاء دالة. وتسمى هذه الطرق <em>getters</em>، وتُعرَّف بكتابة <code>get</code> أمام اسم الطريقة في تعبير كائن أو إعلان صنف.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> varyingSize = {
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">size</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>);
  }
};

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(varyingSize.<span class="hljs-property">size</span>);
<span class="hljs-comment">// → 73</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(varyingSize.<span class="hljs-property">size</span>);
<span class="hljs-comment">// → 49</span>
</code></pre>
<p>كلما قرأ أحد من خاصية <code>size</code> في هذا الكائن، تُستدعى الطريقة المرتبطة بها. ويمكنك فعل شيء مشابه عند الكتابة إلى خاصية، باستخدام <em>setter</em>.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Temperature</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">celsius</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">celsius</span> = celsius;
  }
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">fahrenheit</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">celsius</span> * <span class="hljs-number">1.8</span> + <span class="hljs-number">32</span>;
  }
  <span class="hljs-keyword">set</span> <span class="hljs-title function_">fahrenheit</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">celsius</span> = (value - <span class="hljs-number">32</span>) / <span class="hljs-number">1.8</span>;
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">fromFahrenheit</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Temperature</span>((value - <span class="hljs-number">32</span>) / <span class="hljs-number">1.8</span>);
  }
}

<span class="hljs-keyword">let</span> temp = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Temperature</span>(<span class="hljs-number">22</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(temp.<span class="hljs-property">fahrenheit</span>);
<span class="hljs-comment">// → 71.6</span>
temp.<span class="hljs-property">fahrenheit</span> = <span class="hljs-number">86</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(temp.<span class="hljs-property">celsius</span>);
<span class="hljs-comment">// → 30</span>
</code></pre>
<p>يتيح لك صنف <code>Temperature</code> قراءة درجة الحرارة والكتابة إليها إما بالدرجات المئوية أو بالفهرنهايت، لكنه داخلياً يخزّن الدرجات المئوية فقط ويحوّل تلقائياً من المئوية وإليها في getter وsetter الخاصين بـ<code>fahrenheit</code>.</p>
<p>أحياناً تريد إرفاق بعض الخصائص بدالة البناء مباشرةً بدلاً من النموذج الأولي. فلن تستطيع هذه الطرق الوصول إلى نسخة صنف، لكن يمكن استخدامها مثلاً لتوفير طرق إضافية لإنشاء النسخ.</p>
<p>داخل إعلان صنف، تُخزَّن الطرق أو الخصائص التي تسبقها كلمة <code>static</code> على دالة البناء. فمثلاً، يتيح لك صنف <code>Temperature</code> كتابة <code>Temperature.fromFahrenheit(100)</code> لإنشاء درجة حرارة بالفهرنهايت.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> boil = <span class="hljs-title class_">Temperature</span>.<span class="hljs-title function_">fromFahrenheit</span>(<span class="hljs-number">212</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(boil.<span class="hljs-property">celsius</span>);
<span class="hljs-comment">// → 100</span>
</code></pre>
<h2 id="الرموز">الرموز</h2>
<p>ذكرت في <a href="/chapter/data_structures_objects_and_arrays#for_of_loop">الفصل 4</a> أن حلقة <code>for</code>/<code>of</code> يمكنها الطواف على عدة أنواع من بنى البيانات. وهذه حالة أخرى من تعدد الأشكال — إذ تتوقع مثل هذه الحلقات أن تكشف بنية البيانات واجهة معينة، وهو ما تفعله المصفوفات والنصوص. ويمكننا أيضاً إضافة هذه الواجهة إلى كائناتنا الخاصة! لكن قبل أن نفعل ذلك، علينا أن نلقي نظرة موجزة على نوع الرمز (symbol).</p>
<p>من الممكن أن تستخدم واجهات متعددة اسم الخاصية نفسه لأشياء مختلفة. فمثلاً، في الكائنات الشبيهة بالمصفوفات، تشير <code>length</code> إلى عدد العناصر في المجموعة. لكن واجهة كائن تصف مسار تنزّه قد تستخدم <code>length</code> لتوفير طول المسار بالأمتار. ولن يكون ممكناً لكائن أن يطابق كلتا الواجهتين.</p>
<p>إن كائناً يحاول أن يكون مساراً وشبيهاً بالمصفوفة (ربما لعدّ نقاط مساره) أمر مستبعد إلى حد ما، وهذا النوع من المشكلات ليس شائعاً كثيراً في الممارسة. لكن لأشياء مثل بروتوكول التكرار، احتاج مصممو اللغة إلى نوع من الخصائص <em>لا</em> يتعارض فعلاً مع أي خصائص أخرى. ولذلك أُضيفت <em>الرموز</em> (symbols) إلى اللغة في 2015.</p>
<p>معظم الخصائص، بما فيها كل ما رأيناه حتى الآن، مسماة بنصوص. لكن من الممكن أيضاً استخدام الرموز كأسماء خصائص. والرموز قيم تُنشأ بالدالة <code>Symbol</code>. وخلافاً للنصوص، تكون الرموز المنشأة حديثاً فريدة — فلا يمكنك إنشاء الرمز نفسه مرتين.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> sym = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;name&quot;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(sym == <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;name&quot;</span>));
<span class="hljs-comment">// → false</span>
<span class="hljs-title class_">Rabbit</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>[sym] = <span class="hljs-number">55</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(killerRabbit[sym]);
<span class="hljs-comment">// → 55</span>
</code></pre>
<p>النص الذي تمرره إلى <code>Symbol</code> يُدرَج عند تحويله إلى نص، ويمكن أن يسهّل التعرف على الرمز عند عرضه مثلاً في وحدة التحكم. لكن ليس له معنى يتجاوز ذلك — فقد تتشارك رموز متعددة الاسم نفسه.</p>
<p>ولأن الرموز فريدة ويمكن استخدامها كأسماء خصائص في آنٍ واحد، فهي مناسبة لتعريف واجهات يمكنها أن تتعايش بسلام إلى جانب خصائص أخرى، أياً كانت أسماؤها.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> length = <span class="hljs-title class_">Symbol</span>(<span class="hljs-string">&quot;length&quot;</span>);
<span class="hljs-title class_">Array</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>[length] = <span class="hljs-number">0</span>;

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 2</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>][length]);
<span class="hljs-comment">// → 0</span>
</code></pre>
<p>من الممكن إدراج خصائص الرموز في تعبيرات الكائنات والأصناف باستخدام قوسين مربعين حول اسم الخاصية. فذلك يجعل التعبير الواقع بين القوسين يُقيَّم لإنتاج اسم الخاصية، على غرار صيغة الوصول إلى الخصائص بالأقواس المربعة.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> myTrip = {
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>,
  <span class="hljs-number">0</span>: <span class="hljs-string">&quot;Lankwitz&quot;</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">&quot;Babelsberg&quot;</span>,
  [length]: <span class="hljs-number">21500</span>
};
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(myTrip[length], myTrip.<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 21500 2</span>
</code></pre>
<h2 id="واجهة-المكرر">واجهة المكرِّر</h2>
<p>يُتوقع من الكائن المعطى إلى حلقة <code>for</code>/<code>of</code> أن يكون <em>قابلاً للتكرار</em> (iterable). وهذا يعني أنه يملك طريقة مسماة بالرمز <code>Symbol.iterator</code> (وهي قيمة رمز تعرّفها اللغة، مخزّنة كخاصية للدالة <code>Symbol</code>).</p>
<p>وعند استدعائها، ينبغي لتلك الطريقة أن تُرجع كائناً يوفر واجهة ثانية، هي <em>المكرِّر</em> (iterator). فهذا هو الشيء الذي يكرّر فعلاً. وله طريقة <code>next</code> تُرجع النتيجة التالية. وينبغي أن تكون تلك النتيجة كائناً له خاصية <code>value</code> توفر القيمة التالية إن وُجدت، وخاصية <code>done</code> ينبغي أن تكون true عند عدم وجود مزيد من النتائج وfalse خلاف ذلك.</p>
<p>لاحظ أن أسماء الخصائص <code>next</code> و<code>value</code> و<code>done</code> نصوص عادية، لا رموز. فالرمز الفعلي الوحيد هو <code>Symbol.iterator</code>، الذي يُرجَّح إضافته إلى <em>عدد كبير جداً</em> من الكائنات المختلفة.</p>
<p>يمكننا استخدام هذه الواجهة مباشرةً بأنفسنا.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> okIterator = <span class="hljs-string">&quot;OK&quot;</span>[<span class="hljs-title class_">Symbol</span>.<span class="hljs-property">iterator</span>]();
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(okIterator.<span class="hljs-title function_">next</span>());
<span class="hljs-comment">// → {value: &quot;O&quot;, done: false}</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(okIterator.<span class="hljs-title function_">next</span>());
<span class="hljs-comment">// → {value: &quot;K&quot;, done: false}</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(okIterator.<span class="hljs-title function_">next</span>());
<span class="hljs-comment">// → {value: undefined, done: true}</span>
</code></pre>
<p>لننفّذ بنية بيانات قابلة للتكرار شبيهة بالقائمة المترابطة (linked list) من التمرين في <a href="/chapter/data_structures_objects_and_arrays">الفصل 4</a>. سنكتب القائمة هذه المرة كصنف.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">List</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">value, rest</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span> = value;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">rest</span> = rest;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">length</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> + (<span class="hljs-variable language_">this</span>.<span class="hljs-property">rest</span> ? <span class="hljs-variable language_">this</span>.<span class="hljs-property">rest</span>.<span class="hljs-property">length</span> : <span class="hljs-number">0</span>);
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">fromArray</span>(<span class="hljs-params">array</span>) {
    <span class="hljs-keyword">let</span> result = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = array.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
      result = <span class="hljs-keyword">new</span> <span class="hljs-title function_">this</span>(array[i], result);
    }
    <span class="hljs-keyword">return</span> result;
  }
}
</code></pre>
<p>لاحظ أن <code>this</code>، في طريقة ساكنة، يشير إلى دالة بناء الصنف، لا إلى نسخة — فلا توجد نسخة في الجوار عند استدعاء طريقة ساكنة.</p>
<p>ينبغي أن يؤدي الطواف على قائمة إلى إرجاع جميع عناصرها من البداية إلى النهاية. وسنكتب صنفاً منفصلاً للمكرِّر.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ListIterator</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">list</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">list</span> = list;
  }

  <span class="hljs-title function_">next</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">list</span> == <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>};
    }
    <span class="hljs-keyword">let</span> value = <span class="hljs-variable language_">this</span>.<span class="hljs-property">list</span>.<span class="hljs-property">value</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">list</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">list</span>.<span class="hljs-property">rest</span>;
    <span class="hljs-keyword">return</span> {value, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>};
  }
}
</code></pre>
<p>يتتبع الصنف تقدم الطواف عبر القائمة بتحديث خاصيته <code>list</code> للانتقال إلى كائن القائمة التالي كلما أُرجعت قيمة، ويُبلّغ بأنه انتهى عندما تكون تلك القائمة فارغة (null).</p>
<p>لنجهّز صنف <code>List</code> ليكون قابلاً للتكرار. سأستخدم في هذا الكتاب من حين إلى آخر التلاعب بالنموذج الأولي بعد التعريف لإضافة طرق إلى الأصناف، حتى تبقى قطع الشيفرة الفردية صغيرة ومكتفية بذاتها. أما في برنامج عادي، حيث لا حاجة إلى تقسيم الشيفرة إلى قطع صغيرة، فستعلن هذه الطرق مباشرةً في الصنف بدلاً من ذلك.</p>
<pre><code class="language-js"><span class="hljs-title class_">List</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>[<span class="hljs-title class_">Symbol</span>.<span class="hljs-property">iterator</span>] = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListIterator</span>(<span class="hljs-variable language_">this</span>);
};
</code></pre>
<p>يمكننا الآن الطواف على قائمة بحلقة <code>for</code>/<code>of</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> list = <span class="hljs-title class_">List</span>.<span class="hljs-title function_">fromArray</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> element <span class="hljs-keyword">of</span> list) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(element);
}
<span class="hljs-comment">// → 1</span>
<span class="hljs-comment">// → 2</span>
<span class="hljs-comment">// → 3</span>
</code></pre>
<p>تعمل صيغة <code>...</code> في ترميز المصفوفات واستدعاءات الدوال بالمثل مع أي كائن قابل للتكرار. فمثلاً، يمكنك استخدام <code>[...value]</code> لإنشاء مصفوفة تحتوي العناصر الموجودة في كائن قابل للتكرار اعتباطي.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([...<span class="hljs-string">&quot;PCI&quot;</span>]);
<span class="hljs-comment">// → [&quot;P&quot;, &quot;C&quot;, &quot;I&quot;]</span>
</code></pre>
<h2 id="الوراثة">الوراثة</h2>
<p>تخيّل أننا نحتاج نوع قائمة شبيه كثيراً بصنف <code>List</code> الذي رأيناه سابقاً، لكن لأننا سنطلب طوله طوال الوقت، لا نريد أن يضطر إلى مسح <code>rest</code> في كل مرة. بل نريد تخزين الطول في كل نسخة للوصول إليه بكفاءة.</p>
<p>يتيح نظام النماذج الأولية في JavaScript إنشاء صنف <em>جديد</em>، شبيه كثيراً بالصنف القديم، لكن بتعريفات جديدة لبعض خصائصه. فنموذج الصنف الجديد الأولي ينحدر من النموذج الأولي القديم لكنه يضيف تعريفاً جديداً لـgetter الخاص بـ<code>length</code> مثلاً.</p>
<p>وفي مصطلحات البرمجة كائنية التوجه، يسمى هذا <em>وراثة</em>. فالصنف الجديد يورث خصائص وسلوكاً من الصنف القديم.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LengthList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">List</span> {
  #length;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">value, rest</span>) {
    <span class="hljs-variable language_">super</span>(value, rest);
    <span class="hljs-variable language_">this</span>.#length = <span class="hljs-variable language_">super</span>.<span class="hljs-property">length</span>;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">length</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#length;
  }
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">LengthList</span>.<span class="hljs-title function_">fromArray</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 3</span>
</code></pre>
<p>يشير استخدام كلمة <code>extends</code> إلى أن هذا الصنف لا ينبغي أن يستند مباشرةً إلى النموذج الأولي <code>Object</code> الافتراضي بل إلى صنف آخر. ويسمى هذا <em>الصنف الأصلي</em> (superclass). أما الصنف المنحدر فهو <em>الصنف الفرعي</em> (subclass).</p>
<p>لتشغيل نسخة <code>LengthList</code>، تستدعي دالة البناء دالة بناء صنفها الأصلي عبر الكلمة <code>super</code>. وهذا ضروري لأنه إذا أردنا لهذا الكائن الجديد أن يتصرف (تقريباً) مثل <code>List</code>، فسيحتاج إلى خصائص النسخة التي تملكها القوائم.</p>
<p>ثم تخزّن دالة البناء طول القائمة في خاصية خاصة. ولو كنا كتبنا <code>this.length</code> هناك، لاستُدعي getter الصنف نفسه، وهو لا يعمل بعد لأن <code>#length</code> لم يُملأ بعد. ويمكننا استخدام <code>super.something</code> لاستدعاء الطرق والـgetters على النموذج الأولي للصنف الأصلي، وهذا مفيد غالباً.</p>
<p>تتيح لنا الوراثة بناء أنواع بيانات مختلفة قليلاً من أنواع بيانات موجودة بجهد قليل نسبياً. وهي جزء أساسي من التقليد كائني التوجه، إلى جانب التغليف وتعدد الأشكال. لكن في حين يُنظر إلى الأخيرين الآن عموماً كفكرتين رائعتين، فإن الوراثة أكثر إثارة للجدل.</p>
<p>فبينما يمكن استخدام التغليف وتعدد الأشكال <em>لفصل</em> قطع الشيفرة عن بعضها، مما يقلل تشابك البرنامج ككل، تربط الوراثة الأصناف بعضها ببعض ربطاً جوهرياً، فتخلق تشابكاً <em>أكبر</em>. وعند الوراثة من صنف، عليك عادةً معرفة المزيد عن كيفية عمله أكثر مما تحتاج عند مجرد استخدامه. ويمكن أن تكون الوراثة أداة مفيدة لجعل بعض أنواع البرامج أكثر إيجازاً، لكن ينبغي ألا تكون أول أداة تمد يدك إليها، والأرجح ألا تسعى بنشاط إلى البحث عن فرص لبناء هرميات أصناف (شجرات عائلات الأصناف).</p>
<h2 id="المعامل-instanceof">المعامل instanceof</h2>
<p>من المفيد أحياناً معرفة ما إذا كان كائن منحدراً من صنف محدد. ولهذا توفر JavaScript معاملاً ثنائياً يسمى <code>instanceof</code>.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">LengthList</span>(<span class="hljs-number">1</span>, <span class="hljs-literal">null</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">LengthList</span>);
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">LengthList</span>(<span class="hljs-number">2</span>, <span class="hljs-literal">null</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">List</span>);
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">List</span>(<span class="hljs-number">3</span>, <span class="hljs-literal">null</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">LengthList</span>);
<span class="hljs-comment">// → false</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>([<span class="hljs-number">1</span>] <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Array</span>);
<span class="hljs-comment">// → true</span>
</code></pre>
<p>يرى هذا المعامل عبر الأنواع الموروثة، لذا فإن <code>LengthList</code> نسخة من <code>List</code>. ويمكن تطبيق المعامل أيضاً على دوال بناء قياسية مثل <code>Array</code>. فكل كائن تقريباً نسخة من <code>Object</code>.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>لا تقتصر الكائنات على حمل خصائصها الخاصة فحسب. فلديها نماذج أولية، هي كائنات أخرى. وستتصرف كما لو كانت تملك خصائص لا تملكها ما دام نموذجها الأولي يملك تلك الخاصية. وللكائنات البسيطة <code>Object.prototype</code> نموذجاً أولياً.</p>
<p>دوال البناء، وهي دوال تبدأ أسماؤها عادةً بحرف كبير، يمكن استخدامها مع المعامل <code>new</code> لإنشاء كائنات جديدة. وسيكون النموذج الأولي للكائن الجديد هو الكائن الموجود في خاصية <code>prototype</code> لدالة البناء. ويمكنك الاستفادة من ذلك جيداً بوضع الخصائص المشتركة بين جميع قيم نوع معين في نموذجها الأولي. وهناك صيغة <code>class</code> توفر طريقة واضحة لتعريف دالة بناء ونموذجها الأولي.</p>
<p>يمكنك تعريف getters وsetters لاستدعاء طرق سراً في كل مرة يُوصَل فيها إلى خاصية كائن. والطرق الساكنة طرق مخزّنة في دالة بناء الصنف لا في نموذجه الأولي.</p>
<p>يستطيع المعامل <code>instanceof</code>، بمعلومية كائن ودالة بناء، أن يخبرك ما إذا كان ذلك الكائن نسخة من دالة البناء تلك.</p>
<p>من الأمور المفيدة التي يمكن فعلها بالكائنات تحديد واجهة لها وإخبار الجميع بأنه يُفترض ألا يتحدثوا إلى كائنك إلا عبر تلك الواجهة. أما بقية التفاصيل التي يتكون منها كائنك فهي الآن <em>مغلَّفة</em>، مخفية خلف الواجهة. ويمكنك استخدام الخصائص الخاصة لإخفاء جزء من كائنك عن العالم الخارجي.</p>
<p>قد ينفّذ أكثر من نوع الواجهة نفسها. والشيفرة المكتوبة لاستخدام واجهة تعرف تلقائياً كيف تعمل مع أي عدد من الكائنات المختلفة التي توفر تلك الواجهة. ويسمى هذا <em>تعدد الأشكال</em>.</p>
<p>عند تنفيذ أصناف متعددة تختلف في بعض التفاصيل فقط، قد يكون من المفيد كتابة الأصناف الجديدة <em>كأصناف فرعية</em> لصنف موجود، <em>ترث</em> جزءاً من سلوكه.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="نوع-متجه">نوع متجه</h3>
<p>اكتب صنفاً <code>Vec</code> يمثل متجهاً في فضاء ثنائي الأبعاد. يأخذ وسيطين هما <code>x</code> و<code>y</code> (عددان)، يحفظهما في خاصيتين بالاسم نفسه.</p>
<p>أعطِ النموذج الأولي لـ<code>Vec</code> طريقتين، <code>plus</code> و<code>minus</code>، تأخذان متجهاً آخر كوسيط وتُرجعان متجهاً جديداً يحمل مجموع أو فرق قيمتي <em>x</em> و<em>y</em> للمتجهين (<code>this</code> والوسيط).</p>
<p>أضف خاصية getter باسم <code>length</code> إلى النموذج الأولي تحسب طول المتجه — أي المسافة من النقطة (<em>x</em>, <em>y</em>) إلى نقطة الأصل (0, 0).</p>
<pre><code class="language-js"><span class="hljs-comment">// شيفرتك هنا.</span>

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>).<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)));
<span class="hljs-comment">// → Vec{x: 3, y: 5}</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>).<span class="hljs-title function_">minus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)));
<span class="hljs-comment">// → Vec{x: -1, y: -1}</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>).<span class="hljs-property">length</span>);
<span class="hljs-comment">// → 5</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>ارجع إلى مثال صنف <code>Rabbit</code> إن لم تكن متأكداً من شكل إعلانات <code>class</code>.</p>
<p>يمكن إضافة خاصية getter إلى دالة البناء بوضع الكلمة <code>get</code> قبل اسم الطريقة. ولحساب المسافة من (0, 0) إلى (x, y)، يمكنك استخدام مبرهنة فيثاغورس، التي تنص على أن مربع المسافة التي نبحث عنها يساوي مربع الإحداثي x زائد مربع الإحداثي y. ومن ثم، فإن √(x2 + y2) هو العدد الذي تريده. و<code>Math.sqrt</code> هي طريقة حساب الجذر التربيعي في JavaScript، ويمكن استخدام <code>x ** 2</code> لتربيع عدد.</p>
</details>
<h3 id="المجموعات">المجموعات</h3>
<p>توفر بيئة JavaScript القياسية بنية بيانات أخرى تسمى <code>Set</code>. ومثل نسخة <code>Map</code>، تحمل المجموعة مجموعة من القيم. وخلافاً لـ<code>Map</code>، فإنها لا تربط بها قيماً أخرى — بل تتبع فقط أي القيم جزء من المجموعة. ويمكن أن تكون القيمة جزءاً من المجموعة مرة واحدة فقط — فإضافتها مجدداً ليس له أي أثر.</p>
<p>اكتب صنفاً يسمى <code>Group</code> (لأن <code>Set</code> محجوز بالفعل). ومثل <code>Set</code>، يملك طرق <code>add</code> و<code>delete</code> و<code>has</code>. دالة بنائه تُنشئ مجموعة فارغة، و<code>add</code> تضيف قيمة إلى المجموعة (لكن فقط إن لم تكن عضواً فيها بالفعل)، و<code>delete</code> تحذف معطاها من المجموعة (إن كان عضواً)، و<code>has</code> تُرجع قيمة منطقية تشير إلى ما إذا كان معطاها عضواً في المجموعة.</p>
<p>استخدم المعامل <code>===</code>، أو ما يكافئه مثل <code>indexOf</code>، لتحديد ما إذا كانت قيمتان متماثلتين.</p>
<p>أعطِ الصنف طريقة ساكنة <code>from</code> تأخذ كائناً قابلاً للتكرار كمعطى لها وتنشئ مجموعة تحتوي جميع القيم الناتجة عن الطواف عليه.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Group</span> {
  <span class="hljs-comment">// شيفرتك هنا.</span>
}

<span class="hljs-keyword">let</span> group = <span class="hljs-title class_">Group</span>.<span class="hljs-title function_">from</span>([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>]);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(group.<span class="hljs-title function_">has</span>(<span class="hljs-number">10</span>));
<span class="hljs-comment">// → true</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(group.<span class="hljs-title function_">has</span>(<span class="hljs-number">30</span>));
<span class="hljs-comment">// → false</span>
group.<span class="hljs-title function_">add</span>(<span class="hljs-number">10</span>);
group.<span class="hljs-title function_">delete</span>(<span class="hljs-number">10</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(group.<span class="hljs-title function_">has</span>(<span class="hljs-number">10</span>));
<span class="hljs-comment">// → false</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>أسهل طريقة لفعل ذلك تخزين مصفوفة بأعضاء المجموعة في خاصية نسخة. ويمكن استخدام الطريقتين <code>includes</code> أو <code>indexOf</code> للتحقق مما إذا كانت قيمة معينة موجودة في المصفوفة.</p>
<p>يمكن لدالة بناء صنفك ضبط مجموعة الأعضاء على مصفوفة فارغة. وعند استدعاء <code>add</code>، يجب أن تتحقق مما إذا كانت القيمة المعطاة موجودة في المصفوفة أو تضيفها خلاف ذلك، ربما باستخدام <code>push</code>.</p>
<p>حذف عنصر من مصفوفة، في <code>delete</code>، أقل بساطة، لكن يمكنك استخدام <code>filter</code> لإنشاء مصفوفة جديدة بدون القيمة. ولا تنسَ أن تكتب فوق الخاصية الحاملة للأعضاء بالنسخة المصفَّاة الجديدة من المصفوفة.</p>
<p>يمكن لطريقة <code>from</code> استخدام حلقة <code>for</code>/<code>of</code> لاستخراج القيم من الكائن القابل للتكرار واستدعاء <code>add</code> لوضعها في مجموعة منشأة حديثاً.</p>
</details>
<h3 id="مجموعات-قابلة-للتكرار">مجموعات قابلة للتكرار</h3>
<p>اجعل صنف <code>Group</code> من التمرين السابق قابلاً للتكرار. ارجع إلى القسم الخاص بواجهة المكرِّر في وقت سابق من هذا الفصل إن لم يكن شكل الواجهة الدقيق واضحاً لك بعد.</p>
<p>إذا استخدمت مصفوفة لتمثيل أعضاء المجموعة، فلا تُرجع فقط المكرِّر الناتج عن استدعاء طريقة <code>Symbol.iterator</code> على المصفوفة. فذلك سيعمل، لكنه يبطل الغرض من هذا التمرين.</p>
<p>لا بأس إن تصرف مكرِّرك بغرابة عند تعديل المجموعة أثناء الطواف.</p>
<pre><code class="language-js"><span class="hljs-comment">// شيفرتك هنا (وشيفرة التمرين السابق)</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> <span class="hljs-title class_">Group</span>.<span class="hljs-title function_">from</span>([<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>])) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value);
}
<span class="hljs-comment">// → a</span>
<span class="hljs-comment">// → b</span>
<span class="hljs-comment">// → c</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يجدر على الأرجح بتعريف صنف جديد <code>GroupIterator</code>. وينبغي لنسخ المكرِّر أن تملك خاصية تتبع الموضع الحالي في المجموعة. وفي كل مرة تُستدعى <code>next</code>، تتحقق مما إذا كانت قد انتهت، وإن لم تكن، تتجاوز القيمة الحالية وتُرجعها.</p>
<p>ويحصل صنف <code>Group</code> نفسه على طريقة مسماة بـ<code>Symbol.iterator</code> تُرجع عند استدعائها نسخة جديدة من صنف المكرِّر الخاص بتلك المجموعة.</p>
</details>
`,c={number:"06",slug:s,title:a,englishTitle:n,headings:l,html:p};export{c as default,n as englishTitle,l as headings,p as html,e as number,s as slug,a as title};
