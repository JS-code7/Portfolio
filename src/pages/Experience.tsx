import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ExperienceSection from "@/sections/ExperienceSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Experience = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-16">
      <ExperienceSection />
    </div>
    <Footer />
  </div>
);

export default Experience;
