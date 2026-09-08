import Link from "next/link";
import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
	"/methodology",
	"키보드 측정 방법과 데이터 출처·편집 기준",
	"공개 스펙, 판매처 주장, 독립 실측과 사용자 기록을 구분합니다. 키보드 비교의 조건과 미확인 데이터 처리 기준을 확인하세요.",
);
export default function MethodologyPage() {
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "측정 기준", path: "/methodology" }]} />
			<p className={styles.eyebrow}>METHODOLOGY / 1.0</p>
			<h1 className={styles.title}>
				비교의 시작은
				<br />
				측정의 조건입니다.
			</h1>
			<p className={styles.lead}>
				WithAnalog는 키보드 자료를 정리하고 브라우저 입력 도구를 제공합니다.
				현재 제품 도감에는 독립 실측 데이터가 없으며, 공개 스펙을 실측처럼
				소개하지 않습니다.
			</p>
			<div className={styles.prose}>
				<h2>데이터를 어떻게 구분하나요?</h2>
				<ul>
					<li>
						공개 스펙: 브랜드·판매 페이지에 기재된 값. 확인일과 적용 변형을
						표시합니다.
					</li>
					<li>
						판매처 성능 주장: 지연처럼 시험 조건이 필요한 값. 장비·표본·펌웨어가
						불명확하면 순위에 사용하지 않습니다.
					</li>
					<li>
						독립 실측: 측정법·환경·원본 근거가 확보된 별도 시험 결과. 현재
						미등록입니다.
					</li>
					<li>
						사용자 기록: 사용자와 브라우저 환경이 포함된 입력 기록. 모델 고유
						성능으로 집계하지 않습니다.
					</li>
				</ul>
				<h2>브라우저에서 측정하는 것</h2>
				<p>
					새 KPS 도구는 첫 입력부터 10초간 자동 반복을 제외한 keydown 횟수를
					셉니다. 포커스를 잃거나 탭을 숨기면 중단합니다. 키 인식 도구는
					전달받은 키의 눌림과 해제를 표시합니다. 재입력 확인 도구는 이벤트
					순서를 보여주며 래피드 트리거 지원 인증을 제공하지 않습니다.
				</p>
				<h2>기존 성능 테스트의 해석</h2>
				<p>
					기존 성능 테스트는 그대로 제공됩니다. 이 도구의 ‘평균 응답’은 키를
					누르고 뗄 때까지의 시간입니다. 키보드 하드웨어의 입력 지연이나 제품
					순위로 해석하지 마세요.
				</p>
				<h2>같은 조건에서만 비교합니다</h2>
				<p>
					제품 변형, 펌웨어, 연결 모드, 설정, 측정 장비, 방법론 버전, 표본 수가
					필요합니다. 조건이 다른 결과는 별도로 표시하고 평균을 합치지 않습니다.
					미확인과 미지원, 미측정과 0을 구분합니다.
				</p>
				<h2>출처가 충돌하면</h2>
				<p>
					한 수치로 자동 덮어쓰지 않습니다. F99의 배열 비율처럼 표기가 다른 경우
					원문의 차이를 설명합니다. 같은 모델명의 지역판·PRO·MAX를 혼합하지
					않습니다. 가격·별점·후기는 근거와 확인 날짜 없이 싣지 않습니다.
				</p>
				<h2>편집과 수정</h2>
				<p>
					자료 정리 주체는 WithAnalog입니다. 제품 구매 링크나 수수료가 데이터의
					우열을 결정하지 않습니다. 현재 도감의 원문 링크에는 제휴 추적
					파라미터가 없습니다. 오류 제보는 출처와 적용 변형을 함께 확인한 뒤
					반영합니다.
				</p>
				<Link href="/contribute">정정 자료 작성하기 ↗</Link>
				<h2>더 읽기</h2>
				<p>
					<a
						href="https://www.rtings.com/keyboard/tests/latency"
						target="_blank"
						rel="noopener noreferrer"
					>
						RTINGS 입력 지연 측정 방법
					</a>{" "}
					· <Link href="/guides/keyboard-latency">반응시간과 입력 지연</Link> ·{" "}
					<Link href="/guides/polling-rate">폴링레이트 해석</Link>
				</p>
			</div>
		</Shell>
	);
}
