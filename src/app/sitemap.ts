import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function sitemap() {
  const supabase = createServerComponentClient({ cookies });

  // 블로그 포스트 가져오기
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at');

  // 프로젝트 목록 가져오기
  const { data: projects } = await supabase
    .from('projects')
    .select('id, updated_at');

  const baseUrl = 'https://withanalog.com';

  // 정적 페이지
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 블로그 포스트 URL
  const blogUrls =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly',
      priority: 0.6,
    })) || [];

  // 프로젝트 URL
  const projectUrls =
    projects?.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || [];

  return [...staticPages, ...blogUrls, ...projectUrls];
}
