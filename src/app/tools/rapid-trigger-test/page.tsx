import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { InputLab } from "@/components/catalog/InputLab";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/tools/rapid-trigger-test",
	"래피드 트리거 재입력 확인",
	"키를 조금 떼고 다시 누르며 DOWN → UP → DOWN을 관찰하세요. 래피드 트리거 지원 여부나 mm 감도를 인증하는 도구는 아닙니다.",
);
export default function Page() {
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "테스트", path: "/tools" },
					{
						name: "래피드 트리거 재입력 확인",
						path: "/tools/rapid-trigger-test",
					},
				]}
			/>
			<p className={styles.eyebrow}>BROWSER INPUT LAB</p>
			<h1 className={styles.title}>래피드 트리거 재입력 확인</h1>
			<p className={styles.lead}>
				키를 조금 떼고 다시 누르며 DOWN → UP → DOWN을 관찰하세요. 래피드 트리거
				지원 여부나 mm 감도를 인증하는 도구는 아닙니다.
			</p>
			<InputLab mode="rapid" />
			<div className={styles.actions}>
				<Link className={styles.secondary} href="/guides/rapid-trigger">
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
