export type Guide = {
	readonly slug: string;
	readonly title: string;
	readonly answer: string;
	readonly sections: readonly {
		readonly title: string;
		readonly text: string;
	}[];
	readonly tool: string;
	readonly toolLabel: string;
	readonly sources: readonly { readonly title: string; readonly url: string }[];
};
export const guides: readonly Guide[] = [
	{
		slug: "aula-series",
		title: "독거미 AULA 시리즈, 무엇이 다른가요?",
		answer:
			"먼저 숫자패드와 F열의 필요 여부를 정하세요. 공개 사양상 F65는 67키, F75는 80키, F87 Pro는 87키, F99는 99키, F99 PRO는 100키입니다. MAX·PRO·지역판은 별도 모델로 확인해야 합니다.",
		sections: [
			{
				title: "배열부터 고르기",
				text: "F65는 65%, F75는 75%, F87 Pro는 텐키리스입니다. F99와 F99 PRO는 숫자패드형 구성입니다. 같은 독거미라는 이름으로 묶여도 기능키와 숫자패드 배치가 다릅니다.",
			},
			{
				title: "국내 판매 옵션과 같은 제품인가요?",
				text: "이 도감은 AULA Gear 글로벌 판매 사양을 정리합니다. 한글 각인, 스위치, 키캡, 하드웨어 리비전은 국내 판매처와 다를 수 있습니다. 모델명뿐 아니라 구매하려는 옵션을 확인하세요.",
			},
			{
				title: "게임용으로 더 빠른 모델은?",
				text: "현재 확보한 자료로는 순위를 매기지 않습니다. 폴링레이트가 높다는 설명이나 판매처의 지연 주장은 동일 조건의 실측을 대신하지 않습니다. 제품 상세에서 공개값과 미확인 항목을 확인하세요.",
			},
		],
		tool: "/compare",
		toolLabel: "독거미 비교표 열기",
		sources: [
			{
				title: "AULA Gear F75 공개 사양",
				url: "https://aulagear.com/products/aula-f75",
			},
			{
				title: "AULA Gear F99 공개 사양",
				url: "https://aulagear.com/products/aula-f99",
			},
		],
	},
	{
		slug: "keyboard-latency",
		title: "키보드 반응속도와 입력 지연은 같은가요?",
		answer:
			"같지 않습니다. 화면을 보고 키를 누르기까지의 시간에는 사람의 반응이 포함됩니다. 키를 누르고 뗄 때까지의 시간은 유지 시간입니다. 둘 다 키보드 자체의 입력 지연과 구분해야 합니다.",
		sections: [
			{
				title: "브라우저에서 알 수 있는 것",
				text: "웹페이지는 브라우저에 전달된 키 이벤트를 기록할 수 있습니다. 입력 횟수, 이벤트 사이 간격, 눌림과 해제 순서는 확인할 수 있지만 물리적으로 스위치가 움직이기 시작한 시점을 일반 키 이벤트만으로 알 수 없습니다.",
			},
			{
				title: "100ms면 키보드가 느린가요?",
				text: "어떤 시간을 측정했는지 먼저 확인하세요. 사람 반응시간이나 키 유지 시간이 100ms라는 결과를 하드웨어 지연으로 해석하면 안 됩니다. 기존 성능 테스트의 평균 응답은 눌림부터 해제까지의 시간입니다.",
			},
			{
				title: "하드웨어 지연 비교의 조건",
				text: "물리 입력과 전송을 관찰하는 측정 장비, 같은 테스트 정의, 연결 모드, 펌웨어와 설정이 필요합니다. 당장은 출처와 조건이 검증된 실측만 등록하며 브라우저 결과를 제품 속도 순위로 사용하지 않습니다.",
			},
		],
		tool: "/tools/keyboard-input-test",
		toolLabel: "키 입력 확인하기",
		sources: [
			{
				title: "RTINGS 키보드 지연 측정 방법",
				url: "https://www.rtings.com/keyboard/tests/latency",
			},
			{
				title: "MDN KeyboardEvent",
				url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
			},
		],
	},
	{
		slug: "kps-cps",
		title: "KPS·CPS는 무엇을 측정하나요?",
		answer:
			"KPS는 초당 키 입력 횟수입니다. 이 사이트의 키보드 CPS도 같은 입력 횟수 기준으로 표시합니다. 새 KPS 도구는 첫 입력부터 10초 동안 새로 누른 횟수를 세고 10으로 나눕니다.",
		sections: [
			{
				title: "길게 누르면 연타로 계산되나요?",
				text: "아닙니다. 운영체제의 자동 반복 이벤트와 이미 누르고 있는 키는 중복 집계하지 않습니다. 누르고 뗀 뒤 다시 누른 입력만 새 입력으로 셉니다.",
			},
			{
				title: "숫자가 높으면 좋은 키보드인가요?",
				text: "손가락 움직임, 키 조합, 사용자 숙련도와 환경이 함께 영향을 줍니다. 개인 입력 기록이며 제품의 고유 성능 점수는 아닙니다. 같은 사람이 같은 방식으로 반복해 자신의 변화를 확인하세요.",
			},
		],
		tool: "/tools/kps-test",
		toolLabel: "10초 KPS 측정",
		sources: [
			{
				title: "MDN 자동 반복 이벤트",
				url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat",
			},
		],
	},
	{
		slug: "rapid-trigger",
		title: "래피드 트리거를 웹에서 확인할 수 있나요?",
		answer:
			"키를 조금 떼었다 다시 누를 때 해제·재입력 이벤트가 발생하는지는 관찰할 수 있습니다. 그러나 일반 키 이벤트만으로 래피드 트리거 지원 여부나 작동 거리(mm)를 인증할 수는 없습니다.",
		sections: [
			{
				title: "설정 전후를 관찰하는 방법",
				text: "제조사 소프트웨어에서 설정을 확인한 뒤 같은 키를 누르고 조금씩 떼었다 다시 누르세요. 기록에서 DOWN → UP → DOWN 순서를 관찰합니다. 일반 기계식 키보드도 이 순서를 만들 수 있으므로 순서만으로 기능 지원을 단정하지 않습니다.",
			},
			{
				title: "독거미 기계식과 HE 모델",
				text: "같은 AULA 브랜드라도 일반 기계식 F 시리즈와 자석축 HE 모델을 구분해야 합니다. 현재 도감의 여섯 모델에는 래피드 트리거 지원 근거를 등록하지 않았습니다. 핫스왑 지원이 래피드 트리거 지원을 뜻하지 않습니다.",
			},
		],
		tool: "/tools/rapid-trigger-test",
		toolLabel: "눌림·해제 기록 보기",
		sources: [
			{
				title: "Wooting Rapid Trigger 설정 원리",
				url: "https://help.wooting.io/article/102-how-to-set-up-rapid-trigger",
			},
		],
	},
	{
		slug: "polling-rate",
		title: "1,000Hz·8,000Hz가 입력 지연인가요?",
		answer:
			"폴링레이트와 입력 지연은 다른 지표입니다. 1,000Hz의 주기는 1ms, 8,000Hz의 주기는 0.125ms이지만 이 주기가 키보드 전체 입력 지연을 의미하지는 않습니다.",
		sections: [
			{
				title: "연결 모드를 나눠 보는 이유",
				text: "같은 제품이라도 USB, 2.4GHz, Bluetooth 사양이 다를 수 있습니다. 예를 들어 F75 MAX 판매 페이지는 USB·2.4GHz에 1,000Hz, Bluetooth에 125Hz를 표기합니다. 이를 다른 F75 변형에 그대로 적용할 수 없습니다.",
			},
			{
				title: "웹의 연타 간격으로 Hz를 추정해도 되나요?",
				text: "사용자의 재입력 간격이나 키 유지 시간은 USB 보고 주기를 직접 측정한 값이 아닙니다. 브라우저 이벤트만으로 정확한 폴링레이트나 스캔레이트를 인증하지 않습니다.",
			},
		],
		tool: "/keyboards/aula-f75-max",
		toolLabel: "F75 MAX 출처 확인",
		sources: [
			{
				title: "AULA Gear F75 MAX 연결별 사양",
				url: "https://aulagear.com/products/aula-f75-max",
			},
			{
				title: "RTINGS 지연 측정 정의",
				url: "https://www.rtings.com/keyboard/tests/latency",
			},
		],
	},
	{
		slug: "keyboard-input",
		title: "키 인식·동시입력 테스트는 어떻게 하나요?",
		answer:
			"테스트 영역을 활성화한 뒤 키를 누르면 현재 눌린 키와 확인한 키가 표시됩니다. 여러 키를 함께 눌러 브라우저가 받은 조합을 관찰할 수 있습니다.",
		sections: [
			{
				title: "표시되지 않는 키는 불량인가요?",
				text: "운영체제나 브라우저가 먼저 처리하는 단축키는 페이지에 전달되지 않을 수 있습니다. Fn 키도 일반 키처럼 전달되지 않는 경우가 있습니다. 한 번의 웹 테스트만으로 불량을 확정하지 마세요.",
			},
			{
				title: "동시입력의 범위",
				text: "최대 동시입력 수는 이번 세션에서 관찰한 값입니다. 키보드의 모든 조합이나 NKRO 지원을 인증한 값이 아닙니다. 게임에서 사용하는 조합을 실제로 눌러 확인하세요.",
			},
		],
		tool: "/tools/keyboard-input-test",
		toolLabel: "키 인식 테스트",
		sources: [
			{
				title: "MDN KeyboardEvent",
				url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
			},
		],
	},
];
