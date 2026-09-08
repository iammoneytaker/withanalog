import { PurchaseLink } from "@/components/catalog/PurchaseLink";
import { keyboardImage } from "@/lib/keyboards";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import { keyboards, findKeyboard, productFacts } from "@/lib/keyboards";
import { pageMetadata, SITE_URL, VERIFIED_DATE } from "@/lib/seo";

type Props = { readonly params: { readonly slug: string } };
export function generateStaticParams() {
	return keyboards.map((product) => ({ slug: product.slug }));
}
export function generateMetadata({ params }: Props) {
	const product = findKeyboard(params.slug);
	return product
		? pageMetadata(
				`/keyboards/${product.slug}`,
				`독거미 AULA ${product.model} 스펙·성능·출처`,
				product.summary,
			)
		: { title: "모델을 찾을 수 없습니다", robots: { index: false } };
}
export default function ProductPage({ params }: Props) {
	const product = findKeyboard(params.slug);
	if (!product) notFound();
	const facts = productFacts(product);
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "키보드 도감", path: "/keyboards" },
					{ name: product.model, path: `/keyboards/${product.slug}` },
				]}
			/>
			<p className={styles.eyebrow}>AULA / {product.layout} / SOURCE CHECKED</p>
			<h1 className={styles.title}>독거미 {product.model}</h1>
			<PurchaseLink slug={product.slug} />
			<p className={styles.lead}>{product.summary}</p>
			<p className={styles.meta}>
				{product.scope}
				<br />
				WithAnalog 자료 정리 · 출처 확인 {VERIFIED_DATE}
			</p>
			<div className={styles.actions}>
				<Link
					className={styles.button}
					href={`/compare?models=${product.slug},${product.slug === "aula-f75" ? "aula-f99" : "aula-f75"}`}
				>
					다른 모델과 비교 ↗
				</Link>
				<Link
					href="/tools/keyboard-performance-test"
					className={styles.secondary}
				>
					내 키보드 테스트
				</Link>
			</div>
			<figure className={styles.productImage}>
				<Image
					src={keyboardImage(product.slug)}
					alt={`AULA ${product.model} 제품 사진`}
					width={640}
					height={640}
					priority
				/>
				<figcaption className={styles.meta}>
					사진 출처: AULA Gear 제품 페이지. 색상·스위치는 판매 옵션에 따라
					달라질 수 있습니다.
				</figcaption>
			</figure>
			<div className={styles.note}>{product.caveat}</div>
			<section className={styles.section}>
				<h2>확인된 공개 스펙</h2>
				<p className={styles.meta}>
					아래 표의 공개값은 AULA Gear 제품 페이지 기준입니다. 독립 실측 결과는
					등록되어 있지 않습니다.
				</p>
				<div className={styles.tableWrap}>
					<table className={styles.table}>
						<caption>AULA {product.model} · 판매 사양과 미확인 항목</caption>
						<tbody>
							{facts.map((fact) => (
								<tr key={fact.label}>
									<th scope="row">{fact.label}</th>
									<td>
										{fact.value}
										{fact.note && <small>{fact.note}</small>}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
			<section className={styles.section} id="sources">
				<h2>출처와 적용 범위</h2>
				<p>{product.scope}</p>
				<a
					className={styles.textLink}
					href={product.source}
					target="_blank"
					rel="noopener noreferrer"
				>
					AULA Gear · {product.model} 제품 페이지 ↗
				</a>
				<p className={styles.meta}>
					유형: 브랜드 판매 페이지 · 확인일: {VERIFIED_DATE}
					<br />
					공개 자료를 요약했으며 직접 측정하거나 제조사로부터 검증 인증을 받은
					데이터가 아닙니다.
				</p>
			</section>
			<section className={styles.section}>
				<h2>함께 확인하세요</h2>
				<div className={styles.actions}>
					<Link className={styles.secondary} href="/guides/aula-series">
						독거미 모델 차이
					</Link>
					<Link className={styles.secondary} href="/guides/polling-rate">
						폴링레이트와 지연
					</Link>
					<Link className={styles.secondary} href="/methodology">
						측정 기준
					</Link>
					<Link
						className={styles.secondary}
						href={`/contribute?model=${product.slug}`}
					>
						출처·스펙 정정
					</Link>
				</div>
			</section>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Product",
					name: `AULA ${product.model}`,
					alternateName: `독거미 ${product.model}`,
					model: product.model,
					brand: { "@type": "Brand", name: "AULA" },
					description: product.summary,
					url: `${SITE_URL}/keyboards/${product.slug}`,
					subjectOf: { "@type": "WebPage", url: product.source },
					additionalProperty: facts
						.filter((fact) => !fact.value.includes("미확인"))
						.map((fact) => ({
							"@type": "PropertyValue",
							name: fact.label,
							value: fact.value,
							description: fact.note,
						})),
				}}
			/>
		</Shell>
	);
}
