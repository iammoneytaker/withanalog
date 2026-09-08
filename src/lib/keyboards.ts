import { VERIFIED_DATE } from "./seo";

export type KeyboardFact = {
	readonly label: string;
	readonly value: string;
	readonly note?: string;
};
export type KeyboardProduct = {
	readonly slug: string;
	readonly model: string;
	readonly layout: string;
	readonly keys: number;
	readonly battery: number;
	readonly summary: string;
	readonly source: string;
	readonly scope: string;
	readonly caveat: string;
	readonly facts: readonly KeyboardFact[];
};

export const keyboards: readonly KeyboardProduct[] = [
	{
		slug: "aula-f65",
		model: "F65",
		layout: "65%",
		keys: 67,
		battery: 4000,
		summary:
			"F열을 덜어낸 67키 구성. 작은 배열과 세 가지 연결 방식을 원하는 경우 살펴볼 모델입니다.",
		source: "https://aulagear.com/products/epomaker-x-aula-f65",
		scope: "EPOMAKER × AULA F65 글로벌 판매 사양. F65 PRO 제외.",
		caveat:
			"1,000Hz 표기는 연결 모드가 명시되지 않아 USB·무선·Bluetooth에 동일하게 적용하지 않습니다.",
		facts: [
			{ label: "핫스왑", value: "지원" },
			{ label: "마운트", value: "가스켓" },
			{ label: "공개 폴링레이트", value: "1,000Hz", note: "연결 모드 미명시" },
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "NKRO", note: "모드별 범위 미명시" },
			{ label: "케이스", value: "ABS" },
		],
	},
	{
		slug: "aula-f75",
		model: "F75",
		layout: "75%",
		keys: 80,
		battery: 4000,
		summary:
			"F열을 유지한 80키 배열. 숫자패드 없이 기능키를 사용하는 구성을 찾을 때 비교해 보세요.",
		source: "https://aulagear.com/products/aula-f75",
		scope: "AULA F75 글로벌 무선 모델. Wired·MAX·Ultra 및 지역별 변형 제외.",
		caveat:
			"키캡 옵션에 따라 LED 방향과 일부 하단 키 구성이 다릅니다. 폴링레이트는 이 출처에서 확인하지 못했습니다.",
		facts: [
			{ label: "핫스왑", value: "지원" },
			{ label: "마운트", value: "가스켓" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "NKRO", note: "모드별 범위 미명시" },
			{ label: "케이스", value: "ABS" },
		],
	},
	{
		slug: "aula-f75-max",
		model: "F75 MAX",
		layout: "75%",
		keys: 80,
		battery: 4000,
		summary:
			"80키에 노브와 TFT 화면을 더한 모델. 연결별 공개 수치를 따로 확인할 수 있습니다.",
		source: "https://aulagear.com/products/aula-f75-max",
		scope: "AULA F75 MAX, 글로벌 75% ANSI US 판매 사양.",
		caveat:
			"지연 수치는 판매 페이지의 주장입니다. 측정 장비·표본 수·펌웨어가 명시되지 않아 독립 실측이나 순위 근거로 사용하지 않습니다.",
		facts: [
			{ label: "핫스왑", value: "3/5핀 지원" },
			{ label: "마운트", value: "가스켓" },
			{
				label: "공개 폴링레이트",
				value: "USB·2.4GHz 1,000Hz / Bluetooth 125Hz",
			},
			{
				label: "공개 입력 지연",
				value: "USB 3ms / 2.4GHz 7ms / Bluetooth 18ms",
				note: "판매처 공개값 · 독립 실측 아님",
			},
			{ label: "동시입력 표기", value: "NKRO", note: "모드별 범위 미명시" },
			{ label: "케이스", value: "ABS" },
		],
	},
	{
		slug: "aula-f87-pro",
		model: "F87 Pro",
		layout: "TKL",
		keys: 87,
		battery: 4000,
		summary:
			"숫자패드를 생략한 87키 텐키리스. 75%보다 분리된 키 배치를 선호한다면 비교해 보세요.",
		source: "https://aulagear.com/products/aula-f87-pro",
		scope: "AULA F87 Pro 글로벌 판매 사양. F87 및 F87 PRO V2 제외.",
		caveat:
			"판매 페이지의 크기·무게는 다른 모델과 중복되는 표기가 있어 수록을 보류했습니다. 검증되지 않은 치수로 비교하지 않습니다.",
		facts: [
			{ label: "핫스왑", value: "지원" },
			{ label: "마운트", value: "가스켓" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "미확인" },
			{ label: "케이스", value: "미확인" },
		],
	},
	{
		slug: "aula-f99",
		model: "F99",
		layout: "숫자패드형",
		keys: 99,
		battery: 8000,
		summary:
			"숫자패드를 포함한 99키 구성. 숫자 입력 비중이 높은 사용 환경에서 비교할 모델입니다.",
		source: "https://aulagear.com/products/aula-f99",
		scope: "AULA F99 글로벌 판매 사양. F99 PRO·MAX 제외.",
		caveat:
			"출처 제목은 1800, 사양표는 98%로 표기합니다. 배열 비율 대신 99키·숫자패드 포함 여부를 기준으로 정리했습니다.",
		facts: [
			{ label: "핫스왑", value: "지원" },
			{ label: "마운트", value: "가스켓" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{
				label: "동시입력 표기",
				value: "Anti-Ghosting 지원",
				note: "NKRO 범위 미확인",
			},
			{ label: "케이스", value: "ABS" },
		],
	},
	{
		slug: "aula-f99-pro",
		model: "F99 PRO",
		layout: "숫자패드형",
		keys: 100,
		battery: 8000,
		summary:
			"100키와 노브를 갖춘 숫자패드형 모델. F99와 키 수·조작부를 구분해서 비교하세요.",
		source: "https://aulagear.com/products/aula-f99-copy",
		scope: "AULA F99 PRO 글로벌 판매 사양. F99 및 F99 MAX 제외.",
		caveat:
			"출처 제목은 96%, 사양표는 1800으로 표기합니다. 국내 판매 옵션과 스위치·키캡 구성이 다를 수 있습니다.",
		facts: [
			{ label: "핫스왑", value: "미확인" },
			{ label: "마운트", value: "가스켓" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{
				label: "동시입력 표기",
				value: "Anti-Ghosting 지원",
				note: "NKRO 범위 미확인",
			},
			{ label: "케이스", value: "ABS" },
		],
	},
];

export function findKeyboard(slug: string) {
	return keyboards.find((product) => product.slug === slug);
}

export function productFacts(
	product: KeyboardProduct,
): readonly KeyboardFact[] {
	return [
		{ label: "배열", value: product.layout },
		{ label: "키 수", value: `${product.keys}키` },
		{ label: "연결", value: "USB / 2.4GHz / Bluetooth 5.0" },
		{
			label: "배터리 용량",
			value: `${product.battery.toLocaleString("en-US")}mAh`,
			note: "사용시간과 다른 지표",
		},
		...product.facts,
		{
			label: "독립 실측 입력 지연",
			value: "미확인",
			note: "측정환경·방법론을 검증한 데이터 미등록",
		},
		{
			label: "래피드 트리거",
			value: "지원 근거 미확인",
			note: "일반 기계식 판매 사양 · HE 모델과 구분",
		},
		{ label: "확인일", value: VERIFIED_DATE },
	];
}

export function keyboardImage(slug: string): string {
	const extension =
		slug === "aula-f65" || slug === "aula-f75-max" ? "png" : "jpg";
	return `/images/keyboards/${slug}.${extension}`;
}
