import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 | 위드아날로그',
  description: '광고 없는 앱 100개 만들기 프로젝트의 블로그 글 모음',
};

async function getBlogPosts() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('블로그 글 로딩 중 오류 발생:', error);
    return [];
  }

  return data;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">블로그</h1>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">
            아직 작성된 블로그 글이 없습니다.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-gray-800 p-6 rounded-lg">
                <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                </Link>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
