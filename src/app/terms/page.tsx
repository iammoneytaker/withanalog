import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { pageMetadata, CONTACT_EMAIL, UPDATED_DATE } from "@/lib/seo";

export const metadata = pageMetadata(
	"/terms",
	"이용약관 · 면책 고지",
	"WithAnalog의 콘텐츠 이용 범위, 스펙·가격 정보의 정확성에 대한 한계, 테스트 도구 결과의 해석, 제휴 링크와 광고에 대한 고지를 안내합니다.",
);

export default function TermsPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "이용약관", path: "/terms" }]} />
			<p className={styles.eyebrow}>TERMS &amp; DISCLAIMER</p>
			<h1 className={styles.title}>이용약관과 면책 고지</h1>
			<p className={styles.lead}>
				이 사이트의 정보는 구매 판단을 돕기 위한 참고 자료이며, 제조사나
				판매처의 공식 안내를 대신하지 않습니다.
			</p>
			<p className={styles.meta}>시행일 {UPDATED_DATE}</p>
			<div className={styles.prose}>
				<h2>1. 정보의 정확성</h2>
				<p>
					제품 스펙은 각 페이지에 적힌 출처에서 확인일 기준으로 옮긴 값입니다.
					제조사는 사전 고지 없이 사양을 변경할 수 있고, 같은 모델명으로 다른
					변형이 판매될 수 있습니다. 가격은 확인 시점의 쿠팡 판매가이며 이후
					달라질 수 있습니다. 구매 전에는 반드시 판매 페이지에서 현재 사양과
					가격을 다시 확인하세요. 사이트는 정보 오류로 인한 구매 결과에
					책임지지 않지만, 오류 제보를 받으면 원문을 확인해 수정합니다.
				</p>
				<h2>2. 테스트 도구의 결과</h2>
				<p>
					키 입력, KPS, 재입력 확인, 반응속도, 타자 연습 도구의 결과는
					이용자의 브라우저가 받은 키 이벤트를 기준으로 계산한 값입니다.
					운영체제, 브라우저, 다른 실행 중인 프로그램, 사용자의 손 동작이 함께
					영향을 줍니다. 결과는 키보드 하드웨어의 성능을 인증하거나 제품 간
					우열을 판정하는 근거가 아니며, 불량 여부를 확정하는 용도로도 쓸 수
					없습니다.
				</p>
				<h2>3. 광고와 제휴 링크</h2>
				<p>
					사이트는 Google AdSense 광고를 게재하고, 일부 제품 페이지에 쿠팡
					파트너스 제휴 링크를 둡니다. 제휴 링크를 통해 구매하면 운영자가
					수수료를 받을 수 있으며 구매자가 추가로 부담하는 금액은 없습니다.
					광고와 제휴 수익은 본문의 서술과 제품 선정에 영향을 주지 않습니다.
					자세한 내용은 <Link href="/about">소개 페이지</Link>에 있습니다.
				</p>
				<h2>4. 콘텐츠 이용</h2>
				<p>
					사이트의 글, 표, 도구의 화면 구성과 코드는 운영자에게 저작권이
					있습니다. 출처(WithAnalog와 페이지 주소)를 밝히는 조건으로 비상업적
					인용은 자유롭게 할 수 있습니다. 표나 글을 통째로 옮기거나 상업적으로
					이용하려면 사전에 문의해 주세요. 제품명과 브랜드명은 각 권리자의
					소유이며, 사이트는 어떤 제조사·판매처와도 제휴 관계가 아닌 독립
					사이트입니다.
				</p>
				<h2>5. 외부 링크</h2>
				<p>
					출처 링크와 구매 링크는 외부 사이트로 연결됩니다. 외부 사이트의
					내용, 가격, 개인정보 처리에 대해서는 해당 사이트의 정책이 적용됩니다.
				</p>
				<h2>6. 약관의 변경과 문의</h2>
				<p>
					약관이 바뀌면 이 페이지의 시행일을 갱신합니다. 문의는 {CONTACT_EMAIL}{" "}
					또는 <Link href="/contact">문의 페이지</Link>를 이용해 주세요.
				</p>
			</div>
		</Shell>
	);
}
