import { getPosts } from '@/lib/posts';
import { CATEGORIES, SITE } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const posts = getPosts();
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '파크골프채·풀세트·가방·공을 처음 고르는 50~70대 입문자와 선물을 고르는 가족을 위한 한국어 비교 가이드입니다. 가격에는 확인 날짜를 붙입니다. 일부 링크는 네이버 쇼핑 커넥트 제휴 링크입니다.',
    '',
    '## 핵심 페이지',
    `- [파크골프 비교표](${SITE.url}/compare/): 상품별 가격, 무게, 길이, 헤드 소재, 협회 공인, 좌타 여부 비교`,
    `- [파크골프채 길이·무게 계산기](${SITE.url}/tools/club-fit/): 키와 성별로 추천 길이(cm)·무게(g) 범위`,
    `- [파크골프 규칙 한눈에](${SITE.url}/guide/rules/): 대한파크골프협회 경기규칙·대회 규정을 질문과 답으로 정리(조항 번호 포함)`,
    `- [파크골프 용어 사전](${SITE.url}/guide/terms/): 경기·장비 용어 정의와 근거 조항`,
    ...CATEGORIES.map((c) => `- [${c.name}](${SITE.url}/category/${c.slug}/): ${c.desc}`),
    '',
    '## 글',
    ...posts.map((p) => `- [${p.title}](${SITE.url}/posts/${p.slug}/): ${p.description}`),
    '',
    '## 운영 정보',
    `- [소개](${SITE.url}/about/)`,
    `- [제휴 고지](${SITE.url}/disclosure/)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
