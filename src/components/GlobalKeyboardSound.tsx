'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { create } from 'zustand';

interface KeyboardSoundStore {
  isEnabled: boolean;
  volume: number;
  selectedSwitch: string;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setSelectedSwitch: (switchType: string) => void;
}

export const useKeyboardSoundStore = create<KeyboardSoundStore>((set) => ({
  isEnabled: true,
  volume: 0.7,
  selectedSwitch: 'cherry_red', // 기본을 적축으로 설정
  setEnabled: (enabled) => set({ isEnabled: enabled }),
  setVolume: (volume) => set({ volume }),
  setSelectedSwitch: (switchType) => set({ selectedSwitch: switchType }),
}));

// 각 스위치별 최적 재생 구간 설정 (실험을 통해 찾은 값)
const switchPlaybackConfig = {
  cherry_blue: {
    name: 'Cherry MX Blue (청축)',
    audioFile: '/sounds/청축.wav',
    startTime: 1.0,    // 1.0초부터
    duration: 0.15,    // 0.15초간 재생
    volume: 0.8
  },
  cherry_red: {
    name: 'Cherry MX Red (적축)',
    audioFile: '/sounds/적축.wav',
    startTime: 0.8,    // 0.8초부터
    duration: 0.12,    // 0.12초간 재생  
    volume: 0.6
  },
  cherry_brown: {
    name: 'Cherry MX Brown (갈축)',
    audioFile: '/sounds/갈축.wav',
    startTime: 1.1,    // 1.1초부터
    duration: 0.14,    // 0.14초간 재생
    volume: 0.7
  }
};

export function GlobalKeyboardSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lastKeyTimeRef = useRef<number>(0);
  
  const [audioBuffers, setAudioBuffers] = useState<Map<string, AudioBuffer>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { isEnabled, volume, selectedSwitch } = useKeyboardSoundStore();

  // 오디오 컨텍스트 초기화 및 WAV 파일들 로드
  useEffect(() => {
    const initAudio = async () => {
      try {
        console.log('🎵 Web Audio API 초기화 시작...');
        
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.setValueAtTime(isEnabled ? volume : 0, audioContextRef.current.currentTime);

        // 모든 WAV 파일 로드 및 디코딩
        await loadAllAudioBuffers();
        
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

  // 모든 WAV 파일을 AudioBuffer로 로드
  const loadAllAudioBuffers = async () => {
    if (!audioContextRef.current) return;

    const bufferMap = new Map<string, AudioBuffer>();

    for (const [switchName, config] of Object.entries(switchPlaybackConfig)) {
      try {
        console.log(`🔊 ${config.name} WAV 파일 로드 중...`);
        
        const response = await fetch(config.audioFile);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        
        bufferMap.set(switchName, audioBuffer);
        console.log(`✅ ${config.name} 로드 완료 (${audioBuffer.duration.toFixed(2)}초)`);
        
      } catch (error) {
        console.error(`❌ ${config.name} 로드 실패:`, error);
      }
    }

    setAudioBuffers(bufferMap);
    setIsLoaded(true);
    console.log('🎵 모든 WAV 파일 로드 완료! 실시간 타건음 준비됨');
  };

  // 볼륨 업데이트
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isEnabled ? volume : 0, 
        audioContextRef.current.currentTime
      );
    }
  }, [volume, isEnabled]);

  // WAV 파일의 특정 구간만 재생하는 함수
  const playKeySound = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current || !isEnabled || !isLoaded) {
      return;
    }

    const audioContext = audioContextRef.current;
    
    // AudioContext가 suspended 상태라면 resume
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const config = switchPlaybackConfig[selectedSwitch as keyof typeof switchPlaybackConfig];
    const audioBuffer = audioBuffers.get(selectedSwitch);

    if (!config || !audioBuffer) {
      console.warn(`선택된 스위치 (${selectedSwitch})의 오디오가 로드되지 않음`);
      return;
    }

    try {
      // BufferSource 생성
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(gainNodeRef.current);
      
      // 볼륨 설정
      gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
      
      // 페이드 아웃 효과 (끝날 때 부드럽게)
      const fadeOutTime = 0.02; // 20ms 페이드 아웃
      const endTime = audioContext.currentTime + config.duration;
      gainNode.gain.setValueAtTime(config.volume, endTime - fadeOutTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
      
      // 특정 구간만 재생: start(시작시간, 오프셋, 지속시간)
      source.start(audioContext.currentTime, config.startTime, config.duration);
      
      console.log(`🎯 ${config.name} 재생: ${config.startTime}초~${(config.startTime + config.duration).toFixed(2)}초`);
      
    } catch (error) {
      console.error('사운드 재생 오류:', error);
    }
  }, [isEnabled, selectedSwitch, audioBuffers, isLoaded]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // 키 반복 방지
    if (event.repeat) return;
    
    // 조합키 제외
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    
    // 입력 필드에서는 사운드 재생하지 않음
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      return;
    }
    
    // 특수키 제외
    const excludeKeys = ['Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    if (excludeKeys.includes(event.key)) return;
    
    // 너무 빠른 연속 입력 방지 (debounce)
    const now = Date.now();
    if (now - lastKeyTimeRef.current < 30) return;
    lastKeyTimeRef.current = now;
    
    // 실제 WAV 구간 재생
    playKeySound();
  }, [playKeySound]);

  // 전역 키보드 이벤트 리스너 등록
  useEffect(() => {
    if (!isEnabled || !isLoaded) return;

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, isEnabled, isLoaded]);

  // 현재 상태 디버깅 로그
  useEffect(() => {
    if (isLoaded) {
      const config = switchPlaybackConfig[selectedSwitch as keyof typeof switchPlaybackConfig];
      if (config) {
        console.log(`🎛️ 현재 선택: ${config.name} (${config.startTime}초~${(config.startTime + config.duration).toFixed(2)}초)`);
      }
    }
  }, [selectedSwitch, isLoaded]);

  // 이 컴포넌트는 UI를 렌더링하지 않음 (백그라운드에서 WAV 구간 재생)
  return null;
}

// 외부에서 특정 스위치 사운드 재생
export const playSpecificKeySound = (switchType: string = 'cherry_red') => {
  const event = new CustomEvent('playSpecificKeySound', { detail: { switchType } });
  window.dispatchEvent(event);
};