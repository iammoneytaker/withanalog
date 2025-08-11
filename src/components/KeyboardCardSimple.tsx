'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLinkButton } from './ExternalLinkButton';

interface KeyboardCardProps {
  keyboard: any; // 타입은 나중에 정의
  viewMode: 'simple' | 'detailed';
}

export function KeyboardCard({ keyboard: kbd, viewMode }: KeyboardCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  if (viewMode === 'simple' && !showDetails) {
    // 심플 뷰: 이미지, 이름, 가격, 핵심 태그만
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden group transform hover:scale-105 transition-all duration-300">
        {/* 이미지 */}
        <div className="relative w-full h-48 bg-gray-900">
          <Image
            src={kbd.imageUrl}
            alt={kbd.name}
            fill
            className="object-contain p-4"
          />
          {/* 호버 시 빠른 정보 */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              상세 정보 보기
            </button>
          </div>
        </div>
        
        {/* 기본 정보 */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1">{kbd.name}</h3>
          <div className="text-xl font-bold text-green-400 mb-2">{kbd.priceRange}</div>
          
          {/* 핵심 태그 2개만 */}
          <div className="flex gap-2 mb-3">
            {kbd.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          {/* 구매 버튼 */}
          <div className="grid grid-cols-2 gap-2">
            {kbd.affiliateLinks.slice(0, 2).map((link: any, index: number) => (
              <ExternalLinkButton
                key={index}
                url={link.url}
                label={link.platform === 'coupang' ? '쿠팡' : '네이버'}
                platform={link.platform as any}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // 상세 뷰 또는 showDetails가 true일 때는 기존 상세 카드 표시
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col transform hover:scale-105 sm:hover:-translate-y-2 transition-transform duration-300">
      {/* 기존 상세 카드 내용... */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-900">
        <Image
          src={kbd.imageUrl}
          alt={kbd.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h2 className="text-xl sm:text-2xl font-bold">{kbd.name}</h2>
        {/* ... 나머지 상세 정보 ... */}
        
        {showDetails && (
          <button
            onClick={() => setShowDetails(false)}
            className="mt-4 text-sm text-gray-400 hover:text-gray-300"
          >
            간단히 보기
          </button>
        )}
      </div>
    </div>
  );
}