import { createClient } from "@supabase/supabase-js";
import type { AffiliateDatabase } from "@/lib/affiliate-links";
import { validAffiliateUrl } from "@/lib/affiliate-links";
import styles from "./catalog.module.css";

export async function PurchaseLink({
	slug,
	model,
}: {
	readonly slug: string;
	readonly model: string;
}) {
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
		<section className={styles.cta} aria-label="쿠팡 구매 링크">
			<h2>{model}, 직접 확인해 보세요</h2>
			<p>
				위 스펙과 출처를 확인하셨다면, 현재 판매 중인 옵션과 가격은 쿠팡 판매
				페이지에서 볼 수 있습니다.
			</p>
			<a
				href={data.affiliate_url}
				target="_blank"
				rel="sponsored nofollow noopener noreferrer"
				className={styles.ctaButton}
			>
				쿠팡에서 {model} 가격 확인하기 ↗
			</a>
			<p className={styles.ctaMeta}>
				{data.variant} · 링크 확인일 {data.checked_on}
			</p>
			<p className={styles.ctaDisclosure}>
				이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
				제공받습니다. 구매 가격에는 영향이 없습니다.
			</p>
		</section>
	);
}
