import Link from 'next/link';
import PostCard from '@/components/PostCard';
import ProductGrid from '@/components/ProductGrid';
import { PRODUCTS } from '@/lib/products';
import { getPosts } from '@/lib/posts';
import { CATEGORIES, SITE } from '@/lib/site';

export default function Home() {
  const posts = getPosts();
  const topClubs = PRODUCTS.filter((p) => p.type === 'club').sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const topSets = PRODUCTS.filter((p) => p.type === 'fullset').sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  return (
    <>
      <section className="hero">
        <h1>파크골프채, 사기 전에 한 번만 비교해 보세요</h1>
        <p>브랜드·무게·길이·가격대를 쉬운 말로 정리했습니다. 처음 시작하는 분도, 부모님 선물을 고르는 분도 바로 쓸 수 있게 만들었어요.</p>
        <div className="hero-actions">
          <Link className="btn btn-white" href="/compare/">가격 비교표 보기</Link>
          <Link className="btn btn-line" href="/tools/club-fit/">내 키에 맞는 채 길이</Link>
        </div>
      </section>

      <h2 className="section-title">무엇을 찾으세요?</h2>
      <div className="cat-grid">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} className="cat-tile" href={`/category/${c.slug}/`}>
            <strong>{c.name}</strong>
            <span>{c.desc}</span>
          </Link>
        ))}
        <Link className="cat-tile" href="/compare/">
          <strong>가격 비교표</strong>
          <span>모델별 할인가·리뷰 수를 한눈에</span>
        </Link>
      </div>

      <h2 className="section-title">리뷰 많은 파크골프채</h2>
      <ProductGrid items={topClubs} />
      <p><Link href="/compare/">전체 비교표에서 무게·소재로 걸러보기 →</Link></p>

      <h2 className="section-title">많이 찾는 풀세트</h2>
      <ProductGrid items={topSets} />

      <h2 className="section-title">새로 올라온 글</h2>
      {posts.length ? (
        <div className="post-list grid2">
          {posts.slice(0, 12).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="note">첫 글을 준비하고 있습니다.</p>
      )}
      <p className="note" style={{ marginTop: 28 }}>{SITE.disclosure}</p>
    </>
  );
}
