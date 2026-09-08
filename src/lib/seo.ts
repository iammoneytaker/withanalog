import type { Metadata } from "next";

export const SITE_URL = "https://www.withanalog.com";
export const VERIFIED_DATE = "2026-09-08";

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
			siteName: "WithAnalog",
			locale: "ko_KR",
			type: "website",
		},
		twitter: { card: "summary", title, description },
	};
}
