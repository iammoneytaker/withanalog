'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import BlogPostEditor from '@/components/BlogPostEditor';
import AdminHeader from '@/components/admin/AdminHeader';

export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .replace(/\s+/g, '-') // 공백을 하이픈으로 변경
    .replace(/[^\w\-가-힣]/g, '') // 알파벳, 숫자, 한글, 하이픈을 제외한 문자 제거
    .replace(/\-\-+/g, '-') // 연속된 하이픈을 하나로 변경
    .replace(/^-+/, '') // 시작 부분의 하이픈 제거
    .replace(/-+$/, '') // 끝 부분의 하이픈 제거
    .toLowerCase(); // 소문자로 변경 (선택적)
}

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSave = async (content: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const slug = slugify(title);

    const { error } = await supabase.from('blog_posts').insert({
      title,
      content,
      excerpt,
      slug,
      author_id: user.id,
    });

    if (error) {
      console.error('블로그 글 저장 중 오류 발생:', error);
      alert('블로그 글 저장에 실패했습니다.');
    } else {
      router.push('/adminsangwon/blog');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">새 블로그 글 작성</h1>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          />
          <textarea
            placeholder="요약"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            rows={3}
          />
          <BlogPostEditor onSave={handleSave} />
        </div>
      </main>
    </div>
  );
}
