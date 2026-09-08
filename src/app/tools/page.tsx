import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { toolCatalog } from "@/lib/tool-catalog";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/tools",
	"키보드 테스트 · 입력 확인 KPS 반응속도 타건음",
	"키보드 성능 테스트, 키 인식·동시입력, KPS·CPS, 재입력 확인과 타건음 도구를 한 곳에서 사용하세요.",
);
export default function ToolsPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "테스트", path: "/tools" }]} />
			<p className={styles.eyebrow}>TEST YOUR KEYBOARD</p>
			<h1 className={styles.title}>
				직접 눌러서
				<br />
				확인하세요.
			</h1>
			<p className={styles.lead}>
				확인하고 싶은 항목에 맞는 도구를 고르세요. 브라우저에서 관찰하는 입력과
				키보드 하드웨어 성능은 다릅니다.
			</p>
			<div className={styles.grid}>
				{toolCatalog.map((tool) => (
					<Link key={tool.path} href={tool.path} className={styles.card}>
						<h2>{tool.title}</h2>
						<p>{tool.description}</p>
						<span className={styles.textLink}>테스트 열기 ↗</span>
					</Link>
				))}
			</div>
			<div className={styles.actions}>
				<Link className={styles.secondary} href="/methodology">
					측정값 해석하기
				</Link>
				<Link className={styles.secondary} href="/keyboards">
					독거미 제품 비교
				</Link>
			</div>
		</Shell>
	);
}
