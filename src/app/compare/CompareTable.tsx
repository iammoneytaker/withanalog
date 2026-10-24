'use client';
import { useMemo, useState } from 'react';
import type { Product, Spec } from '@/lib/products';

const TYPE_LABEL: Record<string, string> = { club: '파크골프채', fullset: '풀세트', bag: '가방·파우치', ball: '공', gear: '용품' };
const won = (n: number | null) => (n ? n.toLocaleString('ko-KR') + '원' : '-');

type Item = Product & { img: string; external: boolean };

function chips(s?: Spec): string[] {
  if (!s) return [];
  const out: string[] = [];
  if (s.head) out.push(`헤드 ${s.head}`);
  if (s.weightG) out.push(`${s.weightG}g`);
  if (s.lengthCm) out.push(`${s.lengthCm}cm`);
  if (s.pieces) out.push(`${s.pieces}피스`);
  if (s.bagType) out.push(s.bagType);
  if (s.certified && s.certified !== '확인 필요') out.push(s.certified);
  if (s.leftHanded) out.push('좌타 가능');
  if (s.glow) out.push('야광/LED');
  return out;
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

export default function CompareTable({ items, checkedAt, imageCredit }: { items: Item[]; checkedAt: string; imageCredit: string }) {
  const [type, setType] = useState('club');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');
  const [head, setHead] = useState('');
  const [onlySpec, setOnlySpec] = useState(false);
  const [onlyCert, setOnlyCert] = useState(false);
  const [onlyLeft, setOnlyLeft] = useState(false);
  const [sort, setSort] = useState('reviews');
  const [picked, setPicked] = useState<string[]>([]);

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
    const max = budget ? Number(budget) : Infinity;
    const r = pool.filter(
      (p) =>
        (!brand || p.brand === brand) &&
        (!gender || p.gender === gender || p.gender === 'all') &&
        (!head || p.spec?.head === head) &&
        (!onlySpec || !!p.spec) &&
        (!onlyCert || /협회/.test(p.spec?.certified ?? '')) &&
        (!onlyLeft || p.spec?.leftHanded === true) &&
        (p.price ?? 0) <= max,
    );
    const s = [...r];
    if (sort === 'reviews') s.sort((a, b) => b.reviews - a.reviews);
    if (sort === 'low') s.sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9));
    if (sort === 'high') s.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === 'rating') s.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.reviews - a.reviews);
    if (sort === 'light') s.sort((a, b) => (parseFloat(String(a.spec?.weightG ?? 9999)) || 9999) - (parseFloat(String(b.spec?.weightG ?? 9999)) || 9999));
    return s;
  }, [pool, brand, gender, head, onlySpec, onlyCert, onlyLeft, budget, sort]);

  const pickedItems = picked.map((id) => items.find((p) => p.id === id)).filter(Boolean) as Item[];
  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 3 ? [...cur.slice(1), id] : [...cur, id]));

  return (
    <>
      <div className="filters">
        <div>
          <label htmlFor="f-type">종류</label>
          <select id="f-type" value={type} onChange={(e) => { setType(e.target.value); setBrand(''); setHead(''); }}>
            <option value="">전체</option>
            <option value="club">파크골프채</option>
            <option value="fullset">풀세트</option>
            <option value="bag">가방·파우치</option>
            <option value="ball">공</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-brand">브랜드</label>
          <select id="f-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
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
          <label htmlFor="f-gender">대상</label>
          <select id="f-gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">전체</option>
            <option value="men">남성용</option>
            <option value="women">여성용</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-budget">예산(최대)</label>
          <select id="f-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">제한 없음</option>
            <option value="100000">10만원 이하</option>
            <option value="300000">30만원 이하</option>
            <option value="500000">50만원 이하</option>
            <option value="800000">80만원 이하</option>
            <option value="1200000">120만원 이하</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-sort">정렬</label>
          <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="reviews">리뷰 많은 순</option>
            <option value="rating">평점 높은 순</option>
            <option value="low">가격 낮은 순</option>
            <option value="high">가격 높은 순</option>
            <option value="light">가벼운 순</option>
          </select>
        </div>
      </div>
      <div className="toggles">
        <label><input type="checkbox" checked={onlySpec} onChange={(e) => setOnlySpec(e.target.checked)} /> 스펙 확인된 상품만</label>
        <label><input type="checkbox" checked={onlyCert} onChange={(e) => setOnlyCert(e.target.checked)} /> 협회 공인만</label>
        <label><input type="checkbox" checked={onlyLeft} onChange={(e) => setOnlyLeft(e.target.checked)} /> 좌타 가능만</label>
      </div>
      <p className="result-count">
        {list.length}개 상품 · 가격은 {checkedAt} 판매 페이지 기준이며 바뀔 수 있습니다. 최대 3개를 골라 아래에서 나란히 비교할 수 있어요.
      </p>

      {pickedItems.length ? (
        <section className="side-compare" aria-label="선택한 상품 비교">
          <h2 className="section-title">선택한 {pickedItems.length}개 나란히 비교</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>항목</th>
                  {pickedItems.map((p) => (
                    <th key={p.id}>
                      <img src={p.img} alt={p.name} width={72} height={72} referrerPolicy="no-referrer" className="side-img" />
                      <span className="side-name">{p.name}</span>
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
          <button type="button" className="linkish" onClick={() => setPicked([])}>선택 비우기</button>
        </section>
      ) : null}

      <div className="cmp-list">
        {list.map((p) => {
          const c = chips(p.spec);
          const on = picked.includes(p.id);
          return (
            <div className={`cmp-item${on ? ' on' : ''}`} key={p.id}>
              <div className="cmp-row">
                <img className="cmp-img" src={p.img} alt={p.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" width={110} height={110} />
                <div className="cmp-info">
                  <span className="meta">{p.brand} · {TYPE_LABEL[p.type]}</span>
                  <p className="name">{p.name}</p>
                  <span className="price">{won(p.price)}</span>{' '}
                  {p.listPrice && p.price && p.listPrice > p.price ? <del className="meta">{won(p.listPrice)}</del> : null}
                  <span className="meta block">{p.rating ? `★ ${p.rating} · ` : ''}리뷰 {p.reviews.toLocaleString('ko-KR')}</span>
                </div>
              </div>
              {c.length ? <p className="chips">{c.map((x) => (<span key={x}>{x}</span>))}</p> : null}
              {p.spec?.features?.length ? <p className="feat">{p.spec.features.join(' · ')}</p> : null}
              <div className="cmp-actions">
                <button type="button" className={`pick${on ? ' on' : ''}`} onClick={() => toggle(p.id)} aria-pressed={on}>{on ? '비교에서 빼기' : '비교에 담기'}</button>
                <a className="go" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>네이버에서 확인</a>
              </div>
            </div>
          );
        })}
      </div>
      <p className="note small">제휴 링크가 포함되어 있습니다. {imageCredit}. 스펙은 판매 페이지·제조사 자료에서 확인한 값만 적었고, 확인하지 못한 칸은 “확인 필요”로 두었습니다.</p>
    </>
  );
}
