const p="18",s="http_and_forms",a="HTTP والنماذج",n="HTTP and Forms",t=[{depth:2,id:"البروتوكول",text:"البروتوكول"},{depth:2,id:"المتصفحات-وhttp",text:"المتصفحات وHTTP"},{depth:2,id:"الجلب-fetch",text:"الجلب (Fetch)"},{depth:2,id:"عزل-http-في-صندوق-الرمل",text:"عزل HTTP في صندوق الرمل"},{depth:2,id:"تقدير-http",text:"تقدير HTTP"},{depth:2,id:"الأمان-وhttps",text:"الأمان وHTTPS"},{depth:2,id:"حقول-النموذج",text:"حقول النموذج"},{depth:2,id:"التركيز",text:"التركيز"},{depth:2,id:"الحقول-المعطلة",text:"الحقول المعطّلة"},{depth:2,id:"النموذج-ككل",text:"النموذج ككل"},{depth:2,id:"حقول-النص",text:"حقول النص"},{depth:2,id:"مربعات-الاختيار-وأزرار-الراديو",text:"مربعات الاختيار وأزرار الراديو"},{depth:2,id:"حقول-select",text:"حقول select"},{depth:2,id:"حقول-الملفات",text:"حقول الملفات"},{depth:2,id:"تخزين-البيانات-على-جانب-العميل",text:"تخزين البيانات على جانب العميل"},{depth:2,id:"الملخص",text:"الملخص"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"التفاوض-على-المحتوى",text:"التفاوض على المحتوى"},{depth:3,id:"ورشة-عمل-javascript",text:"ورشة عمل JavaScript"},{depth:3,id:"لعبة-الحياة-لكونواي",text:"لعبة الحياة لكونواي"}],l=`<blockquote>
<p>ما كان يصعب على الناس فهمه غالباً في التصميم هو أنه لم يكن هناك شيء آخر يتجاوز URLs وHTTP وHTML. لم يكن هناك حاسوب مركزي «يتحكم» في الويب، ولا شبكة واحدة تعمل عليها هذه البروتوكولات، ولا حتى منظمة في أي مكان «تدير» الويب. لم يكن الويب «شيئاً» مادياً موجوداً في «مكان» معيّن. كان «فضاءً» يمكن أن توجد فيه المعلومات.</p>
<p>— تيم برنرز-لي</p>
</blockquote>
<p><img src="/images/book/chapter_picture_18.jpg" alt="رسم توضيحي يظهر نموذج تسجيل على الويب على لفافة رق"></p>
<p><em>بروتوكول نقل النص التشعبي</em> (HyperText Transfer Protocol)، الذي قدمناه في <a href="/chapter/javascript_and_the_browser#web">الفصل 13</a>، هو الآلية التي تُطلب بها البيانات وتُقدَّم على الشبكة العنكبوتية العالمية. يصف هذا الفصل البروتوكول بمزيد من التفصيل ويشرح الطريقة التي تصل بها JavaScript في المتصفح إليه.</p>
<h2 id="البروتوكول">البروتوكول</h2>
<p>إذا كتبت <em>eloquentjavascript.net/18_http.html</em> في شريط عناوين متصفحك، يبحث المتصفح أولاً عن عنوان الخادم المرتبط بـ<em>eloquentjavascript.net</em> ويحاول فتح اتصال TCP به على المنفذ 80، المنفذ الافتراضي لحركة HTTP. وإن وُجد الخادم وقبل الاتصال، فقد يرسل المتصفح شيئاً كهذا:</p>
<pre><code class="language-http"><span class="hljs-keyword">GET</span> <span class="hljs-string">/18_http.html</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">Host</span><span class="hljs-punctuation">: </span>eloquentjavascript.net
<span class="hljs-attribute">User-Agent</span><span class="hljs-punctuation">: </span>Your browser&#x27;s name
</code></pre>
<p>ثم يستجيب الخادم، عبر الاتصال نفسه.</p>
<pre><code class="language-http"><span class="hljs-meta">HTTP/1.1</span> <span class="hljs-number">200</span> OK
<span class="hljs-attribute">Content-Length</span><span class="hljs-punctuation">: </span>87320
<span class="hljs-attribute">Content-Type</span><span class="hljs-punctuation">: </span>text/html
<span class="hljs-attribute">Last-Modified</span><span class="hljs-punctuation">: </span>Fri, 13 Oct 2023 10:05:41 GMT

<span class="language-xml"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
... the rest of the document
</span></code></pre>
<p>يأخذ المتصفح الجزء الذي يأتي بعد السطر الفارغ من الاستجابة، أي <em>جسمها</em> (body) — ولا يُخلط بينه وبين وسم HTML ‏<code>&lt;body&gt;</code> — ويعرضه كمستند HTML.</p>
<p>تُسمى المعلومات التي يرسلها العميل <em>الطلب</em>. ويبدأ بهذا السطر:</p>
<pre><code class="language-http"><span class="hljs-keyword">GET</span> <span class="hljs-string">/18_http.html</span> <span class="hljs-meta">HTTP/1.1</span>
</code></pre>
<p>الكلمة الأولى هي <em>طريقة</em> الطلب. وتعني <code>GET</code> أننا نريد <em>الحصول</em> على المورد المحدد. ومن الطرائق الشائعة الأخرى <code>DELETE</code> لحذف مورد، و<code>PUT</code> لإنشائه أو استبداله، و<code>POST</code> لإرسال معلومات إليه. لاحظ أن الخادم غير ملزم بتنفيذ كل طلب يصله. فإذا ذهبت إلى موقع عشوائي وطلبت منه <code>DELETE</code> صفحته الرئيسية، فسيرفض على الأرجح.</p>
<p>الجزء الذي يلي اسم الطريقة هو مسار <em>المورد</em> الذي يخصه الطلب. في أبسط الحالات، يكون المورد مجرد ملف على الخادم، لكن البروتوكول لا يشترط ذلك. فقد يكون المورد أي شيء يمكن نقله <em>كما لو</em> كان ملفاً. وكثير من الخوادم تولّد الاستجابات التي تنتجها في حينه. على سبيل المثال، إذا فتحت <a href="https://github.com/marijnh"><em>https://github.com/marijnh</em></a>، يبحث الخادم في قاعدة بياناته عن مستخدم اسمه &quot;marijnh&quot;، وإن وجده، يولّد صفحة تعريف بذلك المستخدم.</p>
<p>بعد مسار المورد، يذكر السطر الأول من الطلب <code>HTTP/1.1</code> للإشارة إلى إصدار بروتوكول HTTP المستخدم.</p>
<p>عملياً، تستخدم مواقع كثيرة الإصدار 2 من HTTP، وهو يدعم المفاهيم نفسها التي يدعمها الإصدار 1.1 لكنه أكثر تعقيداً بكثير كي يكون أسرع. وستتحول المتصفحات تلقائياً إلى إصدار البروتوكول المناسب عند التحدث إلى خادم معيّن، ونتيجة الطلب واحدة بصرف النظر عن الإصدار المستخدم. ولأن الإصدار 1.1 أبسط وأسهل للتجربة، سنستخدمه لشرح البروتوكول.</p>
<p>ستبدأ استجابة الخادم بإصدار أيضاً، يليه حالة الاستجابة، أولاً كرمز حالة من ثلاثة أرقام ثم كنص مقروء للبشر.</p>
<pre><code class="language-http"><span class="hljs-meta">HTTP/1.1</span> <span class="hljs-number">200</span> OK
</code></pre>
<p>رموز الحالة التي تبدأ بالرقم 2 تدل على نجاح الطلب. أما الرموز التي تبدأ بالرقم 4 فتعني أن ثمة خطأ في الطلب. وأشهر رمز حالة HTTP هو على الأرجح 404، ويعني أنه تعذّر العثور على المورد. والرموز التي تبدأ بالرقم 5 تعني أن خطأ حدث على الخادم وأن الطلب ليس مسؤولاً عن ذلك.</p>
<p>قد يتبع السطر الأول من الطلب أو الاستجابة أي عدد من <em>الترويسات</em> (headers). وهي أسطر بالصيغة <code>name: value</code> تحدد معلومات إضافية عن الطلب أو الاستجابة. كانت هذه الترويسات جزءاً من الاستجابة في المثال:</p>
<pre><code>Content-Length: 87320
Content-Type: text/html
Last-Modified: Fri, 13 Oct 2023 10:05:41 GMT
</code></pre>
<p>يخبرنا هذا بحجم مستند الاستجابة ونوعه. في هذه الحالة، إنه مستند HTML حجمه 87,320 بايت. ويخبرنا أيضاً بآخر مرة عُدّل فيها ذلك المستند.</p>
<p>للعميل والخادم الحرية في تقرير الترويسات التي يضمّنانها في طلباتهما أو استجاباتهما. لكن بعضها ضروري لكي تعمل الأمور. مثلاً، من دون ترويسة <code>Content-Type</code> في الاستجابة، لن يعرف المتصفح كيف يعرض المستند.</p>
<p>بعد الترويسات، قد يضم الطلب والاستجابة معاً سطراً فارغاً يليه جسم يحتوي المستند الفعلي المرسل. ولا ترسل طلبات <code>GET</code> و<code>DELETE</code> أي بيانات معها، بينما تفعل طلبات <code>PUT</code> و<code>POST</code>. وبعض أنواع الاستجابات، كاستجابات الخطأ، لا تتطلب جسمًا أيضاً.</p>
<h2 id="المتصفحات-وhttp">المتصفحات وHTTP</h2>
<p>كما رأينا، يُجري المتصفح طلباً عندما ندخل URL في شريط عنوانه. وعندما تشير صفحة HTML الناتجة إلى ملفات أخرى، كالصور وملفات JavaScript، فسيسترجعها أيضاً.</p>
<p>يمكن لموقع معقد بدرجة متوسطة أن يضم بسهولة ما بين 10 و200 مورد. ولكي يجلبها بسرعة، يُجري المتصفح عدة طلبات <code>GET</code> في الوقت نفسه، بدلاً من انتظار الاستجابات واحدة تلو الأخرى.</p>
<p>قد تتضمن صفحات HTML <em>نماذج</em> (forms) تتيح للمستخدم تعبئة معلومات وإرسالها إلى الخادم. هذا مثال على نموذج:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">method</span>=<span class="hljs-string">&quot;GET&quot;</span> <span class="hljs-attr">action</span>=<span class="hljs-string">&quot;example/message.html&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Name: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Message:<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Send<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p>تصف هذه الشيفرة نموذجاً بحقلين: حقل صغير يطلب الاسم وحقل أكبر لكتابة رسالة. وعندما تنقر زر Send، يُرسَل النموذج (submitted)، أي يُحزَم محتوى حقوله في طلب HTTP وينتقل المتصفح إلى نتيجة ذلك الطلب.</p>
<p>عندما تكون خاصية <code>method</code> في عنصر <code>&lt;form&gt;</code> هي <code>GET</code> (أو غائبة)، تُضاف معلومات النموذج إلى نهاية URL الخاص بـ<code>action</code> على هيئة <em>سلسلة استعلام</em> (query string). وقد يُجري المتصفح طلباً إلى هذا URL:</p>
<pre><code>GET /example/message.html?name=Jean&amp;message=Yes%3F HTTP/1.1
</code></pre>
<p>تشير علامة الاستفهام إلى نهاية جزء المسار في URL وبداية الاستعلام. ويتبعها أزواج من الأسماء والقيم، تقابل خاصية <code>name</code> في عناصر حقول النموذج ومحتوى تلك العناصر على الترتيب. وتُستخدم علامة العطف (<code>&amp;</code>) للفصل بين الأزواج.</p>
<p>الرسالة الفعلية المرمّزة في URL هي &quot;Yes?&quot; لكن علامة الاستفهام استُبدلت برمز غريب. فبعض المحارف في سلاسل الاستعلام يجب تخطّيها (escaped). وعلامة الاستفهام، الممثلة بـ<code>%3F</code>، من تلك المحارف. ويبدو أن هناك قاعدة غير مكتوبة تقول إن كل صيغة تحتاج طريقتها الخاصة في تخطّي المحارف. وهذه الصيغة، المسماة <em>ترميز URL</em> (URL encoding)، تستخدم علامة النسبة المئوية متبوعة برقمين ست عشريين (أساس 16) يرمّزان رمز المحرف. في هذه الحالة، 3F، وهو 63 في الترميز العشري، هو رمز محرف علامة الاستفهام. وتوفر JavaScript الدالتين <code>encodeURIComponent</code> و<code>decodeURIComponent</code> لترميز هذه الصيغة وفك ترميزها.</p>
<pre><code class="language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-string">&quot;Yes?&quot;</span>));
<span class="hljs-comment">// → Yes%3F</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-string">&quot;Yes%3F&quot;</span>));
<span class="hljs-comment">// → Yes?</span>
</code></pre>
<p>إذا غيّرنا خاصية <code>method</code> في نموذج HTML الذي رأيناه سابقاً إلى <code>POST</code>، فسيستخدم طلب HTTP الذي يُرسَل به النموذج الطريقة <code>POST</code> ويضع سلسلة الاستعلام في جسم الطلب بدلاً من إضافتها إلى URL.</p>
<pre><code class="language-http"><span class="hljs-keyword">POST</span> <span class="hljs-string">/example/message.html</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">Content-length</span><span class="hljs-punctuation">: </span>24
<span class="hljs-attribute">Content-type</span><span class="hljs-punctuation">: </span>application/x-www-form-urlencoded

<span class="language-freedesktop"><span class="hljs-attr">name</span><span class="hljs-operator">=</span>Jean&amp;message<span class="hljs-operator">=</span>Yes%3F
</span></code></pre>
<p>ينبغي استخدام طلبات <code>GET</code> للطلبات التي ليس لها تأثيرات جانبية وإنما تطلب معلومات فقط. أما الطلبات التي تغيّر شيئاً على الخادم، كإنشاء حساب جديد أو نشر رسالة، فينبغي التعبير عنها بطرائق أخرى مثل <code>POST</code>. ويعرف برنامج العميل مثل المتصفح أنه لا ينبغي أن يُجري طلبات <code>POST</code> على نحو أعمى، لكنه سيجري غالباً طلبات <code>GET</code> ضمنياً — للجلب المسبق لمورد يعتقد أن المستخدم سيحتاجه قريباً، مثلاً.</p>
<p>سنعود إلى النماذج وكيفية التفاعل معها من JavaScript <a href="/chapter/http_and_forms#forms">لاحقاً في هذا الفصل</a>.</p>
<h2 id="الجلب-fetch">الجلب (Fetch)</h2>
<p>تسمى الواجهة التي تستطيع بها JavaScript في المتصفح إجراء طلبات HTTP بـ<code>fetch</code>.</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;example/data.txt&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(response.<span class="hljs-property">status</span>);
  <span class="hljs-comment">// → 200</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;Content-Type&quot;</span>));
  <span class="hljs-comment">// → text/plain</span>
});
</code></pre>
<p>يعيد استدعاء <code>fetch</code> وعداً يُحلّ إلى كائن <code>Response</code> يحمل معلومات عن استجابة الخادم، كرمز حالتها وترويساتها. والترويسات ملفوفة في كائن شبيه بـ<code>Map</code> يتعامل مع مفاتيحه (أسماء الترويسات) بلا حساسية لحالة الأحرف، لأن أسماء الترويسات لا يُفترض أن تكون حساسة لحالة الأحرف. وهذا يعني أن <code>headers.get(&quot;Content-Type&quot;)</code> و<code>headers.get(&quot;content-TYPE&quot;)</code> سيعيدان القيمة نفسها.</p>
<p>لاحظ أن الوعد الذي يعيده <code>fetch</code> يُحلّ بنجاح حتى لو استجاب الخادم برمز خطأ. ويمكن أيضاً رفضه إذا حدث خطأ في الشبكة أو إذا تعذّر العثور على الخادم الموجّه إليه الطلب.</p>
<p>المعطى الأول لـ<code>fetch</code> هو URL المطلوب. وعندما لا يبدأ ذلك URL باسم بروتوكول (مثل <em>http:</em>)، يُعامل باعتباره <em>نسبياً</em>، أي يُفسَّر نسبةً إلى المستند الحالي. وعندما يبدأ بشرطة مائلة (/)، فإنه يستبدل المسار الحالي، وهو الجزء الذي يلي اسم الخادم. وعندما لا يبدأ بها، يُوضع الجزء من المسار الحالي حتى آخر شرطة مائلة فيه (شاملةً إياها) أمام URL النسبي.</p>
<p>للوصول إلى المحتوى الفعلي للاستجابة، يمكنك استخدام طريقتها <code>text</code>. ولأن الوعد الأولي يُحلّ بمجرد استلام ترويسات الاستجابة، ولأن قراءة جسم الاستجابة قد تستغرق وقتاً أطول، فإن هذه الطريقة تعيد وعداً مرة أخرى.</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;example/data.txt&quot;</span>)
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> resp.<span class="hljs-title function_">text</span>())
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(text));
<span class="hljs-comment">// → This is the content of data.txt</span>
</code></pre>
<p>وثمة طريقة مشابهة تُسمى <code>json</code> تعيد وعداً يُحلّ إلى القيمة التي تحصل عليها عند تحليل الجسم كـJSON أو يُرفض إذا لم يكن JSON صالحاً.</p>
<p>يستخدم <code>fetch</code> افتراضياً الطريقة <code>GET</code> لإجراء طلبه ولا يضم جسم طلب. ويمكنك تهيئته على نحو مختلف بتمرير كائن بخيارات إضافية كمعطى ثانٍ. مثلاً، يحاول هذا الطلب حذف <code>example/data.txt</code>:</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;example/data.txt&quot;</span>, {<span class="hljs-attr">method</span>: <span class="hljs-string">&quot;DELETE&quot;</span>}).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(resp.<span class="hljs-property">status</span>);
  <span class="hljs-comment">// → 405</span>
});
</code></pre>
<p>رمز الحالة 405 يعني &quot;الطريقة غير مسموح بها&quot;، وهي طريقة خادم HTTP في قول &quot;أخشى أنني لا أستطيع فعل ذلك&quot;.</p>
<p>لإضافة جسم طلب إلى طلب <code>PUT</code> أو <code>POST</code>، يمكنك تضمين خيار <code>body</code>. ولتعيين الترويسات، هناك خيار <code>headers</code>. مثلاً، يضم هذا الطلب ترويسة <code>Range</code> التي تطلب من الخادم إعادة جزء من المستند فقط.</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;example/data.txt&quot;</span>, {<span class="hljs-attr">headers</span>: {<span class="hljs-title class_">Range</span>: <span class="hljs-string">&quot;bytes=8-19&quot;</span>}})
  .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> resp.<span class="hljs-title function_">text</span>())
  .<span class="hljs-title function_">then</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>);
<span class="hljs-comment">// → the content</span>
</code></pre>
<p>سيضيف المتصفح تلقائياً بعض ترويسات الطلب، مثل &quot;Host&quot; وتلك التي يحتاجها الخادم لمعرفة حجم الجسم. لكن إضافة ترويساتك الخاصة مفيدة غالباً لتضمين أشياء مثل معلومات المصادقة أو إخبار الخادم بصيغة الملف التي تودّ استلامها.</p>
<h2 id="عزل-http-في-صندوق-الرمل">عزل HTTP في صندوق الرمل</h2>
<p>إجراء طلبات HTTP في سكربتات صفحات الويب يثير من جديد مخاوف تتعلق بالأمان. فالشخص الذي يتحكم في السكربت قد لا تكون له المصالح نفسها التي لمن يعمل على حاسوبه. وبشكل أكثر تحديداً، إذا زرت <em>themafia.org</em>، لا أريد أن تتمكن سكربتاته من إجراء طلب إلى <em>mybank.com</em>، باستخدام معلومات تعريفية من متصفحي، مع تعليمات بتحويل كل أموالي بعيداً.</p>
<p>لهذا السبب، يحمينا المتصفح بمنع السكربتات من إجراء طلبات HTTP إلى نطاقات أخرى (أسماء مثل <em>themafia.org</em> و<em>mybank.com</em>).</p>
<p>قد تكون هذه مشكلة مزعجة عند بناء أنظمة تريد الوصول إلى عدة نطاقات لأسباب مشروعة. لحسن الحظ، يمكن للخوادم تضمين ترويسة كهذه في استجابتها للإشارة صراحةً إلى المتصفح بأنه لا مانع من أن يأتي الطلب من نطاق آخر:</p>
<pre><code>Access-Control-Allow-Origin: *
</code></pre>
<h2 id="تقدير-http">تقدير HTTP</h2>
<p>عند بناء نظام يتطلب تواصلاً بين برنامج JavaScript يعمل في المتصفح (على جانب العميل) وبرنامج على خادم (على جانب الخادم)، توجد طرق مختلفة عدة لنمذجة هذا التواصل.</p>
<p>من النماذج الشائعة <em>استدعاءات الإجراءات عن بعد</em> (remote procedure calls). في هذا النموذج، يتبع التواصل أنماط استدعاءات الدوال العادية، إلا أن الدالة تعمل فعلياً على جهاز آخر. ويتضمن استدعاؤها إجراء طلب إلى الخادم يشمل اسم الدالة ومعطياتها. وتحتوي الاستجابة لذلك الطلب على القيمة المُرجَعة.</p>
<p>عند التفكير بمصطلحات استدعاءات الإجراءات عن بعد، يكون HTTP مجرد وسيلة للتواصل، وستكتب على الأرجح طبقة تجريد تخفيه كلياً.</p>
<p>وثمة نهج آخر هو بناء تواصلك حول مفهوم الموارد وطرائق HTTP. فبدلاً من إجراء عن بعد يُسمى <code>addUser</code>، تستخدم طلب <code>PUT</code> إلى <code>/users/larry</code>. وبدلاً من ترميز خصائص ذلك المستخدم في معطيات دالة، تعرّف صيغة مستند JSON (أو تستخدم صيغة موجودة) تمثل مستخدماً. ويكون جسم طلب <code>PUT</code> لإنشاء مورد جديد مستنداً كهذا. ويُجلب المورد بإجراء طلب <code>GET</code> إلى URL المورد (مثلاً <code>/users/larry</code>)، وهو يعيد بدوره المستند الذي يمثل المورد.</p>
<p>يسهّل هذا النهج الثاني استخدام بعض الميزات التي يوفرها HTTP، مثل دعم تخزين الموارد مؤقتاً (الاحتفاظ بنسخة من المورد على العميل للوصول السريع). والمفاهيم المستخدمة في HTTP، وهي مصممة تصميماً جيداً، يمكن أن توفر مجموعة مفيدة من المبادئ لتصميم واجهة خادمك حولها.</p>
<h2 id="الأمان-وhttps">الأمان وHTTPS</h2>
<p>تميل البيانات المسافرة عبر الإنترنت إلى سلوك طريق طويل خطير. فللوصول إلى وجهتها، عليها أن تتنقل عبر أي شيء من نقاط اتصال Wi-Fi في المقاهي إلى شبكات تسيطر عليها شركات ودول شتى. وفي أي نقطة على طول طريقها، قد تُفحَص أو حتى تُعدَّل.</p>
<p>إذا كان من المهم أن يبقى شيء ما سراً، ككلمة مرور حساب بريدك الإلكتروني، أو أن يصل إلى وجهته دون تعديل، كرقم الحساب الذي تحوّل إليه المال عبر موقع بنكك، فإن HTTP العادي ليس كافياً.</p>
<p>بروتوكول HTTP الآمن، المستخدم في عناوين URL التي تبدأ بـ<em>https://</em>، يلفّ حركة HTTP بطريقة تجعل قراءتها والتلاعب بها أصعب. وقبل تبادل البيانات، يتحقق العميل من أن الخادم هو من يدّعي أنه هو بأن يطلب منه إثبات حيازته شهادة تشفير (cryptographic certificate) صادرة عن جهة إصدار شهادات يعرفها المتصفح. بعد ذلك، تُشفَّر كل البيانات المارة عبر الاتصال بطريقة ينبغي أن تمنع التنصت والتلاعب.</p>
<p>وهكذا، عندما يعمل على نحو صحيح، يمنع HTTPS الآخرين من انتحال هوية الموقع الذي تحاول التحدث إليه <em>ومن</em> التجسس على تواصلك. وهو ليس مثالياً، وقد وقعت حوادث شتى فشل فيها HTTPS بسبب شهادات مزوّرة أو مسروقة وبرمجيات معطوبة، لكنه أكثر أماناً <em>بكثير</em> من HTTP العادي.</p>
<h2 id="حقول-النموذج">حقول النموذج</h2>
<p>صُممت النماذج أصلاً للويب قبل JavaScript لتتيح للمواقع إرسال المعلومات التي يقدّمها المستخدم في طلب HTTP. ويفترض هذا التصميم أن التفاعل مع الخادم يحدث دائماً بالانتقال إلى صفحة جديدة.</p>
<p>غير أن عناصر النموذج جزء من DOM، مثل بقية الصفحة، وعناصر DOM التي تمثل حقول النموذج تدعم عدداً من الخصائص والأحداث غير الموجودة في عناصر أخرى. وهذه تجعل من الممكن فحص حقول الإدخال هذه والتحكم فيها ببرامج JavaScript، وفعل أشياء مثل إضافة وظائف جديدة إلى نموذج أو استخدام النماذج والحقول لبناتٍ أساسية في تطبيق JavaScript.</p>
<p>يتكوّن نموذج الويب من أي عدد من حقول الإدخال مجمّعة في وسم <code>&lt;form&gt;</code>. وتتيح HTML أنماطاً مختلفة عدة من الحقول، تتراوح بين مربعات اختيار بسيطة تعمل بالتشغيل/الإيقاف وقوائم منسدلة وحقول لإدخال النصوص. لن يحاول هذا الكتاب مناقشة جميع أنواع الحقول على نحو شامل، لكننا سنبدأ بلمحة عامة موجزة.</p>
<p>تستخدم أنواع كثيرة من الحقول وسم <code>&lt;input&gt;</code>. وتُستخدم خاصية <code>type</code> في هذا الوسم لاختيار نمط الحقل. وهذه بعض أنواع <code>&lt;input&gt;</code> الشائعة الاستخدام:</p>
<table>
<thead>
<tr>
<th><code>text</code></th>
<th>حقل نص من سطر واحد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>password</code></td>
<td>مثل <code>text</code> لكنه يخفي النص المكتوب</td>
</tr>
<tr>
<td><code>checkbox</code></td>
<td>مفتاح تشغيل/إيقاف</td>
</tr>
<tr>
<td><code>color</code></td>
<td>لون</td>
</tr>
<tr>
<td><code>date</code></td>
<td>تاريخ تقويمي</td>
</tr>
<tr>
<td><code>radio</code></td>
<td>(جزء من) حقل اختيار من متعدد</td>
</tr>
<tr>
<td><code>file</code></td>
<td>يتيح للمستخدم اختيار ملف من حاسوبه</td>
</tr>
</tbody>
</table>
<p>لا يلزم بالضرورة أن تظهر حقول النموذج داخل وسم <code>&lt;form&gt;</code>. يمكنك وضعها في أي مكان في الصفحة. ومثل هذه الحقول الخالية من نموذج لا يمكن إرسالها (فالنموذج ككل وحده يمكن إرساله)، لكننا عندما نستجيب للإدخال بـJavaScript، لا نريد غالباً إرسال حقولنا بالطريقة العادية على أي حال.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;abc&quot;</span>&gt;</span> (text)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;abc&quot;</span>&gt;</span> (password)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>&gt;</span> (checkbox)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;color&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;orange&quot;</span>&gt;</span> (color)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;date&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;2023-10-13&quot;</span>&gt;</span> (date)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;A&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;choice&quot;</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;B&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;choice&quot;</span> <span class="hljs-attr">checked</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;C&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;choice&quot;</span>&gt;</span> (radio)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>&gt;</span> (file)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>تختلف واجهة JavaScript لهذه العناصر باختلاف نوع العنصر.</p>
<p>لحقول النص متعددة الأسطر وسمها الخاص، <code>&lt;textarea&gt;</code>، لأن استخدام خاصية لتحديد قيمة ابتدائية متعددة الأسطر سيكون مربكاً على الأرجح. ويتطلب وسم <code>&lt;textarea&gt;</code> وسم إغلاق مطابقاً <code>&lt;/textarea&gt;</code> ويستخدم النص بينهما، بدلاً من خاصية <code>value</code>، كنص ابتدائي.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span>
one
two
three
<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
</code></pre>
<p>وأخيراً، يُستخدم وسم <code>&lt;select&gt;</code> لإنشاء حقل يتيح للمستخدم الاختيار من عدد من الخيارات المعرّفة مسبقاً.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Pancakes<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Pudding<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Ice cream<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
</code></pre>
<p>كلما تغيّرت قيمة حقل نموذج، يُطلق حدث <code>&quot;change&quot;</code>.</p>
<h2 id="التركيز">التركيز</h2>
<p>خلافاً لمعظم العناصر في مستندات HTML، يمكن لحقول النموذج أن تحصل على <em>تركيز لوحة المفاتيح</em> (keyboard focus). فعند النقر عليها، أو الانتقال إليها بمفتاح tab، أو تنشيطها بطريقة أخرى، تصبح العنصر النشط حالياً والمتلقي لإدخال لوحة المفاتيح.</p>
<p>وبالتالي، لا يمكنك الكتابة في حقل نص إلا عندما يكون مركّزاً. وتستجيب الحقول الأخرى لأحداث لوحة المفاتيح على نحو مختلف. مثلاً، تحاول قائمة <code>&lt;select&gt;</code> الانتقال إلى الخيار الذي يحتوي النص الذي كتبه المستخدم، وتستجيب لمفاتيح الأسهم بتحريك اختيارها صعوداً ونزولاً.</p>
<p>يمكننا التحكم في التركيز من JavaScript بالطريقتين <code>focus</code> و<code>blur</code>. تنقل الأولى التركيز إلى عنصر DOM الذي تُستدعى عليه، وتزيل الثانية التركيز. وتقابل القيمة في <code>document.activeElement</code> العنصر المركّز حالياً.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;input&quot;</span>).<span class="hljs-title function_">focus</span>();
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span>.<span class="hljs-property">tagName</span>);
  <span class="hljs-comment">// → INPUT</span>
  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;input&quot;</span>).<span class="hljs-title function_">blur</span>();
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span>.<span class="hljs-property">tagName</span>);
  <span class="hljs-comment">// → BODY</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>في بعض الصفحات، يُتوقع أن يريد المستخدم التفاعل مع حقل نموذج فوراً. ويمكن استخدام JavaScript لتركيز هذا الحقل عند تحميل المستند، لكن HTML توفر أيضاً خاصية <code>autofocus</code> التي تحقق التأثير نفسه وتُعلِم المتصفح بما نحاول تحقيقه. وهذا يمنح المتصفح خيار تعطيل السلوك عندما لا يكون مناسباً، كما حين يكون المستخدم قد وضع التركيز على شيء آخر.</p>
<p>تتيح المتصفحات للمستخدم تحريك التركيز عبر المستند بالضغط على tab للانتقال إلى العنصر التالي القابل للتركيز، وshift-tab للرجوع إلى العنصر السابق. وافتراضياً، تُزار العناصر بالترتيب الذي تظهر به في المستند. ويمكن استخدام خاصية <code>tabindex</code> لتغيير هذا الترتيب. وسيتيح المستند المثال التالي للتركيز القفز من حقل النص إلى زر OK، بدلاً من المرور أولاً برابط المساعدة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">1</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;.&quot;</span>&gt;</span>(help)<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;console.log(&#x27;ok&#x27;)&quot;</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">2</span>&gt;</span>OK<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>افتراضياً، لا يمكن تركيز معظم أنواع عناصر HTML. ويمكنك إضافة خاصية <code>tabindex</code> إلى أي عنصر لجعله قابلاً للتركيز. وقيمة <code>tabindex</code> تساوي 0 تجعل العنصر قابلاً للتركيز من دون التأثير في ترتيب التركيز.</p>
<h2 id="الحقول-المعطلة">الحقول المعطّلة</h2>
<p>يمكن <em>تعطيل</em> جميع حقول النموذج عبر خاصية <code>disabled</code>. وهي خاصية يمكن تحديدها بلا قيمة — فمجرد وجودها يعطّل العنصر.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>I&#x27;m all right<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>&gt;</span>I&#x27;m out<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>لا يمكن تركيز الحقول المعطّلة أو تغييرها، وتجعلها المتصفحات تبدو رمادية وباهتة.</p>
<p>عندما يكون برنامج في طور معالجة إجراء ناتج عن زر ما أو عنصر تحكم آخر قد يتطلب تواصلاً مع الخادم وبالتالي يستغرق وقتاً، فقد تكون فكرة جيدة تعطيل عنصر التحكم حتى ينتهي الإجراء. وبهذه الطريقة، عندما ينفد صبر المستخدم وينقر عليه مرة أخرى، لن يكرر إجراؤه عن غير قصد.</p>
<h2 id="النموذج-ككل">النموذج ككل</h2>
<p>عندما يكون حقل ما محتوى في عنصر <code>&lt;form&gt;</code>، سيكون لعنصر DOM الخاص به خاصية <code>form</code> تربطه رجوعاً بعنصر DOM الخاص بالنموذج. وعنصر <code>&lt;form&gt;</code> بدوره له خاصية تُسمى <code>elements</code> تحتوي مجموعة شبيهة بمصفوفة من الحقول داخله.</p>
<p>تحدد خاصية <code>name</code> في حقل النموذج الطريقة التي ستُعرَّف بها قيمته عند إرسال النموذج. ويمكن استخدامها أيضاً كاسم خاصية عند الوصول إلى خاصية <code>elements</code> في النموذج، وهي تعمل كائنًا شبيهًا بمصفوفة (يمكن الوصول إليه بالرقم) وخريطة (يمكن الوصول إليها بالاسم) في آن واحد.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">&quot;example/submit.html&quot;</span>&gt;</span>
  Name: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  Password: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;password&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Log in<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> form = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;form&quot;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(form.<span class="hljs-property">elements</span>[<span class="hljs-number">1</span>].<span class="hljs-property">type</span>);
  <span class="hljs-comment">// → password</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(form.<span class="hljs-property">elements</span>.<span class="hljs-property">password</span>.<span class="hljs-property">type</span>);
  <span class="hljs-comment">// → password</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(form.<span class="hljs-property">elements</span>.<span class="hljs-property">name</span>.<span class="hljs-property">form</span> == form);
  <span class="hljs-comment">// → true</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>الزر الذي تكون خاصية <code>type</code> فيه <code>submit</code> سيتسبب، عند ضغطه، في إرسال النموذج. ولضغط مفتاح enter عندما يكون حقل نموذج مركّزاً التأثير نفسه.</p>
<p>يعني إرسال النموذج عادةً أن المتصفح ينتقل إلى الصفحة المشار إليها بخاصية <code>action</code> في النموذج، باستخدام طلب <code>GET</code> أو <code>POST</code>. لكن قبل حدوث ذلك، يُطلق حدث <code>&quot;submit&quot;</code>. ويمكنك معالجة هذا الحدث بـJavaScript ومنع هذا السلوك الافتراضي باستدعاء <code>preventDefault</code> على كائن الحدث.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
  Value: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;value&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> form = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;form&quot;</span>);
  form.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;submit&quot;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Saving value&quot;</span>, form.<span class="hljs-property">elements</span>.<span class="hljs-property">value</span>.<span class="hljs-property">value</span>);
    event.<span class="hljs-title function_">preventDefault</span>();
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>لاعتراض أحداث <code>&quot;submit&quot;</code> في JavaScript استخدامات شتى. يمكننا كتابة شيفرة للتحقق من أن القيم التي أدخلها المستخدم معقولة وإظهار رسالة خطأ فوراً بدلاً من إرسال النموذج. أو يمكننا تعطيل الطريقة العادية لإرسال النموذج كلياً، كما في المثال، وجعل برنامجنا يتولى الإدخال، ربما باستخدام <code>fetch</code> لإرساله إلى خادم من دون إعادة تحميل الصفحة.</p>
<h2 id="حقول-النص">حقول النص</h2>
<p>تتشارك الحقول المنشأة بوسم <code>&lt;textarea&gt;</code>، أو بوسم <code>&lt;input&gt;</code> من النوع <code>text</code> أو <code>password</code>، واجهة مشتركة. فلعناصر DOM الخاصة بها خاصية <code>value</code> تحمل محتواها الحالي كقيمة نصية. وتعيين هذه الخاصية إلى نص آخر يغيّر محتوى الحقل.</p>
<p>تعطينا خاصيتا <code>selectionStart</code> و<code>selectionEnd</code> في حقول النص معلومات عن المؤشر والتحديد في النص. وعندما لا يكون هناك تحديد، تحمل الخاصيتان الرقم نفسه، مشيرتين إلى موضع المؤشر. مثلاً، 0 يشير إلى بداية النص، و10 يشير إلى أن المؤشر بعد المحرف العاشر. وعندما يكون جزء من الحقل محدداً، تختلف الخاصيتان، فتعطياننا بداية النص المحدد ونهايته. ومثل <code>value</code>، يمكن أيضاً الكتابة في هاتين الخاصيتين.</p>
<p>تخيل أنك تكتب مقالاً عن خع سخموي، آخر فراعنة الأسرة الثانية، لكنك تواجه بعض الصعوبة في كتابة اسمه. تربط الشيفرة التالية وسم <code>&lt;textarea&gt;</code> بمعالج حدث يُدرج لك النص &quot;Khasekhemwy&quot; عند الضغط على F2.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> textarea = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;textarea&quot;</span>);
  textarea.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;keydown&quot;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> == <span class="hljs-string">&quot;F2&quot;</span>) {
      <span class="hljs-title function_">replaceSelection</span>(textarea, <span class="hljs-string">&quot;Khasekhemwy&quot;</span>);
      event.<span class="hljs-title function_">preventDefault</span>();
    }
  });
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">replaceSelection</span>(<span class="hljs-params">field, word</span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">from</span> = field.<span class="hljs-property">selectionStart</span>, to = field.<span class="hljs-property">selectionEnd</span>;
    field.<span class="hljs-property">value</span> = field.<span class="hljs-property">value</span>.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-keyword">from</span>) + word +
                  field.<span class="hljs-property">value</span>.<span class="hljs-title function_">slice</span>(to);
    <span class="hljs-comment">// ضع المؤشر بعد الكلمة</span>
    field.<span class="hljs-property">selectionStart</span> = <span class="hljs-keyword">from</span> + word.<span class="hljs-property">length</span>;
    field.<span class="hljs-property">selectionEnd</span> = <span class="hljs-keyword">from</span> + word.<span class="hljs-property">length</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تستبدل دالة <code>replaceSelection</code> الجزء المحدد حالياً من محتوى حقل النص بالكلمة المعطاة، ثم تنقل المؤشر بعد تلك الكلمة ليتمكن المستخدم من مواصلة الكتابة.</p>
<p>لا يُطلق حدث <code>&quot;change&quot;</code> في حقل النص كلما كُتب شيء. بل يُطلق عندما يفقد الحقل التركيز بعد تغيّر محتواه. وللاستجابة فوراً للتغيرات في حقل نص، ينبغي أن تسجّل معالجاً لحدث <code>&quot;input&quot;</code> بدلاً من ذلك، وهو يُطلق كلما كتب المستخدم محرفاً أو حذف نصاً أو تعامل مع محتوى الحقل بأي طريقة أخرى.</p>
<p>يعرض المثال التالي حقل نص وعدّاداً يُظهر الطول الحالي للنص في الحقل:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span> length: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;length&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> text = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;input&quot;</span>);
  <span class="hljs-keyword">let</span> output = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#length&quot;</span>);
  text.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;input&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    output.<span class="hljs-property">textContent</span> = text.<span class="hljs-property">value</span>.<span class="hljs-property">length</span>;
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="مربعات-الاختيار-وأزرار-الراديو">مربعات الاختيار وأزرار الراديو</h2>
<p>حقل مربع الاختيار مفتاح تبديل ثنائي. ويمكن استخراج قيمته أو تغييرها عبر خاصيته <code>checked</code> التي تحمل قيمة منطقية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;purple&quot;</span>&gt;</span> Make this page purple
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> checkbox = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#purple&quot;</span>);
  checkbox.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">style</span>.<span class="hljs-property">background</span> =
      checkbox.<span class="hljs-property">checked</span> ? <span class="hljs-string">&quot;mediumpurple&quot;</span> : <span class="hljs-string">&quot;&quot;</span>;
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يربط وسم <code>&lt;label&gt;</code> قطعة من المستند بحقل إدخال. والنقر في أي مكان على التسمية ينشّط الحقل، فيركّز عليه ويبدّل قيمته عندما يكون مربع اختيار أو زر راديو.</p>
<p>يشبه زر الراديو مربع الاختيار، لكنه مرتبط ضمنياً بأزرار راديو أخرى لها خاصية <code>name</code> نفسها، بحيث لا يمكن أن يكون واحد منها فقط نشطاً في أي وقت.</p>
<pre><code class="language-html">Color:
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;color&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;orange&quot;</span>&gt;</span> Orange
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;color&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;lightgreen&quot;</span>&gt;</span> Green
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;color&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;lightblue&quot;</span>&gt;</span> Blue
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> buttons = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&quot;[name=color]&quot;</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> button <span class="hljs-keyword">of</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(buttons)) {
    button.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">style</span>.<span class="hljs-property">background</span> = button.<span class="hljs-property">value</span>;
    });
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تُستخدم القوسان المعقوفان في استعلام CSS المعطى إلى <code>querySelectorAll</code> لمطابقة الخصائص. فهو يحدد العناصر التي تكون خاصية <code>name</code> فيها <code>&quot;color&quot;</code>.</p>
<h2 id="حقول-select">حقول select</h2>
<p>حقول select مشابهة مفهومياً لأزرار الراديو — فهي أيضاً تتيح للمستخدم الاختيار من مجموعة خيارات. لكن حيث يضع زر الراديو تخطيط الخيارات تحت سيطرتنا، يتحدد مظهر وسم <code>&lt;select&gt;</code> بالمتصفح.</p>
<p>لحقول select أيضاً صيغة أقرب إلى قائمة من مربعات الاختيار لا أزرار الراديو. فعند إعطاء وسم <code>&lt;select&gt;</code> خاصية <code>multiple</code>، سيتيح للمستخدم اختيار أي عدد من الخيارات، لا خياراً واحداً فقط. وبينما يُرسم حقل select العادي كعنصر تحكم <em>منسدل</em> لا يُظهر الخيارات غير النشطة إلا عند فتحه، يُظهر الحقل المفعّل فيه <code>multiple</code> عدة خيارات في الوقت نفسه، مما يتيح للمستخدم تفعيلها أو تعطيلها فرادى.</p>
<p>لكل وسم <code>&lt;option&gt;</code> قيمة. ويمكن تعريف هذه القيمة بخاصية <code>value</code>. وعندما لا تُعطى، يُحتسب النص داخل الخيار قيمته. وتعكس خاصية <code>value</code> في عنصر <code>&lt;select&gt;</code> الخيار المحدد حالياً. لكن في حقل <code>multiple</code>، لا تعني هذه الخاصية الكثير، لأنها ستعطي قيمة <em>واحد</em> فقط من الخيارات المحددة حالياً.</p>
<p>يمكن الوصول إلى وسوم <code>&lt;option&gt;</code> الخاصة بحقل <code>&lt;select&gt;</code> كائنًا شبيهًا بمصفوفة عبر خاصية <code>options</code> في الحقل. ولكل خيار خاصية تُسمى <code>selected</code> تشير إلى ما إذا كان ذلك الخيار محدداً حالياً. ويمكن أيضاً الكتابة في هذه الخاصية لتحديد خيار أو إلغاء تحديده.</p>
<p>يستخرج هذا المثال القيم المحددة من حقل select من نوع <code>multiple</code> ويستخدمها لتكوين عدد ثنائي من بتات فردية. اضغط باستمرار على ctrl (أو command على Mac) لتحديد عدة خيارات.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">multiple</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>0001<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span>0010<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;4&quot;</span>&gt;</span>0100<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;8&quot;</span>&gt;</span>1000<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span> = <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;output&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> select = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;select&quot;</span>);
  <span class="hljs-keyword">let</span> output = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#output&quot;</span>);
  select.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> number = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> option <span class="hljs-keyword">of</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(select.<span class="hljs-property">options</span>)) {
      <span class="hljs-keyword">if</span> (option.<span class="hljs-property">selected</span>) {
        number += <span class="hljs-title class_">Number</span>(option.<span class="hljs-property">value</span>);
      }
    }
    output.<span class="hljs-property">textContent</span> = number;
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="حقول-الملفات">حقول الملفات</h2>
<p>صُممت حقول الملفات أصلاً كطريقة لرفع ملفات من جهاز المستخدم عبر نموذج. وفي المتصفحات الحديثة، توفر أيضاً طريقة لقراءة هذه الملفات من برامج JavaScript. ويعمل الحقل كنوع من حارس البوابة. فلا يستطيع السكربت مجرد البدء بقراءة ملفات خاصة من حاسوب المستخدم، لكن إذا اختار المستخدم ملفاً في حقل كهذا، يفسّر المتصفح ذلك الإجراء بأنه إذن للسكربت بقراءة الملف.</p>
<p>يبدو حقل الملف عادةً كزر مكتوب عليه شيء مثل &quot;choose file&quot; أو &quot;browse&quot;، وبجانبه معلومات عن الملف المختار.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> input = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;input&quot;</span>);
  input.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (input.<span class="hljs-property">files</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">let</span> file = input.<span class="hljs-property">files</span>[<span class="hljs-number">0</span>];
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;You chose&quot;</span>, file.<span class="hljs-property">name</span>);
      <span class="hljs-keyword">if</span> (file.<span class="hljs-property">type</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;It has type&quot;</span>, file.<span class="hljs-property">type</span>);
    }
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>خاصية <code>files</code> في عنصر حقل الملف كائن شبيه بمصفوفة (مرة أخرى، ليس مصفوفة حقيقية) يحتوي الملفات المختارة في الحقل. وهو فارغ في البداية. والسبب في عدم وجود خاصية <code>file</code> ببساطة هو أن حقول الملفات تدعم أيضاً خاصية <code>multiple</code> التي تجعل من الممكن اختيار عدة ملفات في الوقت نفسه.</p>
<p>للكائنات في <code>files</code> خصائص مثل <code>name</code> (اسم الملف)، و<code>size</code> (حجم الملف بالبايت، والبابتة قطعة من 8 بتات)، و<code>type</code> (النوع الوسيطي للملف، مثل <code>text/plain</code> أو <code>image/jpeg</code>).</p>
<p>وما لا تحتويه هو خاصية تضم محتوى الملف. والوصول إلى ذلك أعقد قليلاً. ولأن قراءة ملف من القرص قد تستغرق وقتاً، فالواجهة غير متزامنة لتجنب تجميد النافذة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">multiple</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> input = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;input&quot;</span>);
  input.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> file <span class="hljs-keyword">of</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(input.<span class="hljs-property">files</span>)) {
      <span class="hljs-keyword">let</span> reader = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FileReader</span>();
      reader.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;File&quot;</span>, file.<span class="hljs-property">name</span>, <span class="hljs-string">&quot;starts with&quot;</span>,
                    reader.<span class="hljs-property">result</span>.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">20</span>));
      });
      reader.<span class="hljs-title function_">readAsText</span>(file);
    }
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تتم قراءة ملف بإنشاء كائن <code>FileReader</code>، وتسجيل معالج حدث <code>&quot;load&quot;</code> له، واستدعاء طريقته <code>readAsText</code> مع إعطائه الملف الذي نريد قراءته. وبمجرد انتهاء التحميل، تحتوي خاصية <code>result</code> في القارئ على محتوى الملف.</p>
<p>تُطلق كائنات <code>FileReader</code> أيضاً حدث <code>&quot;error&quot;</code> عندما تفشل قراءة الملف لأي سبب. وسينتهي كائن الخطأ نفسه في خاصية <code>error</code> في القارئ. صُممت هذه الواجهة قبل أن تصبح الوعود جزءاً من اللغة. ويمكنك لفّها في وعد كهذا:</p>
<pre><code class="language-js"><span class="hljs-keyword">function</span> <span class="hljs-title function_">readFileText</span>(<span class="hljs-params">file</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> reader = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FileReader</span>();
    reader.<span class="hljs-title function_">addEventListener</span>(
      <span class="hljs-string">&quot;load&quot;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(reader.<span class="hljs-property">result</span>));
    reader.<span class="hljs-title function_">addEventListener</span>(
      <span class="hljs-string">&quot;error&quot;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">reject</span>(reader.<span class="hljs-property">error</span>));
    reader.<span class="hljs-title function_">readAsText</span>(file);
  });
}
</code></pre>
<h2 id="تخزين-البيانات-على-جانب-العميل">تخزين البيانات على جانب العميل</h2>
<p>يمكن لصفحات HTML البسيطة مع قليل من JavaScript أن تكون صيغة رائعة لـ«التطبيقات المصغرة» — برامج مساعدة صغيرة تؤتمت مهام أساسية. وبربط بعض حقول النموذج بمعالجات أحداث، يمكنك فعل أي شيء من التحويل بين السنتيمترات والبوصات إلى حساب كلمات المرور من كلمة مرور رئيسية واسم موقع.</p>
<p>عندما يحتاج تطبيق كهذا إلى تذكّر شيء بين الجلسات، لا يمكنك استخدام ارتباطات JavaScript — فهي تُطرح بعيداً كل مرة تُغلق فيها الصفحة. ويمكنك إعداد خادم ووصله بالإنترنت وجعل تطبيقك يخزّن شيئاً هناك (سنرى كيف نفعل ذلك في <a href="/chapter/node_js">الفصل 20</a>). لكن ذلك عمل إضافي وتعقيد كبيران. وأحياناً يكفي مجرد إبقاء البيانات في المتصفح.</p>
<p>يمكن استخدام كائن <code>localStorage</code> لتخزين البيانات بطريقة تنجو من إعادة تحميل الصفحات. ويتيح لك هذا الكائن حفظ قيم نصية تحت أسماء.</p>
<pre><code class="language-js"><span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&quot;username&quot;</span>, <span class="hljs-string">&quot;marijn&quot;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&quot;username&quot;</span>));
<span class="hljs-comment">// → marijn</span>
<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">removeItem</span>(<span class="hljs-string">&quot;username&quot;</span>);
</code></pre>
<p>تبقى القيمة في <code>localStorage</code> موجودة حتى تُستبدل أو تُزال بـ<code>removeItem</code>، أو يمسح المستخدم بياناته المحلية.</p>
<p>تحصل المواقع من نطاقات مختلفة على مقصورات تخزين مختلفة. وهذا يعني أن البيانات التي يخزّنها موقع معيّن في <code>localStorage</code> لا يمكن، من حيث المبدأ، أن تُقرأ (وتُستبدل) إلا بسكربتات على الموقع نفسه.</p>
<p>تفرض المتصفحات فعلاً حداً على حجم البيانات التي يمكن لموقع تخزينها في <code>localStorage</code>. وهذا القيد، مع كون ملء أقراص الناس بالخردة غير مربح حقاً، يمنع هذه الميزة من التهام مساحة كبيرة جداً.</p>
<p>تنفّذ الشيفرة التالية تطبيق تدوين ملاحظات بدائياً. فهو يحتفظ بمجموعة من الملاحظات المسماة ويتيح للمستخدم تعديل الملاحظات وإنشاء ملاحظات جديدة.</p>
<pre><code class="language-html">Notes: <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width: 100%&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">let</span> list = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;select&quot;</span>);
  <span class="hljs-keyword">let</span> note = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;textarea&quot;</span>);

  <span class="hljs-keyword">let</span> state;
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">setState</span>(<span class="hljs-params">newState</span>) {
    list.<span class="hljs-property">textContent</span> = <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> name <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(newState.<span class="hljs-property">notes</span>)) {
      <span class="hljs-keyword">let</span> option = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&quot;option&quot;</span>);
      option.<span class="hljs-property">textContent</span> = name;
      <span class="hljs-keyword">if</span> (newState.<span class="hljs-property">selected</span> == name) option.<span class="hljs-property">selected</span> = <span class="hljs-literal">true</span>;
      list.<span class="hljs-title function_">appendChild</span>(option);
    }
    note.<span class="hljs-property">value</span> = newState.<span class="hljs-property">notes</span>[newState.<span class="hljs-property">selected</span>];

    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&quot;Notes&quot;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(newState));
    state = newState;
  }
  <span class="hljs-title function_">setState</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&quot;Notes&quot;</span>)) ?? {
    <span class="hljs-attr">notes</span>: {<span class="hljs-string">&quot;shopping list&quot;</span>: <span class="hljs-string">&quot;Carrots\\nRaisins&quot;</span>},
    <span class="hljs-attr">selected</span>: <span class="hljs-string">&quot;shopping list&quot;</span>
  });

  list.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setState</span>({<span class="hljs-attr">notes</span>: state.<span class="hljs-property">notes</span>, <span class="hljs-attr">selected</span>: list.<span class="hljs-property">value</span>});
  });
  note.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> {selected} = state;
    <span class="hljs-title function_">setState</span>({
      <span class="hljs-attr">notes</span>: {...state.<span class="hljs-property">notes</span>, [selected]: note.<span class="hljs-property">value</span>},
      selected
    });
  });
  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;button&quot;</span>)
    .<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">let</span> name = <span class="hljs-title function_">prompt</span>(<span class="hljs-string">&quot;Note name&quot;</span>);
      <span class="hljs-keyword">if</span> (name) <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">notes</span>: {...state.<span class="hljs-property">notes</span>, [name]: <span class="hljs-string">&quot;&quot;</span>},
        <span class="hljs-attr">selected</span>: name
      });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تحصل الشيفرة على حالتها الابتدائية من القيمة <code>&quot;Notes&quot;</code> المخزنة في <code>localStorage</code> أو، إن كانت غائبة، تنشئ حالة مثال لا تحتوي سوى قائمة تسوق. وقراءة حقل غير موجود من <code>localStorage</code> ستُنتج <code>null</code>. وتمرير <code>null</code> إلى <code>JSON.parse</code> سيجعله يحلل النص <code>&quot;null&quot;</code> ويعيد <code>null</code>. وبالتالي يمكن استخدام المعامل <code>??</code> لتوفير قيمة افتراضية في حالة كهذه.</p>
<p>تتأكد طريقة <code>setState</code> من أن DOM يعرض حالة معطاة وتخزّن الحالة الجديدة في <code>localStorage</code>. وتستدعي معالجات الأحداث هذه الدالة للانتقال إلى حالة جديدة.</p>
<p>تُستخدم صيغة <code>...</code> في المثال لإنشاء كائن جديد نسخة من <code>state.notes</code> القديم، لكن مع خاصية واحدة مضافة أو مستبدلة. وهي تستخدم صيغة النشر (spread syntax) لتضيف أولاً الخصائص من الكائن القديم ثم تعيّن خاصية جديدة. وتُستخدم صيغة القوسين المعقوفين في الكائن الحرفي لإنشاء خاصية يستند اسمها إلى قيمة ديناميكية ما.</p>
<p>يوجد كائن آخر مشابه لـ<code>localStorage</code> يُسمى <code>sessionStorage</code>. والفرق بينهما أن محتوى <code>sessionStorage</code> يُنسى في نهاية كل <em>جلسة</em>، وهو ما يعني في معظم المتصفحات كل مرة يُغلق فيها المتصفح.</p>
<h2 id="الملخص">الملخص</h2>
<p>ناقشنا في هذا الفصل كيفية عمل بروتوكول HTTP. يرسل <em>العميل</em> طلباً يحتوي طريقة (عادةً <code>GET</code>) ومساراً يحدد مورداً. ثم يقرر <em>الخادم</em> ما يفعل بالطلب ويستجيب برمز حالة وجسم استجابة. وقد يحتوي الطلب والاستجابة معاً ترويسات توفر معلومات إضافية.</p>
<p>تسمى الواجهة التي تستطيع بها JavaScript في المتصفح إجراء طلبات HTTP بـ<code>fetch</code>. ويبدو إجراء طلب كهذا:</p>
<pre><code class="language-js"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/18_http.html&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-title function_">text</span>()).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The page starts with <span class="hljs-subst">\${text.slice(<span class="hljs-number">0</span>, <span class="hljs-number">15</span>)}</span>\`</span>);
});
</code></pre>
<p>تُجري المتصفحات طلبات <code>GET</code> لجلب الموارد اللازمة لعرض صفحة ويب. وقد تحتوي الصفحة أيضاً نماذج تتيح إرسال المعلومات التي يدخلها المستخدم كطلب لصفحة جديدة عند إرسال النموذج.</p>
<p>تستطيع HTML تمثيل أنواع شتى من حقول النموذج، كحقول النص ومربعات الاختيار وحقول الاختيار من متعدد ومنتقيات الملفات. ويمكن فحص هذه الحقول والتلاعب بها بـJavaScript. وهي تُطلق حدث <code>&quot;change&quot;</code> عند تغيّرها، وتُطلق حدث <code>&quot;input&quot;</code> عند كتابة نص، وتتلقى أحداث لوحة المفاتيح عندما يكون لها تركيز لوحة المفاتيح. وتُستخدم خصائص مثل <code>value</code> (لحقوق النص وselect) أو <code>checked</code> (لمربعات الاختيار وأزرار الراديو) لقراءة محتوى الحقل أو تعيينه.</p>
<p>عند إرسال نموذج، يُطلق عليه حدث <code>&quot;submit&quot;</code>. ويمكن لمعالج JavaScript استدعاء <code>preventDefault</code> على ذلك الحدث لتعطيل سلوك المتصفح الافتراضي. وقد تظهر عناصر حقول النموذج أيضاً خارج وسم form.</p>
<p>عندما يختار المستخدم ملفاً من نظام ملفاته المحلي في حقل منتقي ملفات، يمكن استخدام واجهة <code>FileReader</code> للوصول إلى محتوى هذا الملف من برنامج JavaScript.</p>
<p>يمكن استخدام كائنَي <code>localStorage</code> و<code>sessionStorage</code> لحفظ المعلومات بطريقة تنجو من إعادة تحميل الصفحات. ويحفظ الكائن الأول البيانات إلى الأبد (أو حتى يقرر المستخدم مسحها)، ويحفظها الثاني حتى يُغلق المتصفح.</p>
<h2 id="التمارين">التمارين</h2>
<h3 id="التفاوض-على-المحتوى">التفاوض على المحتوى</h3>
<p>من الأشياء التي يستطيع HTTP فعلها ما يُسمى <em>التفاوض على المحتوى</em> (content negotiation). وتُستخدم ترويسة الطلب <code>Accept</code> لإخبار الخادم بنوع المستند الذي يودّ العميل الحصول عليه. وتتجاهل خوادم كثيرة هذه الترويسة، لكن عندما يعرف الخادم طرقاً شتى لترميز مورد ما، يمكنه النظر في هذه الترويسة وإرسال ما يفضّله العميل.</p>
<p>عُدّ URL <a href="https://eloquentjavascript.net/author"><em>https://eloquentjavascript.net/author</em></a> ليستجيب بنص عادي أو HTML أو JSON، حسب ما يطلبه العميل. وتُعرَّف هذه الصيغ بـ<em>الأنواع الوسيطية</em> (media types) المعيارية <code>text/plain</code> و<code>text/html</code> و<code>application/json</code>.</p>
<p>أرسل طلبات لجلب الصيغ الثلاث كلها لهذا المورد. استخدم خاصية <code>headers</code> في كائن الخيارات الممرّر إلى <code>fetch</code> لتعيين الترويسة المسماة <code>Accept</code> إلى النوع الوسيطي المطلوب.</p>
<p>وأخيراً، جرّب طلب النوع الوسيطي <code>application/rainbows+unicorns</code> وانظر رمز الحالة الذي ينتج عن ذلك.</p>
<pre><code class="language-js"><span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>ابنِ شيفرتك على أمثلة <code>fetch</code> <a href="/chapter/http_and_forms#fetch">السابقة في هذا الفصل</a>.</p>
<p>طلب نوع وسيطي وهمي سيعيد استجابة برمز 406، &quot;Not acceptable&quot; (غير مقبول)، وهو الرمز الذي ينبغي أن يعيده الخادم عندما لا يستطيع تلبية ترويسة <code>Accept</code>.</p>
</details>
<h3 id="ورشة-عمل-javascript">ورشة عمل JavaScript</h3>
<p>ابنِ واجهة تتيح للمستخدمين كتابة قطع من شيفرة JavaScript وتشغيلها.</p>
<p>ضع زراً بجانب حقل <code>&lt;textarea&gt;</code> يستخدم، عند ضغطه، بانية <code>Function</code> التي رأيناها في <a href="/chapter/modules#eval">الفصل 10</a> للفّ النص في دالة واستدعائها. حوّل القيمة المُرجَعة من الدالة، أو أي خطأ ترميه، إلى نص واعرضه أسفل حقل النص.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;code&quot;</span>&gt;</span>return &quot;hi&quot;;<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;</span>Run<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">pre</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;output&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>استخدم <code>document.querySelector</code> أو <code>document.getElementById</code> للوصول إلى العناصر المعرّفة في HTML. ويمكن لمعالج حدث لحدثَي <code>&quot;click&quot;</code> أو <code>&quot;mousedown&quot;</code> على الزر الحصول على خاصية <code>value</code> في حقل النص واستدعاء <code>Function</code> عليها.</p>
<p>احرص على لفّ كل من استدعاء <code>Function</code> واستدعاء نتيجته في كتلة <code>try</code> لتتمكن من التقاط الاستثناءات التي ينتجها. في هذه الحالة، لا نعرف حقاً نوع الاستثناء الذي نبحث عنه، فالتقط كل شيء.</p>
<p>يمكن استخدام خاصية <code>textContent</code> في عنصر الإخراج لملئه برسالة نصية. أو، إن أردت الإبقاء على المحتوى القديم، أنشئ عقدة نص جديدة بـ<code>document.createTextNode</code> وألحقها بالعنصر. تذكّر إضافة محرف سطر جديد في النهاية كي لا يظهر كل الإخراج في سطر واحد.</p>
</details>
<h3 id="لعبة-الحياة-لكونواي">لعبة الحياة لكونواي</h3>
<p>لعبة الحياة لكونواي محاكاة بسيطة تنشئ «حياة» اصطناعية على شبكة، كل خلية فيها إما حية وإما لا. وفي كل جيل (دور)، تُطبَّق القواعد التالية:</p>
<ul>
<li>تموت أي خلية حية لها أقل من جارين حيين أو أكثر من ثلاثة.</li>
<li>تبقى أي خلية حية لها جاران أو ثلاثة جيران أحياء على قيد الحياة إلى الجيل التالي.</li>
<li>تصبح أي خلية ميتة لها ثلاثة جيران أحياء بالضبط خلية حية.</li>
</ul>
<p>يُعرَّف <em>الجار</em> بأنه أي خلية مجاورة، بما في ذلك المجاورة قطرياً.</p>
<p>لاحظ أن هذه القواعد تُطبَّق على الشبكة كلها دفعة واحدة، لا مربعاً واحداً في كل مرة. وهذا يعني أن عدّ الجيران يستند إلى الوضع في بداية الجيل، ولا ينبغي أن تؤثر التغيرات التي تطرأ على الخلايا المجاورة خلال هذا الجيل في الحالة الجديدة لخلية معينة.</p>
<p>نفّذ هذه اللعبة بأي بنية بيانات تجدها مناسبة. استخدم <code>Math.random</code> لملء الشبكة بنمط عشوائي ابتدائياً. اعرضها كشبكة من حقول مربعات الاختيار، مع زر بجانبها للانتقال إلى الجيل التالي. وعندما يحدد المستخدم مربعات الاختيار أو يلغي تحديدها، ينبغي تضمين تغييراته عند حساب الجيل التالي.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;grid&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;next&quot;</span>&gt;</span>Next generation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-comment">// اكتب شيفرتك هنا.</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<details class="solution">
<summary>إظهار التلميح</summary>
<p>لحل مشكلة حدوث التغييرات في الوقت نفسه مفهومياً، حاول أن ترى حساب الجيل كدالة نقية تأخذ شبكة واحدة وتنتج شبكة جديدة تمثل الدور التالي.</p>
<p>يمكن تمثيل المصفوفة بمصفوفة واحدة من width × height عنصراً، تخزّن القيم صفاً صفاً، فمثلاً العنصر الثالث في الصف الخامس يُخزَّن (باستخدام فهرسة تبدأ من الصفر) في الموضع 4 × <em>width</em> + 2. ويمكنك عدّ الجيران الأحياء بحلقتين متداخلتين، تمرّان على الإحداثيات المجاورة في البعدين. واحرص على ألا تحسب خلايا خارج الشبكة وأن تتجاهل الخلية في المركز التي نحسب جيرانها.</p>
<p>يمكن ضمان سريان تغييرات مربعات الاختيار على الجيل التالي بطريقتين. فقد يلاحظ معالج حدث هذه التغييرات ويحدّث الشبكة الحالية لتعكسها، أو يمكنك توليد شبكة جديدة من القيم في مربعات الاختيار قبل حساب الدور التالي.</p>
<p>إن اخترت المضي بمعالجات الأحداث، فقد تريد إرفاق خصائص تحدد الموضع الذي يقابله كل مربع اختيار بحيث يسهل معرفة الخلية الواجب تغييرها.</p>
<p>لرسم شبكة مربعات الاختيار، يمكنك إما استخدام عنصر <code>&lt;table&gt;</code> (انظر <a href="/chapter/the_document_object_model#exercise_table">الفصل 14</a>) أو ببساطة وضعها كلها في العنصر نفسه ووضع عناصر <code>&lt;br&gt;</code> (فاصل أسطر) بين الصفوف.</p>
</details>
`,e={number:"18",slug:s,title:a,englishTitle:n,headings:t,html:l};export{e as default,n as englishTitle,t as headings,l as html,p as number,s as slug,a as title};
