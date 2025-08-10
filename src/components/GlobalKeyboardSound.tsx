'use client';

import { useEffect, useRef, useCallback } from 'react';
import { create } from 'zustand';

interface SwitchSoundConfig {
  name: string;
  clickFrequency: number;
  clickDuration: number;
  thockFrequency: number;
  thockDelay: number;
  volume: number;
  hasClick: boolean;
}

const switchConfigs: Record<string, SwitchSoundConfig> = {
  cherry_blue: {
    name: 'Cherry MX Blue',
    clickFrequency: 2500,
    clickDuration: 50,
    thockFrequency: 150,
    thockDelay: 30,
    volume: 0.8,
    hasClick: true,
  },
  cherry_red: {
    name: 'Cherry MX Red',
    clickFrequency: 0,
    clickDuration: 0,
    thockFrequency: 120,
    thockDelay: 20,
    volume: 0.4,
    hasClick: false,
  },
  cherry_brown: {
    name: 'Cherry MX Brown',
    clickFrequency: 1800,
    clickDuration: 30,
    thockFrequency: 140,
    thockDelay: 25,
    volume: 0.5,
    hasClick: true,
  },
  topre: {
    name: 'Topre',
    clickFrequency: 0,
    clickDuration: 0,
    thockFrequency: 200,
    thockDelay: 15,
    volume: 0.7,
    hasClick: false,
  },
  alps_white: {
    name: 'Alps White',
    clickFrequency: 2800,
    clickDuration: 40,
    thockFrequency: 180,
    thockDelay: 25,
    volume: 0.6,
    hasClick: true,
  },
  gateron_yellow: {
    name: 'Gateron Yellow',
    clickFrequency: 0,
    clickDuration: 0,
    thockFrequency: 110,
    thockDelay: 18,
    volume: 0.45,
    hasClick: false,
  }
};

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
  selectedSwitch: 'cherry_blue',
  setEnabled: (enabled) => set({ isEnabled: enabled }),
  setVolume: (volume) => set({ volume }),
  setSelectedSwitch: (switchType) => set({ selectedSwitch: switchType }),
}));

export function GlobalKeyboardSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lastKeyTimeRef = useRef<number>(0);
  
  const { isEnabled, volume, selectedSwitch } = useKeyboardSoundStore();

  // 오디오 컨텍스트 초기화
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.setValueAtTime(isEnabled ? volume : 0, audioContextRef.current.currentTime);
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
    
    // AudioContext가 suspended 상태라면 resume
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
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
    thockGain.gain.linearRampToValueAtTime(config.volume * 0.8, currentTime + thockDelay + 0.01);
    thockGain.gain.exponentialRampToValueAtTime(0.001, currentTime + thockDelay + 0.15);
    
    thockOscillator.start(currentTime + thockDelay);
    thockOscillator.stop(currentTime + thockDelay + 0.15);
  }, [isEnabled]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // 키 반복 방지
    if (event.repeat) return;
    
    // 조합키 제외
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    
    // 특수키 제외 (너무 많은 소리 방지)
    const excludeKeys = ['Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    if (excludeKeys.includes(event.key)) return;
    
    // 너무 빠른 연속 입력 방지 (debounce)
    const now = Date.now();
    if (now - lastKeyTimeRef.current < 30) return;
    lastKeyTimeRef.current = now;
    
    // 현재 선택된 스위치의 소리 재생
    const config = switchConfigs[selectedSwitch];
    if (config) {
      generateKeySound(config);
    }
  }, [selectedSwitch, generateKeySound]);

  // 전역 키보드 이벤트 리스너 등록
  useEffect(() => {
    if (!isEnabled) return;

    // keydown 이벤트로 실제 키 입력 감지
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, isEnabled]);

  // 이 컴포넌트는 UI를 렌더링하지 않음 (백그라운드 서비스)
  return null;
}