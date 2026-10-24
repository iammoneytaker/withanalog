import type { Product } from '@/lib/products';
import { productImage, specChips, TYPE_LABEL, won } from '@/lib/products';
import { SITE } from '@/lib/site';

export default function ProductGrid({ items }: { items: Product[] }) {
  const anyExternal = items.some((p) => productImage(p).external);
  return (
    <>
      <p className="note small">제휴 링크 · {SITE.disclosure}{anyExternal ? ` ${SITE.imageCredit}.` : ''}</p>
      <div className="pgrid">
        {items.map((p) => {
          const img = productImage(p);
          return (
            <a key={p.id} className="pgrid-item" href={p.url} target="_blank" rel="sponsored nofollow noopener" data-pid={p.id}>
              <img src={img.src} alt={p.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" width={300} height={300} />
              <span className="pgrid-brand">{p.brand} · {TYPE_LABEL[p.type]}</span>
              <span className="pgrid-name">{p.name}</span>
              <span className="pgrid-price">{won(p.price)}</span>
              <span className="pgrid-meta">{specChips(p.spec).slice(0, 2).join(' · ') || `리뷰 ${p.reviews.toLocaleString('ko-KR')}`}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}
