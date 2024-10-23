'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import BlogPostEditor from '@/components/BlogPostEditor';
import AdminHeader from '@/components/admin/AdminHeader';

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('블로그 포스트 로딩 중 오류 발생:', error);
        return;
      }

      setPost(data);
    }

    fetchPost();
  }, [params.id, supabase]);

  const handleSave = async (content: string) => {
    if (!post) return;

    const { error } = await supabase
      .from('blog_posts')
      .update({
        title: post.title,
        content,
        excerpt: post.excerpt,
      })
      .eq('id', post.id);

    if (error) {
      console.error('블로그 포스트 수정 중 오류 발생:', error);
      alert('블로그 포스트 수정에 실패했습니다.');
    } else {
      router.push('/adminsangwon/blog');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">블로그 글 수정</h1>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          />
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            rows={3}
          />
          <BlogPostEditor initialContent={post.content} onSave={handleSave} />
        </div>
      </main>
    </div>
  );
}
