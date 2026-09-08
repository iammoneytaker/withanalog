import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { InputLab } from "@/components/catalog/InputLab";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/tools/kps-test",
	"KPS 측정 · 키보드 연타 테스트",
	"첫 입력부터 10초 동안 새로 누른 횟수를 셉니다. 자동 반복은 제외합니다.",
);
export default function Page() {
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "테스트", path: "/tools" },
					{ name: "KPS 측정 · 키보드 연타 테스트", path: "/tools/kps-test" },
				]}
			/>
			<p className={styles.eyebrow}>BROWSER INPUT LAB</p>
			<h1 className={styles.title}>KPS 측정 · 키보드 연타 테스트</h1>
			<p className={styles.lead}>
				첫 입력부터 10초 동안 새로 누른 횟수를 셉니다. 자동 반복은 제외합니다.
			</p>
			<InputLab mode="kps" />
			<div className={styles.actions}>
				<Link className={styles.secondary} href="/guides/kps-cps">
					측정 방법과 한계
				</Link>
				<Link className={styles.secondary} href="/keyboards">
					키보드 도감
				</Link>
				<Link className={styles.secondary} href="/tools">
					다른 테스트
				</Link>
			</div>
		</Shell>
	);
}
