'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLinkButton } from '@/components/ExternalLinkButton';

interface HouseholdItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  affiliateLinks: {
    platform: 'coupang' | 'naver' | 'aliexpress';
    url: string;
    label: string;
  }[];
  priceRange: string;
  originalPrice?: string;
  discount?: string;
  tags: string[];
  category: string;
  personalRecommendation: string;
  isHot?: boolean;
  isSale?: boolean;
  saleEndDate?: string;
}

const householdItems: HouseholdItem[] = [
  {
    id: '1',
    name: '무타공 커튼봉 거치대',
    shortDescription: '볼트 돌리면 바로 설치 가능!',
    fullDescription:
      '못 박지 못하는 상황이면 추천합니다. 다만 창틀이 평평하지 않은 경우에 동작하지 않을 수 있으니 평평한지 확인해보고 구매하시는 것을 추천드려요. 그리고 저는 키가 커서 설치가 쉬웠는데 다른 분들은 잘 모르겠네요. 설치 1분이면 가능합니다.',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_3622%202.JPG',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cMjB6w',
        label: '구매하러가기',
      },
    ],
    priceRange: '1만원이하',
    originalPrice: '8,800원',
    tags: ['커튼브라켓', '못없이'],
    category: '생활용품',
    personalRecommendation: '태양을 피하고 싶었어~',
  },
];

export default function HouseholdItemsPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleExpand = (itemId: string) => {
    console.log('Toggling expand for item:', itemId);
    console.log('Current expanded items:', Array.from(expandedItems));
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        console.log('Removed item from expanded');
      } else {
        newSet.add(itemId);
        console.log('Added item to expanded');
      }
      console.log('New expanded items:', Array.from(newSet));
      return newSet;
    });
  };

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from:', isDarkMode, 'to:', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={(e) => {
          console.log('Dark mode button clicked!');
          toggleDarkMode();
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all border-2"
        style={{
          backgroundColor: isDarkMode ? '#f3f4f6' : '#1f2937',
          color: isDarkMode ? '#1f2937' : '#f3f4f6',
          borderColor: isDarkMode ? '#1f2937' : '#f3f4f6',
        }}
        aria-label="테마 변경"
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            우리집에 있는 가구
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            💡 1인 가구 자취러들을 위한 필수템아님. <br />
            그냥 필요한 사람이 구매하길 바랍니다.
          </p>
          <p className="text-xs mt-2 opacity-50">
            디버그: 다크모드 = {isDarkMode ? '활성' : '비활성'} | 확장된 아이템 = {expandedItems.size}개
          </p>
        </div>

        {/* Instagram Style Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {householdItems.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              {/* Sale/Hot Badge */}
              {(item.isSale || item.isHot) && (
                <div className="absolute top-2 left-2 z-10 flex gap-1">
                  {item.isSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      특가
                    </span>
                  )}
                  {item.isHot && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      🔥핫딜
                    </span>
                  )}
                </div>
              )}

              {/* Image Container */}
              <div className="aspect-square relative bg-white">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3
                  className={`font-bold text-sm sm:text-base mb-1 line-clamp-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </h3>

                {/* Price Info */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-400">
                    {item.priceRange}
                  </span>
                  {item.discount && (
                    <span className="text-xs text-red-400 font-semibold">
                      {item.discount} ↓
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p
                  className={`text-xs mb-2 line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {item.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Details */}
                {expandedItems.has(item.id) && (
                  <div
                    className={`mb-3 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                    }`}
                  >
                    <p
                      className={`text-xs mb-2 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      💬 {item.fullDescription}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isDarkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}
                    >
                      ⭐ {item.personalRecommendation}
                    </p>
                    {item.saleEndDate && (
                      <p
                        className={`text-xs mt-2 ${
                          isDarkMode ? 'text-red-300' : 'text-red-600'
                        }`}
                      >
                        ⏰ ~{item.saleEndDate}까지
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Button clicked for item:', item.id);
                      toggleExpand(item.id);
                    }}
                    className={`w-full text-sm py-3 rounded-lg transition-colors font-semibold ${
                      isDarkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {expandedItems.has(item.id) ? '❌ 접기' : '📝 자세히 보기'}
                  </button>

                  <ExternalLinkButton
                    url={item.affiliateLinks[0].url}
                    label={item.affiliateLinks[0].label}
                    platform={item.affiliateLinks[0].platform}
                    className="w-full text-xs py-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div
          className={`mt-12 p-4 rounded-lg text-center ${
            isDarkMode
              ? 'bg-blue-900/20 border border-blue-500/30'
              : 'bg-blue-100 border border-blue-300'
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}
          >
            💡 모든 제품은 제가 직접 사용해보고 추천드리는 제품입니다
          </p>
          <p
            className={`text-xs mt-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            파트너스 활동으로 일정액의 수수료를 받을 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}
