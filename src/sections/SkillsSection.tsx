import { motion } from "framer-motion";
import { BarChart3, Brain, Cloud, Cpu, Globe, Shield } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { buildSkillCategories } from "@/lib/intelligence";

const skills = [
  { icon: Cloud, label: "Microsoft Azure", desc: "Cloud infrastructure & services", level: 75 },
  { icon: Cpu, label: "Arduino IDE", desc: "Embedded systems & IoT", level: 85 },
  { icon: BarChart3, label: "Data Monitoring", desc: "Real-time analytics & dashboards", level: 70 },
  { icon: Shield, label: "Cybersecurity", desc: "Offensive & defensive security", level: 80 },
  { icon: Globe, label: "Web Development", desc: "Full-stack web applications", level: 90 },
  { icon: Brain, label: "AI Fundamentals", desc: "Machine learning & neural networks", level: 65 },
];

const capabilityNotes = [
  "Interfaces that explain the system",
  "Hardware and software working together",
  "Clear technical writing and planning",
  "Practical AI and data-driven decisions",
];

const SkillsSection = () => (
  <section id="skills" className="relative px-4 py-24 md:py-32">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="System Capabilities"
        title="Capabilities that support the rest of the portfolio"
        subtitle="This section acts like a compact command deck: it explains what I can do, how it connects, and where I tend to apply it."
      />

      <ScrollReveal className="mb-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {capabilityNotes.map((note) => (
            <GlassPanel key={note} className="p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">Capability</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{note}</p>
            </GlassPanel>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(buildSkillCategories())
            .filter(([, list]) => list.length > 0)
            .map(([category, list]) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground"
              >
                {category.toUpperCase()}: {list.length}
              </span>
            ))}
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {skills.map((skill) => (
          <motion.div key={skill.label} variants={staggerItemVariants}>
            <GlassPanel hover className="group p-6">
              <div className="mb-4 flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"
                >
                  <skill.icon size={20} className="text-primary" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="mb-1 font-display font-semibold text-foreground">{skill.label}</h3>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </div>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-glow-blue"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                <span>Depth</span>
                <span>{skill.level}%</span>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default SkillsSection;