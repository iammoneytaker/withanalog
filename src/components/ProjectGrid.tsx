'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  icon_url: string;
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
      <div className="flex justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`mx-2 px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
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
              <p className="text-gray-400">{project.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {project.category}
                </span>
                <span className="text-sm text-gray-500">
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
