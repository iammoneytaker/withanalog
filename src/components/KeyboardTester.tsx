'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface KeyData {
  keyCode: string;
  key: string;
  timestamp: number;
  isPressed: boolean;
}

interface KeyboardStats {
  totalPresses: number;
  uniqueKeys: Set<string>;
  averageSpeed: number;
  fastestKey: string;
  slowestKey: string;
}

const KeyboardTester: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyHistory, setKeyHistory] = useState<KeyData[]>([]);
  const [stats, setStats] = useState<KeyboardStats>({
    totalPresses: 0,
    uniqueKeys: new Set(),
    averageSpeed: 0,
    fastestKey: '',
    slowestKey: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [keyTimings, setKeyTimings] = useState<Map<string, number[]>>(new Map());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [keyboardLayout, setKeyboardLayout] = useState<'qwerty' | 'mac'>('qwerty');
  
  const audioContextRef = useRef<AudioContext | null>(null);

  // 키보드 레이아웃 정의
  const qwertyLayout = [
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
  ];

  const macLayout = [
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Return'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Control', 'Option', 'Command', 'Space', 'Command', 'Option', 'Control']
  ];

  const currentLayout = keyboardLayout === 'mac' ? macLayout : qwertyLayout;

  // 현실적인 키보드 사운드 재생 함수
  const playKeySound = useCallback((key: string = '') => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const ctx = audioContextRef.current;
      
      // 키보드 소리를 시뮬레이션하기 위한 노이즈와 클릭음 조합
      const createKeyClickSound = () => {
        // 1. 클릭 소리 (짧은 노이즈 버스트)
        const bufferSize = ctx.sampleRate * 0.05; // 50ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          // 화이트 노이즈 생성
          const noise = Math.random() * 2 - 1;
          // 엔벨로프 적용 (빠른 어택, 빠른 디케이)
          const envelope = Math.exp(-i / (ctx.sampleRate * 0.01));
          output[i] = noise * envelope * 0.1;
        }
        
        return buffer;
      };
      
      // 키 유형별 다른 주파수 특성
      const getKeyCharacteristics = (key: string) => {
        if (key === 'Space') {
          return { pitch: 0.8, volume: 0.15, duration: 0.06 }; // 스페이스바는 더 깊은 소리
        } else if (['Enter', 'Return', 'Backspace', 'Delete', 'Tab', 'Shift'].includes(key)) {
          return { pitch: 0.9, volume: 0.12, duration: 0.05 }; // 큰 키들
        } else {
          return { pitch: 1.0, volume: 0.08, duration: 0.04 }; // 일반 키들
        }
      };
      
      const keyChar = getKeyCharacteristics(key);
      
      // 버퍼 소스 생성
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      const filterNode = ctx.createBiquadFilter();
      
      // 키 클릭 사운드 버퍼 생성
      source.buffer = createKeyClickSound();
      
      // 필터로 톤 조정 (키별로 다른 특성)
      filterNode.type = 'highpass';
      filterNode.frequency.value = 200 * keyChar.pitch;
      filterNode.Q.value = 1;
      
      // 연결
      source.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // 볼륨 조절
      gainNode.gain.setValueAtTime(keyChar.volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + keyChar.duration);
      
      // 재생
      source.start(ctx.currentTime);
      source.stop(ctx.currentTime + keyChar.duration);
      
    } catch (error) {
      console.log('Audio context error:', error);
    }
  }, [soundEnabled]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isRecording) return;
    
    const keyCode = event.code;
    const key = event.key;
    
    // 이미 눌린 키는 무시 (키 반복 방지)
    if (pressedKeys.has(keyCode)) return;
    
    event.preventDefault();
    
    const timestamp = performance.now();
    
    setPressedKeys(prev => new Set(Array.from(prev).concat([keyCode])));
    
    const keyData: KeyData = {
      keyCode,
      key,
      timestamp,
      isPressed: true
    };
    
    setKeyHistory(prev => [...prev, keyData]);
    
    // 키 타이밍 기록
    setKeyTimings(prev => {
      const newTimings = new Map(prev);
      const keyTimings = newTimings.get(keyCode) || [];
      keyTimings.push(timestamp);
      newTimings.set(keyCode, keyTimings);
      return newTimings;
    });
    
    // 사운드 재생 (키에 따라 다른 특성)
    playKeySound(key);
    
  }, [isRecording, pressedKeys, playKeySound]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (!isRecording) return;
    
    const keyCode = event.code;
    
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(keyCode);
      return newSet;
    });
  }, [isRecording]);

  // 통계 계산
  useEffect(() => {
    if (keyHistory.length === 0) return;
    
    const uniqueKeys = new Set(keyHistory.map(k => k.keyCode));
    const totalPresses = keyHistory.length;
    
    // 평균 속도 계산 (연속 키 입력 간격)
    const intervals: number[] = [];
    for (let i = 1; i < keyHistory.length; i++) {
      intervals.push(keyHistory[i].timestamp - keyHistory[i-1].timestamp);
    }
    const averageSpeed = intervals.length > 0 
      ? Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length) 
      : 0;
    
    // 가장 빠른/느린 키 찾기
    let fastestKey = '';
    let slowestKey = '';
    let minTime = Infinity;
    let maxTime = 0;
    
    keyTimings.forEach((timings, key) => {
      if (timings.length >= 2) {
        const avgInterval = timings.slice(1).reduce((sum, time, i) => 
          sum + (time - timings[i]), 0) / (timings.length - 1);
        
        if (avgInterval < minTime) {
          minTime = avgInterval;
          fastestKey = key;
        }
        if (avgInterval > maxTime) {
          maxTime = avgInterval;
          slowestKey = key;
        }
      }
    });
    
    setStats({
      totalPresses,
      uniqueKeys,
      averageSpeed,
      fastestKey,
      slowestKey
    });
  }, [keyHistory, keyTimings]);

  // 이벤트 리스너 등록
  useEffect(() => {
    if (isRecording) {
      document.addEventListener('keydown', handleKeyDown, { passive: false });
      document.addEventListener('keyup', handleKeyUp, { passive: false });
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, handleKeyDown, handleKeyUp]);

  const startTesting = () => {
    setIsRecording(true);
  };

  const stopTesting = () => {
    setIsRecording(false);
  };

  const resetTest = () => {
    setIsRecording(false);
    setPressedKeys(new Set());
    setKeyHistory([]);
    setKeyTimings(new Map());
    setStats({
      totalPresses: 0,
      uniqueKeys: new Set(),
      averageSpeed: 0,
      fastestKey: '',
      slowestKey: ''
    });
  };

  // 키 스타일 가져오기
  const getKeyStyle = (key: string) => {
    const baseStyle = "m-0.5 sm:m-1 px-1 sm:px-3 py-1 sm:py-2 bg-gray-700 text-white rounded border sm:rounded-lg border-gray-600 transition-all duration-75 text-center font-mono text-xs sm:text-sm select-none";
    
    // 키코드 매핑
    const keyCodeMap: { [key: string]: string } = {
      'Space': 'Space',
      'Enter': 'Enter',
      'Return': 'Enter',
      'Backspace': 'Backspace',
      'Delete': 'Backspace',
      'Tab': 'Tab',
      'Shift': 'ShiftLeft',
      'Ctrl': 'ControlLeft',
      'Control': 'ControlLeft',
      'Alt': 'AltLeft',
      'Option': 'AltLeft',
      'Command': 'MetaLeft',
      'CapsLock': 'CapsLock',
      'Escape': 'Escape'
    };
    
    const keyCode = keyCodeMap[key] || `Key${key.toUpperCase()}` || `Digit${key}`;
    const isPressed = pressedKeys.has(keyCode) || pressedKeys.has(`Key${key}`) || pressedKeys.has(`Digit${key}`);
    
    if (isPressed) {
      return `${baseStyle} bg-blue-500 border-blue-400 transform scale-95 shadow-lg`;
    }
    
    return baseStyle;
  };

  const getKeyWidth = (key: string) => {
    if (key === 'Space') return 'w-32 sm:w-48 md:w-64';
    if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'Return') return 'w-10 sm:w-16 md:w-20';
    if (key === 'Tab' || key === 'CapsLock') return 'w-8 sm:w-12 md:w-16';
    if (key === 'Shift') return 'w-12 sm:w-18 md:w-24';
    return 'w-6 sm:w-10 md:w-12';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* 컨트롤 패널 */}
      <div className="mb-6 sm:mb-8 bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={isRecording ? stopTesting : startTesting}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRecording ? '테스트 중지' : '테스트 시작'}
            </button>
            
            <button
              onClick={resetTest}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold text-sm sm:text-base"
            >
              리셋
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <label className="flex items-center justify-center sm:justify-start gap-2 text-white text-sm sm:text-base">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              사운드
            </label>
            
            <select
              value={keyboardLayout}
              onChange={(e) => setKeyboardLayout(e.target.value as 'qwerty' | 'mac')}
              className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 text-sm sm:text-base"
            >
              <option value="qwerty">Windows/PC</option>
              <option value="mac">Mac</option>
            </select>
          </div>
        </div>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <div className="text-green-400 text-base sm:text-lg font-semibold">
              🔴 테스트 진행 중... 키보드를 눌러보세요!
            </div>
          </motion.div>
        )}
      </div>

      {/* 통계 패널 */}
      <div className="mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-400">{stats.totalPresses}</div>
          <div className="text-gray-400 text-xs sm:text-sm">총 입력</div>
        </div>
        
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-2xl font-bold text-green-400">{stats.uniqueKeys.size}</div>
          <div className="text-gray-400 text-xs sm:text-sm">사용된 키</div>
        </div>
        
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <div className="text-lg sm:text-2xl font-bold text-purple-400">{stats.averageSpeed}ms</div>
          <div className="text-gray-400 text-xs sm:text-sm">평균 간격</div>
        </div>
        
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <div className="text-sm sm:text-lg font-bold text-yellow-400">
            {stats.fastestKey ? stats.fastestKey.replace('Key', '').replace('Digit', '') : '-'}
          </div>
          <div className="text-gray-400 text-xs sm:text-sm">가장 빠른 키</div>
        </div>
        
        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center">
          <div className="text-sm sm:text-lg font-bold text-red-400">
            {stats.slowestKey ? stats.slowestKey.replace('Key', '').replace('Digit', '') : '-'}
          </div>
          <div className="text-gray-400 text-xs sm:text-sm">가장 느린 키</div>
        </div>
      </div>

      {/* 가상 키보드 */}
      <div className="bg-gray-800 rounded-lg p-3 sm:p-6">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2 overflow-x-auto">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center min-w-fit">
              {row.map((key, keyIndex) => (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`${getKeyStyle(key)} ${getKeyWidth(key)} min-h-[28px] sm:min-h-[40px] flex items-center justify-center`}
                >
                  <span className="text-xs sm:text-sm truncate">
                    {key === 'Space' ? '스페이스' : key}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p className="mb-1">실제 키보드로 입력하면 위의 가상 키보드에서 해당 키가 강조됩니다</p>
          <p>테스트를 시작한 후 아무 키나 눌러보세요!</p>
        </div>
      </div>

      {/* 최근 입력 기록 */}
      {keyHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 bg-gray-800 rounded-lg p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">최근 입력 기록</h3>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1 sm:gap-2">
            {keyHistory.slice(-24).map((keyData, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm text-white font-mono"
              >
                {keyData.key === ' ' ? 'SP' : keyData.key.toUpperCase()}
              </div>
            ))}
          </div>
          {keyHistory.length > 24 && (
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              ... 그리고 {keyHistory.length - 24}개 더
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default KeyboardTester;