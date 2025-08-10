'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  {
    title: '키감의 예술',
    description:
      "Cherry MX부터 Topre까지, 각 스위치마다 고유한 키감이 있습니다.\n청축의 클릭감, 적축의 부드러움, 무접점의 독특함.\n키보드는 단순한 도구가 아닌 감각의 예술품입니다.",
    icon: '⌨️',
    gradient: 'from-blue-400 to-cyan-400',
    details: ['30+ 스위치 종류', '촉감 분석', '소음 측정']
  },
  {
    title: '성능의 극한',
    description:
      '1ms 응답속도, N-Key Rollover, Anti-Ghosting.\n게이머든 프로그래머든, 최고의 성능을 위해서는\n올바른 키보드 선택이 필수입니다.',
    icon: '⚡',
    gradient: 'from-orange-400 to-red-400',
    details: ['응답속도 테스트', 'APM 측정', '내구성 검증']
  },
  {
    title: '커스텀의 무한함',
    description:
      '60%부터 Full Size까지, 핫스왑부터 가스켓 마운트까지.\nPBT 키캡, 알루미늄 케이스, 커스텀 스위치까지.\n나만의 키보드를 만들어보세요.',
    icon: '🎨',
    gradient: 'from-purple-400 to-pink-400',
    details: ['커스텀 빌드 가이드', '호환성 체크', '부품 추천']
  },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              왜 키보드에 주목하나요?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            키보드는 디지털과 현실을 잇는 가장 중요한 인터페이스입니다.
            <br />
            <span className="text-blue-400">전문적인 분석과 체험으로 최적의 키보드를 찾아보세요.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
                {/* 그라디언트 배경 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`text-6xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {reason.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}>
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-center mb-6 text-sm">
                    {reason.description}
                  </p>
                  
                  <div className="space-y-2">
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
      </div>
    </section>
  );
}
