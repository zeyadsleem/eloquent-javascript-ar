<script>
  import { book } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';
</script>

<svelte:head>
  <title>عن الكتاب | {book.titleAr}</title>
  <meta
    name="description"
    content="عن كتاب Eloquent JavaScript وترجمته العربية ورخصته"
  />
</svelte:head>

<div class="container page">
  <h1>عن الكتاب</h1>
  <p class="page__lead">
    «{book.titleAr}» ({book.title}) كتاب عن JavaScript والبرمجة وعجائب العالم
    الرقمي، من تأليف {book.author}، والطبعة الرابعة الصادرة عام 2024.
  </p>

  <p>
    يشرح الكتاب لغة JavaScript من الصفر: القيم والدوال وبنى البيانات والكائنات
    والتعابير النمطية والبرمجة غير المتزامنة، ثم ينتقل إلى البرمجة في المتصفح
    (DOM والأحداث وCanvas وHTTP)، وينتهي بـNode.js وبناء تطبيقات كاملة. ويضم كل
    فصل تمارين عملية مع حلول مشروحة.
  </p>

  <p>
    النص الأصلي متاح مجاناً على
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://eloquentjavascript.net/">eloquentjavascript.net</a
    >، وهذه النسخة العربية ترجمة غير رسمية كاملة مع الإسناد الكامل للمؤلف.
  </p>

  <div class="credits">
    <h2>الترخيص والإسناد</h2>
    <ul>
      <li>
        النص الأصلي: {book.author}، الطبعة الرابعة، مرخّص بموجب
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={book.licenseUrl}
          >Creative Commons Attribution-NonCommercial 3.0</a
        >.
      </li>
      <li>الشيفرة الواردة في الكتاب مرخّصة أيضاً بموجب رخصة MIT.</li>
      <li>
        الغلاف للفنان Péchane Sumi-e، ورسوم الفصول للفنانة Madalina Tantareanu.
      </li>
      <li>
        الرسم النقطي في الفصلين 7 و16 للفنان Antonio Perdomo Pastor، ومخططات
        التعابير النمطية في الفصل 9 مولّدة بـregexper.com بواسطة Jeff Avallone،
        وفكرة لعبة الفصل 16 من Thomas Palef.
      </li>
      <li>هذه الترجمة العربية غير تجارية وتُستخدم لأغراض تعليمية.</li>
    </ul>
  </div>

  <p>
    <a class="button" href={withBasePath('/')}>تصفّح المحتويات</a>
  </p>
</div>
