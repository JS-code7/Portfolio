import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ExperienceSection from "@/sections/ExperienceSection";
import Footer from "@/components/Footer";

const Experience = () => (
  <PageTransition>
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 min-h-screen pt-8">
      <ExperienceSection />
    </div>
    <Footer />
  </PageTransition>
);

export default Experience;
