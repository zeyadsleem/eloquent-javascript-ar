import manifest from './generated/manifest.json';
import { withBasePath } from './html.js';

export const book = manifest;
export const chapters = manifest.chapters;

const chapterModules = import.meta.glob('/src/lib/generated/chapters/*.json');

export const chapterPath = (slug) => withBasePath(`/chapter/${slug}`);

export const loadChapter = async (slug) => {
  const key = `/src/lib/generated/chapters/${slug}.json`;
  const loader = chapterModules[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
};

export const getPrevNext = (slug) => {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
};
