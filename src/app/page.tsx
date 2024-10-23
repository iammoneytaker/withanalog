import { Motion } from 'framer-motion'
import { ProjectCounter } from '@/components/ProjectCounter'
import { AppGrid } from '@/components/AppGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 히어로 섹션 */}
      <section className="h-screen flex flex-col items-center justify-center px-4">
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white text-center"
        >
          광고 없는 앱 100개 만들기
        </Motion.h1>
        <ProjectCounter className="mt-8" />
      </section>

      {/* 프로젝트 설명 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
            왜 광고 없는 앱을 만드나요?
          </h2>
          {/* 설명 카드들 */}
        </div>
      </section>
    </main>
  )