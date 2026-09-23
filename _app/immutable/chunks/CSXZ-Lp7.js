const e="12",s="project_a_programming_language",a="مشروع: لغة برمجة",n="Project: A Programming Language",p=[{depth:2,id:"التحليل",text:"التحليل"},{depth:2,id:"المقيم",text:"المُقيِّم"},{depth:2,id:"الصيغ-الخاصة",text:"الصيغ الخاصة"},{depth:2,id:"البيئة",text:"البيئة"},{depth:2,id:"الدوال",text:"الدوال"},{depth:2,id:"التصريف",text:"التصريف"},{depth:2,id:"الغش",text:"الغش"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"المصفوفات",text:"المصفوفات"},{depth:3,id:"الإغلاق",text:"الإغلاق"},{depth:3,id:"التعليقات",text:"التعليقات"},{depth:3,id:"إصلاح-النطاق",text:"إصلاح النطاق"}],l=`<blockquote>
<p>المُقيِّم، الذي يحدد معنى التعبيرات في لغة برمجة، ليس سوى برنامج آخر.</p>
<p>— هال أبيلسون وجيرالد ساسمان، بنية وتفسير برامج الحاسوب</p>
</blockquote>
<p><img src="/images/book/chapter_picture_12.jpg" alt="رسم توضيحي يُظهر بيضة بها ثقوب، بداخلها بيضات أصغر، وفي داخلها بيضات أصغر منها، وهكذا"></p>
<p>إن بناء لغة برمجة خاصة بك سهل بشكل مفاجئ (ما لم تكن تطمح إلى الكثير) ومفيد جدًا لتوسيع مداركك.</p>
<p>الأمر الأساسي الذي أريد إظهاره في هذا الفصل هو أنه لا سحر في بناء لغة برمجة. كثيرًا ما شعرت بأن بعض اختراعات البشر بارعة ومعقدة إلى حد لا أستطيع معه فهمها أبدًا. لكن بقليل من القراءة والتجريب، يتبين غالبًا أنها عادية تمامًا.</p>
<p>سنبني لغة برمجة تُسمى Egg. ستكون لغة صغيرة وبسيطة، لكنها قوية بما يكفي للتعبير عن أي حساب يخطر ببالك. وستتيح تجريدًا بسيطًا قائمًا على الدوال.</p>
<h2 id="التحليل">التحليل</h2>
<p>أكثر ما يتبادر إلى الذهن عند رؤية لغة برمجة هو <em>الصياغة</em> (syntax)، أو طريقة الكتابة. و<em>المحلّل</em> (parser) برنامج يقرأ قطعة نصية وينتج بنية بيانات تعكس بنية البرنامج المضمّن في ذلك النص. وإذا لم يكن النص برنامجًا صالحًا، فينبغي للمحلّل أن يشير إلى الخطأ.</p>
<p>ستكون للغتنا صياغة بسيطة ومنتظمة. كل شيء في Egg تعبير. ويمكن أن يكون التعبير اسم ارتباط، أو عددًا، أو نصًا، أو <em>تطبيقًا</em> (application). تُستخدم التطبيقات لاستدعاءات الدوال، وكذلك لتراكيب مثل <code>if</code> أو <code>while</code>.</p>
<p>لكي يبقى المحلّل بسيطًا، لا تدعم النصوص في Egg أي شيء مثل تسلسلات الهروب بالشرطة المائلة العكسية. فالنص ببساطة سلسلة من المحارف التي ليست علامات اقتباس مزدوجة، محاطة بعلامتي اقتباس مزدوجتين. والعدد سلسلة من الأرقام. ويمكن أن يتكوّن اسم الارتباط من أي محرف ليس مسافة بيضاء وليس له معنى خاص في الصياغة.</p>
<p>تُكتب التطبيقات كما تُكتب في JavaScript، بوضع قوسين بعد تعبير وإدراج أي عدد من المعطيات بين هذين القوسين، مفصولة بفواصل.</p>
<pre><code>do(define(x, 10),
   if(&gt;(x, 5),
      print(&quot;large&quot;),
      print(&quot;small&quot;)))
</code></pre>
<p>انتظام لغة Egg يعني أن الأشياء التي تكون معاملات في JavaScript (مثل <code>&gt;</code>) هي ارتباطات عادية في هذه اللغة، تُطبَّق مثل غيرها من الدوال. ولأن الصياغة لا تعرف مفهوم الكتلة، نحتاج إلى تركيب <code>do</code> لتمثيل القيام بعدة أشياء بالتتابع.</p>
<p>تتكوّن بنية البيانات التي سيستخدمها المحلّل لوصف برنامج من كائنات تعبيرات، لكل منها خاصية <code>type</code> تشير إلى نوع التعبير، وخصائص أخرى لوصف محتواه.</p>
<p>تمثّل تعبيرات النوع <code>&quot;value&quot;</code> نصوصًا أو أعدادًا حرفية. وتحتوي خاصية <code>value</code> فيها على قيمة النص أو العدد الذي تمثّله. أما تعبيرات النوع <code>&quot;word&quot;</code> فتُستخدم للمعرّفات (الأسماء). ولهذه الكائنات خاصية <code>name</code> تحمل اسم المعرّف كنص. وأخيرًا، تمثّل تعبيرات <code>&quot;apply&quot;</code> التطبيقات. ولها خاصية <code>operator</code> تشير إلى التعبير الذي يُطبَّق، بالإضافة إلى خاصية <code>args</code> تحمل مصفوفة من تعبيرات المعطيات.</p>
<p>سيُمثَّل الجزء <code>&gt;(x, 5)</code> من البرنامج السابق هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  type<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;apply&quot;</span><span class="hljs-punctuation">,</span>
  operator<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>type<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;word&quot;</span><span class="hljs-punctuation">,</span> name<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&gt;&quot;</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  args<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>type<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;word&quot;</span><span class="hljs-punctuation">,</span> name<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;x&quot;</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>type<span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;value&quot;</span><span class="hljs-punctuation">,</span> value<span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تُسمى بنية بيانات كهذه <em>شجرة الصياغة</em> (syntax tree). وإن تخيلت الكائنات نقاطًا والروابط بينها خطوطًا تصل بين تلك النقاط، كما في المخطط التالي، كانت البنية على شكل شجرة. وكون التعبيرات تحتوي تعبيرات أخرى قد تحتوي بدورها تعبيرات أكثر يشبه طريقة تفرّع أغصان الشجرة وتفرّعها من جديد.</p>
<p><img src="/images/book/syntax_tree.svg" alt="مخطط يُظهر بنية شجرة الصياغة لبرنامج المثال. الجذر مُسمّى 'do' وله طفلان، أحدهما مُسمّى 'define' والآخر 'if'. ولكلٍّ منهما أطفال أكثر يصفون محتواه."></p>
<p>قارن هذا بالمحلّل الذي كتبناه لصيغة ملف الإعدادات في <a href="/chapter/regular_expressions#ini">الفصل 9</a>، فقد كانت بنيته بسيطة: كان يقسّم المدخل إلى أسطر ويعالج تلك الأسطر سطرًا سطرًا. ولم يكن مسموحًا للسطر إلا بأشكال بسيطة قليلة.</p>
<p>هنا يجب أن نجد مقاربة مختلفة. فالتعبيرات لا تُفصل في أسطر، ولها بنية تعاودية. وتعبيرات التطبيق <em>تحتوي</em> تعبيرات أخرى.</p>
<p>لحسن الحظ، يمكن حل هذه المشكلة حلًا جيدًا بكتابة دالة محلّل تعاودية على نحو يعكس الطبيعة التعاودية للغة.</p>
<p>نعرّف دالة <code>parseExpression</code> تأخذ نصًا مدخلًا. وتُرجع كائنًا يحتوي بنية بيانات التعبير الواقع في بداية النص، مع الجزء المتبقي من النص بعد تحليل هذا التعبير. وعند تحليل تعبيرات فرعية (معطى تطبيق، مثلًا)، يمكن استدعاء هذه الدالة مرة أخرى، فتعطي تعبير المعطى مع النص المتبقي. وقد يحتوي هذا النص بدوره معطيات أكثر أو قد يكون قوس الإغلاق الذي ينهي قائمة المعطيات.</p>
<p>هذا هو الجزء الأول من المحلّل:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">parseExpression</span>(<span class="hljs-params">program</span>) {
  program = <span class="hljs-title function_">skipSpace</span>(program);
  <span class="hljs-keyword">let</span> match, expr;
  <span class="hljs-keyword">if</span> (match = <span class="hljs-regexp">/^&quot;([^&quot;]*)&quot;/</span>.<span class="hljs-title function_">exec</span>(program)) {
    expr = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-attr">value</span>: match[<span class="hljs-number">1</span>]};
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (match = <span class="hljs-regexp">/^\\d+\\b/</span>.<span class="hljs-title function_">exec</span>(program)) {
    expr = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-attr">value</span>: <span class="hljs-title class_">Number</span>(match[<span class="hljs-number">0</span>])};
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (match = <span class="hljs-regexp">/^[^\\s(),#&quot;]+/</span>.<span class="hljs-title function_">exec</span>(program)) {
    expr = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;word&quot;</span>, <span class="hljs-attr">name</span>: match[<span class="hljs-number">0</span>]};
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Unexpected syntax: &quot;</span> + program);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">parseApply</span>(expr, program.<span class="hljs-title function_">slice</span>(match[<span class="hljs-number">0</span>].<span class="hljs-property">length</span>));
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">skipSpace</span>(<span class="hljs-params">string</span>) {
  <span class="hljs-keyword">let</span> first = string.<span class="hljs-title function_">search</span>(<span class="hljs-regexp">/\\S/</span>);
  <span class="hljs-keyword">if</span> (first == -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">return</span> string.<span class="hljs-title function_">slice</span>(first);
}
</code></pre>
<p>لأن Egg، مثل JavaScript، تسمح بأي مقدار من المسافات البيضاء بين عناصرها، علينا أن نقتطع المسافات البيضاء من بداية نص البرنامج مرارًا. وتساعدنا دالة <code>skipSpace</code> في ذلك.</p>
<p>بعد تخطي أي مسافة بادئة، تستخدم <code>parseExpression</code> ثلاثة تعبيرات نمطية لالتقاط العناصر الذرية الثلاثة التي تدعمها Egg: النصوص والأعداد والكلمات. ويُنشئ المحلّل نوعًا مختلفًا من بنية البيانات بحسب التعبير المطابِق. وإن لم يطابق المدخل أحد هذه الأشكال الثلاثة، فهو ليس تعبيرًا صالحًا، ويُطلق المحلّل خطأ. نستخدم هنا البانية <code>SyntaxError</code>. فهذا صنف استثناء معرّف في المعيار، مثل <code>Error</code>، لكنه أكثر تحديدًا.</p>
<p>ثم نقتطع الجزء المطابِق من نص البرنامج ونمرّره، مع كائن التعبير، إلى <code>parseApply</code>، التي تتحقق مما إذا كان التعبير تطبيقًا. وإن كان كذلك، تحلّل قائمة معطيات بين قوسين.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">parseApply</span>(<span class="hljs-params">expr, program</span>) {
  program = <span class="hljs-title function_">skipSpace</span>(program);
  <span class="hljs-keyword">if</span> (program[<span class="hljs-number">0</span>] != <span class="hljs-string">&quot;(&quot;</span>) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">expr</span>: expr, <span class="hljs-attr">rest</span>: program};
  }

  program = <span class="hljs-title function_">skipSpace</span>(program.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>));
  expr = {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;apply&quot;</span>, <span class="hljs-attr">operator</span>: expr, <span class="hljs-attr">args</span>: []};
  <span class="hljs-keyword">while</span> (program[<span class="hljs-number">0</span>] != <span class="hljs-string">&quot;)&quot;</span>) {
    <span class="hljs-keyword">let</span> arg = <span class="hljs-title function_">parseExpression</span>(program);
    expr.<span class="hljs-property">args</span>.<span class="hljs-title function_">push</span>(arg.<span class="hljs-property">expr</span>);
    program = <span class="hljs-title function_">skipSpace</span>(arg.<span class="hljs-property">rest</span>);
    <span class="hljs-keyword">if</span> (program[<span class="hljs-number">0</span>] == <span class="hljs-string">&quot;,&quot;</span>) {
      program = <span class="hljs-title function_">skipSpace</span>(program.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (program[<span class="hljs-number">0</span>] != <span class="hljs-string">&quot;)&quot;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Expected &#x27;,&#x27; or &#x27;)&#x27;&quot;</span>);
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">parseApply</span>(expr, program.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>));
}
</code></pre>
<p>إذا لم يكن المحرف التالي في البرنامج قوس فتح، فهذا ليس تطبيقًا، وتُرجع <code>parseApply</code> التعبير الذي أُعطي لها. وإلا، تتخطى قوس الفتح وتنشئ كائن شجرة الصياغة لتعبير التطبيق هذا. ثم تستدعي <code>parseExpression</code> استدعاءً تعاوديًا لتحليل كل معطى حتى العثور على قوس إغلاق. والتعاود غير مباشر، إذ تستدعي <code>parseApply</code> و<code>parseExpression</code> إحداهما الأخرى.</p>
<p>ولأن تعبير التطبيق يمكن أن يُطبَّق هو نفسه (كما في <code>multiplier(2)(1)</code>)، فعلى <code>parseApply</code>، بعد أن تحلّل تطبيقًا، أن تستدعي نفسها مجددًا للتحقق مما إذا كانت تتبعها زوج آخر من الأقواس.</p>
<p>هذا كل ما نحتاجه لتحليل Egg. نلفّه في دالة <code>parse</code> مريحة تتحقق من بلوغ نهاية نص المدخل بعد تحليل التعبير (فبرنامج Egg تعبير واحد)، وتعيد لنا بنية بيانات البرنامج.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params">program</span>) {
  <span class="hljs-keyword">let</span> {expr, rest} = <span class="hljs-title function_">parseExpression</span>(program);
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">skipSpace</span>(rest).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Unexpected text after program&quot;</span>);
  }
  <span class="hljs-keyword">return</span> expr;
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">parse</span>(<span class="hljs-string">&quot;+(a, 10)&quot;</span>));
<span class="hljs-comment">// → {type: &quot;apply&quot;,</span>
<span class="hljs-comment">//    operator: {type: &quot;word&quot;, name: &quot;+&quot;},</span>
<span class="hljs-comment">//    args: [{type: &quot;word&quot;, name: &quot;a&quot;},</span>
<span class="hljs-comment">//           {type: &quot;value&quot;, value: 10}]}</span>
</code></pre>
<p>إنها تعمل! لا تعطينا معلومات مفيدة كثيرًا عند الفشل ولا تخزّن السطر والعمود الذي يبدأ عنده كل تعبير، وهو ما قد يفيد عند الإبلاغ عن الأخطاء لاحقًا، لكنها جيدة بما يكفي لأغراضنا.</p>
<h2 id="المقيم">المُقيِّم</h2>
<p>ماذا يمكننا أن نفعل بشجرة الصياغة لبرنامج؟ تشغيلها، بالطبع! وهذا ما يفعله المُقيِّم. تعطيه شجرة صياغة وكائن نطاق يربط الأسماء بالقيم، فيقيّم التعبير الذي تمثّله الشجرة ويُرجع القيمة التي ينتجها ذلك.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> specialForms = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">evaluate</span>(<span class="hljs-params">expr, scope</span>) {
  <span class="hljs-keyword">if</span> (expr.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;value&quot;</span>) {
    <span class="hljs-keyword">return</span> expr.<span class="hljs-property">value</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (expr.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;word&quot;</span>) {
    <span class="hljs-keyword">if</span> (expr.<span class="hljs-property">name</span> <span class="hljs-keyword">in</span> scope) {
      <span class="hljs-keyword">return</span> scope[expr.<span class="hljs-property">name</span>];
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ReferenceError</span>(
        <span class="hljs-string">\`Undefined binding: <span class="hljs-subst">\${expr.name}</span>\`</span>);
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (expr.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;apply&quot;</span>) {
    <span class="hljs-keyword">let</span> {operator, args} = expr;
    <span class="hljs-keyword">if</span> (operator.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;word&quot;</span> &amp;&amp;
        operator.<span class="hljs-property">name</span> <span class="hljs-keyword">in</span> specialForms) {
      <span class="hljs-keyword">return</span> specialForms[operator.<span class="hljs-property">name</span>](expr.<span class="hljs-property">args</span>, scope);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">let</span> op = <span class="hljs-title function_">evaluate</span>(operator, scope);
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> op == <span class="hljs-string">&quot;function&quot;</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">op</span>(...args.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> <span class="hljs-title function_">evaluate</span>(arg, scope)));
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TypeError</span>(<span class="hljs-string">&quot;Applying a non-function.&quot;</span>);
      }
    }
  }
}
</code></pre>
<p>للمُقيِّم شيفرة لكل نوع من أنواع التعبيرات. فتعبير القيمة الحرفية ينتج قيمته. (فمثلًا، التعبير <code>100</code> يُقيَّم إلى العدد 100.) أما الارتباط، فيجب أن نتحقق مما إذا كان معرّفًا فعلًا في النطاق، وإن كان كذلك نجلب قيمة الارتباط.</p>
<p>التطبيقات أكثر تعقيدًا. فإن كانت صيغة خاصة، مثل <code>if</code>، فلا نقيّم أي شيء، بل نمرّر ببساطة تعبيرات المعطيات، مع النطاق، إلى الدالة التي تعالج هذه الصيغة. وإن كان استدعاءً عاديًا، نقيّم المعامل ونتحقق من أنه دالة ونستدعيه بالمعطيات المقيَّمة.</p>
<p>نستخدم قيم دوال JavaScript العادية لتمثيل قيم دوال Egg. وسنعود إلى هذا <a href="/chapter/project_a_programming_language#egg_fun">لاحقًا</a>، عند تعريف الصيغة الخاصة <code>fun</code>.</p>
<p>تشبه بنية <code>evaluate</code> التعاودية بنية المحلّل، وكلتاهما تعكسان بنية اللغة نفسها. وكان يمكن أيضًا دمج المحلّل والمُقيِّم في دالة واحدة والتقييم أثناء التحليل، لكن فصلهما بهذه الطريقة يجعل البرنامج أوضح وأكثر مرونة.</p>
<p>هذا في الحقيقة كل ما يلزم لتفسير Egg. بهذه البساطة. لكن دون تعريف بضع صيغ خاصة وإضافة بعض القيم المفيدة إلى البيئة، لن تستطيع فعل الكثير بهذه اللغة بعد.</p>
<h2 id="الصيغ-الخاصة">الصيغ الخاصة</h2>
<p>يُستخدم كائن <code>specialForms</code> لتعريف صياغة خاصة في Egg. فهو يربط الكلمات بدوال تقيّم تلك الصيغ. وهو فارغ حاليًا. لنضف <code>if</code>.</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">if</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (args.<span class="hljs-property">length</span> != <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Wrong number of args to if&quot;</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">0</span>], scope) !== <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">1</span>], scope);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">2</span>], scope);
  }
};
</code></pre>
<p>يتوقع تركيب <code>if</code> في Egg ثلاثة معطيات بالضبط. سيقيّم الأول، وإن لم تكن النتيجة القيمة <code>false</code>، سيقيّم الثاني. وإلا، يُقيَّم الثالث. وتشبه صيغة <code>if</code> هذه معامل الشرط الثلاثي <code>?:</code> في JavaScript أكثر من <code>if</code> في JavaScript. فهي تعبير لا جملة، وتُنتج قيمة، أي نتيجة المعطى الثاني أو الثالث.</p>
<p>وتختلف Egg عن JavaScript أيضًا في طريقة تعاملها مع قيمة الشرط في <code>if</code>. فهي تعتبر القيمة <code>false</code> وحدها زائفة، لا أشياء مثل الصفر أو النص الفارغ.</p>
<p>سبب حاجتنا إلى تمثيل <code>if</code> كصيغة خاصة بدلًا من دالة عادية هو أن جميع معطيات الدوال تُقيَّم قبل استدعاء الدالة، بينما ينبغي لـ <code>if</code> أن يقيّم <em>إما</em> معطاه الثاني أو الثالث فقط، بحسب قيمة الأول.</p>
<p>وصيغة <code>while</code> مشابهة.</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">while</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (args.<span class="hljs-property">length</span> != <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Wrong number of args to while&quot;</span>);
  }
  <span class="hljs-keyword">while</span> (<span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">0</span>], scope) !== <span class="hljs-literal">false</span>) {
    <span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">1</span>], scope);
  }

  <span class="hljs-comment">// بما أن undefined غير موجود في Egg، نُرجع false</span>
  <span class="hljs-comment">// لانعدام نتيجة ذات معنى</span>
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};
</code></pre>
<p>لبنة أساسية أخرى هي <code>do</code>، التي تنفّذ جميع معطياتها من الأعلى إلى الأسفل. وقيمتها هي القيمة التي ينتجها المعطى الأخير.</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">do</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> value = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> arg <span class="hljs-keyword">of</span> args) {
    value = <span class="hljs-title function_">evaluate</span>(arg, scope);
  }
  <span class="hljs-keyword">return</span> value;
};
</code></pre>
<p>لكي نستطيع إنشاء ارتباطات وإعطاءها قيمًا جديدة، نُنشئ أيضًا صيغة تُسمى <code>define</code>. تتوقع كلمة كمعطى أول وتعبيرًا ينتج القيمة التي ستُسند إلى تلك الكلمة كمعطى ثان. ولأن <code>define</code>، مثل كل شيء، تعبير، فيجب أن تُرجع قيمة. سنجعلها تُرجع القيمة التي أُسندت (تمامًا مثل معامل <code>=</code> في JavaScript).</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">define</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (args.<span class="hljs-property">length</span> != <span class="hljs-number">2</span> || args[<span class="hljs-number">0</span>].<span class="hljs-property">type</span> != <span class="hljs-string">&quot;word&quot;</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Incorrect use of define&quot;</span>);
  }
  <span class="hljs-keyword">let</span> value = <span class="hljs-title function_">evaluate</span>(args[<span class="hljs-number">1</span>], scope);
  scope[args[<span class="hljs-number">0</span>].<span class="hljs-property">name</span>] = value;
  <span class="hljs-keyword">return</span> value;
};
</code></pre>
<h2 id="البيئة">البيئة</h2>
<p>النطاق الذي تقبله <code>evaluate</code> كائن خصائصه أسماء تقابل أسماء الارتباطات وقيمها تقابل القيم التي ترتبط بها تلك الارتباطات. لنعرّف كائنًا يمثّل النطاق العام.</p>
<p>لكي نستطيع استخدام تركيب <code>if</code> الذي عرّفناه للتو، يجب أن نصل إلى القيم المنطقية. ولأن القيم المنطقية اثنتان فقط، لا نحتاج إلى صياغة خاصة لهما. نكتفي بربط اسمين بالقيمتين <code>true</code> و<code>false</code> واستخدامهما.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> topScope = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>);

topScope.<span class="hljs-property">true</span> = <span class="hljs-literal">true</span>;
topScope.<span class="hljs-property">false</span> = <span class="hljs-literal">false</span>;
</code></pre>
<p>يمكننا الآن تقييم تعبير بسيط ينفي قيمة منطقية.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> prog = <span class="hljs-title function_">parse</span>(<span class="hljs-string">\`if(true, false, true)\`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">evaluate</span>(prog, topScope));
<span class="hljs-comment">// → false</span>
</code></pre>
<p>لتوفير معاملات حسابية ومقارنات أساسية، سنضيف أيضًا بعض قيم الدوال إلى النطاق. ولكي نبقي الشيفرة قصيرة، سنستخدم <code>Function</code> لتوليد مجموعة من دوال المعاملات في حلقة بدلًا من تعريفها واحدة واحدة.</p>
<pre><code class="language-js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> op <span class="hljs-keyword">of</span> [<span class="hljs-string">&quot;+&quot;</span>, <span class="hljs-string">&quot;-&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;/&quot;</span>, <span class="hljs-string">&quot;==&quot;</span>, <span class="hljs-string">&quot;&lt;&quot;</span>, <span class="hljs-string">&quot;&gt;&quot;</span>]) {
  topScope[op] = <span class="hljs-title class_">Function</span>(<span class="hljs-string">&quot;a, b&quot;</span>, <span class="hljs-string">\`return a <span class="hljs-subst">\${op}</span> b;\`</span>);
}
</code></pre>
<p>من المفيد أيضًا وجود طريقة لإخراج القيم، لذا سنلفّ <code>console.log</code> في دالة ونسميها <code>print</code>.</p>
<pre><code class="language-js">topScope.<span class="hljs-property">print</span> = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value);
  <span class="hljs-keyword">return</span> value;
};
</code></pre>
<p>يعطينا ذلك أدوات أولية كافية لكتابة برامج بسيطة. وتوفّر الدالة التالية طريقة مريحة لتحليل برنامج وتشغيله في نطاق جديد:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">run</span>(<span class="hljs-params">program</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">evaluate</span>(<span class="hljs-title function_">parse</span>(program), <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(topScope));
}
</code></pre>
<p>سنستخدم سلاسل النماذج الأولية (prototype) للكائنات لتمثيل النطاقات المتداخلة، حتى يستطيع البرنامج إضافة ارتباطات إلى نطاقه المحلي دون تغيير النطاق الأعلى.</p>
<pre><code class="language-js"><span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(total, 0),
   define(count, 1),
   while(&lt;(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
\`</span>);
<span class="hljs-comment">// → 55</span>
</code></pre>
<p>هذا هو البرنامج نفسه الذي رأيناه عدة مرات من قبل، والذي يحسب مجموع الأعداد من 1 إلى 10، معبَّرًا عنه بـ Egg. من الواضح أنه أقبح من برنامج JavaScript المكافئ، لكنه ليس سيئًا للغة منفَّذة في أقل من 150 سطرًا من الشيفرة.</p>
<h2 id="الدوال">الدوال</h2>
<p>لغة برمجة بلا دوال لهي لغة فقيرة حقًا. لحسن الحظ، ليس من الصعب إضافة تركيب <code>fun</code>، الذي يعامل معطاه الأخير كجسم الدالة ويستخدم كل المعطيات قبله كأسماء لوسائط الدالة.</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">fun</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!args.<span class="hljs-property">length</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Functions need a body&quot;</span>);
  }
  <span class="hljs-keyword">let</span> body = args[args.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];
  <span class="hljs-keyword">let</span> params = args.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, args.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">expr</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (expr.<span class="hljs-property">type</span> != <span class="hljs-string">&quot;word&quot;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyntaxError</span>(<span class="hljs-string">&quot;Parameter names must be words&quot;</span>);
    }
    <span class="hljs-keyword">return</span> expr.<span class="hljs-property">name</span>;
  });

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) {
    <span class="hljs-keyword">if</span> (args.<span class="hljs-property">length</span> != params.<span class="hljs-property">length</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TypeError</span>(<span class="hljs-string">&quot;Wrong number of arguments&quot;</span>);
    }
    <span class="hljs-keyword">let</span> localScope = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(scope);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; args.<span class="hljs-property">length</span>; i++) {
      localScope[params[i]] = args[i];
    }
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">evaluate</span>(body, localScope);
  };
};
</code></pre>
<p>تحصل الدوال في Egg على نطاق محلي خاص بها. فالدالة التي تنتجها صيغة <code>fun</code> تنشئ هذا النطاق المحلي وتضيف إليه ارتباطات المعطيات. ثم تقيّم جسم الدالة في هذا النطاق وتُرجع النتيجة.</p>
<pre><code class="language-js"><span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
\`</span>);
<span class="hljs-comment">// → 11</span>

<span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
\`</span>);
<span class="hljs-comment">// → 1024</span>
</code></pre>
<h2 id="التصريف">التصريف</h2>
<p>ما بنيناه هو مفسّر (interpreter). فهو أثناء التقييم يعمل مباشرة على تمثيل البرنامج الذي أنتجه المحلّل.</p>
<p><em>التصريف</em> (compilation) عملية إضافة خطوة أخرى بين تحليل البرنامج وتشغيله، تحوّل البرنامج إلى شيء يمكن تقييمه بكفاءة أكبر بإنجاز أكبر قدر ممكن من العمل مسبقًا. فمثلًا، في اللغات جيدة التصميم يكون واضحًا، عند كل استخدام لارتباط، أي ارتباط يُقصد، دون تشغيل البرنامج فعليًا. ويمكن استخدام ذلك لتجنب البحث عن الارتباط باسمه في كل مرة يُوصَل إليها، والجلب مباشرة من موضع محدد مسبقًا في الذاكرة.</p>
<p>يشمل التصريف تقليديًا تحويل البرنامج إلى شيفرة الآلة (machine code)، وهي الصيغة الخام التي يستطيع معالج الحاسوب تنفيذها. لكن أي عملية تحوّل برنامجًا إلى تمثيل مختلف يمكن اعتبارها تصريفًا.</p>
<p>كان من الممكن كتابة استراتيجية تقييم بديلة لـ Egg، تحوّل البرنامج أولًا إلى برنامج JavaScript، وتستخدم <code>Function</code> لاستدعاء مصرّف JavaScript عليه، ثم تشغّل النتيجة. ولو أُنجز ذلك بإتقان، لجعل تشغيل Egg سريعًا جدًا مع بقاء تنفيذه بسيطًا إلى حد كبير.</p>
<p>إن كان هذا الموضوع يثير اهتمامك وكنت مستعدًا لقضاء بعض الوقت عليه، فأشجعك على محاولة تنفيذ مصرّف كهذا كتمرين.</p>
<h2 id="الغش">الغش</h2>
<p>عندما عرّفنا <code>if</code> و<code>while</code>، لاحظت على الأرجح أنهما غلافان بديهيان إلى حد ما حول <code>if</code> و<code>while</code> في JavaScript نفسها. وبالمثل، ليست القيم في Egg سوى قيم JavaScript عادية. أما جسر الفجوة نحو نظام أكثر بدائية، مثل شيفرة الآلة التي يفهمها المعالج، فيتطلب جهدًا أكبر، لكن طريقة عمله تشبه ما نفعله هنا.</p>
<p>رغم أن اللغة اللعبة في هذا الفصل لا تفعل شيئًا لا يمكن فعله بشكل أفضل في JavaScript، فإن هناك <em>حالات</em> يساعد فيها كتابة لغات صغيرة على إنجاز عمل حقيقي.</p>
<p>لا يلزم أن تشبه لغة كهذه لغة برمجة نموذجية. فلو لم تكن JavaScript مزودة بالتعبيرات النمطية، مثلًا، لأمكنك كتابة محلّل ومقيّم خاصين بك للتعبيرات النمطية.</p>
<p>أو تخيل أنك تبني برنامجًا يتيح إنشاء المحلّلات سريعًا بتقديم وصف منطقي للغة التي تحتاج إلى تحليلها. يمكنك تعريف تدوين خاص لذلك، ومصرّف يصرفه إلى برنامج محلّل.</p>
<pre><code>expr = number | string | name | application

number = digit+

name = letter+

string = '&quot;' (! '&quot;')* '&quot;'

application = expr '(' (expr (',' expr)*)? ')'
</code></pre>
<p>هذا ما يسمى عادة <em>لغة خاصة بمجال</em> (domain-specific language)، وهي لغة مصممة للتعبير عن مجال معرفي ضيق. ويمكن أن تكون لغة كهذه أكثر تعبيرًا من لغة عامة الأغراض لأنها مصممة لوصف الأشياء التي يلزم وصفها في مجالها بالضبط ولا شيء غيرها.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="المصفوفات">المصفوفات</h3>
<p>أضف دعم المصفوفات إلى Egg بإضافة الدوال الثلاث التالية إلى النطاق الأعلى: <code>array(...values)</code> لإنشاء مصفوفة تحتوي قيم المعطيات، و<code>length(array)</code> للحصول على طول مصفوفة، و<code>element(array, n)</code> لجلب العنصر رقم <em>n</em> من مصفوفة.</p>
<pre><code class="language-js"><span class="hljs-comment">// عدّل هذه التعريفات...</span>

topScope.<span class="hljs-property">array</span> = <span class="hljs-string">&quot;...&quot;</span>;

topScope.<span class="hljs-property">length</span> = <span class="hljs-string">&quot;...&quot;</span>;

topScope.<span class="hljs-property">element</span> = <span class="hljs-string">&quot;...&quot;</span>;

<span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(&lt;(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
\`</span>);
<span class="hljs-comment">// → 6</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>أسهل طريقة لفعل ذلك هي تمثيل مصفوفات Egg بمصفوفات JavaScript.</p>
<p>يجب أن تكون القيم المضافة إلى النطاق الأعلى دوال. وباستخدام معطى تجميعي (rest argument، بترميز النقاط الثلاث)، يمكن أن يكون تعريف <code>array</code> <em>بالغ</em> البساطة.</p>
</details>
<h3 id="الإغلاق">الإغلاق</h3>
<p>الطريقة التي عرّفنا بها <code>fun</code> تتيح للدوال في Egg الإشارة إلى النطاق المحيط، مما يسمح لجسم الدالة باستخدام قيم محلية كانت مرئية وقت تعريف الدالة، تمامًا كما تفعل دوال JavaScript.</p>
<p>يوضح البرنامج التالي ذلك: الدالة <code>f</code> تُرجع دالة تضيف معطاها إلى معطى <code>f</code>، أي أنها تحتاج إلى الوصول إلى النطاق المحلي داخل <code>f</code> لتتمكن من استخدام الارتباط <code>a</code>.</p>
<pre><code class="language-js"><span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
\`</span>);
<span class="hljs-comment">// → 9</span>
</code></pre>
<p>عُد إلى تعريف صيغة <code>fun</code> واشرح الآلية التي تجعل هذا يعمل.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>مرة أخرى، نستفيد من آلية في JavaScript للحصول على الميزة المكافئة في Egg. تُمرَّر إلى الصيغ الخاصة النطاق المحلي الذي تُقيَّم فيه حتى تستطيع تقييم صيغها الفرعية في ذلك النطاق. والدالة التي تُرجعها <code>fun</code> لديها وصول إلى المعطى <code>scope</code> المُعطى لدالتها المحيطة، وتستخدمه لإنشاء النطاق المحلي للدالة عند استدعائها.</p>
<p>هذا يعني أن النموذج الأولي للنطاق المحلي سيكون النطاق الذي أُنشئت فيه الدالة، مما يجعل من الممكن الوصول إلى الارتباطات في ذلك النطاق من داخل الدالة. هذا كل ما يلزم لتنفيذ الإغلاق (وإن كنت تحتاج إلى عمل إضافي لتصريفه على نحو فعّال حقًا).</p>
</details>
<h3 id="التعليقات">التعليقات</h3>
<p>سيكون جميلًا لو استطعنا كتابة تعليقات في Egg. فمثلًا، كلما وجدنا علامة الهاش (<code>#</code>)، يمكننا معاملة بقية السطر كتعليق وتجاهله، على غرار <code>//</code> في JavaScript.</p>
<p>لا يلزم إجراء تغييرات كبيرة على المحلّل لدعم ذلك. يكفي أن نغيّر <code>skipSpace</code> لتتخطى التعليقات كما لو كانت مسافات بيضاء، بحيث تتخطى جميع المواضع التي تُستدعى فيها <code>skipSpace</code> التعليقات أيضًا. أجرِ هذا التغيير.</p>
<pre><code class="language-js"><span class="hljs-comment">// هذه دالة skipSpace القديمة. عدّلها...</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">skipSpace</span>(<span class="hljs-params">string</span>) {
  <span class="hljs-keyword">let</span> first = string.<span class="hljs-title function_">search</span>(<span class="hljs-regexp">/\\S/</span>);
  <span class="hljs-keyword">if</span> (first == -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">return</span> string.<span class="hljs-title function_">slice</span>(first);
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">parse</span>(<span class="hljs-string">&quot;# hello\\nx&quot;</span>));
<span class="hljs-comment">// → {type: &quot;word&quot;, name: &quot;x&quot;}</span>

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">parse</span>(<span class="hljs-string">&quot;a # one\\n   # two\\n()&quot;</span>));
<span class="hljs-comment">// → {type: &quot;apply&quot;,</span>
<span class="hljs-comment">//    operator: {type: &quot;word&quot;, name: &quot;a&quot;},</span>
<span class="hljs-comment">//    args: []}</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>تأكد من أن حلك يعالج تعليقات متعددة متتالية، مع احتمال وجود مسافات بيضاء بينها أو بعدها.</p>
<p>التعبير النمطي هو على الأرجح أسهل طريقة لحل هذا. اكتب شيئًا يطابق «مسافة بيضاء أو تعليقًا، صفر مرة أو أكثر». استخدم طريقة <code>exec</code> أو <code>match</code> وانظر إلى طول العنصر الأول في المصفوفة المُرجعة (المطابقة الكاملة) لمعرفة عدد المحارف التي يجب اقتطاعها.</p>
</details>
<h3 id="إصلاح-النطاق">إصلاح النطاق</h3>
<p>حاليًا، الطريقة الوحيدة لإسناد قيمة إلى ارتباط هي <code>define</code>. ويعمل هذا التركيب كوسيلة لتعريف ارتباطات جديدة ولإعطاء الارتباطات الموجودة قيمة جديدة في آن واحد.</p>
<p>يسبب هذا الغموض مشكلة. فعندما تحاول إعطاء ارتباط غير محلي قيمة جديدة، ينتهي بك الأمر إلى تعريف ارتباط محلي بالاسم نفسه بدلًا من ذلك. بعض اللغات تعمل بهذه الطريقة عن قصد، لكني وجدتها دائمًا طريقة ركيكة للتعامل مع النطاق.</p>
<p>أضف صيغة خاصة <code>set</code>، مشابهة لـ <code>define</code>، تعطي ارتباطًا قيمة جديدة، وتحدّث الارتباط في نطاق خارجي إن لم يكن موجودًا بالفعل في النطاق الداخلي. وإن لم يكن الارتباط معرّفًا إطلاقًا، فأطلق <code>ReferenceError</code> (نوع خطأ معياري آخر).</p>
<p>ستقف في طريقك قليلًا هنا تقنية تمثيل النطاقات بكائنات بسيطة، التي جعلت الأمور مريحة حتى الآن. قد ترغب في استخدام الدالة <code>Object.getPrototypeOf</code>، التي تُرجع النموذج الأولي لكائن. وتذكّر أيضًا أنك تستطيع استخدام <code>Object.hasOwn</code> لمعرفة ما إذا كان لكائن معين خاصية ما.</p>
<pre><code class="language-js">specialForms.<span class="hljs-property">set</span> = <span class="hljs-function">(<span class="hljs-params">args, scope</span>) =&gt;</span> {
  <span class="hljs-comment">// شيفرتك هنا.</span>
};

<span class="hljs-title function_">run</span>(<span class="hljs-string">\`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
\`</span>);
<span class="hljs-comment">// → 50</span>
<span class="hljs-title function_">run</span>(<span class="hljs-string">\`set(quux, true)\`</span>);
<span class="hljs-comment">// → Some kind of ReferenceError</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>سيكون عليك التنقل عبر النطاقات واحدًا تلو الآخر، باستخدام <code>Object.getPrototypeOf</code> للانتقال إلى النطاق الخارجي التالي. وفي كل نطاق، استخدم <code>Object.hasOwn</code> لمعرفة ما إذا كان الارتباط، المشار إليه بخاصية <code>name</code> في المعطى الأول لـ <code>set</code>، موجودًا في ذلك النطاق. فإن كان موجودًا، عيّنه إلى نتيجة تقييم المعطى الثاني لـ <code>set</code> ثم أعد تلك القيمة.</p>
<p>إذا بلغنا النطاق الأبعد (<code>Object.getPrototypeOf</code> تُرجع <code>null</code>) ولم نجد الارتباط بعد، فهو غير موجود، وينبغي إطلاق خطأ.</p>
</details>
`,c={number:"12",slug:s,title:a,englishTitle:n,headings:p,html:l};export{c as default,n as englishTitle,p as headings,l as html,e as number,s as slug,a as title};
