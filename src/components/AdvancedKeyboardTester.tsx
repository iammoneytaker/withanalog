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
  apm: number; // Actions Per Minute
  cps: number; // Clicks Per Second
  currentText: string;
}

const AdvancedKeyboardTester: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyHistory, setKeyHistory] = useState<KeyData[]>([]);
  const [stats, setStats] = useState<KeyboardStats>({
    totalPresses: 0,
    uniqueKeys: new Set(),
    averageSpeed: 0,
    fastestKey: '',
    slowestKey: '',
    apm: 0,
    cps: 0,
    currentText: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [keyTimings, setKeyTimings] = useState<Map<string, number[]>>(new Map());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [keyboardLayout, setKeyboardLayout] = useState<'qwerty' | 'mac'>('qwerty');
  const [inputMode, setInputMode] = useState<'english' | 'korean'>('english');
  const [isComposing, setIsComposing] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef<number>(0);
  const textInputRef = useRef<string>('');

  // 한글 조합을 위한 상태
  const [koreanInput, setKoreanInput] = useState({
    initial: '',
    medial: '',
    final: '',
    composing: false
  });

  // 한글 자음/모음 매핑
  const koreanMap = {
    consonants: {
      'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ', 'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
      'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ', 'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
      'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ', 'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ'
    },
    shiftConsonants: {
      'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ', 'Y': 'ㅛ', 'U': 'ㅕ', 'I': 'ㅑ', 'O': 'ㅒ', 'P': 'ㅖ'
    }
  };

  // 키보드 레이아웃 정의
  const qwertyLayout = [
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', '한/영', 'Alt', 'Space', 'Alt', 'Ctrl']
  ];

  const currentLayout = qwertyLayout;

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

  // 한영 전환 함수
  const toggleInputMode = useCallback(() => {
    setInputMode(prev => prev === 'english' ? 'korean' : 'english');
    setKoreanInput({ initial: '', medial: '', final: '', composing: false });
  }, []);

  // 한글 입력 처리
  const processKoreanInput = useCallback((key: string) => {
    const char = key.toLowerCase();
    const isShift = pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight');
    const koreanChar = isShift && koreanMap.shiftConsonants[key as keyof typeof koreanMap.shiftConsonants] 
      ? koreanMap.shiftConsonants[key as keyof typeof koreanMap.shiftConsonants]
      : koreanMap.consonants[char as keyof typeof koreanMap.consonants];

    if (koreanChar) {
      setStats(prev => ({ ...prev, currentText: prev.currentText + koreanChar }));
      textInputRef.current += koreanChar;
    }
  }, [pressedKeys]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isRecording) return;
    
    const keyCode = event.code;
    const key = event.key;
    
    // 이미 눌린 키는 무시 (키 반복 방지)
    if (pressedKeys.has(keyCode)) return;
    
    // 한영 전환 (Alt + 한자 키 또는 Shift + Space)
    if ((keyCode === 'AltLeft' || keyCode === 'AltRight') && pressedKeys.has('Backquote')) {
      event.preventDefault();
      toggleInputMode();
      return;
    }
    if (keyCode === 'Space' && (pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight'))) {
      event.preventDefault();
      toggleInputMode();
      return;
    }
    
    event.preventDefault();
    
    const timestamp = performance.now();
    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }
    
    setPressedKeys(prev => new Set([...prev, keyCode]));
    
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

    // 텍스트 입력 처리
    if (keyCode === 'Space') {
      setStats(prev => ({ ...prev, currentText: prev.currentText + ' ' }));
      textInputRef.current += ' ';
    } else if (keyCode === 'Backspace') {
      setStats(prev => ({ 
        ...prev, 
        currentText: prev.currentText.slice(0, -1) 
      }));
      textInputRef.current = textInputRef.current.slice(0, -1);
    } else if (keyCode === 'Enter') {
      setStats(prev => ({ ...prev, currentText: prev.currentText + '\n' }));
      textInputRef.current += '\n';
    } else if (key.length === 1) {
      if (inputMode === 'korean') {
        processKoreanInput(key);
      } else {
        setStats(prev => ({ ...prev, currentText: prev.currentText + key }));
        textInputRef.current += key;
      }
    }
    
    // 사운드 재생
    const frequency = 400 + (keyCode.charCodeAt(0) % 400);
    playKeySound(frequency);
    
  }, [isRecording, pressedKeys, playKeySound, inputMode, processKoreanInput, toggleInputMode]);

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
    const currentTime = performance.now();
    const elapsedMinutes = (currentTime - startTimeRef.current) / 60000; // 분 단위
    const elapsedSeconds = (currentTime - startTimeRef.current) / 1000; // 초 단위
    
    // APM 계산 (Actions Per Minute)
    const apm = elapsedMinutes > 0 ? Math.round(totalPresses / elapsedMinutes) : 0;
    
    // CPS 계산 (Clicks Per Second)
    const cps = elapsedSeconds > 0 ? Number((totalPresses / elapsedSeconds).toFixed(2)) : 0;
    
    // 평균 속도 계산
    let intervals: number[] = [];
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
    
    setStats(prev => ({
      ...prev,
      totalPresses,
      uniqueKeys,
      averageSpeed,
      fastestKey,
      slowestKey,
      apm,
      cps
    }));
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
    startTimeRef.current = 0;
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
      slowestKey: '',
      apm: 0,
      cps: 0,
      currentText: ''
    });
    setKoreanInput({ initial: '', medial: '', final: '', composing: false });
    startTimeRef.current = 0;
    textInputRef.current = '';
  };

  // 키 스타일 가져오기
  const getKeyStyle = (key: string) => {
    const baseStyle = "m-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 transition-all duration-75 text-center font-mono text-sm select-none";
    
    // 키코드 매핑
    const keyCodeMap: { [key: string]: string } = {
      'Space': 'Space',
      'Enter': 'Enter',
      'Backspace': 'Backspace',
      'Tab': 'Tab',
      'Shift': 'ShiftLeft',
      'Ctrl': 'ControlLeft',
      'Alt': 'AltLeft',
      'CapsLock': 'CapsLock',
      'Escape': 'Escape',
      '한/영': 'Backquote'
    };
    
    const keyCode = keyCodeMap[key] || `Key${key.toUpperCase()}` || `Digit${key}`;
    const isPressed = pressedKeys.has(keyCode) || pressedKeys.has(`Key${key}`) || pressedKeys.has(`Digit${key}`);
    
    if (isPressed) {
      return `${baseStyle} bg-blue-500 border-blue-400 transform scale-95 shadow-lg`;
    }
    
    // 한영 전환 키 특별 표시
    if (key === '한/영') {
      return `${baseStyle} ${inputMode === 'korean' ? 'bg-green-600 border-green-400' : 'bg-gray-600'}`;
    }
    
    return baseStyle;
  };

  const getKeyWidth = (key: string) => {
    if (key === 'Space') return 'w-64';
    if (key === 'Backspace' || key === 'Enter') return 'w-20';
    if (key === 'Tab' || key === 'CapsLock') return 'w-16';
    if (key === 'Shift') return 'w-24';
    if (key === '한/영') return 'w-16';
    return 'w-12';
  };

  const getKeyDisplay = (key: string) => {
    if (key === '한/영') return inputMode === 'korean' ? '한' : '영';
    if (inputMode === 'korean' && key.length === 1) {
      const char = key.toLowerCase();
      return koreanMap.consonants[char as keyof typeof koreanMap.consonants] || key;
    }
    return key === 'Space' ? '스페이스' : key;
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

            <button
              onClick={toggleInputMode}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                inputMode === 'korean'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {inputMode === 'korean' ? '한글 모드' : 'English Mode'}
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
          </div>
        </div>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <div className="text-green-400 text-lg font-semibold">
              🔴 테스트 진행 중... {inputMode === 'korean' ? '한글' : '영문'} 입력 모드
            </div>
            <div className="text-gray-400 text-sm mt-2">
              한영 전환: Shift + Space 또는 Alt + `
            </div>
          </motion.div>
        )}
      </div>

      {/* APM/CPS 및 통계 패널 */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-7 gap-4">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{stats.apm}</div>
          <div className="text-purple-100 text-sm">APM</div>
          <div className="text-purple-200 text-xs">Actions/min</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{stats.cps}</div>
          <div className="text-orange-100 text-sm">CPS</div>
          <div className="text-orange-200 text-xs">Clicks/sec</div>
        </div>
        
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
          <div className="text-gray-400 text-sm">빠른 키</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-red-400">
            {stats.slowestKey ? stats.slowestKey.replace('Key', '').replace('Digit', '') : '-'}
          </div>
          <div className="text-gray-400 text-sm">느린 키</div>
        </div>
      </div>

      {/* 입력된 텍스트 표시 */}
      {stats.currentText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gray-800 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">입력된 텍스트</h3>
          <div className="bg-gray-900 p-4 rounded-lg font-mono text-lg text-white min-h-[100px] whitespace-pre-wrap break-all">
            {stats.currentText || '여기에 입력된 텍스트가 표시됩니다...'}
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            현재 모드: {inputMode === 'korean' ? '한글' : '영문'} | 
            글자 수: {stats.currentText.length}
          </div>
        </motion.div>
      )}

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
                  {getKeyDisplay(key)}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>실제 키보드로 입력하면 위의 가상 키보드에서 해당 키가 강조됩니다</p>
          <p>한영 전환: <kbd className="bg-gray-700 px-2 py-1 rounded">Shift + Space</kbd> 또는 <kbd className="bg-gray-700 px-2 py-1 rounded">Alt + `</kbd></p>
        </div>
      </div>

      {/* APM/CPS 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gray-800 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">📊 측정 지표 설명</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-2">APM (Actions Per Minute)</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• 분당 행동 횟수를 측정하는 지표</li>
              <li>• 게임(특히 RTS)에서 플레이어 실력 측정에 사용</li>
              <li>• 높을수록 빠른 반응속도와 조작 능력을 의미</li>
              <li>• 프로게이머: 300+ APM, 일반인: 50-150 APM</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-2">CPS (Clicks Per Second)</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• 초당 클릭/키 입력 수를 측정하는 지표</li>
              <li>• 순간적인 입력 속도와 반응성을 나타냄</li>
              <li>• 버스트 타이핑이나 게임에서 중요한 지표</li>
              <li>• 일반 타이핑: 2-5 CPS, 게임: 5-15+ CPS</li>
            </ul>
          </div>
        </div>
      </motion.div>

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

export default AdvancedKeyboardTester;