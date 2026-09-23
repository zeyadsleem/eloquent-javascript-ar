import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const generatedDir = path.join(root, 'src', 'lib', 'generated');

const book = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'book.json'), 'utf8')
);

const markdown = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: false,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true })
          .value;
      } catch (e) {
        return '';
      }
    }
    return '';
  },
});

const slugifyHeading = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const addHeadingIds = (html) =>
  html.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h\1>/gs,
    (match, level, attrs, inner) => {
      if (/id=/.test(attrs)) return match;
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const id = slugifyHeading(text);
      if (!id) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );

const extractHeadings = (html) => {
  const headings = [];
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gs;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      depth: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '').trim(),
    });
  }
  return headings;
};

const stripHtml = (html) =>
  html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeText = (text) =>
  text.replace(/[\u064B-\u065F\u0670]/g, '').toLowerCase();

const run = () => {
  fs.rmSync(generatedDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(generatedDir, 'chapters'), { recursive: true });

  const allChapters = [
    book.intro,
    ...book.parts.flatMap((part) => part.chapters),
  ];

  const manifestChapters = [];
  const searchIndex = [];

  for (const chapter of allChapters) {
    const number = chapter.file.slice(0, 2);
    const candidates = [
      path.join(contentDir, `${number}_${chapter.slug}.md`),
      path.join(contentDir, `${number}.md`),
    ];
    const file = candidates.find((candidate) => fs.existsSync(candidate));
    if (!file) {
      console.log(`missing content for ${chapter.slug}`);
      continue;
    }

    const raw = fs.readFileSync(file, 'utf8');
    const { content } = matter(raw);
    let html = markdown.render(content);
    html = addHeadingIds(html);

    const entry = {
      number,
      slug: chapter.slug,
      title: chapter.title,
      englishTitle: chapter.englishTitle,
      headings: extractHeadings(html),
      html,
    };

    fs.writeFileSync(
      path.join(generatedDir, 'chapters', `${chapter.slug}.json`),
      JSON.stringify(entry)
    );

    manifestChapters.push({
      number,
      slug: chapter.slug,
      title: chapter.title,
    });

    searchIndex.push({
      number,
      slug: chapter.slug,
      title: chapter.title,
      text: normalizeText(stripHtml(html)).slice(0, 4000),
    });
  }

  const manifest = {
    title: book.title,
    titleAr: book.titleAr,
    author: book.author,
    edition: book.edition,
    chapters: manifestChapters,
    parts: book.parts.map((part) => ({
      title: part.title,
      chapters: part.chapters.map((chapter) => ({
        slug: chapter.slug,
        title: chapter.title,
      })),
    })),
  };

  fs.writeFileSync(
    path.join(generatedDir, 'manifest.json'),
    JSON.stringify(manifest)
  );
  fs.writeFileSync(
    path.join(generatedDir, 'search-index.json'),
    JSON.stringify({ chapters: searchIndex })
  );

  console.log(`Generated ${manifestChapters.length} chapters`);
};

run();
