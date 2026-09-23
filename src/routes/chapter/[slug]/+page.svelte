<script>
  import { book, chapterPath } from '$lib/content.js';
  import { withBase, withBasePath } from '$lib/html.js';

  let { data } = $props();
  const { chapter, content, prev, next } = $derived(data);

  let activeId = $state('');

  $effect(() => {
    if (!content?.headings?.length) return;
    const elements = content.headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    const onScroll = () => {
      let current = elements[0]?.id || '';
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= 130) {
          current = element.id;
        }
      }
      activeId = current;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<svelte:head>
  <title>{chapter.title} - {book.titleAr}</title>
  <meta name="description" content={`${chapter.title} من كتاب ${book.titleAr}`} />
</svelte:head>

<div class="container">
  <div class="chapter-layout">
    <aside class="toc">
      <p class="toc__title">في هذا الفصل</p>
      <ul>
        {#each content?.headings || [] as heading}
          <li class:toc__depth-3={heading.depth === 3}>
            <a
              href={`#${heading.id}`}
              class:active={activeId === heading.id}>{heading.text}</a
            >
          </li>
        {/each}
      </ul>
    </aside>

    <article class="chapter">
      <div class="chapter__header">
        <p class="chapter__number">الفصل {chapter.number}</p>
        <h1>{chapter.title}</h1>
      </div>

      <div class="book-content">
        {@html withBase(content?.html) || ''}
      </div>

      <div class="prev-next">
        {#if prev}
          <a class="prev" href={chapterPath(prev.slug)}>
            <span class="prev-next__label">الفصل السابق</span>
            <span class="prev-next__title">{prev.title}</span>
          </a>
        {:else}
          <a class="prev" href={withBasePath('/')}>
            <span class="prev-next__label">العودة</span>
            <span class="prev-next__title">المحتويات</span>
          </a>
        {/if}
        {#if next}
          <a class="next" href={chapterPath(next.slug)}>
            <span class="prev-next__label">الفصل التالي</span>
            <span class="prev-next__title">{next.title}</span>
          </a>
        {/if}
      </div>
    </article>
  </div>
</div>
