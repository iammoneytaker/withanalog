'use client';

import { usePathname } from 'next/navigation';

export function AffiliateNotice() {
  const pathname = usePathname();
  
  // 키보드 추천 페이지와 가구 추천 페이지에서만 표시
  if (pathname !== '/recommendations' && pathname !== '/household-items') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 flex items-center justify-center">
      <div className="text-sm font-semibold text-center px-4">
        💡 해당 링크로 구매시 소정의 수수료를 받습니다 (쿠팡, 네이버, AliExpress)
      </div>
    </div>
  );
}