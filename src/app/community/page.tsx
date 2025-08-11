'use client';

import { motion } from 'framer-motion';

interface CommunitySection {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  stats: {
    posts: number;
    members: number;
    lastActivity: string;
  };
  tags: string[];
}

const communitySections: CommunitySection[] = [
  {
    id: 'reviews',
    title: '키보드 리뷰',
    description: '실제 사용자들의 솔직한 키보드 리뷰와 평점을 확인하세요',
    icon: '⭐',
    href: '/community/reviews',
    color: 'from-blue-500 to-cyan-500',
    stats: {
      posts: 127,
      members: 1234,
      lastActivity: '5분 전'
    },
    tags: ['리뷰', '평점', '추천']
  },
  {
    id: 'builds',
    title: '커스텀 빌드',
    description: '나만의 키보드 빌드를 공유하고 영감을 받아보세요',
    icon: '🔧',
    href: '/community/builds',
    color: 'from-purple-500 to-pink-500',
    stats: {
      posts: 89,
      members: 856,
      lastActivity: '12분 전'
    },
    tags: ['빌드', '커스텀', '갤러리']
  },
  {
    id: 'qna',
    title: 'Q&A',
    description: '키보드 관련 질문과 답변을 나누는 공간입니다',
    icon: '❓',
    href: '/community/qna',
    color: 'from-green-500 to-teal-500',
    stats: {
      posts: 234,
      members: 2156,
      lastActivity: '2분 전'
    },
    tags: ['질문', '답변', '도움']
  },
  {
    id: 'discussion',
    title: '자유 토론',
    description: '키보드와 타이핑에 대한 자유로운 토론 공간',
    icon: '💬',
    href: '/community/discussion',
    color: 'from-orange-500 to-red-500',
    stats: {
      posts: 156,
      members: 1887,
      lastActivity: '1분 전'
    },
    tags: ['토론', '정보', '소통']
  }
];

const recentPosts = [
  {
    id: 1,
    title: '독거미 Redux 사용 후기 - 3개월 장기 리뷰',
    author: 'KeyboardLover',
    category: '리뷰',
    likes: 24,
    replies: 8,
    timeAgo: '1시간 전',
    tags: ['독거미', 'Redux', '장기리뷰']
  },
  {
    id: 2,
    title: '처음 기계식 키보드 추천해주세요 (예산 15만원)',
    author: '키보드초보',
    category: 'Q&A',
    likes: 12,
    replies: 15,
    timeAgo: '2시간 전',
    tags: ['추천', '입문', '예산']
  },
  {
    id: 3,
    title: '[빌드 완료] 60% 알루미늄 케이스 + Gateron Yellow',
    author: 'CustomBuilder',
    category: '빌드',
    likes: 31,
    replies: 6,
    timeAgo: '3시간 전',
    tags: ['60%', 'Gateron', '완성']
  },
  {
    id: 4,
    title: 'Cherry MX vs Gateron 스위치 비교 분석',
    author: 'TechReviewer',
    category: '토론',
    likes: 45,
    replies: 22,
    timeAgo: '4시간 전',
    tags: ['Cherry', 'Gateron', '비교']
  }
];

export default function CommunityPage() {
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              키보드 커뮤니티
            </span>
          </h1>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-2">🚧</span>
              <h2 className="text-xl font-bold text-orange-400">커뮤니티 준비 중</h2>
            </div>
            <p className="text-orange-300 text-sm">
              더 나은 커뮤니티 경험을 위해 준비 중입니다.
              <br />
              <span className="text-orange-400 font-medium">곧 만나뵙겠습니다!</span>
            </p>
          </div>
          
          {/* 커뮤니티 통계 */}
          <motion.div
            className="flex justify-center items-center space-x-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">5,847</div>
              <div className="text-sm text-gray-500">활성 멤버</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">1,203</div>
              <div className="text-sm text-gray-500">총 게시글</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">3,456</div>
              <div className="text-sm text-gray-500">총 댓글</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 준비중 안내 섹션 */}
        <div className="grid lg:grid-cols-3 gap-8 opacity-50 pointer-events-none">
          {/* 왼쪽: 커뮤니티 섹션들 */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {communitySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`
                    bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 
                    transition-all duration-300 h-full relative
                  `}>
                    {/* 준비중 오버레이 */}
                    <div className="absolute inset-0 bg-gray-900/70 rounded-2xl flex items-center justify-center z-20">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-sm text-gray-400">준비 중</div>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{section.icon}</div>
                        <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${section.color} text-white text-xs font-medium opacity-80`}>
                          {section.stats.posts}개 글
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        {section.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {section.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {section.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{section.stats.members}명 참여</span>
                        <span>최근 활동: {section.stats.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 최근 활동 */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {/* 준비중 오버레이 */}
              <div className="absolute inset-0 bg-gray-900/70 rounded-2xl flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm text-gray-400">준비 중</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="text-2xl mr-2">🔥</span>
                최근 활동
              </h3>
              
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="group p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.timeAgo}</span>
                    </div>
                    
                    <h4 className="text-sm font-medium text-white mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>by {post.author}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                          {post.replies}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-600/50 text-gray-400 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-blue-400 text-sm font-medium">
                  더 많은 활동 보기 →
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 하단: CTA (준비중) */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 더 나은 커뮤니티를 준비하고 있습니다!
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            키보드 애호가들을 위한 특별한 공간을 만들고 있습니다.
            <br />
            <span className="text-orange-400">조금만 기다려주세요!</span>
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <div className="px-6 py-3 bg-gray-700/50 text-gray-400 rounded-lg font-semibold cursor-not-allowed">
              🔒 준비 중
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}