import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedVectorBackground from "@/components/AnimatedVectorBackground";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ExperienceSection from "@/sections/ExperienceSection";
import EducationSection from "@/sections/EducationSection";
import CertificationsSection from "@/sections/CertificationsSection";
import ContactSection from "@/sections/ContactSection";
import LinkedInSection from "@/sections/LinkedInSection";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <ParticleBackground />
      {splashDone && (
        <div className="relative z-10">
          <AnimatedVectorBackground />
          <FloatingShapes />
          <Navbar />
          <ScrollProgress />
          <HeroSection />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <SkillsSection />
          <SectionDivider />
          <ProjectsSection />
          <SectionDivider />
          <LinkedInSection />
          <SectionDivider />
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
