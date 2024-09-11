import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData() {
  const categories = fs.readdirSync(postsDirectory);

  const allPostsData = categories.flatMap((category) => {
    const categoryPath = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryPath);
    return fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        category,
        ...(matterResult.data as {
          date: string;
          title: string;
          excerpt: string;
        }),
      };
    });
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export async function getPostData(category: string, id: string) {
  const fullPath = path.join(postsDirectory, category, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    category,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; excerpt: string }),
  };
}
