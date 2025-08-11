'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardSoundStore } from './GlobalKeyboardSound';

const switchOptions = [
  { value: 'cherry_blue', name: 'Cherry MX Blue (청축)', color: 'bg-blue-500', description: '실제 청축 타건음' },
  { value: 'cherry_red', name: 'Cherry MX Red (적축)', color: 'bg-red-500', description: '실제 적축 타건음' },
  { value: 'cherry_brown', name: 'Cherry MX Brown (갈축)', color: 'bg-orange-600', description: '실제 갈축 타건음' }
];

export function KeyboardSoundController() {
  const [isOpen, setIsOpen] = useState(false);
  const { isEnabled, volume, selectedSwitch, setEnabled, setVolume, setSelectedSwitch } = useKeyboardSoundStore();

  const currentSwitch = switchOptions.find(s => s.value === selectedSwitch) || switchOptions[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 메인 버튼 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-200 flex items-center justify-center ${
          isEnabled 
            ? 'bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30' 
            : 'bg-gray-700/20 border-gray-600/50 hover:bg-gray-700/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isEnabled ? '키보드 사운드 ON' : '키보드 사운드 OFF'}
      >
        <motion.div
          animate={isEnabled ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, repeat: isEnabled ? Infinity : 0, repeatDelay: 2 }}
          className="text-2xl"
        >
          {isEnabled ? '🔊' : '🔇'}
        </motion.div>
      </motion.button>

      {/* 컨트롤 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-4"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">키보드 사운드</h3>
                <button
                  onClick={() => setEnabled(!isEnabled)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    isEnabled
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {isEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
              
              <div className="text-xs text-gray-400 mb-3">
                실제 키 입력시 선택된 스위치 사운드가 재생됩니다
              </div>
            </div>

            {/* 현재 스위치 표시 */}
            <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${currentSwitch.color} mr-2`}></div>
                <span className="text-white text-sm font-medium">{currentSwitch.name}</span>
              </div>
              <div className="text-xs text-gray-400">{currentSwitch.description}</div>
            </div>

            {/* 볼륨 컨트롤 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-300 text-sm font-medium">볼륨</label>
                <span className="text-gray-400 text-xs">{Math.round(volume * 100)}%</span>
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
            <div className="mb-4">
              <label className="text-gray-300 text-sm font-medium mb-2 block">스위치 선택</label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {switchOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedSwitch(option.value)}
                    className={`p-2 rounded-lg text-left transition-all duration-200 ${
                      selectedSwitch === option.value
                        ? 'bg-blue-500/20 border border-blue-400/50'
                        : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <div className={`w-2 h-2 rounded-full ${option.color} mr-2`}></div>
                      <span className="text-white text-xs font-medium">{option.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 정보 */}
            <div className="text-xs text-gray-500 text-center border-t border-gray-700 pt-3">
              💡 아무 키나 눌러서 소리를 테스트해보세요
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}