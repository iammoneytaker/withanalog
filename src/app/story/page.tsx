'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// 감정과 색상을 매핑한 스토리 데이터
const storyData = [
  {
    text: '그냥 앱 개발 100개 하면 되잖아, 잘 하면 돈도 벌고',
    mood: 'motivation',
    color: 'from-blue-600',
  },
  {
    text: '나의 마음 속에서 또 다른 내가 소리쳤다.',
    mood: 'inner_voice',
    color: 'from-purple-600',
  },
  {
    text: '나는 왜 광고 없는 100개의 앱을 만들까?',
    mood: 'questioning',
    color: 'from-yellow-600',
  },
  {
    text: '처음에 앱 개발을 빠르게 하면서 최대한 많이 만들면 돈을 벌 수 있지 않을까? 라는 생각을 가지며, 앱을 만드는 방법을 공부하고 AI를 활용해서 많이 만들고 있었다.',
    mood: 'past_reflection',
    color: 'from-blue-700',
  },
  {
    text: '그리고 광고를 붙여보는 경험을 하면서 광고 수익이 작게나마 매일 난다는 것이 얼마나 큰 것인지 알게 되었다.',
    mood: 'realization',
    color: 'from-green-600',
  },
  {
    text: "그 때부터 나는 광고를 위한 앱 기능을 만들기 시작했다. 이 프로젝트를 시작하는 이유가 '낭만', '부모님', '나'라는 이유로 시작한다고 했는데 이번 글은 '나'에 대한 이야기이다. 만들면서도 재미를 느끼진 못했고 광고 수익이 적은 날에는 괜시리 짜증이 나곤 했다.",
    mood: 'regret',
    color: 'from-red-700',
  },
  {
    text: '매 시간마다 도파민에 중독된 사람처럼 Google Admob 사이트에 들어가서 오늘의 수익을 확인하던 나의 모습은 마치 비트코인 가격이 실시간으로 변하는 것을 지켜만 보는 예전의 나의 모습과 겹쳐보였다.',
    mood: 'self_awareness',
    color: 'from-purple-800',
  },
  {
    text: "매번 새로운 것에 도전 하는 '나'",
    mood: 'self_introduction',
    color: 'from-blue-500',
  },
  {
    text: '나는 주변 사람들에게 매번 새로운 것을 한다는 이야기를 듣곤한다. 이 말은 바꿔 말하면 끈기가 없는 것.',
    mood: 'self_criticism',
    color: 'from-gray-700',
  },
  {
    text: '매번 새로운 것을 찍-먹 수준으로 하다가 어느 임계점에 부딪히면 다시 새로운 것을 하러 떠나가는 행동 패턴을 머리로는 알고 있었다. 하지만, 끈기 있게 무언가를 하는 것을 행동으로 보여준 적은 없었다.',
    mood: 'realization',
    color: 'from-indigo-700',
  },
  {
    text: '그래서 도전이 필요했다. 끝까지 할 수 있는 도전.',
    mood: 'determination',
    color: 'from-red-600',
  },
  {
    text: '처음 앱 개발로 돈을 벌어보겠다고 다짐 했을 때도 마찬가지로 새로운 것에 대한 도전이었다.',
    mood: 'reflection',
    color: 'from-blue-600',
  },
  {
    text: '광고 수익이라도 나면 좀 더 오랫동안 지속할 수 있을까? 라는 생각으로 도전에 임한 것이지만, 반대로 말하면 광고 수익이 나지 않으면 중간에 포기 하기 쉽다는 것이었다.',
    mood: 'doubt',
    color: 'from-yellow-700',
  },
  {
    text: '나는 언제 제일 행복한가?',
    mood: 'self_questioning',
    color: 'from-purple-500',
  },
  {
    text: '사업을 하겠다고 퇴사를 하고 벌써 2년이 다 되어 가는데, 그럴싸한 사업은 성공시키지 못했다. 매일 매일이 누군가가 시키는 것이 없기 때문에 무한히 성장할 수도, 무한히 나태해질수도 있는 경계에 있는 것 같았다.',
    mood: 'uncertainty',
    color: 'from-gray-600',
  },
  {
    text: '다행히도 조그마한 도전들을 해보면서 얻은 것들이 있다. 수입도 조금씩 생기고 무엇보다 나에 대해 잘 알게 되는 시간이었다.',
    mood: 'gratitude',
    color: 'from-green-600',
  },
  {
    text: "나는 누군가에게 '가치'를 줄 때 가장 행복감을 느낀다는 것이었다. 이 가치를 어떨 때는 마케팅을 하면서 느꼈고, 어떨 때는 누군가의 문제를 해결해주면서 만들기도 했다.",
    mood: 'enlightenment',
    color: 'from-blue-500',
  },
  {
    text: '이렇게 생각을 하고 나니, 나는 광고 없는 앱을 만들어야겠다고 결심이 선 것이다.',
    mood: 'decision',
    color: 'from-green-700',
  },
  {
    text: '갑자기 결론이 왜 그렇게 나는가?',
    mood: 'curiosity',
    color: 'from-yellow-600',
  },
  {
    text: '내가 만든 앱이 진정으로 사람들에게 가치를 주는 것 같지 않다고 생각했었다. 근데도 나는 돈을 벌기 위해 광고를 봐야만 기능을 사용할 수 있게 만들었다.',
    mood: 'guilt',
    color: 'from-red-800',
  },
  {
    text: '가치를 먼저 주고 그에 합당한 돈을 받는 것이 좋다고 생각하는데 가치를 주기 전에 돈을 먼저 받은 셈이다.',
    mood: 'realization',
    color: 'from-purple-700',
  },
  {
    text: '남들에게 인정을 받기도 전에 내가 나를 인정할 수 없는 일을 하고 있었다. 이런 생각을 자주 하다보니 점점 피폐해져 갔고 결국 또 포기를 할 것 같았다.',
    mood: 'despair',
    color: 'from-gray-800',
  },
  {
    text: '그래서 광고 없이 앱 100개를 만드는 프로젝트를 시작하기로 했다.',
    mood: 'determination',
    color: 'from-blue-600',
  },
  {
    text: '이 프로젝트를 통해 나는 다음과 같은 것들을 얻을 수 있다.',
    mood: 'hope',
    color: 'from-green-600',
  },
  {
    text: '먼저 가치를 주는 사람이 되는 것',
    mood: 'aspiration',
    color: 'from-yellow-500',
  },
  {
    text: '목표를 세우고 끝까지 끈기 있게 행동한 사람이 되는 것',
    mood: 'commitment',
    color: 'from-blue-700',
  },
  {
    text: '앱 개발에 대해서 조금이라도 알게 되는 것',
    mood: 'learning',
    color: 'from-purple-600',
  },
  {
    text: '등 이것말고도 많은 것을 얻으리라고 기대하고 있다.',
    mood: 'anticipation',
    color: 'from-green-500',
  },
  {
    text: '이 프로젝트를 끝낼 수 있을지 모르겠지만 미래의 나에게 한마디를 하고 싶다.',
    mood: 'uncertainty_hope',
    color: 'from-blue-500',
  },
  {
    text: '넌 드디어 변한거야 화이팅(오글거리네)',
    mood: 'encouragement',
    color: 'from-pink-500',
  },
].map((item, index) => ({
  ...item,
  id: index + 1,
  total: 30, // 전체 스토리 개수
}));

export default function StoryPage() {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 스크롤 진행도 업데이트
  useEffect(() => {
    scrollYProgress.onChange((v) => setProgress(v * 100));
  }, [scrollYProgress]);

  return (
    <main className="bg-black text-white">
      {/* 진행 상황 표시 바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 앱 아이콘 그리드 (상단 고정) */}
      <div className="fixed top-4 right-4 grid grid-cols-10 gap-1 opacity-20">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: i < progress ? 1 : 0 }}
            transition={{ delay: i * 0.01 }}
          />
        ))}
      </div>

      {storyData.map((section) => (
        <motion.section
          key={section.id}
          className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${section.color} to-black`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-3xl md:text-4xl font-light leading-relaxed">
                {section.text.split('\n').map((paragraph, pIndex) => (
                  <React.Fragment key={`p-${pIndex}`}>
                    {paragraph.split(/(\s+)/).map((part, i) => {
                      // 공백만 있는 부분은 그대로 렌더링
                      if (part.trim() === '') {
                        return <span key={`${pIndex}-${i}-space`}>{part}</span>;
                      }
                      // 단어인 경우 motion.span으로 렌더링
                      return (
                        <motion.span
                          key={`${pIndex}-${i}-word`}
                          className={`inline-block ${
                            ['가치', '도전', '앱', '광고'].some((keyword) =>
                              part.includes(keyword)
                            )
                              ? 'text-yellow-400 font-medium'
                              : ''
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {part}
                        </motion.span>
                      );
                    })}
                    {pIndex < section.text.split('\n').length - 1 && (
                      <span className="block h-6" />
                    )}
                  </React.Fragment>
                ))}
              </p>

              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5 }}
              />

              <motion.div
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                {section.id} / {section.total}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* CTA 섹션 */}
      <motion.section
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-blue-900 p-8 rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-3xl font-bold mb-4">혹시 가치를 느끼셨나요?</h2>
            <p className="text-lg mb-8 text-gray-200">
              저의 앱이 도움이 되었다면 후원으로 응원해주세요
            </p>
            <motion.a
              href="https://buymeacoffee.com/withanalog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              후원하기
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
