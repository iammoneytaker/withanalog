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
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          키보드와 타이핑의
          <br className="sm:hidden" />
          <span className="text-blue-400">새로운 경험</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
          디지털과 현실을 잇는 키보드 전문 플랫폼
        </p>
      </motion.div>

      {/* 스크롤 유도 애니메이션 */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <p className="text-gray-400 mb-2">스크롤해서 더 알아보기</p>
        <svg
          className="w-6 h-6 text-gray-400"
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
