import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/guides",
	"키보드 성능 가이드 · 반응속도 KPS 래피드 트리거",
	"키보드 입력 지연, KPS, 폴링레이트, 래피드 트리거와 독거미 시리즈 선택을 근거 중심으로 설명합니다.",
);
export default function GuidesPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "가이드", path: "/guides" }]} />
			<p className={styles.eyebrow}>READ THE NUMBERS</p>
			<h1 className={styles.title}>숫자를 읽는 방법.</h1>
			<p className={styles.lead}>
				측정값의 의미를 알면 비교가 달라집니다. 확인할 수 있는 것과 아직 알 수
				없는 것을 함께 설명합니다.
			</p>
			<div className={styles.grid}>
				{guides.map((guide) => (
					<Link
						className={styles.card}
						key={guide.slug}
						href={`/guides/${guide.slug}`}
					>
						<h2>{guide.title}</h2>
						<p>{guide.answer}</p>
						<span className={styles.textLink}>읽어보기 ↗</span>
					</Link>
				))}
			</div>
		</Shell>
	);
}
