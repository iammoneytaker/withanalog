'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScreenshotGallery from './ScreenshotGallery';
import { Project } from '@/types/project';

export function ProjectDetail({ project }: { project: Project | null }) {
  if (!project) {
    return <div>프로젝트 정보를 불러오는 데 실패했습니다.</div>;
  }

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
              src={project.icon_url}
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
                  {project.status === 'launched'
                    ? '출시됨'
                    : project.status === 'development'
                    ? '개발중'
                    : '계획됨'}
                </span>
              </div>
            </div>
          </div>
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">스크린샷</h2>
              <ScreenshotGallery
                screenshots={project.screenshots}
                projectTitle={project.title}
              />
            </div>
          )}

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
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {project.app_store_url && (
              <Link
                href={project.app_store_url}
                className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
                target="_blank"
              >
                <i className="fab fa-apple text-2xl mr-2"></i>
                <div className="flex flex-col items-start">
                  <span className="text-xs">다운로드하기</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </Link>
            )}
            {project.play_store_url && (
              <Link
                href={project.play_store_url}
                className="flex items-center justify-center bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
                target="_blank"
              >
                <i className="fab fa-google-play text-2xl mr-2"></i>
                <div className="flex flex-col items-start">
                  <span className="text-xs">다운로드하기</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
