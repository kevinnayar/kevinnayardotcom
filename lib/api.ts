import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = join(process.cwd(), 'content');

function getContentSlugs() {
  return fs.readdirSync(contentDir);
}

export type ContentItem = {
  title: string,
  markdown: string;
  html: string;
};

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

async function getContentBySlug(slug: string): Promise<ContentItem> {
  const title = slug.replace(/\.md$/, '').toLowerCase();
  const fullPath = join(contentDir, `${title}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { content: markdown } = matter(fileContents);
  const html = await markdownToHtml(markdown);

  return {
    title,
    markdown,
    html,
  };
}

export async function getContent() {
  const map: Record<string, ContentItem> = {};
  const slugs = getContentSlugs();

  for (const slug of slugs) {
    const content = await getContentBySlug(slug);
    map[content.title] = content;
  }

  return map;
}
