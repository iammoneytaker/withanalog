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

  // 사운드 재생 함수
  const playKeySound = useCallback((frequency: number = 800) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
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
    
    // 사운드 재생 (키에 따라 다른 주파수)
    const frequency = 400 + (keyCode.charCodeAt(0) % 400);
    playKeySound(frequency);
    
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
    const baseStyle = "m-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 transition-all duration-75 text-center font-mono text-sm select-none";
    
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
    if (key === 'Space') return 'w-64';
    if (key === 'Backspace' || key === 'Delete' || key === 'Enter' || key === 'Return') return 'w-20';
    if (key === 'Tab' || key === 'CapsLock') return 'w-16';
    if (key === 'Shift') return 'w-24';
    return 'w-12';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 컨트롤 패널 */}
      <div className="mb-8 bg-gray-800 rounded-lg p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={isRecording ? stopTesting : startTesting}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRecording ? '테스트 중지' : '테스트 시작'}
            </button>
            
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
            >
              리셋
            </button>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
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
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600"
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
            <div className="text-green-400 text-lg font-semibold">
              🔴 테스트 진행 중... 키보드를 눌러보세요!
            </div>
          </motion.div>
        )}
      </div>

      {/* 통계 패널 */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.totalPresses}</div>
          <div className="text-gray-400 text-sm">총 입력</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{stats.uniqueKeys.size}</div>
          <div className="text-gray-400 text-sm">사용된 키</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.averageSpeed}ms</div>
          <div className="text-gray-400 text-sm">평균 간격</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-yellow-400">
            {stats.fastestKey ? stats.fastestKey.replace('Key', '').replace('Digit', '') : '-'}
          </div>
          <div className="text-gray-400 text-sm">가장 빠른 키</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-red-400">
            {stats.slowestKey ? stats.slowestKey.replace('Key', '').replace('Digit', '') : '-'}
          </div>
          <div className="text-gray-400 text-sm">가장 느린 키</div>
        </div>
      </div>

      {/* 가상 키보드 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col items-center space-y-2">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map((key, keyIndex) => (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`${getKeyStyle(key)} ${getKeyWidth(key)} min-h-[40px] flex items-center justify-center`}
                >
                  {key === 'Space' ? '스페이스' : key}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>실제 키보드로 입력하면 위의 가상 키보드에서 해당 키가 강조됩니다</p>
          <p>테스트를 시작한 후 아무 키나 눌러보세요!</p>
        </div>
      </div>

      {/* 최근 입력 기록 */}
      {keyHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-800 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">최근 입력 기록</h3>
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {keyHistory.slice(-24).map((keyData, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded px-2 py-1 text-center text-sm text-white font-mono"
              >
                {keyData.key === ' ' ? 'SP' : keyData.key.toUpperCase()}
              </div>
            ))}
          </div>
          {keyHistory.length > 24 && (
            <p className="text-gray-400 text-sm mt-2">
              ... 그리고 {keyHistory.length - 24}개 더
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default KeyboardTester;