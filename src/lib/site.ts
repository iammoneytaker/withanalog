export const SITE = {
  name: '위드아날로그 파크골프',
  shortName: '위드아날로그',
  url: 'https://www.withanalog.com',
  description:
    '파크골프채·풀세트·가방·공을 처음 고르는 분을 위한 비교 가이드. 모델별 가격, 무게, 소재 차이를 쉬운 말로 정리합니다.',
  email: 'ksj2618159@naver.com',
  disclosure: '이 포스팅은 네이버 쇼핑 커넥트 활동의 일환으로, 판매 발생 시 수수료를 제공받습니다.',
  author: '위드아날로그 편집팀',
};

export const CATEGORIES = [
  { slug: 'clubs', name: '파크골프채', desc: '모델별 무게·길이·헤드 소재 비교와 고르는 법' },
  { slug: 'fullsets', name: '풀세트', desc: '채·가방·공까지 한 번에 사는 풀세트 구성 비교' },
  { slug: 'bags', name: '가방·파우치', desc: '파크골프 가방, 힙색, 파우치 고르는 기준' },
  { slug: 'balls', name: '파크골프공', desc: '2·3·4피스 공 차이와 공인구 확인법' },
  { slug: 'guide', name: '입문 가이드', desc: '규칙, 준비물, 선물 고르기 등 처음 시작하는 분을 위한 글' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
