'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyPressData {
  key: string;
  keyCode: string;
  timestamp: number;
  duration?: number;
}

interface PerformanceStats {
  totalPresses: number;
  uniqueKeys: Set<string>;
  apm: number;
  cps: number;
  averageResponseTime: number;
  fastestKey: { key: string; time: number };
  slowestKey: { key: string; time: number };
  testDuration: number;
}

const KeyboardPerformanceTester: React.FC = () => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyPressHistory, setKeyPressHistory] = useState<KeyPressData[]>([]);
  const [stats, setStats] = useState<PerformanceStats>({
    totalPresses: 0,
    uniqueKeys: new Set(),
    apm: 0,
    cps: 0,
    averageResponseTime: 0,
    fastestKey: { key: '', time: 0 },
    slowestKey: { key: '', time: 0 },
    testDuration: 0
  });
  const [keyboardLayout, setKeyboardLayout] = useState<'tkl' | 'fullsize'>('tkl');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const startTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const keyDownTimesRef = useRef<Map<string, number>>(new Map());

  // 텐키리스 키보드 레이아웃
  const tklLayout = [
    // Function Row
    [
      { key: 'Escape', label: 'Esc', width: 'w-12' },
      { key: 'F1', label: 'F1', width: 'w-12' },
      { key: 'F2', label: 'F2', width: 'w-12' },
      { key: 'F3', label: 'F3', width: 'w-12' },
      { key: 'F4', label: 'F4', width: 'w-12' },
      { key: 'F5', label: 'F5', width: 'w-12' },
      { key: 'F6', label: 'F6', width: 'w-12' },
      { key: 'F7', label: 'F7', width: 'w-12' },
      { key: 'F8', label: 'F8', width: 'w-12' },
      { key: 'F9', label: 'F9', width: 'w-12' },
      { key: 'F10', label: 'F10', width: 'w-12' },
      { key: 'F11', label: 'F11', width: 'w-12' },
      { key: 'F12', label: 'F12', width: 'w-12' }
    ],
    // Number Row
    [
      { key: 'Backquote', label: '`', width: 'w-12' },
      { key: 'Digit1', label: '1', width: 'w-12' },
      { key: 'Digit2', label: '2', width: 'w-12' },
      { key: 'Digit3', label: '3', width: 'w-12' },
      { key: 'Digit4', label: '4', width: 'w-12' },
      { key: 'Digit5', label: '5', width: 'w-12' },
      { key: 'Digit6', label: '6', width: 'w-12' },
      { key: 'Digit7', label: '7', width: 'w-12' },
      { key: 'Digit8', label: '8', width: 'w-12' },
      { key: 'Digit9', label: '9', width: 'w-12' },
      { key: 'Digit0', label: '0', width: 'w-12' },
      { key: 'Minus', label: '-', width: 'w-12' },
      { key: 'Equal', label: '=', width: 'w-12' },
      { key: 'Backspace', label: 'Backspace', width: 'w-20' }
    ],
    // Top Row
    [
      { key: 'Tab', label: 'Tab', width: 'w-16' },
      { key: 'KeyQ', label: 'Q', width: 'w-12' },
      { key: 'KeyW', label: 'W', width: 'w-12' },
      { key: 'KeyE', label: 'E', width: 'w-12' },
      { key: 'KeyR', label: 'R', width: 'w-12' },
      { key: 'KeyT', label: 'T', width: 'w-12' },
      { key: 'KeyY', label: 'Y', width: 'w-12' },
      { key: 'KeyU', label: 'U', width: 'w-12' },
      { key: 'KeyI', label: 'I', width: 'w-12' },
      { key: 'KeyO', label: 'O', width: 'w-12' },
      { key: 'KeyP', label: 'P', width: 'w-12' },
      { key: 'BracketLeft', label: '[', width: 'w-12' },
      { key: 'BracketRight', label: ']', width: 'w-12' },
      { key: 'Backslash', label: '\\', width: 'w-16' }
    ],
    // Home Row
    [
      { key: 'CapsLock', label: 'Caps', width: 'w-20' },
      { key: 'KeyA', label: 'A', width: 'w-12' },
      { key: 'KeyS', label: 'S', width: 'w-12' },
      { key: 'KeyD', label: 'D', width: 'w-12' },
      { key: 'KeyF', label: 'F', width: 'w-12' },
      { key: 'KeyG', label: 'G', width: 'w-12' },
      { key: 'KeyH', label: 'H', width: 'w-12' },
      { key: 'KeyJ', label: 'J', width: 'w-12' },
      { key: 'KeyK', label: 'K', width: 'w-12' },
      { key: 'KeyL', label: 'L', width: 'w-12' },
      { key: 'Semicolon', label: ';', width: 'w-12' },
      { key: 'Quote', label: '\'', width: 'w-12' },
      { key: 'Enter', label: 'Enter', width: 'w-24' }
    ],
    // Bottom Row
    [
      { key: 'ShiftLeft', label: 'Shift', width: 'w-24' },
      { key: 'KeyZ', label: 'Z', width: 'w-12' },
      { key: 'KeyX', label: 'X', width: 'w-12' },
      { key: 'KeyC', label: 'C', width: 'w-12' },
      { key: 'KeyV', label: 'V', width: 'w-12' },
      { key: 'KeyB', label: 'B', width: 'w-12' },
      { key: 'KeyN', label: 'N', width: 'w-12' },
      { key: 'KeyM', label: 'M', width: 'w-12' },
      { key: 'Comma', label: ',', width: 'w-12' },
      { key: 'Period', label: '.', width: 'w-12' },
      { key: 'Slash', label: '/', width: 'w-12' },
      { key: 'ShiftRight', label: 'Shift', width: 'w-32' }
    ],
    // Space Row
    [
      { key: 'ControlLeft', label: 'Ctrl', width: 'w-16' },
      { key: 'MetaLeft', label: 'Win', width: 'w-14' },
      { key: 'AltLeft', label: 'Alt', width: 'w-16' },
      { key: 'Space', label: 'Space', width: 'w-48' },
      { key: 'AltRight', label: 'Alt', width: 'w-16' },
      { key: 'MetaRight', label: 'Win', width: 'w-14' },
      { key: 'ContextMenu', label: 'Menu', width: 'w-14' },
      { key: 'ControlRight', label: 'Ctrl', width: 'w-16' }
    ]
  ];

  // 풀사이즈 키보드 레이아웃 (넘패드 추가)
  const fullsizeLayout = [
    // Function Row + Print Screen area
    [
      { key: 'Escape', label: 'Esc', width: 'w-12' },
      { key: 'F1', label: 'F1', width: 'w-12' },
      { key: 'F2', label: 'F2', width: 'w-12' },
      { key: 'F3', label: 'F3', width: 'w-12' },
      { key: 'F4', label: 'F4', width: 'w-12' },
      { key: 'F5', label: 'F5', width: 'w-12' },
      { key: 'F6', label: 'F6', width: 'w-12' },
      { key: 'F7', label: 'F7', width: 'w-12' },
      { key: 'F8', label: 'F8', width: 'w-12' },
      { key: 'F9', label: 'F9', width: 'w-12' },
      { key: 'F10', label: 'F10', width: 'w-12' },
      { key: 'F11', label: 'F11', width: 'w-12' },
      { key: 'F12', label: 'F12', width: 'w-12' },
      { key: 'PrintScreen', label: 'PrtSc', width: 'w-12' },
      { key: 'ScrollLock', label: 'ScrLk', width: 'w-12' },
      { key: 'Pause', label: 'Pause', width: 'w-12' }
    ],
    // Number Row + Numpad top
    [
      { key: 'Backquote', label: '`', width: 'w-12' },
      { key: 'Digit1', label: '1', width: 'w-12' },
      { key: 'Digit2', label: '2', width: 'w-12' },
      { key: 'Digit3', label: '3', width: 'w-12' },
      { key: 'Digit4', label: '4', width: 'w-12' },
      { key: 'Digit5', label: '5', width: 'w-12' },
      { key: 'Digit6', label: '6', width: 'w-12' },
      { key: 'Digit7', label: '7', width: 'w-12' },
      { key: 'Digit8', label: '8', width: 'w-12' },
      { key: 'Digit9', label: '9', width: 'w-12' },
      { key: 'Digit0', label: '0', width: 'w-12' },
      { key: 'Minus', label: '-', width: 'w-12' },
      { key: 'Equal', label: '=', width: 'w-12' },
      { key: 'Backspace', label: 'Backspace', width: 'w-20' },
      { key: 'Insert', label: 'Ins', width: 'w-12' },
      { key: 'Home', label: 'Home', width: 'w-12' },
      { key: 'PageUp', label: 'PgUp', width: 'w-12' },
      { key: 'NumLock', label: 'Num', width: 'w-12' },
      { key: 'NumpadDivide', label: '/', width: 'w-12' },
      { key: 'NumpadMultiply', label: '*', width: 'w-12' },
      { key: 'NumpadSubtract', label: '-', width: 'w-12' }
    ],
    // Top Row + Numpad
    [
      { key: 'Tab', label: 'Tab', width: 'w-16' },
      { key: 'KeyQ', label: 'Q', width: 'w-12' },
      { key: 'KeyW', label: 'W', width: 'w-12' },
      { key: 'KeyE', label: 'E', width: 'w-12' },
      { key: 'KeyR', label: 'R', width: 'w-12' },
      { key: 'KeyT', label: 'T', width: 'w-12' },
      { key: 'KeyY', label: 'Y', width: 'w-12' },
      { key: 'KeyU', label: 'U', width: 'w-12' },
      { key: 'KeyI', label: 'I', width: 'w-12' },
      { key: 'KeyO', label: 'O', width: 'w-12' },
      { key: 'KeyP', label: 'P', width: 'w-12' },
      { key: 'BracketLeft', label: '[', width: 'w-12' },
      { key: 'BracketRight', label: ']', width: 'w-12' },
      { key: 'Backslash', label: '\\', width: 'w-16' },
      { key: 'Delete', label: 'Del', width: 'w-12' },
      { key: 'End', label: 'End', width: 'w-12' },
      { key: 'PageDown', label: 'PgDn', width: 'w-12' },
      { key: 'Numpad7', label: '7', width: 'w-12' },
      { key: 'Numpad8', label: '8', width: 'w-12' },
      { key: 'Numpad9', label: '9', width: 'w-12' },
      { key: 'NumpadAdd', label: '+', width: 'w-12' }
    ],
    // Home Row + Numpad
    [
      { key: 'CapsLock', label: 'Caps', width: 'w-20' },
      { key: 'KeyA', label: 'A', width: 'w-12' },
      { key: 'KeyS', label: 'S', width: 'w-12' },
      { key: 'KeyD', label: 'D', width: 'w-12' },
      { key: 'KeyF', label: 'F', width: 'w-12' },
      { key: 'KeyG', label: 'G', width: 'w-12' },
      { key: 'KeyH', label: 'H', width: 'w-12' },
      { key: 'KeyJ', label: 'J', width: 'w-12' },
      { key: 'KeyK', label: 'K', width: 'w-12' },
      { key: 'KeyL', label: 'L', width: 'w-12' },
      { key: 'Semicolon', label: ';', width: 'w-12' },
      { key: 'Quote', label: '\'', width: 'w-12' },
      { key: 'Enter', label: 'Enter', width: 'w-24' },
      { key: 'Numpad4', label: '4', width: 'w-12' },
      { key: 'Numpad5', label: '5', width: 'w-12' },
      { key: 'Numpad6', label: '6', width: 'w-12' }
    ],
    // Bottom Row + Numpad
    [
      { key: 'ShiftLeft', label: 'Shift', width: 'w-24' },
      { key: 'KeyZ', label: 'Z', width: 'w-12' },
      { key: 'KeyX', label: 'X', width: 'w-12' },
      { key: 'KeyC', label: 'C', width: 'w-12' },
      { key: 'KeyV', label: 'V', width: 'w-12' },
      { key: 'KeyB', label: 'B', width: 'w-12' },
      { key: 'KeyN', label: 'N', width: 'w-12' },
      { key: 'KeyM', label: 'M', width: 'w-12' },
      { key: 'Comma', label: ',', width: 'w-12' },
      { key: 'Period', label: '.', width: 'w-12' },
      { key: 'Slash', label: '/', width: 'w-12' },
      { key: 'ShiftRight', label: 'Shift', width: 'w-32' },
      { key: 'ArrowUp', label: '↑', width: 'w-12' },
      { key: 'Numpad1', label: '1', width: 'w-12' },
      { key: 'Numpad2', label: '2', width: 'w-12' },
      { key: 'Numpad3', label: '3', width: 'w-12' },
      { key: 'NumpadEnter', label: 'Enter', width: 'w-12' }
    ],
    // Space Row + Arrow Keys + Numpad
    [
      { key: 'ControlLeft', label: 'Ctrl', width: 'w-16' },
      { key: 'MetaLeft', label: 'Win', width: 'w-14' },
      { key: 'AltLeft', label: 'Alt', width: 'w-16' },
      { key: 'Space', label: 'Space', width: 'w-32' },
      { key: 'AltRight', label: 'Alt', width: 'w-16' },
      { key: 'MetaRight', label: 'Win', width: 'w-14' },
      { key: 'ContextMenu', label: 'Menu', width: 'w-14' },
      { key: 'ControlRight', label: 'Ctrl', width: 'w-16' },
      { key: 'ArrowLeft', label: '←', width: 'w-12' },
      { key: 'ArrowDown', label: '↓', width: 'w-12' },
      { key: 'ArrowRight', label: '→', width: 'w-12' },
      { key: 'Numpad0', label: '0', width: 'w-24' },
      { key: 'NumpadDecimal', label: '.', width: 'w-12' }
    ]
  ];

  const currentLayout = keyboardLayout === 'tkl' ? tklLayout : fullsizeLayout;

  // 사운드 재생
  const playKeySound = useCallback((frequency: number = 800, duration: number = 0.1) => {
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
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Audio context error:', error);
    }
  }, [soundEnabled]);

  // 키 눌림 이벤트
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isTestActive) return;
    
    const keyCode = event.code;
    
    // 이미 눌린 키 무시 (키 반복 방지)
    if (pressedKeys.has(keyCode)) return;
    
    event.preventDefault();
    
    const timestamp = performance.now();
    
    // 테스트 시작 시간 기록
    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }
    
    // 키 다운 시간 기록
    keyDownTimesRef.current.set(keyCode, timestamp);
    
    setPressedKeys(prev => new Set(Array.from(prev).concat([keyCode])));
    
    // 키 press 데이터 추가
    const keyPressData: KeyPressData = {
      key: event.key,
      keyCode,
      timestamp
    };
    
    setKeyPressHistory(prev => [...prev, keyPressData]);
    
    // 사운드 재생 (키에 따라 다른 주파수)
    const frequency = 400 + (keyCode.charCodeAt(0) % 500);
    playKeySound(frequency, 0.05);
    
  }, [isTestActive, pressedKeys, playKeySound]);

  // 키 뗌 이벤트
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (!isTestActive) return;
    
    const keyCode = event.code;
    const keyDownTime = keyDownTimesRef.current.get(keyCode);
    
    if (keyDownTime) {
      const duration = performance.now() - keyDownTime;
      
      // 키 press 기록 업데이트 (duration 추가)
      setKeyPressHistory(prev => 
        prev.map(record => 
          record.keyCode === keyCode && !record.duration 
            ? { ...record, duration }
            : record
        )
      );
      
      keyDownTimesRef.current.delete(keyCode);
    }
    
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(keyCode);
      return newSet;
    });
  }, [isTestActive]);

  // 통계 계산
  useEffect(() => {
    if (keyPressHistory.length === 0 || startTimeRef.current === 0) return;
    
    const currentTime = performance.now();
    const testDuration = (currentTime - startTimeRef.current) / 1000; // 초
    const testDurationMinutes = testDuration / 60; // 분
    
    const totalPresses = keyPressHistory.length;
    const uniqueKeys = new Set(keyPressHistory.map(k => k.keyCode));
    
    // APM 계산
    const apm = testDurationMinutes > 0 ? Math.round(totalPresses / testDurationMinutes) : 0;
    
    // CPS 계산
    const cps = testDuration > 0 ? parseFloat((totalPresses / testDuration).toFixed(2)) : 0;
    
    // 평균 응답 시간 계산
    const responseTimes = keyPressHistory
      .filter(k => k.duration)
      .map(k => k.duration!);
    
    const averageResponseTime = responseTimes.length > 0
      ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
      : 0;
    
    // 가장 빠른/느린 키 찾기
    let fastestKey = { key: '', time: Infinity };
    let slowestKey = { key: '', time: 0 };
    
    const keyGroups = keyPressHistory.reduce((groups, press) => {
      if (!groups[press.keyCode]) groups[press.keyCode] = [];
      groups[press.keyCode].push(press);
      return groups;
    }, {} as Record<string, KeyPressData[]>);
    
    Object.entries(keyGroups).forEach(([keyCode, presses]) => {
      const avgTime = presses
        .filter(p => p.duration)
        .reduce((sum, p) => sum + (p.duration || 0), 0) / presses.filter(p => p.duration).length;
      
      if (avgTime > 0) {
        if (avgTime < fastestKey.time) {
          fastestKey = { key: keyCode.replace('Key', '').replace('Digit', ''), time: avgTime };
        }
        if (avgTime > slowestKey.time) {
          slowestKey = { key: keyCode.replace('Key', '').replace('Digit', ''), time: avgTime };
        }
      }
    });
    
    setStats({
      totalPresses,
      uniqueKeys,
      apm,
      cps,
      averageResponseTime,
      fastestKey: fastestKey.time !== Infinity ? fastestKey : { key: '', time: 0 },
      slowestKey,
      testDuration: Math.round(testDuration)
    });
  }, [keyPressHistory]);

  // 이벤트 리스너 등록
  useEffect(() => {
    if (isTestActive) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTestActive, handleKeyDown, handleKeyUp]);

  const startTest = () => {
    setIsTestActive(true);
    startTimeRef.current = 0;
    setKeyPressHistory([]);
    setPressedKeys(new Set());
    keyDownTimesRef.current.clear();
  };

  const stopTest = () => {
    setIsTestActive(false);
  };

  const resetTest = () => {
    setIsTestActive(false);
    startTimeRef.current = 0;
    setKeyPressHistory([]);
    setPressedKeys(new Set());
    keyDownTimesRef.current.clear();
    setStats({
      totalPresses: 0,
      uniqueKeys: new Set(),
      apm: 0,
      cps: 0,
      averageResponseTime: 0,
      fastestKey: { key: '', time: 0 },
      slowestKey: { key: '', time: 0 },
      testDuration: 0
    });
  };

  const getKeyStyle = (keyCode: string) => {
    const isPressed = pressedKeys.has(keyCode);
    const baseStyle = 'h-10 bg-gray-700 text-white text-xs font-mono rounded border border-gray-600 flex items-center justify-center transition-all duration-75 select-none';
    
    if (isPressed) {
      return `${baseStyle} bg-blue-500 border-blue-400 scale-95 shadow-lg`;
    }
    
    return baseStyle;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 컨트롤 패널 */}
      <div className="mb-6 bg-gray-800 rounded-lg p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <button
              onClick={isTestActive ? stopTest : startTest}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isTestActive 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTestActive ? '테스트 중지' : '테스트 시작'}
            </button>
            
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
            >
              리셋
            </button>
            
            <select
              value={keyboardLayout}
              onChange={(e) => setKeyboardLayout(e.target.value as 'tkl' | 'fullsize')}
              className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              disabled={isTestActive}
            >
              <option value="tkl">텐키리스 (TKL)</option>
              <option value="fullsize">풀사이즈 (넘패드)</option>
            </select>
          </div>
          
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              사운드 효과
            </label>
            
            {isTestActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-semibold"
              >
                🔴 테스트 진행 중...
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* APM/CPS 통계 대시보드 */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{stats.apm}</div>
          <div className="text-purple-100 text-sm font-medium">APM</div>
          <div className="text-purple-200 text-xs">Actions/min</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{stats.cps}</div>
          <div className="text-orange-100 text-sm font-medium">CPS</div>
          <div className="text-orange-200 text-xs">Clicks/sec</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.totalPresses}</div>
          <div className="text-gray-400 text-sm">총 입력</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{stats.uniqueKeys.size}</div>
          <div className="text-gray-400 text-sm">사용 키</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.averageResponseTime}ms</div>
          <div className="text-gray-400 text-sm">평균 응답</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-emerald-400">{stats.fastestKey.key || '-'}</div>
          <div className="text-gray-400 text-sm">빠른 키</div>
          <div className="text-emerald-300 text-xs">{stats.fastestKey.time ? `${Math.round(stats.fastestKey.time)}ms` : ''}</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-red-400">{stats.slowestKey.key || '-'}</div>
          <div className="text-gray-400 text-sm">느린 키</div>
          <div className="text-red-300 text-xs">{stats.slowestKey.time ? `${Math.round(stats.slowestKey.time)}ms` : ''}</div>
        </div>
      </div>

      {/* 키보드 시각화 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-white">
            {keyboardLayout === 'tkl' ? '텐키리스 키보드' : '풀사이즈 키보드'}
          </h3>
          <p className="text-gray-400 text-sm">실제 키보드로 입력하면 해당 키가 강조됩니다</p>
        </div>
        
        <div className="flex flex-col items-center space-y-2 overflow-x-auto">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((keyObj, keyIndex) => (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`${getKeyStyle(keyObj.key)} ${keyObj.width}`}
                >
                  {keyObj.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>💡 팁: 게임에서 사용하는 WASD 키나 자주 사용하는 키들을 테스트해보세요!</p>
          <p>🎮 프로게이머 APM: 300+, 일반인: 50-150</p>
        </div>
      </div>

      {/* 최근 키 입력 히스토리 */}
      <AnimatePresence>
        {keyPressHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">최근 키 입력 ({keyPressHistory.length})</h3>
            <div className="grid grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
              {keyPressHistory.slice(-40).map((keyData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-700 rounded px-2 py-1 text-center text-sm text-white font-mono"
                >
                  {keyData.key === ' ' ? 'SP' : keyData.key.toUpperCase()}
                </motion.div>
              ))}
            </div>
            {keyPressHistory.length > 40 && (
              <p className="text-gray-400 text-sm mt-2 text-center">
                ... 그리고 {keyPressHistory.length - 40}개 더
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyboardPerformanceTester;