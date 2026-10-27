import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Pic from '@/components/Pic';
import { fmtDate, getPost, getPosts, type Post } from '@/lib/posts';
import { CATEGORIES, SITE, categoryName } from '@/lib/site';

const PATHS: { id: string; q: string; title: string; desc: string; slugs: string[] }[] = [
  {
    id: 'start',
    q: '처음 시작해요',
    title: '처음 파크골프채를 사는 분',
    desc: '규칙과 준비물부터, 내 키에 맞는 길이와 무게까지 순서대로 보세요.',
    slugs: ['park-golf-club-buying-guide', 'park-golf-club-length-guide', 'park-golf-club-weight-guide', 'park-golf-starter-checklist', 'how-to-play-park-golf', 'park-golf-rules-basics', 'park-golf-vs-ground-golf', 'winter-park-golf-checklist', 'park-golf-club-head-material'],
  },
  {
    id: 'gift',
    q: '부모님 선물이에요',
    title: '부모님·어르신 선물로 고르는 분',
    desc: '환갑·칠순 선물로 많이 찾는 채와 풀세트를 예산별로 정리했어요.',
    slugs: ['park-golf-gift-for-parents', 'dad-60th-birthday-park-golf-gift', 'mom-70th-birthday-park-golf-gift', 'hitomi-honma-fullset-compare', 'park-golf-fullset-checklist'],
  },
  {
    id: 'budget',
    q: '예산부터 정할래요',
    title: '예산 안에서 고르는 분',
    desc: '20만 원대 입문 세트부터 100만 원대 고급 채까지, 가격대별로 무엇이 달라지는지 보세요.',
    slugs: ['park-golf-club-price-range', 'cheap-park-golf-fullset-under-300k', 'park-golf-club-500k-range', 'park-golf-club-300k-range', 'budget-park-golf-club-brands', 'premium-park-golf-club-1m', 'rookie-rookie-park-golf-set', 'park-golf-club-certification'],
  },
  {
    id: 'special',
    q: '여성·왼손이에요',
    title: '여성용·왼손(좌타)용을 찾는 분',
    desc: '가벼운 무게와 짧은 길이, 좌타 옵션이 있는 모델만 따로 모았어요.',
    slugs: ['womens-park-golf-club', 'left-handed-park-golf-club', 'womens-park-golf-fullset', 'park-golf-club-length-guide'],
  },
];

const VERSUS = ['honma-vs-hitomi-vs-bukuro', 'hitomi-honma-4star-vs-5star', 'phoenix-vs-hitomi-honma', 'david-vs-prime-park-golf-club', 'prime-park-golf-3star-vs-4star', 'park-golf-half-bag-vs-single-bag'];

function pick(slugs: string[]): Post[] {
  return slugs.map((s) => getPost(s)).filter(Boolean) as Post[];
}

export default function Home() {
  const posts = getPosts();
  const lead = posts[0];
  const side = posts.slice(1, 4);
  const versus = pick(VERSUS);
  return (
    <>
      <section className="m-hero">
        <p className="m-kicker">파크골프 용품 고르기 가이드</p>
        <h1>어떤 파크골프채가 나에게 맞을까요?</h1>
        <p className="m-lead">상황을 고르면 먼저 읽을 글과 비교할 모델을 바로 알려 드려요.</p>
        <div className="m-choices">
          {PATHS.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="m-choice">{p.q}</a>
          ))}
          <Link href="/tools/club-fit/" className="m-choice ghost">내 키에 맞는 길이 찾기</Link>
        </div>
      </section>

      {lead ? (
        <section className="m-feature" aria-label="최신 글">
          <Link href={`/posts/${lead.slug}/`} className="m-feature-main">
            {lead.hero ? <Pic src={lead.hero} alt={lead.heroAlt || lead.title} width={1200} height={675} sizes="(max-width: 720px) 100vw, 620px" priority /> : null}
            <span className="m-cat">{categoryName(lead.category)} · {fmtDate(lead.publishAt)}</span>
            <h2>{lead.title}</h2>
            <p>{lead.description}</p>
          </Link>
          <div className="m-feature-side">
            {side.map((p) => (
              <Link key={p.slug} href={`/posts/${p.slug}/`} className="m-side-item">
                {p.hero ? <Pic src={p.hero} alt={p.heroAlt || p.title} width={160} height={90} sizes="160px" max={480} /> : null}
                <span>
                  <span className="m-cat">{categoryName(p.category)}</span>
                  <strong>{p.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {PATHS.map((path) => {
        const list = pick(path.slugs);
        if (!list.length) return null;
        return (
          <section key={path.id} id={path.id} className="m-path">
            <div className="m-path-head">
              <p className="m-kicker">{path.q}</p>
              <h2>{path.title}</h2>
              <p className="m-path-desc">{path.desc}</p>
            </div>
            <ol className="m-steps">
              {list.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}/`}>
                    <span className="m-step-no">{i + 1}</span>
                    {p.hero ? <Pic src={p.hero} alt={p.heroAlt || p.title} width={120} height={68} sizes="120px" max={480} /> : null}
                    <span className="m-step-text">
                      <strong>{p.title}</strong>
                      <span>{p.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      {versus.length ? (
        <section className="m-section">
          <h2 className="m-h2">둘 중에 고민된다면, 1:1 비교</h2>
          <div className="post-list grid2">
            {versus.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="m-cta">
        <div>
          <h2>모델을 직접 걸러 보고 싶다면</h2>
          <p>상품 210개를 무게, 길이, 헤드 소재, 협회 공인, 좌타 여부로 걸러 보고 최대 3개를 나란히 비교할 수 있어요.</p>
        </div>
        <Link href="/compare/" className="btn btn-green">비교표 열기</Link>
      </section>

      {CATEGORIES.map((c) => {
        const list = posts.filter((p) => p.category === c.slug).slice(0, 3);
        if (!list.length) return null;
        return (
          <section key={c.slug} className="m-section">
            <div className="m-row-head">
              <h2 className="m-h2">{c.name}</h2>
              <Link href={`/category/${c.slug}/`}>전체 보기 →</Link>
            </div>
            <div className="post-list grid3">
              {list.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="note small" style={{ marginTop: 32 }}>{SITE.disclosure}</p>
    </>
  );
}
