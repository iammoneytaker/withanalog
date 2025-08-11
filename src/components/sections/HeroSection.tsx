'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
            키보드 전문 플랫폼
          </span>
        </h1>
        
        <motion.p 
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          기계식부터 무접점까지, 황축부터 적축까지
          <br />
          <span className="text-blue-400 font-medium">당신의 완벽한 키보드를 찾아보세요</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full border border-gray-700">🔍 키보드 리뷰</span>
          <span className="bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full border border-gray-700">⚙️ 스위치 가이드</span>
          <span className="bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full border border-gray-700">🎯 성능 테스트</span>
          <span className="bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full border border-gray-700">🎨 커스텀 빌드</span>
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
