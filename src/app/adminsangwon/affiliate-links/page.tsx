import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { AffiliateDatabase } from "@/lib/affiliate-links";
import { Shell, styles } from "@/components/catalog/Shell";
import { LinkEditor } from "./LinkEditor";
export const dynamic = "force-dynamic";
export default async function AffiliateAdmin() {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	)
		return (
			<Shell>
				<h1 className={styles.title}>제휴 링크 관리</h1>
				<p className={styles.note}>
					데이터베이스 연결 설정이 필요합니다. 연결 전에는 링크를 저장하거나
					공개할 수 없습니다.
				</p>
			</Shell>
		);
	const client = createServerComponentClient<AffiliateDatabase>({ cookies });
	const {
		data: { user },
	} = await client.auth.getUser();
	if (!user) redirect("/adminsangwon/login");
	const { data: admin } = await client
		.from("keyboard_link_admins")
		.select("user_id")
		.eq("user_id", user.id)
		.maybeSingle();
	if (!admin)
		return (
			<Shell>
				<h1 className={styles.title}>관리자 권한이 필요합니다</h1>
				<p className={styles.note}>
					현재 계정에는 제휴 링크 관리 권한이 없습니다.
				</p>
				<Link href="/adminsangwon/login">다른 계정으로 로그인</Link>
			</Shell>
		);
	const { data, error } = await client
		.from("keyboard_affiliate_links")
		.select("*")
		.order("model_slug");
	return (
		<Shell>
			<p className={styles.eyebrow}>ADMIN / AFFILIATE LINKS</p>
			<h1 className={styles.title}>제품별 구매 링크 관리</h1>
			<p className={styles.lead}>
				파트너스에서 생성한 링크를 그대로 저장하세요. 판매 옵션과 모델이
				일치하는지 확인한 후 공개합니다. 중지하면 제품 페이지의 구매 버튼이
				사라집니다.
			</p>
			<Link className={styles.textLink} href="/adminsangwon/projects">
				기존 프로젝트 관리 ↗
			</Link>
			{error ? (
				<p role="alert" className={styles.note}>
					링크 목록을 불러오지 못했습니다. DB 연결과 테이블 설치 상태를
					확인하세요.
				</p>
			) : (
				<LinkEditor links={data ?? []} />
			)}
		</Shell>
	);
}
