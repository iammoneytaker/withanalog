import Link from "next/link";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import { Catalog } from "@/components/catalog/Catalog";
import { keyboards, productTitle } from "@/lib/keyboards";
import { pageMetadata, SITE_URL, VERIFIED_DATE } from "@/lib/seo";

export const metadata = pageMetadata(
	"/keyboards",
	"키보드 도감 · 독거미 AULA · 지클릭커 비교",
	"독거미 F65부터 F99 PRO, 지클릭커 XRT68·사일런스 M까지 배열·연결·가격대·공개 성능을 출처와 함께 비교합니다.",
);
export default function KeyboardsPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "키보드 도감", path: "/keyboards" }]} />
			<p className={styles.eyebrow}>THE KEYBOARD COLLECTION</p>
			<h1 className={styles.title}>
				키보드 도감.
				<br />
				이름보다, 차이를 보세요.
			</h1>
			<p className={styles.lead}>
				독거미 F65부터 F99 PRO, 지클릭커 자석축·사일런스 라인까지. 배열·연결
				방식·가격대와 공개된 성능을 출처와 함께 정리했습니다. 확인일은{" "}
				{VERIFIED_DATE}입니다.
			</p>
			<div className={styles.actions}>
				<Link href="/compare" className={styles.button}>
					나란히 비교하기 ↗
				</Link>
				<Link href="/guides/aula-series" className={styles.secondary}>
					독거미 선택 가이드
				</Link>
			</div>
			<Catalog />
			<div className={styles.note}>
				미확인은 성능이 나쁘다는 뜻이 아닙니다. 해당 변형과 측정 조건을 확인할
				근거가 아직 등록되지 않았다는 뜻입니다. 시리즈 전체를 망라한 목록은
				아닙니다.
			</div>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ItemList",
					name: "WithAnalog 키보드 도감",
					itemListElement: keyboards.map((product, i) => ({
						"@type": "ListItem",
						position: i + 1,
						name: productTitle(product),
						url: `${SITE_URL}/keyboards/${product.slug}`,
					})),
				}}
			/>
		</Shell>
	);
}
