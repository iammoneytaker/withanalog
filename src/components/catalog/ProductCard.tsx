import { keyboardImage, productTitle, PRICE_CHECKED } from "@/lib/keyboards";
import Link from "next/link";
import Image from "next/image";
import type { KeyboardProduct } from "@/lib/keyboards";
import { styles } from "./Shell";

export function ProductCard({
	product,
}: {
	readonly product: KeyboardProduct;
}) {
	return (
		<article className={styles.card}>
			<span className={styles.badge}>
				{product.layout} · {product.keys} KEYS
			</span>
			<Link href={`/keyboards/${product.slug}`}>
				<Image
					src={keyboardImage(product.slug)}
					alt={`${productTitle(product)} 제품 사진`}
					width={640}
					height={640}
					className={styles.thumbnail}
				/>
				<h3>{productTitle(product)}</h3>
			</Link>
			<p className={styles.meta}>
				판매처 대표 사진 · 색상은 판매 옵션에 따라 다름
			</p>
			<p>{product.summary}</p>
			<p className={styles.meta}>
				{product.connection} · {product.switchType}
				<br />
				쿠팡 확인가 {product.price.toLocaleString("ko-KR")}원 ({PRICE_CHECKED} ·
				변동 가능)
			</p>
			<Link href={`/keyboards/${product.slug}`} className={styles.textLink}>
				스펙과 출처 보기 ↗
			</Link>
		</article>
	);
}
