import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { pageMetadata, CONTACT_EMAIL, UPDATED_DATE } from "@/lib/seo";

export const metadata = pageMetadata(
	"/privacy",
	"개인정보처리방침",
	"WithAnalog가 수집하는 정보, 쿠키와 광고(Google AdSense)·분석(Google Analytics) 도구의 사용, 제휴 링크, 이용자의 권리와 문의처를 안내합니다.",
);

const EFFECTIVE_DATE = UPDATED_DATE;

export default function PrivacyPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "개인정보처리방침", path: "/privacy" }]} />
			<p className={styles.eyebrow}>PRIVACY POLICY</p>
			<h1 className={styles.title}>개인정보처리방침</h1>
			<p className={styles.lead}>
				WithAnalog(이하 「사이트」)는 회원가입 없이 이용하는 정보 제공
				사이트입니다. 이 방침은 사이트가 어떤 정보를 자동으로 수집하고, 어떤
				제3자 도구가 쿠키를 사용하는지, 이용자가 무엇을 선택할 수 있는지
				설명합니다.
			</p>
			<p className={styles.meta}>시행일 {EFFECTIVE_DATE}</p>
			<div className={styles.prose}>
				<h2>1. 수집하는 정보</h2>
				<p>
					사이트는 이름, 이메일, 전화번호 같은 개인정보를 직접 입력받는 양식을
					운영하지 않습니다. 이용자가 이메일로 문의를 보내는 경우에만 이메일
					주소와 문의 내용을 받으며, 답변과 오류 수정 목적으로만 사용하고 이후
					보관하지 않습니다.
				</p>
				<p>
					사이트를 방문하면 서버와 분석 도구가 다음 정보를 자동으로 수집할 수
					있습니다.
				</p>
				<ul>
					<li>접속 IP 주소(분석 도구에서는 익명화 처리), 브라우저와 운영체제 종류</li>
					<li>방문한 페이지, 방문 시각, 체류 시간, 유입 경로</li>
					<li>쿠키와 유사 기술로 생성되는 브라우저 식별자</li>
				</ul>
				<h2>2. 테스트 도구의 입력 데이터</h2>
				<p>
					키 입력 테스트, KPS 측정, 재입력 확인, 반응속도 테스트, 타자 연습은
					모두 이용자의 브라우저 안에서만 동작합니다. 누른 키, 입력 시각,
					측정 결과는 서버로 전송되거나 저장되지 않으며 페이지를 떠나면
					사라집니다. 타자 연습에서 입력한 문장도 전송하지 않습니다.
				</p>
				<p>
					일부 도구는 브라우저의 로컬 저장소에 테마 설정이나 소리 켜짐 여부
					같은 편의 설정을 저장할 수 있습니다. 이 값은 이용자의 기기에만
					남으며 사이트 운영자가 읽을 수 없습니다.
				</p>
				<h2>3. 쿠키와 제3자 도구</h2>
				<p>사이트는 다음 제3자 서비스를 사용하며, 각 서비스는 자체 쿠키를 설정할 수 있습니다.</p>
				<ul>
					<li>
						<strong>Google AdSense</strong>: 광고 게재에 사용합니다. Google을
						포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 이 사이트 또는
						다른 웹사이트 방문 기록을 기반으로 광고를 게재합니다. Google의
						광고 쿠키를 통해 Google과 파트너는 이용자의 방문 기록에 따라 광고를
						게재할 수 있습니다. 이용자는{" "}
						<a
							href="https://www.google.com/settings/ads"
							target="_blank"
							rel="noopener noreferrer"
						>
							Google 광고 설정
						</a>
						에서 맞춤 광고를 해제할 수 있으며,{" "}
						<a
							href="https://www.aboutads.info/choices/"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.aboutads.info
						</a>
						에서 다른 제3자 공급업체의 맞춤 광고 쿠키 사용을 해제할 수
						있습니다.
					</li>
					<li>
						<strong>Google Analytics / Google 태그 관리자</strong>: 방문 통계를
						집계합니다. IP 익명화가 적용되며 개인을 식별하는 데 사용하지
						않습니다.{" "}
						<a
							href="https://tools.google.com/dlpage/gaoptout"
							target="_blank"
							rel="noopener noreferrer"
						>
							Google Analytics 차단 브라우저 부가기능
						</a>
						으로 수집을 거부할 수 있습니다.
					</li>
				</ul>
				<p>
					Google이 데이터를 처리하는 방식은{" "}
					<a
						href="https://policies.google.com/technologies/partner-sites"
						target="_blank"
						rel="noopener noreferrer"
					>
						Google 파트너 사이트 데이터 사용 안내
					</a>
					에서 확인할 수 있습니다.
				</p>
				<h2>4. 제휴 링크</h2>
				<p>
					일부 제품 페이지의 구매 버튼은 쿠팡 파트너스 제휴 링크입니다. 링크를
					누르면 쿠팡으로 이동하며, 이후의 정보 수집은 쿠팡의 개인정보처리방침을
					따릅니다. 사이트는 이용자가 쿠팡에서 무엇을 구매했는지 개인 단위로
					알 수 없으며, 집계된 수수료 정보만 받습니다.
				</p>
				<h2>5. 쿠키를 거부하려면</h2>
				<p>
					브라우저 설정에서 쿠키 저장을 거부하거나 저장된 쿠키를 삭제할 수
					있습니다. 쿠키를 거부해도 도감, 비교표, 가이드, 테스트 도구는 모두
					정상적으로 이용할 수 있습니다. 다만 테마나 소리 설정은 유지되지
					않을 수 있습니다.
				</p>
				<h2>6. 이용자의 권리</h2>
				<p>
					이메일로 문의한 내용의 삭제를 요청하실 수 있습니다. 자동 수집
					정보는 개인을 식별하지 않는 형태로 집계되며, 이에 대한 열람·삭제
					요청은 각 제3자 서비스(Google)의 절차를 통해 처리됩니다. 사이트는
					만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.
				</p>
				<h2>7. 방침의 변경</h2>
				<p>
					이 방침이 바뀌면 이 페이지의 시행일을 갱신합니다. 중요한 변경이 있을
					경우 홈 화면에 안내를 게시합니다.
				</p>
				<h2>8. 문의</h2>
				<p>
					개인정보 관련 문의는 {CONTACT_EMAIL} 또는{" "}
					<Link href="/contact">문의 페이지</Link>를 이용해 주세요. 운영자
					정보는 <Link href="/about">소개 페이지</Link>에 있습니다.
				</p>
			</div>
		</Shell>
	);
}
