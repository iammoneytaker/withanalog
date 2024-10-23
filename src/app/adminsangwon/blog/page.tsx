'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('블로그 글 로딩 중 오류 발생:', error);
    } else {
      setPosts(data);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) {
        console.error('블로그 글 삭제 중 오류 발생:', error);
        alert('블로그 글 삭제에 실패했습니다.');
      } else {
        fetchPosts(); // 글 목록 새로고침
      }
    }
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">블로그 관리</h1>
        <Link
          href="/adminsangwon/blog/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
        >
          새 블로그 글 작성
        </Link>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 p-4 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-400">{post.excerpt}</p>
              <div className="mt-2">
                <Link
                  href={`/adminsangwon/blog/edit/${post.id}`}
                  className="text-blue-400 hover:text-blue-300 mr-4"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
