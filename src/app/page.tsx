import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { StorySection } from '@/components/sections/StorySection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <StorySection />
    </main>
  );
}
