import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
    title: '한글 타자 연습',
    description: '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요',
    icon_url: '/images/tools/korean-typing/icon.png',
    status: 'launched',
    app_store_url: '',
    play_store_url: '',
    content: `
      <p>한글 타자 연습은 과학적 방법론에 기반한 타이핑 학습 도구입니다.</p>
      <h3>주요 기능</h3>
      <ul>
        <li>단계별 학습 시스템</li>
        <li>WPM/정확도 측정</li>
        <li>개인별 통계 분석</li>
        <li>틀린 글자 집중 연습</li>
      </ul>
    `,
    features: ['단계별 학습', 'WPM 측정', '정확도 분석', '개인 통계', '약점 보완'],
    category: '타이핑 연습',
    created_at: '2024-10-23',
    updated_at: '2024-10-23',
  },
  {
    id: 'ac54699f-e7e5-4075-8230-7ae6c604104a',
    title: '키보드 반응속도 테스트',
    description: '키보드의 입력 딜레이와 개인 반응속도를 정밀 측정하고 분석합니다',
    icon_url: '/images/tools/reaction-test/icon.png',
    status: 'launched',
    app_store_url: '',
    play_store_url: '',
    content: `
      <p>키보드 반응속도 테스트는 하드웨어와 인간의 반응속도를 분리 측정합니다.</p>
      <h3>주요 기능</h3>
      <ul>
        <li>키보드 입력 딜레이 측정</li>
        <li>개인 반응속도 분석</li>
        <li>다양한 테스트 모드</li>
        <li>통계 데이터 제공</li>
      </ul>
    `,
    features: ['입력 딜레이 측정', '반응속도 분석', '통계 차트', '벤치마크 비교'],
    category: '성능 테스트',
    created_at: '2024-10-24',
    updated_at: '2024-10-24',
  },
  {
    id: 'ab782d5b-6248-4cdd-b63f-ae4e6b68b6fd',
    title: '키보드 사운드 테스트',
    description: '각 키의 사운드를 녹음하고 분석하여 키보드의 음향 특성을 파악합니다',
    icon_url: '/images/tools/sound-test/icon.png',
    status: 'development',
    app_store_url: '',
    play_store_url: '',
    content: `
      <p>키보드 사운드 테스트는 각 키의 음향 특성을 과학적으로 분석합니다.</p>
      <h3>주요 기능</h3>
      <ul>
        <li>키별 사운드 녹음</li>
        <li>주파수 분석</li>
        <li>볼륨 측정</li>
        <li>사운드 프로파일 생성</li>
      </ul>
    `,
    features: ['사운드 녹음', '주파수 분석', '볼륨 측정', '음향 프로파일'],
    category: '사운드 분석',
    created_at: '2024-10-29',
    updated_at: '2024-10-29',
  },
];

export async function getProjectById(
  id: string,
  supabase: any
): Promise<Project | null> {
  // 프로젝트 정보 가져오기
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (projectError) {
    console.error('프로젝트 로딩 중 오류 발생:', projectError);
    return null;
  }

  // 스크린샷 가져오기
  const { data: screenshots, error: screenshotError } = await supabase
    .from('screenshots')
    .select('image_url')
    .eq('project_id', id)
    .order('order_index');

  if (screenshotError) {
    console.error('스크린샷 로딩 중 오류 발생:', screenshotError);
  }

  return {
    ...project,
    screenshots: screenshots ? screenshots.map((s: any) => s.image_url) : [],
  };
}

export async function getRecentProjects(
  limit = 3,
  supabase: any
): Promise<Project[]> {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('최근 프로젝트 로딩 중 오류 발생:', error);
    return [];
  }

  return projects || [];
}
