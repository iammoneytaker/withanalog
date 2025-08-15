import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { InteractiveSection } from '@/components/sections/InteractiveSection';
import { TypingPracticeSection } from '@/components/sections/TypingPracticeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { SwitchComparison } from '@/components/SwitchComparison';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <InteractiveSection />
      <TypingPracticeSection />
      <AboutSection />
      <SwitchComparison />
      <ProjectSection />
    </main>
  );
}
