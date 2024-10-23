'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  status: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

      // 프로젝트 목록 새로고침
      await fetchProjects();
    } catch (error: any) {
      alert('프로젝트 삭제 중 오류가 발생했습니다: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader />
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminHeader />
        <div className="p-8">
          <div className="bg-red-500 text-white p-4 rounded-md">
            에러: {error}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AdminHeader />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">프로젝트 관리</h1>
          <Link
            href="/adminsangwon/projects/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            새 프로젝트
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  앱
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  생성일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={project.icon_url}
                          alt={project.title}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'launched'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'development'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status === 'launched'
                        ? '출시됨'
                        : project.status === 'development'
                        ? '개발중'
                        : '계획됨'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/adminsangwon/projects/${project.id}/edit`}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
