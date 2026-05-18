import { motion } from "framer-motion";
import { BarChart3, Brain, Cloud, Cpu, Globe, Shield } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { buildSkillCategories } from "@/lib/intelligence";
import { linkedinProfile } from "@/data/linkedinProfile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = [
  { icon: Shield, label: "Security Engineering", desc: "Defensive and offensive security workflows", level: 84 },
  { icon: Brain, label: "AI & Data Systems", desc: "Applied ML, CV, and analytics", level: 82 },
  { icon: Cpu, label: "Robotics & Embedded", desc: "Sensor and control-driven robotics", level: 86 },
  { icon: Globe, label: "Software & Cloud", desc: "Web delivery and cloud tooling", level: 88 },
  { icon: Cloud, label: "Cloud Platforms", desc: "Azure and OCI fundamentals", level: 76 },
  { icon: BarChart3, label: "Execution Quality", desc: "Planning, iteration, and measurable outcomes", level: 85 },
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
        title="Skills mapped from live career tracks"
        subtitle="Grouped skill lanes are synced with current experience and certifications, with hover-level details for recruiter-friendly scanning."
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

      <ScrollReveal className="mb-8">
        <TooltipProvider delayDuration={120}>
          <div className="grid gap-4 lg:grid-cols-2">
            {linkedinProfile.skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.06 }}
              >
                <GlassPanel className="p-5">
                  <h3 className="text-sm font-display font-semibold text-foreground">{group.group}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{group.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Tooltip key={skill}>
                        <TooltipTrigger asChild>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary/90"
                          >
                            {skill}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">{skill} • Used in current portfolio experience/projects.</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
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
