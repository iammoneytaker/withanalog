'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ToolsPage() {
  // 웹 도구 데이터
  const webTools = [
    {
      id: 'typing-practice',
      title: '키보드 타자 연습',
      description: '실시간 WPM 측정과 정확도 분석으로 체계적인 타자 실력 향상, 새 키보드 적응에 최적',
      icon: '⌨️',
      category: '타이핑 연습',
      iconBg: 'from-green-400 to-emerald-600',
      type: 'web' as const,
    },
    {
      id: 'keyboard-performance-test',
      title: '키보드 성능 테스트',
      description: '텐키리스/풀사이즈 레이아웃으로 APM/CPS 정확 측정, 게이머 필수 도구',
      icon: '⚡',
      category: '성능 테스트',
      iconBg: 'from-yellow-400 to-orange-500',
      type: 'web' as const,
    },
    {
      id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
      title: '한글 타자 연습',
      description: '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요',
      icon: '🇰🇷',
      category: '타이핑 연습',
      iconBg: 'from-blue-400 to-blue-600',
      type: 'web' as const,
    },
    {
      id: 'english-typing-test',
      title: '영문 타자 연습',
      description: '영문 타이핑 속도와 정확도를 향상시키는 체계적인 학습 도구',
      icon: '⌨️',
      category: '타이핑 연습',
      iconBg: 'from-purple-400 to-purple-600',
      type: 'web' as const,
    },
    {
      id: 'ac54699f-e7e5-4075-8230-7ae6c604104a',
      title: '키보드 반응속도 테스트',
      description: '키보드의 입력 딜레이와 개인 반응속도를 정밀 측정하고 분석합니다',
      icon: '🎯',
      category: '성능 테스트',
      iconBg: 'from-red-400 to-pink-500',
      type: 'web' as const,
    },
    {
      id: 'keyboard-sound-test',
      title: '키보드 사운드 테스트',
      description: '다양한 스위치별 타건 소리를 직접 들어보고 비교할 수 있는 실시간 사운드 플레이어',
      icon: '🔊',
      category: '사운드 테스트',
      iconBg: 'from-indigo-400 to-purple-500',
      type: 'web' as const,
    }
  ];

  // 앱 데이터
  const appTools = [
    {
      id: 'korean-typing-app',
      title: '한글 타자왕',
      description: '스마트폰에서도 체계적인 한글 타이핑 학습! 언제 어디서나 타자 연습을 하세요',
      icon: '📱',
      category: '타이핑 연습',
      iconBg: 'from-green-400 to-emerald-600',
      type: 'app' as const,
      isExternal: true,
      googlePlay: 'https://play.google.com/store/apps/details?id=com.moneytaker.korean_typing&hl=ko',
      appStore: 'https://apps.apple.com/ae/app/%ED%95%9C%EA%B8%80%ED%83%80%EC%9E%90%EC%99%95/id6702021365',
      logoUrl: 'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/icons/0.4562350743455379.png'
    },
  ];

  const [activeTab, setActiveTab] = useState<'web' | 'app' | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const getFilteredTools = () => {
    let tools = [];
    if (activeTab === 'web') tools = webTools;
    else if (activeTab === 'app') tools = appTools;
    else tools = [...webTools, ...appTools];

    if (selectedCategory === '전체') return tools;
    return tools.filter(tool => tool.category === selectedCategory);
  };

  const filteredTools = getFilteredTools();
  
  const allCategories = ['전체', '성능 테스트', '타이핑 연습', '사운드 테스트'];

  return (
    <main className="min-h-screen py-16 sm:py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            키보드 도구들
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            타이핑 연습부터 성능 테스트까지, 키보드와 관련된 모든 도구들
          </p>
        </div>
        {/* 탭 메뉴 */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              전체 ({webTools.length + appTools.length})
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                activeTab === 'web'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🌐 웹 ({webTools.length})
            </button>
            <button
              onClick={() => setActiveTab('app')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                activeTab === 'app'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 앱 ({appTools.length})
            </button>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 도구 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            // 앱 도구인 경우
            if (tool.type === 'app' && 'isExternal' in tool) {
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 hover:shadow-xl hover:shadow-green-900/20 relative overflow-hidden"
                >
                  {/* 앱 배지 */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    APP
                  </div>
                  
                  {/* 아이콘 컨테이너 */}
                  <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${tool.iconBg} flex items-center justify-center text-2xl shadow-lg overflow-hidden`}>
                    {tool.logoUrl ? (
                      <img 
                        src={tool.logoUrl} 
                        alt={tool.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="drop-shadow-sm">{tool.icon}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-left line-clamp-3 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* 카테고리 태그 */}
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      {tool.category}
                    </span>
                  </div>

                  {/* 앱 스토어 링크 버튼들 */}
                  <div className="flex gap-2">
                    <a
                      href={tool.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>🤖</span>
                      <span>Play Store</span>
                    </a>
                    <a
                      href={tool.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>🍎</span>
                      <span>App Store</span>
                    </a>
                  </div>
                </motion.div>
              );
            }

            // 웹 도구인 경우
            return (
              <Link href={`/tools/${tool.id}`} key={tool.id} prefetch={false}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all cursor-pointer border border-gray-700 hover:border-gray-600 hover:shadow-xl hover:shadow-blue-900/20 relative"
                >
                  {/* 웹 배지 */}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    WEB
                  </div>
                  
                  {/* 아이콘 컨테이너 */}
                  <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${tool.iconBg} flex items-center justify-center text-2xl shadow-lg`}>
                    <span className="drop-shadow-sm">{tool.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-left line-clamp-3 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* 카테고리 태그 */}
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  
                  {/* 호버 효과를 위한 화살표 아이콘 */}
                  <div className="flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>더 알아보기</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">해당 카테고리에 도구가 없습니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}