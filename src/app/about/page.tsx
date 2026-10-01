import Link from "next/link";
import { Shell, styles, Breadcrumbs, JsonLd } from "@/components/catalog/Shell";
import { keyboards } from "@/lib/keyboards";
import { guides } from "@/lib/guides";
import {
	pageMetadata,
	AUTHOR,
	CONTACT_EMAIL,
	SITE_URL,
	VERIFIED_DATE,
	UPDATED_DATE,
	organizationSchema,
	personSchema,
} from "@/lib/seo";

export const metadata = pageMetadata(
	"/about",
	"WithAnalog 소개 · 누가, 왜, 어떻게 만드는가",
	"WithAnalog는 독거미 AULA·지클릭커 키보드의 공개 스펙을 출처와 함께 정리하고 브라우저 키 입력 도구를 제공하는 개인 운영 사이트입니다. 운영자, 자료 수집 방식, 수익 구조를 공개합니다.",
);

export default function AboutPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "소개", path: "/about" }]} />
			<p className={styles.eyebrow}>ABOUT / WHO · HOW · WHY</p>
			<h1 className={styles.title}>
				숫자 뒤의 출처를
				<br />
				같이 보여주는 사이트.
			</h1>
			<p className={styles.lead}>
				WithAnalog는 키보드를 고를 때 마주치는 숫자를 어디서 가져왔는지, 무엇을
				뜻하는지, 무엇은 아직 모르는지 구분해서 보여주는 개인 운영 사이트입니다.
			</p>
			<p className={styles.meta}>
				운영자 {AUTHOR.name} · 최종 수정 {UPDATED_DATE}
			</p>
			<div className={styles.prose}>
				<h2>누가 만드나요</h2>
				<p>
					이 사이트는 한 명의 개발자가 직접 기획하고 개발하며 운영합니다.{" "}
					{AUTHOR.bio} 광고 대행사나 판매처의 의뢰를 받아 글을 쓰지 않으며,
					제품 제공이나 원고료를 받은 적이 없습니다. 그런 일이 생기면 해당
					페이지 상단에 명시합니다.
				</p>
				<p>
					본업은 웹과 모바일 앱 개발입니다. 키보드를 전문적으로 측정하는
					연구소가 아니기 때문에, 측정 장비가 필요한 입력 지연 같은 값은 직접
					측정했다고 주장하지 않습니다. 대신 브라우저에서 확인할 수 있는 것은
					도구로 만들고, 확인할 수 없는 것은 확인할 수 없다고 씁니다.
				</p>
				<h2>왜 만들었나요</h2>
				<p>
					독거미 AULA 키보드를 고르려고 찾아볼 때 F75, F87, F99처럼 비슷한 이름 사이의
					차이를 한눈에 비교하는 자료를 찾기 어려웠습니다. 판매 페이지마다
					표기가 다르고, 커뮤니티 글은 어떤 변형을 기준으로 말하는지 알 수
					없었습니다. 그래서 공개된 사양을 모델별로 같은 틀에 정리하고, 어느
					페이지에서 언제 확인했는지를 함께 적기 시작했습니다.
				</p>
				<p>
					두 번째 이유는 「반응속도」라는 말이 너무 여러 뜻으로 쓰인다는
					점입니다. 사람의 반응시간, 키를 눌렀다 떼는 시간, 키보드 하드웨어의
					입력 지연은 전혀 다른 값인데 한 단어로 섞여 쓰입니다. 이 사이트의
					가이드와 도구는 그 구분을 분명히 하는 데 목적이 있습니다.
				</p>
				<h2>무엇을 제공하나요</h2>
				<ul>
					<li>
						<Link href="/keyboards">키보드 도감</Link>: 독거미 AULA {" "}
						{keyboards.filter((k) => k.brand === "AULA").length}개 모델과
						지클릭커 {keyboards.filter((k) => k.brand !== "AULA").length}개
						모델의 배열, 키 수, 연결 방식, 배터리, 공개 폴링레이트, 쿠팡
						확인가를 출처 링크와 확인일({VERIFIED_DATE})과 함께 정리합니다.
					</li>
					<li>
						<Link href="/compare">비교표</Link>: 최대 4개 모델을 같은 항목으로
						나란히 봅니다. 출처가 다른 값은 섞지 않습니다.
					</li>
					<li>
						<Link href="/tools">브라우저 테스트 도구</Link>: 키 인식·동시입력,
						10초 KPS, 재입력 순서 확인, 사람 반응속도, 타자 연습을 직접
						만들었습니다. 모두 브라우저가 받은 키 이벤트를 기준으로 하며,
						하드웨어 성능을 인증하는 도구가 아닙니다.
					</li>
					<li>
						<Link href="/guides">가이드</Link>: {guides.length}편의 글에서 입력
						지연, 폴링레이트, KPS, 래피드 트리거, 동시입력의 뜻과 한계를
						설명합니다.
					</li>
					<li>
						<Link href="/methodology">측정 기준</Link>: 공개 스펙, 판매처 주장,
						독립 실측, 사용자 기록을 어떻게 구분하는지 적어 두었습니다.
					</li>
				</ul>
				<h2>자료는 어떻게 모으나요</h2>
				<p>
					제품 스펙은 브랜드 공식 판매 페이지(AULA Gear, 지클릭커 공식몰)에서
					직접 읽고 옮깁니다. 각 제품 페이지에 원문 링크와 확인일을 적고, 같은
					모델명이라도 MAX·PRO·지역판처럼 변형이 다르면 별도 모델로 다룹니다.
					원문끼리 표기가 충돌하면 한쪽을 고르지 않고 차이를 그대로 설명합니다.
				</p>
				<p>
					가격은 쿠팡 판매 페이지에서 확인한 시점의 값이며 확인일을 함께
					표기합니다. 판매 옵션과 시점에 따라 달라지므로 구매 전 반드시 판매
					페이지에서 다시 확인하세요. 지연 수치처럼 측정 조건이 필요한 값은
					판매처가 공개했더라도 「판매처 공개값」으로 표시하고 순위에 쓰지
					않습니다.
				</p>
				<p>
					글을 쓰는 과정에서 초안 정리와 문장 다듬기에 AI 도구를 사용하기도
					합니다. 다만 모든 수치와 출처는 운영자가 원문을 직접 확인하고,
					확인하지 못한 값은 「미확인」으로 남깁니다.
				</p>
				<h2>수익은 어디서 나오나요</h2>
				<p>
					이 사이트는 두 가지 방식으로 운영비를 충당합니다. 첫째, 일부 제품
					페이지의 쿠팡 구매 링크는 쿠팡 파트너스 제휴 링크입니다. 이 링크로
					구매가 이루어지면 운영자가 일정 수수료를 받으며, 구매자가 더 내는
					금액은 없습니다. 제휴 링크는 해당 버튼 옆에 표시하며 본문 서술에는
					영향을 주지 않습니다. 둘째, Google AdSense 광고를 게재합니다. 광고
					게재 여부와 위치는 글의 내용이나 평가와 무관합니다.
				</p>
				<p>
					어떤 제품을 좋게 쓰면 수수료가 더 나오는 구조이기 때문에, 이 사이트는
					애초에 「추천 순위」를 매기지 않는 방식을 택했습니다. 비교에 필요한
					사실을 출처와 함께 나열하고 판단은 읽는 분께 맡깁니다.
				</p>
				<h2>오류를 발견하셨나요</h2>
				<p>
					틀린 수치, 깨진 출처 링크, 바뀐 판매 사양을 알려주시면 원문을 확인한
					뒤 수정하고 수정일을 갱신합니다. <Link href="/contact">문의 페이지</Link>
					나 {CONTACT_EMAIL} 로 보내주세요.
				</p>
			</div>
			<div className={styles.actions}>
				<Link className={styles.button} href="/keyboards">
					키보드 도감 보기 ↗
				</Link>
				<Link className={styles.secondary} href="/methodology">
					측정 기준
				</Link>
				<Link className={styles.secondary} href="/contact">
					문의하기
				</Link>
			</div>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "AboutPage",
					name: "WithAnalog 소개",
					url: `${SITE_URL}/about`,
					inLanguage: "ko-KR",
					dateModified: UPDATED_DATE,
					mainEntity: {
						...organizationSchema(),
						founder: personSchema(),
					},
				}}
			/>
		</Shell>
	);
}
