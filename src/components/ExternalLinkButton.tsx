'use client';

import { useState } from 'react';

interface ExternalLinkButtonProps {
  url: string;
  label: string;
  platform: 'coupang' | 'naver' | 'aliexpress';
  className?: string;
}

export function ExternalLinkButton({ url, label, platform, className }: ExternalLinkButtonProps) {
  const [showFallback, setShowFallback] = useState(false);
  
  const getButtonClass = (platform: string) => {
    const baseClass = "block text-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-semibold text-sm sm:text-base ";
    switch (platform) {
      case 'coupang':
        return baseClass + 'bg-pink-600 hover:bg-pink-700 text-white';
      case 'naver':
        return baseClass + 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return baseClass + 'bg-orange-600 hover:bg-orange-700 text-white';
    }
  };

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 모바일에서는 같은 탭에서 이동 (더 나은 UX)
    if (isMobile()) {
      window.location.href = url;
      return;
    }
    
    // 데스크탑에서는 새 탭에서 열기
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    // 팝업이 차단된 경우 대안 제시
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setShowFallback(true);
      
      // 2차: location.href로 시도 (앱에서 더 잘 동작)
      setTimeout(() => {
        try {
          window.location.href = url;
        } catch (error) {
          console.warn('Link opening failed:', error);
        }
      }, 100);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다! 브라우저에 붙여넣어 주세요.');
    } catch (error) {
      // 클립보드 API 실패 시 대안
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('링크가 복사되었습니다! 브라우저에 붙여넣어 주세요.');
    }
  };

  if (showFallback) {
    return (
      <div className="space-y-2">
        <button
          onClick={handleClick}
          className={getButtonClass(platform) + ' ' + (className || '')}
        >
          {label} 🔗
        </button>
        <button
          onClick={copyToClipboard}
          className="block w-full text-center px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
        >
          📋 링크 복사하기
        </button>
        <p className="text-xs text-gray-400 text-center">
          앱에서 링크가 열리지 않으면 위 버튼으로 링크를 복사하여 브라우저에서 열어주세요
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={getButtonClass(platform) + ' ' + (className || '')}
    >
      {label}
    </button>
  );
}