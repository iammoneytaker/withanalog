import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { AboutSection } from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </main>
  );
}
