import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/lib/posts';
import { SITE } from '@/lib/site';
import terms from '../../../../data/terms.json';

type Term = { term: string; alias?: string; group: string; definition: string; source: string | null; links: string[] };
const TERMS = (terms as Term[]).slice().sort((a, b) => a.term.localeCompare(b.term, 'ko'));
const GROUPS = Array.from(new Set(TERMS.map((t) => t.group))).sort((a, b) => (a === 'A-Z' ? 1 : b === 'A-Z' ? -1 : a.localeCompare(b, 'ko')));
const anchor = (t: string) => 't-' + encodeURIComponent(t).replace(/%/g, '');

export const metadata: Metadata = {
  title: `파크골프 용어 사전 ${TERMS.length}개｜경기·장비 용어 뜻과 협회 규정 근거`,
  description: `OB, 벌타, 공인구, 티잉 그라운드, 피스, 헤드 소재까지 파크골프 용어 ${TERMS.length}개를 쉬운 말로 풀고 대한파크골프협회 규정 조항을 함께 적었습니다.`,
  alternates: { canonical: '/guide/terms/' },
};

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: '파크골프 용어 사전',
    url: `${SITE.url}/guide/terms/`,
    hasDefinedTerm: TERMS.map((t) => ({ '@type': 'DefinedTerm', name: t.term, alternateName: t.alias || undefined, description: t.definition, url: `${SITE.url}/guide/terms/#${anchor(t.term)}` })),
  };
  return (
    <article className="article">
      <JsonLd data={ld} />
      <nav className="crumbs" aria-label="경로"><Link href="/">홈</Link> › <Link href="/guide/rules/">규칙·용어</Link> › 용어 사전</nav>
      <p className="m-kicker">규칙·용어</p>
      <h1>파크골프 용어 사전 {TERMS.length}개</h1>
      <p className="m-lead">경기장에서 듣는 말과 장비를 고를 때 보이는 말을 쉬운 말로 풀었어요. 규정에 근거가 있는 용어는 대한파크골프협회 규정 조항을 함께 적었습니다. 규칙을 상황별로 보고 싶다면 <Link href="/guide/rules/">파크골프 규칙 한눈에</Link>를 보세요.</p>
      <div className="hub-jump">
        {GROUPS.map((g) => (
          <a key={g} href={`#g-${encodeURIComponent(g).replace(/%/g, '')}`}>{g}</a>
        ))}
      </div>
      {GROUPS.map((g) => (
        <section key={g} className="term-group" id={`g-${encodeURIComponent(g).replace(/%/g, '')}`}>
          <h2>{g}</h2>
          <dl>
            {TERMS.filter((t) => t.group === g).map((t) => (
              <div key={t.term} className="term-item" id={anchor(t.term)}>
                <dt>{t.term}{t.alias ? <small>{t.alias}</small> : null}</dt>
                <dd>
                  {t.definition}
                  {t.source ? <span className="term-src">근거: 대한파크골프협회 {t.source}</span> : null}
                  {t.links.length ? (
                    <span className="term-links">
                      {t.links.map((s) => getPost(s)).filter(Boolean).map((p) => (
                        <Link key={p!.slug} href={`/posts/${p!.slug}/`}>→ {p!.title.split('｜')[0]}</Link>
                      ))}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p className="note small" style={{ marginTop: 28 }}>규정은 개정될 수 있어요. 대회에 나가기 전에는 대한파크골프협회 홈페이지의 최신 규정을 확인하세요.</p>
    </article>
  );
}
