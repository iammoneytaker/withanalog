'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
// import { projects } from '../../lib/projects';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function ProjectSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true, // 이 부분 추가
  });

  const [, setProjectCount] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProjectCount = async () => {
      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('프로젝트 개수 로딩 중 오류 발생:', error);
      } else {
        setProjectCount(count || 0);
      }
    };

    fetchProjectCount();
  }, []);

  // 웹 도구 데이터
  const webTools = [
    {
      id: 'keyboard-performance-test',
      title: '키보드 성능 테스트',
      description: '텐키리스/풀사이즈 레이아웃으로 APM/CPS 정확 측정, 게이머 필수 도구',
      icon: '⚡',
      iconBg: 'from-yellow-400 to-orange-500',
      type: 'web' as const,
    },
    {
      id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
      title: '한글 타자 연습',
      description: '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요',
      icon: '🇰🇷',
      iconBg: 'from-blue-400 to-blue-600',
      type: 'web' as const,
    },
    {
      id: 'english-typing-test',
      title: '영문 타자 연습',
      description: '영문 타이핑 속도와 정확도를 향상시키는 체계적인 학습 도구',
      icon: '⌨️',
      iconBg: 'from-purple-400 to-purple-600',
      type: 'web' as const,
    },
  ];

  // 앱 데이터
  const appTools = [
    {
      id: 'korean-typing-app',
      title: '한글 타자왕',
      description: '스마트폰에서도 체계적인 한글 타이핑 학습! 언제 어디서나 타자 연습을 하세요',
      icon: '📱',
      iconBg: 'from-green-400 to-emerald-600',
      type: 'app' as const,
      isExternal: true,
      googlePlay: 'https://play.google.com/store/apps/details?id=com.moneytaker.korean_typing&hl=ko',
      appStore: 'https://apps.apple.com/ae/app/%ED%95%9C%EA%B8%80%ED%83%80%EC%9E%90%EC%99%95/id6702021365',
      logoUrl: 'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/icons/0.4562350743455379.png'
    },
  ];

  const [activeTab, setActiveTab] = useState<'web' | 'app' | 'all'>('all');

  const getFilteredTools = () => {
    if (activeTab === 'web') return webTools;
    if (activeTab === 'app') return appTools;
    return [...webTools, ...appTools];
  };

  const filteredTools = getFilteredTools();

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
            키보드 도구들
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8">
            웹과 앱에서 사용할 수 있는 다양한 키보드 도구들
          </p>
          
          {/* 탭 메뉴 */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900 rounded-xl p-1 inline-flex">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                전체 ({webTools.length + appTools.length})
              </button>
              <button
                onClick={() => setActiveTab('web')}
                className={`px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                  activeTab === 'web'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🌐 웹 ({webTools.length})
              </button>
              <button
                onClick={() => setActiveTab('app')}
                className={`px-6 py-2 rounded-lg transition-all font-medium text-sm sm:text-base ${
                  activeTab === 'app'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📱 앱 ({appTools.length})
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((project, index) => {
            // 앱 프로젝트인 경우 다른 렌더링
            if (project.type === 'app' && 'isExternal' in project) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 hover:shadow-xl hover:shadow-green-900/20 relative overflow-hidden"
                >
                  {/* 앱 배지 */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    APP
                  </div>
                  
                  {/* 아이콘 컨테이너 */}
                  <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${project.iconBg} flex items-center justify-center text-2xl shadow-lg overflow-hidden`}>
                    {project.logoUrl ? (
                      <img 
                        src={project.logoUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="drop-shadow-sm">{project.icon}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-left line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* 앱 스토어 링크 버튼들 */}
                  <div className="flex gap-2 mt-4">
                    <a
                      href={project.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>🤖</span>
                      <span>Play Store</span>
                    </a>
                    <a
                      href={project.appStore}
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

            // 웹 프로젝트인 경우 기존 렌더링
            return (
              <Link href={`/tools/${project.id}`} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all cursor-pointer border border-gray-700 hover:border-gray-600 hover:shadow-xl hover:shadow-blue-900/20 relative"
                >
                  {/* 웹 배지 */}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    WEB
                  </div>
                  
                  {/* 아이콘 컨테이너 */}
                  <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${project.iconBg} flex items-center justify-center text-2xl shadow-lg`}>
                    <span className="drop-shadow-sm">{project.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-left line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* 호버 효과를 위한 화살표 아이콘 */}
                  <div className="mt-4 flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/tools"
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            모든 도구 보기 ({webTools.length + appTools.length})
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
