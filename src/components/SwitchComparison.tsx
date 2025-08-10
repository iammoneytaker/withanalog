'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const switches = [
  {
    name: 'Cherry MX Blue (청축)',
    type: 'Clicky',
    actuationForce: '50g',
    travelDistance: '4mm',
    actuationPoint: '2.2mm',
    sound: 'Click',
    tactile: true,
    color: 'bg-blue-500',
    description: '클릭감과 소음이 특징적인 스위치. 타이핑 확신감이 뛰어남',
    bestFor: '타이핑, 프로그래밍',
    pros: ['명확한 피드백', '타이핑 정확도 향상', '만족감 높은 클릭감'],
    cons: ['시끄러운 소음', '게이밍에는 부적합', '사무실 환경 부적합']
  },
  {
    name: 'Cherry MX Red (적축)',
    type: 'Linear',
    actuationForce: '45g',
    travelDistance: '4mm',
    actuationPoint: '2mm',
    sound: 'Silent',
    tactile: false,
    color: 'bg-red-500',
    description: '선형적인 키감으로 부드럽고 조용한 스위치',
    bestFor: '게이밍, 장시간 타이핑',
    pros: ['빠른 반응속도', '조용한 소음', '피로도 적음'],
    cons: ['타이핑 실수 가능성', '피드백 부족', '호불호 갈림']
  },
  {
    name: 'Cherry MX Brown (갈축)',
    type: 'Tactile',
    actuationForce: '45g',
    travelDistance: '4mm',
    actuationPoint: '2mm',
    sound: 'Quiet',
    tactile: true,
    color: 'bg-orange-600',
    description: '적당한 택틸감과 조용한 소음의 균형잡힌 스위치',
    bestFor: '사무용, 게이밍 겸용',
    pros: ['균형잡힌 키감', '적당한 피드백', '다용도 사용'],
    cons: ['애매한 택틸감', '특색 부족', '중간적 성격']
  },
  {
    name: 'Cherry MX Black (흑축)',
    type: 'Linear',
    actuationForce: '60g',
    travelDistance: '4mm',
    actuationPoint: '2mm',
    sound: 'Silent',
    tactile: false,
    color: 'bg-gray-900',
    description: '높은 압력의 선형 스위치로 묵직한 키감 제공',
    bestFor: '타이핑, 힘 있는 키감 선호',
    pros: ['묵직한 키감', '타이핑 안정감', '실수 방지'],
    cons: ['높은 피로도', '긴 적응시간', '게이밍 부적합']
  },
  {
    name: '정전용량 무접점 (Topre)',
    type: 'Capacitive',
    actuationForce: '45g',
    travelDistance: '4mm',
    actuationPoint: '1.5mm',
    sound: 'Thock',
    tactile: true,
    color: 'bg-purple-500',
    description: '고급 스위치로 부드럽고 독특한 키감 제공',
    bestFor: '프리미엄 타이핑 경험',
    pros: ['프리미엄 키감', '내구성 뛰어남', '독특한 소리'],
    cons: ['높은 가격', '적응 필요', '커스텀 어려움']
  }
];

export function SwitchComparison() {
  const [selectedSwitch, setSelectedSwitch] = useState(0);

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              스위치 비교 가이드
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            키보드 스위치별 특성을 한눈에 비교해보세요. 
            <br />
            당신의 용도와 취향에 맞는 스위치를 찾아보세요.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 스위치 선택 */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">스위치 선택</h3>
            <div className="space-y-3">
              {switches.map((switch_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedSwitch(index)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 border ${
                    selectedSwitch === index
                      ? 'bg-gray-700 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full ${switch_.color} mr-3`}></div>
                    <div className="font-semibold">{switch_.name}</div>
                  </div>
                  <div className="text-sm text-gray-400">{switch_.type} • {switch_.actuationForce}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 스위치 상세 정보 */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedSwitch}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/80 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className={`w-6 h-6 rounded-full ${switches[selectedSwitch].color} mr-4`}></div>
                <h3 className="text-3xl font-bold">{switches[selectedSwitch].name}</h3>
              </div>

              <p className="text-lg text-gray-300 mb-8">{switches[selectedSwitch].description}</p>

              {/* 스펙 정보 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{switches[selectedSwitch].actuationForce}</div>
                  <div className="text-sm text-gray-400">작동 압력</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{switches[selectedSwitch].travelDistance}</div>
                  <div className="text-sm text-gray-400">총 이동거리</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{switches[selectedSwitch].actuationPoint}</div>
                  <div className="text-sm text-gray-400">작동점</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{switches[selectedSwitch].sound}</div>
                  <div className="text-sm text-gray-400">사운드</div>
                </div>
              </div>

              {/* 특징 */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="text-lg font-semibold mr-4">적합한 용도:</div>
                  <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm">
                    {switches[selectedSwitch].bestFor}
                  </div>
                </div>
              </div>

              {/* 장단점 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    장점
                  </h4>
                  <ul className="space-y-2">
                    {switches[selectedSwitch].pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    단점
                  </h4>
                  <ul className="space-y-2">
                    {switches[selectedSwitch].cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-16">
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            실제 키보드에서 테스트해보세요
          </motion.div>
        </div>
      </div>
    </section>
  );
}