import Link from "next/link";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import {
	pageMetadata,
	CONTACT_EMAIL,
	SITE_URL,
	organizationSchema,
} from "@/lib/seo";

export const metadata = pageMetadata(
	"/contact",
	"문의 · 오류 제보",
	"스펙 오류, 깨진 출처 링크, 바뀐 판매 사양, 도구 버그를 알려주세요. 이메일로 접수하며 원문을 확인한 뒤 수정하고 수정일을 갱신합니다.",
);

export default function ContactPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "문의", path: "/contact" }]} />
			<p className={styles.eyebrow}>CONTACT</p>
			<h1 className={styles.title}>
				틀린 숫자를 보셨다면
				<br />
				알려주세요.
			</h1>
			<p className={styles.lead}>
				이 사이트는 한 명이 운영합니다. 제보는 이메일로 받고, 출처를 확인한
				뒤 해당 페이지를 고치고 수정일을 갱신합니다.
			</p>
			<div className={styles.prose}>
				<h2>이메일</h2>
				<p>
					<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
				</p>
				<p>
					보통 2~3일 안에 답장합니다. 답장이 필요 없는 단순 제보라면 그렇게
					적어주셔도 됩니다.
				</p>
				<h2>이런 내용을 보내주시면 바로 반영합니다</h2>
				<ul>
					<li>도감 수치가 출처 원문과 다른 경우: 페이지 주소와 원문 화면이나 링크</li>
					<li>출처 링크가 깨졌거나 판매 페이지의 사양이 바뀐 경우</li>
					<li>같은 모델명의 다른 변형(지역판·PRO·MAX)이 섞인 것으로 보이는 경우</li>
					<li>테스트 도구가 특정 브라우저나 키보드에서 동작하지 않는 경우: 브라우저와 운영체제 버전, 키보드 모델</li>
					<li>가이드의 설명이 사실과 다르거나 근거가 부족한 경우</li>
				</ul>
				<h2>받지 않는 요청</h2>
				<p>
					특정 제품을 추천 순위에 올려 달라는 요청, 원고료나 제품 제공을 조건으로
					한 리뷰 요청, 출처 없는 성능 수치 등록 요청은 받지 않습니다. 이
					사이트가 순위를 매기지 않는 이유는 <Link href="/about">소개</Link>와{" "}
					<Link href="/methodology">측정 기준</Link>에 적어 두었습니다.
				</p>
				<h2>제휴·광고 문의</h2>
				<p>
					사이트에는 Google AdSense 광고와 쿠팡 파트너스 링크만 있습니다. 그 외의
					광고 게재나 제휴 제안은 같은 이메일로 보내주시되, 본문 서술에 영향을
					주는 조건은 수락하지 않습니다.
				</p>
			</div>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ContactPage",
					name: "WithAnalog 문의",
					url: `${SITE_URL}/contact`,
					inLanguage: "ko-KR",
					mainEntity: {
						...organizationSchema(),
						contactPoint: {
							"@type": "ContactPoint",
							email: CONTACT_EMAIL,
							contactType: "customer support",
							availableLanguage: "ko",
						},
					},
				}}
			/>
		</Shell>
	);
}
