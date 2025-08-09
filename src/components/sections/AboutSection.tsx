'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  {
    title: '촉감의 매력',
    description:
      "키보드는 단순한 입력 도구가 아닙니다.\n손끝으로 느끼는 스위치의 촉감, 키캡의 질감, 그리고 타이핑의 리듬감까지.\n디지털과 아날로그가 만나는 순간을 경험해보세요.",
    icon: '⌨️',
  },
  {
    title: '효율성의 추구',
    description:
      '좋은 키보드는 생산성을 높입니다.\n정확한 타이핑, 빠른 응답속도, 편안한 손목 각도.\n우리는 당신에게 맞는 완벽한 키보드를 찾아드립니다.',
    icon: '⚡',
  },
  {
    title: '개성의 표현',
    description:
      '키보드는 당신의 개성을 드러내는 도구입니다.\n레이아웃, 스위치, 키캡, 케이스까지.\n나만의 키보드로 나만의 타이핑 경험을 만들어보세요.',
    icon: '🎨',
  },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            왜 키보드에 주목하나요?
          </h2>
          <p className="text-xl text-gray-400">
            디지털과 현실을 잇는 가장 중요한 인터페이스
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line text-left px-4">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
