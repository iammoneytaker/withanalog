export type ProjectCategory =
  | '건강'
  | '생산성'
  | '라이프스타일'
  | '유틸리티'
  | '교육'
  | '엔터테인먼트';

export interface Project {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  status: 'launched' | 'development' | 'planned';
  appStoreUrl?: string;
  playStoreUrl?: string;
  screenshots: string[];
  content: string;
  features: string[];
  category: ProjectCategory;
}
