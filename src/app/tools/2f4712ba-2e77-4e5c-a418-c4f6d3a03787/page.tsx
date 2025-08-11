'use client';

import { useState } from 'react';
import TypingSpeedTest from '../../../components/TypingSpeedTest';
import { motion } from 'framer-motion';

const koreanTexts = [
  {
    level: '초급',
    texts: [
      '안녕하세요. 반갑습니다.',
      '오늘 날씨가 참 좋네요.',
      '키보드 연습을 시작해봅시다.',
      '한글 타자 연습은 꾸준함이 중요합니다.',
    ]
  },
  {
    level: '중급',
    texts: [
      '컴퓨터를 사용하면서 키보드는 가장 중요한 입력 도구 중 하나입니다.',
      '정확하고 빠른 타이핑 실력은 업무 효율성을 크게 향상시킵니다.',
      '기계식 키보드와 멤브레인 키보드는 각각 다른 특징을 가지고 있습니다.',
      '한글과 영어를 번갈아 사용하는 문서 작성에서는 언어 전환 속도도 중요합니다.',
    ]
  },
  {
    level: '고급',
    texts: [
      '현대 사회에서 디지털 기기의 사용이 일상화되면서, 키보드를 통한 문자 입력 능력은 필수적인 역량이 되었습니다. 특히 한글의 경우 자음과 모음의 조합으로 이루어진 복잡한 구조를 가지고 있어, 효율적인 타이핑을 위해서는 체계적인 연습이 필요합니다.',
      '인공지능과 머신러닝 기술의 발전으로 인해 다양한 분야에서 혁신적인 변화가 일어나고 있습니다. 이러한 기술들은 의료, 금융, 교육, 교통 등 우리 생활의 모든 영역에 영향을 미치고 있으며, 앞으로 더욱 광범위하게 적용될 것으로 예상됩니다.',
    ]
  }
];

interface TypingStats {
  cpm: number; // Characters Per Minute
  accuracy: number;
  timeElapsed: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  typingSpeed: string; // 타자 등급
}

export default function KoreanTypingPage() {
  const [selectedLevel, setSelectedLevel] = useState('초급');
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const [stats, setStats] = useState<TypingStats[]>([]);
  const [testKey, setTestKey] = useState(0);

  const currentLevelTexts = koreanTexts.find(level => level.level === selectedLevel)?.texts || [];
  const currentText = currentLevelTexts[selectedTextIndex] || '';

  const handleComplete = (testStats: TypingStats) => {
    setStats(prev => [...prev, testStats]);
  };

  const selectNewText = () => {
    const availableTexts = currentLevelTexts.length;
    const newIndex = Math.floor(Math.random() * availableTexts);
    setSelectedTextIndex(newIndex);
    setTestKey(prev => prev + 1); // Force re-render of TypingTest component
  };

  const averageCPM = stats.length > 0 
    ? Math.round(stats.reduce((sum, stat) => sum + stat.cpm, 0) / stats.length) 
    : 0;
  
  const averageAccuracy = stats.length > 0 
    ? Math.round(stats.reduce((sum, stat) => sum + stat.accuracy, 0) / stats.length) 
    : 0;

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            한글 타자 연습
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            분당 글자 수와 정확도 측정으로 한글 타자 실력을 향상시켜보세요
          </p>
        </motion.div>

        {/* 난이도 선택 */}
        <div className="mb-8 flex justify-center px-4">
          <div className="flex bg-gray-800 rounded-lg p-1 w-full max-w-md sm:w-auto">
            {koreanTexts.map((level) => (
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

        {/* 통계 */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4"
          >
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{averageCPM}</div>
              <div className="text-gray-400 text-sm sm:text-base">평균 분당글자수</div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{averageAccuracy}%</div>
              <div className="text-gray-400 text-sm sm:text-base">평균 정확도</div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.length}</div>
              <div className="text-gray-400 text-sm sm:text-base">완료한 테스트</div>
            </div>
          </motion.div>
        )}

        {/* 타이핑 테스트 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-4 sm:p-8 mb-8 mx-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              {selectedLevel} 단계
            </h2>
            <button
              onClick={selectNewText}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              새로운 텍스트
            </button>
          </div>
          
          {currentText && (
            <TypingSpeedTest 
              key={testKey}
              text={currentText}
              language="korean"
              onComplete={handleComplete}
            />
          )}
        </motion.div>

        {/* 최근 결과 */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 sm:p-8 mx-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">최근 결과</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">시간</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">분당글자수</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">정확도</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">시간(초)</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.slice(-10).reverse().map((stat, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                        {new Date().toLocaleTimeString()}
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-blue-400 font-semibold text-xs sm:text-sm">
                        {stat.cpm}
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-green-400 font-semibold text-xs sm:text-sm">
                        {stat.accuracy}%
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">
                        {Math.floor(stat.timeElapsed)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}