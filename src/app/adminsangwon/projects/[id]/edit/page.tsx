'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import AdminHeader from '@/components/admin/AdminHeader';

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    status: '',
    category: '',
    icon_url: '',
    app_store_url: '',
    play_store_url: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('프로젝트 로딩 중 오류 발생:', error);
      return;
    }

    setForm(data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('projects')
        .update(form)
        .eq('id', params.id);

      if (error) throw error;

      router.push('/adminsangwon/projects');
      router.refresh();
    } catch (error: any) {
      alert('프로젝트 수정 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-6">프로젝트 수정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              설명
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300"
            >
              설명
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300"
            >
              상태
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">선택하세요</option>
              <option value="launched">출시됨</option>
              <option value="development">개발중</option>
              <option value="planned">계획됨</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              카테고리
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="icon_url"
              className="block text-sm font-medium text-gray-300"
            >
              아이콘 URL
            </label>
            <input
              type="url"
              id="icon_url"
              name="icon_url"
              value={form.icon_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="app_store_url"
              className="block text-sm font-medium text-gray-300"
            >
              App Store URL
            </label>
            <input
              type="url"
              id="app_store_url"
              name="app_store_url"
              value={form.app_store_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="play_store_url"
              className="block text-sm font-medium text-gray-300"
            >
              Play Store URL
            </label>
            <input
              type="url"
              id="play_store_url"
              name="play_store_url"
              value={form.play_store_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? '처리 중...' : '수정 완료'}
          </button>
        </form>
      </div>
    </div>
  );
}
