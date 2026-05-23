'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const features = [
  {
    category: '성능 분석',
    title: '키보드 성능 테스트',
    description: '실제 사용 환경에서 키보드의 반응속도, 정확도, 내구성을 과학적으로 측정합니다.',
    features: ['1ms 단위 반응속도 측정', 'N-Key Rollover 테스트', '키감 분석', '소음 레벨 측정'],
    href: '/tools/keyboard-performance-test',
    icon: '⚡',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-900/20 to-cyan-900/20',
    borderColor: 'border-blue-500/30'
  },
  {
    category: '실력 향상',
    title: '타이핑 테스트 & 트레이닝',
    description: '정확도와 속도를 동시에 향상시킬 수 있는 체계적인 타이핑 훈련 프로그램입니다.',
    features: ['WPM & 정확도 측정', '실시간 피드백', '개인 기록 추적', '다양한 텍스트 유형'],
    href: '/tools/english-typing-test',
    icon: '⌨️',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-900/20 to-pink-900/20',
    borderColor: 'border-purple-500/30'
  },
  {
    category: '반응 테스트',
    title: '키보드 반응속도 측정',
    description: '게이밍에 최적화된 키보드인지 실제 반응속도를 통해 정확하게 판단합니다.',
    features: ['밀리초 단위 측정', '평균 반응시간 분석', '일관성 체크', '게이밍 성능 평가'],
    href: '/tools/2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
    icon: '⚡',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-900/20 to-red-900/20',
    borderColor: 'border-orange-500/30'
  },
  {
    category: '맞춤 추천',
    title: '개인화된 키보드 추천',
    description: '용도, 예산, 선호도를 종합하여 가장 적합한 키보드를 추천해드립니다.',
    features: ['용도별 맞춤 추천', '가격대별 분류', '실제 사용자 리뷰', '상세 스펙 비교'],
    href: '/recommendations',
    icon: '🎯',
    gradient: 'from-green-500 to-teal-500',
    bgGradient: 'from-green-900/20 to-teal-900/20',
    borderColor: 'border-green-500/30'
  },
  {
    category: '소리 테스트',
    title: '키보드 사운드 테스트',
    description: '다양한 스위치의 실제 타건음을 체험하고 비교해보세요.',
    features: ['실제 타건음 재생', '스위치별 음향 비교', '볼륨 조절', '환경별 소음 테스트'],
    href: '/tools/keyboard-sound-test',
    icon: '🔊',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-900/20 to-blue-900/20',
    borderColor: 'border-indigo-500/30'
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              완벽한 키보드를 찾는 여정
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            과학적 분석부터 실제 체험까지, 
            <span className="text-blue-400 font-medium"> 모든 과정을 한 곳에서</span>
            <br />
            <span className="text-purple-400">당신의 키보드 여정을 완벽하게 지원합니다</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <Link href={feature.href} className="block h-full">
                <div className={`
                  bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 
                  border ${feature.borderColor} hover:border-opacity-70
                  transition-all duration-300 h-full
                  hover:transform hover:scale-105 hover:shadow-2xl
                  bg-gradient-to-br ${feature.bgGradient}
                  group-hover:shadow-2xl
                `}>
                  {/* 호버 시 그라디언트 오버레이 */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${feature.gradient} 
                    opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300
                  `}></div>
                  
                  <div className="relative z-10">
                    {/* 카테고리 태그 */}
                    <div className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4
                      bg-gradient-to-r ${feature.gradient} bg-opacity-20 
                      text-white border border-white/20
                    `}>
                      {feature.category}
                    </div>
                    
                    {/* 아이콘 */}
                    <div className="text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    
                    {/* 제목 */}
                    <h3 className={`
                      text-xl sm:text-2xl font-bold mb-3 
                      bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent
                    `}>
                      {feature.title}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                      {feature.description}
                    </p>
                    
                    {/* 주요 기능 목록 */}
                    <ul className="space-y-2 mb-6">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-400">
                          <div className={`
                            w-1.5 h-1.5 rounded-full mr-3 
                            bg-gradient-to-r ${feature.gradient}
                          `}></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <div className={`
                      inline-flex items-center text-sm font-medium
                      bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent
                      group-hover:translate-x-1 transition-transform duration-200
                    `}>
                      시작하기 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* 하단 CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-600/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              아직 어떤 기능부터 시작해야 할지 모르겠다면?
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              가장 인기있는 키보드 성능 테스트부터 시작해보세요
            </p>
            <Link href="/tools/keyboard-performance-test">
              <button className="
                px-6 sm:px-8 py-3 sm:py-4 
                bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-500 hover:to-purple-500 
                text-white font-semibold rounded-xl 
                transition-all duration-300 transform hover:scale-105 
                hover:shadow-xl hover:shadow-blue-500/25
              ">
                🚀 지금 바로 테스트하기
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}