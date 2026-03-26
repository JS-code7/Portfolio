import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading title="Education" />

      <ScrollReveal direction="up" scale={0.95}>
        <GlassCard className="p-6 md:p-8 hover:bg-primary/5 transition-colors duration-300">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-glow-blue/10 flex items-center justify-center shrink-0"
            >
              <GraduationCap size={28} className="text-primary" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground text-lg">
                Bachelor of Technology – Computer Engineering
              </h3>
              <p className="text-sm text-primary/80 mt-1 flex items-center gap-1.5">
                <MapPin size={12} /> Gujarat Technological University
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono flex items-center gap-1.5">
                <Calendar size={12} /> 2024 – 2028
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Focusing on cybersecurity, machine learning, and embedded systems with hands-on project experience in autonomous robotics and AI-powered applications.
              </p>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  </section>
);

export default EducationSection;
