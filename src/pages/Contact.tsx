import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Contact = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-16">
      <ContactSection />
    </div>
    <Footer />
  </div>
);

export default Contact;
