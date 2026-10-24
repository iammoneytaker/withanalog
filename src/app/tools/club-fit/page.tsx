import type { Metadata } from 'next';
import ClubFit from './ClubFit';

export const metadata: Metadata = {
  title: '파크골프채 길이·무게 계산기 (키·성별로 찾기)',
  description: '키와 성별을 넣으면 맞는 파크골프채 길이(cm)와 무게(g) 범위를 바로 알려 드립니다. 규정 기준(86cm, 600g 이하)도 함께 정리했습니다.',
  alternates: { canonical: '/tools/club-fit/' },
};

export default function Page() {
  return (
    <>
      <h1 className="section-title" style={{ marginTop: 10 }}>파크골프채 길이·무게 계산기</h1>
      <p>키와 성별만 넣으면 처음 고를 때 참고할 길이와 무게 범위를 알려 드립니다.</p>
      <ClubFit />
      <h2 className="section-title">이렇게 계산했어요</h2>
      <ul>
        <li>파크골프채는 규정상 길이 86cm 이하, 무게 600g 이하여야 합니다.</li>
        <li>키가 클수록 긴 채가 편하지만, 86cm를 넘는 채는 대회에서 쓸 수 없습니다.</li>
        <li>무게는 무거울수록 공이 곧게 나가기 쉽고, 가벼울수록 오래 쳐도 덜 지칩니다.</li>
        <li>결과는 일반적인 출발점입니다. 손 크기, 스윙 습관, 체력에 따라 달라질 수 있습니다.</li>
      </ul>
      <p><a href="/compare/">가격 비교표에서 맞는 채 찾아보기 →</a></p>
    </>
  );
}
