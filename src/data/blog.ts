export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'thoughts' | 'self-discovery' | 'addiction';
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: '매일의 생각 기록하기',
    excerpt: '매일 자신의 생각을 기록하는 것의 중요성에 대해 알아봅시다.',
    category: 'thoughts',
    date: '2024-09-15',
  },
  {
    id: 'post-2',
    title: '자아 탐색의 여정',
    excerpt: '자신을 찾아가는 여정에서 마주하는 도전과 깨달음들.',
    category: 'self-discovery',
    date: '2024-09-18',
  },
  {
    id: 'post-3',
    title: '중독의 이해와 극복',
    excerpt: '다양한 형태의 중독을 이해하고 극복하는 방법에 대해 탐구합니다.',
    category: 'addiction',
    date: '2024-09-20',
  },
  // 더 많은 게시물을 추가할 수 있습니다.
];

export const categories = [
  { id: 'thoughts', name: '생각' },
  { id: 'self-discovery', name: '나를찾기' },
  { id: 'addiction', name: '중독' },
];
