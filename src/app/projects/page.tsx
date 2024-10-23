import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ProjectGrid from '../../components/ProjectGrid';

export default async function ProjectsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('프로젝트 로딩 중 오류 발생:', error);
    // 에러 처리 로직 추가 (예: 에러 페이지로 리다이렉트)
  }

  const categories = [
    '전체',
    ...Array.from(new Set(projects?.map((p) => p.category) || [])),
  ];

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            모든 프로젝트
          </h1>
          <p className="text-xl text-gray-400">
            광고 없는 앱 100개 만들기 프로젝트의 모든 앱을 소개합니다
          </p>
        </div>
        <ProjectGrid projects={projects || []} categories={categories} />
      </div>
    </main>
  );
}
