import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import { categories } from '../../data/blog';

export default function Blog() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">블로그</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/${category.id}`}
              className="block"
            >
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-400">이 카테고리의 글 보기</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-6">최근 게시물</h2>
        <div className="space-y-8">
          {allPosts.slice(0, 5).map((post) => (
            <div key={post.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <Link
                  href={`/blog/${post.category}/${post.id}`}
                  className="text-blue-400 hover:underline"
                >
                  더 읽기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
