'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SwitchSoundConfig {
  name: string;
  displayName: string;
  color: string;
  audioFile: string;      // 실제 오디오 파일 경로
  volume: number;         // 기본 볼륨 (0-1)
  description: string;
}

const switchConfigs: SwitchSoundConfig[] = [
  {
    name: 'cherry_blue',
    displayName: 'Cherry MX Blue (청축)',
    color: 'bg-blue-500',
    audioFile: '/sounds/청축.wav',
    volume: 0.8,
    description: '명확한 클릭 소리와 촉각 피드백'
  },
  {
    name: 'cherry_red',
    displayName: 'Cherry MX Red (적축)',
    color: 'bg-red-500',
    audioFile: '/sounds/적축.wav',
    volume: 0.6,
    description: '부드럽고 조용한 선형 스위치'
  },
  {
    name: 'cherry_brown',
    displayName: 'Cherry MX Brown (갈축)',
    color: 'bg-orange-600',
    audioFile: '/sounds/갈축.wav',
    volume: 0.7,
    description: '적당한 택틸감과 소음의 균형'
  }
];

interface KeyboardSoundPlayerProps {
  currentSwitch?: string;
  onSwitchChange?: (switchName: string) => void;
  showControls?: boolean;
}

export function KeyboardSoundPlayer({ 
  currentSwitch = 'cherry_red', // 기본을 적축으로 변경
  onSwitchChange,
  showControls = true 
}: KeyboardSoundPlayerProps) {
  const [selectedSwitch, setSelectedSwitch] = useState(currentSwitch);
  const [volume, setVolume] = useState(0.7);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 오디오 파일들을 미리 로드해서 캐싱
  const audioBuffersRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  
  // 오디오 파일들 미리 로드
  useEffect(() => {
    const preloadAudio = async () => {
      for (const config of switchConfigs) {
        try {
          const audio = new Audio(config.audioFile);
          audio.preload = 'auto';
          audio.volume = volume * config.volume;
          
          // 오디오 로드 완료 대기
          await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve);
            audio.addEventListener('error', reject);
          });
          
          audioBuffersRef.current.set(config.name, audio);
        } catch (error) {
          console.warn(`오디오 파일 로드 실패: ${config.audioFile}`, error);
        }
      }
    };

    preloadAudio();
  }, []);

  // 볼륨 업데이트
  useEffect(() => {
    audioBuffersRef.current.forEach((audio, switchName) => {
      const config = switchConfigs.find(c => c.name === switchName);
      if (config) {
        audio.volume = isEnabled ? volume * config.volume : 0;
      }
    });
  }, [volume, isEnabled]);

  const playSound = useCallback((switchName?: string) => {
    if (!isEnabled) return;
    
    const targetSwitch = switchName || selectedSwitch;
    const audio = audioBuffersRef.current.get(targetSwitch);
    
    if (audio) {
      try {
        // 현재 재생 중인 오디오 정지 및 리셋
        audio.pause();
        audio.currentTime = 0;
        
        // 오디오 재생
        audio.play().catch(error => {
          console.warn('오디오 재생 실패:', error);
        });
        
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 200);
      } catch (error) {
        console.warn('사운드 재생 오류:', error);
      }
    }
  }, [selectedSwitch, isEnabled]);

  const handleSwitchChange = (switchName: string) => {
    setSelectedSwitch(switchName);
    if (onSwitchChange) {
      onSwitchChange(switchName);
    }
    // 스위치 변경 시 즉시 소리 재생
    playSound(switchName);
  };

  // 외부에서 키 입력 시 소리 재생하는 함수를 전역에 노출
  useEffect(() => {
    const handleKeyPress = () => {
      playSound();
    };

    // 전역 이벤트 리스너로 키보드 입력 감지
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playSound]);

  const currentConfig = switchConfigs.find(s => s.name === selectedSwitch) || switchConfigs[0];

  if (!showControls) {
    // 컨트롤 없이 소리만 재생하는 모드
    return null;
  }

  return (
    <motion.div 
      className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <motion.div 
            className="text-3xl mr-3"
            animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            🎵
          </motion.div>
          키보드 사운드 플레이어
        </h3>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isEnabled 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
          >
            {isEnabled ? '🔊 ON' : '🔇 OFF'}
          </button>
        </div>
      </div>

      {/* 현재 선택된 스위치 정보 */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className={`w-4 h-4 rounded-full ${currentConfig.color} mr-3`}></div>
          <h4 className="text-xl font-semibold text-white">{currentConfig.displayName}</h4>
        </div>
        <p className="text-gray-400 text-sm">{currentConfig.description}</p>
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
            background: `linear-gradient(to right, var(--sound-active, #3b82f6) 0%, var(--sound-active, #3b82f6) ${volume * 100}%, var(--sound-track, #374151) ${volume * 100}%, var(--sound-track, #374151) 100%)`
          }}
        />
      </div>

      {/* 테스트 버튼 */}
      <div className="mb-6 text-center">
        <motion.button
          onClick={() => playSound()}
          disabled={!isEnabled}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isEnabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={isEnabled ? { scale: 1.05 } : {}}
          whileTap={isEnabled ? { scale: 0.95 } : {}}
        >
          {isPlaying ? '재생 중...' : '사운드 테스트'}
        </motion.button>
      </div>

      {/* 스위치 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">스위치 선택</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {switchConfigs.map((config) => (
            <motion.button
              key={config.name}
              onClick={() => handleSwitchChange(config.name)}
              className={`p-4 rounded-lg text-left transition-all duration-200 border ${
                selectedSwitch === config.name
                  ? 'bg-gray-700/80 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${config.color} mr-3`}></div>
                <span className="font-medium text-white text-sm">{config.displayName}</span>
              </div>
              <p className="text-gray-400 text-xs">{config.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  볼륨 {Math.round(config.volume * 100)}%
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-gray-500 text-xs">
        💡 실제 타이핑 중에도 선택된 스위치의 소리가 재생됩니다
      </div>
    </motion.div>
  );
}

// 외부에서 사용할 수 있는 전역 사운드 함수
export const playKeySoundGlobally = (switchType: string = 'cherry_blue') => {
  const event = new CustomEvent('playKeySound', { detail: { switchType } });
  window.dispatchEvent(event);
};