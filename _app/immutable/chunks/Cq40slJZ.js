const t="21",s="project_skill_sharing_website",a="مشروع: موقع لتبادل المهارات",n="Project: Skill-Sharing Website",l=[{depth:2,id:"التصميم",text:"التصميم"},{depth:2,id:"الاستقصاء-الطويل",text:"الاستقصاء الطويل"},{depth:2,id:"واجهة-http",text:"واجهة HTTP"},{depth:2,id:"الخادم",text:"الخادم"},{depth:3,id:"التوجيه",text:"التوجيه"},{depth:3,id:"تقديم-الملفات",text:"تقديم الملفات"},{depth:3,id:"المحادثات-كموراد",text:"المحادثات كموراد"},{depth:3,id:"دعم-الاستقصاء-الطويل",text:"دعم الاستقصاء الطويل"},{depth:2,id:"العميل",text:"العميل"},{depth:3,id:"html",text:"HTML"},{depth:3,id:"الإجراءات",text:"الإجراءات"},{depth:3,id:"عرض-المكونات",text:"عرض المكوّنات"},{depth:3,id:"الاستقصاء",text:"الاستقصاء"},{depth:3,id:"التطبيق",text:"التطبيق"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"الحفظ-على-القرص",text:"الحفظ على القرص"},{depth:3,id:"إعادة-ضبط-حقل-التعليق",text:"إعادة ضبط حقل التعليق"}],p=`<blockquote>
<p>إن كانت لديك معرفة، فدع الآخرين يشعلون شموعهم منها.</p>
<p>— مارغريت فولر</p>
</blockquote>
<p><img src="/images/book/chapter_picture_21.jpg" alt="رسم توضيحي يُظهر دراجتين أحاديتين مسندتين إلى صندوق بريد"></p>
<p>لقاء <em>مشاركة المهارات</em> (skill-sharing) حدث يجتمع فيه أشخاص يشتركون في اهتمام واحد ويقدّمون عروضاً صغيرة غير رسمية عن أشياء يعرفونها. في لقاء لمشاركة المهارات عن البستنة، قد يشرح أحدهم كيفية زراعة الكرفس. أو في مجموعة لمشاركة المهارات في البرمجة، يمكنك أن تمرّ وتحدّث الناس عن Node.js.</p>
<p>في هذا الفصل الأخير من فصول المشاريع، هدفنا إنشاء موقع لإدارة المحادثات المقدَّمة في لقاء لمشاركة المهارات. تخيّل مجموعة صغيرة من الناس تلتقي بانتظام في مكتب أحد الأعضاء للحديث عن ركوب الدراجات الأحادية. انتقل منظّم اللقاءات السابق إلى مدينة أخرى، ولم يتقدّم أحد لتولّي هذه المهمة. نريد نظاماً يتيح للمشاركين اقتراح المحادثات ومناقشتها فيما بينهم دون منظّم فعّال.</p>
<p>كما في <a href="/chapter/node_js">الفصل السابق</a>، بعض الشيفرة في هذا الفصل مكتوبة لـNode.js، ومن غير المرجّح أن يعمل تشغيلها مباشرة في صفحة HTML التي تنظر إليها. يمكن تنزيل الشيفرة الكاملة للمشروع من <a href="https://eloquentjavascript.net/code/skillsharing.zip"><em>https://eloquentjavascript.net/code/skillsharing.zip</em></a>.</p>
<h2 id="التصميم">التصميم</h2>
<p>لهذا المشروع جزء <em>خادم</em>، مكتوب لـNode.js، وجزء <em>عميل</em>، مكتوب للمتصفح. يخزّن الخادم بيانات النظام ويوفّرها للعميل، كما يقدّم الملفات التي تنفّذ نظام جانب العميل.</p>
<p>يحتفظ الخادم بقائمة المحادثات المقترحة للقاء التالي، ويعرض العميل هذه القائمة. ولكل محادثة اسم مقدّم وعنوان وملخص ومصفوفة من التعليقات المرتبطة بها. ويتيح العميل للمستخدمين اقتراح محادثات جديدة (بإضافتها إلى القائمة)، وحذف المحادثات، والتعليق على المحادثات الموجودة. وكلما أجرى المستخدم تغييراً من هذا القبيل، أرسل العميل طلب HTTP لإبلاغ الخادم به.</p>
<p><img src="/images/book/skillsharing.png" alt="لقطة شاشة لموقع مشاركة المهارات"></p>
<p>سيُعدّ التطبيق لعرض رؤية <em>حيّة</em> للمحادثات المقترحة حالياً وتعليقاتها. فكلما قدّم شخص، في أي مكان، محادثة جديدة أو أضاف تعليقاً، ينبغي أن يرى التغيير فوراً كل من فتح الصفحة في متصفحه. وهذا يطرح تحدياً صغيراً — فلا سبيل لخادم ويب إلى فتح اتصال بعميل، ولا طريقة جيدة لمعرفة أي العملاء ينظرون حالياً إلى موقع معيّن.</p>
<p>الحل الشائع لهذه المشكلة يُسمى <em>الاستقصاء الطويل</em> (long polling)، وهو يصادف أنه أحد الدوافع وراء تصميم Node.</p>
<h2 id="الاستقصاء-الطويل">الاستقصاء الطويل</h2>
<p>كي نتمكن من إخطار عميل فوراً بأن شيئاً قد تغيّر، نحتاج إلى اتصال بذلك العميل. وبما أن متصفحات الويب لا تقبل الاتصالات تقليدياً، وبما أن العملاء غالباً خلف موجّهات تحجب مثل هذه الاتصالات على أي حال، فليس من العملي أن يبدأ الخادم هذا الاتصال.</p>
<p>يمكننا أن نرتب للعميل أن يفتح الاتصال ويبقيه موجوداً حتى يستطيع الخادم استخدامه لإرسال المعلومات عند حاجته إلى ذلك. لكن طلب HTTP لا يسمح إلا بتدفق بسيط للمعلومات: يرسل العميل طلباً، ويعود الخادم باستجابة واحدة، وانتهى الأمر. وهناك تقنية تُسمى <em>WebSockets</em> تجعل من الممكن فتح اتصالات لتبادل بيانات عشوائية، لكن استخدام مثل هذه المقابس (sockets) استخداماً سليماً فيه بعض الصعوبة.</p>
<p>في هذا الفصل، نستخدم تقنية أبسط، هي الاستقصاء الطويل، حيث يسأل العملاء الخادم باستمرار عن معلومات جديدة باستخدام طلبات HTTP عادية، ويؤجّل الخادم إجابته حين لا يكون لديه جديد يبلّغ به.</p>
<p>ما دام العميل يحرص على أن يبقى لديه طلب استقصاء مفتوح باستمرار، فسيستقبل المعلومات من الخادم بسرعة بعد أن تصبح متاحة. فمثلاً، إذا كانت فاطمة قد فتحت تطبيق مشاركة المهارات في متصفحها، فسيكون ذلك المتصفح قد أرسل طلباً للتحديثات وسينتظر استجابة لذلك الطلب. وعندما تقدّم إيمان محادثة عن التزحلق الشديد على المنحدرات بالدراجة الأحادية، سيلاحظ الخادم أن فاطمة تنتظر تحديثات، وسيرسل استجابة تحتوي المحادثة الجديدة إلى طلبها المعلّق. وسيستقبل متصفح فاطمة البيانات ويحدّث الشاشة ليعرض المحادثة.</p>
<p>لمنع انتهاء مهلة الاتصالات (إلغائها بسبب انعدام النشاط)، تحدد تقنيات الاستقصاء الطويل عادةً حداً أقصى لزمن كل طلب، وبعده يستجيب الخادم على أي حال، حتى وإن لم يكن لديه ما يبلّغ به. ويمكن للعميل حينئذ بدء طلب جديد. كما أن إعادة تشغيل الطلب دورياً تجعل التقنية أكثر متانة، وتتيح للعملاء التعافي من انقطاعات الاتصال المؤقتة أو مشكلات الخادم.</p>
<p>قد يكون لدى خادم مزدحم يستخدم الاستقصاء الطويل آلاف الطلبات المنتظرة، وبالتالي اتصالات TCP مفتوحة. وتُعدّ Node، التي تجعل إدارة اتصالات كثيرة سهلة دون إنشاء خيط تحكم منفصل لكل اتصال، مناسبة جيداً لنظام كهذا.</p>
<h2 id="واجهة-http">واجهة HTTP</h2>
<p>قبل أن نبدأ تصميم الخادم أو العميل، لنفكر في النقطة التي يتلامسان عندها: واجهة HTTP التي يتواصلان عبرها.</p>
<p>سنستخدم JSON صيغةً لجسم طلباتنا واستجاباتنا. وكما في خادم الملفات من <a href="/chapter/node_js#file_server">الفصل 20</a>، سنحاول الاستفادة الجيدة من طرائق HTTP وترويساتها. تتمحور الواجهة حول المسار <code>/talks</code>. أما المسارات التي لا تبدأ بـ<code>/talks</code> فستُستخدم لتقديم ملفات ثابتة — شيفرة HTML وJavaScript لنظام جانب العميل.</p>
<p>يعيد طلب <code>GET</code> إلى <code>/talks</code> مستند JSON مثل هذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Unituning&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;presenter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Jamal&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;summary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Modifying your cycle for extra style&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;comments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
</code></pre>
<p>يتم إنشاء محادثة جديدة بإرسال طلب <code>PUT</code> إلى URL مثل <code>/talks/Unituning</code>، حيث يكون الجزء الذي يلي الشرطة المائلة الثانية هو عنوان المحادثة. وينبغي أن يحتوي جسم طلب <code>PUT</code> على كائن JSON له خاصيتا <code>presenter</code> و<code>summary</code>.</p>
<p>وبما أن عناوين المحادثات قد تحتوي مسافات ومحارف أخرى قد لا تظهر عادةً في URL، فيجب ترميز نصوص العناوين بالدالة <code>encodeURIComponent</code> عند بناء URL كهذا.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;/talks/&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">&quot;How to Idle&quot;</span>));
<span class="hljs-comment">// → /talks/How%20to%20Idle</span>
</code></pre>
<p>قد يبدو الطلب الرامي إلى إنشاء محادثة عن الوقوف ساكناً شيئاً كهذا:</p>
<pre><code class="language-http"><span class="hljs-keyword">PUT</span> <span class="hljs-string">/talks/How%20to%20Idle</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">Content-Type</span><span class="hljs-punctuation">: </span>application/json
<span class="hljs-attribute">Content-Length</span><span class="hljs-punctuation">: </span>92

<span class="language-smalltalk">{<span class="hljs-comment">&quot;presenter&quot;</span>: <span class="hljs-comment">&quot;Maureen&quot;</span>,
 <span class="hljs-comment">&quot;summary&quot;</span>: <span class="hljs-comment">&quot;Standing still on a unicycle&quot;</span>}
</span></code></pre>
<p>تدعم مثل هذه الـURLs أيضاً طلبات <code>GET</code> لاسترجاع التمثيل JSON لمحادثة، وطلبات <code>DELETE</code> لحذف محادثة.</p>
<p>وتتم إضافة تعليق إلى محادثة بطلب <code>POST</code> إلى URL مثل <code>/talks/Unituning/comments</code>، مع جسم JSON له خاصيتا <code>author</code> و<code>message</code>.</p>
<pre><code class="language-http"><span class="hljs-keyword">POST</span> <span class="hljs-string">/talks/Unituning/comments</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">Content-Type</span><span class="hljs-punctuation">: </span>application/json
<span class="hljs-attribute">Content-Length</span><span class="hljs-punctuation">: </span>72

<span class="language-smalltalk">{<span class="hljs-comment">&quot;author&quot;</span>: <span class="hljs-comment">&quot;Iman&quot;</span>,
 <span class="hljs-comment">&quot;message&quot;</span>: <span class="hljs-comment">&quot;Will you talk about raising a cycle?&quot;</span>}
</span></code></pre>
<p>لدعم الاستقصاء الطويل، قد تتضمن طلبات <code>GET</code> إلى <code>/talks</code> ترويسات إضافية تخبر الخادم بتأجيل الاستجابة إن لم تتوفر معلومات جديدة. وسنستخدم زوجاً من الترويسات مخصصاً عادةً لإدارة التخزين المؤقت: <code>ETag</code> و<code>If-None-Match</code>.</p>
<p>قد يضمّن الخادم ترويسة <code>ETag</code> («وسم الكيان») في استجابة ما. وقيمتها نص يعرّف النسخة الحالية من المورد. ويمكن للعملاء، عند طلبهم ذلك المورد مجدداً لاحقاً، إرسال <em>طلب شرطي</em> بتضمين ترويسة <code>If-None-Match</code> تحمل قيمتها النص نفسه. فإن لم يكن المورد قد تغيّر، استجاب الخادم برمز الحالة 304، الذي يعني «لم يُعدّل»، مخبراً العميل بأن نسخته المخزنة مؤقتاً لا تزال حالية. وعندما لا يتطابق الوسم، يستجيب الخادم كالمعتاد.</p>
<p>نحتاج إلى شيء كهذا، حيث يستطيع العميل إخبار الخادم بأي نسخة من قائمة المحادثات لديه، ولا يستجيب الخادم إلا عندما تتغير تلك القائمة. لكن بدلاً من إعادة استجابة 304 فوراً، ينبغي أن يؤجّل الخادم الاستجابة ولا يعود إلا عندما يتوفر شيء جديد أو يمضي قدر معيّن من الوقت. ولتمييز طلبات الاستقصاء الطويل عن الطلبات الشرطية العادية، نمنحها ترويسة أخرى، <code>Prefer: wait=90</code>، تخبر الخادم بأن العميل مستعد لانتظار الاستجابة حتى 90 ثانية.</p>
<p>سيحتفظ الخادم برقم نسخة يحدّثه كلما تغيّرت المحادثات، وسيستخدمه قيمةً لـ<code>ETag</code>. ويمكن للعملاء إرسال طلبات كهذه ليُخطروا عندما تتغير المحادثات:</p>
<pre><code>GET /talks HTTP/1.1
If-None-Match: &quot;4&quot;
Prefer: wait=90

(يمر الوقت)

HTTP/1.1 200 OK
Content-Type: application/json
ETag: &quot;5&quot;
Content-Length: 295

[...]
</code></pre>
<p>البروتوكول الموصوف هنا لا يفعل أي تحكم في الوصول. فيمكن للجميع التعليق وتعديل المحادثات وحتى حذفها. (وبما أن الإنترنت مليء بالمشاغبين، فمن المحتمل ألا ينتهي وضع نظام كهذا على الإنترنت دون حماية إضافية نهاية حسنة.)</p>
<h2 id="الخادم">الخادم</h2>
<p>لنبدأ ببناء الجزء الخادمي من البرنامج. الشيفرة في هذا القسم تعمل على Node.js.</p>
<h3 id="التوجيه">التوجيه</h3>
<p>سيستخدم خادمنا الدالة <code>createServer</code> في Node لبدء خادم HTTP. وفي الدالة التي تعالج طلباً جديداً، يجب أن نميّز بين مختلف أنواع الطلبات (كما تحدّدها الطريقة والمسار) التي ندعمها. ويمكن فعل ذلك بسلسلة طويلة من جمل <code>if</code>، لكن ثمة طريقة أجمل.</p>
<p><em>الموجّه</em> (router) مكوّن يساعد في توجيه الطلب إلى الدالة القادرة على معالجته. يمكنك أن تخبر الموجّه، مثلاً، بأن طلبات <code>PUT</code> التي يطابق مسارها التعبير النمطي <code>/^\\/talks\\/([^\\/]+)$/</code> (<code>/talks/</code> متبوعة بعنوان محادثة) يمكن أن تعالجها دالة معيّنة. وإضافة إلى ذلك، يمكنه المساعدة في استخراج الأجزاء ذات المعنى من المسار (في هذه الحالة عنوان المحادثة)، المحاطة بأقواس في التعبير النمطي، وتمريرها إلى دالة المعالج.</p>
<p>هناك عدد من حزم التوجيه الجيدة على NPM، لكننا سنكتب واحدة بأنفسنا هنا لتوضيح المبدأ.</p>
<p>هذا هو <code>router.mjs</code>، الذي سنستورده لاحقاً بـ<code>import</code> من وحدة خادمنا:</p>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Router</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">routes</span> = [];
  }
  <span class="hljs-title function_">add</span>(<span class="hljs-params">method, url, handler</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">routes</span>.<span class="hljs-title function_">push</span>({method, url, handler});
  }
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">resolve</span>(<span class="hljs-params">request, context</span>) {
    <span class="hljs-keyword">let</span> {pathname} = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(request.<span class="hljs-property">url</span>, <span class="hljs-string">&quot;http://d&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> {method, url, handler} <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">routes</span>) {
      <span class="hljs-keyword">let</span> match = url.<span class="hljs-title function_">exec</span>(pathname);
      <span class="hljs-keyword">if</span> (!match || request.<span class="hljs-property">method</span> != method) <span class="hljs-keyword">continue</span>;
      <span class="hljs-keyword">let</span> parts = match.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">map</span>(<span class="hljs-built_in">decodeURIComponent</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handler</span>(context, ...parts, request);
    }
  }
}
</code></pre>
<p>تُصدّر الوحدة صنف <code>Router</code>. ويتيح لك كائن الموجّه تسجيل معالجات لطرائق وأنماط URL محددة بطريقته <code>add</code>. وعندما يُحلّ طلب بالطريقة <code>resolve</code>، ينادي الموجّه المعالج الذي تتطابق طريقته وURLه مع الطلب ويعيد نتيجته.</p>
<p>تُنادى دوال المعالج بالقيمة <code>context</code> المعطاة إلى <code>resolve</code>. وسنستخدم هذا لمنحها وصولاً إلى حالة خادمنا. وإضافة إلى ذلك، تستقبل نصوص المطابقة لأي مجموعات عرّفتها في تعبيرها النمطي، وكائن الطلب. ويجب فك ترميز URL للنصوص، لأن الـURL الخام قد يحتوي رموزاً على غرار <code>%20</code>.</p>
<h3 id="تقديم-الملفات">تقديم الملفات</h3>
<p>عندما لا يطابق طلب أيّاً من أنواع الطلبات المعرّفة في موجّهنا، يجب أن يفسّره الخادم بوصفه طلباً لملف في الدليل <code>public</code>. كان يمكن استخدام خادم الملفات المعرّف في <a href="/chapter/node_js#file_server">الفصل 20</a> لتقديم مثل هذه الملفات، لكننا لا نحتاج إلى دعم طلبات <code>PUT</code> و<code>DELETE</code> على الملفات ولا نريده، ونرغب في الحصول على ميزات متقدمة مثل دعم التخزين المؤقت. فلنستخدم بدلاً من ذلك خادم ملفات ثابتة متيناً ومُختبَراً جيداً من NPM.</p>
<p>اخترت <code>serve-static</code>. وهذا ليس الخادم الوحيد من نوعه على NPM، لكنه يعمل جيداً ويناسب أغراضنا. تُصدّر حزمة <code>serve-static</code> دالة يمكن نداؤها بدليل جذر لإنتاج دالة معالج طلبات. وتقبل دالة المعالج المعطيين <code>request</code> و<code>response</code> اللذين يوفرهما الخادم من <code>&quot;node:http&quot;</code>، ومعطى ثالثاً هو دالة ستناديها إن لم يطابق أي ملف الطلب. نريد أن يتحقق خادمنا أولاً من الطلبات التي ينبغي أن نعالجها معالجة خاصة، كما هي معرّفة في الموجّه، لذا نغلّفه في دالة أخرى.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {createServer} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:http&quot;</span>;
<span class="hljs-keyword">import</span> serveStatic <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;serve-static&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">notFound</span>(<span class="hljs-params">request, response</span>) {
  response.<span class="hljs-title function_">writeHead</span>(<span class="hljs-number">404</span>, <span class="hljs-string">&quot;Not found&quot;</span>);
  response.<span class="hljs-title function_">end</span>(<span class="hljs-string">&quot;&lt;h1&gt;Not found&lt;/h1&gt;&quot;</span>);
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">SkillShareServer</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">talks</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">talks</span> = talks;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span> = <span class="hljs-number">0</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span> = [];

    <span class="hljs-keyword">let</span> fileServer = <span class="hljs-title function_">serveStatic</span>(<span class="hljs-string">&quot;./public&quot;</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">server</span> = <span class="hljs-title function_">createServer</span>(<span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
      <span class="hljs-title function_">serveFromRouter</span>(<span class="hljs-variable language_">this</span>, request, response, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">fileServer</span>(request, response,
                   <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">notFound</span>(request, response));
      });
    });
  }
  <span class="hljs-title function_">start</span>(<span class="hljs-params">port</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">server</span>.<span class="hljs-title function_">listen</span>(port);
  }
  <span class="hljs-title function_">stop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">server</span>.<span class="hljs-title function_">close</span>();
  }
}
</code></pre>
<p>لدالة <code>serveFromRouter</code> الواجهة نفسها التي لـ<code>fileServer</code>، إذ تأخذ المعطيات <code>(request, response, next)</code>. ويمكننا استخدام هذا «لسَلسَلة» عدة معالجات طلبات، بحيث يعالج كل منها الطلب أو يمرّر مسؤوليته إلى المعالج التالي. أما المعالج الأخير، <code>notFound</code>، فيرد ببساطة بخطأ «غير موجود».</p>
<p>وتستخدم دالة <code>serveFromRouter</code> لدينا اصطلاحاً مشابهاً لخادم الملفات من <a href="/chapter/node_js">الفصل السابق</a> في الاستجابات — إذ تعيد المعالجات في الموجّه وعوداً تُحلّ إلى كائنات تصف الاستجابة.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">Router</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./router.mjs&quot;</span>;

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Router</span>();
<span class="hljs-keyword">const</span> defaultHeaders = {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;text/plain&quot;</span>};

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">serveFromRouter</span>(<span class="hljs-params">server, request,
                               response, next</span>) {
  <span class="hljs-keyword">let</span> resolved = <span class="hljs-keyword">await</span> router.<span class="hljs-title function_">resolve</span>(request, server)
    .<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (error.<span class="hljs-property">status</span> != <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> error;
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">body</span>: <span class="hljs-title class_">String</span>(err), <span class="hljs-attr">status</span>: <span class="hljs-number">500</span>};
    });
  <span class="hljs-keyword">if</span> (!resolved) <span class="hljs-keyword">return</span> <span class="hljs-title function_">next</span>();
  <span class="hljs-keyword">let</span> {body, status = <span class="hljs-number">200</span>, headers = defaultHeaders} =
    <span class="hljs-keyword">await</span> resolved;
  response.<span class="hljs-title function_">writeHead</span>(status, headers);
  response.<span class="hljs-title function_">end</span>(body);
}
</code></pre>
<h3 id="المحادثات-كموراد">المحادثات كموراد</h3>
<p>تُخزَّن المحادثات المقترحة في خاصية <code>talks</code> للخادم، وهي كائن أسماء خصائصه عناوين المحادثات. وسنضيف بعض المعالجات إلى موجّهنا تكشف هذه المحادثات كموراد HTTP تحت <code>/talks/&lt;title&gt;</code>.</p>
<p>يجب أن يبحث المعالج الخاص بالطلبات التي تجري <code>GET</code> لمحادثة واحدة عن المحادثة، ويرد إما ببيانات JSON الخاصة بها أو باستجابة خطأ 404.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> talkPath = <span class="hljs-regexp">/^\\/talks\\/([^\\/]+)$/</span>;

router.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;GET&quot;</span>, talkPath, <span class="hljs-title function_">async</span> (server, title) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">hasOwn</span>(server.<span class="hljs-property">talks</span>, title)) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(server.<span class="hljs-property">talks</span>[title]),
            <span class="hljs-attr">headers</span>: {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>}};
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">404</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">\`No talk &#x27;<span class="hljs-subst">\${title}</span>&#x27; found\`</span>};
  }
});
</code></pre>
<p>ويتم حذف محادثة بإزالتها من الكائن <code>talks</code>.</p>
<pre><code class="language-js">router.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;DELETE&quot;</span>, talkPath, <span class="hljs-title function_">async</span> (server, title) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">hasOwn</span>(server.<span class="hljs-property">talks</span>, title)) {
    <span class="hljs-keyword">delete</span> server.<span class="hljs-property">talks</span>[title];
    server.<span class="hljs-title function_">updated</span>();
  }
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
});
</code></pre>
<p>وطريقة <code>updated</code>، التي سنعرّفها <a href="/chapter/project_skill_sharing_website#updated">لاحقاً</a>، تُخطر طلبات الاستقصاء الطويل المنتظرة بالتغيير.</p>
<p>أحد المعالجات التي تحتاج إلى قراءة أجسام الطلبات هو معالج <code>PUT</code>، المستخدم لإنشاء محادثات جديدة. وعليه أن يتحقق مما إذا كانت البيانات المعطاة له تملك خاصيتي <code>presenter</code> و<code>summary</code>، وهما نصان. فأي بيانات تأتي من خارج النظام قد تكون هراءً، ولا نريد إفساد نموذج بياناتنا الداخلي أو الانهيار عند وصول طلبات سيئة.</p>
<p>وإذا بدت البيانات صالحة، خزّن المعالج كائناً يمثّل المحادثة الجديدة في الكائن <code>talks</code>، ربما مستبدلاً محادثة موجودة بهذا العنوان، ونادى <code>updated</code> مرة أخرى.</p>
<p>ولقراءة الجسم من تدفق الطلب، سنستخدم دالة <code>json</code> من <code>&quot;node:stream/consumers&quot;</code>، التي تجمع البيانات في التدفق ثم تحللها بوصفها JSON. وهناك صادرات مشابهة تُسمى <code>text</code> (لقراءة المحتوى نصاً) و<code>buffer</code> (لقراءته بيانات ثنائية) في هذه الحزمة. وبما أن <code>json</code> اسم عام جداً، تعيد عبارة <code>import</code> تسميته <code>readJSON</code> لتجنب الالتباس.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> {json <span class="hljs-keyword">as</span> readJSON} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;node:stream/consumers&quot;</span>;

router.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;PUT&quot;</span>, talkPath,
           <span class="hljs-title function_">async</span> (server, title, request) =&gt; {
  <span class="hljs-keyword">let</span> talk = <span class="hljs-keyword">await</span> <span class="hljs-title function_">readJSON</span>(request);
  <span class="hljs-keyword">if</span> (!talk ||
      <span class="hljs-keyword">typeof</span> talk.<span class="hljs-property">presenter</span> != <span class="hljs-string">&quot;string&quot;</span> ||
      <span class="hljs-keyword">typeof</span> talk.<span class="hljs-property">summary</span> != <span class="hljs-string">&quot;string&quot;</span>) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;Bad talk data&quot;</span>};
  }
  server.<span class="hljs-property">talks</span>[title] = {
    title,
    <span class="hljs-attr">presenter</span>: talk.<span class="hljs-property">presenter</span>,
    <span class="hljs-attr">summary</span>: talk.<span class="hljs-property">summary</span>,
    <span class="hljs-attr">comments</span>: []
  };
  server.<span class="hljs-title function_">updated</span>();
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
});
</code></pre>
<p>وتتم إضافة تعليق إلى محادثة بطريقة مشابهة. نستخدم <code>readJSON</code> للحصول على محتوى الطلب، ونتحقق من صحة البيانات الناتجة، ونخزّنها تعليقاً عندما تبدو صالحة.</p>
<pre><code class="language-js">router.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;POST&quot;</span>, <span class="hljs-regexp">/^\\/talks\\/([^\\/]+)\\/comments$/</span>,
           <span class="hljs-title function_">async</span> (server, title, request) =&gt; {
  <span class="hljs-keyword">let</span> comment = <span class="hljs-keyword">await</span> <span class="hljs-title function_">readJSON</span>(request);
  <span class="hljs-keyword">if</span> (!comment ||
      <span class="hljs-keyword">typeof</span> comment.<span class="hljs-property">author</span> != <span class="hljs-string">&quot;string&quot;</span> ||
      <span class="hljs-keyword">typeof</span> comment.<span class="hljs-property">message</span> != <span class="hljs-string">&quot;string&quot;</span>) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;Bad comment data&quot;</span>};
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">hasOwn</span>(server.<span class="hljs-property">talks</span>, title)) {
    server.<span class="hljs-property">talks</span>[title].<span class="hljs-property">comments</span>.<span class="hljs-title function_">push</span>(comment);
    server.<span class="hljs-title function_">updated</span>();
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">204</span>};
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">404</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">\`No talk &#x27;<span class="hljs-subst">\${title}</span>&#x27; found\`</span>};
  }
});
</code></pre>
<p>ومحاولة إضافة تعليق إلى محادثة غير موجودة تعيد خطأ 404.</p>
<h3 id="دعم-الاستقصاء-الطويل">دعم الاستقصاء الطويل</h3>
<p>أكثر جوانب الخادم إثارة للاهتمام هو الجزء الذي يعالج الاستقصاء الطويل. فعندما يصل طلب <code>GET</code> إلى <code>/talks</code>، قد يكون طلباً عادياً أو طلب استقصاء طويل.</p>
<p>ستكون هناك مواضع عدة يتعين علينا فيها إرسال مصفوفة محادثات إلى العميل، لذا نعرّف أولاً طريقة مساعدة تبني مثل هذه المصفوفة وتضمّن ترويسة <code>ETag</code> في الاستجابة.</p>
<pre><code class="language-js"><span class="hljs-title class_">SkillShareServer</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">talkResponse</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">let</span> talks = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">talks</span>)
    .<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">title</span> =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">talks</span>[title]);
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(talks),
    <span class="hljs-attr">headers</span>: {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>,
              <span class="hljs-string">&quot;ETag&quot;</span>: <span class="hljs-string">\`&quot;<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.version}</span>&quot;\`</span>,
              <span class="hljs-string">&quot;Cache-Control&quot;</span>: <span class="hljs-string">&quot;no-store&quot;</span>}
  };
};
</code></pre>
<p>ويحتاج المعالج نفسه إلى النظر في ترويسات الطلب ليرى ما إذا كانت ترويستا <code>If-None-Match</code> و<code>Prefer</code> موجودتين. وتخزّن Node الترويسات، التي تُحدَّد أسماؤها لتكون غير حساسة لحالة الأحرف، تحت أسمائها بحروف صغيرة.</p>
<pre><code class="language-js">router.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;GET&quot;</span>, <span class="hljs-regexp">/^\\/talks$/</span>, <span class="hljs-title function_">async</span> (server, request) =&gt; {
  <span class="hljs-keyword">let</span> tag = <span class="hljs-regexp">/&quot;(.*)&quot;/</span>.<span class="hljs-title function_">exec</span>(request.<span class="hljs-property">headers</span>[<span class="hljs-string">&quot;if-none-match&quot;</span>]);
  <span class="hljs-keyword">let</span> wait = <span class="hljs-regexp">/\\bwait=(\\d+)/</span>.<span class="hljs-title function_">exec</span>(request.<span class="hljs-property">headers</span>[<span class="hljs-string">&quot;prefer&quot;</span>]);
  <span class="hljs-keyword">if</span> (!tag || tag[<span class="hljs-number">1</span>] != server.<span class="hljs-property">version</span>) {
    <span class="hljs-keyword">return</span> server.<span class="hljs-title function_">talkResponse</span>();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!wait) {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">status</span>: <span class="hljs-number">304</span>};
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> server.<span class="hljs-title function_">waitForChanges</span>(<span class="hljs-title class_">Number</span>(wait[<span class="hljs-number">1</span>]));
  }
});
</code></pre>
<p>إذا لم يُعطَ أي وسم، أو أُعطي وسم لا يطابق النسخة الحالية للخادم، رد المعالج بقائمة المحادثات. وإذا كان الطلب شرطياً ولم تتغير المحادثات، استشرنا ترويسة <code>Prefer</code> لنرى ما إذا كان ينبغي تأجيل الاستجابة أو الرد فوراً.</p>
<p>وتُخزَّن دوال رد النداء الخاصة بالطلبات المؤجّلة في مصفوفة <code>waiting</code> الخاصة بالخادم حتى يمكن إخطارها عند حدوث شيء. كما تضبط طريقة <code>waitForChanges</code> فوراً مؤقتاً للرد بحالة 304 عندما يكون الطلب قد انتظر مدة كافية.</p>
<pre><code class="language-js"><span class="hljs-title class_">SkillShareServer</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">waitForChanges</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span>.<span class="hljs-title function_">push</span>(resolve);
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span>.<span class="hljs-title function_">includes</span>(resolve)) <span class="hljs-keyword">return</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r != resolve);
      <span class="hljs-title function_">resolve</span>({<span class="hljs-attr">status</span>: <span class="hljs-number">304</span>});
    }, time * <span class="hljs-number">1000</span>);
  });
};
</code></pre>
<p>وتسجيل تغيير بـ<code>updated</code> يزيد خاصية <code>version</code> ويوقظ كل الطلبات المنتظرة.</p>
<pre><code class="language-js"><span class="hljs-title class_">SkillShareServer</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">updated</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span>++;
  <span class="hljs-keyword">let</span> response = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">talkResponse</span>();
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-title function_">resolve</span>(response));
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">waiting</span> = [];
};
</code></pre>
<p>وبهذا ينتهي كود الخادم. وإذا أنشأنا نسخة من <code>SkillShareServer</code> وشغّلناها على المنفذ 8000، قدّم خادم HTTP الناتج الملفات من الدليل الفرعي <code>public</code> إلى جانب واجهة لإدارة المحادثات تحت URL الـ<code>/talks</code>.</p>
<pre><code class="language-js"><span class="hljs-keyword">new</span> <span class="hljs-title class_">SkillShareServer</span>({}).<span class="hljs-title function_">start</span>(<span class="hljs-number">8000</span>);
</code></pre>
<h2 id="العميل">العميل</h2>
<p>يتكوّن الجزء العميلي من موقع مشاركة المهارات من ثلاثة ملفات: صفحة HTML صغيرة جداً، وورقة أنماط، وملف JavaScript.</p>
<h3 id="html">HTML</h3>
<p>من الاصطلاحات الشائعة الاستخدام أن تحاول خوادم الويب تقديم ملف اسمه <code>index.html</code> عندما يُرسل طلب مباشرة إلى مسار يقابل دليلاً. وخادم الملفات الذي نستخدمه، <code>serve-static</code>، يدعم هذا الاصطلاح. فعندما يُرسل طلب إلى المسار <code>/</code>، يبحث الخادم عن الملف <code>./public/index.html</code> (<code>./public</code> هو الجذر الذي أعطيناه له) ويعيد ذلك الملف إن وجده.</p>
<p>لذا، إذا أردنا أن تظهر صفحة عند توجيه متصفح إلى خادمنا، ينبغي أن نضعها في <code>public/index.html</code>. وهذا هو ملف الفهرس لدينا:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Skill Sharing<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;skillsharing.css&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Skill Sharing<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;skillsharing_client.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يعرّف عنوان المستند ويضمّن ورقة أنماط تعرّف بضعة أنماط لضمان، من بين أمور أخرى، وجود بعض المسافة بين المحادثات. ثم يضيف عنواناً في أعلى الصفحة ويحمّل السكربت الذي يحتوي تطبيق جانب العميل.</p>
<h3 id="الإجراءات">الإجراءات</h3>
<p>تتكوّن حالة التطبيق من قائمة المحادثات واسم المستخدم، وسنخزّنها في كائن <code>{talks, user}</code>. ولا نسمح لواجهة المستخدم بالتلاعب بالحالة مباشرةً أو بإرسال طلبات HTTP. بل يجوز لها أن تصدر <em>إجراءات</em> (actions) تصف ما يحاول المستخدم فعله.</p>
<p>وتأخذ دالة <code>handleAction</code> إجراءً كهذا وتنفّذه. ولأن تحديثات حالتنا بسيطة جداً، تُعالَج تغييرات الحالة في الدالة نفسها.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handleAction</span>(<span class="hljs-params">state, action</span>) {
  <span class="hljs-keyword">if</span> (action.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;setUser&quot;</span>) {
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&quot;userName&quot;</span>, action.<span class="hljs-property">user</span>);
    <span class="hljs-keyword">return</span> {...state, <span class="hljs-attr">user</span>: action.<span class="hljs-property">user</span>};
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;setTalks&quot;</span>) {
    <span class="hljs-keyword">return</span> {...state, <span class="hljs-attr">talks</span>: action.<span class="hljs-property">talks</span>};
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;newTalk&quot;</span>) {
    <span class="hljs-title function_">fetchOK</span>(<span class="hljs-title function_">talkURL</span>(action.<span class="hljs-property">title</span>), {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;PUT&quot;</span>,
      <span class="hljs-attr">headers</span>: {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">presenter</span>: state.<span class="hljs-property">user</span>,
        <span class="hljs-attr">summary</span>: action.<span class="hljs-property">summary</span>
      })
    }).<span class="hljs-title function_">catch</span>(reportError);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;deleteTalk&quot;</span>) {
    <span class="hljs-title function_">fetchOK</span>(<span class="hljs-title function_">talkURL</span>(action.<span class="hljs-property">talk</span>), {<span class="hljs-attr">method</span>: <span class="hljs-string">&quot;DELETE&quot;</span>})
      .<span class="hljs-title function_">catch</span>(reportError);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;newComment&quot;</span>) {
    <span class="hljs-title function_">fetchOK</span>(<span class="hljs-title function_">talkURL</span>(action.<span class="hljs-property">talk</span>) + <span class="hljs-string">&quot;/comments&quot;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;POST&quot;</span>,
      <span class="hljs-attr">headers</span>: {<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">author</span>: state.<span class="hljs-property">user</span>,
        <span class="hljs-attr">message</span>: action.<span class="hljs-property">message</span>
      })
    }).<span class="hljs-title function_">catch</span>(reportError);
  }
  <span class="hljs-keyword">return</span> state;
}
</code></pre>
<p>سنخزّن اسم المستخدم في <code>localStorage</code> حتى يمكن استعادته عند تحميل الصفحة.</p>
<p>أما الإجراءات التي تحتاج إلى إشراك الخادم فترسل طلبات شبكة، باستخدام <code>fetch</code>، إلى واجهة HTTP الموصوفة سابقاً. ونستخدم دالة غلاف، <code>fetchOK</code>، تضمن رفض الوعد المُعاد عندما يعيد الخادم رمز خطأ.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchOK</span>(<span class="hljs-params">url, options</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetch</span>(url, options).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> &lt; <span class="hljs-number">400</span>) <span class="hljs-keyword">return</span> response;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(response.<span class="hljs-property">statusText</span>);
  });
}
</code></pre>
<p>وتُستخدم هذه الدالة المساعدة لبناء URL لمحادثة بعنوان معيّن.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">talkURL</span>(<span class="hljs-params">title</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;talks/&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(title);
}
</code></pre>
<p>وعندما يفشل الطلب، لا نريد لصفحتنا أن تظل جالسة بلا فعل دون تفسير. والدالة المسماة <code>reportError</code>، التي استخدمناها معالجاً لـ<code>catch</code>، تعرض للمستخدم نافذة حوار خشنة تخبره بأن شيئاً ما سار على غير ما يرام.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">reportError</span>(<span class="hljs-params">error</span>) {
  <span class="hljs-title function_">alert</span>(<span class="hljs-title class_">String</span>(error));
}
</code></pre>
<h3 id="عرض-المكونات">عرض المكوّنات</h3>
<p>سنستخدم منهجاً مشابهاً لما رأيناه في <a href="/chapter/project_a_pixel_art_editor">الفصل 19</a>، بتقسيم التطبيق إلى مكوّنات. لكن بما أن بعض المكوّنات إما لا تحتاج إلى التحديث أبداً وإما تُعاد رسمها بالكامل دائماً عند التحديث، سنعرّف تلك المكوّنات لا كأصناف بل كدوال تعيد مباشرة عقدة DOM. مثلاً، هذا مكوّن يعرض الحقل الذي يمكن للمستخدم إدخال اسمه فيه:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">renderUserField</span>(<span class="hljs-params">name, dispatch</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;label&quot;</span>, {}, <span class="hljs-string">&quot;Your name: &quot;</span>, <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;input&quot;</span>, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">value</span>: name,
    <span class="hljs-title function_">onchange</span>(<span class="hljs-params">event</span>) {
      <span class="hljs-title function_">dispatch</span>({<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;setUser&quot;</span>, <span class="hljs-attr">user</span>: event.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>});
    }
  }));
}
</code></pre>
<p>ودالة <code>elt</code> المستخدمة لبناء عناصر DOM هي نفسها التي استخدمناها في <a href="/chapter/project_a_pixel_art_editor">الفصل 19</a>.</p>
<p>وتُستخدم دالة مشابهة لعرض المحادثات، التي تضم قائمة تعليقات ونموذجاً لإضافة تعليق جديد.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">renderTalk</span>(<span class="hljs-params">talk, dispatch</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(
    <span class="hljs-string">&quot;section&quot;</span>, {<span class="hljs-attr">className</span>: <span class="hljs-string">&quot;talk&quot;</span>},
    <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;h2&quot;</span>, <span class="hljs-literal">null</span>, talk.<span class="hljs-property">title</span>, <span class="hljs-string">&quot; &quot;</span>, <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;button&quot;</span>, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;button&quot;</span>,
      <span class="hljs-title function_">onclick</span>(<span class="hljs-params"></span>) {
        <span class="hljs-title function_">dispatch</span>({<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;deleteTalk&quot;</span>, <span class="hljs-attr">talk</span>: talk.<span class="hljs-property">title</span>});
      }
    }, <span class="hljs-string">&quot;Delete&quot;</span>)),
    <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;by &quot;</span>,
        <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;strong&quot;</span>, <span class="hljs-literal">null</span>, talk.<span class="hljs-property">presenter</span>)),
    <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;p&quot;</span>, <span class="hljs-literal">null</span>, talk.<span class="hljs-property">summary</span>),
    ...talk.<span class="hljs-property">comments</span>.<span class="hljs-title function_">map</span>(renderComment),
    <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;form&quot;</span>, {
      <span class="hljs-title function_">onsubmit</span>(<span class="hljs-params">event</span>) {
        event.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">let</span> form = event.<span class="hljs-property">target</span>;
        <span class="hljs-title function_">dispatch</span>({<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;newComment&quot;</span>,
                  <span class="hljs-attr">talk</span>: talk.<span class="hljs-property">title</span>,
                  <span class="hljs-attr">message</span>: form.<span class="hljs-property">elements</span>.<span class="hljs-property">comment</span>.<span class="hljs-property">value</span>});
        form.<span class="hljs-title function_">reset</span>();
      }
    }, <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;input&quot;</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;comment&quot;</span>}), <span class="hljs-string">&quot; &quot;</span>,
       <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;button&quot;</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;submit&quot;</span>}, <span class="hljs-string">&quot;Add comment&quot;</span>)));
}
</code></pre>
<p>وينادي معالج حدث <code>&quot;submit&quot;</code> الدالة <code>form.reset</code> لتفريغ محتوى النموذج بعد إنشاء إجراء <code>&quot;newComment&quot;</code>.</p>
<p>وعند إنشاء قطع DOM متوسطة التعقيد، يبدأ هذا الأسلوب من البرمجة يبدو فوضوياً إلى حد ما. ولتجنب ذلك، يستخدم الناس غالباً <em>لغة قوالب</em> (templating language)، تتيح لك كتابة واجهتك كملف HTML ببعض العلامات الخاصة للدلالة على مواضع العناصر الديناميكية. أو يستخدمون <em>JSX</em>، وهي لهجة JavaScript غير قياسية تتيح لك كتابة شيء قريب جداً من وسوم HTML في برنامجك كما لو كانت تعبيرات JavaScript. وكلا المنهجين يستخدم أدوات إضافية لمعالجة الشيفرة مسبقاً قبل أن يمكن تشغيلها، وهو ما سنجتنبه في هذا الفصل.</p>
<p>وعرض التعليقات بسيط.</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">renderComment</span>(<span class="hljs-params">comment</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;p&quot;</span>, {<span class="hljs-attr">className</span>: <span class="hljs-string">&quot;comment&quot;</span>},
             <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;strong&quot;</span>, <span class="hljs-literal">null</span>, comment.<span class="hljs-property">author</span>),
             <span class="hljs-string">&quot;: &quot;</span>, comment.<span class="hljs-property">message</span>);
}
</code></pre>
<p>وأخيراً، يُعرض النموذج الذي يمكن للمستخدم استخدامه لإنشاء محادثة جديدة هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">renderTalkForm</span>(<span class="hljs-params">dispatch</span>) {
  <span class="hljs-keyword">let</span> title = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;input&quot;</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>});
  <span class="hljs-keyword">let</span> summary = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;input&quot;</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>});
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;form&quot;</span>, {
    <span class="hljs-title function_">onsubmit</span>(<span class="hljs-params">event</span>) {
      event.<span class="hljs-title function_">preventDefault</span>();
      <span class="hljs-title function_">dispatch</span>({<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;newTalk&quot;</span>,
                <span class="hljs-attr">title</span>: title.<span class="hljs-property">value</span>,
                <span class="hljs-attr">summary</span>: summary.<span class="hljs-property">value</span>});
      event.<span class="hljs-property">target</span>.<span class="hljs-title function_">reset</span>();
    }
  }, <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;h3&quot;</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;Submit a Talk&quot;</span>),
     <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;Title: &quot;</span>, title),
     <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;Summary: &quot;</span>, summary),
     <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;button&quot;</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;submit&quot;</span>}, <span class="hljs-string">&quot;Submit&quot;</span>));
}
</code></pre>
<h3 id="الاستقصاء">الاستقصاء</h3>
<p>لبدء التطبيق، نحتاج إلى قائمة المحادثات الحالية. وبما أن التحميل الأولي مرتبط ارتباطاً وثيقاً بعملية الاستقصاء الطويل — إذ يجب استخدام <code>ETag</code> من التحميل عند الاستقصاء — سنكتب دالة تستمر في استقصاء الخادم عن <code>/talks</code> وتنادي دالة رد نداء عندما تتوفر مجموعة جديدة من المحادثات.</p>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">pollTalks</span>(<span class="hljs-params">update</span>) {
  <span class="hljs-keyword">let</span> tag = <span class="hljs-literal">undefined</span>;
  <span class="hljs-keyword">for</span> (;;) {
    <span class="hljs-keyword">let</span> response;
    <span class="hljs-keyword">try</span> {
      response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchOK</span>(<span class="hljs-string">&quot;/talks&quot;</span>, {
        <span class="hljs-attr">headers</span>: tag &amp;&amp; {<span class="hljs-string">&quot;If-None-Match&quot;</span>: tag,
                         <span class="hljs-string">&quot;Prefer&quot;</span>: <span class="hljs-string">&quot;wait=90&quot;</span>}
      });
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Request failed: &quot;</span> + e);
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">500</span>));
      <span class="hljs-keyword">continue</span>;
    }
    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> == <span class="hljs-number">304</span>) <span class="hljs-keyword">continue</span>;
    tag = response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;ETag&quot;</span>);
    <span class="hljs-title function_">update</span>(<span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>());
  }
}
</code></pre>
<p>هذه دالة <code>async</code> حتى يكون التكرار والانتظار للطلب أسهل. وهي تشغّل حلقة لا نهائية تسترجع في كل تكرار قائمة المحادثات — إما عادةً، وإما، إن لم يكن هذا أول طلب، مع تضمين الترويسات التي تجعله طلب استقصاء طويل.</p>
<p>وعندما يفشل طلب، تنتظر الدالة لحظة ثم تحاول مجدداً. وبهذه الطريقة، إذا انقطع اتصالك بالشبكة مدة ثم عاد، يمكن للتطبيق أن يتعافى ويواصل التحديث. والوعد المحلول عبر <code>setTimeout</code> طريقة لإجبار الدالة <code>async</code> على الانتظار.</p>
<p>وعندما يعيد الخادم استجابة 304، فهذا يعني أن طلب استقصاء طويل انتهت مهلته، لذا ينبغي للدالة أن تبدأ الطلب التالي فوراً. وإذا كانت الاستجابة استجابة 200 عادية، يُقرأ جسمها بوصفه JSON ويُمرَّر إلى دالة رد النداء، وتُخزَّن قيمة ترويستها <code>ETag</code> للتكرار التالي.</p>
<h3 id="التطبيق">التطبيق</h3>
<p>يربط المكوّن التالي واجهة المستخدم كلها معاً:</p>
<pre><code class="language-js"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SkillShareApp</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">state, dispatch</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dispatch</span> = dispatch;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">talkDOM</span> = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, {<span class="hljs-attr">className</span>: <span class="hljs-string">&quot;talks&quot;</span>});
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dom</span> = <span class="hljs-title function_">elt</span>(<span class="hljs-string">&quot;div&quot;</span>, <span class="hljs-literal">null</span>,
                   <span class="hljs-title function_">renderUserField</span>(state.<span class="hljs-property">user</span>, dispatch),
                   <span class="hljs-variable language_">this</span>.<span class="hljs-property">talkDOM</span>,
                   <span class="hljs-title function_">renderTalkForm</span>(dispatch));
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">syncState</span>(state);
  }

  <span class="hljs-title function_">syncState</span>(<span class="hljs-params">state</span>) {
    <span class="hljs-keyword">if</span> (state.<span class="hljs-property">talks</span> != <span class="hljs-variable language_">this</span>.<span class="hljs-property">talks</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">talkDOM</span>.<span class="hljs-property">textContent</span> = <span class="hljs-string">&quot;&quot;</span>;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> talk <span class="hljs-keyword">of</span> state.<span class="hljs-property">talks</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">talkDOM</span>.<span class="hljs-title function_">appendChild</span>(
          <span class="hljs-title function_">renderTalk</span>(talk, <span class="hljs-variable language_">this</span>.<span class="hljs-property">dispatch</span>));
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">talks</span> = state.<span class="hljs-property">talks</span>;
    }
  }
}
</code></pre>
<p>وعندما تتغير المحادثات، يعيد هذا المكوّن رسمها كلها. وهذا بسيط لكنه مضيعة أيضاً. وسنعود إلى ذلك في التمارين.</p>
<p>ويمكننا بدء التطبيق هكذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">runApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">let</span> user = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&quot;userName&quot;</span>) || <span class="hljs-string">&quot;Anon&quot;</span>;
  <span class="hljs-keyword">let</span> state, app;
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">dispatch</span>(<span class="hljs-params">action</span>) {
    state = <span class="hljs-title function_">handleAction</span>(state, action);
    app.<span class="hljs-title function_">syncState</span>(state);
  }

  <span class="hljs-title function_">pollTalks</span>(<span class="hljs-function"><span class="hljs-params">talks</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (!app) {
      state = {user, talks};
      app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SkillShareApp</span>(state, dispatch);
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(app.<span class="hljs-property">dom</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">dispatch</span>({<span class="hljs-attr">type</span>: <span class="hljs-string">&quot;setTalks&quot;</span>, talks});
    }
  }).<span class="hljs-title function_">catch</span>(reportError);
}

<span class="hljs-title function_">runApp</span>();
</code></pre>
<p>إذا شغّلت الخادم وفتحت نافذتي متصفح لـ<a href="http://localhost:8000/"><em>http://localhost:8000</em></a> جنباً إلى جنب، يمكنك أن ترى أن الإجراءات التي تنفّذها في نافذة واحدة تظهر فوراً في الأخرى.</p>
<h2 id="التمارين">التمارين</h2>
<p>ستتضمن التمارين التالية تعديل النظام المعرّف في هذا الفصل. وللعمل عليها، تأكد من أنك نزّلت الشيفرة (<a href="https://eloquentjavascript.net/code/skillsharing.zip"><em>https://eloquentjavascript.net/code/skillsharing.zip</em></a>)، وثبّت Node (<a href="https://nodejs.org"><em>https://nodejs.org</em></a>)، وثبّت اعتمادية المشروع بـ<code>npm install</code>.</p>
<h3 id="الحفظ-على-القرص">الحفظ على القرص</h3>
<p>يحتفظ خادم مشاركة المهارات ببياناته في الذاكرة فحسب. وهذا يعني أنه عندما ينهار أو يُعاد تشغيله لأي سبب، تُفقد كل المحادثات والتعليقات.</p>
<p>وسّع الخادم بحيث يخزّن بيانات المحادثات على القرص ويعيد تحميل البيانات تلقائياً عند إعادة تشغيله. لا تقلق بشأن الكفاءة — افعل أبسط شيء يعمل.</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>أبسط حل أستطيع ابتكاره هو ترميز الكائن <code>talks</code> كله بوصفه JSON وإفراغه في ملف بـ<code>writeFile</code>. وهناك بالفعل طريقة (<code>updated</code>) تُنادى كلما تغيّرت بيانات الخادم. ويمكن توسيعها لتكتب البيانات الجديدة إلى القرص.</p>
<p>اختر اسم ملف، مثلاً <code>./talks.json</code>. وعندما يبدأ الخادم، يمكنه محاولة قراءة ذلك الملف بـ<code>readFile</code>، وإن نجح ذلك، يمكن للخادم استخدام محتويات الملف بيانات بداية.</p>
</details>
<h3 id="إعادة-ضبط-حقل-التعليق">إعادة ضبط حقل التعليق</h3>
<p>تعمل إعادة الرسم الكاملة للمحادثات جيداً إلى حد بعيد لأنك عادةً لا تستطيع التمييز بين عقدة DOM وبديلتها المطابقة. لكن هناك استثناءات. فإذا بدأت كتابة شيء في حقل التعليق الخاص بمحادثة في نافذة متصفح، ثم أضفت في نافذة أخرى تعليقاً إلى تلك المحادثة، أُعيد رسم الحقل في النافذة الأولى، ما يزيل محتواه وتركيزه معاً.</p>
<p>وعندما يضيف عدة أشخاص تعليقات في الوقت نفسه، سيكون هذا مزعجاً. هل يمكنك ابتكار طريقة لحله؟</p>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>أفضل طريقة لفعل ذلك هي على الأرجح جعل مكوّن المحادثة كائناً له طريقة <code>syncState</code>، بحيث يمكن تحديثه ليعرض نسخة معدّلة من المحادثة. وفي التشغيل العادي، الطريقة الوحيدة التي يمكن أن تتغير بها محادثة هي إضافة مزيد من التعليقات، لذا يمكن أن تكون طريقة <code>syncState</code> بسيطة نسبياً.</p>
<p>والجزء الصعب هو أنه عندما تصل قائمة محادثات متغيّرة، علينا التوفيق بين قائمة مكوّنات DOM الموجودة والمحادثات في القائمة الجديدة — بحذف المكوّنات التي حُذفت محادثاتها وتحديث المكوّنات التي تغيّرت محادثاتها.</p>
<p>ولفعل ذلك، قد يكون من المفيد الاحتفاظ ببنية بيانات تخزّن مكوّنات المحادثات تحت عناوين المحادثات حتى تستطيع بسهولة معرفة ما إذا كان هناك مكوّن لمحادثة معيّنة. ويمكنك حينئذ التكرار على المصفوفة الجديدة للمحادثات، ولكل منها إما مزامنة مكوّن موجود أو إنشاء مكوّن جديد. ولحذف مكوّنات المحادثات المحذوفة، سيتعين عليك أيضاً التكرار على المكوّنات والتحقق مما إذا كانت المحادثات المقابلة ما زالت موجودة.</p>
</details>
`,e={number:"21",slug:s,title:a,englishTitle:n,headings:l,html:p};export{e as default,n as englishTitle,l as headings,p as html,t as number,s as slug,a as title};
