import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import GalaxyScene from "@/components/GalaxyScene";
import SkillTree from "@/components/SkillTree";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Loader2 } from "lucide-react";

const SkillsGalaxy = () => (
  <PageTransition>
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Skills Galaxy" subtitle="Explore my technical universe in 3D" />

        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass glow-border rounded-2xl overflow-hidden mb-16"
          >
            <Suspense fallback={
              <div className="w-full h-[500px] flex items-center justify-center text-muted-foreground font-mono text-sm gap-2">
                <Loader2 className="animate-spin text-primary" size={20} />
                Loading Galaxy...
              </div>
            }>
              <GalaxyScene />
            </Suspense>
          </motion.div>
        </ScrollReveal>

        <SectionHeading title="Skill Tree" subtitle="Gaming-style progression map" />
        <ScrollReveal>
          <SkillTree />
        </ScrollReveal>
      </div>
    </div>
    <Footer />
  </PageTransition>
);

export default SkillsGalaxy;
