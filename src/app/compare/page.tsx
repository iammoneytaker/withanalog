import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { Comparison } from "@/components/catalog/Comparison";
import { findKeyboard } from "@/lib/keyboards";
import { pageMetadata } from "@/lib/seo";

type Props = { readonly searchParams: { readonly models?: string | string[] } };
export function generateMetadata({ searchParams }: Props) {
	return {
		...pageMetadata(
			"/compare",
			"독거미 키보드 비교표 · AULA 스펙 비교",
			"AULA 키보드 2~4개를 선택해 배열·배터리·공개 성능과 출처를 나란히 비교하세요.",
		),
		...(searchParams.models ? { robots: { index: false, follow: true } } : {}),
	};
}
export default function ComparePage({ searchParams }: Props) {
	const raw =
		typeof searchParams.models === "string" ? searchParams.models : "";
	const valid = Array.from(
		new Set(raw.split(",").filter((slug) => findKeyboard(slug))),
	).slice(0, 4);
	const selected = valid.length >= 2 ? valid : ["aula-f75", "aula-f99"];
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "비교하기", path: "/compare" }]} />
			<p className={styles.eyebrow}>SIDE BY SIDE</p>
			<h1 className={styles.title}>
				같은 기준으로,
				<br />
				다른 점을 찾으세요.
			</h1>
			<p className={styles.lead}>
				최대 4개 모델을 비교합니다. 출처가 공개한 스펙과 실제로 측정한 성능은
				서로 구분합니다.
			</p>
			{raw && valid.length < 2 && (
				<p className={styles.note}>
					유효한 모델을 두 개 이상 찾지 못해 F75와 F99를 표시합니다.
				</p>
			)}
			<Comparison initialSlugs={selected} />
			<section className={styles.section}>
				<h2>차이를 더 자세히</h2>
				<Link className={styles.textLink} href="/compare/aula-f75-vs-aula-f99">
					F75와 F99, 배열과 배터리 차이 ↗
				</Link>
			</section>
		</Shell>
	);
}
