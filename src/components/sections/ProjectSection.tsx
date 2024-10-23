'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '../../lib/projects';

export function ProjectSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true, // 이 부분 추가
  });

  // 처음에는 3개만 보여주기
  const displayedProjects = projects.slice(0, 3);

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
            진행중인 프로젝트
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            현재 {projects.length}개의 앱이 개발되었습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={project.iconPath}
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
            href="/projects"
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            모든 프로젝트 보기 ({projects.length})
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
