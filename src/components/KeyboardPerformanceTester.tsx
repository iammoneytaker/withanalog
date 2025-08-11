'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernKeyboardLayout from './ModernKeyboardLayout';

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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedSwitchSound, setSelectedSwitchSound] = useState('cherry_blue');
  
  const startTimeRef = useRef<number>(0);
  const keyDownTimesRef = useRef<Map<string, number>>(new Map());

  // 스위치 사운드 설정
  const switchSounds = [
    { name: 'cherry_blue', displayName: '청축', audioFile: '/sounds/청축.wav' },
    { name: 'cherry_red', displayName: '적축', audioFile: '/sounds/적축.wav' },
    { name: 'cherry_brown', displayName: '갈축', audioFile: '/sounds/갈축.wav' }
  ];

  // GlobalKeyboardSound에서 오디오 처리하므로 제거

  // ModernKeyboardLayout을 사용하므로 기존 레이아웃 제거


  // GlobalKeyboardSound를 사용하므로 별도 타건음 불필요

  // 키 눌림 이벤트
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isTestActive) return;
    
    const keyCode = event.code;
    
    // 이미 눌린 키 무시 (키 반복 방지)
    if (pressedKeys.has(keyCode)) return;
    
    event.preventDefault();
    
    // GlobalKeyboardSound에서 자동으로 타건음 재생됨
    
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
    
    // GlobalKeyboardSound에서 자동으로 타건음 재생됨
    
  }, [isTestActive, pressedKeys]);

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
            
            {soundEnabled && (
              <select
                value={selectedSwitchSound}
                onChange={(e) => setSelectedSwitchSound(e.target.value)}
                className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                disabled={isTestActive}
              >
                {switchSounds.map(sound => (
                  <option key={sound.name} value={sound.name}>
                    {sound.displayName} 사운드
                  </option>
                ))}
              </select>
            )}
            
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

      {/* 키보드 시각화 - ModernKeyboardLayout 사용 */}
      <div className="mb-6">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-white">실시간 키보드 테스터</h3>
          <p className="text-gray-400 text-sm">실제 키보드로 입력하면 해당 키가 파란색으로 강조됩니다</p>
        </div>
        
        <ModernKeyboardLayout 
          pressedKeys={pressedKeys}
          onKeyPress={(keyCode) => console.log('Key pressed:', keyCode)}
        />
        
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