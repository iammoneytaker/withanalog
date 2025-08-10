'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKeyboardSoundStore } from '@/components/GlobalKeyboardSound';

const switchOptions = [
  { value: 'cherry_blue', name: 'Cherry MX Blue (청축)', color: 'bg-blue-500', description: '클릭' },
  { value: 'cherry_red', name: 'Cherry MX Red (적축)', color: 'bg-red-500', description: '선형' },
  { value: 'cherry_brown', name: 'Cherry MX Brown (갈축)', color: 'bg-orange-600', description: '택틸' },
  { value: 'topre', name: 'Topre (무접점)', color: 'bg-purple-500', description: 'Thock' },
  { value: 'alps_white', name: 'Alps White', color: 'bg-gray-300', description: '빈티지' },
  { value: 'gateron_yellow', name: 'Gateron Yellow', color: 'bg-yellow-400', description: '부드러움' }
];

export default function KeyboardSoundTestPage() {
  const { isEnabled, volume, selectedSwitch, setEnabled, setVolume, setSelectedSwitch } = useKeyboardSoundStore();
  const [keyPresses, setKeyPresses] = useState<string[]>([]);

  // 실시간 키 입력 감지 및 소리 재생
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return; // 키 반복 방지
      
      const key = event.key;
      
      // 특수키나 조합키 제외
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      if (key.length > 1 && !['Space', 'Enter', 'Tab', 'Backspace'].includes(key)) return;
      
      // 최근 키 입력 추가
      setKeyPresses(prev => {
        const newPresses = [...prev, key === ' ' ? 'Space' : key].slice(-10);
        return newPresses;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              키보드 사운드 테스트
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            다양한 키보드 스위치의 타건 소리를 직접 들어보세요
            <br />
            <span className="text-blue-400">실제로 키를 눌러서 소리를 체험할 수 있습니다!</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 사운드 컨트롤 */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <span className="text-3xl mr-3">🎵</span>
                  실시간 키보드 사운드
                </h3>
                
                <button
                  onClick={() => setEnabled(!isEnabled)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isEnabled 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {isEnabled ? '🔊 ON' : '🔇 OFF'}
                </button>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="text-blue-400 font-semibold mb-2">✨ 실시간 타이핑 사운드 활성화!</div>
                <div className="text-sm text-blue-300">
                  이제 실제로 키보드를 타이핑할 때마다 선택된 스위치의 사운드가 재생됩니다.
                  <br />아무 키나 눌러보세요!
                </div>
              </div>

              {/* 현재 스위치 정보 */}
              <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 rounded-full ${switchOptions.find(s => s.value === selectedSwitch)?.color} mr-3`}></div>
                  <h4 className="text-xl font-semibold text-white">
                    {switchOptions.find(s => s.value === selectedSwitch)?.name}
                  </h4>
                </div>
                <p className="text-gray-400 text-sm">
                  {switchOptions.find(s => s.value === selectedSwitch)?.description}
                </p>
              </div>

              {/* 볼륨 컨트롤 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-300 font-medium">볼륨</label>
                  <span className="text-gray-400 text-sm">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* 스위치 선택 */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">스위치 선택</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {switchOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => setSelectedSwitch(option.value)}
                      className={`p-4 rounded-lg text-left transition-all duration-200 border ${
                        selectedSwitch === option.value
                          ? 'bg-gray-700/80 border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full ${option.color} mr-3`}></div>
                        <span className="font-medium text-white text-sm">{option.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{option.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center text-gray-500 text-sm">
                💡 실제 타이핑하면서 각 스위치의 차이를 느껴보세요!
              </div>
            </motion.div>
          </div>

          {/* 오른쪽: 실시간 키 입력 모니터 */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">⌨️</span>
                실시간 키 입력
              </h3>
              
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-3">
                  아무 키나 눌러보세요. 선택된 스위치 사운드가 재생됩니다.
                </p>
                
                {/* 최근 키 입력 표시 */}
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[120px]">
                  <div className="text-xs text-gray-500 mb-2">최근 키 입력:</div>
                  <div className="flex flex-wrap gap-2">
                    {keyPresses.map((key, index) => (
                      <motion.span
                        key={`${key}-${index}`}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm border border-blue-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {key}
                      </motion.span>
                    ))}
                  </div>
                  {keyPresses.length === 0 && (
                    <div className="text-gray-500 text-center py-8 text-sm">
                      키를 눌러주세요...
                    </div>
                  )}
                </div>
              </div>

              {/* 키보드 정보 */}
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">현재 스위치 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">타입:</span>
                    <span className="text-white">{selectedSwitch.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">소리 특성:</span>
                    <span className="text-blue-400">
                      {selectedSwitch.includes('blue') ? 'Clicky' :
                       selectedSwitch.includes('red') || selectedSwitch.includes('yellow') ? 'Linear' :
                       selectedSwitch.includes('brown') ? 'Tactile' :
                       selectedSwitch.includes('topre') ? 'Capacitive' : 'Tactile'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 사용 팁 */}
            <motion.div
              className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-blue-400 mb-3">💡 사용 팁</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• 다양한 스위치를 선택해서 소리 차이를 비교해보세요</li>
                <li>• 볼륨을 조절해서 원하는 크기로 설정하세요</li>
                <li>• 실제 타이핑하듯이 연속으로 키를 눌러보세요</li>
                <li>• 헤드폰이나 좋은 스피커로 들으면 더 실감납니다</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 하단: 스위치 비교 섹션 */}
        <motion.div
          className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            스위치별 소리 특징
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Cherry MX Blue (청축)',
                color: 'bg-blue-500',
                sound: '클릭',
                description: '명확한 클릭 소리와 강한 촉감',
                frequency: '높음',
                volume: '큰 소리'
              },
              {
                name: 'Cherry MX Red (적축)',
                color: 'bg-red-500',
                sound: '무음',
                description: '부드럽고 조용한 선형 스위치',
                frequency: '낮음',
                volume: '조용함'
              },
              {
                name: 'Topre (무접점)',
                color: 'bg-purple-500',
                sound: 'Thock',
                description: '독특한 무접점 방식의 깊은 소리',
                frequency: '중저음',
                volume: '중간'
              }
            ].map((switch_, index) => (
              <div
                key={index}
                className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-4 h-4 rounded-full ${switch_.color} mr-3`}></div>
                  <h3 className="font-semibold text-white">{switch_.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{switch_.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">소리 타입:</span>
                    <span className="text-blue-400">{switch_.sound}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">주파수:</span>
                    <span className="text-green-400">{switch_.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">음량:</span>
                    <span className="text-orange-400">{switch_.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}