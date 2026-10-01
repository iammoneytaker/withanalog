import type { Metadata } from "next";

export const SITE_URL = "https://www.withanalog.com";
export const SITE_NAME = "WithAnalog";
/** 제품 도감 스펙·가격 확인일 */
export const VERIFIED_DATE = "2026-09-08";
/** 가이드·도구 설명 최종 수정일 */
export const UPDATED_DATE = "2026-10-01";
export const CONTACT_EMAIL = "sangwon2618@gmail.com";

/** 사이트 운영자·필자 정보. 가이드 바이라인과 Person 스키마에 사용합니다. */
export const AUTHOR = {
	name: "WithAnalog 운영자",
	role: "키보드 자료 정리 · 브라우저 입력 도구 개발",
	bio: "독거미 AULA와 지클릭커 키보드의 판매 페이지 공개 스펙과 실제로 확인할 수 있는 값을 구분해 정리합니다. 이 사이트의 키 입력·KPS·재입력 확인 도구를 직접 설계하고 개발했습니다.",
	path: "/about",
} as const;

export function pageMetadata(
	path: string,
	title: string,
	description: string,
): Metadata {
	const url = `${SITE_URL}${path}`;
	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: SITE_NAME,
			locale: "ko_KR",
			type: "website",
		},
		twitter: { card: "summary", title, description },
	};
}

export function personSchema() {
	return {
		"@type": "Person",
		name: AUTHOR.name,
		url: `${SITE_URL}${AUTHOR.path}`,
		jobTitle: AUTHOR.role,
	};
}

export function organizationSchema() {
	return {
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/images/og-image.png`,
		email: CONTACT_EMAIL,
	};
}
