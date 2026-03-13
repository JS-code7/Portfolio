import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const ExperienceSection = () => (
  <section id="experience" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading title="Experience" subtitle="Professional journey" />

      <div className="relative pl-8 md:pl-12">
        {/* Timeline line */}
        <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Glowing node */}
          <div className="absolute -left-5 md:-left-7 top-1 w-3 h-3 rounded-full bg-primary animate-pulse-glow" 
               style={{ boxShadow: "0 0 12px hsl(187 100% 50% / 0.5)" }} />

          <div className="glass glow-border rounded-xl p-6">
            <span className="text-xs font-mono text-primary/70">July 2025 – Present</span>
            <h3 className="font-display font-semibold text-foreground text-lg mt-1">
              Associate Professional Service Director
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Rotaract Club of New L.J.I.E.T
            </p>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Leading professional service initiatives, organizing community events, and driving 
              impactful projects that bridge technology and social responsibility.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
