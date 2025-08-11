'use client';

import { useState } from 'react';
import EnglishTypingTest from '../../../components/EnglishTypingTest';
import { motion } from 'framer-motion';

const englishTexts = [
  {
    level: 'Easy',
    texts: [
      'The quick brown fox jumps over the lazy dog.',
      'Programming is fun and challenging at the same time.',
      'Practice makes perfect in everything you do.',
      'Technology changes the way we live and work.',
    ]
  },
  {
    level: 'Medium',
    texts: [
      'In the world of technology, artificial intelligence and machine learning have become essential tools for solving complex problems and improving human life quality.',
      'Professional developers spend considerable time debugging code, writing documentation, and collaborating with team members to deliver high-quality software products.',
      'The importance of cybersecurity cannot be overstated in our increasingly digital world where data breaches and privacy concerns are growing rapidly.',
      'Modern web development requires knowledge of multiple programming languages, frameworks, and tools to create responsive and user-friendly applications.',
    ]
  },
  {
    level: 'Hard',
    texts: [
      'The paradigm shift towards cloud computing and distributed systems has fundamentally transformed how organizations architect, deploy, and maintain their technological infrastructure, requiring developers to understand concepts such as microservices, containerization, orchestration, and serverless computing architectures.',
      'Quantum computing represents a revolutionary approach to information processing that leverages quantum mechanical phenomena such as superposition and entanglement to perform computations exponentially faster than classical computers for specific algorithmic problems, potentially disrupting cryptography, optimization, and scientific simulation.',
    ]
  }
];

interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
}

export default function EnglishTypingPage() {
  const [selectedLevel, setSelectedLevel] = useState('Easy');
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const [stats, setStats] = useState<TypingStats[]>([]);
  const [testKey, setTestKey] = useState(0);

  const currentLevelTexts = englishTexts.find(level => level.level === selectedLevel)?.texts || [];
  const currentText = currentLevelTexts[selectedTextIndex] || '';

  const handleComplete = (testStats: TypingStats) => {
    setStats(prev => [...prev, testStats]);
  };

  const selectNewText = () => {
    const availableTexts = currentLevelTexts.length;
    const newIndex = Math.floor(Math.random() * availableTexts);
    setSelectedTextIndex(newIndex);
    setTestKey(prev => prev + 1);
  };

  const averageWPM = stats.length > 0 
    ? Math.round(stats.reduce((sum, stat) => sum + stat.wpm, 0) / stats.length) 
    : 0;
  
  const averageAccuracy = stats.length > 0 
    ? Math.round(stats.reduce((sum, stat) => sum + stat.accuracy, 0) / stats.length) 
    : 0;

  const getWPMCategory = (wpm: number): { category: string; color: string; description: string } => {
    if (wpm >= 70) {
      return { 
        category: 'Expert', 
        color: 'text-purple-400', 
        description: 'Professional typing speed' 
      };
    } else if (wpm >= 50) {
      return { 
        category: 'Advanced', 
        color: 'text-blue-400', 
        description: 'Above average speed' 
      };
    } else if (wpm >= 30) {
      return { 
        category: 'Intermediate', 
        color: 'text-green-400', 
        description: 'Average typing speed' 
      };
    } else if (wpm >= 15) {
      return { 
        category: 'Beginner', 
        color: 'text-yellow-400', 
        description: 'Below average speed' 
      };
    } else {
      return { 
        category: 'Novice', 
        color: 'text-red-400', 
        description: 'Practice needed' 
      };
    }
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            English Typing Test
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Improve your English typing speed and accuracy with systematic practice
          </p>
        </motion.div>

        {/* Difficulty Selection */}
        <div className="mb-8 flex justify-center px-4">
          <div className="flex bg-gray-800 rounded-lg p-1 w-full max-w-md sm:w-auto">
            {englishTexts.map((level) => (
              <button
                key={level.level}
                onClick={() => {
                  setSelectedLevel(level.level);
                  setSelectedTextIndex(0);
                  setTestKey(prev => prev + 1);
                }}
                className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${
                  selectedLevel === level.level
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{averageWPM}</div>
                <div className="text-gray-400 text-sm sm:text-base">Average WPM</div>
              </div>
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">{averageAccuracy}%</div>
                <div className="text-gray-400 text-sm sm:text-base">Average Accuracy</div>
              </div>
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.length}</div>
                <div className="text-gray-400 text-sm sm:text-base">Tests Completed</div>
              </div>
            </div>

            {/* Performance Category */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center">
              <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-3">Your Typing Level</h3>
              {(() => {
                const category = getWPMCategory(averageWPM);
                return (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <div className={`text-2xl sm:text-3xl font-bold ${category.color}`}>
                      {category.category}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base text-center">
                      {category.description}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* Typing Test */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-8 mb-8 mx-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              {selectedLevel} Level
            </h2>
            <button
              onClick={selectNewText}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              New Text
            </button>
          </div>
          
          {currentText && (
            <EnglishTypingTest 
              key={testKey}
              text={currentText}
              onComplete={handleComplete}
            />
          )}
        </motion.div>

        {/* Recent Results */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 sm:p-8 mx-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Recent Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">Time</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">WPM</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">Accuracy</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">Duration</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.slice(-10).reverse().map((stat, index) => {
                    const category = getWPMCategory(stat.wpm);
                    return (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                          {new Date().toLocaleTimeString()}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-blue-400 font-semibold text-xs sm:text-sm">
                          {stat.wpm}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-400 font-semibold text-xs sm:text-sm">
                          {stat.accuracy}%
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                          {Math.floor(stat.timeElapsed)}s
                        </td>
                        <td className={`py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm ${category.color}`}>
                          {category.category}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}