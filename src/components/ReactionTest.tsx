'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ReactionResult {
  keyPressed: string;
  reactionTime: number;
  timestamp: number;
  isValid: boolean;
}

interface ReactionTestProps {
  onComplete: (results: ReactionResult[]) => void;
}

const TEST_KEYS = ['Space', 'KeyA', 'KeyS', 'KeyD', 'KeyF'];
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
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const waitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getKeyDisplayName = (key: string): string => {
    const keyMap: Record<string, string> = {
      'Space': 'Space 바',
      'KeyA': 'A',
      'KeyS': 'S',
      'KeyD': 'D',
      'KeyF': 'F',
    };
    return keyMap[key] || key;
  };

  const startTest = useCallback(() => {
    if (currentTest >= TEST_COUNT) {
      setShowResult(true);
      onComplete(results);
      return;
    }

    setIsWaiting(true);
    setInstruction('잠시 기다려주세요...');
    
    // Random delay between 2-5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    waitTimeoutRef.current = setTimeout(() => {
      const randomKey = TEST_KEYS[Math.floor(Math.random() * TEST_KEYS.length)];
      setTargetKey(randomKey);
      setInstruction(`"${getKeyDisplayName(randomKey)}" 키를 눌러주세요!`);
      setIsWaiting(false);
      setIsActive(true);
      setStartTime(performance.now());
      
      // Timeout after 3 seconds
      timeoutRef.current = setTimeout(() => {
        if (isActive) {
          handleTimeout();
        }
      }, 3000);
    }, delay);
  }, [currentTest, results, isActive]);

  const handleTimeout = () => {
    setIsActive(false);
    setResults(prev => [...prev, {
      keyPressed: 'timeout',
      reactionTime: 3000,
      timestamp: Date.now(),
      isValid: false
    }]);
    setCurrentTest(prev => prev + 1);
    setInstruction('시간 초과! 다음 테스트를 준비합니다...');
    
    setTimeout(() => {
      startTest();
    }, 1500);
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isActive || isWaiting) return;

    event.preventDefault();
    
    const reactionTime = performance.now() - startTime;
    const isValid = event.code === targetKey;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsActive(false);
    setResults(prev => [...prev, {
      keyPressed: event.code,
      reactionTime: Math.round(reactionTime),
      timestamp: Date.now(),
      isValid
    }]);

    setCurrentTest(prev => prev + 1);
    setInstruction(
      isValid 
        ? `정확! 반응시간: ${Math.round(reactionTime)}ms`
        : `틀림! "${getKeyDisplayName(event.code)}" 대신 "${getKeyDisplayName(targetKey)}"를 눌러야 했습니다.`
    );

    setTimeout(() => {
      startTest();
    }, 1500);
  }, [isActive, isWaiting, startTime, targetKey]);

  useEffect(() => {
    if (isActive || isWaiting) {
      document.addEventListener('keydown', handleKeyPress);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (waitTimeoutRef.current) {
        clearTimeout(waitTimeoutRef.current);
      }
    };
  }, [handleKeyPress, isActive, isWaiting]);

  const resetTest = () => {
    setIsActive(false);
    setIsWaiting(false);
    setCurrentTest(0);
    setResults([]);
    setShowResult(false);
    setInstruction('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (waitTimeoutRef.current) {
      clearTimeout(waitTimeoutRef.current);
    }
  };

  const validResults = results.filter(r => r.isValid && r.keyPressed !== 'timeout');
  const averageReactionTime = validResults.length > 0 
    ? Math.round(validResults.reduce((sum, r) => sum + r.reactionTime, 0) / validResults.length)
    : 0;
  
  const accuracy = results.length > 0 
    ? Math.round((validResults.length / results.length) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!showResult && (
        <div className="text-center mb-8">
          <div className="text-6xl font-mono mb-4">
            {currentTest}/{TEST_COUNT}
          </div>
          <div className="text-2xl text-gray-400 mb-6">
            진행률: {Math.round((currentTest / TEST_COUNT) * 100)}%
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <motion.div
          key={instruction}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-3xl font-bold p-8 rounded-lg ${
            isWaiting 
              ? 'bg-yellow-900/20 border border-yellow-500/30 text-yellow-400'
              : isActive 
                ? 'bg-green-900/20 border border-green-500/30 text-green-400'
                : results.length > 0 && results[results.length - 1].isValid
                  ? 'bg-blue-900/20 border border-blue-500/30 text-blue-400'
                  : results.length > 0
                    ? 'bg-red-900/20 border border-red-500/30 text-red-400'
                    : 'bg-gray-800 border border-gray-600 text-white'
          }`}
        >
          {instruction || '시작 버튼을 눌러 테스트를 시작하세요'}
        </motion.div>
      </div>

      {!isActive && !isWaiting && !showResult && currentTest === 0 && (
        <div className="text-center mb-8">
          <button
            onClick={startTest}
            className="px-8 py-4 text-2xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            테스트 시작
          </button>
        </div>
      )}

      {(results.length > 0 || showResult) && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400">{averageReactionTime}ms</div>
              <div className="text-gray-400">평균 반응시간</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
              <div className="text-gray-400">정확도</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400">{validResults.length}</div>
              <div className="text-gray-400">유효한 테스트</div>
            </div>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">상세 결과</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-gray-400">테스트</th>
                      <th className="py-3 px-4 text-gray-400">목표 키</th>
                      <th className="py-3 px-4 text-gray-400">누른 키</th>
                      <th className="py-3 px-4 text-gray-400">반응시간</th>
                      <th className="py-3 px-4 text-gray-400">결과</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-300">
                          {getKeyDisplayName(targetKey)}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {result.keyPressed === 'timeout' 
                            ? '시간초과' 
                            : getKeyDisplayName(result.keyPressed)}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {result.reactionTime}ms
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${
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
        </div>
      )}

      {(showResult || currentTest > 0) && (
        <div className="text-center">
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionTest;