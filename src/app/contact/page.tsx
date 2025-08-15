'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('sangwon2618@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main className="min-h-screen pt-20 px-4 relative overflow-hidden">
      {/* 배경 그라데이션 애니메이션 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            키보드와 기술에 대한 열정을 공유하고 싶으신가요? 
            <br />언제든 연락주세요!
          </p>
        </motion.div>

        {/* 메인 이메일 카드 - 중앙 정렬 */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group w-full max-w-2xl"
            onMouseEnter={() => setHoveredCard('email')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">📧</span> 
                  이메일로 연락하기
                </h2>
                {hoveredCard === 'email' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-blue-400"
                  >
                    Click to copy!
                  </motion.span>
                )}
              </div>
              
              <button
                onClick={copyEmail}
                className="w-full group/button"
              >
                <div className="bg-gray-700/50 rounded-2xl p-8 hover:bg-gray-700/70 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-3xl font-mono text-blue-400 mb-3">
                      sangwon2618@gmail.com
                    </p>
                    <p className="text-base text-gray-400">
                      클릭하여 이메일 주소 복사
                    </p>
                  </div>
                  
                  {/* 복사 완료 애니메이션 */}
                  {copiedEmail && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm"
                    >
                      <span className="text-green-400 font-semibold text-xl">
                        ✓ 복사되었습니다!
                      </span>
                    </motion.div>
                  )}
                </div>
              </button>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">💬</p>
                  <p className="text-gray-300 text-sm font-medium">평일 24시간 이내</p>
                  <p className="text-gray-400 text-xs mt-1">빠른 답변</p>
                </div>
                <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">🚀</p>
                  <p className="text-gray-300 text-sm font-medium">프로젝트 협업</p>
                  <p className="text-gray-400 text-xs mt-1">언제든 환영</p>
                </div>
                <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">🐛</p>
                  <p className="text-gray-300 text-sm font-medium">버그 & 제안</p>
                  <p className="text-gray-400 text-xs mt-1">피드백 환영</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 추가 정보 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {/* 빠른 응답 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">빠른 응답</h3>
            <p className="text-gray-400 text-sm">
              평일 기준 24시간 이내에 답변드립니다
            </p>
          </div>

          {/* 다양한 협업 */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold text-white mb-2">다양한 협업</h3>
            <p className="text-gray-400 text-sm">
              프로젝트, 리뷰, 컨설팅 등 다양한 협업 가능
            </p>
          </div>

          {/* 열린 소통 */}
          <div className="bg-gradient-to-br from-pink-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/20">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-lg font-semibold text-white mb-2">열린 소통</h3>
            <p className="text-gray-400 text-sm">
              어떤 의견이든 환영합니다
            </p>
          </div>
        </motion.div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg">
            키보드에 대한 열정을 함께 나누고 싶으신가요?
          </p>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
            지금 바로 연락주세요!
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
