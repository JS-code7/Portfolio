import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { Cloud, Cpu, BarChart3, Shield, Globe, Brain } from "lucide-react";

const skills = [
  { icon: Cloud, label: "Microsoft Azure", desc: "Cloud infrastructure & services" },
  { icon: Cpu, label: "Arduino IDE", desc: "Embedded systems & IoT" },
  { icon: BarChart3, label: "Data Monitoring", desc: "Real-time analytics & dashboards" },
  { icon: Shield, label: "Cybersecurity", desc: "Offensive & defensive security" },
  { icon: Globe, label: "Web Development", desc: "Full-stack web applications" },
  { icon: Brain, label: "AI Fundamentals", desc: "Machine learning & neural networks" },
];

const SkillsSection = () => (
  <section id="skills" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading title="Skills" subtitle="Technologies and domains I work with" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skills.map((skill, i) => (
          <GlassCard key={skill.label} delay={i * 0.1} className="p-6 group cursor-default">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <skill.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{skill.label}</h3>
                <p className="text-xs text-muted-foreground">{skill.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
