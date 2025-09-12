'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLinkButton } from '@/components/ExternalLinkButton';

type CategoryType = '실용성' | '가성비' | '디자인' | '호기심' | 'AI추천';

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
  categoryType: CategoryType;
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
    categoryType: '가성비',
    personalRecommendation: '태양을 피하고 싶었어~',
  },
  {
    id: '2',
    name: '하포스 침대',
    shortDescription: '가성비 짱 침대',
    fullDescription:
      '퀸 사이즈는 생각보다 무거워서 여성분들이라면 혼자 옮기기 힘들 수 있습니다. 다만, 발통 설치는 쉽게 할 수 있고 조립 자체는 쉽습니다. 만약 구매하신다면 발통 19CM 추천드릴게요. 아래에 수납용으로 활용할 수 있으니까요. 그리고 85-87KG인 제가 뛰어도 상관 없을 정도로 튼튼합니다.',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_3764.JPG',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cMsMXn',
        label: '구매하러가기',
      },
    ],
    priceRange: '10만원대',
    originalPrice: '11만원~10만원(쿠폰차이)',
    tags: ['퀸사이즈', '지정일설치'],
    category: '가구',
    categoryType: '가성비',
    personalRecommendation: '돗자리를 벗어나게 해준 침대야 고마워',
  },
  {
    id: '3',
    name: '리시스커스텀 베이직 1400X800 책상',
    shortDescription: '내 맘에 들어온 책상',
    fullDescription:
      '집에서 작업하시는 분들에게 추천드려요. 또한 책상을 넓게 쓰고 싶고 이쁜 디자인 좋아하시면 마음에 드실거에요. 제가 책상을 쿵쿵쳐도 괜찮을만큼 탄탄합니다. 모니터암을 연결할 수 있게 책상 틀 구조도 좋게 되었어요. 다만, 피스 박는거 어려우시면 조립은 조금 힘들 수 있어요. 조립하고나면 짱짱 좋아요~',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_3856.JPG',
    affiliateLinks: [
      {
        platform: 'naver',
        url: 'https://naver.me/II4fI6fH',
        label: '구매하러가기',
      },
    ],
    priceRange: '11만원대',
    originalPrice: '11만원~12만원(쿠폰차이)',
    tags: ['1400X800', '지정일설치'],
    category: '가구',
    categoryType: '가성비',
    personalRecommendation: '바닥에서 밥 먹는거 벗어나게 해줘서 고마워!',
  },
  {
    id: '4',
    name: '카멜 싱글 모니터암 CA1',
    shortDescription: '내 목을 지켜주는 아이',
    fullDescription:
      '360도 회전되는 모니터암, 27인치까지라고 나와있는데, 제가 사용하는 28인치 모니터도 조립이 가능합니다! 틸트 기능도 있어서 위 아래로도 모니터 이동도 가능합니다. ',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_3857.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cMHd3V',
        label: '구매하러가기',
      },
    ],
    priceRange: '2만원대',
    originalPrice: '2만6천원(와우할인)',
    tags: ['360도 회전', '틸트 상하 움직임'],
    category: 'IT제품',
    categoryType: '가성비',
    personalRecommendation:
      '과장 조금 하면 이거 없으면 모니터 보기 힘들 지경..',
  },
  {
    id: '5',
    name: '한성 무접점키보드(GK868B)',
    shortDescription: '내 손목을 지켜주는 아이',
    fullDescription:
      '3년, 하루 8시간 매일 함께하던 녀석이라 소중한 아이입니다. 키보드를 잘 모를 때 샀지만 매일 사무실에서 치더라도 혼나지 않았으며 손에 피로감이 덜했어요. 무접점이라 소리는 조용하며 타건감은 도각도각은 아니지만 부드럽게 눌리며 굉장히 좋습니다.',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/SE-b7e1d2ff-8c4d-4b86-9a2e-9451e7a055ff.jpg',
    affiliateLinks: [
      {
        platform: 'naver',
        url: 'https://naver.me/FnVmBcwW',
        label: '구매하러가기',
      },
    ],
    priceRange: '14만원대',
    originalPrice: '13만9천원',
    tags: ['무접점 기분좋음', '텐키리스'],
    category: 'IT제품',
    categoryType: '디자인',
    personalRecommendation: '나랑 3년 넘게 8시간씩 함께한 녀석..',
  },
  {
    id: '6',
    name: '가구레시피 국내생산 조립식 스마트 렌지대 선반',
    shortDescription: '정리 스트레스 막아준 아이',
    fullDescription:
      '선반이 필요한데 저처럼 밥솥이나 커피머신기 자주 사용하는 분들이라면 실용적이라고 느끼실 것 같아요. 조립의 난이도는 정말 간단했습니다.(개인적인 경험이므로 사람마다 다르겠지만 저는 10분-30분 예상됩니다) 지금은 만족하며 잘 쓰고 있어요. 아마 화장대로도 활용이 가능할 것 같긴 하지만, 저는 화장을 하지 않기 때문에 밥솥장으로 쓰고 있답니다!',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/da.png',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cM1Zhl',
        label: '구매하러가기',
      },
    ],
    priceRange: '5만원대',
    originalPrice: '5만2천9백원',
    tags: ['슬라이딩, 밥솥에 좋음'],
    category: '가구',
    categoryType: '실용성',
    personalRecommendation: '우리 집에서 정리를 제일 잘하는 녀석',
  },
  {
    id: '7',
    name: '자동차 마운트 전기 진공 마그네틱 홀더 아이폰(흡착식 거치대)',
    shortDescription: '딱 붙여서 사용 가능한 만능 홀더, 촬영용으로 딱',
    fullDescription:
      '흡착 방식이라 마음에 들었고, 광고를 보고 될까? 하며 제일 저렴한 제품을 구매한건데 되서 깜짝 놀란 제품입니다. 타일, 냉장고 등 다 잘 붙는데 벽지나 나무는 안 붙으니 이 점 유의해주세요. 아마 차량에는 잘 붙을 것 같아요. 소재에 따라 다르다는 점 유의해주세요!',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4016.jpg',
    affiliateLinks: [
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_on5Wo73',
        label: '구매하러가기',
      },
    ],
    priceRange: '2-3천원대',
    originalPrice: '4천원',
    tags: ['촬영용', '네비용', '이게되네'],
    category: '생활용품',
    categoryType: '호기심',
    personalRecommendation: '필요한 경우라면 강추 아니면 안추',
  },
  {
    id: '8',
    name: '자동 감지 쓰레기통 12L',
    shortDescription: '집안에 손님 왔을 때 있어보이려고 산 쓰레기통',
    fullDescription:
      '이게 작동 안될 줄 알았는데, 되서 제일 기쁜 제품이에요. 저는 할인받아서 6천5백원에 샀는데 지금 가격이 다시 보니 2만원으로 되어 있어서 찜해두었다가 나중에 할인할 때 사시는 것을 추천드려요!! 천원마트인가 할인할 때 사면 개이득!',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4015.jpg',
    affiliateLinks: [
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_oFbLr81',
        label: '구매하러가기',
      },
    ],
    priceRange: '1-2만원대',
    originalPrice: '3만5천원',
    tags: ['위생', '멋짐폭발', '자동센서'],
    category: '생활용품',
    categoryType: '호기심',
    personalRecommendation: '이제 손으로 쓰레기통 여는게 귀찮아짐',
  },
  {
    id: '9',
    name: '조정 가능한 알루미늄 노트북 스탠드(접이식)',
    shortDescription: '접어서 들고 다니기 편리한 노트북 스탠드입니다.',
    fullDescription:
      '카페에서 작업 많이 하시는 분들이라면 하나쯤 쟁여둬도 괜찮지 않을까 생각이 드는 제품입니다. 저의 경우는 집에서 사용하려고 샀지만, 휴대성이라는 장점이 있어서 말씀드립니다 ㅎㅎ',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4010.JPG',
    affiliateLinks: [
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_oDtHfbR',
        label: '구매하러가기',
      },
    ],
    priceRange: '3-4천원대',
    originalPrice: '4600원',
    tags: ['휴대성', '접이식'],
    category: 'IT제품',
    categoryType: '호기심',
    personalRecommendation: '거북목 좀 없애보려고...',
  },
  {
    id: '10',
    name: '코멧 홈 흡착식 샤워기 홀더 3개',
    shortDescription: '이동이 가능한 샤워기 홀더 느낌',
    fullDescription:
      '있으면 좋고, 없으면 허전한 그런 물건 하나씩 있으시죠? 비슷한 느낌입니다. 고정되어 있는 샤워기 홀더의 높이가 높거나 내가 원하는 곳에 부착하고 사용하고 싶으신 분들에게 추천드려요.',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4101.jpg',
    affiliateLinks: [
      {
        platform: 'aliexpress',
        url: 'https://link.coupang.com/a/cN7a2k',
        label: '구매하러가기',
      },
    ],
    priceRange: '2330원(3개)',
    originalPrice: '2330원',
    tags: ['편리함', '있으면 좋은?'],
    category: '생활용품',
    categoryType: '실용성',
    personalRecommendation: '발에만 뿌리고 싶을 때 유용..',
  },
  {
    id: '11',
    name: '자동차 마운트 전기 진공 마그네틱 홀더 아이폰(흡착식 거치대)',
    shortDescription: '다이얼 소리가 마음에 드는 흡착식 촬영용 거치대였습니다.',
    fullDescription:
      '흡착 방식의 거치대를 2천원 주고 구매했는데 비싸면 뭐가 다른데? 생각하며 구매한 것입니다. 근데 다이얼 방식으로 흡착이 강화되는 와중에 다이얼 소리가 마음에 들어서 저는 이게 더 좋아요. 타일, 냉장고 등 다 잘 붙는데 벽지나 나무는 안 붙으니 이 점 유의해주세요. 차량에는 따로 벽지 소재가 아니라면 잘 붙을 것 같아요. 안되면 이 제품은 바닥판을 제공하니 붙이고 사용 가능할 것 같습니다. 소재에 따라 다르다는 점 유의해주세요!',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4114.jpg',
    affiliateLinks: [
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_oBKUS99',
        label: '구매하러가기',
      },
    ],
    priceRange: '9천원 - 1만원대',
    originalPrice: '11,565원',
    tags: ['촬영용', '다이얼방식', '이게되네'],
    category: '생활용품',
    categoryType: '호기심',
    personalRecommendation: '개인적으로 저는 마음에 듦',
  },
  {
    id: '12',
    name: '하루의공간 소프트 규조토 발매트 화장실 욕실 주방 빨아쓰는 미끄럼방지',
    shortDescription: '흡수력 좋고 디자인 좋은 욕실용 발매트',
    fullDescription:
      'AI가 추천해줘서 욕실용 발매트를 구입하게 되었는데 색상은 베이지로 구매하였고 흡수력 좋고 디자인 좋아서 너무 마음에 들었던 상품입니다.',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/fda.jpg',
    affiliateLinks: [
      {
        platform: 'naver',
        url: 'https://naver.me/GsoA0pHN',
        label: '구매하러가기',
      },
    ],
    priceRange: '7,900원',
    originalPrice: '12,000원',
    tags: ['욕실용', '규조토', '미끄럼방지', '베이지'],
    category: '생활용품',
    categoryType: 'AI추천',
    personalRecommendation: 'AI가 추천해줘서 구매했는데 만족해서 신기함',
  },
  {
    id: '12',
    name: '독거미 키보드 F87 PRO',
    shortDescription: '이쁘고 다 되는데 가성비..',
    fullDescription:
      'AI가 추천해준 현시점 가성비 키보드 끝판왕, 타건음도 마음에 들고 피로도도 적어 저에게는 딱 맞았습니다. 약간 도각도각소리가 나서 치는 맛이 생겼어요 ㅎㅎ',
    imageUrl:
      'https://jszchnsbkfvpczxypimw.supabase.co/storage/v1/object/public/projects/recommends/IMG_4427.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cQtCzc',
        label: '구매하러가기',
      },
    ],
    priceRange: '42,600원',
    originalPrice: '99,900원',
    tags: ['가성비', '보글보글', '기계식', '이쁨'],
    category: 'IT제품',
    categoryType: 'AI추천',
    personalRecommendation:
      'AI가 추천해줬는데 생각보다 마음에 듦, 무엇보다 한성키보드 약 20만원 주고 산게 후회되는 중',
  },
];

const categories: { id: CategoryType; label: string; icon: string }[] = [
  { id: '가성비', label: '가성비', icon: '💰' },
  { id: '실용성', label: '실용성', icon: '🔧' },
  { id: '디자인', label: '디자인', icon: '🎨' },
  { id: '호기심', label: '호기심', icon: '🤔' },
  { id: 'AI추천', label: 'AI추천', icon: '🤖' },
];

export default function HouseholdItemsPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | 'all'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sort items by ID in descending order (newest first)
  const sortedItems = [...householdItems].sort(
    (a, b) => parseInt(b.id) - parseInt(a.id)
  );

  // Filter by category and search term
  const filteredItems = sortedItems
    .filter(
      (item) =>
        selectedCategory === 'all' || item.categoryType === selectedCategory
    )
    .filter((item) => searchTerm === '' || item.name.includes(searchTerm));

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all border-2"
        style={{
          backgroundColor: isDarkMode ? '#f3f4f6' : '#1f2937',
          color: isDarkMode ? '#1f2937' : '#f3f4f6',
          borderColor: isDarkMode ? '#1f2937' : '#f3f4f6',
        }}
        aria-label="테마 변경"
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
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
            취향에 맞다면..
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            💡 1인 가구 자취러들을 위한 필수템아님. <br />
            그냥 필요한 사람이 구매하길 바랍니다.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="제품 이름으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 pl-10 rounded-full text-sm transition-all ${
                isDarkMode
                  ? 'bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs - Mobile Optimized */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max px-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전체보기
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optimized Mobile Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Enhanced Sale/Hot Badge */}
              {(item.isSale || item.isHot) && (
                <div className="absolute top-3 left-3 z-20 flex gap-1">
                  {item.isSale && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
                      💥특가
                    </div>
                  )}
                  {item.isHot && (
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                      🔥핫딜
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Image Container with Overlay */}
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Optimized Content Layout */}
              <div className="p-3 sm:p-4">
                {/* Category Badge - Top Right */}
                <div className="flex justify-end mb-2">
                  <div
                    className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium ${
                      isDarkMode
                        ? 'bg-blue-900/30 text-blue-300'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {item.categoryType}
                  </div>
                </div>

                {/* Price First - Most Important */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {item.priceRange}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`font-bold text-sm sm:text-base mb-2 line-clamp-2 leading-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </h3>

                {/* Personal Recommendation - Key Selling Point */}
                <div
                  className={`p-2 rounded-lg mb-3 border-l-4 ${
                    isDarkMode
                      ? 'bg-blue-900/20 border-blue-400 text-blue-300'
                      : 'bg-blue-50 border-blue-400 text-blue-700'
                  }`}
                >
                  <p className="text-[11px] sm:text-xs font-medium">
                    💭 {item.personalRecommendation}
                  </p>
                </div>

                {/* Compact Description */}
                <p
                  className={`text-[10px] sm:text-xs mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {item.shortDescription}
                </p>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600 text-gray-300'
                          : 'bg-gray-50 border-gray-300 text-gray-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Details */}
                {expandedItems.has(item.id) && (
                  <div
                    className={`mb-4 p-3 rounded-xl border-2 border-dashed ${
                      isDarkMode
                        ? 'bg-gray-700/30 border-gray-600'
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <p
                      className={`text-[11px] sm:text-xs mb-2 leading-relaxed ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      📝 {item.fullDescription}
                    </p>
                    {item.saleEndDate && (
                      <p
                        className={`text-xs mt-2 font-semibold ${
                          isDarkMode ? 'text-red-300' : 'text-red-600'
                        }`}
                      >
                        ⏰ ~{item.saleEndDate}까지
                      </p>
                    )}
                  </div>
                )}

                {/* Enhanced CTA Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }}
                    className={`w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl transition-all duration-200 font-bold border-2 ${
                      expandedItems.has(item.id)
                        ? isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300'
                        : isDarkMode
                        ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700 hover:border-blue-400'
                        : 'bg-blue-500 border-blue-400 text-white hover:bg-blue-600 hover:border-blue-300'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    {expandedItems.has(item.id) ? '📚 접기' : '👀 리뷰보기'}
                  </button>

                  {/* Enhanced Purchase Button */}
                  <ExternalLinkButton
                    url={item.affiliateLinks[0].url}
                    label="🔍 상품 자세히 보기"
                    platform={item.affiliateLinks[0].platform}
                    className="w-full !bg-gradient-to-r !from-emerald-500 !to-green-600 hover:!from-emerald-600 hover:!to-green-700 !text-white !font-bold !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-200 !border-0 !py-3.5 !text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div
          className={`mt-8 sm:mt-12 p-3 sm:p-4 rounded-lg text-center ${
            isDarkMode
              ? 'bg-blue-900/20 border border-blue-500/30'
              : 'bg-blue-100 border border-blue-300'
          }`}
        >
          <p
            className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}
          >
            💡 모든 제품은 제가 직접 사용해보고 추천드리는 제품입니다
          </p>
          <p
            className={`text-[10px] sm:text-xs mt-1 ${
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
