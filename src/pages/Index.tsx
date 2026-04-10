import { useCallback, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GridOverlay from "@/components/GridOverlay";
import MissionControlHero from "@/components/MissionControlHero";
import StoryChapterSection from "@/components/StoryChapterSection";
import InteractiveLab from "@/components/InteractiveLab";
import BrainMap from "@/components/BrainMap";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <CursorGlow />
      <GridOverlay />
      {splashDone && (
        <div className="noise-layer relative z-10">
          <Navbar />
          <ScrollProgressBar />
          <MissionControlHero />
          <SectionDivider />
          <StoryChapterSection />
          <SectionDivider />
          <ProjectsSection />
          <SectionDivider />
          <InteractiveLab />
          <SectionDivider />
          <BrainMap />
          <SectionDivider />
          <EvolutionTimeline />
          <SectionDivider />
          <SkillsSection />
          <SectionDivider />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;