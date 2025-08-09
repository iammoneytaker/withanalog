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

interface EnglishTypingTestProps {
  text: string;
  onComplete: (stats: TypingStats) => void;
}

const EnglishTypingTest: React.FC<EnglishTypingTestProps> = ({ text, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const calculateStats = useCallback((): TypingStats => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0; // minutes
    const totalChars = userInput.length;
    const correctChars = totalChars - errors.size;
    const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
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
    return 'text-gray-400';
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const currentStats = calculateStats();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentStats.wpm}</div>
            <div className="text-sm text-gray-400">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentStats.accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {Math.floor(currentStats.timeElapsed)}s
            </div>
            <div className="text-sm text-gray-400">Time</div>
          </div>
        </div>
        
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="relative mb-6">
        <div className="text-xl leading-8 p-6 bg-gray-800 rounded-lg font-mono">
          {text.split('').map((char, index) => (
            <span key={index} className={`${getCharacterStyle(index)} transition-colors`}>
              {char === ' ' ? '\u00A0' : char}
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
        />
      </div>

      {!isStarted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-400"
        >
          <p>Start typing the text above to begin the test</p>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-900/20 border border-green-500/30 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-4">Test Complete!</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{currentStats.wpm}</div>
              <div className="text-gray-400">WPM</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{currentStats.accuracy}%</div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{currentStats.correctChars}</div>
              <div className="text-gray-400">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{Math.floor(currentStats.timeElapsed)}s</div>
              <div className="text-gray-400">Time</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnglishTypingTest;