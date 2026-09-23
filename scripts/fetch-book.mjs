import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourcesDir = path.join(root, 'sources', 'html');
const imagesDir = path.join(root, 'static', 'images', 'book');

const BASE = 'https://eloquentjavascript.net/';
const PAGES = [
  'index.html',
  '00_intro.html',
  '01_values.html',
  '02_program_structure.html',
  '03_functions.html',
  '04_data.html',
  '05_higher_order.html',
  '06_object.html',
  '07_robot.html',
  '08_error.html',
  '09_regexp.html',
  '10_modules.html',
  '11_async.html',
  '12_language.html',
  '13_browser.html',
  '14_dom.html',
  '15_event.html',
  '16_game.html',
  '17_canvas.html',
  '18_http.html',
  '19_paint.html',
  '20_node.html',
  '21_skillsharing.html',
];

fs.mkdirSync(sourcesDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, attempts = 4) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; EJ-Arabic/1.0)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (error) {
      lastError = error;
      await sleep(1000 * attempt);
    }
  }
  throw lastError;
};

const fetchPage = async (page) => {
  const buffer = await fetchWithRetry(`${BASE}${page}`);
  return buffer.toString('utf8');
};

const downloadImage = async (src) => {
  const filename = src.replace(/^img\//, '').replace(/\//g, '_');
  const target = path.join(imagesDir, filename);
  if (fs.existsSync(target)) return filename;
  try {
    const buffer = await fetchWithRetry(`${BASE}${src}`);
    fs.writeFileSync(target, buffer);
    return filename;
  } catch (error) {
    console.log(`  image failed: ${src} (${error.message})`);
    return null;
  }
};

const run = async () => {
  const imageSet = new Set();

  for (const page of PAGES) {
    const target = path.join(sourcesDir, page);
    if (fs.existsSync(target)) {
      console.log(`cached ${page}`);
    } else {
      const html = await fetchPage(page);
      fs.writeFileSync(target, html);
      await sleep(300);
    }
    const html = fs.readFileSync(target, 'utf8');

    const dom = parse(html);
    for (const img of dom.querySelectorAll('img')) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('img/')) imageSet.add(src);
    }
    console.log(`fetched ${page}`);
  }

  console.log(`downloading ${imageSet.size} images`);
  let downloaded = 0;
  for (const src of imageSet) {
    const result = await downloadImage(src);
    if (result) downloaded += 1;
  }
  console.log(`downloaded ${downloaded} images`);
};

run();
