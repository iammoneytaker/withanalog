import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getProjectById } from '../../../lib/projects';
import { ProjectDetail } from '../../../components/ProjectDetail';

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const project = await getProjectById(params.id, supabase);

  return (
    <main className="min-h-screen py-20 px-4">
      <ProjectDetail project={project} />
    </main>
  );
}
