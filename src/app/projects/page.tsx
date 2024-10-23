import ProjectGrid from '../../components/ProjectGrid';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            모든 프로젝트
          </h1>
          <p className="text-xl text-gray-400">
            광고 없는 앱 100개 만들기 프로젝트의 모든 앱을 소개합니다
          </p>
        </div>
        <ProjectGrid />
      </div>
    </main>
  );
}
