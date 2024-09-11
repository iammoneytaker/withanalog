import Link from 'next/link';
import { getSortedPostsData } from '../../../lib/posts';
import { categories } from '../../../data/blog';

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const allPosts = getSortedPostsData();
  const categoryPosts = allPosts.filter(
    (post) => post.category === params.category
  );
  const category = categories.find((c) => c.id === params.category);

  if (!category) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{category.name}</h1>

        <div className="space-y-8">
          {categoryPosts.map((post) => (
            <div key={post.id} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
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
