'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center px-4 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center relative"
      >
        {/* 키보드 배경 애니메이션 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 text-9xl select-none pointer-events-none">
          ⌨️
        </div>
        
        <motion.div 
          className="text-6xl mb-8"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        >
          ⌨️
        </motion.div>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            WithAnalog
          </span>
          <br />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-300 font-light">
            현실과 디지털을 연결하는 도구
          </span>
        </h1>
        
        <motion.p 
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          키보드는 단순한 입력 도구가 아닙니다. 당신의 생각과 아이디어가 디지털 세상으로 전달되는 
          <span className="text-blue-400 font-semibold">가장 중요한 매개체</span>입니다.
          <br />
          <span className="text-purple-400 font-medium">정확한 분석과 체험으로 당신만의 완벽한 키보드를 찾아보세요.</span>
        </motion.p>

        {/* 주요 기능 소개 카드들 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/tools/keyboard-performance-test" className="group block">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 rounded-2xl p-4 sm:p-6 hover:from-blue-800/60 hover:to-blue-700/40 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-center">⚡</div>
              <h3 className="text-lg font-bold text-blue-300 text-center mb-2">성능 테스트</h3>
              <p className="text-xs text-gray-400 text-center leading-relaxed">반응속도, 키감, 내구성까지 실제 데이터로 확인하세요</p>
            </div>
          </Link>
          
          <Link href="/tools/english-typing-test" className="group block">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-2xl p-4 sm:p-6 hover:from-purple-800/60 hover:to-purple-700/40 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-center">⌨️</div>
              <h3 className="text-lg font-bold text-purple-300 text-center mb-2">타이핑 테스트</h3>
              <p className="text-xs text-gray-400 text-center leading-relaxed">정확도와 속도를 측정하여 타이핑 실력을 향상시키세요</p>
            </div>
          </Link>
          
          <Link href="/recommendations" className="group block">
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-2xl p-4 sm:p-6 hover:from-green-800/60 hover:to-green-700/40 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-center">🎯</div>
              <h3 className="text-lg font-bold text-green-300 text-center mb-2">맞춤 추천</h3>
              <p className="text-xs text-gray-400 text-center leading-relaxed">용도별, 예산별로 엄선된 키보드 추천을 받아보세요</p>
            </div>
          </Link>
          
          <Link href="/community" className="group block">
            <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border border-orange-500/30 rounded-2xl p-4 sm:p-6 hover:from-orange-800/60 hover:to-orange-700/40 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-center">💬</div>
              <h3 className="text-lg font-bold text-orange-300 text-center mb-2">커뮤니티</h3>
              <p className="text-xs text-gray-400 text-center leading-relaxed">키보드 애호가들과 경험을 공유하고 소통하세요</p>
            </div>
          </Link>
        </motion.div>
        
        {/* CTA 버튼 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link href="/tools/keyboard-performance-test" className="group">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
              <span className="flex items-center justify-center gap-2">
                <span>⚡</span>
                <span>지금 바로 테스트하기</span>
              </span>
            </button>
          </Link>
          
          <Link href="/recommendations" className="group">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800/80 hover:bg-gray-700/80 text-white font-semibold rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                <span>🎯</span>
                <span>키보드 추천받기</span>
              </span>
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 스크롤 유도 애니메이션 */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 flex flex-col items-center"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <p className="text-gray-400 mb-2 text-xs sm:text-sm">스크롤해서 더 알아보기</p>
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
