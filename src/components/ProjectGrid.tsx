'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: string;
  category: string;
}

interface ProjectGridProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectGrid({
  projects,
  categories,
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProjects =
    selectedCategory === '전체'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      {/* 카테고리 필터 - 모바일 스크롤 지원 */}
      <div className="flex justify-start sm:justify-center mb-6 sm:mb-8 overflow-x-auto pb-2 px-1">
        <div className="flex gap-2 sm:gap-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <Link href={`/tools/${project.id}`} key={project.id}>
            <div className="bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg h-full">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl">
                {project.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-xs sm:text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full w-fit">
                  {project.category}
                </span>
                <span className={`text-xs sm:text-sm px-2 py-1 rounded-full w-fit ${
                  project.status === 'launched'
                    ? 'text-green-400 bg-green-500/10'
                    : project.status === 'development'
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-gray-400 bg-gray-500/10'
                }`}>
                  {project.status === 'launched'
                    ? '출시됨'
                    : project.status === 'development'
                    ? '개발중'
                    : '계획됨'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
