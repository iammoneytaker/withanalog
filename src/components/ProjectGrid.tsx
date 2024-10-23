'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../lib/projects';
import Image from 'next/image';
import type { ProjectCategory } from '../types/project';

const categories: ('전체' | ProjectCategory)[] = [
  '전체',
  '건강',
  '생산성',
  '라이프스타일',
  '유틸리티',
  '교육',
  '엔터테인먼트',
];

export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProjects =
    selectedCategory === '전체'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div>
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all"
          >
            <Link href={`/projects/${project.id}`}>
              <Image
                src={project.iconPath}
                alt={project.title}
                width={64}
                height={64}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-left mb-4">
                {project.description}
              </p>
              <span className="text-sm text-gray-500">{project.category}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
