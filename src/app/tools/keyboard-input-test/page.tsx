import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { InputLab } from "@/components/catalog/InputLab";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/tools/keyboard-input-test",
	"키보드 입력·동시입력 테스트",
	"키가 인식되는지, 여러 키를 함께 누르면 어떤 조합이 전달되는지 확인하세요.",
);
export default function Page() {
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "테스트", path: "/tools" },
					{
						name: "키보드 입력·동시입력 테스트",
						path: "/tools/keyboard-input-test",
					},
				]}
			/>
			<p className={styles.eyebrow}>BROWSER INPUT LAB</p>
			<h1 className={styles.title}>키보드 입력·동시입력 테스트</h1>
			<p className={styles.lead}>
				키가 인식되는지, 여러 키를 함께 누르면 어떤 조합이 전달되는지
				확인하세요.
			</p>
			<InputLab mode="input" />
			<div className={styles.actions}>
				<Link className={styles.secondary} href="/guides/keyboard-input">
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
