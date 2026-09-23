import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourcesDir = path.join(root, 'sources', 'html');
const outDir = path.join(root, 'content-src', 'en');

const book = JSON.parse(
  fs.readFileSync(path.join(root, 'content', 'book.json'), 'utf8')
);

const allChapters = [
  book.intro,
  ...book.parts.flatMap((part) => part.chapters),
];

const fileToSlug = new Map(
  allChapters.map((chapter) => [chapter.file, chapter.slug])
);

const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

const inline = (node) => {
  if (node.nodeType === 3) {
    return (node.rawText ?? node.text)
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ');
  }
  if (node.nodeType !== 1) return '';

  const tag = node.rawTagName;
  const children = () => node.childNodes.map(inline).join('');

  if (node.classList?.contains?.('p_ident')) return '';
  if (tag === 'a' && node.getAttribute('class')?.includes('_ident')) return '';

  switch (tag) {
    case 'code':
      return `\`${node.text}\``;
    case 'em':
    case 'i':
      return `*${children().trim()}*`;
    case 'strong':
    case 'b':
      return `**${children().trim()}**`;
    case 'a': {
      const href = node.getAttribute('href') || '';
      const text = children().trim() || href;
      let target = href;
      const match = href.match(/^(\d\d_[a-z_]+)\.html(.*)$/);
      if (match && fileToSlug.has(`${match[1]}.html`)) {
        target = `/chapter/${fileToSlug.get(`${match[1]}.html`)}${match[2]}`;
      } else if (href === 'index.html') {
        target = '/';
      }
      return `[${text}](${target})`;
    }
    case 'img': {
      const src = node.getAttribute('src') || '';
      const alt = node.getAttribute('alt') || '';
      const filename = src.replace(/^img\//, '').replace(/\//g, '_');
      return `![${alt}](/images/book/${filename})`;
    }
    case 'br':
      return '\n';
    case 'span':
      return children();
    default:
      return children();
  }
};

const block = (node, listContext = null) => {
  if (node.nodeType === 3) {
    const text = (node.rawText ?? node.text).trim();
    return text ? `${text}\n` : '';
  }
  if (node.nodeType !== 1) return '';

  const tag = node.rawTagName;
  const className = node.getAttribute('class') || '';

  if (className.includes('_ident')) return '';

  switch (tag) {
    case 'h1':
      return '';
    case 'h2':
      return `\n## ${inline(node).trim()}\n`;
    case 'h3':
      return `\n### ${inline(node).trim()}\n`;
    case 'h4':
      return `\n#### ${inline(node).trim()}\n`;
    case 'p':
      return `\n${inline(node).trim()}\n`;
    case 'pre': {
      const language = node.getAttribute('data-language') || '';
      const lang =
        language === 'null' || language === 'text'
          ? ''
          : language === 'javascript'
            ? 'js'
            : language;
      const code = decodeEntities(
        node.rawText
          .replace(/<a[^>]*class="[^"]*_ident[^"]*"[^>]*><\/a>/g, '')
          .replace(/<[^>]+>/g, '')
      ).replace(/\n$/, '');
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    }
    case 'blockquote': {
      const lines = node.childNodes
        .filter((child) => child.rawTagName !== 'footer')
        .map((child) => block(child))
        .join('')
        .trim()
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => `> ${line}`)
        .join('\n');
      const footer = node.querySelector('footer');
      const citation = footer ? `\n>\n> — ${inline(footer).trim()}` : '';
      return `\n${lines}${citation}\n`;
    }
    case 'figure': {
      const image = node.querySelector('img');
      if (!image) return '';
      return `\n${inline(image)}\n`;
    }
    case 'ul':
    case 'ol': {
      const ordered = tag === 'ol';
      let index = 1;
      return `\n${node.childNodes
        .filter((child) => child.rawTagName === 'li')
        .map((li) => {
          const marker = ordered ? `${index++}. ` : '- ';
          return `${marker}${inline(li).trim()}`;
        })
        .join('\n')}\n`;
    }
    case 'details': {
      const content = node.childNodes
        .filter((child) => child.rawTagName !== 'summary')
        .map((child) => block(child))
        .join('');
      return `\n<details class="solution">\n<summary>إظهار التلميح</summary>\n\n${content.trim()}\n\n</details>\n`;
    }
    case 'div':
    case 'section':
    case 'article':
    case 'main':
    case 'nav':
    case 'footer':
      return node.childNodes.map((child) => block(child, listContext)).join('');
    case 'table': {
      const rows = node.querySelectorAll('tr');
      const lines = rows.map((row) => {
        const cells = row
          .querySelectorAll('th,td')
          .map((cell) => inline(cell).trim());
        return `| ${cells.join(' | ')} |`;
      });
      if (lines.length === 0) return '';
      const header = lines[0];
      const separator = `| ${lines[0]
        .split('|')
        .filter((cell) => cell.trim())
        .map(() => '---')
        .join(' | ')} |`;
      return `\n${[header, separator, ...lines.slice(1)].join('\n')}\n`;
    }
    default:
      return node.childNodes.map((child) => block(child, listContext)).join('');
  }
};

const clean = (markdown) =>
  markdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

fs.mkdirSync(outDir, { recursive: true });

for (const chapter of allChapters) {
  const source = fs.readFileSync(
    path.join(sourcesDir, chapter.file),
    'utf8'
  );
  const dom = parse(source);
  const article = dom.querySelector('article');
  if (!article) {
    console.log(`no article in ${chapter.file}`);
    continue;
  }

  article.querySelectorAll('nav').forEach((nav) => nav.remove());
  article.querySelectorAll('button').forEach((button) => button.remove());

  const body = clean(article.childNodes.map((node) => block(node)).join(''));

  const number = chapter.file.slice(0, 2);
  const frontmatter = [
    '---',
    `chapter: "${number}"`,
    `slug: ${chapter.slug}`,
    `title: ${JSON.stringify(chapter.englishTitle)}`,
    'lang: en',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(
    path.join(outDir, `${number}_${chapter.slug}.md`),
    `${frontmatter}${body}\n`
  );
  console.log(`converted ${chapter.file} (${body.split(/\s+/).length} words)`);
}

console.log('done');
