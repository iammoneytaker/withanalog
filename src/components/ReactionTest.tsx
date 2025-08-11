'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ReactionResult {
  keyPressed: string;
  reactionTime: number;
  timestamp: number;
  isValid: boolean;
  targetKey: string;
}

interface ReactionTestProps {
  onComplete: (results: ReactionResult[]) => void;
}

const TEST_KEYS = ['Space', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL'];
const TEST_COUNT = 10;

const ReactionTest: React.FC<ReactionTestProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  const [targetKey, setTargetKey] = useState<string>('');
  const [instruction, setInstruction] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [results, setResults] = useState<ReactionResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const waitTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const getKeyKoreanName = useCallback((key: string): string => {
    const keyMap: Record<string, string> = {
      'Space': '스페이스바',
      'KeyA': 'A (ㅁ)',
      'KeyS': 'S (ㄴ)', 
      'KeyD': 'D (ㅇ)',
      'KeyF': 'F (ㄹ)',
      'KeyJ': 'J (ㅓ)',
      'KeyK': 'K (ㅏ)',
      'KeyL': 'L (ㅣ)',
    };
    return keyMap[key] || key;
  }, []);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (waitTimeoutRef.current) {
      clearTimeout(waitTimeoutRef.current);
      waitTimeoutRef.current = null;
    }
  }, []);

  const startTest: () => void = useCallback(() => {
    clearTimeouts();

    if (currentTest >= TEST_COUNT) {
      setShowResult(true);
      onComplete(results);
      return;
    }

    setIsWaiting(true);
    setIsActive(false);
    setInstruction('준비하세요...');
    
    // 3초 카운트다운
    setCountdown(3);
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownInterval);
        proceedWithTest();
      }
    }, 1000);

  }, [currentTest, results, clearTimeouts, onComplete]);

  const proceedWithTest = useCallback(() => {
    // 랜덤 딜레이 (1-4초)
    const delay = Math.random() * 3000 + 1000;
    
    waitTimeoutRef.current = setTimeout(() => {
      const randomKey = TEST_KEYS[Math.floor(Math.random() * TEST_KEYS.length)];
      setTargetKey(randomKey);
      setInstruction(`"${getKeyKoreanName(randomKey)}" 키를 최대한 빠르게 누르세요!`);
      setIsWaiting(false);
      setIsActive(true);
      setStartTime(performance.now());
      
      // 5초 타임아웃
      timeoutRef.current = setTimeout(() => {
        handleTimeout();
      }, 5000);
    }, delay);
  }, [getKeyKoreanName]);

  const handleTimeout = useCallback(() => {
    if (!isActive) return;
    
    clearTimeouts();
    setIsActive(false);
    setResults(prev => [...prev, {
      keyPressed: 'timeout',
      reactionTime: 5000,
      timestamp: Date.now(),
      isValid: false,
      targetKey: targetKey
    }]);
    setCurrentTest(prev => prev + 1);
    setInstruction('시간 초과! 다음 테스트를 준비하세요...');
  }, [isActive, targetKey, clearTimeouts]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isWaiting || !isActive) return;

    event.preventDefault();
    
    clearTimeouts();
    
    const reactionTime = performance.now() - startTime;
    const isValid = event.code === targetKey;
    
    setIsActive(false);
    setResults(prev => [...prev, {
      keyPressed: event.code,
      reactionTime: Math.round(reactionTime),
      timestamp: Date.now(),
      isValid,
      targetKey: targetKey
    }]);

    setCurrentTest(prev => prev + 1);
    
    if (isValid) {
      setInstruction(`정확! 반응시간: ${Math.round(reactionTime)}ms`);
    } else {
      setInstruction(`틀렸습니다! "${getKeyKoreanName(event.code)}" 대신 "${getKeyKoreanName(targetKey)}"를 누르셔야 했습니다.`);
    }
  }, [isWaiting, isActive, startTime, targetKey, startTest, clearTimeouts, getKeyKoreanName]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearTimeouts();
    };
  }, [handleKeyPress, isActive, clearTimeouts]);

  const resetTest = () => {
    clearTimeouts();
    setIsActive(false);
    setIsWaiting(false);
    setCurrentTest(0);
    setResults([]);
    setShowResult(false);
    setInstruction('');
    setCountdown(0);
  };

  const validResults = results.filter(r => r.isValid && r.keyPressed !== 'timeout');
  const averageReactionTime = validResults.length > 0 
    ? Math.round(validResults.reduce((sum, r) => sum + r.reactionTime, 0) / validResults.length)
    : 0;
  
  const accuracy = results.length > 0 
    ? Math.round((validResults.length / results.length) * 100)
    : 0;

  const getReactionGrade = (time: number): { grade: string; color: string; description: string } => {
    if (time < 200) return { grade: '뛰어남', color: 'text-purple-400', description: 'e스포츠 프로게이머 수준' };
    if (time < 300) return { grade: '빠름', color: 'text-blue-400', description: '매우 빠른 반응속도' };
    if (time < 400) return { grade: '보통', color: 'text-green-400', description: '평균적인 반응속도' };
    if (time < 500) return { grade: '느림', color: 'text-yellow-400', description: '연습이 필요한 수준' };
    return { grade: '매우 느림', color: 'text-red-400', description: '많은 연습이 필요' };
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* 진행률 표시 */}
      {!showResult && (
        <div className="text-center mb-8">
          <div className="text-4xl sm:text-6xl font-mono font-bold mb-4 text-white">
            {currentTest} / {TEST_COUNT}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentTest / TEST_COUNT) * 100}%` }}
            />
          </div>
          <div className="text-lg text-gray-400">
            진행률: {Math.round((currentTest / TEST_COUNT) * 100)}%
          </div>
        </div>
      )}

      {/* 메인 인스트럭션 */}
      <div className="text-center mb-8">
        <motion.div
          key={instruction + countdown}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl sm:text-3xl font-bold p-6 sm:p-8 rounded-xl border-2 ${
            isWaiting && countdown > 0
              ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400'
              : isWaiting
                ? 'bg-orange-900/20 border-orange-500/50 text-orange-400'
                : isActive 
                  ? 'bg-green-900/20 border-green-500/50 text-green-400'
                  : results.length > 0 && results[results.length - 1]?.isValid
                    ? 'bg-blue-900/20 border-blue-500/50 text-blue-400'
                    : results.length > 0
                      ? 'bg-red-900/20 border-red-500/50 text-red-400'
                      : 'bg-gray-800 border-gray-600 text-white'
          }`}
        >
          {countdown > 0 ? countdown : instruction || '아래 시작 버튼을 눌러 테스트를 시작하세요'}
        </motion.div>
      </div>

      {/* 시작 버튼 */}
      {!isActive && !isWaiting && !showResult && currentTest === 0 && (
        <div className="text-center mb-8">
          <button
            onClick={startTest}
            className="px-8 py-4 text-xl sm:text-2xl bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            🚀 반응속도 테스트 시작
          </button>
          <div className="mt-4 text-gray-400 text-sm sm:text-base">
            총 {TEST_COUNT}번의 테스트가 진행됩니다
          </div>
        </div>
      )}

      {/* 현재 통계 */}
      {(results.length > 0 || showResult) && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{averageReactionTime}ms</div>
              <div className="text-gray-400 text-sm sm:text-base">평균 반응시간</div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{accuracy}%</div>
              <div className="text-gray-400 text-sm sm:text-base">정확도</div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{validResults.length}</div>
              <div className="text-gray-400 text-sm sm:text-base">유효한 테스트</div>
            </div>
          </div>

          {/* 등급 표시 */}
          {averageReactionTime > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-4">반응속도 등급</h3>
              {(() => {
                const grade = getReactionGrade(averageReactionTime);
                return (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <div className={`text-3xl sm:text-4xl font-bold ${grade.color}`}>
                      {grade.grade}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base">
                      {grade.description}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* 상세 결과 */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">테스트 상세 결과</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">테스트</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">목표 키</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">누른 키</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">반응시간</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">결과</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">{index + 1}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                      {getKeyKoreanName(result.targetKey)}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                      {result.keyPressed === 'timeout' 
                        ? '시간초과' 
                        : getKeyKoreanName(result.keyPressed)}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                      {result.reactionTime}ms
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className={`font-semibold text-xs sm:text-sm ${
                        result.isValid ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.isValid ? '정확' : '오류'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* 다시 시작 버튼 */}
      {(showResult || currentTest > 0) && (
        <div className="text-center">
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            🔄 다시 시작
          </button>
        </div>
      )}

      {/* 도움말 */}
      {!showResult && currentTest === 0 && (
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">💡 테스트 방법</h4>
          <ul className="text-gray-300 space-y-2">
            <li>• 화면에 표시되는 키를 최대한 빠르게 누르세요</li>
            <li>• 총 {TEST_COUNT}번의 테스트가 진행됩니다</li>
            <li>• 정확도와 속도 모두 중요합니다</li>
            <li>• 각 테스트마다 5초의 제한시간이 있습니다</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReactionTest;