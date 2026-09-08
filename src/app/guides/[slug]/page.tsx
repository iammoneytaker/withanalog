import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import { guides } from "@/lib/guides";
import { pageMetadata, SITE_URL, VERIFIED_DATE } from "@/lib/seo";
type Props = { readonly params: { readonly slug: string } };
export function generateStaticParams() {
	return guides.map((guide) => ({ slug: guide.slug }));
}
export function generateMetadata({ params }: Props) {
	const guide = guides.find((item) => item.slug === params.slug);
	return guide
		? pageMetadata(`/guides/${guide.slug}`, guide.title, guide.answer)
		: { title: "가이드를 찾을 수 없습니다", robots: { index: false } };
}
export default function GuidePage({ params }: Props) {
	const guide = guides.find((item) => item.slug === params.slug);
	if (!guide) notFound();
	return (
		<Shell>
			<Breadcrumbs
				items={[
					{ name: "가이드", path: "/guides" },
					{ name: guide.title, path: `/guides/${guide.slug}` },
				]}
			/>
			<p className={styles.eyebrow}>WITHANALOG / FIELD NOTES</p>
			<h1 className={styles.title}>{guide.title}</h1>
			<p className={styles.lead}>{guide.answer}</p>
			<p className={styles.meta}>WithAnalog · 작성·자료 확인 {VERIFIED_DATE}</p>
			<div className={styles.prose}>
				{guide.sections.map((section) => (
					<section key={section.title}>
						<h2>{section.title}</h2>
						<p>{section.text}</p>
					</section>
				))}
				<h2>근거 자료</h2>
				<ul>
					{guide.sources.map((source) => (
						<li key={source.url}>
							<a href={source.url} target="_blank" rel="noopener noreferrer">
								{source.title} ↗
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.actions}>
				<Link className={styles.button} href={guide.tool}>
					{guide.toolLabel} ↗
				</Link>
				<Link className={styles.secondary} href="/keyboards">
					키보드 도감
				</Link>
				<Link className={styles.secondary} href="/methodology">
					측정 기준
				</Link>
			</div>
			<section className={styles.section}>
				<h2>관련 가이드</h2>
				<div className={styles.actions}>
					{guides
						.filter((item) => item.slug !== guide.slug)
						.map((item) => (
							<Link
								key={item.slug}
								href={`/guides/${item.slug}`}
								className={styles.textLink}
							>
								{item.title}
							</Link>
						))}
				</div>
			</section>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Article",
					headline: guide.title,
					description: guide.answer,
					datePublished: VERIFIED_DATE,
					dateModified: VERIFIED_DATE,
					inLanguage: "ko-KR",
					author: {
						"@type": "Organization",
						name: "WithAnalog",
						url: SITE_URL,
					},
					mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
					citation: guide.sources.map((source) => source.url),
				}}
			/>
		</Shell>
	);
}
