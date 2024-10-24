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

  const url = `https://withanalog.com/blog/${decodedSlug}`;

  return {
    title: post.title,
    description: post.excerpt,
    metadataBase: new URL('https://withanalog.com'),
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['위드아날로그'],
      url,
      images: [
        {
          url: post.og_image || '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.og_image || '/images/og-image.png'],
    },
  };
}

async function getBlogPost(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  // 기본적인 슬러그 유효성 검사

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', decodedSlug)
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
        {/* 메타 정보 섹션 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.category && (
              <>
                <span>•</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
        </div>

        {/* 본문 컨텐츠 */}
        <div
          className="blog-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 하단 구분선 */}
        <hr className="my-12 border-gray-700" />

        {/* 이전/다음 글 네비게이션 (옵션) */}
        <div className="flex justify-between text-sm text-gray-400">
          <div>{/* 이전 글 링크 구현 필요 */}</div>
          <div>{/* 다음 글 링크 구현 필요 */}</div>
        </div>
      </article>
    </main>
  );
}
