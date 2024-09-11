'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { applications } from '../../../data/applications';
import { useInView } from 'react-intersection-observer';

const app = applications.find((a) => a.id === 'quitsmoke');

export default function QuitSmoke() {
  if (!app) {
    return <div>애플리케이션을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <Image
            src={app.icon}
            alt={`${app.name} 아이콘`}
            width={120}
            height={120}
            className="rounded-xl mb-4"
          />
          <h1 className="text-4xl font-bold">{app.name}</h1>
          <p className="text-xl text-gray-400 mt-2">{app.slogan}</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">앱 소개</h2>
          <p className="text-gray-300 leading-relaxed">
            '금연말고절연'은 금연을 시도하는 사람들을 위한 앱입니다. 매번
            실패하는 금연 계획에 지쳐서 직접 만든 앱입니다. 계속 도전하다 보면
            언젠가 성공하지 않을까요? 이 앱은 담배를 완전히 끊는 것이 아니라,
            점진적으로 줄여나가는 과정을 돕습니다. 사용자의 흡연 패턴을
            분석하고, 시각화를 제공하여 더 건강한 삶으로 나아갈 수 있도록
            지원하며 응원합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>금연 진행 상황 시각화</li>
            <li>금연 팁과 동기부여 메시지</li>
            <li>커뮤니티 지원 시스템</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            앱 화면 스크린샷
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {[
              '/images/quitsmoke/screenshot1.png',
              '/images/quitsmoke/screenshot2.png',
              '/images/quitsmoke/screenshot3.png',
              '/images/quitsmoke/screenshot4.png',
            ].map((src, index) => (
              <ScrollAnimatedImage
                key={src}
                src={src}
                index={index}
                appName={app.name}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">지금 다운로드하세요</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.moneytaker.quitSmoke"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Google Play
            </a>
            <a
              href="https://apps.apple.com/app/your-app-id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              App Store
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ScrollAnimatedImage({ src, index, appName }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex justify-center"
    >
      <Image
        src={src}
        alt={`${appName} 스크린샷 ${index + 1}`}
        width={300}
        height={600}
        className="rounded-lg shadow-lg"
      />
    </motion.div>
  );
}
