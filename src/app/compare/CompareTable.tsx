'use client';
import { useMemo, useState } from 'react';
import type { Product, Spec } from '@/lib/products';

const TYPE_LABEL: Record<string, string> = { club: '파크골프채', fullset: '풀세트', bag: '가방·파우치', ball: '공', gear: '용품' };
const won = (n: number | null) => (n ? n.toLocaleString('ko-KR') + '원' : '-');
const off = (p: { price: number | null; listPrice: number | null }) =>
  p.listPrice && p.price && p.listPrice > p.price ? Math.round((1 - p.price / p.listPrice) * 100) : 0;

export type Item = Product & { img: string; external: boolean; short: string; post?: { slug: string; title: string } };
export type TopPick = { id: string; who: string };

function keyChips(s?: Spec): string[] {
  if (!s) return [];
  const out: string[] = [];
  if (s.head) out.push(s.head);
  if (s.weightG) out.push(`${s.weightG}g`);
  if (s.pieces) out.push(`${s.pieces}피스`);
  if (s.bagType) out.push(s.bagType);
  if (s.certified && /협회/.test(s.certified)) out.push('협회 공인');
  if (s.leftHanded) out.push('좌타');
  if (s.glow) out.push('야광');
  return out.slice(0, 3);
}

const ROWS: { key: string; label: string; get: (p: Item) => string }[] = [
  { key: 'price', label: '가격', get: (p) => won(p.price) },
  { key: 'brand', label: '브랜드', get: (p) => p.brand },
  { key: 'head', label: '헤드 소재', get: (p) => p.spec?.head ?? '확인 필요' },
  { key: 'weight', label: '무게', get: (p) => (p.spec?.weightG ? `${p.spec.weightG}g` : '확인 필요') },
  { key: 'length', label: '길이', get: (p) => (p.spec?.lengthCm ? `${p.spec.lengthCm}cm` : '확인 필요') },
  { key: 'shaft', label: '샤프트', get: (p) => p.spec?.shaft ?? '확인 필요' },
  { key: 'cert', label: '공인', get: (p) => p.spec?.certified ?? '확인 필요' },
  { key: 'left', label: '좌타', get: (p) => (p.spec?.leftHanded ? '가능' : '확인 필요') },
  { key: 'set', label: '구성', get: (p) => p.spec?.setItems ?? (p.spec?.pieces ? `${p.spec.pieces}피스` : p.spec?.bagType ?? '-') },
  { key: 'feat', label: '특징', get: (p) => (p.spec?.features ?? []).join(', ') || '-' },
  { key: 'note', label: '표기 차이', get: (p) => p.spec?.conflicts ?? '-' },
  { key: 'reviews', label: '리뷰', get: (p) => `${p.rating ? `★${p.rating} · ` : ''}${p.reviews.toLocaleString('ko-KR')}개` },
];

const QUICK: { key: string; label: string }[] = [
  { key: 'u30', label: '30만 원 이하' },
  { key: 'women', label: '여성용' },
  { key: 'left', label: '좌타' },
  { key: 'cert', label: '협회 공인' },
];
const PAGE = 20;

export default function CompareTable({ items, top, checkedAt, imageCredit }: { items: Item[]; top: TopPick[]; checkedAt: string; imageCredit: string }) {
  const [type, setType] = useState('club');
  const [quick, setQuick] = useState<string[]>([]);
  const [more, setMore] = useState(false);
  const [brand, setBrand] = useState('');
  const [head, setHead] = useState('');
  const [budget, setBudget] = useState('');
  const [onlySpec, setOnlySpec] = useState(false);
  const [sort, setSort] = useState('reviews');
  const [shown, setShown] = useState(PAGE);
  const [picked, setPicked] = useState<string[]>([]);
  const [sheet, setSheet] = useState(false);

  const byId = useMemo(() => new Map(items.map((p) => [p.id, p])), [items]);
  const topItems = top.map((t) => ({ t, p: byId.get(t.id) })).filter((x) => x.p) as { t: TopPick; p: Item }[];

  const pool = useMemo(() => items.filter((p) => !type || p.type === type), [items, type]);
  const brands = useMemo(() => {
    const m = new Map<string, number>();
    pool.forEach((p) => m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([b]) => b);
  }, [pool]);
  const heads = useMemo(() => {
    const m = new Set<string>();
    pool.forEach((p) => p.spec?.head && m.add(p.spec.head));
    return [...m].sort();
  }, [pool]);

  const list = useMemo(() => {
    const max = Math.min(budget ? Number(budget) : Infinity, quick.includes('u30') ? 300000 : Infinity);
    const r = pool.filter(
      (p) =>
        (!brand || p.brand === brand) &&
        (!quick.includes('women') || p.gender === 'women' || p.gender === 'all' || /여성|여자|레이디/.test(p.name)) &&
        (!head || p.spec?.head === head) &&
        (!onlySpec || !!p.spec) &&
        (!quick.includes('cert') || /협회/.test(p.spec?.certified ?? '')) &&
        (!quick.includes('left') || p.spec?.leftHanded === true) &&
        (p.price ?? 0) <= max,
    );
    const s = [...r];
    if (sort === 'reviews') s.sort((a, b) => b.reviews - a.reviews);
    if (sort === 'low') s.sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9));
    if (sort === 'high') s.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === 'rating') s.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.reviews - a.reviews);
    if (sort === 'light') s.sort((a, b) => (parseFloat(String(a.spec?.weightG ?? 9999)) || 9999) - (parseFloat(String(b.spec?.weightG ?? 9999)) || 9999));
    return s;
  }, [pool, brand, quick, head, onlySpec, budget, sort]);

  const pickedItems = picked.map((id) => byId.get(id)).filter(Boolean) as Item[];
  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 3 ? [...cur.slice(1), id] : [...cur, id]));
  const toggleQuick = (k: string) => { setQuick((q) => (q.includes(k) ? q.filter((x) => x !== k) : [...q, k])); setShown(PAGE); };
  const reset = () => { setQuick([]); setBrand(''); setHead(''); setBudget(''); setOnlySpec(false); setShown(PAGE); };

  const Card = ({ p }: { p: Item }) => {
    const on = picked.includes(p.id);
    const o = off(p);
    const c = keyChips(p.spec);
    return (
      <div className={`cg-item${on ? ' on' : ''}`}>
        <a href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id} className="cg-link">
          <img className="cg-img" src={p.img} alt={p.short} loading="lazy" decoding="async" referrerPolicy="no-referrer" width={300} height={300} />
          <span className="cg-brand">{p.brand}</span>
          <span className="cg-name">{p.short}</span>
          <span className="cg-price">{o ? <b className="cg-off">{o}%</b> : null}{won(p.price)}</span>
          <span className="cg-rv">{p.rating ? `★${p.rating} · ` : ''}리뷰 {p.reviews.toLocaleString('ko-KR')}</span>
        </a>
        {c.length ? <span className="cg-chips">{c.map((x) => (<span key={x}>{x}</span>))}</span> : null}
        {p.post ? <a className="cg-post" href={`/posts/${p.post.slug}/`}>비교 글: {p.post.title}</a> : null}
        <div className="cg-actions">
          <button type="button" className={`cg-pick${on ? ' on' : ''}`} onClick={() => toggle(p.id)} aria-pressed={on}>{on ? '담김 ✓' : '비교 담기'}</button>
          <a className="cg-go" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>가격 확인</a>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="cg-types" role="tablist" aria-label="종류">
        {(['club', 'fullset', 'bag', 'ball'] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={type === t} className={type === t ? 'on' : ''} onClick={() => { setType(t); setBrand(''); setHead(''); setShown(PAGE); }}>{TYPE_LABEL[t]}</button>
        ))}
      </div>
      <div className="cg-chips-row" aria-label="빠른 필터">
        <button type="button" className={!quick.length && !brand && !head && !budget && !onlySpec ? 'on' : ''} onClick={reset}>전체</button>
        {QUICK.map((q) => (
          <button key={q.key} type="button" className={quick.includes(q.key) ? 'on' : ''} aria-pressed={quick.includes(q.key)} onClick={() => toggleQuick(q.key)}>{q.label}</button>
        ))}
        <button type="button" className="ghost" onClick={() => setMore((m) => !m)} aria-expanded={more}>필터 더보기 {more ? '▴' : '▾'}</button>
      </div>
      {more ? (
        <div className="filters cg-more">
          <div>
            <label htmlFor="f-brand">브랜드</label>
            <select id="f-brand" value={brand} onChange={(e) => { setBrand(e.target.value); setShown(PAGE); }}>
              <option value="">전체</option>
              {brands.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="f-head">헤드 소재</label>
            <select id="f-head" value={head} onChange={(e) => setHead(e.target.value)}>
              <option value="">전체</option>
              {heads.map((h) => (<option key={h} value={h}>{h}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="f-budget">예산(최대)</label>
            <select id="f-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">제한 없음</option>
              <option value="100000">10만원 이하</option>
              <option value="500000">50만원 이하</option>
              <option value="800000">80만원 이하</option>
              <option value="1200000">120만원 이하</option>
            </select>
          </div>
          <div className="cg-check"><label><input type="checkbox" checked={onlySpec} onChange={(e) => setOnlySpec(e.target.checked)} /> 스펙 확인된 상품만</label></div>
        </div>
      ) : null}

      {type === 'club' && !quick.length && !brand && topItems.length ? (
        <section className="cg-top" aria-label="많이 찾는 모델">
          <div className="cg-head"><h2>많이 찾는 모델 TOP {topItems.length}</h2><span>실제 클릭 기준</span></div>
          <div className="cg-top-row">
            {topItems.map(({ t, p }, i) => (
              <a key={p.id} className="cg-top-item" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>
                <span className="cg-rank">{i + 1}</span>
                <img src={p.img} alt={p.short} loading="lazy" decoding="async" referrerPolicy="no-referrer" width={240} height={240} />
                <span className="cg-name">{p.short}</span>
                <span className="cg-who">{t.who}</span>
                <span className="cg-price">{off(p) ? <b className="cg-off">{off(p)}%</b> : null}{won(p.price)}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <div className="cg-head">
        <h2>전체 상품 <small>{list.length}개</small></h2>
        <select aria-label="정렬" value={sort} onChange={(e) => setSort(e.target.value)} className="cg-sort">
          <option value="reviews">리뷰 많은 순</option>
          <option value="rating">평점 높은 순</option>
          <option value="low">가격 낮은 순</option>
          <option value="high">가격 높은 순</option>
          <option value="light">가벼운 순</option>
        </select>
      </div>
      <div className="cg-grid">
        {list.slice(0, shown).map((p) => (<Card key={p.id} p={p} />))}
      </div>
      {list.length > shown ? (
        <button type="button" className="cg-more-btn" onClick={() => setShown((n) => n + PAGE)}>더 보기 ({list.length - shown}개 남음)</button>
      ) : null}
      {!list.length ? <p className="note">조건에 맞는 상품이 없어요. <button type="button" className="linkish" onClick={reset}>필터 지우기</button></p> : null}
      <p className="note small">가격은 {checkedAt} 판매 페이지 기준이며 바뀔 수 있습니다. 제휴 링크가 포함되어 있습니다. {imageCredit}.</p>

      {pickedItems.length ? (
        <div className="cg-bar" role="region" aria-label="비교함">
          <span>비교함 {pickedItems.length}개 · {pickedItems.map((p) => p.short).join(', ')}</span>
          <button type="button" onClick={() => setSheet(true)}>나란히 비교 →</button>
        </div>
      ) : null}

      {sheet && pickedItems.length ? (
        <div className="cg-sheet" role="dialog" aria-label="선택한 상품 비교">
          <div className="cg-sheet-in">
            <div className="cg-head"><h2>선택한 {pickedItems.length}개 나란히 비교</h2><button type="button" className="linkish" onClick={() => setSheet(false)}>닫기</button></div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>항목</th>
                    {pickedItems.map((p) => (
                      <th key={p.id}>
                        <img src={p.img} alt={p.short} width={88} height={88} referrerPolicy="no-referrer" className="side-img" />
                        <span className="side-name">{p.short}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.key}>
                      <th>{r.label}</th>
                      {pickedItems.map((p) => (<td key={p.id}>{r.get(p)}</td>))}
                    </tr>
                  ))}
                  <tr>
                    <th>구매</th>
                    {pickedItems.map((p) => (
                      <td key={p.id}><a className="go small" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>네이버에서 확인</a></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="linkish" onClick={() => { setPicked([]); setSheet(false); }}>선택 비우기</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
