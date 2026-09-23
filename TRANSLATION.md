# دليل ترجمة Eloquent JavaScript إلى العربية

هذا الدليل إلزامي لكل من يترجم فصلاً من الكتاب. الهدف: ترجمة عربية كاملة، دقيقة،
طبيعية، تحافظ على بنية الملف الأصلية.

## القواعد الذهبية

1. **ترجم كل نص ظاهر**: العناوين، الفقرات، عناصر القوائم، خلايا الجداول، نص
   الروابط، النصوص البديلة للصور (alt)، الاقتباسات، وحلول التمارين.
2. **لا تترجم ولا تغيّر إطلاقاً**:
   - وسوم HTML وخصائصها: `details`, `summary`, `class`, `href`, `src`...
   - الشيفرة داخل ` ``` ` (مع استثناء وحيد: التعليقات داخل الشيفرة تُترجم).
   - أسماء المتغيرات والدوال والمكتبات والأوامر وأسماء الملفات والمسارات.
   - روابط URL نفسها (`/chapter/...` تبقى كما هي، والروابط الخارجية تبقى).
   - صيغة Markdown نفسها (`#`, `-`, `>`, `**`, `[]()`, `![]()`).
   - أسطر `---` وfrontmatter (مع تغيير `lang: en` إلى `lang: ar` فقط).
3. **أبقِ أسماء التقنيات باللاتينية**: JavaScript, Node.js, HTML, CSS, DOM, HTTP,
   JSON, Canvas, Promise, npm, Git, GitHub, JSONP, XML, CSS, SVG, fetch, async,
   await, null, undefined, true, false.
4. **أسلوب عربي فصيح واضح** بضمير المخاطب «أنت»، ونبرة تعليمية دافئة تشبه أسلوب
   الكتاب الأصلي (مباشر، بسيط، بلا حشو).
5. **المصطلحات المعتمدة**:
   - binding = ارتباط | value = قيمة | expression = تعبير | statement = جملة
   - operator = معامل | operand = معامَل به
   - function = دالة | parameter = وسيط | argument = معطى
   - method = طريقة | property = خاصية | object = كائن | array = مصفوفة
   - string = نص | number = عدد | boolean = قيمة منطقية
   - loop = حلقة | conditional = جملة شرطية | scope = نطاق
   - closure = إغلاق | recursion = تعاود | callback = دالة رد نداء (callback)
   - higher-order function = دالة ذات رتبة أعلى
   - side effect = تأثير جانبي | return = إرجاع | environment = بيئة
   - prototype = نموذج أولي (prototype) | class = صنف | instance = نسخة
   - inheritance = وراثة | interface = واجهة | getter/setter تبقى لاتينية
   - node = عقدة | event = حدث | handler = معالج | browser = المتصفح
   - server = خادم | request = طلب | response = استجابة | form = نموذج
   - module = وحدة | bug = علّة | debugging = تصحيح الأخطاء
   - error = خطأ | exception = استثناء | regular expression = تعبير نمطي
   - pattern = نمط | exercise = تمرين | hint = تلميح | solution = حل
   - pixel = بكسل | canvas = Canvas | string = نص
6. **عند أول ذكر لمصطلح تقني مهم** ضع الأصل الإنجليزي بين قوسين: «الارتباطات
   (bindings)». لا تُكثر.
7. **لا إيموجي**، ولا إضافات أو حذف للمحتوى. الترجمة أمينة للمصدر.
8. حافظ على الأسطر الفارغة والبنية العامة؛ لا يلزم التطابق سطراً بسطر لكن يجب أن
   تبقى بنية Markdown/HTML صالحة تماماً.
9. حافظ على `<details class="solution">` و`<summary>إظهار التلميح</summary>` كما
   هي، وترجم المحتوى بداخلها.

## مسار الإخراج

- المصدر: `content-src/en/<NN>_<slug>.md`
- المخرج: `content/<NN>_<slug>.md` (الاسم نفسه)
- غيّر في الواجهة الأمامية `lang: en` إلى `lang: ar` فقط.

## ملاحظة عن الملفات الكبيرة

إذا تجاوز الملف نحو 4000 كلمة، اكتب الترجمة على مرحلتين أو ثلاث:
1. اكتب الجزء الأول في ملف الإخراج عبر `write`.
2. اكتب الأجزاء التالية في ملفات مؤقتة `output.part2.md` وهكذا عبر `write`، ثم
   ادمجها: `cat output.part2.md >> output.md && rm output.part2.md` عبر bash.
لا تختصر ولا تحذف أي فقرة أبداً.
