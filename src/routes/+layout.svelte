<script>
  import 'highlight.js/styles/atom-one-dark.css';
  import '../app.css';
  import '../lib/book.css';
  import { page } from '$app/state';
  import { withBasePath } from '$lib/html.js';
  import { book } from '$lib/content.js';

  let { children } = $props();
  let menuOpen = $state(false);

  const navItems = [
    { href: withBasePath('/'), label: 'المحتويات' },
    { href: withBasePath('/about'), label: 'عن الكتاب' },
    { href: withBasePath('/search'), label: 'البحث' },
  ];

  let theme = $state('light');

  $effect(() => {
    if (typeof document === 'undefined') return;
    theme =
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  };

  const currentPath = $derived(page.url.pathname);
</script>

<svelte:head>
  <title>{book.titleAr} - النسخة العربية</title>
  <meta
    name="description"
    content="الترجمة العربية الكاملة لكتاب Eloquent JavaScript لماريْن هافربيك"
  />
</svelte:head>

<div class="app">
  <a class="skip-link" href="#main">الانتقال إلى المحتوى</a>
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="logo" href={withBasePath('/')}>
        <span class="logo__title">{book.titleAr}</span>
        <span class="logo__subtitle">Eloquent JavaScript</span>
      </a>

      <button
        class="menu-toggle"
        aria-label="قائمة التنقل"
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <span></span><span></span><span></span>
      </button>

      <nav class="site-nav" class:site-nav--open={menuOpen}>
        {#each navItems as item}
          <a
            href={item.href}
            class:active={currentPath === item.href ||
              (item.href === '/' && currentPath.startsWith('/chapter'))}
            onclick={() => (menuOpen = false)}>{item.label}</a
          >
        {/each}
        <button class="theme-toggle" onclick={toggleTheme} aria-label="تبديل السمة">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </nav>
    </div>
  </header>

  <main id="main">
    {@render children()}
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div>
        <p class="site-footer__title">
          {book.titleAr} ({book.title}) — {book.edition}
        </p>
        <p class="site-footer__text">
          الكتاب الأصلي من تأليف {book.author}، مرخّص بموجب
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={book.licenseUrl}>رخصة Creative Commons BY-NC 3.0</a
          >. هذه ترجمة عربية غير رسمية وغير تجارية مع الإسناد الكامل للمؤلف.
        </p>
      </div>
      <nav class="site-footer__nav">
        <a href={withBasePath('/')}>المحتويات</a>
        <a href={withBasePath('/about')}>عن الكتاب</a>
        <a href={withBasePath('/search')}>البحث</a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://eloquentjavascript.net/">النص الأصلي</a
        >
      </nav>
    </div>
  </footer>
</div>
