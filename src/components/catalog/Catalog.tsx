"use client";

import { useState } from "react";
import { keyboards } from "@/lib/keyboards";
import { ProductCard } from "./ProductCard";
import styles from "./catalog.module.css";

export function Catalog() {
	const [query, setQuery] = useState("");
	const [layout, setLayout] = useState("전체");
	const normalized = query.toLowerCase().replace(/\s/g, "");
	const products = keyboards.filter(
		(product) =>
			`독거미aula${product.model}`
				.replace(/\s/g, "")
				.toLowerCase()
				.includes(normalized) &&
			(layout === "전체" || product.layout === layout),
	);
	return (
		<>
			<div className={styles.filters}>
				<label className={styles.field}>
					모델 검색
					<input
						type="search"
						placeholder="F75, F99, 독거미…"
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
						{["전체", "65%", "75%", "TKL", "숫자패드형"].map((value) => (
							<option key={value}>{value}</option>
						))}
					</select>
				</label>
			</div>
			<p className={styles.meta} role="status">
				{products.length}개 모델 · AULA Gear 글로벌 판매 사양 기준
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
							setLayout("전체");
						}}
					>
						필터 초기화
					</button>
				</div>
			)}
		</>
	);
}
