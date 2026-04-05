import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { Cloud, Cpu, BarChart3, Shield, Globe, Brain } from "lucide-react";
import { buildSkillCategories } from "@/lib/intelligence";

const skills = [
  { icon: Cloud, label: "Microsoft Azure", desc: "Cloud infrastructure & services", level: 75 },
  { icon: Cpu, label: "Arduino IDE", desc: "Embedded systems & IoT", level: 85 },
  { icon: BarChart3, label: "Data Monitoring", desc: "Real-time analytics & dashboards", level: 70 },
  { icon: Shield, label: "Cybersecurity", desc: "Offensive & defensive security", level: 80 },
  { icon: Globe, label: "Web Development", desc: "Full-stack web applications", level: 90 },
  { icon: Brain, label: "AI Fundamentals", desc: "Machine learning & neural networks", level: 65 },
];

const SkillsSection = () => (
  <section id="skills" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading title="Skills" subtitle="Technologies and domains I work with" />

      <ScrollReveal className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(buildSkillCategories())
            .filter(([, list]) => list.length > 0)
            .map(([category, list]) => (
              <span
                key={category}
                className="text-[10px] font-mono px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary"
              >
                {category.toUpperCase()}: {list.length}
              </span>
            ))}
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skills.map((skill) => (
          <motion.div key={skill.label} variants={staggerItemVariants}>
            <GlassCard delay={0} className="p-6 group cursor-default hover:bg-primary/5 transition-colors duration-300">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                >
                  <skill.icon size={20} className="text-primary" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground mb-1">{skill.label}</h3>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </div>
              </div>
              {/* Skill progress bar */}
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-glow-blue"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mt-1 text-right">{skill.level}%</p>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default SkillsSection;
