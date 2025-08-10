'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
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

  // 로컬 도구 데이터 정의
  const localTools = [
    {
      id: 'keyboard-performance-test',
      title: '키보드 성능 테스트',
      description: '텐키리스/풀사이즈 레이아웃으로 APM/CPS 정확 측정, 게이머 필수 도구',
      icon_url: '/images/tools/keyboard-test/icon.png',
    },
    {
      id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
      title: '한글 타자 연습',
      description: '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요',
      icon_url: '/images/tools/korean-typing/icon.png',
    },
    {
      id: 'english-typing-test',
      title: '영문 타자 연습',
      description: '영문 타이핑 속도와 정확도를 향상시키는 체계적인 학습 도구',
      icon_url: '/images/tools/english-typing/icon.png',
    },
  ];

  const displayedProjects = localTools;

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
            키보드 도구들
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            현재 {localTools.length}개의 키보드 도구를 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <Link href={`/tools/${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={project.icon_url}
                  alt={project.title}
                  width={64}
                  height={64}
                  className="mb-4 rounded-xl"
                />
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-left">{project.description}</p>
              </motion.div>
            </Link>
          ))}
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
            모든 도구 보기 ({localTools.length})
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
