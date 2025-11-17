'use client';

import { useEffect } from 'react';

// TypeScript 환경에서 window 객체에 dataLayer 속성이 있다고 알려줍니다.
declare global {
  interface Window {
    // dataLayer는 배열이므로 'any[]' 타입이 더 적절합니다.
    dataLayer: any[];
  }
}

// GTM을 사용하므로 컴포넌트 이름을 변경하는 것이 좋습니다.
export default function GoogleTagManager() {
  // GTM ID를 하드코딩합니다.
  const gtmId = 'GTM-PNPQBHF4';
  const isDevelopment = process.env.NODE_ENV === 'development';

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 스크립트를 주입합니다.
  useEffect(() => {
    // gtmId가 하드코딩되어 있으므로 !gtmId 체크는 제거합니다.
    if (isDevelopment) {
      console.log('GTM is disabled in development mode.');
      return; // 개발 모드이면 스크립트를 실행하지 않습니다.
    }
    
    // dataLayer가 없을 경우를 대비해 초기화합니다.
    window.dataLayer = window.dataLayer || [];

    // 요청하신 GTM 스크립트 로직
    (function(w,d,s,l,i){
      // ts(7015) 오류를 해결하기 위해 'w'를 'any' 타입으로 캐스팅합니다.
      // 'w'는 Window 타입이지만, 'l' (문자열 'dataLayer')로 인덱싱하기 위해 타입 단언이 필요합니다.
      (w as any)[l] = (w as any)[l] || [];
      (w as any)[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});
    
    // f 변수 타입을 명확히 합니다.
    const f = d.getElementsByTagName(s)[0];
    
    // j 변수 타입을 HTMLScriptElement로 명시합니다.
    const j = d.createElement(s) as HTMLScriptElement;
    
    const dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    
    // 부모 노드가 있는지 확인하고 스크립트를 삽입합니다.
    if (f && f.parentNode) {
      f.parentNode.insertBefore(j,f);
    } else {
      // f를 찾지 못한 경우 <head>에 직접 추가합니다.
      d.head.appendChild(j);
    }
    })(window,document,'script','dataLayer', gtmId); // gtmId 변수를 사용합니다.

  }, [isDevelopment]); // gtmId는 상수가 되었으므로 의존성 배열에서 제거합니다.

  // 이 컴포넌트는 시각적인 UI를 렌더링하지 않으므로 null을 반환합니다.
  return null;
}