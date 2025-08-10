import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SwitchComparison } from '@/components/SwitchComparison';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SwitchComparison />
      <ProjectSection />
    </main>
  );
}
