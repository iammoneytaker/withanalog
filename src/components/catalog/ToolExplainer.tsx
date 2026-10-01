import Link from "next/link";
import { findToolNote } from "@/lib/tool-notes";
import { findGuide } from "@/lib/guides";
import { AUTHOR, UPDATED_DATE } from "@/lib/seo";
import styles from "./catalog.module.css";

type Variant = "shell" | "surface";

/**
 * 도구 아래에 붙는 서버 렌더링 설명. 측정 원리·사용법·한계를 본문으로 제공해
 * 크롤러와 처음 방문한 사용자가 도구만 보고 떠나지 않도록 합니다.
 */
export function ToolExplainer({
	path,
	variant = "shell",
}: {
	readonly path: string;
	readonly variant?: Variant;
}) {
	const note = findToolNote(path);
	if (!note) return null;
	const guide = note.guide ? findGuide(note.guide) : undefined;
	const body = (
		<>
			{note.sections.map((section) => (
				<section key={section.title}>
					<h2>{section.title}</h2>
					{section.paragraphs.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
					{section.bullets && (
						<ul>
							{section.bullets.map((bullet) => (
								<li key={bullet}>{bullet}</li>
							))}
						</ul>
					)}
				</section>
			))}
			{note.faq.length > 0 && (
				<section>
					<h2>자주 묻는 질문</h2>
					{note.faq.map((item) => (
						<details key={item.question}>
							<summary>{item.question}</summary>
							<p>{item.answer}</p>
						</details>
					))}
				</section>
			)}
			<p className={styles.meta}>
				작성 <Link href={AUTHOR.path}>{AUTHOR.name}</Link> · 최종 수정{" "}
				{UPDATED_DATE}
				{guide && (
					<>
						{" "}
						· 더 읽기:{" "}
						<Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
					</>
				)}
			</p>
		</>
	);
	if (variant === "shell") {
		return <div className={styles.prose}>{body}</div>;
	}
	return (
		<div className={styles.explainer}>
			<div className={styles.prose}>{body}</div>
		</div>
	);
}
