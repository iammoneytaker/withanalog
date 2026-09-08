"use client";
import { useState } from "react";
import type { AffiliateLink } from "@/lib/affiliate-links";
import { keyboards, productTitle } from "@/lib/keyboards";
import { saveAffiliateLink } from "./actions";
import styles from "@/components/catalog/catalog.module.css";

export function LinkEditor({
	links,
}: {
	readonly links: readonly AffiliateLink[];
}) {
	return (
		<div>
			{keyboards.map((product) => (
				<LinkForm
					key={product.slug}
					slug={product.slug}
					model={productTitle(product)}
					saved={links.find((link) => link.model_slug === product.slug)}
				/>
			))}
		</div>
	);
}
function LinkForm({
	slug,
	model,
	saved,
}: {
	readonly slug: string;
	readonly model: string;
	readonly saved?: AffiliateLink;
}) {
	const [message, setMessage] = useState("");
	const [saving, setSaving] = useState(false);
	return (
		<form
			className={styles.section}
			onSubmit={async (event) => {
				event.preventDefault();
				setSaving(true);
				const form = new FormData(event.currentTarget);
				try {
					const result = await saveAffiliateLink(form);
					setMessage(result.message);
				} catch {
					setMessage("저장하지 못했습니다. 잠시 후 다시 시도하세요.");
				} finally {
					setSaving(false);
				}
			}}
		>
			<h2>{model}</h2>
			<input name="model_slug" type="hidden" value={slug} />
			<div className={styles.filters}>
				<label className={styles.field}>
					쿠팡 파트너스 링크
					<input
						type="url"
						name="affiliate_url"
						defaultValue={saved?.affiliate_url ?? ""}
						placeholder="https://link.coupang.com/a/…"
						disabled={saving}
					/>
				</label>
				<label className={styles.field}>
					판매 옵션
					<input
						name="variant"
						maxLength={200}
						defaultValue={saved?.variant ?? ""}
						placeholder="국내판 / 스위치 / 색상"
						disabled={saving}
					/>
				</label>
				<label className={styles.field}>
					확인일
					<input
						type="date"
						name="checked_on"
						defaultValue={saved?.checked_on ?? ""}
						disabled={saving}
					/>
				</label>
			</div>
			<div className={styles.actions}>
				<label className={styles.check}>
					<input
						type="checkbox"
						name="enabled"
						defaultChecked={saved?.enabled ?? false}
						disabled={saving}
					/>
					구매 링크 공개
				</label>
				<button className={styles.button} disabled={saving}>
					{saving ? "저장 중…" : "저장"}
				</button>
			</div>
			<p role="status" className={styles.meta}>
				{message ||
					(saved
						? `최근 수정 ${new Date(saved.updated_at).toLocaleString("ko-KR")}`
						: "등록된 링크 없음")}
			</p>
		</form>
	);
}
