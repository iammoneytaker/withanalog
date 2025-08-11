'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

const keyboardLayouts = [
  { 
    name: 'Full Size (104키)', 
    description: '모든 기능을 포함한 완전한 레이아웃',
    percentage: 35,
    color: 'from-blue-500 to-blue-600',
    icon: '⌨️'
  },
  { 
    name: 'TKL (87키)', 
    description: '텐키리스, 게이밍에 인기',
    percentage: 28,
    color: 'from-green-500 to-green-600',
    icon: '🎯'
  },
  { 
    name: '60% (61키)', 
    description: '컴팩트하고 모던한 선택',
    percentage: 22,
    color: 'from-purple-500 to-purple-600',
    icon: '🎨'
  },
  { 
    name: '75% (84키)', 
    description: '기능성과 크기의 절충안',
    percentage: 15,
    color: 'from-orange-500 to-orange-600',
    icon: '⚡'
  },
];

const switchTypes = [
  { name: '리니어 (적축계열)', sound: '조용하고 부드러운', popularity: 40, color: 'bg-red-500' },
  { name: '택타일 (갈축계열)', sound: '적당한 클릭감', popularity: 35, color: 'bg-yellow-600' },
  { name: '클리키 (청축계열)', sound: '뚜렷한 클릭음', popularity: 15, color: 'bg-blue-500' },
  { name: '무접점 (토프레)', sound: '독특한 타감', popularity: 10, color: 'bg-purple-500' },
];

export function InteractiveSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedSwitch, setSelectedSwitch] = useState(0);
  const [wpmCount, setWpmCount] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);

  // 애니메이션용 카운터
  useEffect(() => {
    if (inView) {
      const wpmTimer = setInterval(() => {
        setWpmCount(prev => {
          if (prev < 120) return prev + 2;
          return 120;
        });
      }, 50);

      const reactionTimer = setInterval(() => {
        setReactionTime(prev => {
          if (prev < 15.2) return prev + 0.3;
          return 15.2;
        });
      }, 100);

      return () => {
        clearInterval(wpmTimer);
        clearInterval(reactionTimer);
      };
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              당신의 키보드는?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            인터랙티브 요소를 통해 키보드의 세계를 미리 체험해보세요
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 왼쪽: 키보드 레이아웃 선택기 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
              🖊️ 선호하는 키보드 레이아웃은?
            </h3>
            
            <div className="space-y-4">
              {keyboardLayouts.map((layout, index) => (
                <motion.div
                  key={index}
                  className={`
                    p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${selectedLayout === index 
                      ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20' 
                      : 'border-gray-700 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60'
                    }
                  `}
                  onClick={() => setSelectedLayout(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{layout.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">{layout.name}</h4>
                        <p className="text-sm text-gray-400">{layout.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-400">{layout.percentage}%</div>
                      <div className="text-xs text-gray-500">사용자 선호도</div>
                    </div>
                  </div>
                  
                  {/* 진행바 */}
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${layout.color}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${layout.percentage}%` } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 오른쪽: 스위치 타입 & 실시간 통계 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* 스위치 선택 */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                🔊 스위치 타입 체험
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {switchTypes.map((switchType, index) => (
                  <motion.div
                    key={index}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-300
                      ${selectedSwitch === index 
                        ? 'border-purple-500 bg-purple-900/20' 
                        : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
                      }
                    `}
                    onClick={() => setSelectedSwitch(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full ${switchType.color} mx-auto mb-2`}></div>
                      <div className="text-sm font-medium text-white">{switchType.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{switchType.sound}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 실시간 통계 미니 데모 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-lg font-bold text-white mb-4 text-center">📊 실시간 성능 데모</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">
                    {wpmCount.toFixed(0)} WPM
                  </div>
                  <div className="text-xs text-gray-400 mt-1">평균 타이핑 속도</div>
                  <div className="w-full bg-blue-900/30 rounded-full h-1 mt-2">
                    <motion.div
                      className="h-1 bg-blue-500 rounded-full"
                      animate={{ width: `${(wpmCount / 120) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">
                    {reactionTime.toFixed(1)}ms
                  </div>
                  <div className="text-xs text-gray-400 mt-1">평균 반응시간</div>
                  <div className="w-full bg-green-900/30 rounded-full h-1 mt-2">
                    <motion.div
                      className="h-1 bg-green-500 rounded-full"
                      animate={{ width: `${Math.min((reactionTime / 20) * 100, 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link href="/tools/keyboard-performance-test">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 실제 테스트 시작하기
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 인터랙티브 CTA */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-600/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              🎯 개인화된 추천을 받아보세요!
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              선택하신 <span className="text-blue-400 font-medium">{keyboardLayouts[selectedLayout].name}</span>과{' '}
              <span className="text-purple-400 font-medium">{switchTypes[selectedSwitch].name}</span>
              조합에 최적화된 키보드를 추천해드립니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recommendations">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💡 맞춤 추천 받기
                </motion.button>
              </Link>
              
              <Link href="/tools">
                <motion.button
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🛠️ 모든 테스트 도구 보기
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}