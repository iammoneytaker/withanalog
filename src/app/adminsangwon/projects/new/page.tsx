'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import Image from 'next/image';
import {
  ProjectCategory,
  ProjectStatus,
  ProjectFormData,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from '@/types/project';

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [previewIcon, setPreviewIcon] = useState<string>('');
  const [previewScreenshots, setPreviewScreenshots] = useState<string[]>([]);

  const [form, setForm] = useState<ProjectFormData>({
    title: '',
    description: '',
    icon_url: '',
    status: 'launched',
    category: '키보드 도구',
    features: [],
    content: '',
    app_store_url: '',
    play_store_url: '',
  });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIconFile(file);
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setScreenshotFiles((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        setPreviewScreenshots((prev) => [...prev, url]);
      });
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('projects').getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 아이콘 업로드
      if (!iconFile) throw new Error('아이콘 이미지를 선택해주세요.');
      const iconUrl = await uploadImage(iconFile, 'icons');

      // 프로젝트 데이터 저장
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([{ ...form, icon_url: iconUrl }])
        .select()
        .single();

      if (projectError) throw projectError;

      // 스크린샷 업로드 및 연결
      if (screenshotFiles.length > 0) {
        const screenshotPromises = screenshotFiles.map(async (file, index) => {
          const imageUrl = await uploadImage(file, 'screenshots');
          return {
            project_id: project.id,
            image_url: imageUrl,
            order_index: index,
          };
        });

        const screenshotData = await Promise.all(screenshotPromises);
        const { error: screenshotError } = await supabase
          .from('screenshots')
          .insert(screenshotData);

        if (screenshotError) throw screenshotError;
      }

      router.push('/adminsangwon/projects');
      router.refresh();
    } catch (error: any) {
      alert('프로젝트 생성 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="p-8 mt-16">
        <h1 className="text-2xl font-bold text-white mb-6">새 프로젝트 생성</h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              프로젝트 제목
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              간단한 설명
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={3}
              required
            />
          </div>

          {/* 아이콘 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              앱 아이콘
            </label>
            <div className="flex items-center space-x-4">
              {previewIcon && (
                <div className="relative w-20 h-20">
                  <Image
                    src={previewIcon}
                    alt="아이콘 미리보기"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>
          </div>

          {/* 스크린샷 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              스크린샷
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotsChange}
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewScreenshots.map((url, index) => (
                <div key={index} className="relative">
                  <div className="relative w-full pt-[177.77%]">
                    <Image
                      src={url}
                      alt={`스크린샷 ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 상태 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              상태
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ProjectStatus })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'planned'
                    ? '계획됨'
                    : status === 'development'
                    ? '개발중'
                    : '출시됨'}
                </option>
              ))}
            </select>
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              카테고리
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as ProjectCategory,
                })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            >
              {PROJECT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 주요 기능 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              주요 기능
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="새로운 기능 추가"
              />
              <button
                type="button"
                onClick={() => {
                  if (newFeature.trim()) {
                    setForm({
                      ...form,
                      features: [...form.features, newFeature.trim()],
                    });
                    setNewFeature('');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                추가
              </button>
            </div>
            <ul className="space-y-2">
              {form.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-md"
                >
                  <span className="text-white">{feature}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        features: form.features.filter((_, i) => i !== index),
                      })
                    }
                    className="text-red-400 hover:text-red-300"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 상세 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              상세 설명 (HTML 지원)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={10}
              required
            />
          </div>

          {/* 앱스토어 URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              App Store URL (선택사항)
            </label>
            <input
              type="url"
              value={form.app_store_url}
              onChange={(e) =>
                setForm({ ...form, app_store_url: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          {/* 플레이스토어 URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Play Store URL (선택사항)
            </label>
            <input
              type="url"
              value={form.play_store_url}
              onChange={(e) =>
                setForm({ ...form, play_store_url: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? '생성 중...' : '프로젝트 생성'}
          </button>
        </form>
      </div>
    </div>
  );
}
