import { createClient } from "@supabase/supabase-js";
import type { AffiliateDatabase } from "@/lib/affiliate-links";
import { validAffiliateUrl } from "@/lib/affiliate-links";
import styles from "./catalog.module.css";

export async function PurchaseLink({ slug }: { readonly slug: string }) {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !key) return null;
	const client = createClient<AffiliateDatabase>(url, key, {
		auth: { persistSession: false },
		global: {
			fetch: (input, init) =>
				fetch(input, { ...init, next: { revalidate: 60 } }),
		},
	});
	const { data, error } = await client
		.from("keyboard_affiliate_links")
		.select("*")
		.eq("model_slug", slug)
		.eq("enabled", true)
		.maybeSingle();
	if (error || !data || !validAffiliateUrl(data.affiliate_url)) return null;
	return (
		<aside className={styles.note} aria-label="쿠팡 제휴 안내">
			<p>
				이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
				제공받습니다.
			</p>
			<div className={styles.actions}>
				<a
					href={data.affiliate_url}
					target="_blank"
					rel="sponsored nofollow noopener noreferrer"
					className={styles.button}
				>
					쿠팡에서 보기 · 제휴 링크
				</a>
			</div>
			<p>
				{data.variant} · 확인일 {data.checked_on}
			</p>
			<p className={styles.meta}>
				현재 가격·재고와 선택 옵션은 판매 페이지에서 확인하세요.
			</p>
		</aside>
	);
}
