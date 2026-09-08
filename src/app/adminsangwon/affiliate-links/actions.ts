"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { findKeyboard } from "@/lib/keyboards";
import {
	validAffiliateUrl,
	type AffiliateDatabase,
} from "@/lib/affiliate-links";

export async function saveAffiliateLink(
	form: FormData,
): Promise<{ ok: boolean; message: string }> {
	const client = createServerActionClient<AffiliateDatabase>({ cookies });
	const {
		data: { user },
	} = await client.auth.getUser();
	if (!user) return { ok: false, message: "로그인이 필요합니다." };
	const { data: admin, error: adminError } = await client
		.from("keyboard_link_admins")
		.select("user_id")
		.eq("user_id", user.id)
		.maybeSingle();
	if (adminError || !admin)
		return { ok: false, message: "제휴 링크 관리 권한이 없습니다." };
	const slug = String(form.get("model_slug") ?? "");
	const url = String(form.get("affiliate_url") ?? "").trim();
	const variant = String(form.get("variant") ?? "").trim();
	const enabled = form.get("enabled") === "on";
	const checked = String(form.get("checked_on") ?? "");
	if (
		!findKeyboard(slug) ||
		(url && !validAffiliateUrl(url)) ||
		variant.length > 200 ||
		(checked &&
			(!/^\d{4}-\d{2}-\d{2}$/.test(checked) ||
				!Number.isFinite(Date.parse(checked)))) ||
		(enabled && (!url || !variant || !checked))
	)
		return {
			ok: false,
			message: "모델·쿠팡 파트너스 URL·판매 옵션·확인일을 확인하세요.",
		};
	const { error } = await client
		.from("keyboard_affiliate_links")
		.upsert({
			model_slug: slug,
			affiliate_url: url,
			variant,
			enabled,
			checked_on: checked || null,
			updated_at: new Date().toISOString(),
		});
	if (error)
		return {
			ok: false,
			message: "저장하지 못했습니다. 연결과 입력값을 확인하세요.",
		};
	revalidatePath(`/keyboards/${slug}`);
	revalidatePath("/adminsangwon/affiliate-links");
	return { ok: true, message: "저장했습니다. 제품 페이지에 반영됩니다." };
}
