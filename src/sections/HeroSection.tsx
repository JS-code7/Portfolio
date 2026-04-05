import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Briefcase, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingIcons from "@/components/FloatingIcons";
import TypewriterText from "@/components/TypewriterText";
import MagneticButton from "@/components/MagneticButton";
import ScrollReveal from "@/components/ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      <FloatingIcons />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-purple/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto text-center z-10 relative">
        <ScrollReveal direction="down" distance={30} delay={0.1}>
          <p className="font-mono text-xs md:text-sm text-primary/70 tracking-[0.3em] uppercase mb-6">
            Welcome to my universe
          </p>
        </ScrollReveal>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6"
        >
          <motion.span
            className="text-foreground inline-block"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Jeet
          </motion.span>{" "}
          <motion.span
            className="text-gradient-cyan glow-text inline-block"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Soni
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="h-8 md:h-10 flex items-center justify-center mb-6"
        >
          <span className="text-sm md:text-lg font-mono text-muted-foreground">
            <TypewriterText
              texts={["Cybersecurity Engineer", "Robotics Developer", "AI Enthusiast", "Web Developer", "Circuit Architect"]}
              className="text-primary"
            />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground mb-6"
        >
          {["Cybersecurity", "Robotics", "Web Development", "Electronics", "AI"].map((item, i) => (
            <motion.span
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
            >
              {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />}
              <span className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default">
                {item}
              </span>
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Diving into the tech cosmos — Powered by DSA, Code &amp; Innovation.
          Connecting circuits, creativity &amp; curiosity through real-world impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          <MagneticButton>
            <Link to="/projects">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 px-8 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FolderOpen size={16} /> View Projects
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/experience">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 text-foreground hover:bg-primary/10 font-display gap-2 px-8 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Briefcase size={16} /> Explore Experience
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a href="/#contact">
              <Button
                variant="secondary"
                size="lg"
                className="border border-primary/20 bg-secondary/70 text-foreground hover:bg-primary/10 hover:text-primary font-display gap-2 px-8"
              >
                <Mail size={16} /> Contact Me
              </Button>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="/resume.pdf" download="Jeet_Soni_Resume.pdf" type="application/pdf">
              <Button
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-primary font-display gap-2 px-8 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download size={16} /> Download Resume
              </Button>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
            <ArrowDown size={16} className="text-primary/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
