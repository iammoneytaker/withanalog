'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  {
    title: '현실과 디지털의 가교',
    description:
      "키보드는 단순한 입력 도구가 아닙니다.\n당신의 생각과 창의력이 디지털 세상으로 전달되는 가장 중요한 매개체입니다.\n올바른 키보드 선택은 당신의 잠력을 극대화시켜줍니다.",
    icon: '🌉',
    gradient: 'from-blue-400 to-cyan-400',
    details: ['인간-컴퓨터 인터페이스', '생산성 향상', '창의력 발현']
  },
  {
    title: '과학적 성능 분석',
    description:
      '감에 의존하지 않는 정확한 데이터로 최고의 키보드를 찾아드립니다.\n반응속도, 키감, 내구성까지 모든 요소를 측정하고 분석합니다.\n당신의 사용 패턴에 가장 적합한 선택을 도와드립니다.',
    icon: '🔬',
    gradient: 'from-orange-400 to-red-400',
    details: ['1ms 단위 정밀 측정', '데이터 기반 분석', '개인화된 추천']
  },
  {
    title: '완벽한 사용자 경험',
    description:
      '초보부터 전문가까지, 모든 사용자가 만족할 수 있는 커스텀 경험을 제공합니다.\n실시간 피드백, 상세한 모니터링, 개인화된 추천까지\n키보드 여정의 모든 단계를 완벽하게 지원합니다.',
    icon: '✨',
    gradient: 'from-purple-400 to-pink-400',
    details: ['직관적인 UI/UX', '실시간 피드백', '커뮤니티 지원']
  },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              WithAnalog이 특별한 이유
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
            "키보드는 현실과 디지털을 연결해주는 훌륭한 도구"라는 철학 하에
            <br />
            <span className="text-blue-400 font-medium">과학적 접근과 사용자 경험을 모두 고려한 완벽한 플랫폼</span>을 만들었습니다.
            <br />
            <span className="text-purple-400">당신의 키보드 여정을 더욱 의미있고 정확하게 만들어 드립니다.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
                {/* 그라디언트 배경 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 text-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {reason.icon}
                  </div>
                  
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-center bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}>
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-center mb-4 sm:mb-6 text-xs sm:text-sm">
                    {reason.description}
                  </p>
                  
                  <div className="space-y-1 sm:space-y-2">
                    {reason.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center justify-center text-xs text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${reason.gradient} mr-2`}></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 진솔한 메시지 */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-600/50">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              🌱 키보드 초보자가 만든 진솔한 플랫폼
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              저도 키보드에 대해 공부하면서, 같은 고민을 하는 분들에게
              <br />
              <span className="text-blue-400 font-medium">조금이라도 도움이 되었으면 하는 마음</span>으로 만들었습니다.
              <br />
              <span className="text-purple-400">함께 배워가며 더 나은 키보드 경험을 찾아가요!</span>
            </p>
            
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-xs text-gray-500">
                💡 "키린이"부터 "키보드 덕후"까지, 모든 분들의 키보드 여정을 응원합니다
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}