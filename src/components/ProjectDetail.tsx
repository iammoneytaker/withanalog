'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types/project';
import ScreenshotGallery from './ScreenshotGallery';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8"
        >
          {/* 앱 기본 정보 */}
          <div className="flex items-center gap-6 mb-8">
            <Image
              src={project.iconPath}
              alt={`${project.title} 아이콘`}
              width={80}
              height={80}
              className="rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400">{project.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>{project.category}</span>
                <span>
                  {project.status === 'launched' ? '출시됨' : '개발중'}
                </span>
              </div>
            </div>
          </div>

          {/* 스크린샷 갤러리 */}
          <div className="mb-8">
            <ScreenshotGallery
              screenshots={project.screenshots}
              projectTitle={project.title}
            />
          </div>

          {/* 주요 기능 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">주요 기능</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="text-blue-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 상세 설명 */}
          <div className="prose prose-invert max-w-none mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">앱 소개</h2>
            <div
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          {/* 다운로드 링크 */}
          <div className="flex gap-4">
            {project.appStoreUrl && (
              <Link
                href={project.appStoreUrl}
                className="flex-1 bg-black text-white text-center py-3 rounded-lg hover:bg-gray-900 transition-colors"
                target="_blank"
              >
                App Store에서 다운로드
              </Link>
            )}
            {project.playStoreUrl && (
              <Link
                href={project.playStoreUrl}
                className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
                target="_blank"
              >
                Play Store에서 다운로드
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
