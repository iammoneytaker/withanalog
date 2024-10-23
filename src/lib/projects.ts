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
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
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
