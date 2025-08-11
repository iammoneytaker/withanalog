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
  const [selectedSwitchSound, setSelectedSwitchSound] = useState('cherry_blue');
  
  const startTimeRef = useRef<number>(0);
  const audioBuffersRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const keyDownTimesRef = useRef<Map<string, number>>(new Map());

  // 스위치 사운드 설정
  const switchSounds = [
    { name: 'cherry_blue', displayName: '청축', audioFile: '/sounds/청축.wav' },
    { name: 'cherry_red', displayName: '적축', audioFile: '/sounds/적축.wav' },
    { name: 'cherry_brown', displayName: '갈축', audioFile: '/sounds/갈축.wav' }
  ];

  // GlobalKeyboardSound에서 오디오 처리하므로 제거

  // 텐키리스 키보드 레이아웃 (실제 TKL 키보드 형태)
  const tklLayout = [
    // Function Row
    [
      { key: 'Escape', label: 'Esc', width: 'w-12' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: 'F1', label: 'F1', width: 'w-10' },
      { key: 'F2', label: 'F2', width: 'w-10' },
      { key: 'F3', label: 'F3', width: 'w-10' },
      { key: 'F4', label: 'F4', width: 'w-10' },
      { key: '', label: '', width: 'w-2' }, // gap
      { key: 'F5', label: 'F5', width: 'w-10' },
      { key: 'F6', label: 'F6', width: 'w-10' },
      { key: 'F7', label: 'F7', width: 'w-10' },
      { key: 'F8', label: 'F8', width: 'w-10' },
      { key: '', label: '', width: 'w-2' }, // gap
      { key: 'F9', label: 'F9', width: 'w-10' },
      { key: 'F10', label: 'F10', width: 'w-10' },
      { key: 'F11', label: 'F11', width: 'w-10' },
      { key: 'F12', label: 'F12', width: 'w-10' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: 'PrintScreen', label: 'PrtSc', width: 'w-10' },
      { key: 'ScrollLock', label: 'ScrLk', width: 'w-10' },
      { key: 'Pause', label: 'Pause', width: 'w-10' }
    ],
    // Number Row
    [
      { key: 'Backquote', label: '~\n`', width: 'w-10' },
      { key: 'Digit1', label: '!\n1', width: 'w-10' },
      { key: 'Digit2', label: '@\n2', width: 'w-10' },
      { key: 'Digit3', label: '#\n3', width: 'w-10' },
      { key: 'Digit4', label: '$\n4', width: 'w-10' },
      { key: 'Digit5', label: '%\n5', width: 'w-10' },
      { key: 'Digit6', label: '^\n6', width: 'w-10' },
      { key: 'Digit7', label: '&\n7', width: 'w-10' },
      { key: 'Digit8', label: '*\n8', width: 'w-10' },
      { key: 'Digit9', label: '(\n9', width: 'w-10' },
      { key: 'Digit0', label: ')\n0', width: 'w-10' },
      { key: 'Minus', label: '_\n-', width: 'w-10' },
      { key: 'Equal', label: '+\n=', width: 'w-10' },
      { key: 'Backspace', label: 'Backspace', width: 'w-20' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: 'Insert', label: 'Ins', width: 'w-10' },
      { key: 'Home', label: 'Home', width: 'w-10' },
      { key: 'PageUp', label: 'PgUp', width: 'w-10' }
    ],
    // Top Row (QWERTY)
    [
      { key: 'Tab', label: 'Tab', width: 'w-15' },
      { key: 'KeyQ', label: 'ㅂ\nQ', width: 'w-10' },
      { key: 'KeyW', label: 'ㅈ\nW', width: 'w-10' },
      { key: 'KeyE', label: 'ㄷ\nE', width: 'w-10' },
      { key: 'KeyR', label: 'ㄱ\nR', width: 'w-10' },
      { key: 'KeyT', label: 'ㅅ\nT', width: 'w-10' },
      { key: 'KeyY', label: 'ㅛ\nY', width: 'w-10' },
      { key: 'KeyU', label: 'ㅕ\nU', width: 'w-10' },
      { key: 'KeyI', label: 'ㅑ\nI', width: 'w-10' },
      { key: 'KeyO', label: 'ㅒ\nO', width: 'w-10' },
      { key: 'KeyP', label: 'ㅓ\nP', width: 'w-10' },
      { key: 'BracketLeft', label: '{\n[', width: 'w-10' },
      { key: 'BracketRight', label: '}\n]', width: 'w-10' },
      { key: 'Backslash', label: '|\n\\', width: 'w-15' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: 'Delete', label: 'Del', width: 'w-10' },
      { key: 'End', label: 'End', width: 'w-10' },
      { key: 'PageDown', label: 'PgDn', width: 'w-10' }
    ],
    // Home Row (ASDF)
    [
      { key: 'CapsLock', label: 'CapsLock', width: 'w-18' },
      { key: 'KeyA', label: 'ㅁ\nA', width: 'w-10' },
      { key: 'KeyS', label: 'ㄴ\nS', width: 'w-10' },
      { key: 'KeyD', label: 'ㅇ\nD', width: 'w-10' },
      { key: 'KeyF', label: 'ㄹ\nF', width: 'w-10' },
      { key: 'KeyG', label: 'ㅎ\nG', width: 'w-10' },
      { key: 'KeyH', label: 'ㅗ\nH', width: 'w-10' },
      { key: 'KeyJ', label: 'ㅓ\nJ', width: 'w-10' },
      { key: 'KeyK', label: 'ㅏ\nK', width: 'w-10' },
      { key: 'KeyL', label: 'ㅣ\nL', width: 'w-10' },
      { key: 'Semicolon', label: ':\n;', width: 'w-10' },
      { key: 'Quote', label: '"\n\'', width: 'w-10' },
      { key: 'Enter', label: 'Enter', width: 'w-22' }
    ],
    // Bottom Row (ZXCV)
    [
      { key: 'ShiftLeft', label: 'Shift', width: 'w-24' },
      { key: 'KeyZ', label: 'ㅋ\nZ', width: 'w-10' },
      { key: 'KeyX', label: 'ㅌ\nX', width: 'w-10' },
      { key: 'KeyC', label: 'ㅊ\nC', width: 'w-10' },
      { key: 'KeyV', label: 'ㅍ\nV', width: 'w-10' },
      { key: 'KeyB', label: 'ㅠ\nB', width: 'w-10' },
      { key: 'KeyN', label: 'ㅜ\nN', width: 'w-10' },
      { key: 'KeyM', label: 'ㅡ\nM', width: 'w-10' },
      { key: 'Comma', label: '<\n,', width: 'w-10' },
      { key: 'Period', label: '>\n.', width: 'w-10' },
      { key: 'Slash', label: '?\n/', width: 'w-10' },
      { key: 'ShiftRight', label: 'Shift', width: 'w-28' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: '', label: '', width: 'w-10' }, // empty
      { key: 'ArrowUp', label: '↑', width: 'w-10' },
      { key: '', label: '', width: 'w-10' } // empty
    ],
    // Space Row + Arrow Keys
    [
      { key: 'ControlLeft', label: 'Ctrl', width: 'w-13' },
      { key: 'MetaLeft', label: 'Win', width: 'w-11' },
      { key: 'AltLeft', label: 'Alt', width: 'w-13' },
      { key: 'Space', label: 'Space', width: 'w-60' },
      { key: 'AltRight', label: 'Alt', width: 'w-11' },
      { key: 'ContextMenu', label: 'Fn', width: 'w-11' },
      { key: 'MetaRight', label: '한/영', width: 'w-11' },
      { key: 'ControlRight', label: 'Ctrl', width: 'w-13' },
      { key: '', label: '', width: 'w-4' }, // gap
      { key: 'ArrowLeft', label: '←', width: 'w-10' },
      { key: 'ArrowDown', label: '↓', width: 'w-10' },
      { key: 'ArrowRight', label: '→', width: 'w-10' }
    ]
  ];

  // 풀사이즈 키보드 레이아웃 (실제 풀사이즈 키보드 형태)
  const fullsizeLayout = [
    // Function Row
    [
      { key: 'Escape', label: 'Esc', width: 'w-9' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'F1', label: 'F1', width: 'w-8' },
      { key: 'F2', label: 'F2', width: 'w-8' },
      { key: 'F3', label: 'F3', width: 'w-8' },
      { key: 'F4', label: 'F4', width: 'w-8' },
      { key: '', label: '', width: 'w-2' }, // gap
      { key: 'F5', label: 'F5', width: 'w-8' },
      { key: 'F6', label: 'F6', width: 'w-8' },
      { key: 'F7', label: 'F7', width: 'w-8' },
      { key: 'F8', label: 'F8', width: 'w-8' },
      { key: '', label: '', width: 'w-2' }, // gap
      { key: 'F9', label: 'F9', width: 'w-8' },
      { key: 'F10', label: 'F10', width: 'w-8' },
      { key: 'F11', label: 'F11', width: 'w-8' },
      { key: 'F12', label: 'F12', width: 'w-8' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'PrintScreen', label: 'PrtSc', width: 'w-8' },
      { key: 'ScrollLock', label: 'ScrLk', width: 'w-8' },
      { key: 'Pause', label: 'Pause', width: 'w-8' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'NumLock', label: 'Num\nLock', width: 'w-8' },
      { key: 'NumpadDivide', label: '/', width: 'w-8' },
      { key: 'NumpadMultiply', label: '*', width: 'w-8' },
      { key: 'NumpadSubtract', label: '-', width: 'w-8' }
    ],
    // Number Row
    [
      { key: 'Backquote', label: '~\n`', width: 'w-8' },
      { key: 'Digit1', label: '!\n1', width: 'w-8' },
      { key: 'Digit2', label: '@\n2', width: 'w-8' },
      { key: 'Digit3', label: '#\n3', width: 'w-8' },
      { key: 'Digit4', label: '$\n4', width: 'w-8' },
      { key: 'Digit5', label: '%\n5', width: 'w-8' },
      { key: 'Digit6', label: '^\n6', width: 'w-8' },
      { key: 'Digit7', label: '&\n7', width: 'w-8' },
      { key: 'Digit8', label: '*\n8', width: 'w-8' },
      { key: 'Digit9', label: '(\n9', width: 'w-8' },
      { key: 'Digit0', label: ')\n0', width: 'w-8' },
      { key: 'Minus', label: '_\n-', width: 'w-8' },
      { key: 'Equal', label: '+\n=', width: 'w-8' },
      { key: 'Backspace', label: 'Backspace', width: 'w-16' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'Insert', label: 'Ins', width: 'w-8' },
      { key: 'Home', label: 'Home', width: 'w-8' },
      { key: 'PageUp', label: 'PgUp', width: 'w-8' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'Numpad7', label: '7', width: 'w-8' },
      { key: 'Numpad8', label: '8', width: 'w-8' },
      { key: 'Numpad9', label: '9', width: 'w-8' },
      { key: 'NumpadAdd', label: '+', width: 'w-8' }
    ],
    // Top Row (QWERTY)
    [
      { key: 'Tab', label: 'Tab', width: 'w-12' },
      { key: 'KeyQ', label: 'ㅂ\nQ', width: 'w-8' },
      { key: 'KeyW', label: 'ㅈ\nW', width: 'w-8' },
      { key: 'KeyE', label: 'ㄷ\nE', width: 'w-8' },
      { key: 'KeyR', label: 'ㄱ\nR', width: 'w-8' },
      { key: 'KeyT', label: 'ㅅ\nT', width: 'w-8' },
      { key: 'KeyY', label: 'ㅛ\nY', width: 'w-8' },
      { key: 'KeyU', label: 'ㅕ\nU', width: 'w-8' },
      { key: 'KeyI', label: 'ㅑ\nI', width: 'w-8' },
      { key: 'KeyO', label: 'ㅒ\nO', width: 'w-8' },
      { key: 'KeyP', label: 'ㅓ\nP', width: 'w-8' },
      { key: 'BracketLeft', label: '{\n[', width: 'w-8' },
      { key: 'BracketRight', label: '}\n]', width: 'w-8' },
      { key: 'Backslash', label: '|\n\\', width: 'w-12' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'Delete', label: 'Del', width: 'w-8' },
      { key: 'End', label: 'End', width: 'w-8' },
      { key: 'PageDown', label: 'PgDn', width: 'w-8' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'Numpad4', label: '4', width: 'w-8' },
      { key: 'Numpad5', label: '5', width: 'w-8' },
      { key: 'Numpad6', label: '6', width: 'w-8' },
      { key: '', label: '', width: 'w-8' } // NumpadAdd continues from above
    ],
    // Home Row (ASDF)
    [
      { key: 'CapsLock', label: 'CapsLock', width: 'w-14' },
      { key: 'KeyA', label: 'ㅁ\nA', width: 'w-8' },
      { key: 'KeyS', label: 'ㄴ\nS', width: 'w-8' },
      { key: 'KeyD', label: 'ㅇ\nD', width: 'w-8' },
      { key: 'KeyF', label: 'ㄹ\nF', width: 'w-8' },
      { key: 'KeyG', label: 'ㅎ\nG', width: 'w-8' },
      { key: 'KeyH', label: 'ㅗ\nH', width: 'w-8' },
      { key: 'KeyJ', label: 'ㅓ\nJ', width: 'w-8' },
      { key: 'KeyK', label: 'ㅏ\nK', width: 'w-8' },
      { key: 'KeyL', label: 'ㅣ\nL', width: 'w-8' },
      { key: 'Semicolon', label: ':\n;', width: 'w-8' },
      { key: 'Quote', label: '"\n\'', width: 'w-8' },
      { key: 'Enter', label: 'Enter', width: 'w-18' },
      { key: '', label: '', width: 'w-27' }, // gap for navigation cluster  
      { key: 'Numpad1', label: '1', width: 'w-8' },
      { key: 'Numpad2', label: '2', width: 'w-8' },
      { key: 'Numpad3', label: '3', width: 'w-8' },
      { key: 'NumpadEnter', label: 'Enter', width: 'w-8' }
    ],
    // Bottom Row (ZXCV)
    [
      { key: 'ShiftLeft', label: 'Shift', width: 'w-18' },
      { key: 'KeyZ', label: 'ㅋ\nZ', width: 'w-8' },
      { key: 'KeyX', label: 'ㅌ\nX', width: 'w-8' },
      { key: 'KeyC', label: 'ㅊ\nC', width: 'w-8' },
      { key: 'KeyV', label: 'ㅍ\nV', width: 'w-8' },
      { key: 'KeyB', label: 'ㅠ\nB', width: 'w-8' },
      { key: 'KeyN', label: 'ㅜ\nN', width: 'w-8' },
      { key: 'KeyM', label: 'ㅡ\nM', width: 'w-8' },
      { key: 'Comma', label: '<\n,', width: 'w-8' },
      { key: 'Period', label: '>\n.', width: 'w-8' },
      { key: 'Slash', label: '?\n/', width: 'w-8' },
      { key: 'ShiftRight', label: 'Shift', width: 'w-22' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: '', label: '', width: 'w-8' }, // empty
      { key: 'ArrowUp', label: '↑', width: 'w-8' },
      { key: '', label: '', width: 'w-8' }, // empty
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'Numpad0', label: '0', width: 'w-16' },
      { key: 'NumpadDecimal', label: '.', width: 'w-8' },
      { key: '', label: '', width: 'w-8' } // NumpadEnter continues from above
    ],
    // Space Row + Arrow Keys + Numpad bottom
    [
      { key: 'ControlLeft', label: 'Ctrl', width: 'w-10' },
      { key: 'MetaLeft', label: 'Win', width: 'w-9' },
      { key: 'AltLeft', label: 'Alt', width: 'w-10' },
      { key: 'Space', label: 'Space', width: 'w-48' },
      { key: 'AltRight', label: 'Alt', width: 'w-9' },
      { key: 'ContextMenu', label: 'Fn', width: 'w-9' },
      { key: 'MetaRight', label: '한/영', width: 'w-9' },
      { key: 'ControlRight', label: 'Ctrl', width: 'w-10' },
      { key: '', label: '', width: 'w-3' }, // gap
      { key: 'ArrowLeft', label: '←', width: 'w-8' },
      { key: 'ArrowDown', label: '↓', width: 'w-8' },
      { key: 'ArrowRight', label: '→', width: 'w-8' },
      { key: '', label: '', width: 'w-27' } // gap for numpad alignment
    ]
  ];

  const currentLayout = keyboardLayout === 'tkl' ? tklLayout : fullsizeLayout;


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
    
    // 실제 WAV 파일 타건음 재생
    playKeySound();
    
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
    const baseStyle = 'h-8 bg-gray-700 text-white text-xs font-mono rounded border border-gray-600 flex items-center justify-center transition-all duration-75 select-none';
    
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

      {/* 키보드 시각화 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-white">
            {keyboardLayout === 'tkl' ? '텐키리스 키보드' : '풀사이즈 키보드'}
          </h3>
          <p className="text-gray-400 text-sm">실제 키보드로 입력하면 해당 키가 강조됩니다</p>
        </div>
        
        <div className="flex flex-col items-center space-y-1 overflow-x-auto">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((keyObj, keyIndex) => {
                // 빈 공간 처리
                if (!keyObj.key && !keyObj.label) {
                  return (
                    <div
                      key={`${rowIndex}-${keyIndex}`}
                      className={`${keyObj.width} h-8`}
                    />
                  );
                }
                
                return (
                  <div
                    key={`${rowIndex}-${keyIndex}`}
                    className={`${getKeyStyle(keyObj.key)} ${keyObj.width} text-xs leading-tight whitespace-pre-line`}
                  >
                    {keyObj.label}
                  </div>
                );
              })}
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