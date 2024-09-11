export interface Application {
  id: string;
  name: string;
  icon: string;
  slogan: string;
}

export const applications: Application[] = [
  {
    id: 'quitsmoke',
    name: '금연말고절연',
    icon: '/images/quitsmoke/logo.png',
    slogan: '담배는 끊는 것이 아니라 참는 것',
  },

  // 여기에 새로운 앱을 추가할 수 있습니다.
];
