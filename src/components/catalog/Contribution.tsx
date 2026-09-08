"use client";
import { useState } from "react";
import { keyboards } from "@/lib/keyboards";
import styles from "./catalog.module.css";
export function Contribution({
	initialModel,
}: {
	readonly initialModel: string;
}) {
	const [saved, setSaved] = useState(false);
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				const data = new FormData(event.currentTarget);
				const report = {
					model: data.get("model"),
					source: data.get("source"),
					details: data.get("details"),
					createdAt: new Date().toISOString(),
					status: "local-draft",
				};
				const url = URL.createObjectURL(
					new Blob([JSON.stringify(report, null, 2)], {
						type: "application/json",
					}),
				);
				const anchor = document.createElement("a");
				anchor.href = url;
				anchor.download = "withanalog-correction.json";
				anchor.click();
				URL.revokeObjectURL(url);
				setSaved(true);
			}}
		>
			<div className={styles.filters}>
				<label className={styles.field}>
					대상 모델
					<select name="model" defaultValue={initialModel}>
						{keyboards.map((product) => (
							<option key={product.slug} value={product.slug}>
								AULA {product.model}
							</option>
						))}
					</select>
				</label>
				<label className={styles.field}>
					근거 URL
					<input name="source" type="url" required placeholder="https://…" />
				</label>
			</div>
			<label className={styles.field}>
				변형·수정 내용·측정 조건
				<textarea
					name="details"
					required
					minLength={20}
					placeholder="모델 변형, 현재 표기와 다른 내용, 원문 위치를 적어 주세요. 실측이라면 장비·펌웨어·연결·표본 수를 포함해 주세요."
				/>
			</label>
			<div className={styles.actions}>
				<button className={styles.button} type="submit">
					정정 자료 파일로 저장
				</button>
			</div>
			<p role="status" className={styles.meta}>
				{saved
					? "파일을 저장했습니다. 서버 제출이나 공개는 이루어지지 않았습니다."
					: "작성 내용은 서버로 전송하지 않습니다. 개인 정보나 비밀번호를 넣지 마세요."}
			</p>
		</form>
	);
}
