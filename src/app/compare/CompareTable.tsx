'use client';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

const TYPE_LABEL: Record<string, string> = { club: '파크골프채', fullset: '풀세트', bag: '가방·파우치', ball: '공', gear: '용품' };
const won = (n: number | null) => (n ? n.toLocaleString('ko-KR') + '원' : '-');

export default function CompareTable({ items, checkedAt }: { items: Product[]; checkedAt: string }) {
  const [type, setType] = useState('club');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');
  const [sort, setSort] = useState('reviews');

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    items.filter((p) => !type || p.type === type).forEach((p) => m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([b]) => b);
  }, [items, type]);

  const list = useMemo(() => {
    const max = budget ? Number(budget) : Infinity;
    const r = items.filter(
      (p) =>
        (!type || p.type === type) &&
        (!brand || p.brand === brand) &&
        (!gender || p.gender === gender || p.gender === 'all') &&
        (p.price ?? 0) <= max,
    );
    const s = [...r];
    if (sort === 'reviews') s.sort((a, b) => b.reviews - a.reviews);
    if (sort === 'low') s.sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9));
    if (sort === 'high') s.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === 'rating') s.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.reviews - a.reviews);
    return s;
  }, [items, type, brand, gender, budget, sort]);

  return (
    <>
      <div className="filters">
        <div>
          <label htmlFor="f-type">종류</label>
          <select id="f-type" value={type} onChange={(e) => { setType(e.target.value); setBrand(''); }}>
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
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
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
          </select>
        </div>
      </div>
      <p className="result-count">{list.length}개 상품 · 가격은 {checkedAt} 판매 페이지 기준이며 바뀔 수 있습니다.</p>
      <div className="cmp-list">
        {list.map((p) => (
          <div className="cmp-item" key={p.id}>
            <div className="row">
              <span className="meta">{p.brand} · {TYPE_LABEL[p.type]}</span>
              <span className="meta">{p.rating ? `★ ${p.rating}` : ''} 리뷰 {p.reviews.toLocaleString('ko-KR')}</span>
            </div>
            <p className="name">{p.name}</p>
            <div className="row">
              <span className="price">{won(p.price)}</span>
              {p.listPrice && p.price && p.listPrice > p.price ? <del className="meta">{won(p.listPrice)}</del> : <span />}
            </div>
            <a className="go" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>네이버에서 확인</a>
          </div>
        ))}
      </div>
    </>
  );
}
