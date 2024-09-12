import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts'; // 함수 이름 수정

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.withanalog.com'; // 여기에 실제 도메인을 입력하세요
  const posts = getSortedPostsData(); // 비동기 함수가 아니므로 await 제거

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.id}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/application/quitsmoke`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
