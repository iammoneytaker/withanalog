'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypingStats {
  cpm: number; // Characters Per Minute (분당 글자 수)
  accuracy: number; // 정확도 (%)
  timeElapsed: number; // 경과 시간 (초)
  totalChars: number; // 총 입력 글자 수
  correctChars: number; // 정확한 글자 수
  incorrectChars: number; // 틀린 글자 수
  typingSpeed: string; // 타자 등급
}

interface TypingSpeedTestProps {
  text: string;
  language: 'korean' | 'english';
  onComplete: (stats: TypingStats) => void;
}

const TypingSpeedTest: React.FC<TypingSpeedTestProps> = ({ text, language, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타자 속도 등급 계산
  const getTypingGrade = useCallback((cpm: number, language: 'korean' | 'english'): string => {
    if (language === 'korean') {
      // 한글 기준 (복잡한 조합 문자 고려)
      if (cpm >= 600) return '매우 빠름 (전문가급)';
      if (cpm >= 400) return '빠름 (숙련자급)';
      if (cpm >= 250) return '보통 (일반인 평균)';
      if (cpm >= 150) return '느림 (연습 필요)';
      return '매우 느림 (초보자)';
    } else {
      // 영문 기준
      if (cpm >= 500) return '매우 빠름 (전문가급)';
      if (cpm >= 350) return '빠름 (숙련자급)';
      if (cpm >= 200) return '보통 (일반인 평균)';
      if (cpm >= 100) return '느림 (연습 필요)';
      return '매우 느림 (초보자)';
    }
  }, []);

  const calculateStats = useCallback((): TypingStats => {
    const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0; // 분 단위
    const totalChars = userInput.length;
    const correctChars = totalChars - errors.size;
    const cpm = elapsed > 0 ? Math.round(correctChars / elapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const typingSpeed = getTypingGrade(cpm, language);

    return {
      cpm,
      accuracy,
      timeElapsed: elapsed * 60, // 다시 초로 변환
      totalChars,
      correctChars,
      incorrectChars: errors.size,
      typingSpeed
    };
  }, [userInput.length, errors.size, startTime, getTypingGrade, language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
      
      // 1초마다 시간 업데이트
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    // 입력 길이 제한
    if (value.length > text.length) {
      return;
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // 오타 추적
    const newErrors = new Set(errors);
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        newErrors.add(i);
      } else {
        newErrors.delete(i);
      }
    }
    setErrors(newErrors);

    // 완료 체크
    if (value === text) {
      setIsCompleted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const finalStats = calculateStats();
      onComplete(finalStats);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  const resetTest = () => {
    setUserInput('');
    setIsStarted(false);
    setIsCompleted(false);
    setStartTime(null);
    setCurrentIndex(0);
    setErrors(new Set());
    setTimeElapsed(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    inputRef.current?.focus();
  };

  const getCharacterStyle = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === text[index] 
        ? 'text-green-400 bg-green-900/30' 
        : 'text-red-400 bg-red-900/30';
    } else if (index === currentIndex) {
      return 'bg-blue-500/50 animate-pulse';
    }
    return 'text-gray-300';
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStats = calculateStats();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 실시간 통계 */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{currentStats.cpm}</div>
          <div className="text-blue-100 text-sm font-medium">분당 글자 수</div>
          <div className="text-blue-200 text-xs">CPM</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{currentStats.accuracy}%</div>
          <div className="text-green-100 text-sm font-medium">정확도</div>
          <div className="text-green-200 text-xs">Accuracy</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{Math.floor(timeElapsed)}초</div>
          <div className="text-purple-100 text-sm font-medium">경과 시간</div>
          <div className="text-purple-200 text-xs">Time</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">{currentStats.correctChars}</div>
          <div className="text-gray-400 text-sm">정확한 글자</div>
          <div className="text-gray-500 text-xs">/ {currentStats.totalChars}</div>
        </div>
      </div>

      {/* 타자 등급 표시 */}
      {currentStats.cpm > 0 && (
        <div className="mb-6 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
            🏆 {currentStats.typingSpeed}
          </div>
        </div>
      )}

      {/* 컨트롤 */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-white">
          <div className="text-sm text-gray-400">
            {language === 'korean' ? '한글' : '영문'} 타자 연습
          </div>
          <div className="text-lg font-semibold">
            진행률: {text.length > 0 ? Math.round((userInput.length / text.length) * 100) : 0}%
          </div>
        </div>
        
        <button
          onClick={resetTest}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          다시 시작
        </button>
      </div>

      {/* 텍스트 입력 영역 */}
      <div className="relative mb-6">
        <div className="text-xl leading-relaxed p-6 bg-gray-800 rounded-lg font-mono border-2 border-gray-600 min-h-[120px]">
          {text.split('').map((char, index) => (
            <span key={index} className={`${getCharacterStyle(index)} transition-all duration-150`}>
              {char}
            </span>
          ))}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isCompleted}
          className="absolute inset-0 w-full h-full opacity-0 cursor-default"
          placeholder=""
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* 시작 안내 */}
      {!isStarted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg"
        >
          <div className="text-blue-400 text-lg font-semibold mb-2">
            📝 타자 연습 시작하기
          </div>
          <p className="text-gray-400">
            위 텍스트를 보고 입력을 시작하면 자동으로 측정이 시작됩니다
          </p>
          <div className="mt-3 text-sm text-gray-500">
            💡 팁: 정확도를 우선으로 하고, 속도는 자연스럽게 늘려가세요
          </div>
        </motion.div>
      )}

      {/* 완료 화면 */}
      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-900/20 border border-green-500/30 rounded-lg"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">연습 완료!</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-400 mb-2">{currentStats.cpm}</div>
              <div className="text-white font-semibold">분당 글자 수</div>
              <div className="text-gray-400 text-sm">CPM (Characters Per Minute)</div>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-400 mb-2">{currentStats.accuracy}%</div>
              <div className="text-white font-semibold">정확도</div>
              <div className="text-gray-400 text-sm">틀린 글자: {currentStats.incorrectChars}개</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-xl mb-6">
            최종 등급: {currentStats.typingSpeed}
          </div>
          
          <div className="text-gray-400 text-sm">
            총 소요 시간: {Math.floor(currentStats.timeElapsed)}초 | 
            총 입력: {currentStats.totalChars}글자 | 
            정확한 입력: {currentStats.correctChars}글자
          </div>
        </motion.div>
      )}

      {/* 도움말 */}
      {isStarted && !isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-400">
              <span className="inline-block w-4 h-4 bg-green-500 rounded mr-2"></span>
              정확한 글자
            </div>
            <div className="text-gray-400">
              <span className="inline-block w-4 h-4 bg-red-500 rounded mr-2"></span>
              틀린 글자
            </div>
            <div className="text-gray-400">
              <span className="inline-block w-4 h-4 bg-blue-500 rounded mr-2 animate-pulse"></span>
              현재 위치
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TypingSpeedTest;