import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import AboutSection from "@/sections/AboutSection";
import EducationSection from "@/sections/EducationSection";
import CertificationsSection from "@/sections/CertificationsSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const About = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-16">
      <AboutSection />
      <EducationSection />
      <CertificationsSection />
    </div>
    <Footer />
  </div>
);

export default About;
