import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'quitsmoke',
    title: '금연말고절연',
    description: '담배를 끊는 것이 아닌, 줄여나가는 새로운 접근법',
    iconPath: '/images/projects/quitsmoke/icon.png',
    status: 'launched',
    appStoreUrl: '...',
    playStoreUrl: '...',
    screenshots: [
      '/images/projects/quitsmoke/screenshot1.png',
      '/images/projects/quitsmoke/screenshot2.png',
      '/images/projects/quitsmoke/screenshot3.png',
      '/images/projects/quitsmoke/screenshot4.png',
    ],
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
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
