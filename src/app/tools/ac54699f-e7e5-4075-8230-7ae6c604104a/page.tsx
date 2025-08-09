'use client';

import { useState } from 'react';
import ReactionTest from '../../../components/ReactionTest';
import { motion } from 'framer-motion';

interface ReactionResult {
  keyPressed: string;
  reactionTime: number;
  timestamp: number;
  isValid: boolean;
}

interface TestSession {
  id: string;
  timestamp: number;
  averageReactionTime: number;
  accuracy: number;
  validResults: number;
  totalResults: number;
  results: ReactionResult[];
}

export default function KeyboardReactionTestPage() {
  const [testSessions, setTestSessions] = useState<TestSession[]>([]);
  const [isTestActive, setIsTestActive] = useState(false);

  const handleTestComplete = (results: ReactionResult[]) => {
    const validResults = results.filter(r => r.isValid && r.keyPressed !== 'timeout');
    const averageReactionTime = validResults.length > 0 
      ? Math.round(validResults.reduce((sum, r) => sum + r.reactionTime, 0) / validResults.length)
      : 0;
    
    const accuracy = results.length > 0 
      ? Math.round((validResults.length / results.length) * 100)
      : 0;

    const newSession: TestSession = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      averageReactionTime,
      accuracy,
      validResults: validResults.length,
      totalResults: results.length,
      results
    };

    setTestSessions(prev => [newSession, ...prev].slice(0, 10)); // Keep only last 10 sessions
    setIsTestActive(false);
  };

  const startNewTest = () => {
    setIsTestActive(true);
  };

  const getBenchmarkCategory = (reactionTime: number): { category: string; color: string; description: string } => {
    if (reactionTime < 200) {
      return { 
        category: '엘리트', 
        color: 'text-purple-400', 
        description: 'e스포츠 프로게이머 수준' 
      };
    } else if (reactionTime < 250) {
      return { 
        category: '뛰어남', 
        color: 'text-blue-400', 
        description: '매우 빠른 반응속도' 
      };
    } else if (reactionTime < 300) {
      return { 
        category: '좋음', 
        color: 'text-green-400', 
        description: '평균보다 빠른 반응속도' 
      };
    } else if (reactionTime < 400) {
      return { 
        category: '보통', 
        color: 'text-yellow-400', 
        description: '일반적인 반응속도' 
      };
    } else {
      return { 
        category: '느림', 
        color: 'text-red-400', 
        description: '연습이 필요한 수준' 
      };
    }
  };

  const overallStats = testSessions.length > 0 ? {
    averageReactionTime: Math.round(
      testSessions.reduce((sum, session) => sum + session.averageReactionTime, 0) / testSessions.length
    ),
    averageAccuracy: Math.round(
      testSessions.reduce((sum, session) => sum + session.accuracy, 0) / testSessions.length
    ),
    bestReactionTime: Math.min(...testSessions.map(s => s.averageReactionTime)),
    totalTests: testSessions.length
  } : null;

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            키보드 반응속도 테스트
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            키보드의 입력 딜레이와 개인 반응속도를 정밀 측정하고 분석합니다
          </p>
        </motion.div>

        {/* 전체 통계 */}
        {overallStats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400">
                {overallStats.averageReactionTime}ms
              </div>
              <div className="text-gray-400">전체 평균</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">
                {overallStats.averageAccuracy}%
              </div>
              <div className="text-gray-400">전체 정확도</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400">
                {overallStats.bestReactionTime}ms
              </div>
              <div className="text-gray-400">최고 기록</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {overallStats.totalTests}
              </div>
              <div className="text-gray-400">총 테스트</div>
            </div>
          </motion.div>
        )}

        {/* 벤치마크 */}
        {overallStats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">성능 벤치마크</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">당신의 등급</h3>
                {(() => {
                  const benchmark = getBenchmarkCategory(overallStats.averageReactionTime);
                  return (
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl font-bold ${benchmark.color}`}>
                        {benchmark.category}
                      </div>
                      <div className="text-gray-400">
                        {benchmark.description}
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">참고 기준</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-400">엘리트 (&lt;200ms)</span>
                    <span className="text-gray-400">e스포츠 프로게이머</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">뛰어남 (200-250ms)</span>
                    <span className="text-gray-400">게이머</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-400">좋음 (250-300ms)</span>
                    <span className="text-gray-400">일반인 상위</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400">보통 (300-400ms)</span>
                    <span className="text-gray-400">일반 평균</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 테스트 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8 mb-8"
        >
          {!isTestActive ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">새로운 테스트 시작</h2>
              <div className="mb-6 text-gray-400">
                <p className="mb-2">• 화면에 표시되는 키를 최대한 빠르게 눌러주세요</p>
                <p className="mb-2">• 총 10회의 테스트가 진행됩니다</p>
                <p className="mb-2">• 키보드와 개인 반응속도를 종합 측정합니다</p>
              </div>
              <button
                onClick={startNewTest}
                className="px-8 py-4 text-2xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                테스트 시작
              </button>
            </div>
          ) : (
            <ReactionTest onComplete={handleTestComplete} />
          )}
        </motion.div>

        {/* 테스트 기록 */}
        {testSessions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">최근 테스트 기록</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-gray-400">시간</th>
                    <th className="py-3 px-4 text-gray-400">평균 반응시간</th>
                    <th className="py-3 px-4 text-gray-400">정확도</th>
                    <th className="py-3 px-4 text-gray-400">유효/전체</th>
                    <th className="py-3 px-4 text-gray-400">등급</th>
                  </tr>
                </thead>
                <tbody>
                  {testSessions.map((session) => {
                    const benchmark = getBenchmarkCategory(session.averageReactionTime);
                    return (
                      <tr key={session.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(session.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4 text-blue-400 font-semibold">
                          {session.averageReactionTime}ms
                        </td>
                        <td className="py-3 px-4 text-green-400 font-semibold">
                          {session.accuracy}%
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {session.validResults}/{session.totalResults}
                        </td>
                        <td className={`py-3 px-4 font-semibold ${benchmark.color}`}>
                          {benchmark.category}
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