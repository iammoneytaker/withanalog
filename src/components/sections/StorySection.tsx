'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function StorySection() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/story');
  };

  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            이 프로젝트의 진짜 이유
          </h2>
          <p className="text-xl text-gray-400">
            클릭하여 이야기를 확인하세요...
          </p>
        </motion.div>
        <div className="text-center">
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            이야기 보러가기
          </button>
        </div>
      </div>
    </section>
  );
}
