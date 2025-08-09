import ProjectGrid from '../../components/ProjectGrid';

export default function ToolsPage() {
  // 로컬 도구 데이터 사용
  const tools = [
    {
      id: 'keyboard-performance-test',
      title: '키보드 성능 테스트',
      description: '텐키리스/풀사이즈 레이아웃으로 APM/CPS 정확 측정, 게이머 필수 도구',
      icon_url: '/images/tools/keyboard-test/icon.png',
      category: '성능 테스트',
      status: 'launched'
    },
    {
      id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
      title: '한글 타자 연습',
      description: '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요',
      icon_url: '/images/tools/korean-typing/icon.png',
      category: '타이핑 연습',
      status: 'launched'
    },
    {
      id: 'english-typing-test',
      title: '영문 타자 연습',
      description: '영문 타이핑 속도와 정확도를 향상시키는 체계적인 학습 도구',
      icon_url: '/images/tools/english-typing/icon.png',
      category: '타이핑 연습',
      status: 'launched'
    },
    {
      id: 'ac54699f-e7e5-4075-8230-7ae6c604104a',
      title: '키보드 반응속도 테스트',
      description: '키보드의 입력 딜레이와 개인 반응속도를 정밀 측정하고 분석합니다',
      icon_url: '/images/tools/reaction-test/icon.png',
      category: '성능 테스트',
      status: 'launched'
    }
  ];

  const categories = [
    '전체',
    '성능 테스트',
    '타이핑 연습'
  ];

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            키보드 도구들
          </h1>
          <p className="text-xl text-gray-400">
            타이핑 연습부터 성능 테스트까지, 키보드와 관련된 모든 도구들
          </p>
        </div>
        <ProjectGrid projects={tools} categories={categories} />
      </div>
    </main>
  );
}