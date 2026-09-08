"use client";

import Link from "next/link";
import { useState } from "react";
import { keyboards, productFacts } from "@/lib/keyboards";
import styles from "./catalog.module.css";

type Props = { readonly initialSlugs: readonly string[] };
export function Comparison({ initialSlugs }: Props) {
	const [slugs, setSlugs] = useState<readonly string[]>(initialSlugs);
	const [differences, setDifferences] = useState(false);
	const [message, setMessage] = useState("");
	const products = slugs.flatMap((slug) =>
		keyboards.filter((product) => product.slug === slug),
	);
	const rows = productFacts(keyboards[0]).map((fact, index) => ({
		label: fact.label,
		facts: products.map((product) => productFacts(product)[index]),
	}));
	function update(next: readonly string[]) {
		setSlugs(next);
		const url = new URL(window.location.href);
		url.pathname = "/compare";
		url.search = "";
		url.searchParams.set("models", next.join(","));
		window.history.replaceState(null, "", url);
		setMessage("");
	}
	async function copyLink() {
		const url = new URL("/compare", window.location.origin);
		url.searchParams.set("models", slugs.join(","));
		try {
			await navigator.clipboard.writeText(url.href);
			setMessage("비교 주소를 복사했습니다.");
		} catch (error) {
			if (error instanceof Error)
				setMessage(`주소창에서 복사해 주세요: ${url.href}`);
			else throw error;
		}
	}
	return (
		<>
			<div className={styles.filters}>
				{products.map((product, index) => (
					<label className={styles.field} key={index}>
						제품 {index + 1}
						<select
							value={product.slug}
							onChange={(event) =>
								update(
									slugs.map((slug, position) =>
										position === index ? event.target.value : slug,
									),
								)
							}
						>
							{keyboards.map((option) => (
								<option
									key={option.slug}
									value={option.slug}
									disabled={
										slugs.includes(option.slug) && option.slug !== product.slug
									}
								>
									AULA {option.model}
								</option>
							))}
						</select>
					</label>
				))}
			</div>
			<div className={styles.actions}>
				<label className={styles.check}>
					<input
						type="checkbox"
						checked={differences}
						onChange={(event) => setDifferences(event.target.checked)}
					/>
					차이만 보기
				</label>
				{products.length < 4 && (
					<button
						className={styles.secondary}
						onClick={() => {
							const next = keyboards.find(
								(product) => !slugs.includes(product.slug),
							);
							if (next) update([...slugs, next.slug]);
						}}
					>
						제품 추가
					</button>
				)}
				{products.length > 2 && (
					<button
						className={styles.secondary}
						onClick={() => update(slugs.slice(0, -1))}
					>
						마지막 제품 제거
					</button>
				)}
				<button className={styles.secondary} onClick={copyLink}>
					비교 주소 복사
				</button>
			</div>
			<p className={styles.meta} role="status">
				{message ||
					`${products.length}개 모델 비교 · 가로로 스크롤해 모든 항목을 확인하세요.`}
			</p>
			<div
				className={styles.tableWrap}
				tabIndex={0}
				role="region"
				aria-label="제품 비교표"
			>
				<table className={styles.table}>
					<caption>독거미 공개 스펙 비교 · 독립 실측 순위가 아닙니다</caption>
					<thead>
						<tr>
							<th scope="col">비교 항목</th>
							{products.map((product) => (
								<th scope="col" key={product.slug}>
									<Link href={`/keyboards/${product.slug}`}>
										AULA {product.model} ↗
									</Link>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows
							.filter(
								(row) =>
									!differences ||
									new Set(row.facts.map((fact) => fact.value)).size > 1,
							)
							.map((row) => (
								<tr key={row.label}>
									<th scope="row">{row.label}</th>
									{row.facts.map((fact, index) => (
										<td key={products[index].slug}>
											{fact.value}
											{fact.note && <small>{fact.note}</small>}
										</td>
									))}
								</tr>
							))}
						<tr>
							<th scope="row">출처</th>
							{products.map((product) => (
								<td key={product.slug}>
									<a
										href={product.source}
										target="_blank"
										rel="noopener noreferrer"
									>
										AULA Gear 원문 ↗
									</a>
									<small>{product.scope}</small>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<div className={styles.note}>
				공개되지 않은 수치는 추정하지 않습니다. 연결 모드·펌웨어·측정법이 다른
				수치를 섞어 성능 순위를 만들지 않습니다. F75 MAX 지연 수치는 판매처
				공개값입니다.
			</div>
		</>
	);
}
