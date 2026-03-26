import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { motion } from "framer-motion";
import { Shield, Cpu, Globe, Zap, Brain, Code2 } from "lucide-react";

const focusAreas = [
  { icon: Shield, label: "Cybersecurity", color: "from-red-500/20 to-red-600/5" },
  { icon: Brain, label: "Machine Learning", color: "from-purple-500/20 to-purple-600/5" },
  { icon: Cpu, label: "Robotics", color: "from-blue-500/20 to-blue-600/5" },
  { icon: Zap, label: "Automation", color: "from-yellow-500/20 to-yellow-600/5" },
  { icon: Globe, label: "Secure Software", color: "from-green-500/20 to-green-600/5" },
];

const stats = [
  { value: 5, suffix: "+", label: "Projects" },
  { value: 5, suffix: "", label: "Certifications" },
  { value: 3, suffix: "+", label: "Domains" },
  { value: 1, suffix: "+", label: "Year Exp" },
];

const AboutSection = () => (
  <section id="about" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading title="About Me" subtitle="A brief introduction" />

      {/* Stats row */}
      <ScrollReveal className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="glass glow-border rounded-xl p-5 text-center group hover:bg-primary/5 transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <GlassCard className="p-6 md:p-10">
          <div className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
            <TextReveal
              text="Currently pursuing a Bachelor of Technology in Computer Engineering at Gujarat Technological University. I'm driven by curiosity and passionate about exploring the intersection of cybersecurity, artificial intelligence, robotics, and automation systems."
            />
          </div>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {focusAreas.map((area) => (
              <motion.div
                key={area.label}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-b ${area.color} border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-default`}
              >
                <area.icon size={22} className="text-primary" />
                <span className="text-xs text-muted-foreground text-center font-medium">{area.label}</span>
              </motion.div>
            ))}
          </StaggerContainer>
        </GlassCard>
      </ScrollReveal>
    </div>
  </section>
);

export default AboutSection;
