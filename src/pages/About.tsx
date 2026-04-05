import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedVectorBackground from "@/components/AnimatedVectorBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { Shield, Brain, Cpu, Zap, Globe, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const focusAreas = [
  { icon: Shield, label: "Cybersecurity", desc: "Protecting digital infrastructure through offensive and defensive security practices." },
  { icon: Brain, label: "Machine Learning", desc: "Building intelligent systems that learn from data and make predictions." },
  { icon: Cpu, label: "Robotics", desc: "Designing autonomous systems with sensors, actuators, and real-time control." },
  { icon: Zap, label: "Automation", desc: "Creating efficient automated workflows and intelligent process systems." },
  { icon: Globe, label: "Web Development", desc: "Crafting modern, responsive web applications with cutting-edge tech." },
  { icon: Code2, label: "DSA & Algorithms", desc: "Solving complex problems with optimized data structures and algorithms." },
];

const About = () => (
  <PageTransition>
    <ParticleBackground />
    <AnimatedVectorBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-4">
            About Me
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Aspiring developer exploring the frontiers of technology
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 5, suffix: "+", label: "Projects" },
              { value: 5, suffix: "", label: "Certifications" },
              { value: 3, suffix: "+", label: "Focus Areas" },
              { value: 1, suffix: "+", label: "Year" },
            ].map((s) => (
              <div key={s.label} className="glass glow-border rounded-xl p-5 text-center">
                <div className="text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard className="p-6 md:p-10 mb-12">
            <div className="text-muted-foreground leading-relaxed text-sm md:text-base">
              <TextReveal
                text="Currently pursuing a Bachelor of Technology in Computer Engineering at Gujarat Technological University. I'm driven by curiosity and passionate about exploring the intersection of cybersecurity, artificial intelligence, robotics, and automation systems. My goal is to build secure, innovative technologies that solve real-world problems."
              />
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="text-xl font-display font-semibold text-foreground text-center mb-6">Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area, i) => (
              <ScrollReveal key={area.label} direction={i % 2 === 0 ? "left" : "right"} delay={0.1 * i}>
                <GlassCard delay={0} className="p-5 group hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                    >
                      <area.icon size={20} className="text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{area.label}</h3>
                      <p className="text-xs text-muted-foreground">{area.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
    <Footer />
  </PageTransition>
);

export default About;
