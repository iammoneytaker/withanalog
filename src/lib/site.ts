export const SITE = {
  name: '위드아날로그 파크골프',
  shortName: '위드아날로그',
  url: 'https://www.withanalog.com',
  description:
    '파크골프채·풀세트·가방·공을 처음 고르는 분을 위한 비교 가이드. 히토미혼마, 데이비드, 프라임, 피닉스 등 모델별 가격·무게·헤드 소재 차이를 쉬운 말로 정리합니다.',
  email: 'withanalog.com@gmail.com',
  disclosure: '이 포스팅은 네이버 쇼핑 커넥트 활동의 일환으로, 판매 발생 시 수수료를 제공받습니다.',
  author: '위드아날로그 편집팀',
  /** true: 네이버 쇼핑 판매 페이지 썸네일을 링크로 표시(파일 저장 안 함). false: 종류별 AI 이미지 카드로 대체 */
  productImages: true,
  imageCredit: '상품 이미지: 네이버 쇼핑 판매 페이지',
  maxProductsPerPost: 10,
};

export const CATEGORIES = [
  { slug: 'clubs', name: '파크골프채', desc: '파크골프채를 브랜드·모델별로 비교합니다. 무게(g), 길이(cm), 헤드 소재, 협회 공인 여부와 가격대를 쉬운 말로 정리했어요.' },
  { slug: 'fullsets', name: '풀세트', desc: '채·가방·공·장갑까지 한 번에 사는 파크골프 풀세트의 구성품과 가격을 브랜드별로 비교합니다. 선물용 세트 고르는 법도 함께 정리했어요.' },
  { slug: 'bags', name: '가방·파우치', desc: '파크골프 싱글백·하프백·스탠드백·백팩과 힙색·파우치를 무게, 수납, 가격으로 비교합니다. 처음 사는 분이 확인할 점을 정리했어요.' },
  { slug: 'balls', name: '파크골프공', desc: '파크골프공 2·3·4피스 차이, 협회 공인구 확인법, 야광·LED 공까지 비교합니다. 브랜드별 가격과 특징을 한눈에 볼 수 있어요.' },
  { slug: 'senior-golf', name: '시니어 골프', desc: '힘이 덜 들어도 멀리 보내는 시니어 골프 장비를 비교합니다. 가벼운 드라이버, 여성 하프세트, 브랜드별 시니어 모델을 무게·샤프트·로프트와 가격으로 정리했어요.' },
  { slug: 'brands', name: '브랜드 이야기', desc: '미즈노, 데이비드처럼 오래된 브랜드의 제품 라인이 어떻게 이어져 왔고, 모델마다 무엇이 다른지 정리한 브랜드 이야기입니다.' },
  { slug: 'guide', name: '입문 가이드', desc: '파크골프를 처음 시작하는 분을 위한 규칙, 준비물, 용어, 자격증, 부모님 선물 고르기 가이드입니다. 공식 자료를 기준으로 정리했어요.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
