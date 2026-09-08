import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { Comparison } from "@/components/catalog/Comparison";
import { pageMetadata } from "@/lib/seo";
const pair = "aula-f75-vs-aula-f99";
type Props = { readonly params: { readonly pair: string } };
export function generateStaticParams() {
	return [{ pair }];
}
export function generateMetadata({ params }: Props) {
	return params.pair === pair
		? pageMetadata(
				`/compare/${pair}`,
				"독거미 F75 vs F99 · 배열과 스펙 차이",
				"F75는 80키·4000mAh, F99는 99키·8000mAh 공개 사양입니다. 숫자패드·연결과 검증 범위를 비교하세요.",
			)
		: { title: "비교를 찾을 수 없습니다", robots: { index: false } };
}
export default function PairPage({ params }: Props) {
	if (params.pair !== pair) notFound();
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "비교하기", path: "/compare" },
					{ name: "F75 vs F99", path: `/compare/${pair}` },
				]}
			/>
			<p className={styles.eyebrow}>AULA / COMPARISON</p>
			<h1 className={styles.title}>F75 vs F99</h1>
			<p className={styles.lead}>
				가장 먼저 볼 차이는 숫자패드입니다. F75는 80키의 75% 배열, F99는
				숫자패드를 포함한 99키 구성입니다. 공개 배터리 용량은 각각 4,000mAh와
				8,000mAh이며, 용량만으로 실제 사용시간을 비교할 수는 없습니다.
			</p>
			<Comparison initialSlugs={["aula-f75", "aula-f99"]} />
			<section className={styles.prose}>
				<h2>어떤 구성이 필요한가요?</h2>
				<p>
					숫자패드가 필요 없다면 F75의 배열을, 숫자 입력을 자주 한다면 F99의
					배열을 먼저 확인해 보세요. 이 판단은 키 구성에 근거한 선택 가이드이며
					타건감·소음·지연시간에 대한 우열 판정은 아닙니다.
				</p>
				<h2>어느 쪽이 더 빠른가요?</h2>
				<p>
					현재 등록한 출처만으로는 판단할 수 없습니다. 동일한 조건의 독립 실측
					입력 지연 데이터가 없어 속도 순위를 제공하지 않습니다.
				</p>
				<Link href="/methodology">비교 기준 확인 ↗</Link>
			</section>
		</Shell>
	);
}
