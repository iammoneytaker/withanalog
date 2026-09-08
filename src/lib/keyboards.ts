import { VERIFIED_DATE } from "./seo";

export type KeyboardFact = {
	readonly label: string;
	readonly value: string;
	readonly note?: string;
};
export type KeyboardProduct = {
	readonly slug: string;
	readonly brand: "AULA" | "지클릭커";
	readonly model: string;
	readonly layout: string;
	readonly keys: number;
	readonly battery: number | null;
	readonly price: number;
	readonly connection: string;
	readonly switchType: string;
	readonly rapidTrigger: KeyboardFact;
	readonly summary: string;
	readonly source: string;
	readonly sourceName: string;
	readonly scope: string;
	readonly caveat: string;
	readonly facts: readonly KeyboardFact[];
};

export const PRICE_CHECKED = "2026-09-08";

const AULA_CONNECTION = "USB / 2.4GHz / Bluetooth 5.0";
const AULA_RAPID_TRIGGER: KeyboardFact = {
	label: "래피드 트리거",
	value: "지원 근거 미확인",
	note: "일반 기계식 판매 사양 · HE 모델과 구분",
};

export const keyboards: readonly KeyboardProduct[] = [
	{
		slug: "aula-f65",
		brand: "AULA",
		model: "F65",
		layout: "65%",
		keys: 67,
		battery: 4000,
		price: 82600,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"F열을 덜어낸 67키 구성. 작은 배열과 세 가지 연결 방식을 원하는 경우 살펴볼 모델입니다.",
		source: "https://aulagear.com/products/epomaker-x-aula-f65",
		sourceName: "AULA Gear 제품 페이지",
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
		brand: "AULA",
		model: "F75",
		layout: "75%",
		keys: 80,
		battery: 4000,
		price: 46200,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"F열을 유지한 80키 배열. 숫자패드 없이 기능키를 사용하는 구성을 찾을 때 비교해 보세요.",
		source: "https://aulagear.com/products/aula-f75",
		sourceName: "AULA Gear 제품 페이지",
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
		brand: "AULA",
		model: "F75 MAX",
		layout: "75%",
		keys: 80,
		battery: 4000,
		price: 93880,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"80키에 노브와 TFT 화면을 더한 모델. 연결별 공개 수치를 따로 확인할 수 있습니다.",
		source: "https://aulagear.com/products/aula-f75-max",
		sourceName: "AULA Gear 제품 페이지",
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
		brand: "AULA",
		model: "F87 Pro",
		layout: "TKL",
		keys: 87,
		battery: 4000,
		price: 44730,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"숫자패드를 생략한 87키 텐키리스. 75%보다 분리된 키 배치를 선호한다면 비교해 보세요.",
		source: "https://aulagear.com/products/aula-f87-pro",
		sourceName: "AULA Gear 제품 페이지",
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
		brand: "AULA",
		model: "F99",
		layout: "숫자패드형",
		keys: 99,
		battery: 8000,
		price: 54830,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"숫자패드를 포함한 99키 구성. 숫자 입력 비중이 높은 사용 환경에서 비교할 모델입니다.",
		source: "https://aulagear.com/products/aula-f99",
		sourceName: "AULA Gear 제품 페이지",
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
		brand: "AULA",
		model: "F99 PRO",
		layout: "숫자패드형",
		keys: 100,
		battery: 8000,
		price: 75950,
		connection: AULA_CONNECTION,
		switchType: "기계식",
		rapidTrigger: AULA_RAPID_TRIGGER,
		summary:
			"100키와 노브를 갖춘 숫자패드형 모델. F99와 키 수·조작부를 구분해서 비교하세요.",
		source: "https://aulagear.com/products/aula-f99-copy",
		sourceName: "AULA Gear 제품 페이지",
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
	{
		slug: "gclicker-xrt68",
		brand: "지클릭커",
		model: "MAGNEON X XRT68",
		layout: "65%",
		keys: 68,
		battery: null,
		price: 69800,
		connection: "유선 USB-C (탈착식 케이블)",
		switchType: "자석축(마그네틱)",
		rapidTrigger: {
			label: "래피드 트리거",
			value: "0.005mm 단위 지원 표기",
			note: "제조사 공개값 · 독립 실측 아님",
		},
		summary:
			"0.005mm 단위 래피드 트리거와 8,000Hz 폴링을 표기한 자석축 유선 68키. 반응 세팅을 세밀하게 조절하려는 경우 살펴볼 모델입니다.",
		source: "https://g-clicker.com/product/detail.html?product_no=517",
		sourceName: "지클릭커 공식몰 판매 페이지",
		scope: "지클릭커 MAGNEON X XRT68 국내 출시 사양. Magneon GRT 시리즈 제외.",
		caveat:
			"공식몰·보도자료 공개값입니다. ARM Core×4 MCU, 펄스 탭(마지막 입력 우선), 3중 흡음 구조, PBT 투광 키캡을 표기하며 크기·무게는 공개되지 않았습니다.",
		facts: [
			{ label: "핫스왑", value: "미확인" },
			{ label: "마운트", value: "미확인" },
			{
				label: "공개 폴링레이트",
				value: "최대 8,000Hz",
				note: "유선 연결 기준",
			},
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "풀키 안티고스팅" },
			{ label: "케이스", value: "미확인" },
		],
	},
	{
		slug: "gclicker-grt68",
		brand: "지클릭커",
		model: "Magneon 8K GRT68",
		layout: "65%",
		keys: 68,
		battery: null,
		price: 59800,
		connection: "유선 USB-C",
		switchType: "자석축(마그네틱)",
		rapidTrigger: {
			label: "래피드 트리거",
			value: "0.005mm 단위 지원 표기",
			note: "판매처 공개값 · 독립 실측 아님",
		},
		summary:
			"키압 35g 자석축과 8,000Hz 폴링을 표기한 유선 68키. XRT68보다 낮은 가격의 래피드 트리거 입문 구성입니다.",
		source: "https://g-clicker.com/product/detail.html?product_no=488",
		sourceName: "지클릭커 공식몰 판매 페이지",
		scope: "지클릭커 Magneon 8K GRT68. GRT107(풀배열)·MAGNEON X XRT68 제외.",
		caveat:
			"쿠팡 판매 페이지는 GRT68·GRT107 옵션을 함께 판매합니다. 구매 시 68키(GRT68) 옵션인지 확인하세요. 0.125ms 응답·키압 35g은 판매처 공개값입니다.",
		facts: [
			{ label: "핫스왑", value: "미확인" },
			{ label: "마운트", value: "미확인" },
			{ label: "공개 폴링레이트", value: "8,000Hz", note: "유선 연결 기준" },
			{
				label: "공개 입력 지연",
				value: "0.125ms 표기",
				note: "판매처 공개값 · 독립 실측 아님",
			},
			{ label: "동시입력 표기", value: "미확인" },
			{ label: "케이스", value: "미확인" },
		],
	},
	{
		slug: "gclicker-wk50-78",
		brand: "지클릭커",
		model: "WK50 사일런스 M 78키",
		layout: "컴팩트",
		keys: 78,
		battery: 2000,
		price: 32400,
		connection: "USB / 2.4GHz / Bluetooth",
		switchType: "멤브레인",
		rapidTrigger: {
			label: "래피드 트리거",
			value: "해당 없음",
			note: "멤브레인 방식",
		},
		summary:
			"78키로 줄인 저소음 멤브레인 무선 모델. LCD 표시창과 볼륨 노브를 갖춘 사무용 구성입니다.",
		source: "https://g-clicker.com/product/detail.html?product_no=470",
		sourceName: "지클릭커 공식몰 판매 페이지",
		scope: "지클릭커 오피스프로 WK50 사일런스 M 78키. 87키·108키 변형 제외.",
		caveat:
			"무소음·풀윤활은 판매처 표현입니다. 폴링레이트 등 성능 수치는 공개되지 않았으며 게임용 지표로 비교하지 않습니다. 생활방수·레인보우 백라이트 표기.",
		facts: [
			{ label: "핫스왑", value: "해당 없음", note: "멤브레인 방식" },
			{ label: "마운트", value: "해당 없음", note: "멤브레인 방식" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "미확인" },
			{ label: "케이스", value: "미확인" },
		],
	},
	{
		slug: "gclicker-wk50-87",
		brand: "지클릭커",
		model: "WK50 사일런스 M RGB 87키",
		layout: "TKL",
		keys: 87,
		battery: 2000,
		price: 23660,
		connection: "USB / 2.4GHz / Bluetooth 5.0",
		switchType: "멤브레인",
		rapidTrigger: {
			label: "래피드 트리거",
			value: "해당 없음",
			note: "멤브레인 방식",
		},
		summary:
			"87키 텐키리스 저소음 멤브레인 유무선 모델. 2만 원대에 3가지 연결을 갖춘 사무용 구성입니다.",
		source: "https://g-clicker.com/product/detail.html?product_no=350",
		sourceName: "지클릭커 공식몰 판매 페이지",
		scope: "지클릭커 오피스프로 WK50 사일런스 M RGB 87키(RC1). 108키 OPK50 제외.",
		caveat:
			"무소음은 판매처 표현입니다. 동시입력 19키·생활방수는 공개 스펙 기준이며 게임용 동시입력·폴링레이트 수치는 공개되지 않았습니다.",
		facts: [
			{ label: "핫스왑", value: "해당 없음", note: "멤브레인 방식" },
			{ label: "마운트", value: "해당 없음", note: "멤브레인 방식" },
			{ label: "공개 폴링레이트", value: "미확인" },
			{ label: "공개 입력 지연", value: "미확인" },
			{ label: "동시입력 표기", value: "19키", note: "공개 스펙 기준" },
			{ label: "케이스", value: "미확인" },
		],
	},
];

export function findKeyboard(slug: string) {
	return keyboards.find((product) => product.slug === slug);
}

export function productTitle(product: KeyboardProduct): string {
	return `${product.brand === "AULA" ? "AULA" : "지클릭커"} ${product.model}`;
}

export function productAlias(product: KeyboardProduct): string {
	return product.brand === "AULA"
		? `독거미 ${product.model}`
		: `지클릭커 ${product.model}`;
}

export const priceBands = [
	{ label: "전체", min: 0, max: Infinity },
	{ label: "3만원 미만", min: 0, max: 30000 },
	{ label: "3~5만원", min: 30000, max: 50000 },
	{ label: "5~7만원", min: 50000, max: 70000 },
	{ label: "7만원 이상", min: 70000, max: Infinity },
] as const;

export function productFacts(
	product: KeyboardProduct,
): readonly KeyboardFact[] {
	return [
		{ label: "배열", value: product.layout },
		{ label: "키 수", value: `${product.keys}키` },
		{ label: "스위치 방식", value: product.switchType },
		{ label: "연결", value: product.connection },
		{
			label: "배터리 용량",
			value: product.battery
				? `${product.battery.toLocaleString("en-US")}mAh`
				: "해당 없음",
			note: product.battery ? "사용시간과 다른 지표" : "유선 전용",
		},
		{
			label: "쿠팡 확인가",
			value: `${product.price.toLocaleString("ko-KR")}원`,
			note: `확인일 ${PRICE_CHECKED} · 판매 옵션·시점에 따라 변동`,
		},
		...product.facts,
		{
			label: "독립 실측 입력 지연",
			value: "미확인",
			note: "측정환경·방법론을 검증한 데이터 미등록",
		},
		product.rapidTrigger,
		{ label: "확인일", value: VERIFIED_DATE },
	];
}

export function keyboardImage(slug: string): string {
	const extension =
		slug === "aula-f65" || slug === "aula-f75-max" ? "png" : "jpg";
	return `/images/keyboards/${slug}.${extension}`;
}
