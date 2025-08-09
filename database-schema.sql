-- WithAnalog 키보드 전문 플랫폼 데이터베이스 스키마

-- 기존 projects 테이블을 tools로 변경 (키보드 도구들)
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'development' CHECK (status IN ('planned', 'development', 'launched')),
  category VARCHAR(100) NOT NULL,
  content TEXT,
  features TEXT[], -- 배열로 저장
  app_store_url VARCHAR(500),
  play_store_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 도구 스크린샷 테이블
CREATE TABLE IF NOT EXISTS tool_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 키보드 리뷰 테이블
CREATE TABLE IF NOT EXISTS keyboard_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  switch_type VARCHAR(100),
  layout VARCHAR(50) CHECK (layout IN ('60%', '65%', '75%', 'TKL', 'Full')),
  connection_type VARCHAR(50) CHECK (connection_type IN ('wired', 'wireless', '2.4ghz', 'bluetooth')),
  price_range VARCHAR(50),
  
  -- 리뷰 점수 (1-10)
  typing_score DECIMAL(3,1) CHECK (typing_score >= 1 AND typing_score <= 10),
  build_quality_score DECIMAL(3,1) CHECK (build_quality_score >= 1 AND build_quality_score <= 10),
  sound_score DECIMAL(3,1) CHECK (sound_score >= 1 AND sound_score <= 10),
  design_score DECIMAL(3,1) CHECK (design_score >= 1 AND design_score <= 10),
  value_score DECIMAL(3,1) CHECK (value_score >= 1 AND value_score <= 10),
  overall_score DECIMAL(3,1) CHECK (overall_score >= 1 AND overall_score <= 10),
  
  -- 상세 정보
  pros TEXT[],
  cons TEXT[],
  content TEXT, -- 리뷰 본문
  summary TEXT, -- 요약
  
  -- 메타 정보
  thumbnail_url VARCHAR(500),
  category VARCHAR(100) DEFAULT '기계식 키보드',
  is_recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 키보드 리뷰 이미지 테이블
CREATE TABLE IF NOT EXISTS keyboard_review_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES keyboard_reviews(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 타이핑 테스트 결과 테이블
CREATE TABLE IF NOT EXISTS typing_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session VARCHAR(255), -- 익명 세션 식별자
  test_type VARCHAR(50) DEFAULT 'korean' CHECK (test_type IN ('korean', 'english', 'mixed')),
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('초급', '중급', '고급')),
  
  -- 결과 데이터
  wpm INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  time_elapsed INTEGER NOT NULL, -- 초 단위
  total_chars INTEGER NOT NULL,
  correct_chars INTEGER NOT NULL,
  incorrect_chars INTEGER NOT NULL,
  
  -- 추가 분석 데이터
  text_length INTEGER,
  error_positions INTEGER[], -- 틀린 위치들
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 반응속도 테스트 결과 테이블
CREATE TABLE IF NOT EXISTS reaction_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session VARCHAR(255), -- 익명 세션 식별자
  
  -- 세션 통계
  average_reaction_time INTEGER NOT NULL, -- ms
  accuracy DECIMAL(5,2) NOT NULL,
  valid_results INTEGER NOT NULL,
  total_tests INTEGER NOT NULL,
  
  -- 상세 결과 JSON
  detailed_results JSONB, -- [{keyPressed, reactionTime, timestamp, isValid}, ...]
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 키보드 티어 시스템 테이블
CREATE TABLE IF NOT EXISTS keyboard_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  min_score DECIMAL(3,1) NOT NULL,
  max_score DECIMAL(3,1) NOT NULL,
  color_class VARCHAR(50), -- CSS 클래스명
  tier_level INTEGER NOT NULL, -- 1이 최고 티어
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 커뮤니티 기능: 사용자 테이블 (향후 확장용)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url VARCHAR(500),
  
  -- 타이핑 통계
  best_wpm INTEGER DEFAULT 0,
  average_wpm INTEGER DEFAULT 0,
  best_accuracy DECIMAL(5,2) DEFAULT 0,
  total_typing_tests INTEGER DEFAULT 0,
  
  -- 반응속도 통계
  best_reaction_time INTEGER, -- ms
  average_reaction_time INTEGER, -- ms
  total_reaction_tests INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 커뮤니티 게시물 테이블 (향후 확장용)
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_keyboard_reviews_brand ON keyboard_reviews(brand);
CREATE INDEX IF NOT EXISTS idx_keyboard_reviews_overall_score ON keyboard_reviews(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_typing_test_results_session ON typing_test_results(user_session);
CREATE INDEX IF NOT EXISTS idx_typing_test_results_created_at ON typing_test_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reaction_test_results_session ON reaction_test_results(user_session);
CREATE INDEX IF NOT EXISTS idx_reaction_test_results_created_at ON reaction_test_results(created_at DESC);

-- 초기 데이터 삽입

-- 키보드 도구들
INSERT INTO tools (id, title, description, icon_url, status, category, content, features) VALUES
  ('2f4712ba-2e77-4e5c-a418-c4f6d3a03787', '한글 타자 연습', '체계적인 한글 타이핑 학습과 WPM 측정으로 타이핑 실력을 향상시켜보세요', '/images/tools/korean-typing/icon.png', 'launched', '타이핑 연습', '<p>한글 타자 연습은 과학적 방법론에 기반한 타이핑 학습 도구입니다.</p><h3>주요 기능</h3><ul><li>단계별 학습 시스템</li><li>WPM/정확도 측정</li><li>개인별 통계 분석</li><li>틀린 글자 집중 연습</li></ul>', ARRAY['단계별 학습', 'WPM 측정', '정확도 분석', '개인 통계', '약점 보완']),
  
  ('ac54699f-e7e5-4075-8230-7ae6c604104a', '키보드 반응속도 테스트', '키보드의 입력 딜레이와 개인 반응속도를 정밀 측정하고 분석합니다', '/images/tools/reaction-test/icon.png', 'launched', '성능 테스트', '<p>키보드 반응속도 테스트는 하드웨어와 인간의 반응속도를 분리 측정합니다.</p><h3>주요 기능</h3><ul><li>키보드 입력 딜레이 측정</li><li>개인 반응속도 분석</li><li>다양한 테스트 모드</li><li>통계 데이터 제공</li></ul>', ARRAY['입력 딜레이 측정', '반응속도 분석', '통계 차트', '벤치마크 비교']),
  
  ('ab782d5b-6248-4cdd-b63f-ae4e6b68b6fd', '키보드 사운드 테스트', '각 키의 사운드를 녹음하고 분석하여 키보드의 음향 특성을 파악합니다', '/images/tools/sound-test/icon.png', 'development', '사운드 분석', '<p>키보드 사운드 테스트는 각 키의 음향 특성을 과학적으로 분석합니다.</p><h3>주요 기능</h3><ul><li>키별 사운드 녹음</li><li>주파수 분석</li><li>볼륨 측정</li><li>사운드 프로파일 생성</li></ul>', ARRAY['사운드 녹음', '주파수 분석', '볼륨 측정', '음향 프로파일']);

-- 키보드 티어 시스템 초기 데이터
INSERT INTO keyboard_tiers (name, description, min_score, max_score, color_class, tier_level) VALUES
  ('S 티어', '완벽한 키보드 - 모든 면에서 뛰어난 성능', 9.0, 10.0, 'text-purple-400', 1),
  ('A 티어', '우수한 키보드 - 대부분의 사용자에게 만족스러운 경험', 8.0, 8.9, 'text-blue-400', 2),
  ('B 티어', '좋은 키보드 - 가성비가 뛰어난 선택', 7.0, 7.9, 'text-green-400', 3),
  ('C 티어', '평범한 키보드 - 기본적인 기능은 충족', 6.0, 6.9, 'text-yellow-400', 4),
  ('D 티어', '아쉬운 키보드 - 개선이 필요한 제품', 0.0, 5.9, 'text-red-400', 5);

-- 트리거 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 적용
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_keyboard_reviews_updated_at BEFORE UPDATE ON keyboard_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();