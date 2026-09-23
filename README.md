# Eloquent JavaScript — النسخة العربية

الموقع المنشور: <https://zeyadsleem.github.io/eloquent-javascript-ar/>

ترجمة عربية كاملة لكتاب **Eloquent JavaScript** (الطبعة الرابعة، 2024) للمؤلف
Marijn Haverbeke، مبنية من الصفر باستخدام **SvelteKit** مع دعم كامل للعربية
واتجاه RTL.

## ما يتضمنه الموقع

- **22 فصلاً كاملاً** بالعربية موزّعة على ثلاثة أجزاء:
  - الجزء الأول: اللغة (الفصول 1-12)
  - الجزء الثاني: المتصفح (الفصول 13-19)
  - الجزء الثالث: Node.js (الفصلان 20-21)
  - مع المقدمة.
- كل التمارين وحلولها المشروحة (أقسام «إظهار التلميح»).
- تلوين الشيفرة، وفهرس محتويات لكل فصل، وتنقل بين الفصول، وصفحة بحث.
- جميع الصور والرسوم منقولة محلياً داخل `static/images/book/`.
- سمتان فاتحة وداكنة، وتنسيق يشبه الكتاب المطبوع.

## المتطلبات

- Node.js 20 أو أحدث
- pnpm

## الأوامر

```bash
pnpm install        # تثبيت الاعتماديات
pnpm dev            # تشغيل بيئة التطوير
pnpm build          # توليد المحتوى ثم بناء الموقع في build/
pnpm preview        # معاينة نسخة الإنتاج
pnpm content        # إعادة توليد المحتوى فقط
```

## بنية المشروع

```
content/                 المحتوى العربي النهائي (Markdown) — مصدر الحقيقة
  book.json              فهرس الكتاب: الأجزاء والفصول والعناوين العربية
content-src/en/          المحتوى الإنجليزي المحوّل من صفحات الكتاب
sources/html/            صفحات الكتاب الأصلية (HTML) كما جُلبت
scripts/
  fetch-book.mjs         جلب صفحات الكتاب وصوره
  convert-book.mjs       تحويل HTML إلى Markdown مع الحفاظ على البنية
  build-content.mjs      توليد JSON + فهرس بحث + manifest
  validate-content.mjs   التحقق من اكتمال الفصول وسلامة البنية
src/
  routes/                الصفحات: الغلاف والمحتويات، الفصول، عن الكتاب، البحث
  lib/                   المحتوى المولّد والأنماط
static/images/book/      صور الكتاب وغلافه
TRANSLATION.md           دليل الترجمة والمصطلحات
```

## تحديث المحتوى

- لتصحيح ترجمة أو تحسين نص: عدّل الملف المناسب في `content/` ثم نفّذ `pnpm build`.
- لإعادة استيراد الكتاب من المصدر: نفّذ `node scripts/fetch-book.mjs` ثم
  `node scripts/convert-book.mjs`، ثم أعد ترجمة ما تغيّر وفق `TRANSLATION.md`.

## النشر

الموقع ثابت بالكامل. بعد `pnpm build` يمكن نشر محتوى `build/` على أي استضافة
(GitHub Pages، Netlify، Cloudflare Pages...). ملف `.nojekyll` موجود لدعم
GitHub Pages.

## الترخيص والإسناد

- الكتاب الأصلي: *Eloquent JavaScript* (4th edition) للمؤلف Marijn Haverbeke،
  منشور مجاناً على [eloquentjavascript.net](https://eloquentjavascript.net/)،
  ومرخّص بموجب
  [Creative Commons Attribution-NonCommercial 3.0](https://creativecommons.org/licenses/by-nc/3.0/).
- الشيفرة الواردة في الكتاب مرخّصة أيضاً بموجب رخصة MIT.
- الغلاف للفنان Péchane Sumi-e، ورسوم الفصول للفنانة Madalina Tantareanu،
  والرسم النقطي في الفصلين 7 و16 للفنان Antonio Perdomo Pastor، ومخططات
  التعابير النمطية في الفصل 9 من regexper.com بواسطة Jeff Avallone، وفكرة لعبة
  الفصل 16 من Thomas Palef.
- هذه الترجمة العربية غير رسمية وغير تجارية، وتُستخدم لأغراض تعليمية مع الإسناد
  الكامل للمؤلف الأصلي.
