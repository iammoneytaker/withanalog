'use client';

import { useState } from 'react';
import KeyboardPerformanceTester from '../../../components/KeyboardPerformanceTester';
import { motion } from 'framer-motion';

export default function KeyboardPerformanceTestPage() {
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            키보드 성능 테스트
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            텐키리스/풀사이즈 키보드 레이아웃으로 APM/CPS를 정확히 측정하세요
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">키보드 성능 테스트 가이드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🎯 테스트 방법</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>• "테스트 시작" 버튼을 클릭하세요</li>
                  <li>• 텐키리스 또는 풀사이즈 키보드 선택</li>
                  <li>• 키보드를 자유롭게 눌러 성능 측정</li>
                  <li>• WASD, 스페이스바 등 게임 키 집중 테스트</li>
                  <li>• 가상 키보드에서 눌린 키 실시간 확인</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">📊 측정 항목</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>• <strong>APM:</strong> 분당 행동 횟수 (게임 실력 지표)</li>
                  <li>• <strong>CPS:</strong> 초당 클릭 수 (순간 반응속도)</li>
                  <li>• <strong>응답 시간:</strong> 키 입력부터 반응까지의 딜레이</li>
                  <li>• <strong>키별 분석:</strong> 가장 빠른/느린 키 성능</li>
                  <li>• <strong>키보드 레이아웃:</strong> TKL/풀사이즈 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 키보드 테스터 컴포넌트 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8 mb-8"
        >
          <KeyboardPerformanceTester />
        </motion.div>

        {/* 추가 정보 및 팁 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">💡 테스트 팁</h2>
            <ul className="text-gray-400 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span><strong>게이밍 테스트:</strong> WASD 키를 빠르게 눌러 게임용 성능을 확인하세요</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">•</span>
                <span><strong>타이핑 테스트:</strong> 일반적인 타이핑 패턴으로 키보드 반응성을 측정하세요</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">•</span>
                <span><strong>키 롤오버:</strong> 여러 키를 동시에 눌러 동시 입력 지원을 확인하세요</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400">•</span>
                <span><strong>사운드 피드백:</strong> 키 입력 시 소리로 반응성을 체감하세요</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎮 대상 사용자</h2>
            <ul className="text-gray-400 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-400">🎯</span>
                <span><strong>프로게이머:</strong> 키보드 반응 속도가 중요한 경쟁 게임 플레이어</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">⌨️</span>
                <span><strong>개발자:</strong> 장시간 코딩 작업을 위한 키보드 성능 확인</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✍️</span>
                <span><strong>작가/편집자:</strong> 빠른 타이핑을 위한 키보드 최적화</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">🔧</span>
                <span><strong>하드웨어 엔지니어:</strong> 키보드 품질 검증 및 테스트</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 성능 벤치마크 가이드 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📈 성능 벤치마크</h2>
          
          {/* APM 기준 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">APM (Actions Per Minute) 기준</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center bg-purple-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-2">300+</div>
                <div className="text-white font-semibold">프로게이머</div>
                <div className="text-gray-400 text-sm">e스포츠 선수급</div>
              </div>
              <div className="text-center bg-blue-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-2">150-300</div>
                <div className="text-white font-semibold">고수</div>
                <div className="text-gray-400 text-sm">숙련된 게이머</div>
              </div>
              <div className="text-center bg-green-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-2">80-150</div>
                <div className="text-white font-semibold">보통</div>
                <div className="text-gray-400 text-sm">일반 사용자</div>
              </div>
              <div className="text-center bg-red-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-2">&lt; 80</div>
                <div className="text-white font-semibold">초보</div>
                <div className="text-gray-400 text-sm">연습 필요</div>
              </div>
            </div>
          </div>

          {/* CPS 기준 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-orange-400 mb-4">CPS (Clicks Per Second) 기준</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center bg-orange-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-400 mb-2">10+</div>
                <div className="text-white font-semibold">매우 빠름</div>
                <div className="text-gray-400 text-sm">클릭 게임 고수</div>
              </div>
              <div className="text-center bg-yellow-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-2">6-10</div>
                <div className="text-white font-semibold">빠름</div>
                <div className="text-gray-400 text-sm">게이머 수준</div>
              </div>
              <div className="text-center bg-green-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-2">3-6</div>
                <div className="text-white font-semibold">보통</div>
                <div className="text-gray-400 text-sm">일반 타이핑</div>
              </div>
              <div className="text-center bg-gray-600/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-400 mb-2">&lt; 3</div>
                <div className="text-white font-semibold">느림</div>
                <div className="text-gray-400 text-sm">천천히 입력</div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p className="text-sm">
              * 측정값은 브라우저 환경, 시스템 성능, 키보드 종류에 따라 달라질 수 있습니다
            </p>
            <p className="text-sm mt-1">
              * APM은 게임에서, CPS는 순간적인 입력 속도 측정에 주로 사용됩니다
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}