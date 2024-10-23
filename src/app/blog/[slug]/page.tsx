import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getBlogPost(decodedSlug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | 위드아날로그 블로그`,
    description: post.excerpt,
  };
}

async function getBlogPost(slug: string) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', decodeURIComponent(slug))
    .single();

  if (error) {
    console.error('블로그 글 로딩 중 오류 발생:', error);
    return null;
  }

  return data;
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-400 mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
