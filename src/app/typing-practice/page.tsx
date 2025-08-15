'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const sampleTexts = [
  '키보드 타자 연습은 정확성과 속도를 향상시키는 데 중요합니다. 매일 꾸준히 연습하면 실력이 늘어납니다.',
  '새로운 키보드를 구매했다면 타자 연습을 통해 키감에 익숙해지세요. 처음에는 느리더라도 정확성을 우선시하는 것이 좋습니다.',
  '기계식 키보드는 각각의 스위치마다 독특한 타건감을 제공합니다. 청축은 클릭감이 뚜렷하고, 적축은 부드러운 리니어 타입입니다.',
  '타자를 빠르게 치는 것도 중요하지만, 오타 없이 정확하게 치는 것이 더 중요합니다. 속도는 정확성이 확보된 후 자연스럽게 향상됩니다.',
  '프로그래밍을 하거나 글을 많이 쓰는 사람이라면 타자 속도가 업무 효율성에 큰 영향을 미칩니다. 일반적으로 분당 40단어 이상이면 평균적인 수준입니다.',
];

export default function TypingPracticePage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completedTexts, setCompletedTexts] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentText = sampleTexts[currentTextIndex];
  const progress = (userInput.length / currentText.length) * 100;

  const calculateStats = useCallback(() => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    
    // 정확한 문자 수 계산
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++;
      }
    }
    
    const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

    return { wpm, accuracy };
  }, [userInput, currentText, startTime]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (!isStarted && newValue.length > 0) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    // 최대 길이 제한
    if (newValue.length > currentText.length) {
      return;
    }

    setUserInput(newValue);

    // 문장 완료 체크
    if (newValue === currentText) {
      setTimeout(() => {
        setCompletedTexts(prev => prev + 1);
        loadNextText();
      }, 500);
    }
  };

  const loadNextText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % sampleTexts.length);
    setUserInput('');
    setIsStarted(false);
    setStartTime(null);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // typing.works와 동일한 렌더링
  const renderText = () => {
    const textChars = currentText.split('');
    
    return textChars.map((char, index) => {
      const userChar = userInput[index];
      
      if (index < userInput.length) {
        // 사용자가 입력한 부분
        if (userChar === char) {
          // 맞은 문자
          return <span key={index} className="text-gray-500">{char}</span>;
        } else {
          // 틀린 문자
          return (
            <span key={index} className="bg-red-500 text-white px-0.5 rounded">
              {userChar}
            </span>
          );
        }
      } else if (index === userInput.length) {
        // 현재 입력해야 할 문자 (커서 위치)
        return (
          <span key={index} className="relative">
            <span className="bg-blue-500/30 text-white">{char}</span>
            <span className="absolute left-0 top-0 w-0.5 h-full bg-blue-500 animate-pulse"></span>
          </span>
        );
      } else {
        // 아직 입력하지 않은 문자
        return <span key={index} className="text-gray-400">{char}</span>;
      }
    });
  };

  useEffect(() => {
    const handleFocus = () => {
      textareaRef.current?.focus();
    };

    textareaRef.current?.focus();
    window.addEventListener('click', handleFocus);
    
    return () => {
      window.removeEventListener('click', handleFocus);
    };
  }, []);

  const stats = calculateStats();

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* 상단 통계 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-4">타자 연습</h1>
          <div className="flex justify-center gap-8 text-white">
            <span>{stats.wpm} WPM</span>
            <span>{stats.accuracy}% 정확도</span>
            <span>{completedTexts} 완료</span>
          </div>
        </motion.div>

        {/* 진행률 바 */}
        <div className="relative h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* 텍스트 영역 */}
        <div 
          className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 cursor-text"
          onClick={() => textareaRef.current?.focus()}
        >
          <div className="text-2xl leading-relaxed font-mono">
            {renderText()}
          </div>
          
          {/* 숨겨진 textarea */}
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleTextareaChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        {/* 안내 */}
        {!isStarted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-6"
          >
            클릭하고 타이핑을 시작하세요
          </motion.p>
        )}

        {/* 다음 버튼 */}
        <div className="flex justify-center mt-8">
          <button
            onClick={loadNextText}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            다음 문장 →
          </button>
        </div>
      </div>
    </main>
  );
}