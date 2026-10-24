import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getPostsByCategory } from '@/lib/posts';
import { CATEGORIES } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const c = CATEGORIES.find((x) => x.slug === cat);
  if (!c) return {};
  return { title: `${c.name} 비교·고르는 법`, description: c.desc, alternates: { canonical: `/category/${c.slug}/` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const c = CATEGORIES.find((x) => x.slug === cat);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);
  return (
    <>
      <h1 className="section-title" style={{ marginTop: 10 }}>{c.name}</h1>
      <p className="note">{c.desc}</p>
      {posts.length ? (
        <div className="post-list grid2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="note">이 분류의 글을 준비하고 있습니다.</p>
      )}
    </>
  );
}
