import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ProjectJourney from "@/components/ProjectJourney";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Projects = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Mission Map" subtitle="Navigate through my project journey" />
        <ProjectJourney />
      </div>
    </div>
    <Footer />
  </div>
);

export default Projects;
