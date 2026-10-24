import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import PostCard from '@/components/PostCard';
import { fmtDate, getPost, getPosts, relatedPosts } from '@/lib/posts';
import { SITE, categoryName } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: '_placeholder' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: '글을 찾을 수 없습니다', robots: { index: false } };
  const url = `/posts/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, ...post.tags].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishAt,
      modifiedTime: post.updatedAt,
      images: post.hero ? [{ url: post.hero, alt: post.heroAlt }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE.url}/posts/${post.slug}/`;
  const related = relatedPosts(post);
  const ld: unknown[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      image: post.hero ? [`${SITE.url}${post.hero}`] : undefined,
      datePublished: post.publishAt,
      dateModified: post.updatedAt,
      author: { '@type': 'Organization', name: SITE.author, url: `${SITE.url}/about/` },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      mainEntityOfPage: url,
      inLanguage: 'ko-KR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: categoryName(post.category), item: `${SITE.url}/category/${post.category}/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return (
    <article className="article">
      <JsonLd data={ld} />
      <p className="crumbs">
        <Link href="/">홈</Link> › <Link href={`/category/${post.category}/`}>{categoryName(post.category)}</Link>
      </p>
      <h1>{post.title}</h1>
      <p className="article-meta">
        {SITE.author} · {fmtDate(post.publishAt)} 작성{post.updatedAt !== post.publishAt ? ` · ${fmtDate(post.updatedAt)} 수정` : ''} · 약 {post.readMin}분
      </p>
      <p className="disclosure">{SITE.disclosure}</p>
      {post.hero ? (
        <figure className="hero-img">
          <img src={post.hero} alt={post.heroAlt || post.title} width={1200} height={675} />
          {post.heroAi ? <figcaption>AI 생성 이미지 (실제 상품과 다를 수 있음)</figcaption> : null}
        </figure>
      ) : null}
      {post.toc.length > 2 ? (
        <nav className="toc" aria-label="목차">
          <strong>목차</strong>
          <ol>
            {post.toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>{t.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.faq.length ? (
        <section className="faq">
          <h2 className="section-title">자주 묻는 질문</h2>
          {post.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      ) : null}
      {related.length ? (
        <section>
          <h2 className="section-title">함께 보면 좋은 글</h2>
          <div className="post-list grid2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
