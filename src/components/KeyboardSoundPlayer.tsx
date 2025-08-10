'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SwitchSoundConfig {
  name: string;
  displayName: string;
  color: string;
  // 소리 특성 (Web Audio API로 합성)
  clickFrequency: number;      // 클릭 소리 주파수
  clickDuration: number;       // 클릭 소리 지속시간 (ms)
  thockFrequency: number;      // 바닥에 닿는 소리 주파수
  thockDelay: number;          // 클릭 후 바닥 소리까지의 지연시간 (ms)
  volume: number;              // 기본 볼륨 (0-1)
  hasClick: boolean;           // 클릭 소리 여부
  description: string;
}

const switchConfigs: SwitchSoundConfig[] = [
  {
    name: 'cherry_blue',
    displayName: 'Cherry MX Blue (청축)',
    color: 'bg-blue-500',
    clickFrequency: 2500,
    clickDuration: 50,
    thockFrequency: 150,
    thockDelay: 30,
    volume: 0.8,
    hasClick: true,
    description: '명확한 클릭 소리와 촉각 피드백'
  },
  {
    name: 'cherry_red',
    displayName: 'Cherry MX Red (적축)',
    color: 'bg-red-500',
    clickFrequency: 0, // 클릭 소리 없음
    clickDuration: 0,
    thockFrequency: 120,
    thockDelay: 20,
    volume: 0.4,
    hasClick: false,
    description: '부드럽고 조용한 선형 스위치'
  },
  {
    name: 'cherry_brown',
    displayName: 'Cherry MX Brown (갈축)',
    color: 'bg-orange-600',
    clickFrequency: 1800, // 약한 클릭
    clickDuration: 30,
    thockFrequency: 140,
    thockDelay: 25,
    volume: 0.5,
    hasClick: true,
    description: '적당한 택틸감과 소음의 균형'
  },
  {
    name: 'topre',
    displayName: 'Topre (무접점)',
    color: 'bg-purple-500',
    clickFrequency: 0,
    clickDuration: 0,
    thockFrequency: 200, // 깊은 thock 소리
    thockDelay: 15,
    volume: 0.7,
    hasClick: false,
    description: '독특한 무접점 방식의 깊은 소리'
  },
  {
    name: 'alps_white',
    displayName: 'Alps White',
    color: 'bg-gray-300',
    clickFrequency: 2800,
    clickDuration: 40,
    thockFrequency: 180,
    thockDelay: 25,
    volume: 0.6,
    hasClick: true,
    description: '빈티지 Alps 스위치의 독특한 소리'
  },
  {
    name: 'gateron_yellow',
    displayName: 'Gateron Yellow',
    color: 'bg-yellow-400',
    clickFrequency: 0,
    clickDuration: 0,
    thockFrequency: 110,
    thockDelay: 18,
    volume: 0.45,
    hasClick: false,
    description: '부드러운 선형 스위치'
  }
];

interface KeyboardSoundPlayerProps {
  currentSwitch?: string;
  onSwitchChange?: (switchName: string) => void;
  showControls?: boolean;
}

export function KeyboardSoundPlayer({ 
  currentSwitch = 'cherry_blue', 
  onSwitchChange,
  showControls = true 
}: KeyboardSoundPlayerProps) {
  const [selectedSwitch, setSelectedSwitch] = useState(currentSwitch);
  const [volume, setVolume] = useState(0.7);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // 오디오 컨텍스트 초기화
  useEffect(() => {
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      } catch (error) {
        console.error('오디오 컨텍스트 초기화 실패:', error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // 볼륨 업데이트
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isEnabled ? volume : 0, 
        audioContextRef.current.currentTime
      );
    }
  }, [volume, isEnabled]);

  const generateKeySound = useCallback((config: SwitchSoundConfig) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isEnabled) return;

    const audioContext = audioContextRef.current;
    const currentTime = audioContext.currentTime;

    // 클릭 소리 생성 (청축 등)
    if (config.hasClick && config.clickFrequency > 0) {
      const clickOscillator = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      
      clickOscillator.connect(clickGain);
      clickGain.connect(gainNodeRef.current);
      
      clickOscillator.frequency.setValueAtTime(config.clickFrequency, currentTime);
      clickOscillator.type = 'square';
      
      // 클릭 소리 엔벨로프
      clickGain.gain.setValueAtTime(0, currentTime);
      clickGain.gain.linearRampToValueAtTime(config.volume * 0.7, currentTime + 0.005);
      clickGain.gain.exponentialRampToValueAtTime(0.001, currentTime + config.clickDuration / 1000);
      
      clickOscillator.start(currentTime);
      clickOscillator.stop(currentTime + config.clickDuration / 1000);
    }

    // 바닥에 닿는 소리 (thock)
    const thockDelay = config.thockDelay / 1000;
    const thockOscillator = audioContext.createOscillator();
    const thockGain = audioContext.createGain();
    const thockFilter = audioContext.createBiquadFilter();
    
    thockOscillator.connect(thockFilter);
    thockFilter.connect(thockGain);
    thockGain.connect(gainNodeRef.current);
    
    thockOscillator.frequency.setValueAtTime(config.thockFrequency, currentTime + thockDelay);
    thockOscillator.type = 'sine';
    
    // 로우패스 필터로 더 자연스러운 소리
    thockFilter.type = 'lowpass';
    thockFilter.frequency.setValueAtTime(800, currentTime + thockDelay);
    thockFilter.Q.setValueAtTime(2, currentTime + thockDelay);
    
    // Thock 소리 엔벨로프
    thockGain.gain.setValueAtTime(0, currentTime + thockDelay);
    thockGain.gain.linearRampToValueAtTime(config.volume, currentTime + thockDelay + 0.01);
    thockGain.gain.exponentialRampToValueAtTime(0.001, currentTime + thockDelay + 0.15);
    
    thockOscillator.start(currentTime + thockDelay);
    thockOscillator.stop(currentTime + thockDelay + 0.15);

  }, [isEnabled]);

  const playSound = useCallback(() => {
    if (!isEnabled) return;
    
    const config = switchConfigs.find(s => s.name === selectedSwitch);
    if (config) {
      setIsPlaying(true);
      generateKeySound(config);
      setTimeout(() => setIsPlaying(false), 200);
    }
  }, [selectedSwitch, generateKeySound, isEnabled]);

  const handleSwitchChange = (switchName: string) => {
    setSelectedSwitch(switchName);
    if (onSwitchChange) {
      onSwitchChange(switchName);
    }
    // 스위치 변경 시 즉시 소리 재생
    const config = switchConfigs.find(s => s.name === switchName);
    if (config) {
      generateKeySound(config);
    }
  };

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
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
          }}
        />
      </div>

      {/* 테스트 버튼 */}
      <div className="mb-6 text-center">
        <motion.button
          onClick={playSound}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <div className="flex items-center mt-2 space-x-2">
                {config.hasClick && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                    클릭
                  </span>
                )}
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