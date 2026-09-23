<script>
  import { book, chapterPath } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';
</script>

<svelte:head>
  <title>{book.titleAr} - النسخة العربية الكاملة</title>
  <meta
    name="description"
    content="الترجمة العربية الكاملة لكتاب Eloquent JavaScript (جافاسكربت البليغة) للطبعة الرابعة."
  />
</svelte:head>

<section class="cover">
  <div class="container cover__inner">
    <img
      class="cover__image"
      src={withBasePath('/images/book/cover.jpg')}
      alt="غلاف كتاب Eloquent JavaScript"
    />
    <div>
      <h1 class="cover__title">{book.titleAr}</h1>
      <p class="cover__english">Eloquent JavaScript — {book.edition}</p>
      <p class="cover__meta">
        تأليف {book.author} · ترجمة عربية كاملة · رخصة CC BY-NC 3.0
      </p>
      <p>
        كتاب عن JavaScript والبرمجة وعجائب العالم الرقمي. يبدأ من أساسيات اللغة
        ويمرّ بالمتصفح وNode.js، مع مشاريع عملية وتمارين وحلول مشروحة في نهاية كل
        فصل.
      </p>
      <a class="button" href={chapterPath(book.chapters[0].slug)}
        >ابدأ القراءة</a
      >
    </div>
  </div>
</section>

<div class="container">
  <section class="toc-section">
    <h2>المحتويات</h2>

    <div class="toc-part">
      <ul class="toc-list">
        <li>
          <a href={chapterPath(book.chapters[0].slug)}>
            <span class="toc-list__number">00</span>
            <span>{book.chapters[0].title}</span>
          </a>
        </li>
      </ul>
    </div>

    {#each book.parts as part}
      <div class="toc-part">
        <h3 class="toc-part__title">{part.title}</h3>
        <ul class="toc-list">
          {#each part.chapters as chapter}
            <li>
              <a href={chapterPath(chapter.slug)}>
                <span class="toc-list__number"
                  >{book.chapters.find((c) => c.slug === chapter.slug)
                    ?.number}</span
                >
                <span>{chapter.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>
</div>
