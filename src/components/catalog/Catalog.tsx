"use client";

import { useState } from "react";
import { keyboards, priceBands, productTitle, productAlias } from "@/lib/keyboards";
import { ProductCard } from "./ProductCard";
import styles from "./catalog.module.css";

const brands = ["전체", "독거미 AULA", "지클릭커"] as const;

export function Catalog() {
	const [query, setQuery] = useState("");
	const [brand, setBrand] = useState<(typeof brands)[number]>("전체");
	const [layout, setLayout] = useState("전체");
	const [band, setBand] = useState("전체");
	const normalized = query.toLowerCase().replace(/\s/g, "");
	const priceBand =
		priceBands.find((value) => value.label === band) ?? priceBands[0];
	const products = keyboards.filter(
		(product) =>
			`${productTitle(product)}${productAlias(product)}`
				.replace(/\s/g, "")
				.toLowerCase()
				.includes(normalized) &&
			(brand === "전체" ||
				(brand === "독거미 AULA"
					? product.brand === "AULA"
					: product.brand === "지클릭커")) &&
			(layout === "전체" || product.layout === layout) &&
			product.price >= priceBand.min &&
			product.price < priceBand.max,
	);
	return (
		<>
			<div className={styles.actions} role="tablist" aria-label="브랜드 선택">
				{brands.map((value) => (
					<button
						key={value}
						role="tab"
						aria-selected={brand === value}
						className={brand === value ? styles.button : styles.secondary}
						onClick={() => setBrand(value)}
					>
						{value}
					</button>
				))}
			</div>
			<div className={styles.filters}>
				<label className={styles.field}>
					모델 검색
					<input
						type="search"
						placeholder="F75, XRT68, 독거미…"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</label>
				<label className={styles.field}>
					배열
					<select
						value={layout}
						onChange={(event) => setLayout(event.target.value)}
					>
						{["전체", "65%", "75%", "컴팩트", "TKL", "숫자패드형"].map(
							(value) => (
								<option key={value}>{value}</option>
							),
						)}
					</select>
				</label>
				<label className={styles.field}>
					가격대
					<select value={band} onChange={(event) => setBand(event.target.value)}>
						{priceBands.map((value) => (
							<option key={value.label}>{value.label}</option>
						))}
					</select>
				</label>
			</div>
			<p className={styles.meta} role="status">
				{products.length}개 모델 · 브랜드·판매처 공개 사양 기준 · 가격은 쿠팡
				확인가
			</p>
			<div className={styles.grid}>
				{products.map((product) => (
					<ProductCard key={product.slug} product={product} />
				))}
			</div>
			{products.length === 0 && (
				<div className={styles.empty}>
					<p>조건에 맞는 모델이 없습니다.</p>
					<button
						className={styles.secondary}
						onClick={() => {
							setQuery("");
							setBrand("전체");
							setLayout("전체");
							setBand("전체");
						}}
					>
						필터 초기화
					</button>
				</div>
			)}
		</>
	);
}
