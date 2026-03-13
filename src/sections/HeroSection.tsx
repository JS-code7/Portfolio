import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingIcons from "@/components/FloatingIcons";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      <FloatingIcons />
      <div className="container mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="font-mono text-xs md:text-sm text-primary/70 tracking-widest uppercase mb-4">
            Welcome to my universe
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
        >
          <span className="text-foreground">Jeet</span>{" "}
          <span className="text-gradient-cyan glow-text">Soni</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground mb-6"
        >
          {["Cybersecurity", "Robotics", "Web Development", "Electronics", "AI"].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-primary/50" />}
              {item}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Diving into the tech cosmos — Powered by DSA, Code &amp; Innovation.
          Connecting circuits, creativity &amp; curiosity through real-world impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/projects">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 px-6"
            >
              <FolderOpen size={16} /> View Projects
            </Button>
          </Link>
          <Link to="/experience">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10 font-display gap-2 px-6"
            >
              <Briefcase size={16} /> Explore Experience
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-primary font-display gap-2 px-6"
          >
            <Download size={16} /> Download Resume
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} className="text-primary/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
