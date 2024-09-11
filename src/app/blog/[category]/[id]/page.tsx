import { getPostData, getSortedPostsData } from '../../../../lib/posts';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    category: post.category,
    id: post.id,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const postData = await getPostData(params.category, params.id);
  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      publishedTime: postData.date,
      authors: ['Your Name'],
    },
  };
}

export default async function Post({
  params,
}: {
  params: { category: string; id: string };
}) {
  const postData = await getPostData(params.category, params.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <article className="post-content">
          <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
          <div className="text-gray-400 mb-6">
            {new Date(postData.date).toLocaleDateString()}
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </div>
  );
}
