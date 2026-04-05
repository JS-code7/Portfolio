import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedVectorBackground from "@/components/AnimatedVectorBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => (
  <PageTransition>
    <ParticleBackground />
    <AnimatedVectorBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 min-h-screen pt-8">
      <ContactSection />
    </div>
    <Footer />
  </PageTransition>
);

export default Contact;
