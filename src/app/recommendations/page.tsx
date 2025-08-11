'use client';

import Image from 'next/image';
import Link from 'next/link';

// 실제 독거미 키보드 시리즈 정보 (아우라 브랜드)
const recommendedKeyboards = [
  {
    name: '독거미 AULA F65',
    description:
      '65% 레이아웃으로 컴팩트함과 기능성을 모두 갖춘 입문용 모델. 뛰어난 가성비로 기계식 키보드 입문자에게 최적.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sc3e69fb1beb8456dbffc23acc282f7a4k.png_350x350.png',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVCtZ',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_opQQBnD',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '6만원대',
    tags: ['가성비', '입문용', '컴팩트', 'F65'],
    switchType: '경해축/황축/피치축/청축',
    layout: '65%',
    features: ['핫스왑 지원', 'RGB 백라이트', '유무선 겸용'],
    useCase: '입문용/데스크 절약',
    usageType: '사무용',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: false,
    dampening: '기본 흡음재',
    personalRecommendation:
      '데스크 공간이 좁지수고 핸들링도 무난하다면 바로 이거!',
    recommendedFor: '기계식 키보드 입문자, 데스크 공간 절약 필요한 분',
    realReview:
      '"기계식 첫 입문으로 샀는데 정말 만족스럽다. 6만원대 가격이 믿음이 안 갔는데 예상 이상으로 탄탄하고 타건감도 좋다."',
    rating: 4.9,
  },
  {
    name: '독거미 AULA F75',
    description:
      '75% 레이아웃에 노브까지 갖춘 실용성 최고의 모델. 컴팩트하면서도 기능키를 모두 사용할 수 있어 업무용으로 완벽.',
    imageUrl:
      'https://ae01.alicdn.com/kf/S9d0c285127124820ae8fda27a0cc0b34k.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVDuT',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'naver',
        url: 'https://naver.me/FSSQBNhs',
        label: '네이버에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_omAyFhH',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '4만원대',
    tags: ['가성비', '실용성', '노브', 'F75'],
    switchType: '경해축/황축/피치축/청축/골드축',
    layout: '75%',
    features: ['우상단 노브', '핫스왑 지원', 'RGB 백라이트', '유무선 겸용'],
    useCase: '업무/게이밍 겸용',
    usageType: '업무용',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: true,
    gasketMount: false,
    dampening: '기본 흡음재',
    personalRecommendation:
      '노브 기능 초보도 사용하기 편하고, F키 다 있어서 업무용으로 최적!',
    recommendedFor: '업무 중심 사용자, 기능키 필수인 분, 노브 기능 원하는 분',
    realReview:
      '"노브는 사실 쓸다 보다. RGB 끄고 청축으로 사서 마우스로 차량 음량 조절하다가 다시 키보드로 조절하는 나를 발견..."',
    rating: 4.5,
  },
  {
    name: '독거미 AULA F87',
    description:
      '텐키리스의 정석! 가장 대중적인 87키 배열로 게이밍과 타이핑 모두에 적합한 베스트셀러 모델.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sdb7b484c3aee444a977202fb9be8b8dc6.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVFLk',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_okDNCAT',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '4만원대',
    tags: ['가성비', 'TKL', '게이밍', 'F87'],
    switchType: '경해축/황축/피치축/청축/골드축',
    layout: 'TKL (87키)',
    features: ['핫스왑 지원', 'RGB 백라이트', '유무선 겸용'],
    useCase: '게이밍/일반 사용',
    usageType: '게이밍',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: false,
    dampening: '기본 흡음재',
    personalRecommendation:
      '텐키리스 괜찮다면 강력추천! 사무실이든 게임이든 진짜 강력추천!',
    recommendedFor: '게이머, 텐키리스 선호하는 분, 범용 사용자',
    realReview:
      '"청축 샀는데 주위 사람들이 소리냈다고 하다가 한 달 지나니까 검은 축으로 바꿔달라고 함. 그만큼 만족!"',
    rating: 4.4,
  },
  {
    name: '독거미 F87 Pro',
    description:
      'F87의 프리미엄 버전! 가스켓 마운트와 5중 흡음재로 타건감과 소음을 극대화한 고급 모델.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sdb7b484c3aee444a977202fb9be8b8dc6.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVHuv',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_okDNCAT',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '5만원대',
    tags: ['프리미엄', 'TKL', '가스켓', 'F87Pro'],
    switchType: '경해축/황축/피치축/청축/골드축/그레이축',
    layout: 'TKL (87키)',
    features: [
      '가스켓 마운트',
      '5중 흡음재',
      '소프트웨어 지원',
      'RGB 백라이트',
    ],
    useCase: '프리미엄 타이핑/게이밍',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: true,
    dampening: '5중 흡음재',
  },
  {
    name: '독거미 F98',
    description:
      '풀사이즈의 편의성을 유지하면서도 컴팩트하게! 숫자키패드까지 필요한 사용자를 위한 완벽한 선택.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sef67ac6d7cbb4104935cba8c422ed39aq.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVLjU',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'naver',
        url: 'https://naver.me/xYvUava2',
        label: '네이버에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_oCUeDnl',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '6만원대',
    tags: ['풀사이즈', '숫자패드', '실용성', 'F98'],
    switchType: '경해축/황축/피치축/청축/골드축',
    layout: '98키 (컴팩트 풀사이즈)',
    features: ['핫스왑 지원', 'RGB 백라이트', '유무선 겸용', '숫자패드'],
    useCase: '사무/회계/데이터 입력',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: false,
    dampening: '기본 흡음재',
  },
  {
    name: '독거미 F98 PRO',
    description:
      '풀사이즈의 편의성을 유지하면서도 컴팩트하게! 숫자키패드까지 필요한 사용자를 위한 완벽한 선택.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sb17c8d4f6f0c4428bef420c61a5b7ff30.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVMvn',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_opNyohh',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '7만원대',
    tags: ['풀사이즈', '숫자패드', '실용성', 'F98'],
    switchType: '경해축/황축/피치축/청축/골드축',
    layout: '98키 (컴팩트 풀사이즈)',
    features: ['핫스왑 지원', 'RGB 백라이트', '유무선 겸용', '숫자패드'],
    useCase: '사무/회계/데이터 입력',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: false,
    dampening: '기본 흡음재',
  },
  {
    name: '독거미 F99',
    description:
      '풀사이즈의 왕! 모든 키를 다 갖춘 클래식한 104키 배열로 업무 효율성을 극대화.',
    imageUrl:
      'https://ae01.alicdn.com/kf/S3bb4511c03ba44f281f8c0cc873dd4b5Z.png_350x350.png',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVMWv',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'naver',
        url: '#',
        label: '네이버에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_onB4RDV',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '5만원대',
    tags: ['풀사이즈', '클래식', '업무용', 'F99'],
    switchType: '경해축/황축/피치축/청축/골드축',
    layout: 'Full Size (104키)',
    features: ['핫스왑 지원', 'RGB 백라이트', '유무선 겸용', '완전한 키 배열'],
    useCase: '업무/사무/게이밍',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: false,
    gasketMount: false,
    dampening: '기본 흡음재',
  },
  {
    name: '독거미 F99 Pro',
    description:
      'F99의 프리미엄 버전! 노브와 개선된 키 배치, 더 나은 타건감으로 완성도를 높인 플래그십 모델.',
    imageUrl:
      'https://ae01.alicdn.com/kf/Sa4879ba6c5c64cd0b97bbd2944f7c36dD.jpg_350x350.jpg',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVOqq',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'naver',
        url: 'https://naver.me/5NMYmSAw',
        label: '네이버에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_o2e96nN',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '6만원대',
    tags: ['프리미엄', '풀사이즈', '노브', 'F99Pro'],
    switchType: '경해축/황축/피치축/청축/골드축/그레이축/옐로우축',
    layout: 'Full Size (개선된 배치)',
    features: ['우상단 노브', '개선된 키 배치', 'RGB 백라이트', '유무선 겸용'],
    useCase: '프리미엄 업무/크리에이티브',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: true,
    gasketMount: false,
    dampening: '향상된 흡음재',
  },
  {
    name: '독거미 F108',
    description:
      '독거미 시리즈의 최고봉! 모든 기능을 다 담은 완전체 모델로 타건감과 기능성 모두 최상급.',
    imageUrl:
      'https://ae01.alicdn.com/kf/S6d6d3376ca634dcc86fb31ac73c03e63D.png_350x350.png',
    affiliateLinks: [
      {
        platform: 'coupang',
        url: 'https://link.coupang.com/a/cJVOIG',
        label: '쿠팡에서 보기',
      },
      {
        platform: 'aliexpress',
        url: 'https://s.click.aliexpress.com/e/_onWr8Tz',
        label: 'AliExpress에서 보기',
      },
    ],
    priceRange: '6만원대',
    tags: ['최고급', '풀사이즈', '플래그십', 'F108'],
    switchType:
      '경해축/황축/피치축/청축/골드축/그레이축/옐로우축/회목축/바다축/세이야축',
    layout: 'Full Size (108키)',
    features: [
      '최고급 빌드',
      '모든 스위치 지원',
      'RGB 백라이트',
      '유무선 겸용',
    ],
    useCase: '최고급 사용자/전문가',
    brand: '아우라 (중국)',
    connectivity: '유무선',
    knobSupport: true,
    gasketMount: true,
    dampening: '최고급 흡음재',
  },
];

export default function RecommendationsPage() {
  const filteredKeyboards = recommendedKeyboards;

  return (
    <>
      <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 px-4">
        <div className="bg-yellow-300 text-black text-center p-3 rounded-lg text-sm font-semibold mb-6">
          해당 링크로 구매시 소정의 수수료를 받습니다 (쿠팡, 네이버
          스마트스토어, AliExpress)
        </div>

        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent px-4">
            키보드 추천
          </h1>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 sm:p-5 md:p-6 max-w-4xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3">
              💡 제가 생각하는 현존 가성비 키보드!
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              <span className="text-yellow-400 font-semibold">
                독거미 시리즈를 추천드립니다.
              </span>
              <br />
              중국 아우라社 제품이지만{' '}
              <span className="text-orange-400">5~10만원대 가격</span>에 이런
              퀄리티가 나온다는 게 정말 놀라울 정도입니다.
              <br />
              어떤 분들에게 추천하는지 아래에서 확인해보세요!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredKeyboards.map((kbd) => (
            <div
              key={kbd.name}
              className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col transform hover:scale-105 sm:hover:-translate-y-2 transition-transform duration-300"
            >
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
                <div className="flex gap-2 mt-2 flex-wrap">
                  {kbd.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">브랜드:</span>
                    <span className="text-purple-400">{kbd.brand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">스위치:</span>
                    <span className="text-blue-400 text-xs">
                      {kbd.switchType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">레이아웃:</span>
                    <span className="text-blue-400">{kbd.layout}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">연결:</span>
                    <span className="text-cyan-400">{kbd.connectivity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">가격:</span>
                    <span className="text-green-400 font-semibold">
                      {kbd.priceRange}
                    </span>
                  </div>
                  {kbd.knobSupport && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">노브:</span>
                      <span className="text-yellow-400">지원</span>
                    </div>
                  )}
                  {kbd.gasketMount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">마운트:</span>
                      <span className="text-orange-400">가스켓</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">흡음재:</span>
                    <span className="text-pink-400 text-xs">
                      {kbd.dampening}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mt-4 flex-grow">
                  {kbd.description}
                </p>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    주요 특징
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {kbd.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-300"
                      >
                        • {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 추천 대상 */}
                {kbd.recommendedFor && (
                  <div className="mt-4 p-3 bg-green-500/10 border-l-4 border-green-500 rounded">
                    <div className="text-xs text-green-300 mb-1 font-medium">
                      👥 이런 분들께 추천
                    </div>
                    <p className="text-sm text-green-200">
                      {kbd.recommendedFor}
                    </p>
                  </div>
                )}

                {/* 개인적인 추천 멘트 */}
                {kbd.personalRecommendation && (
                  <div className="mt-4 p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                    <div className="text-xs text-blue-300 mb-1 font-medium">
                      💬 개인적인 추천
                    </div>
                    <p className="text-sm text-blue-200">
                      {kbd.personalRecommendation}
                    </p>
                  </div>
                )}

                {/* 제휴링크 버튼들 */}
                <div className="mt-4 sm:mt-6 space-y-2">
                  {kbd.affiliateLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-semibold text-sm sm:text-base ${
                        link.platform === 'coupang'
                          ? 'bg-pink-600 hover:bg-pink-700 text-white'
                          : link.platform === 'naver'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredKeyboards.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">선택한 조건에 맞는 키보드가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
