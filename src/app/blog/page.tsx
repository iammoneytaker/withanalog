import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '블로그 | WithAnalog',
  description: '키보드, 타이핑, 기계식 키보드에 대한 전문적인 리뷰와 가이드',
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
  try {
    const posts = await getBlogPosts();

    if (!posts) {
      throw new Error('블로그 글을 불러올 수 없습니다.');
    }

    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">키보드 블로그</h1>
          <p className="text-xl text-gray-400 mb-8">
            키보드 리뷰, 타이핑 팁, 기계식 키보드 가이드까지
          </p>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl mb-6">
                아직 작성된 블로그 글이 없습니다.
              </p>
              <p className="text-gray-500">
                곧 키보드와 타이핑에 관한 유익한 콘텐츠들을 만나보실 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  key={post.id}
                >
                  <article
                    className="flex flex-col md:flex-row gap-6 bg-gray-800/80 rounded-lg 
                    transition-all duration-300 
                    hover:bg-gray-700 cursor-pointer group
                    border border-gray-700/50
                    hover:border-blue-500/30
                    shadow-lg hover:shadow-blue-900/20
                    hover:translate-y-[-2px] overflow-hidden"
                  >
                    <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-900/50">
                      <Image
                        src={post.thumbnail || '/images/default-thumbnail.png'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <time dateTime={post.created_at}>
                          {new Date(post.created_at).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </time>
                        {post.category && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
          <p className="text-gray-400">
            블로그 글을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해
            주세요.
          </p>
        </div>
      </main>
    );
  }
}
