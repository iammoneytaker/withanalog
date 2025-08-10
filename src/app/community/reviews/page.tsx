'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Review {
  id: number;
  title: string;
  keyboardName: string;
  author: string;
  rating: number;
  summary: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
  verified: boolean;
  images?: string[];
}

// Mock 데이터 - 실제로는 Supabase에서 가져올 예정
const mockReviews: Review[] = [
  {
    id: 1,
    title: '독거미 Redux 3개월 사용 후기 - 솔직한 리뷰',
    keyboardName: '독거미 Redux',
    author: 'KeyboardMaster',
    rating: 4.5,
    summary: '3개월간 프로그래밍 용도로 사용해본 독거미 Redux의 솔직한 후기입니다. 장점과 단점을 객관적으로 분석해봤습니다.',
    likes: 34,
    comments: 12,
    createdAt: '2024-01-15',
    tags: ['독거미', 'Redux', '장기리뷰', '프로그래밍'],
    verified: true,
    images: ['keyboard1.jpg', 'keyboard2.jpg']
  },
  {
    id: 2,
    title: 'Cherry MX Blue vs Brown 스위치 비교 체험기',
    keyboardName: 'Leopold FC750R',
    author: 'SwitchExpert',
    rating: 4.2,
    summary: '같은 키보드에서 청축과 갈축을 번갈아 사용해보며 느낀 차이점을 상세히 정리했습니다.',
    likes: 28,
    comments: 18,
    createdAt: '2024-01-14',
    tags: ['Cherry MX', '스위치비교', 'Leopold'],
    verified: true
  },
  {
    id: 3,
    title: '[입문자 리뷰] 첫 기계식 키보드 앱코 K660',
    keyboardName: '앱코 K660',
    author: '키보드초보',
    rating: 4.0,
    summary: '첫 기계식 키보드로 앱코 K660을 선택한 이유와 1개월 사용 경험을 공유합니다.',
    likes: 19,
    comments: 25,
    createdAt: '2024-01-13',
    tags: ['앱코', '입문용', '가성비'],
    verified: false
  },
  {
    id: 4,
    title: 'HHKB Professional Hybrid - 프로그래머의 관점',
    keyboardName: 'HHKB Professional Hybrid',
    author: 'DevTyper',
    rating: 4.8,
    summary: '개발자로서 HHKB의 독특한 레이아웃과 무접점 스위치를 6개월간 사용한 상세 리뷰입니다.',
    likes: 42,
    comments: 15,
    createdAt: '2024-01-12',
    tags: ['HHKB', '무접점', '프로그래밍', '레이아웃'],
    verified: true
  },
  {
    id: 5,
    title: '키크론 K8 Pro 핫스왑 체험기',
    keyboardName: '키크론 K8 Pro',
    author: 'CustomBuilder',
    rating: 4.3,
    summary: '핫스왑 기능을 활용해 다양한 스위치를 테스트해본 경험과 커스텀 과정을 공유합니다.',
    likes: 31,
    comments: 20,
    createdAt: '2024-01-11',
    tags: ['키크론', '핫스왑', '커스텀'],
    verified: true
  }
];

const categories = ['전체', '입문용', '고급형', '커스텀', '게이밍', '프로그래밍'];
const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'rating', label: '평점순' },
  { value: 'comments', label: '댓글순' }
];

export default function CommunityReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const StarRating = ({ rating, size = 'small' }: { rating: number; size?: 'small' | 'medium' }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className={`${starSize} text-yellow-400 fill-current`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <svg className={`${starSize} text-gray-400 fill-current`} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <svg className={`${starSize} text-yellow-400 fill-current`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className={`${starSize} text-gray-400 fill-current`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              키보드 리뷰
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            실제 사용자들의 솔직한 키보드 리뷰와 평가를 확인하세요
          </p>
        </motion.div>

        {/* 검색 및 필터 */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* 검색창 */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="키보드명, 브랜드, 태그 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 정렬 옵션 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 리뷰 작성 버튼 */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/50">
            <div className="text-sm text-gray-400">
              총 <span className="text-blue-400 font-semibold">{mockReviews.length}</span>개의 리뷰
            </div>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✍️ 리뷰 작성하기
            </motion.button>
          </div>
        </motion.div>

        {/* 리뷰 목록 */}
        <div className="grid gap-6">
          {mockReviews.map((review, index) => (
            <motion.article
              key={review.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* 왼쪽: 메타 정보 */}
                <div className="lg:w-1/4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-white font-medium">{review.author}</span>
                        {review.verified && (
                          <svg className="w-4 h-4 text-blue-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{review.createdAt}</div>
                    </div>
                  </div>
                  
                  <div className="text-lg font-bold text-blue-400 mb-2">{review.keyboardName}</div>
                  <div className="flex items-center mb-2">
                    <StarRating rating={review.rating} />
                    <span className="ml-2 text-sm font-medium text-gray-300">{review.rating}/5</span>
                  </div>
                </div>

                {/* 오른쪽: 리뷰 내용 */}
                <div className="lg:w-3/4">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {review.title}
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {review.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        {review.likes}개 도움됨
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {review.comments}개 댓글
                      </span>
                      {review.images && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          {review.images.length}장 사진
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      href={`/community/reviews/${review.id}`}
                      className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      전체 보기
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
            더 많은 리뷰 보기
          </button>
        </motion.div>
      </div>
    </main>
  );
}