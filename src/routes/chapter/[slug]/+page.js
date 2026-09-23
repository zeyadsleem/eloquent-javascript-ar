import { error } from '@sveltejs/kit';
import { chapters, getPrevNext, loadChapter } from '$lib/content.js';

export const entries = () => chapters.map((chapter) => ({ slug: chapter.slug }));

export async function load({ params }) {
  const chapter = chapters.find((c) => c.slug === params.slug);
  if (!chapter) {
    throw error(404, 'الفصل غير موجود');
  }
  const content = await loadChapter(params.slug);
  const { prev, next } = getPrevNext(params.slug);
  return { chapter, content, prev, next };
}
