'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function TypingPracticeSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            키보드 타자 연습
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            새로 구매한 키보드의 타감을 익히고 타자 실력을 향상시켜보세요. 
            실시간 WPM 측정과 정확도 분석으로 체계적인 연습이 가능합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 기능 설명 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              전문적인 타자 연습 도구
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">실시간 성능 측정</h4>
                  <p className="text-gray-600">WPM(분당 단어수)과 정확도를 실시간으로 측정하여 진행 상황을 확인할 수 있습니다.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">시각적 피드백</h4>
                  <p className="text-gray-600">올바른 입력은 회색으로, 잘못된 입력은 빨간색으로 표시되어 즉시 확인 가능합니다.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">다양한 연습 문장</h4>
                  <p className="text-gray-600">키보드와 타자에 관련된 다양한 문장으로 재미있게 연습할 수 있습니다.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">진행률 표시</h4>
                  <p className="text-gray-600">현재 진행 상황을 시각적으로 확인할 수 있는 진행률 바를 제공합니다.</p>
                </div>
              </div>
            </div>

            <Link 
              href="/typing-practice"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              타자 연습 시작하기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* 미리보기 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl p-8 shadow-2xl"
          >
            <div className="text-white">
              {/* 가상 타자 연습 화면 */}
              <div className="mb-6 text-center">
                <div className="flex justify-center gap-8 text-sm mb-4">
                  <span>45 WPM</span>
                  <span>95% 정확도</span>
                  <span>3 완료</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 font-mono text-lg leading-relaxed">
                <span className="text-gray-500">키보드</span>
                <span className="bg-red-500 text-white px-1 rounded">ㅇ</span>
                <span className="text-gray-400"> 타자 연습은 정확성과 속도를</span>
                <span className="bg-blue-500/30 relative">
                  &nbsp;
                  <span className="absolute left-0 top-0 w-0.5 h-full bg-blue-500 animate-pulse"></span>
                </span>
                <span className="text-gray-400">향상시키는 데 중요합니다.</span>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 text-center">
                실시간으로 타자 실력을 측정하고 개선하세요
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}