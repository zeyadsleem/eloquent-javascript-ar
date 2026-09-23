const e="16",s="project_a_platform_game",a="مشروع: لعبة منصات",n="Project: A Platform Game",l=[{depth:2,id:"اللعبة",text:"اللعبة"},{depth:2,id:"التقنية",text:"التقنية"},{depth:2,id:"المستويات",text:"المستويات"},{depth:2,id:"قراءة-مستوى",text:"قراءة مستوى"},{depth:2,id:"الفاعلون",text:"الفاعلون"},{depth:2,id:"الرسم",text:"الرسم"},{depth:2,id:"الحركة-والتصادم",text:"الحركة والتصادم"},{depth:2,id:"تحديثات-الفاعلين",text:"تحديثات الفاعلين"},{depth:2,id:"تتبع-المفاتيح",text:"تتبع المفاتيح"},{depth:2,id:"تشغيل-اللعبة",text:"تشغيل اللعبة"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"انتهت-اللعبة",text:"انتهت اللعبة"},{depth:3,id:"إيقاف-اللعبة-مؤقتا",text:"إيقاف اللعبة مؤقتاً"},{depth:3,id:"وحش",text:"وحش"}],p=`<blockquote>
<p>كل الواقع لعبة.</p>
<p>— إيان بانكس، لاعب الألعاب (The Player of Games)</p>
</blockquote>
<p><img src="/images/book/chapter_picture_16.jpg" alt="رسم توضيحي يُظهر شخصية لعبة حاسوب تقفز فوق الحمم في عالم ثنائي الأبعاد"></p>
<p>كان قدر كبير من افتتاني الأولي بالحواسيب، شأني شأن كثير من الأطفال المهووسين بالتقنية، مرتبطاً بألعاب الحاسوب. انجذبت إلى العوالم المحاكاة الصغيرة التي كان بوسعي التلاعب بها والتي كانت القصص تتكشف فيها (على نحو ما) — وأظن أن السبب في ذلك يعود أكثر إلى الطريقة التي كنت أوظف بها خيالي فيها لا إلى الاحتمالات التي كانت توفرها فعلاً.</p>
<p>لا أتمنى لأي أحد أن يعمل في برمجة الألعاب. فكما هو الحال في صناعة الموسيقى، يخلق التفاوت بين عدد الشباب المتحمسين الراغبين في العمل فيها والطلب الفعلي على أمثالهم بيئة غير صحية إلى حد ما. لكن كتابة الألعاب للمتعة مسلية.</p>
<p>سيستعرض هذا الفصل تنفيذ لعبة منصات صغيرة. ألعاب المنصات (أو ألعاب «اقفز واركض») هي ألعاب تتوقع من اللاعب تحريك شخصية عبر عالم، يكون عادة ثنائي الأبعاد ويُرى من الجانب، مع القفز فوق الأشياء وعليها.</p>
<h2 id="اللعبة">اللعبة</h2>
<p>ستستند لعبتنا تقريباً إلى لعبة <a href="http://www.lessmilk.com/games/10">Dark Blue</a> لتوماس باليف. اخترت تلك اللعبة لأنها مسلية وبسيطة في آن واحد، ولأن بناءها لا يتطلب الكثير من الشيفرة. وهي تبدو هكذا:</p>
<p><img src="/images/book/darkblue.png" alt="لقطة شاشة من لعبة «Dark Blue»، تُظهر عالماً مصنوعاً من صناديق ملوّنة. هناك صندوق أسود يمثل اللاعب، واقف على خطوط بيضاء أمام خلفية زرقاء. عملات صفراء صغيرة تطفو في الهواء، وبعض أجزاء الخلفية حمراء تمثل الحمم."></p>
<p>يمثل الصندوق الداكن اللاعب، ومهمته جمع الصناديق الصفراء (العملات) مع تجنب الأشياء الحمراء (الحمم). ويُكتمل المستوى عند جمع كل العملات.</p>
<p>يستطيع اللاعب التنقل باستخدام مفتاحي السهمين الأيسر والأيمن، والقفز بالسهم الأعلى. القفز هو تخصص شخصية هذه اللعبة. فهي تستطيع الوصول إلى ارتفاع يساوي عدة أضعاف طولها، وتغيير اتجاهها في الهواء. قد لا يكون هذا واقعياً تماماً، لكنه يمنح اللاعب إحساساً بالتحكم المباشر في الشخصية الظاهرة على الشاشة.</p>
<p>تتكون اللعبة من خلفية ساكنة مرتّبة على هيئة شبكة، مع تراكب العناصر المتحركة فوق تلك الخلفية. كل خانة في الشبكة إما فارغة أو صلبة أو حمم. أما العناصر المتحركة فهي اللاعب والعملات وبعض قطع الحمم. ولا تقتصر مواضع هذه العناصر على الشبكة — إذ يمكن أن تكون إحداثياتها كسرية، مما يتيح حركة سلسة.</p>
<h2 id="التقنية">التقنية</h2>
<p>سنستخدم DOM الخاص بالمتصفح لعرض اللعبة، وسنقرأ مدخلات المستخدم عبر معالجة أحداث المفاتيح.</p>
<p>الشيفرة المتعلقة بالشاشة ولوحة المفاتيح ليست إلا جزءاً صغيراً من العمل اللازم لبناء هذه اللعبة. ولأن كل شيء يبدو كصناديق ملوّنة، فالرسم غير معقد: ننشئ عناصر DOM ونستخدم التنسيق لإعطائها لون خلفية وحجماً وموضعاً.</p>
<p>يمكننا تمثيل الخلفية كجدول، لأنها شبكة مربعات ثابتة لا تتغير. ويمكن تركيب العناصر المتحركة بحرية فوقها باستخدام عناصر ذات تموضع مطلق.</p>
<p>في الألعاب وغيرها من البرامج التي ينبغي أن تحرّك الرسوميات وتستجيب لمدخلات المستخدم دون تأخير ملحوظ، تعد الكفاءة مهمة. ورغم أن DOM لم يُصمَّم في الأصل لرسوميات عالية الأداء، فهو في الواقع أفضل في هذا مما تتوقع. لقد رأيت بعض الرسوم المتحركة في <a href="/chapter/the_document_object_model#animation">الفصل 14</a>. وعلى جهاز حديث، تؤدي لعبة بسيطة كهذه أداءً جيداً، حتى إن لم نبالغ في الاهتمام بالتحسين.</p>
<p>وفي <a href="/chapter/drawing_on_canvas">الفصل التالي</a>، سنستكشف تقنية أخرى من تقنيات المتصفح، وهي وسم <code>&lt;canvas&gt;</code>، الذي يوفر طريقة أكثر تقليدية لرسم الرسوميات، إذ يعمل بالأشكال والبكسلات بدلاً من عناصر DOM.</p>
<h2 id="المستويات">المستويات</h2>
<p>سنحتاج إلى طريقة مقروءة وقابلة للتحرير بشرياً لتحديد المستويات. ولأنه لا بأس في أن يبدأ كل شيء على شبكة، يمكننا استخدام نصوص كبيرة يمثل فيها كل حرف عنصراً — إما جزءاً من شبكة الخلفية أو عنصراً متحركاً.</p>
<p>قد تبدو خطة مستوى صغير هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> simpleLevelPlan = <span class="hljs-string">\`
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................\`</span>;
</code></pre>
<p>النقاط مساحات فارغة، ومحارف المربّع (<code>#</code>) جدران، وعلامات الجمع حمم. وموضع انطلاق اللاعب هو علامة @. وكل حرف O عملة، وعلامة يساوي (<code>=</code>) في الأعلى كتلة حمم تتحرك ذهاباً وإياباً أفقياً.</p>
<p>سندعم نوعين إضافيين من الحمم المتحركة: فمحرف الأنبوب (<code>|</code>) ينشئ كتلاً تتحرك عمودياً، و<code>v</code> يشير إلى حمم <em>تقاطر</em> — حمم تتحرك عمودياً ولا ترتد ذهاباً وإياباً بل تنزل فقط، فتقفز عائدة إلى موضع انطلاقها عند ملامستها الأرضية.</p>
<p>تتكون اللعبة الكاملة من عدة مستويات يجب على اللاعب إكمالها. ويُكتمل المستوى عند جمع كل العملات. وإذا لمس اللاعب الحمم، أُعيد المستوى الحالي إلى موضع انطلاقه، وأمكنه المحاولة مجدداً.</p>
<h2 id="قراءة-مستوى">قراءة مستوى</h2>
<p>يخزّن الصنف التالي كائن مستوى. وينبغي أن يكون معطاه النص الذي يعرّف المستوى.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Level</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">plan</span>) {
    <span class="hljs-keyword">let</span> rows = plan.<span class="hljs-title function_">trim</span>().<span class="hljs-title function_">split</span>(<span class="hljs-string">&quot;\\n&quot;</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">l</span> =&gt;</span> [...l]);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">height</span> = rows.<span class="hljs-property">length</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">width</span> = rows[<span class="hljs-number">0</span>].<span class="hljs-property">length</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">startActors</span> = [];

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">rows</span> = rows.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">row, y</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> row.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">ch, x</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> type = levelChars[ch];
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> type != <span class="hljs-string">&quot;string&quot;</span>) {
          <span class="hljs-keyword">let</span> pos = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(x, y);
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">startActors</span>.<span class="hljs-title function_">push</span>(type.<span class="hljs-title function_">create</span>(pos, ch));
          type = <span class="hljs-string">&quot;empty&quot;</span>;
        }
        <span class="hljs-keyword">return</span> type;
      });
    });
  }
}
</code></pre>
<p>تُستخدم طريقة <code>trim</code> لإزالة المسافات البيضاء من بداية نص الخطة ونهايته. وهذا يسمح لخطة مثالنا بأن تبدأ بسطر جديد كي تكون كل الأسطر متتالية مباشرة. ثم يُقسَّم النص المتبقي عند محارف الأسطر الجديدة، ويُنثر كل سطر في مصفوفة، فنحصل على مصفوفات من المحارف.</p>
<p>إذن يحمل <code>rows</code> مصفوفة من مصفوفات المحارف، أي أسطر الخطة. ويمكننا استنتاج عرض المستوى وارتفاعه منها. لكن يجب علينا مع ذلك فصل العناصر المتحركة عن شبكة الخلفية. سنسمي العناصر المتحركة <em>فاعلين</em> (actors). وستُخزَّن في مصفوفة من الكائنات. أما الخلفية فستكون مصفوفة من مصفوفات النصوص، تحمل أنواع الخانات مثل <code>&quot;empty&quot;</code> أو <code>&quot;wall&quot;</code> أو <code>&quot;lava&quot;</code>.</p>
<p>لإنشاء هذه المصفوفات، نمرّ بدالة map على الأسطر ثم على محتواها. تذكّر أن <code>map</code> تمرر فهرس المصفوفة كمعطى ثانٍ إلى دالة التحويل، وهذا يخبرنا بإحداثيي x وy لمحرف معطى. وستُخزَّن المواضع في اللعبة كأزواج من الإحداثيات، حيث يكون أعلى اليسار 0,0 وكل مربع خلفية وحدة واحدة عرضاً وارتفاعاً.</p>
<p>لتفسير المحارف في الخطة، يستخدم باني <code>Level</code> كائن <code>levelChars</code>، الذي يحمل لكل محرف مستخدم في وصف المستويات نصاً إذا كان نوع خلفية، وصنفاً إذا كان ينتج فاعلاً. وعندما يكون <code>type</code> صنف فاعل، تُستخدم طريقته الساكنة <code>create</code> لإنشاء كائن يُضاف إلى <code>startActors</code>، وتعيد دالة التحويل <code>&quot;empty&quot;</code> لخانة الخلفية هذه.</p>
<p>يُخزَّن موضع الفاعل ككائن <code>Vec</code>. وهذا متجه ثنائي الأبعاد، أي كائن بخاصيتين <code>x</code> و<code>y</code>، كما رأيت في تمارين <a href="/chapter/the_secret_life_of_objects#exercise_vector">الفصل 6</a>.</p>
<p>أثناء سير اللعبة، سينتهي الفاعلون في مواضع مختلفة أو سيختفون تماماً (كما تفعل العملات عند جمعها). وسنستخدم صنف <code>State</code> لتتبع حالة لعبة جارية.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">level, actors, status</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span> = level;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">actors</span> = actors;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">status</span> = status;
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">start</span>(<span class="hljs-params">level</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">State</span>(level, level.<span class="hljs-property">startActors</span>, <span class="hljs-string">&quot;playing&quot;</span>);
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">player</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">actors</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;player&quot;</span>);
  }
}
</code></pre>
<p>ستتحول خاصية <code>status</code> إلى <code>&quot;lost&quot;</code> أو <code>&quot;won&quot;</code> عند انتهاء اللعبة.</p>
<p>وهذه مرة أخرى بنية بيانات مستدامة — فتحديث حالة اللعبة ينشئ حالة جديدة ويترك القديمة سليمة.</p>
<h2 id="الفاعلون">الفاعلون</h2>
<p>تمثل كائنات الفاعلين الموضع والحالة الحاليين لعنصر متحرك معطى (لاعب أو عملة أو حمم متحركة) في لعبتنا. وتتوافق كل كائنات الفاعلين مع الواجهة نفسها. فلها خاصيتا <code>size</code> و<code>pos</code> تحملان حجم المستطيل الممثل للفاعل وإحداثيات زاويته العليا اليسرى، وطريقة <code>update</code>.</p>
<p>تُستخدم طريقة <code>update</code> هذه لحساب حالتهم وموضعهم الجديدين بعد خطوة زمنية معطاة. وهي تحاكي ما يفعله الفاعل — التحرك استجابة لمفاتيح الأسهم بالنسبة للاعب، والارتداد ذهاباً وإياباً بالنسبة للحمم — وتعيد كائن فاعل جديداً محدّثاً.</p>
<p>تحتوي خاصية <code>type</code> على نص يحدد نوع الفاعل — <code>&quot;player&quot;</code> أو <code>&quot;coin&quot;</code> أو <code>&quot;lava&quot;</code>. وهذا مفيد عند رسم اللعبة — إذ يعتمد شكل المستطيل المرسوم للفاعل على نوعه.</p>
<p>لأصناف الفاعلين طريقة ساكنة <code>create</code> يستخدمها باني <code>Level</code> لإنشاء فاعل من محرف في خطة المستوى. وتُعطى إحداثيات المحرف والمحرف نفسه، وهذا ضروري لأن صنف <code>Lava</code> يتعامل مع عدة محارف مختلفة.</p>
<p>هذا صنف <code>Vec</code> الذي سنستخدمه لقيمنا ثنائية الأبعاد، مثل موضع الفاعلين وحجمهم.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vec</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">x, y</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span> = x; <span class="hljs-variable language_">this</span>.<span class="hljs-property">y</span> = y;
  }
  <span class="hljs-title function_">plus</span>(<span class="hljs-params">other</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span> + other.<span class="hljs-property">x</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">y</span> + other.<span class="hljs-property">y</span>);
  }
  <span class="hljs-title function_">times</span>(<span class="hljs-params">factor</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span> * factor, <span class="hljs-variable language_">this</span>.<span class="hljs-property">y</span> * factor);
  }
}
</code></pre>
<p>توسّع طريقة <code>times</code> متجهاً بعدد معطى. وستكون مفيدة عندما نحتاج إلى ضرب متجه سرعة في فترة زمنية للحصول على المسافة المقطوعة خلال تلك الفترة.</p>
<p>تحصل أنواع الفاعلين المختلفة على أصنافها الخاصة، لأن سلوكها مختلف جداً. لنعرّف هذه الأصناف. وسنصل إلى طرق <code>update</code> الخاصة بها لاحقاً.</p>
<p>لصنف اللاعب خاصية <code>speed</code> تخزّن سرعته الحالية لمحاكاة الزخم والجاذبية.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Player</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">pos, speed</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span> = pos;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span> = speed;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">type</span>() { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;player&quot;</span>; }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">create</span>(<span class="hljs-params">pos</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Player</span>(pos.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, -<span class="hljs-number">0.5</span>)),
                      <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
  }
}

<span class="hljs-title class_">Player</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">size</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">1.5</span>);
</code></pre>
<p>ولأن اللاعب يبلغ ارتفاعه مربعاً ونصف مربع، يُضبط موضعه الابتدائي على ارتفاع نصف مربع فوق الموضع الذي ظهر فيه محرف <code>@</code>. وبهذه الطريقة تتحاذى قاعدته مع قاعدة المربع الذي ظهر فيه.</p>
<p>خاصية <code>size</code> نفسها لجميع نسخ <code>Player</code>، لذا نخزّنها على النموذج الأولي (prototype) بدلاً من النسخ نفسها. كان يمكننا استخدام دالة جلب مثل <code>type</code>، لكن ذلك سينشئ ويعيد كائن <code>Vec</code> جديداً في كل مرة تُقرأ فيها الخاصية، وهذا إهدار. (النصوص، لكونها غير قابلة للتغيير، لا يلزم إعادة إنشائها في كل مرة تُقيَّم فيها.)</p>
<p>عند إنشاء فاعل <code>Lava</code>، نحتاج إلى تهيئة الكائن بشكل مختلف حسب المحرف الذي يستند إليه. تتحرك الحمم الديناميكية بسرعتها الحالية حتى تصطدم بعائق. وعندئذ، إذا كانت تملك خاصية <code>reset</code>، فستقفز عائدة إلى موضع انطلاقها (تقاطر). وإذا لم تملكها، فستعكس سرعتها وتواصل في الاتجاه الآخر (ارتداد).</p>
<p>تنظر طريقة <code>create</code> إلى المحرف الذي يمرره باني <code>Level</code> وتنشئ فاعل الحمم المناسب.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Lava</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">pos, speed, reset</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span> = pos;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span> = speed;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span> = reset;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">type</span>() { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;lava&quot;</span>; }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">create</span>(<span class="hljs-params">pos, ch</span>) {
    <span class="hljs-keyword">if</span> (ch == <span class="hljs-string">&quot;=&quot;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(pos, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ch == <span class="hljs-string">&quot;|&quot;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(pos, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ch == <span class="hljs-string">&quot;v&quot;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(pos, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>), pos);
    }
  }
}

<span class="hljs-title class_">Lava</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">size</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
</code></pre>
<p>فاعلو <code>Coin</code> بسيطون نسبياً. فهم غالباً يلزمون أماكنهم فقط. لكن لإضفاء بعض الحيوية على اللعبة، مُنحوا «تذبذباً»، أي حركة عمودية طفيفة ذهاباً وإياباً. ولتتبع ذلك، يخزّن كائن العملة موضعاً أساسياً إضافة إلى خاصية <code>wobble</code> تتتبع طور حركة الارتداد. ومعاً، يحدد هذان موضع العملة الفعلي (المخزّن في خاصية <code>pos</code>).</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coin</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">pos, basePos, wobble</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span> = pos;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">basePos</span> = basePos;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">wobble</span> = wobble;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">type</span>() { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;coin&quot;</span>; }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">create</span>(<span class="hljs-params">pos</span>) {
    <span class="hljs-keyword">let</span> basePos = pos.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0.2</span>, <span class="hljs-number">0.1</span>));
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Coin</span>(basePos, basePos,
                    <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * <span class="hljs-number">2</span>);
  }
}

<span class="hljs-title class_">Coin</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">size</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0.6</span>, <span class="hljs-number">0.6</span>);
</code></pre>
<p>رأينا في <a href="/chapter/the_document_object_model#sin_cos">الفصل 14</a> أن <code>Math.sin</code> يعطينا الإحداثي y لنقطة على دائرة. ويتحرك هذا الإحداثي ذهاباً وإياباً في موجة ناعمة بينما نتحرك على محيط الدائرة، وهذا يجعل دالة الجيب مفيدة لنمذجة حركة موجية.</p>
<p>ولتجنب أن تتحرك كل العملات صعوداً وهبوطاً بالتزامن، تُجعل المرحلة الابتدائية لكل عملة عشوائية. ودورة موجة <code>Math.sin</code>، أي عرض الموجة التي تنتجها، هي 2π. ونضرب القيمة التي يعيدها <code>Math.random</code> في ذلك العدد لنمنح العملة موضعاً ابتدائياً عشوائياً على الموجة.</p>
<p>يمكننا الآن تعريف كائن <code>levelChars</code> الذي يربط محارف الخطة إما بأنواع شبكة الخلفية أو بأصناف الفاعلين.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> levelChars = {
  <span class="hljs-string">&quot;.&quot;</span>: <span class="hljs-string">&quot;empty&quot;</span>, <span class="hljs-string">&quot;#&quot;</span>: <span class="hljs-string">&quot;wall&quot;</span>, <span class="hljs-string">&quot;+&quot;</span>: <span class="hljs-string">&quot;lava&quot;</span>,
  <span class="hljs-string">&quot;@&quot;</span>: <span class="hljs-title class_">Player</span>, <span class="hljs-string">&quot;o&quot;</span>: <span class="hljs-title class_">Coin</span>,
  <span class="hljs-string">&quot;=&quot;</span>: <span class="hljs-title class_">Lava</span>, <span class="hljs-string">&quot;|&quot;</span>: <span class="hljs-title class_">Lava</span>, <span class="hljs-string">&quot;v&quot;</span>: <span class="hljs-title class_">Lava</span>
};
</code></pre>
<p>وهكذا صارت لدينا كل الأجزاء اللازمة لإنشاء نسخة <code>Level</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">let</span> simpleLevel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Level</span>(simpleLevelPlan);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${simpleLevel.width}</span> by <span class="hljs-subst">\${simpleLevel.height}</span>\`</span>);
<span class="hljs-comment">// → 22 by 9</span>
</code></pre>
<p>المهمة المقبلة هي عرض مستويات كهذه على الشاشة ونمذجة الزمن والحركة داخلها.</p>
<h2 id="الرسم">الرسم</h2>
<p>سنعرض اللعبة نفسها في <a href="/chapter/drawing_on_canvas#canvasdisplay">الفصل التالي</a> بطريقة مختلفة. ولجعل ذلك ممكناً، نضع منطق الرسم خلف واجهة ونمرره إلى اللعبة كمعطى. وبهذه الطريقة يمكننا استخدام برنامج اللعبة نفسه مع وحدات عرض جديدة مختلفة.</p>
<p>يرسم كائن عرض اللعبة مستوى وحالة معطيين. ونمرر بانيه إلى اللعبة للسماح باستبداله. وصنف العرض الذي نعرّفه في هذا الفصل اسمه <code>DOMDisplay</code> لأنه يستخدم عناصر DOM لإظهار المستوى.</p>
<p>سنستخدم ورقة أنماط لضبط الألوان الفعلية وغيرها من الخصائص الثابتة للعناصر المكوّنة للعبة. كان ممكناً أيضاً الإسناد المباشر إلى خاصية <code>style</code> للعناصر عند إنشائها، لكن ذلك سينتج برامج أكثر إسهاباً.</p>
<p>تقدم دالة المساعدة التالية طريقة موجزة لإنشاء عنصر وإعطائه بعض الخصائص والعقد الفرعية:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">elt</span>(<span class="hljs-params">name, attrs, ...children</span>) {
  <span class="hljs-keyword">let</span> dom = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(name);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attr <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(attrs)) {
    dom.<span class="hljs-title function_">setAttribute</span>(attr, attrs[attr]);
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> child <span class="hljs-keyword">of</span> children) {
    dom.<span class="hljs-title function_">appendChild</span>(child);
  }
  <span class="hljs-keyword">return</span> dom;
}
</code></pre>
<p>يُنشأ العرض بإعطائه عنصراً أباً ليلحق نفسه به، وكائن مستوى.</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">DOMDisplay</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">parent, level</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span> = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, {<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;game&quot;</span>}, <span class="hljs-title function_">drawGrid</span>(level));
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">actorLayer</span> = <span class="hljs-literal">null</span>;
    parent.<span class="hljs-title function_">appendChild</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>);
  }

  <span class="hljs-title function_">clear</span>(<span class="hljs-params"></span>) { <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-title function_">remove</span>(); }
}
</code></pre>
<p>تُرسم شبكة خلفية المستوى، التي لا تتغير أبداً، مرة واحدة. أما الفاعلون فيُعاد رسمهم في كل مرة يُحدَّث فيها العرض بحالة معطاة. وستُستخدم خاصية <code>actorLayer</code> لتتبع العنصر الحاوي للفاعلين بحيث يسهل إزالتهم واستبدالهم.</p>
<p>نتتبع إحداثياتنا وأحجامنا بوحدات الشبكة، حيث يعني حجم أو مسافة تساوي 1 مربعاً واحداً من الشبكة. وعند ضبط الأحجام بالبكسل، سيتعين علينا تكبير هذه الإحداثيات — فكل شيء في اللعبة سيكون صغيراً بشكل سخيف عند بكسل واحد لكل مربع. ويمثل الثابت <code>scale</code> عدد البكسلات التي تشغلها وحدة واحدة على الشاشة.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> scale = <span class="hljs-number">20</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">drawGrid</span>(<span class="hljs-params">level</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;table&quot;</span>, {
    <span class="hljs-attr">class</span>: <span class="hljs-string">&quot;background&quot;</span>,
    <span class="hljs-attr">style</span>: <span class="hljs-string">\`width: <span class="hljs-subst">\${level.width * scale}</span>px\`</span>
  }, ...level.<span class="hljs-property">rows</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">row</span> =&gt;</span>
    <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;tr&quot;</span>, {<span class="hljs-attr">style</span>: <span class="hljs-string">\`height: <span class="hljs-subst">\${scale}</span>px\`</span>},
        ...row.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;td&quot;</span>, {<span class="hljs-attr">class</span>: type})))
  ));
}
</code></pre>
<p>يتوافق شكل عنصر <code>&lt;table&gt;</code> توافقاً جميلاً مع بنية خاصية <code>rows</code> في المستوى — إذ يتحول كل سطر من الشبكة إلى سطر جدول (عنصر <code>&lt;tr&gt;</code>). وتُستخدم النصوص في الشبكة كأسماء أصناف لعناصر خلايا الجدول (<code>&lt;td&gt;</code>). وتستخدم الشيفرة معامل النشر (النقاط الثلاث) لتمرير مصفوفات من العقد الفرعية إلى <code>elt</code> كمعطيات منفصلة.</p>
<p>تجعل شيفرة CSS التالية الجدول يبدو كالخلفية التي نريدها:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.background</span>    { <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(<span class="hljs-number">52</span>, <span class="hljs-number">166</span>, <span class="hljs-number">251</span>);
                 <span class="hljs-attribute">table-layout</span>: fixed;
                 <span class="hljs-attribute">border-spacing</span>: <span class="hljs-number">0</span>;              }
<span class="hljs-selector-class">.background</span> <span class="hljs-selector-tag">td</span> { <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;                     }
<span class="hljs-selector-class">.lava</span>          { <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(<span class="hljs-number">255</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>); }
<span class="hljs-selector-class">.wall</span>          { <span class="hljs-attribute">background</span>: white;              }
</code></pre>
<p>بعض هذه الخصائص (<code>table-layout</code> و<code>border-spacing</code> و<code>padding</code>) تُستخدم لكبت السلوك الافتراضي غير المرغوب. فنحن لا نريد أن يعتمد تخطيط الجدول على محتويات خلاياه، ولا نريد فراغاً بين خلايا الجدول أو حشواً داخلها.</p>
<p>تضبط القاعدة <code>background</code> لون الخلفية. وتتيح CSS تحديد الألوان بكلمات (<code>white</code>) أو بصيغة مثل <code>rgb(R, G, B)</code>، حيث تُفصل المكونات الأحمر والأخضر والأزرق للون في ثلاثة أعداد من 0 إلى 255. في <code>rgb(52, 166, 251)</code> يكون المكوّن الأحمر 52 والأخضر 166 والأزرق 251. ولأن المكوّن الأزرق هو الأكبر، سيكون اللون الناتج مائلاً إلى الأزرق. وفي القاعدة <code>.lava</code> يكون العدد الأول (الأحمر) هو الأكبر.</p>
<p>نرسم كل فاعل بإنشاء عنصر DOM له وضبط موضع ذلك العنصر وحجمه بناءً على خصائص الفاعل. ويجب ضرب القيم في <code>scale</code> للانتقال من وحدات اللعبة إلى البكسلات.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">drawActors</span>(<span class="hljs-params">actors</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, {}, ...actors.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">actor</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> rect = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, {<span class="hljs-attr">class</span>: <span class="hljs-string">\`actor <span class="hljs-subst">\${actor.type}</span>\`</span>});
    rect.<span class="hljs-property">style</span>.<span class="hljs-property">width</span> = <span class="hljs-string">\`<span class="hljs-subst">\${actor.size.x * scale}</span>px\`</span>;
    rect.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${actor.size.y * scale}</span>px\`</span>;
    rect.<span class="hljs-property">style</span>.<span class="hljs-property">left</span> = <span class="hljs-string">\`<span class="hljs-subst">\${actor.pos.x * scale}</span>px\`</span>;
    rect.<span class="hljs-property">style</span>.<span class="hljs-property">top</span> = <span class="hljs-string">\`<span class="hljs-subst">\${actor.pos.y * scale}</span>px\`</span>;
    <span class="hljs-keyword">return</span> rect;
  }));
}
</code></pre>
<p>لإعطاء عنصر أكثر من صنف واحد، نفصل أسماء الأصناف بمسافات. في شيفرة CSS التالية، يمنح الصنف <code>actor</code> الفاعلين تموضعهم المطلق. ويُستخدم اسم نوعهم كصنف إضافي لإعطائهم لوناً. ولا يلزم تعريف الصنف <code>lava</code> مجدداً لأننا نعيد استخدام صنف مربعات شبكة الحمم الذي عرّفناه سابقاً.</p>
<pre><code class="language-css"><span class="hljs-selector-class">.actor</span>  { <span class="hljs-attribute">position</span>: absolute;            }
<span class="hljs-selector-class">.coin</span>   { <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(<span class="hljs-number">241</span>, <span class="hljs-number">229</span>, <span class="hljs-number">89</span>); }
<span class="hljs-selector-class">.player</span> { <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(<span class="hljs-number">64</span>, <span class="hljs-number">64</span>, <span class="hljs-number">64</span>);   }
</code></pre>
<p>تُستخدم طريقة <code>syncState</code> لجعل العرض يُظهر حالة معطاة. فهي تزيل أولاً رسوم الفاعلين القديمة، إن وُجدت، ثم تعيد رسم الفاعلين في مواضعهم الجديدة. قد يغريك أن تحاول إعادة استخدام عناصر DOM الخاصة بالفاعلين، لكن لجعل ذلك يعمل سنحتاج إلى قدر كبير من المسك الإضافي لربط الفاعلين بعناصر DOM والتأكد من إزالة العناصر عند اختفاء فاعليها. ولأن عدد الفاعلين في اللعبة سيكون عادة حفنة فقط، فإعادة رسمهم جميعاً ليست مكلفة.</p>
<pre><code class="language-js"><span class="hljs-title class_">DOMDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">syncState</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">actorLayer</span>) <span class="hljs-variable language_">this</span>.<span class="hljs-property">actorLayer</span>.<span class="hljs-title function_">remove</span>();
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">actorLayer</span> = <span class="hljs-title function_">drawActors</span>(state.<span class="hljs-property">actors</span>);
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-title function_">appendChild</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">actorLayer</span>);
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">className</span> = <span class="hljs-string">\`game <span class="hljs-subst">\${state.status}</span>\`</span>;
  <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scrollPlayerIntoView</span>(state);
};
</code></pre>
<p>بإضافة الحالة الحالية للمستوى كاسم صنف إلى الغلاف، يمكننا تنسيق فاعل اللاعب بشكل مختلف قليلاً عند الفوز أو الخسارة، عبر إضافة قاعدة CSS لا تسري إلا عندما يكون للاعب عنصر سلف يحمل صنفاً معطى.</p>
<pre><code class="language-css"><span class="hljs-selector-class">.lost</span> <span class="hljs-selector-class">.player</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(<span class="hljs-number">160</span>, <span class="hljs-number">64</span>, <span class="hljs-number">64</span>);
}
<span class="hljs-selector-class">.won</span> <span class="hljs-selector-class">.player</span> {
  <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">4px</span> -<span class="hljs-number">7px</span> <span class="hljs-number">8px</span> white, <span class="hljs-number">4px</span> -<span class="hljs-number">7px</span> <span class="hljs-number">8px</span> white;
}
</code></pre>
<p>بعد ملامسة الحمم، يتحول اللاعب إلى أحمر داكن، مما يوحي بالاحتراق. وعند جمع آخر عملة، نضيف ظلين أبيضين مموّهين — أحدهما إلى أعلى اليسار والآخر إلى أعلى اليمين — لإنشاء تأثير هالة بيضاء.</p>
<p>لا يمكننا افتراض أن المستوى يتسع دائماً داخل <em>منطقة العرض</em> (viewport)، أي العنصر الذي نرسم اللعبة فيه. ولهذا نحتاج إلى استدعاء <code>scrollPlayerIntoView</code>: فهو يضمن أنه إذا كان المستوى يبرز خارج منطقة العرض، نمرر تلك المنطقة لضمان أن يكون اللاعب قرب مركزها. تمنح شيفرة CSS التالية عنصر DOM الغلاف للعبة حجماً أقصى وتضمن ألا يكون أي شيء يبرز خارج صندوق العنصر مرئياً. كما نمنحه تموضعاً نسبياً بحيث يتموضع الفاعلون بداخله نسبةً إلى الزاوية العليا اليسرى للمستوى.</p>
<pre><code class="language-css"><span class="hljs-selector-class">.game</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">max-height</span>: <span class="hljs-number">450px</span>;
  <span class="hljs-attribute">position</span>: relative;
}
</code></pre>
<p>في طريقة <code>scrollPlayerIntoView</code>، نجد موضع اللاعب ونحدّث موضع التمرير للعنصر الغلاف. ونغيّر موضع التمرير بالتلاعب بخاصيتي <code>scrollLeft</code> و<code>scrollTop</code> لذلك العنصر عندما يكون اللاعب قريباً جداً من الحافة.</p>
<pre><code class="language-js"><span class="hljs-title class_">DOMDisplay</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">scrollPlayerIntoView</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-keyword">let</span> width = <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">clientWidth</span>;
  <span class="hljs-keyword">let</span> height = <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">clientHeight</span>;
  <span class="hljs-keyword">let</span> margin = width / <span class="hljs-number">3</span>;

  <span class="hljs-comment">// منطقة العرض</span>
  <span class="hljs-keyword">let</span> left = <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollLeft</span>, right = left + width;
  <span class="hljs-keyword">let</span> top = <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollTop</span>, bottom = top + height;

  <span class="hljs-keyword">let</span> player = state.<span class="hljs-property">player</span>;
  <span class="hljs-keyword">let</span> center = player.<span class="hljs-property">pos</span>.<span class="hljs-title function_">plus</span>(player.<span class="hljs-property">size</span>.<span class="hljs-title function_">times</span>(<span class="hljs-number">0.5</span>))
                         .<span class="hljs-title function_">times</span>(scale);

  <span class="hljs-keyword">if</span> (center.<span class="hljs-property">x</span> &lt; left + margin) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollLeft</span> = center.<span class="hljs-property">x</span> - margin;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (center.<span class="hljs-property">x</span> &gt; right - margin) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollLeft</span> = center.<span class="hljs-property">x</span> + margin - width;
  }
  <span class="hljs-keyword">if</span> (center.<span class="hljs-property">y</span> &lt; top + margin) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollTop</span> = center.<span class="hljs-property">y</span> - margin;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (center.<span class="hljs-property">y</span> &gt; bottom - margin) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span>.<span class="hljs-property">scrollTop</span> = center.<span class="hljs-property">y</span> + margin - height;
  }
};
</code></pre>
<p>تُظهر طريقة إيجاد مركز اللاعب كيف تتيح الطرق على نوع <code>Vec</code> كتابة الحسابات بالكائنات بطريقة مقروءة نسبياً. لإيجاد مركز الفاعل، نضيف موضعه (زاويته العليا اليسرى) ونصف حجمه. هذا هو المركز بإحداثيات المستوى، لكننا نحتاجه بإحداثيات البكسل، لذا نضرب المتجه الناتج في مقياس العرض لدينا.</p>
<p>بعد ذلك، تتحقق سلسلة من الفحوص من أن موضع اللاعب ليس خارج النطاق المسموح. لاحظ أن هذا سيضبط أحياناً إحداثيات تمرير غير منطقية تقل عن الصفر أو تتجاوز منطقة التمرير في العنصر. لا بأس بذلك — فـ DOM سيقيدها إلى قيم مقبولة. فضبط <code>scrollLeft</code> على <code>-10</code> سيجعله يصبح <code>0</code>.</p>
<p>مع أن محاولة تمرير اللاعب دائماً إلى مركز منطقة العرض كانت ستكون أبسط قليلاً، فإنها تُنشئ تأثيراً مزعجاً إلى حد ما. فأثناء قفزك، ستتحرك الرؤية صعوداً وهبوطاً باستمرار. ومن الألطف وجود منطقة «محايدة» في منتصف الشاشة يمكنك التحرك داخلها دون إحداث أي تمرير.</p>
<p>أصبحنا الآن قادرين على عرض مستوانا الصغير.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;css/game.css&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> simpleLevel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Level</span>(simpleLevelPlan);
  <span class="hljs-keyword">let</span> display = <span class="hljs-keyword">new</span> <span class="hljs-title class_">DOMDisplay</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>, simpleLevel);
  display.<span class="hljs-title function_">syncState</span>(<span class="hljs-title class_">State</span>.<span class="hljs-title function_">start</span>(simpleLevel));
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>وسم <code>&lt;link&gt;</code>، عند استخدامه مع <code>rel=&quot;stylesheet&quot;</code>، طريقة لتحميل ملف CSS في صفحة. ويحتوي الملف <code>game.css</code> على الأنماط اللازمة للعبتنا.</p>
<h2 id="الحركة-والتصادم">الحركة والتصادم</h2>
<p>وصلنا الآن إلى النقطة التي يمكننا فيها البدء بإضافة الحركة. النهج الأساسي الذي تتبعه معظم الألعاب كهذه هو تقسيم الزمن إلى خطوات صغيرة، وفي كل خطوة تحريك الفاعلين مسافة تقابل سرعتهم مضروبة في حجم الخطوة الزمنية. وسنقيس الزمن بالثواني، لذا تُعبَّر السرعات بوحدات في الثانية.</p>
<p>تحريك الأشياء سهل. الجزء الصعب هو التعامل مع التفاعلات بين العناصر. فعندما يصطدم اللاعب بجدار أو أرضية، لا ينبغي أن يمر عبرها ببساطة. ويجب أن تلاحظ اللعبة عندما تؤدي حركة معطاة إلى اصطدام كائن بآخر وأن تستجيب وفقاً لذلك. فمع الجدران يجب إيقاف الحركة. وعند الاصطدام بعملة يجب جمع تلك العملة. وعند ملامسة الحمم ينبغي خسارة اللعبة.</p>
<p>حل هذه المشكلة في الحالة العامة مهمة كبيرة. يمكنك إيجاد مكتبات، تُسمى عادة <em>محركات فيزياء</em> (physics engines)، تحاكي التفاعل بين الأجسام الفيزيائية في بعدين أو ثلاثة. وسنتخذ في هذا الفصل نهجاً أكثر تواضعاً، إذ نتعامل فقط مع التصادمات بين الأجسام المستطيلة وبطريقة مبسطة إلى حد ما.</p>
<p>قبل تحريك اللاعب أو كتلة حمم، نختبر ما إذا كانت الحركة ستأخذه إلى داخل جدار. فإن كان الأمر كذلك، نلغي الحركة كلياً ببساطة. وتعتمد الاستجابة لمثل هذا التصادم على نوع الفاعل — فاللاعب سيتوقف، بينما كتلة الحمم سترتد.</p>
<p>يتطلب هذا النهج أن تكون خطواتنا الزمنية صغيرة نوعاً ما، لأنه سيؤدي إلى توقف الحركة قبل أن تلامس الأجسام فعلاً. وإذا كانت الخطوات الزمنية (وبالتالي خطوات الحركة) كبيرة جداً، سينتهي اللاعب معلقاً على مسافة ملحوظة فوق الأرض. وهناك نهج آخر، قد يُقال إنه أفضل لكنه أكثر تعقيداً، وهو إيجاد نقطة التصادم الدقيقة والانتقال إليها. وسنتخذ النهج البسيط ونخفي مشكلاته بضمان أن تسير الرسوم المتحركة في خطوات صغيرة.</p>
<p>تخبرنا هذه الطريقة ما إذا كان مستطيل (محدد بموضع وحجم) يلامس عنصر شبكة من النوع المعطى.</p>
<pre><code class="language-js"><span class="hljs-title class_">Level</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">touches</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">pos, size, type</span>) {
  <span class="hljs-keyword">let</span> xStart = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(pos.<span class="hljs-property">x</span>);
  <span class="hljs-keyword">let</span> xEnd = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(pos.<span class="hljs-property">x</span> + size.<span class="hljs-property">x</span>);
  <span class="hljs-keyword">let</span> yStart = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(pos.<span class="hljs-property">y</span>);
  <span class="hljs-keyword">let</span> yEnd = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(pos.<span class="hljs-property">y</span> + size.<span class="hljs-property">y</span>);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = yStart; y &lt; yEnd; y++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = xStart; x &lt; xEnd; x++) {
      <span class="hljs-keyword">let</span> isOutside = x &lt; <span class="hljs-number">0</span> || x &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">width</span> ||
                      y &lt; <span class="hljs-number">0</span> || y &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">height</span>;
      <span class="hljs-keyword">let</span> here = isOutside ? <span class="hljs-string">&quot;wall&quot;</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">rows</span>[y][x];
      <span class="hljs-keyword">if</span> (here == type) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};
</code></pre>
<p>تحسب الطريقة مجموعة مربعات الشبكة التي يتقاطع معها الجسم باستخدام <code>Math.floor</code> و<code>Math.ceil</code> على إحداثياته. تذكّر أن مربعات الشبكة بحجم 1×1 وحدة. وبتقريب أضلاع الصندوق لأعلى ولأسفل، نحصل على نطاق مربعات الخلفية التي يلامسها الصندوق.</p>
<p><img src="/images/book/game-grid.svg" alt="مخطط يُظهر شبكة متراكب عليها صندوق أسود. جميع مربعات الشبكة المغطاة جزئياً بالكتلة معلَّمة."></p>
<p>نمر بحلقة على كتلة مربعات الشبكة التي وجدناها بتقريب الإحداثيات، ونعيد <code>true</code> عند إيجاد مربع مطابق. وتُعامَل المربعات خارج المستوى دائماً كـ<code>&quot;wall&quot;</code> لضمان ألا يستطيع اللاعب مغادرة العالم وألا نحاول عن غير قصد القراءة خارج حدود مصفوفة <code>rows</code> لدينا.</p>
<p>تستخدم طريقة <code>update</code> في الحالة <code>touches</code> لمعرفة ما إذا كان اللاعب يلامس الحمم.</p>
<pre><code class="language-js"><span class="hljs-title class_">State</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">update</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">time, keys</span>) {
  <span class="hljs-keyword">let</span> actors = <span class="hljs-variable language_">this</span>.<span class="hljs-property">actors</span>
    .<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">actor</span> =&gt;</span> actor.<span class="hljs-title function_">update</span>(time, <span class="hljs-variable language_">this</span>, keys));
  <span class="hljs-keyword">let</span> newState = <span class="hljs-keyword">new</span> <span class="hljs-title class_">State</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span>, actors, <span class="hljs-variable language_">this</span>.<span class="hljs-property">status</span>);

  <span class="hljs-keyword">if</span> (newState.<span class="hljs-property">status</span> != <span class="hljs-string">&quot;playing&quot;</span>) <span class="hljs-keyword">return</span> newState;

  <span class="hljs-keyword">let</span> player = newState.<span class="hljs-property">player</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span>.<span class="hljs-title function_">touches</span>(player.<span class="hljs-property">pos</span>, player.<span class="hljs-property">size</span>, <span class="hljs-string">&quot;lava&quot;</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">State</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span>, actors, <span class="hljs-string">&quot;lost&quot;</span>);
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> actor <span class="hljs-keyword">of</span> actors) {
    <span class="hljs-keyword">if</span> (actor != player &amp;&amp; <span class="hljs-title function_">overlap</span>(actor, player)) {
      newState = actor.<span class="hljs-title function_">collide</span>(newState);
    }
  }
  <span class="hljs-keyword">return</span> newState;
};
</code></pre>
<p>تُمرَّر إلى الطريقة خطوة زمنية وبنية بيانات تخبرها بالمفاتيح المضغوطة حالياً. وأول ما تفعله هو استدعاء طريقة <code>update</code> على كل الفاعلين، فتنتج مصفوفة من الفاعلين المحدّثين. ويحصل الفاعلون أيضاً على الخطوة الزمنية والمفاتيح والحالة ليبنيوا تحديثهم عليها. ولن يقرأ المفاتيح فعلاً إلا اللاعب، لأنه الفاعل الوحيد الذي تتحكم فيه لوحة المفاتيح.</p>
<p>إذا كانت اللعبة قد انتهت بالفعل، فلا حاجة إلى مزيد من المعالجة (فلا يمكن الفوز بعد الخسارة، أو العكس). وإلا، تختبر الطريقة ما إذا كان اللاعب يلامس حمم الخلفية. فإن كان كذلك، خُسرت اللعبة وانتهى الأمر. وأخيراً، إذا كانت اللعبة لا تزال جارية فعلاً، تتحقق مما إذا كان أي فاعل آخر يتقاطع مع اللاعب.</p>
<p>يُكتشف التقاطع بين الفاعلين بدالة <code>overlap</code>. وهي تأخذ كائني فاعلين وتعيد <code>true</code> عند تلامسهما — وهذا يحدث عندما يتقاطعان على محور x ومحور y معاً.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">overlap</span>(<span class="hljs-params">actor1, actor2</span>) {
  <span class="hljs-keyword">return</span> actor1.<span class="hljs-property">pos</span>.<span class="hljs-property">x</span> + actor1.<span class="hljs-property">size</span>.<span class="hljs-property">x</span> &gt; actor2.<span class="hljs-property">pos</span>.<span class="hljs-property">x</span> &amp;&amp;
         actor1.<span class="hljs-property">pos</span>.<span class="hljs-property">x</span> &lt; actor2.<span class="hljs-property">pos</span>.<span class="hljs-property">x</span> + actor2.<span class="hljs-property">size</span>.<span class="hljs-property">x</span> &amp;&amp;
         actor1.<span class="hljs-property">pos</span>.<span class="hljs-property">y</span> + actor1.<span class="hljs-property">size</span>.<span class="hljs-property">y</span> &gt; actor2.<span class="hljs-property">pos</span>.<span class="hljs-property">y</span> &amp;&amp;
         actor1.<span class="hljs-property">pos</span>.<span class="hljs-property">y</span> &lt; actor2.<span class="hljs-property">pos</span>.<span class="hljs-property">y</span> + actor2.<span class="hljs-property">size</span>.<span class="hljs-property">y</span>;
}
</code></pre>
<p>وإذا تقاطع أي فاعل فعلاً، تُمنح طريقته <code>collide</code> فرصة تحديث الحالة. فملامسة فاعل حمم تضبط حالة اللعبة على <code>&quot;lost&quot;</code>. وتختفي العملات عند ملامستها وتضبط الحالة على <code>&quot;won&quot;</code> عندما تكون آخر عملة في المستوى.</p>
<pre><code class="language-js"><span class="hljs-title class_">Lava</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">collide</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">State</span>(state.<span class="hljs-property">level</span>, state.<span class="hljs-property">actors</span>, <span class="hljs-string">&quot;lost&quot;</span>);
};

<span class="hljs-title class_">Coin</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">collide</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">state</span>) {
  <span class="hljs-keyword">let</span> filtered = state.<span class="hljs-property">actors</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a != <span class="hljs-variable language_">this</span>);
  <span class="hljs-keyword">let</span> status = state.<span class="hljs-property">status</span>;
  <span class="hljs-keyword">if</span> (!filtered.<span class="hljs-title function_">some</span>(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;coin&quot;</span>)) status = <span class="hljs-string">&quot;won&quot;</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">State</span>(state.<span class="hljs-property">level</span>, filtered, status);
};
</code></pre>
<h2 id="تحديثات-الفاعلين">تحديثات الفاعلين</h2>
<p>تأخذ طرق <code>update</code> لكائنات الفاعلين كمعطيات الخطوة الزمنية وكائن الحالة وكائن <code>keys</code>. أما طريقة نوع الفاعل <code>Lava</code> فتتجاهل كائن <code>keys</code>.</p>
<pre><code class="language-js"><span class="hljs-title class_">Lava</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">update</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">time, state</span>) {
  <span class="hljs-keyword">let</span> newPos = <span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span>.<span class="hljs-title function_">plus</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span>.<span class="hljs-title function_">times</span>(time));
  <span class="hljs-keyword">if</span> (!state.<span class="hljs-property">level</span>.<span class="hljs-title function_">touches</span>(newPos, <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>, <span class="hljs-string">&quot;wall&quot;</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(newPos, <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Lava</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span>.<span class="hljs-title function_">times</span>(-<span class="hljs-number">1</span>));
  }
};
</code></pre>
<p>تحسب طريقة <code>update</code> هذه موضعاً جديداً بإضافة حاصل ضرب الخطوة الزمنية في السرعة الحالية إلى موضعها القديم. فإن لم يعق أي عائق الموضع الجديد، انتقلت إليه. وإن وُجد عائق، اعتمد السلوك على نوع كتلة الحمم — فحمم التقاطر تملك موضع <code>reset</code> تقفز إليه عند اصطدامها بشيء. أما الحمم المرتدة فتعكس سرعتها بضربها في <code>-1</code> لتبدأ التحرك في الاتجاه المعاكس.</p>
<p>تستخدم العملات طريقة <code>update</code> الخاصة بها للتذبذب. وهي تتجاهل التصادمات مع الشبكة، لأنها تتذبذب ببساطة داخل مربعها.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> wobbleSpeed = <span class="hljs-number">8</span>, wobbleDist = <span class="hljs-number">0.07</span>;

<span class="hljs-title class_">Coin</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">update</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) {
  <span class="hljs-keyword">let</span> wobble = <span class="hljs-variable language_">this</span>.<span class="hljs-property">wobble</span> + time * wobbleSpeed;
  <span class="hljs-keyword">let</span> wobblePos = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sin</span>(wobble) * wobbleDist;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Coin</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">basePos</span>.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, wobblePos)),
                  <span class="hljs-variable language_">this</span>.<span class="hljs-property">basePos</span>, wobble);
};
</code></pre>
<p>تُزاد خاصية <code>wobble</code> لتتبع الزمن ثم تُستخدم كمعطى لـ<code>Math.sin</code> لإيجاد الموضع الجديد على الموجة. ثم يُحسب موضع العملة الحالي من موضعها الأساسي وإزاحة مبنية على هذه الموجة.</p>
<p>ويتبقى اللاعب نفسه. تُعالَج حركة اللاعب منفصلة لكل محور، لأن الاصطدام بالأرضية لا ينبغي أن يمنع الحركة الأفقية، والاصطدام بجدار لا ينبغي أن يوقف حركة السقوط أو القفز.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> playerXSpeed = <span class="hljs-number">7</span>;
<span class="hljs-keyword">const</span> gravity = <span class="hljs-number">30</span>;
<span class="hljs-keyword">const</span> jumpSpeed = <span class="hljs-number">17</span>;

<span class="hljs-title class_">Player</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">update</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">time, state, keys</span>) {
  <span class="hljs-keyword">let</span> xSpeed = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span> (keys.<span class="hljs-property">ArrowLeft</span>) xSpeed -= playerXSpeed;
  <span class="hljs-keyword">if</span> (keys.<span class="hljs-property">ArrowRight</span>) xSpeed += playerXSpeed;
  <span class="hljs-keyword">let</span> pos = <span class="hljs-variable language_">this</span>.<span class="hljs-property">pos</span>;
  <span class="hljs-keyword">let</span> movedX = pos.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(xSpeed * time, <span class="hljs-number">0</span>));
  <span class="hljs-keyword">if</span> (!state.<span class="hljs-property">level</span>.<span class="hljs-title function_">touches</span>(movedX, <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>, <span class="hljs-string">&quot;wall&quot;</span>)) {
    pos = movedX;
  }

  <span class="hljs-keyword">let</span> ySpeed = <span class="hljs-variable language_">this</span>.<span class="hljs-property">speed</span>.<span class="hljs-property">y</span> + time * gravity;
  <span class="hljs-keyword">let</span> movedY = pos.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, ySpeed * time));
  <span class="hljs-keyword">if</span> (!state.<span class="hljs-property">level</span>.<span class="hljs-title function_">touches</span>(movedY, <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>, <span class="hljs-string">&quot;wall&quot;</span>)) {
    pos = movedY;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (keys.<span class="hljs-property">ArrowUp</span> &amp;&amp; ySpeed &gt; <span class="hljs-number">0</span>) {
    ySpeed = -jumpSpeed;
  } <span class="hljs-keyword">else</span> {
    ySpeed = <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Player</span>(pos, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(xSpeed, ySpeed));
};
</code></pre>
<p>تُحسب الحركة الأفقية بناءً على حالة مفتاحي السهمين الأيسر والأيمن. وعندما لا يوجد جدار يعيق الموضع الجديد الذي أنشأته هذه الحركة، يُستخدم. وإلا، يُحتفظ بالموضع القديم.</p>
<p>تعمل الحركة العمودية بطريقة مشابهة لكن يجب أن تحاكي القفز والجاذبية. تُسرَّع سرعة اللاعب العمودية (<code>ySpeed</code>) أولاً لمراعاة الجاذبية.</p>
<p>نتحقق من الجدران مجدداً. فإن لم نصطدم بأي منها، يُستخدم الموضع الجديد. وإن <em>وُجد</em> جدار، فهناك نتيجتان محتملتان. فعندما يكون السهم الأعلى مضغوطاً <em>و</em>كنا نتحرك لأسفل (أي أن الشيء الذي اصطدمنا به تحتنا)، تُضبط السرعة على قيمة سالبة كبيرة نسبياً. وهذا يجعل اللاعب يقفز. وإن لم يكن الأمر كذلك، فاللاعب ارتطم بشيء فحسب، وتُضبط السرعة على صفر.</p>
<p>حُددت قوة الجاذبية وسرعة القفز وغيرهما من الثوابت في اللعبة بمجرد تجربة بعض الأعداد ورؤية أيها يبدو مناسباً. يمكنك أن تجرب العبث بها.</p>
<h2 id="تتبع-المفاتيح">تتبع المفاتيح</h2>
<p>في لعبة كهذه، لا نريد أن يكون للمفاتيح تأثير مرة واحدة عند كل ضغطة. بل نريد أن يبقى تأثيرها (تحريك شخصية اللاعب) فعّالاً ما دامت مضغوطة.</p>
<p>نحتاج إلى إعداد معالج مفاتيح يخزّن الحالة الحالية لمفاتيح الأسهم اليسرى واليمنى والعليا. وسنريد أيضاً استدعاء <code>preventDefault</code> لتلك المفاتيح كي لا ينتهي بها الأمر بتمرير الصفحة.</p>
<p>تعيد الدالة التالية، عند إعطائها مصفوفة من أسماء المفاتيح، كائناً يتتبع الحالة الحالية لتلك المفاتيح. وهي تسجل معالجات أحداث لحدثي <code>&quot;keydown&quot;</code> و<code>&quot;keyup&quot;</code>، وعندما يكون رمز المفتاح في الحدث ضمن مجموعة الرموز التي تتتبعها، تحدّث الكائن.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">trackKeys</span>(<span class="hljs-params">keys</span>) {
  <span class="hljs-keyword">let</span> down = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">track</span>(<span class="hljs-params">event</span>) {
    <span class="hljs-keyword">if</span> (keys.<span class="hljs-title function_">includes</span>(event.<span class="hljs-property">key</span>)) {
      down[event.<span class="hljs-property">key</span>] = event.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;keydown&quot;</span>;
      event.<span class="hljs-title function_">preventDefault</span>();
    }
  }
  <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;keydown&quot;</span>, track);
  <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;keyup&quot;</span>, track);
  <span class="hljs-keyword">return</span> down;
}

<span class="hljs-keyword">const</span> arrowKeys =
  <span class="hljs-title function_">trackKeys</span>([<span class="hljs-string">&quot;ArrowLeft&quot;</span>, <span class="hljs-string">&quot;ArrowRight&quot;</span>, <span class="hljs-string">&quot;ArrowUp&quot;</span>]);
</code></pre>
<p>تُستخدم دالة المعالجة نفسها لنوعي الحدثين معاً. وهي تنظر إلى خاصية <code>type</code> في كائن الحدث لتحديد ما إذا كان ينبغي تحديث حالة المفتاح إلى true (<code>&quot;keydown&quot;</code>) أو false (<code>&quot;keyup&quot;</code>).</p>
<h2 id="تشغيل-اللعبة">تشغيل اللعبة</h2>
<p>توفر دالة <code>requestAnimationFrame</code>، التي رأيناها في <a href="/chapter/the_document_object_model#animationFrame">الفصل 14</a>، طريقة جيدة لتحريك لعبة. لكن واجهتها بدائية إلى حد كبير — فاستخدامها يتطلب منا تتبع الوقت الذي استُدعيت فيه دالتنا في المرة السابقة واستدعاء <code>requestAnimationFrame</code> مجدداً بعد كل إطار.</p>
<p>لنعرّف دالة مساعدة تغلّف كل ذلك في واجهة مريحة وتتيح لنا ببساطة استدعاء <code>runAnimation</code>، مع إعطائها دالة تتوقع فرقاً زمنياً كمعطى وترسم إطاراً واحداً. وعندما تعيد دالة الإطار القيمة <code>false</code>، تتوقف الرسوم المتحركة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">runAnimation</span>(<span class="hljs-params">frameFunc</span>) {
  <span class="hljs-keyword">let</span> lastTime = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">frame</span>(<span class="hljs-params">time</span>) {
    <span class="hljs-keyword">if</span> (lastTime != <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">let</span> timeStep = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(time - lastTime, <span class="hljs-number">100</span>) / <span class="hljs-number">1000</span>;
      <span class="hljs-keyword">if</span> (<span class="hljs-title function_">frameFunc</span>(timeStep) === <span class="hljs-literal">false</span>) <span class="hljs-keyword">return</span>;
    }
    lastTime = time;
    <span class="hljs-title function_">requestAnimationFrame</span>(frame);
  }
  <span class="hljs-title function_">requestAnimationFrame</span>(frame);
}
</code></pre>
<p>ضبطت خطوة إطار قصوى مقدارها 100 ملي ثانية (عُشر الثانية). وعندما يكون تبويب المتصفح أو نافذته التي تحتوي صفحتنا مخفياً، ستُعلَّق استدعاءات <code>requestAnimationFrame</code> حتى يُعرض التبويب أو النافذة مجدداً. وفي هذه الحالة، سيكون الفرق بين <code>lastTime</code> و<code>time</code> هو كامل الوقت الذي كانت فيه الصفحة مخفية. وتقديم اللعبة بهذا القدر في خطوة واحدة سيبدو سخيفاً وقد يسبب تأثيرات جانبية غريبة، مثل سقوط اللاعب عبر الأرضية.</p>
<p>كما تحوّل الدالة الخطوات الزمنية إلى ثوانٍ، وهي كمية أسهل في التفكير من الملي ثانية.</p>
<p>تأخذ دالة <code>runLevel</code> كائن <code>Level</code> وباني عرض وتعيد وعداً (promise). وهي تعرض المستوى (في <code>document.body</code>) وتتيح للمستخدم اللعب فيه. وعند انتهاء المستوى (خسارة أو فوز)، تنتظر <code>runLevel</code> ثانية إضافية (لتتيح للمستخدم رؤية ما حدث) ثم تمسح العرض وتوقف الرسوم المتحركة وتُحلّ الوعد بحالة نهاية اللعبة.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">runLevel</span>(<span class="hljs-params">level, Display</span>) {
  <span class="hljs-keyword">let</span> display = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Display</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>, level);
  <span class="hljs-keyword">let</span> state = <span class="hljs-title class_">State</span>.<span class="hljs-title function_">start</span>(level);
  <span class="hljs-keyword">let</span> ending = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-title function_">runAnimation</span>(<span class="hljs-function"><span class="hljs-params">time</span> =&gt;</span> {
      state = state.<span class="hljs-title function_">update</span>(time, arrowKeys);
      display.<span class="hljs-title function_">syncState</span>(state);
      <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> == <span class="hljs-string">&quot;playing&quot;</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ending &gt; <span class="hljs-number">0</span>) {
        ending -= time;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      } <span class="hljs-keyword">else</span> {
        display.<span class="hljs-title function_">clear</span>();
        <span class="hljs-title function_">resolve</span>(state.<span class="hljs-property">status</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    });
  });
}
</code></pre>
<p>اللعبة سلسلة من المستويات. وكلما مات اللاعب، أُعيد تشغيل المستوى الحالي. وعند إكمال مستوى، ننتقل إلى المستوى التالي. ويمكن التعبير عن ذلك بالدالة التالية، التي تأخذ مصفوفة من خطط المستويات (نصوص) وباني عرض:</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">runGame</span>(<span class="hljs-params">plans, Display</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> level = <span class="hljs-number">0</span>; level &lt; plans.<span class="hljs-property">length</span>;) {
    <span class="hljs-keyword">let</span> status = <span class="hljs-keyword">await</span> <span class="hljs-title function_">runLevel</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Level</span>(plans[level]),
                                <span class="hljs-title class_">Display</span>);
    <span class="hljs-keyword">if</span> (status == <span class="hljs-string">&quot;won&quot;</span>) level++;
  }
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;You&#x27;ve won!&quot;</span>);
}
</code></pre>
<p>ولأننا جعلنا <code>runLevel</code> تعيد وعداً، يمكن كتابة <code>runGame</code> باستخدام دالة <code>async</code>، كما رأينا في <a href="/chapter/asynchronous_programming">الفصل 11</a>. وهي تعيد وعداً آخر يُحلّ عند إنهاء اللاعب للعبة.</p>
<p>تتوفر مجموعة من خطط المستويات في الارتباط <code>GAME_LEVELS</code> في <a href="https://eloquentjavascript.net/code#16">بيئة تجريبية لهذا الفصل</a>. وتغذّي هذه الصفحة <code>runGame</code> بها، فتبدأ لعبة فعلية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;css/game.css&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
    <span class="hljs-title function_">runGame</span>(<span class="hljs-variable constant_">GAME_LEVELS</span>, <span class="hljs-title class_">DOMDisplay</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>جرّب أن تهزمها. لقد استمتعت ببنائها.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="انتهت-اللعبة">انتهت اللعبة</h3>
<p>من التقليدي في ألعاب المنصات أن يبدأ اللاعب بعدد محدود من <em>الأرواح</em> ويُخصم منها روح واحدة في كل مرة يموت فيها. وعندما تنفد أرواح اللاعب، تُعاد اللعبة من البداية.</p>
<p>عدّل <code>runGame</code> لتنفيذ الأرواح. واجعل اللاعب يبدأ بثلاثة. وأخرج عدد الأرواح الحالي (باستخدام <code>console.log</code>) في كل مرة يبدأ فيها مستوى.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;css/game.css&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-comment">// دالة runGame القديمة. عدّلها...</span>
  <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">runGame</span>(<span class="hljs-params">plans, Display</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> level = <span class="hljs-number">0</span>; level &lt; plans.<span class="hljs-property">length</span>;) {
      <span class="hljs-keyword">let</span> status = <span class="hljs-keyword">await</span> <span class="hljs-title function_">runLevel</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Level</span>(plans[level]),
                                  <span class="hljs-title class_">Display</span>);
      <span class="hljs-keyword">if</span> (status == <span class="hljs-string">&quot;won&quot;</span>) level++;
    }
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;You&#x27;ve won!&quot;</span>);
  }
  <span class="hljs-title function_">runGame</span>(<span class="hljs-variable constant_">GAME_LEVELS</span>, <span class="hljs-title class_">DOMDisplay</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<h3 id="إيقاف-اللعبة-مؤقتا">إيقاف اللعبة مؤقتاً</h3>
<p>اجعل من الممكن إيقاف اللعبة مؤقتاً (تعليقها) واستئنافها بالضغط على esc. يمكنك فعل ذلك بتغيير دالة <code>runLevel</code> لإعداد معالج أحداث لوحة مفاتيح يقطع الرسوم المتحركة أو يستأنفها كلما ضُغط esc.</p>
<p>قد لا تبدو واجهة <code>runAnimation</code> مناسبة لهذا للوهلة الأولى، لكنها كذلك إذا أعدت ترتيب طريقة استدعاء <code>runLevel</code> لها.</p>
<p>عندما ينجح ذلك، هناك شيء آخر يمكنك تجربته. إن الطريقة التي كنا نسجل بها معالجات أحداث لوحة المفاتيح مشكِلة إلى حد ما. فكائن <code>arrowKeys</code> ارتباط عام حالياً، وتُبقى معالجات أحداثه موجودة حتى عندما لا تكون هناك لعبة قيد التشغيل. يمكنك القول إنها <em>تتسرب</em> خارج نظامنا. وسّع <code>trackKeys</code> لتوفر طريقة لإلغاء تسجيل معالجاتها، ثم غيّر <code>runLevel</code> لتسجل معالجاتها عند بدئها وتلغي تسجيلها مجدداً عند انتهائها.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;css/game.css&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-comment">// دالة runLevel القديمة. عدّل هذا...</span>
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">runLevel</span>(<span class="hljs-params">level, Display</span>) {
    <span class="hljs-keyword">let</span> display = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Display</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>, level);
    <span class="hljs-keyword">let</span> state = <span class="hljs-title class_">State</span>.<span class="hljs-title function_">start</span>(level);
    <span class="hljs-keyword">let</span> ending = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-title function_">runAnimation</span>(<span class="hljs-function"><span class="hljs-params">time</span> =&gt;</span> {
        state = state.<span class="hljs-title function_">update</span>(time, arrowKeys);
        display.<span class="hljs-title function_">syncState</span>(state);
        <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> == <span class="hljs-string">&quot;playing&quot;</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ending &gt; <span class="hljs-number">0</span>) {
          ending -= time;
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">else</span> {
          display.<span class="hljs-title function_">clear</span>();
          <span class="hljs-title function_">resolve</span>(state.<span class="hljs-property">status</span>);
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      });
    });
  }
  <span class="hljs-title function_">runGame</span>(<span class="hljs-variable constant_">GAME_LEVELS</span>, <span class="hljs-title class_">DOMDisplay</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>يمكن قطع الرسوم المتحركة بإعادة <code>false</code> من الدالة المعطاة إلى <code>runAnimation</code>. ويمكن متابعتها باستدعاء <code>runAnimation</code> مجدداً.</p>
<p>لذا نحتاج إلى إبلاغ الدالة المعطاة إلى <code>runAnimation</code> بأننا نوقف اللعبة مؤقتاً. ولهذا يمكنك استخدام ارتباط يتمكن كل من معالج الحدث وتلك الدالة من الوصول إليه.</p>
<p>عند إيجاد طريقة لإلغاء تسجيل المعالجات المسجلة بواسطة <code>trackKeys</code>، تذكّر أنه يجب تمرير القيمة <em>نفسها بالضبط</em> من الدالة التي مُررت إلى <code>addEventListener</code> إلى <code>removeEventListener</code> لإزالة معالج بنجاح. لذا يجب أن تكون قيمة الدالة <code>handler</code> المنشأة في <code>trackKeys</code> متاحة للشيفرة التي تلغي تسجيل المعالجات.</p>
<p>يمكنك إضافة خاصية إلى الكائن الذي تعيده <code>trackKeys</code>، تحتوي إما على قيمة تلك الدالة أو على طريقة تتولى إلغاء التسجيل مباشرة.</p>
</details>
<h3 id="وحش">وحش</h3>
<p>من التقليدي في ألعاب المنصات وجود أعداء يمكنك هزيمتهم بالقفز فوقهم. يطلب منك هذا التمرين إضافة نوع فاعل كهذا إلى اللعبة.</p>
<p>سنسمي هذا الفاعل وحشاً. تتحرك الوحوش أفقياً فقط. يمكنك جعلها تتحرك في اتجاه اللاعب، أو ترتد ذهاباً وإياباً كالحمم الأفقية، أو أي نمط حركة آخر تريده. لا يلزم أن يتعامل الصنف مع السقوط، لكن ينبغي أن يضمن ألا يمشي الوحش عبر الجدران.</p>
<p>عندما يلامس وحش اللاعب، يعتمد التأثير على ما إذا كان اللاعب يقفز فوقه أم لا. يمكنك تقريب ذلك بالتحقق مما إذا كانت قاعدة اللاعب قريبة من قمة الوحش. فإن كان الأمر كذلك، اختفى الوحش. وإن لم يكن، خُسرت اللعبة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;css/game.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css"><span class="hljs-selector-class">.monster</span> { <span class="hljs-attribute">background</span>: purple }</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
    <span class="hljs-comment">// أكمل الباني وطريقتَي update وcollide</span>
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">Monster</span> {
      <span class="hljs-title function_">constructor</span>(<span class="hljs-params">pos, <span class="hljs-comment">/* ... */</span></span>) {}

      <span class="hljs-keyword">get</span> <span class="hljs-title function_">type</span>() { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;monster&quot;</span>; }

      <span class="hljs-keyword">static</span> <span class="hljs-title function_">create</span>(<span class="hljs-params">pos</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Monster</span>(pos.<span class="hljs-title function_">plus</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">0</span>, -<span class="hljs-number">1</span>)));
      }

      <span class="hljs-title function_">update</span>(<span class="hljs-params">time, state</span>) {}

      <span class="hljs-title function_">collide</span>(<span class="hljs-params">state</span>) {}
    }

    <span class="hljs-title class_">Monster</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">size</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Vec</span>(<span class="hljs-number">1.2</span>, <span class="hljs-number">2</span>);

    levelChars[<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-title class_">Monster</span>;

    <span class="hljs-title function_">runLevel</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Level</span>(<span class="hljs-string">\`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
\`</span>), <span class="hljs-title class_">DOMDisplay</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>إذا أردت تنفيذ نوع من الحركة يحتفظ بحالة، كالارتداد، فتأكد من تخزين الحالة اللازمة في كائن الفاعل — أدرجها كمعطى للباني وأضفها كخاصية.</p>
<p>تذكّر أن <code>update</code> تعيد كائناً <em>جديداً</em> بدلاً من تغيير الكائن القديم.</p>
<p>عند التعامل مع التصادم، ابحث عن اللاعب في <code>state.actors</code> وقارن موضعه بموضع الوحش. للحصول على <em>قاعدة</em> اللاعب، عليك إضافة حجمه العمودي إلى موضعه العمودي. وسيشبه إنشاء الحالة المحدّثة إما طريقة <code>collide</code> في <code>Coin</code> (إزالة الفاعل) أو طريقة <code>Lava</code> (تغيير الحالة إلى <code>&quot;lost&quot;</code>)، حسب موضع اللاعب.</p>
</details>
`,t={number:"16",slug:s,title:a,englishTitle:n,headings:l,html:p};export{t as default,n as englishTitle,l as headings,p as html,e as number,s as slug,a as title};
