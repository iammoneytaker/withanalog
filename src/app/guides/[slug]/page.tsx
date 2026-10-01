import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import { guides, findGuide } from "@/lib/guides";
import { findKeyboard, productAlias } from "@/lib/keyboards";
import {
	pageMetadata,
	SITE_URL,
	AUTHOR,
	personSchema,
	organizationSchema,
} from "@/lib/seo";

type Props = { readonly params: { readonly slug: string } };

export function generateStaticParams() {
	return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: Props) {
	const guide = findGuide(params.slug);
	return guide
		? pageMetadata(`/guides/${guide.slug}`, guide.title, guide.description)
		: { title: "가이드를 찾을 수 없습니다", robots: { index: false } };
}

function sectionId(index: number) {
	return `section-${index + 1}`;
}

export default function GuidePage({ params }: Props) {
	const guide = findGuide(params.slug);
	if (!guide) notFound();
	const related = guide.relatedKeyboards
		.map((slug) => findKeyboard(slug))
		.filter((product): product is NonNullable<typeof product> => !!product);
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
			<p className={styles.meta}>
				글 <Link href={AUTHOR.path}>{AUTHOR.name}</Link> · {AUTHOR.role}
				<br />
				작성 {guide.published} · 최종 수정 {guide.updated}
			</p>
			<div className={styles.prose}>
				<nav aria-label="목차" className={styles.note}>
					<strong>이 글에서 다루는 내용</strong>
					<ol>
						{guide.sections.map((section, index) => (
							<li key={section.title}>
								<a href={`#${sectionId(index)}`}>{section.title}</a>
							</li>
						))}
						{guide.faq.length > 0 && (
							<li>
								<a href="#faq">자주 묻는 질문</a>
							</li>
						)}
					</ol>
				</nav>
				{guide.sections.map((section, index) => (
					<section key={section.title} id={sectionId(index)}>
						<h2>{section.title}</h2>
						{section.paragraphs.map((paragraph, paragraphIndex) => (
							<p key={paragraphIndex}>{paragraph}</p>
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
				{guide.faq.length > 0 && (
					<section id="faq">
						<h2>자주 묻는 질문</h2>
						{guide.faq.map((item) => (
							<details key={item.question}>
								<summary>{item.question}</summary>
								<p>{item.answer}</p>
							</details>
						))}
					</section>
				)}
				{related.length > 0 && (
					<section>
						<h2>이 글에서 언급한 모델</h2>
						<ul>
							{related.map((product) => (
								<li key={product.slug}>
									<Link href={`/keyboards/${product.slug}`}>
										{productAlias(product)}
									</Link>{" "}
									· {product.layout} · {product.keys}키 · {product.switchType}
								</li>
							))}
						</ul>
					</section>
				)}
				<section>
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
				</section>
				<p className={styles.meta}>
					이 글은 공개된 판매 사양과 브라우저에서 확인 가능한 동작을 바탕으로
					작성했습니다. 측정 장비가 필요한 값은 직접 측정하지 않았으며, 그런
					값은 본문에서 「판매처 공개값」 또는 「미확인」으로 구분합니다. 오류를
					발견하셨다면 <Link href="/contact">문의 페이지</Link>로 알려주세요.
				</p>
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
					description: guide.description,
					datePublished: guide.published,
					dateModified: guide.updated,
					inLanguage: "ko-KR",
					author: personSchema(),
					publisher: organizationSchema(),
					mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
					citation: guide.sources.map((source) => source.url),
				}}
			/>
		</Shell>
	);
}
