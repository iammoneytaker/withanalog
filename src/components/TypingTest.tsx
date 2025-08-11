'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
}

interface TypingTestProps {
  text: string;
  onComplete: (stats: TypingStats) => void;
}

type InputMode = 'preview' | 'textbox';

const TypingTest: React.FC<TypingTestProps> = ({ text, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [isComposing, setIsComposing] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('preview');
  const inputRef = useRef<HTMLInputElement>(null);
  const textboxRef = useRef<HTMLTextAreaElement>(null);

  const calculateStats = useCallback((): TypingStats => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0; // minutes
    const totalChars = userInput.length;
    const correctChars = totalChars - errors.size;
    const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    return {
      wpm,
      accuracy,
      timeElapsed: timeElapsed * 60, // convert back to seconds
      totalChars,
      correctChars,
      incorrectChars: errors.size,
    };
  }, [userInput.length, errors.size, startTime]);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionUpdate = () => {
    // Composition in progress, no action needed
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsComposing(false);
    // Process the final composed text
    processInput(e.currentTarget.value);
  };

  const processInput = (value: string) => {
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    // Prevent typing beyond the text length
    if (value.length > text.length) {
      return;
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Track errors
    const newErrors = new Set(errors);
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        newErrors.add(i);
      } else {
        newErrors.delete(i);
      }
    }
    setErrors(newErrors);

    // Check if completed
    if (value.length === text.length) {
      setIsCompleted(true);
      const finalStats = calculateStats();
      onComplete(finalStats);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Only process input if not composing (for non-IME input)
    if (!isComposing) {
      processInput(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent certain keys that might interfere with typing
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
    if (inputMode === 'preview') {
      inputRef.current?.focus();
    } else {
      textboxRef.current?.focus();
    }
  };

  const getCharacterStyle = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === text[index] 
        ? 'text-green-400 bg-green-900/30' 
        : 'text-red-400 bg-red-900/30';
    } else if (index === currentIndex) {
      return 'bg-blue-500/50 animate-pulse';
    }
    return 'text-gray-400';
  };

  useEffect(() => {
    if (inputMode === 'preview' && inputRef.current) {
      inputRef.current.focus();
    } else if (inputMode === 'textbox' && textboxRef.current) {
      textboxRef.current.focus();
    }
  }, [inputMode]);

  const currentStats = calculateStats();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{currentStats.wpm}</div>
            <div className="text-xs sm:text-sm text-gray-400">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{currentStats.accuracy}%</div>
            <div className="text-xs sm:text-sm text-gray-400">정확도</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {Math.floor(currentStats.timeElapsed)}s
            </div>
            <div className="text-xs sm:text-sm text-gray-400">시간</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          {/* 입력 모드 전환 버튼 */}
          <div className="flex rounded-lg bg-gray-800 p-1">
            <button
              onClick={() => setInputMode('preview')}
              className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                inputMode === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              미리보기
            </button>
            <button
              onClick={() => setInputMode('textbox')}
              className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                inputMode === 'textbox'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              입력창
            </button>
          </div>
          
          <button
            onClick={resetTest}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            다시 시작
          </button>
        </div>
      </div>

      {inputMode === 'preview' ? (
        <div className="relative mb-4 sm:mb-6">
          <div className="text-base sm:text-xl leading-6 sm:leading-8 p-4 sm:p-6 bg-gray-800 rounded-lg font-mono break-all">
            {text.split('').map((char, index) => (
              <span key={index} className={`${getCharacterStyle(index)} transition-colors`}>
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
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={handleCompositionUpdate}
            onCompositionEnd={handleCompositionEnd}
            disabled={isCompleted}
            className="absolute inset-0 w-full h-full opacity-0 cursor-default"
            placeholder=""
          />
        </div>
      ) : (
        <div className="mb-4 sm:mb-6">
          {/* 미리보기 텍스트 */}
          <div className="text-base sm:text-xl leading-6 sm:leading-8 p-4 sm:p-6 bg-gray-800 rounded-lg font-mono break-all mb-4">
            {text.split('').map((char, index) => (
              <span key={index} className={`${getCharacterStyle(index)} transition-colors`}>
                {char}
              </span>
            ))}
          </div>
          
          {/* 입력 텍스트박스 */}
          <textarea
            ref={textboxRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={handleCompositionUpdate}
            onCompositionEnd={handleCompositionEnd}
            disabled={isCompleted}
            className="w-full h-32 sm:h-40 p-4 bg-gray-700 text-white rounded-lg font-mono text-base sm:text-lg leading-6 sm:leading-8 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="위 텍스트를 여기에 입력하세요..."
          />
        </div>
      )}

      {!isStarted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-400"
        >
          <p className="text-sm sm:text-base">
            {inputMode === 'preview' ? '위 텍스트를 보고 타이핑을 시작하세요' : '위 텍스트를 입력창에 입력하세요'}
          </p>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 sm:p-6 bg-green-900/20 border border-green-500/30 rounded-lg"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">완료!</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{currentStats.wpm}</div>
              <div className="text-xs sm:text-sm text-gray-400">WPM</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{currentStats.accuracy}%</div>
              <div className="text-xs sm:text-sm text-gray-400">정확도</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{currentStats.correctChars}</div>
              <div className="text-xs sm:text-sm text-gray-400">정확한 글자</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{Math.floor(currentStats.timeElapsed)}s</div>
              <div className="text-xs sm:text-sm text-gray-400">총 시간</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TypingTest;