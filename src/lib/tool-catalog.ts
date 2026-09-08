export const toolCatalog = [
	{
		path: "/tools/keyboard-performance-test",
		title: "키보드 성능 테스트",
		description: "기존 APM·CPS와 가상 키보드 테스트를 그대로 사용합니다.",
	},
	{
		path: "/tools/keyboard-input-test",
		title: "키보드 입력·동시입력 테스트",
		description: "현재 눌린 키와 확인한 키, 관찰한 최대 동시입력을 표시합니다.",
	},
	{
		path: "/tools/kps-test",
		title: "KPS·키보드 CPS 측정",
		description: "첫 입력부터 10초 동안의 연타 횟수를 측정합니다.",
	},
	{
		path: "/tools/rapid-trigger-test",
		title: "래피드 트리거 재입력 확인",
		description:
			"키 눌림·해제 이벤트를 관찰합니다. 기능 지원을 자동 판정하지 않습니다.",
	},
	{
		path: "/tools/ac54699f-e7e5-4075-8230-7ae6c604104a",
		title: "사람 반응속도 테스트",
		description: "화면 지시를 보고 키를 누르는 반응시간을 확인합니다.",
	},
	{
		path: "/tools/keyboard-sound-test",
		title: "키보드 소리 듣기",
		description: "스위치 타건음 샘플을 들어봅니다.",
	},
	{
		path: "/tools/english-typing-test",
		title: "영문 타이핑 테스트",
		description: "영문 타이핑 속도와 정확도를 연습합니다.",
	},
	{
		path: "/typing-practice",
		title: "한글 타자 연습",
		description: "문장을 입력하며 타이핑을 연습합니다.",
	},
] as const;
