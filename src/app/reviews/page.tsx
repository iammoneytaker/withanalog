// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

export default async function KeyboardReviewsPage() {
  // Future implementation will use Supabase for keyboard reviews
  // const supabase = createServerComponentClient({ cookies });
  // const keyboards: any[] = [];
  // const categories = ['전체'];

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            키보드 리뷰
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            전문가가 직접 테스트한 기계식 키보드 리뷰와 추천
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">곧 만나보세요!</h2>
              <p className="text-gray-400 text-lg mb-6">
                다양한 브랜드와 스위치의 기계식 키보드를 직접 테스트하고 
                상세한 리뷰를 제공할 예정입니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-blue-400 font-semibold mb-2">⌨️ 타이핑 테스트</div>
                  <p className="text-gray-300">실제 타이핑 경험과 WPM 측정</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-green-400 font-semibold mb-2">🔧 빌드 퀄리티</div>
                  <p className="text-gray-300">재료, 내구성, 마감 품질 평가</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-purple-400 font-semibold mb-2">🎵 사운드 분석</div>
                  <p className="text-gray-300">키 사운드 녹음 및 주파수 분석</p>
                </div>
              </div>
            </div>
            
            <div className="text-gray-500">
              <p className="mb-2">준비 중인 리뷰 브랜드:</p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-gray-800 px-3 py-1 rounded">체리 MX</span>
                <span className="bg-gray-800 px-3 py-1 rounded">칼리 스위치</span>
                <span className="bg-gray-800 px-3 py-1 rounded">게이트론</span>
                <span className="bg-gray-800 px-3 py-1 rounded">하이포탄</span>
                <span className="bg-gray-800 px-3 py-1 rounded">토프레</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}