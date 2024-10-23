'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  {
    title: '낭만을 위해..',
    description:
      "낭만은 '굳이'에서 시작된다고 생각합니다. \n저는 100개의 앱을 굳이 광고를 넣지 않고 만들어보겠습니다.",
    icon: '🎯',
  },
  {
    title: '부모님의 핸드폰',
    description:
      '부모님은 아무것도 모르고 앱에서 나오는 것들을 클릭하다가 이상한 어플을 다운로드 하기도 했습니다.\n저는 이 과정에서 광고 없는 앱을 개발하겠다 생각했습니다.',
    icon: '🌱',
  },
  {
    title: '나의 일화',
    description:
      '제가 만든 앱에 광고를 넣었는데, 제가 개발한 것인데도 들어가기 싫더라고요. 그래서 또 한번 결심했습니다. 광고 없는 앱을 만들기로..',
    icon: '👥',
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
            왜 광고 없는 앱을 만드나요?
          </h2>
          <p className="text-xl text-gray-400">
            더 나은 디지털 경험을 위한 우리의 약속
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
