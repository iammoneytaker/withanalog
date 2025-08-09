export const PROJECT_CATEGORIES = [
  '타이핑 연습',
  '성능 테스트',
  '사운드 분석',
  '키보드 도구',
  '커스터마이징',
  '분석 도구',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = ['planned', 'development', 'launched'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Screenshot {
  id: string;
  project_id: string;
  image_url: string;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  status: string;
  app_store_url: string | null;
  play_store_url: string | null;
  content: string;
  features: string[];
  category: string;
  created_at: string;
  updated_at: string;
  screenshots?: string[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  icon_url: string;
  status: ProjectStatus;
  category: ProjectCategory;
  app_store_url?: string;
  play_store_url?: string;
  content: string;
  features: string[];
}
