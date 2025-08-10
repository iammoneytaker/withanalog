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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              키보드 블로그
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              키보드 리뷰부터 스위치 분석, 커스텀 가이드까지 - 키보드의 모든 것
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                🎯 키보드 리뷰
              </span>
              <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm">
                ⚙️ 스위치 가이드
              </span>
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                🎨 커스텀 빌드
              </span>
              <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm">
                ⚡ 타이핑 팁
              </span>
              <span className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm">
                🎮 게이밍 설정
              </span>
            </div>
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <div className="mb-8">
                <div className="text-6xl mb-4">⌨️</div>
                <p className="text-gray-400 text-xl mb-6">
                  아직 작성된 블로그 글이 없습니다.
                </p>
                <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                  곧 다음과 같은 키보드 전문 콘텐츠들을 만나보실 수 있습니다.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">🔍 키보드 리뷰</h3>
                  <p className="text-sm text-gray-400">레오폴드, 리얼포스, HHKB 등 인기 키보드들의 상세한 사용 후기와 성능 분석</p>
                </div>
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">⚙️ 스위치 가이드</h3>
                  <p className="text-sm text-gray-400">Cherry MX, Gateron, Kailh 스위치별 특성과 황축, 적축, 청축, 갈축 비교 분석</p>
                </div>
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">🎨 커스텀 가이드</h3>
                  <p className="text-sm text-gray-400">핫스왑, 개스켓 마운트, 키캡 교체 등 나만의 키보드 만들기 가이드</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  key={post.id}
                >
                  <article
                    className="flex flex-col lg:flex-row gap-6 bg-gray-800/80 rounded-xl 
                    transition-all duration-300 
                    hover:bg-gray-700 cursor-pointer group
                    border border-gray-700/50
                    hover:border-blue-500/40
                    shadow-lg hover:shadow-xl hover:shadow-blue-900/30
                    hover:translate-y-[-4px] overflow-hidden
                    backdrop-blur-sm"
                  >
                    <div className="lg:w-1/3 h-64 lg:h-auto relative bg-gray-900/50">
                      <Image
                        src={post.thumbnail || '/images/default-thumbnail.png'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {post.category}
                          </span>
                        )}
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 mb-6 line-clamp-3 text-base leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <time dateTime={post.created_at} className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(post.created_at).toLocaleDateString(
                              'ko-KR',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </time>
                          {post.read_time && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                {post.read_time}분 읽기
                              </span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                          읽어보기
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
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
