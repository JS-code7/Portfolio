import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/SectionHeading";
import { Shield, Cpu, Globe, Zap, Brain } from "lucide-react";

const focusAreas = [
  { icon: Shield, label: "Cybersecurity" },
  { icon: Brain, label: "Machine Learning" },
  { icon: Cpu, label: "Robotics" },
  { icon: Zap, label: "Automation" },
  { icon: Globe, label: "Secure Software Engineering" },
];

const AboutSection = () => (
  <section id="about" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-4xl">
      <SectionHeading title="About Me" subtitle="A brief introduction" />

      <GlassCard className="p-6 md:p-10">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
          Currently pursuing a <span className="text-foreground font-medium">Bachelor of Technology in Computer Engineering</span> at{" "}
          <span className="text-primary">Gujarat Technological University</span>.
          I'm driven by curiosity and passionate about exploring the intersection of
          cybersecurity, artificial intelligence, robotics, and automation systems.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {focusAreas.map((area, i) => (
            <div
              key={area.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <area.icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs text-muted-foreground text-center">{area.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </section>
);

export default AboutSection;
