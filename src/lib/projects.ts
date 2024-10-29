import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: '2f4712ba-2e77-4e5c-a418-c4f6d3a03787',
    title: '금연말고절연',
    description: '담배를 끊는 것이 아닌, 줄여나가는 새로운 접근법',
    icon_url: '/images/projects/quitsmoke/icon.png',
    status: 'launched',
    app_store_url: '...',
    play_store_url: '...',
    content: `
      <p>금연말고절연은 ...</p>
      <h3>주요 기능</h3>
      <ul>
        <li>흡연 기록 관리</li>
        <li>통계 분석</li>
        <li>목표 설정</li>
      </ul>
    `,
    features: ['흡연 기록 관리', '통계 분석', '목표 설정', '알림 설정'],
    category: '건강',
    created_at: '2024-10-23',
    updated_at: '2024-10-23',
  },
  {
    id: 'ac54699f-e7e5-4075-8230-7ae6c604104a',
    title: '마음카운터',
    description:
      '화면 터치만으로 카운팅이! 카테고리별 카운팅에 커스텀 배경화면까지..',
    icon_url: '/images/projects/counter/icon.png',
    status: 'launched',
    app_store_url: '...',
    play_store_url: '...',
    content: `
      <p>마음카운터는...</p>
      <h3>주요 기능</h3>
      <ul>
        <li>카운팅</li>
        <li>통계 분석</li>
        <li>목표 설정</li>
        <li>배경화면 설정</li>
      </ul>
    `,
    features: ['카운팅', '통계 분석', '목표 설정', '배경화면 설정'],
    category: '생산성',
    created_at: '2024-10-24',
    updated_at: '2024-10-24',
  },
  {
    id: 'ac54699f-e7e5-4075-8230-7ae6c604104a',
    title: '내손안에로또',
    description: '다양한 게임으로 직접 로또 번호를 추출해볼까요?',
    icon_url: '/images/projects/lotto/icon.png',
    status: 'launched',
    app_store_url: '...',
    play_store_url: '...',
    content: `
      <p>내손안에로또는...</p>
      <h3>주요 기능</h3>
      <ul>
        <li>로또 번호 추출</li>
        <li>게임 추가</li>
        <li>로또 번호 생성</li>
      </ul>
    `,
    features: ['로또 번호 추출', '게임 기능', '로또 번호 생성'],
    category: '생산성',
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
