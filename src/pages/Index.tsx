import { useCallback, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridOverlay from "@/components/mission/GridOverlay";
import ScrollProgressBar from "@/components/mission/ScrollProgressBar";
import MissionControlHero from "@/sections/MissionControlHero";
import StoryChapterSection from "@/sections/StoryChapterSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";
import InteractiveLab from "@/sections/InteractiveLab";
import BrainMap from "@/sections/BrainMap";
import EvolutionTimeline from "@/sections/EvolutionTimeline";
import ContactSection from "@/sections/ContactSection";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <GridOverlay />
      {splashDone && (
        <div className="relative z-20">
          <Navbar />
          <ScrollProgressBar />
          <MissionControlHero />
          <StoryChapterSection />
          <ProjectsSection />
          <SkillsSection />
          <InteractiveLab />
          <BrainMap />
          <EvolutionTimeline />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
