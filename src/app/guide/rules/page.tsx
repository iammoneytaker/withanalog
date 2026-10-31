import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/lib/posts';
import { SITE } from '@/lib/site';
import rules from '../../../../data/rules.json';

type Rule = { q: string; a: string; source: string | null; gear: string[]; more: string[] };
const RULES = rules as Rule[];
const title = (s: string) => getPost(s)?.title.split('｜')[0];

export const metadata: Metadata = {
  title: '파크골프 규칙 한눈에｜OB·벌타·타순·티·스코어·대회 장비, 협회 규정 조항별 정리',
  description: '대한파크골프협회 경기규칙과 대회 규정을 상황별 질문과 답으로 정리했습니다. 각 규칙 아래에 근거 조항과 필요한 장비 글을 함께 붙였어요.',
  alternates: { canonical: '/guide/rules/' },
};

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: RULES.map((r) => ({ '@type': 'Question', name: r.q, acceptedAnswer: { '@type': 'Answer', text: r.a + (r.source ? ` (근거: 대한파크골프협회 ${r.source})` : '') } })),
  };
  return (
    <article className="article">
      <JsonLd data={ld} />
      <nav className="crumbs" aria-label="경로"><Link href="/">홈</Link> › 규칙·용어</nav>
      <p className="m-kicker">규칙·용어</p>
      <h1>파크골프 규칙 한눈에</h1>
      <p className="m-lead">처음 구장에 나가거나 대회를 앞둔 분이 가장 많이 묻는 규칙 {RULES.length}가지를 질문과 답으로 정리했어요. 답마다 대한파크골프협회 규정 조항을 적었고, 그 규칙 때문에 필요한 장비 글을 함께 붙였습니다. 낯선 말은 <Link href="/guide/terms/">파크골프 용어 사전</Link>에서 찾을 수 있어요.</p>
      <div className="hub-jump">
        {RULES.map((r, i) => (
          <a key={r.q} href={`#r${i + 1}`}>{i + 1}</a>
        ))}
      </div>
      {RULES.map((r, i) => (
        <section key={r.q} className="rule-item" id={`r${i + 1}`}>
          <h2>{i + 1}. {r.q}</h2>
          <p>{r.a}</p>
          {r.source ? <p className="rule-src">근거: 대한파크골프협회 {r.source}</p> : null}
          {r.gear.length ? (
            <div className="rule-gear">
              <b>필요한 장비</b>
              {r.gear.filter((s) => title(s)).map((s) => <Link key={s} href={`/posts/${s}/`}>{title(s)}</Link>)}
            </div>
          ) : null}
          {r.more.length ? (
            <div className="rule-more">
              자세히: {r.more.filter((s) => title(s)).map((s) => <Link key={s} href={`/posts/${s}/`}>{title(s)}</Link>)}
            </div>
          ) : null}
        </section>
      ))}
      <p className="note small" style={{ marginTop: 28 }}>규정은 개정될 수 있어요. 대회에 나가기 전에는 대한파크골프협회 홈페이지의 최신 규정과 대회 요강을 확인하세요.</p>
    </article>
  );
}
