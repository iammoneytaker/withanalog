import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/seo";
import styles from "./catalog.module.css";

export { styles };

export function JsonLd({ data }: { readonly data: object }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}

export function Shell({ children }: { readonly children: ReactNode }) {
	return (
		<div className={styles.site}>
			{children}
			<footer className={styles.footer}>
				<span>WITHANALOG · 근거로 비교하는 키보드</span>
				<Link href="/keyboards">키보드 도감</Link>
				<Link href="/methodology">출처·편집 기준</Link>
				<Link href="/tools/keyboard-performance-test">키보드 성능 테스트</Link>
			</footer>
		</div>
	);
}

export function Breadcrumbs({
	items,
}: {
	readonly items: readonly { readonly name: string; readonly path: string }[];
}) {
	return (
		<>
			<p className={styles.meta} style={{ marginTop: 26 }}>
				<Link href="/">홈</Link>
				{items.map((item) => (
					<span key={item.path}>
						{" "}
						/ <Link href={item.path}>{item.name}</Link>
					</span>
				))}
			</p>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [{ name: "홈", path: "/" }, ...items].map(
						(item, index) => ({
							"@type": "ListItem",
							position: index + 1,
							name: item.name,
							item: `${SITE_URL}${item.path}`,
						}),
					),
				}}
			/>
		</>
	);
}

export function KeyboardArt() {
	const labels =
		"ESC 1 2 3 4 5 6 7 8 9 0 - = DEL Q W E R T Y U I O P [ ] BS HOME A S D F G H J K L ; ENTER END PGUP PGDN SHIFT Z X C V B N M , . / ↑ SHIFT CTRL ALT FN".split(
			" ",
		);
	return (
		<div className={styles.boardScene}>
			<div className={styles.board} aria-hidden="true">
				{labels.map((label, index) => (
					<span className={styles.key} key={index}>
						{label}
					</span>
				))}
				<span className={`${styles.key} ${styles.space}`}>WITHANALOG</span>
				{["ALT", "FN", "←", "↓", "→"].map((label) => (
					<span className={styles.key} key={label}>
						{label}
					</span>
				))}
			</div>
			<p className={styles.boardCaption}>
				KEYBOARD STUDY / 배열을 표현한 일러스트
			</p>
		</div>
	);
}
