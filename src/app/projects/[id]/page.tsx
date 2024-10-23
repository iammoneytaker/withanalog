import { ProjectDetail } from '../../../components/ProjectDetail';
import { getProjectById } from '../../../lib/projects';
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <ProjectDetail project={project} />
    </main>
  );
}
