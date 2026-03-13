import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "AI-Based Smart Traffic Assistance System",
    description: "Intelligent traffic management system using AI to optimize traffic flow and reduce congestion in real-time.",
    tech: ["Python", "TensorFlow", "OpenCV", "IoT"],
    highlights: ["Real-time traffic analysis", "AI-powered predictions", "Smart signal control"],
  },
  {
    title: "Flappy Bird Game (Unreal Engine)",
    description: "A fully recreated Flappy Bird game built with Unreal Engine featuring custom physics and visual effects.",
    tech: ["Unreal Engine", "C++", "Blueprints"],
    highlights: ["Custom physics engine", "Particle effects", "Score tracking system"],
  },
  {
    title: "UPI Scam Detection Tool",
    description: "Security tool designed to detect and prevent UPI-based scams using pattern recognition and anomaly detection.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    highlights: ["Pattern recognition", "Real-time alerts", "Fraud prevention"],
  },
  {
    title: "Line Follower Robot",
    description: "Autonomous robot that follows a predefined path using infrared sensors and PID control algorithms.",
    tech: ["Arduino", "C++", "IR Sensors", "PID Control"],
    highlights: ["PID control algorithm", "Sensor calibration", "Autonomous navigation"],
  },
  {
    title: "Obstacle Assist Bot",
    description: "Intelligent bot that navigates around obstacles using ultrasonic sensors and path planning algorithms.",
    tech: ["Arduino", "Ultrasonic Sensors", "C++"],
    highlights: ["Obstacle avoidance", "Path planning", "Real-time sensor fusion"],
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Projects" subtitle="A selection of things I've built" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <GlassCard
              key={project.title}
              delay={i * 0.1}
              className="p-6 cursor-pointer group"
            >
              <div onClick={() => setSelectedProject(project)}>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong glow-border rounded-2xl p-6 md:p-8 max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-foreground pr-4">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Highlights</h4>
                <ul className="space-y-1.5">
                  {selectedProject.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10 gap-2">
                <ExternalLink size={14} /> View Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
