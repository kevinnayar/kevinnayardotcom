import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type DirType = 'info' | 'blog';

export type ContentMetadata = {
  title: string,
  date?: string,
  tags?: string[],
};

export type ContentItem = {
  id: string,
  markdown: string;
  html: string;
  metadata: ContentMetadata;
};

function fileToMarkdownAndMetadata(fullPath: string) {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);
  const markdown = content;
  const metadata = data as ContentMetadata;
  return {
    markdown,
    metadata,
  };
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

async function getPostByDirAndSlug(dirPath: string, slug: string): Promise<ContentItem> {
  const fullPath = join(dirPath, slug);
  const id = slug.replace(/\.md$/, '').toLowerCase();
  const { markdown, metadata } = fileToMarkdownAndMetadata(fullPath);
  const html = await markdownToHtml(markdown);

  return {
    id,
    markdown,
    html,
    metadata,
  };
}

function getDirPath(dirType: DirType) {
  let dirPath = '';
  if (dirType === 'info') dirPath = join(process.cwd(), 'content/info');
  if (dirType === 'blog') dirPath = join(process.cwd(), 'content/blog');
  if (!dirPath) throw new Error(`Invalid directory type: "${dirType}"`);
  return dirPath;
}

function getPostSlugs(dirPath: string) {
  return fs.readdirSync(dirPath);
}

async function getAllPostsByDir(dirType: DirType) {
  const map: Record<string, ContentItem> = {};
  const dirPath = getDirPath(dirType);
  const slugs = getPostSlugs(dirPath);

  for (const slug of slugs) {
    const post = await getPostByDirAndSlug(dirPath, slug);
    map[post.id] = post;
  }

  return map;
}

async function getPostByDirTypeAndId(dirType: DirType, id: string) {
  const dirPath = getDirPath(dirType);
  const slug = `${id}.md`;
  return await getPostByDirAndSlug(dirPath, slug);
}

export async function getAllInfoPosts() {
  return await getAllPostsByDir('info');
}

export async function getBlogPostById(id: string) {
  return await getPostByDirTypeAndId('blog', id);
}

export async function getFeaturedBlogPosts() {
  const posts = await getAllPostsByDir('blog');
  const featured = [];

  for (const post of Object.values(posts)) {
    const isFeatured = post.metadata.tags &&
      Array.isArray(post.metadata.tags) &&
      post.metadata.tags.length &&
      post.metadata.tags.includes('featured');

    if (isFeatured) {
      featured.push(post);
    }
  }

  return featured;
}




