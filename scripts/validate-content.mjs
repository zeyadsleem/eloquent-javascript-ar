import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const book = JSON.parse(
  fs.readFileSync(path.join(root, 'content', 'book.json'), 'utf8')
);

const allChapters = [
  book.intro,
  ...book.parts.flatMap((part) => part.chapters),
];

const count = (text, regex) => (text.match(regex) || []).length;

let failures = 0;

for (const chapter of allChapters) {
  const number = chapter.file.slice(0, 2);
  const file = path.join(root, 'content', `${number}_${chapter.slug}.md`);
  if (!fs.existsSync(file)) {
    console.log(`MISSING ${number}_${chapter.slug}`);
    failures += 1;
    continue;
  }

  const raw = fs.readFileSync(file, 'utf8');
  const text = raw.replace(/```[\s\S]*?```/g, '');
  const source = fs.readFileSync(
    path.join(root, 'content-src', 'en', `${number}_${chapter.slug}.md`),
    'utf8'
  );

  if (!/lang:\s*ar/.test(raw)) {
    console.log(`NOT ARABIC ${number}_${chapter.slug}`);
    failures += 1;
  }

  const fences = count(raw, /```/g);
  const sourceFences = count(source, /```/g);
  if (fences !== sourceFences) {
    console.log(
      `FENCES ${number}_${chapter.slug}: ${fences} vs source ${sourceFences}`
    );
    failures += 1;
  }

  const details = count(text, /<details/g);
  const sourceDetails = count(source, /<details/g);
  if (details !== sourceDetails) {
    console.log(
      `DETAILS ${number}_${chapter.slug}: ${details} vs source ${sourceDetails}`
    );
    failures += 1;
  }

  const closeDetails = count(text, /<\/details>/g);
  if (details !== closeDetails) {
    console.log(
      `UNBALANCED DETAILS ${number}_${chapter.slug}: ${details}/${closeDetails}`
    );
    failures += 1;
  }

  const images = count(raw, /!\[[^\]]*\]\(/g);
  const sourceImages = count(source, /!\[[^\]]*\]\(/g);
  if (images !== sourceImages) {
    console.log(
      `IMAGES ${number}_${chapter.slug}: ${images} vs source ${sourceImages}`
    );
    failures += 1;
  }
}

console.log(failures === 0 ? 'ALL OK' : `${failures} problems`);
process.exit(failures === 0 ? 0 : 1);
