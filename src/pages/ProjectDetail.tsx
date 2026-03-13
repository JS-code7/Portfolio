import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/ScrollProgress";

const projectData: Record<string, {
  title: string;
  description: string;
  overview: string;
  tech: string[];
  challenges: string[];
  highlights: string[];
}> = {
  "smart-traffic": {
    title: "AI-Based Smart Traffic Assistance System",
    description: "Intelligent traffic management system using AI to optimize traffic flow and reduce congestion in real-time.",
    overview: "This project leverages computer vision and deep learning to analyze traffic patterns, predict congestion, and dynamically control traffic signals for optimal flow.",
    tech: ["Python", "TensorFlow", "OpenCV", "IoT", "Raspberry Pi"],
    challenges: ["Real-time video processing at scale", "Low-latency signal control", "Weather condition adaptation"],
    highlights: ["Real-time traffic analysis", "AI-powered predictions", "Smart signal control", "30% reduction in congestion"],
  },
  "flappy-bird": {
    title: "Flappy Bird Game (Unreal Engine)",
    description: "A fully recreated Flappy Bird game built with Unreal Engine featuring custom physics and visual effects.",
    overview: "Built from scratch in Unreal Engine with custom physics simulation, particle effects, and a polished UI for an immersive gaming experience.",
    tech: ["Unreal Engine", "C++", "Blueprints", "Niagara VFX"],
    challenges: ["Precise physics tuning", "Frame-rate independent gameplay", "Mobile optimization"],
    highlights: ["Custom physics engine", "Particle effects", "Score tracking system", "Responsive controls"],
  },
  "upi-scam": {
    title: "UPI Scam Detection Tool",
    description: "Security tool designed to detect and prevent UPI-based scams using pattern recognition and anomaly detection.",
    overview: "Analyzes transaction patterns using machine learning to identify fraudulent UPI transactions before they complete, protecting users from financial scams.",
    tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
    challenges: ["Low false-positive rate", "Real-time detection", "Evolving scam patterns"],
    highlights: ["Pattern recognition", "Real-time alerts", "Fraud prevention", "95% detection accuracy"],
  },
  "line-follower": {
    title: "Line Follower Robot",
    description: "Autonomous robot that follows a predefined path using infrared sensors and PID control algorithms.",
    overview: "An autonomous robot using array of IR sensors with a PID control algorithm for smooth, precise path following at variable speeds.",
    tech: ["Arduino", "C++", "IR Sensors", "PID Control", "3D Printing"],
    challenges: ["Sensor noise filtering", "Sharp turn handling", "Speed optimization"],
    highlights: ["PID control algorithm", "Sensor calibration", "Autonomous navigation", "Competition ready"],
  },
  "obstacle-bot": {
    title: "Obstacle Assist Bot",
    description: "Intelligent bot that navigates around obstacles using ultrasonic sensors and path planning algorithms.",
    overview: "Uses multiple ultrasonic sensors with a custom path-planning algorithm to navigate complex environments autonomously while avoiding obstacles.",
    tech: ["Arduino", "Ultrasonic Sensors", "C++", "Servo Motors"],
    challenges: ["Multi-sensor fusion", "Dynamic obstacle avoidance", "Battery optimization"],
    highlights: ["Obstacle avoidance", "Path planning", "Real-time sensor fusion", "Autonomous operation"],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/projects")} variant="outline" className="border-primary/30">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Mission Map
          </motion.button>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-cyan mb-4">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
          </motion.div>

          {/* Overview */}
          <GlassCard delay={0.1} className="p-6 md:p-8 mb-6">
            <h2 className="font-display font-semibold text-foreground text-lg mb-3">Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.overview}</p>
          </GlassCard>

          {/* Tech Stack */}
          <GlassCard delay={0.2} className="p-6 md:p-8 mb-6">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Challenges & Highlights side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GlassCard delay={0.3} className="p-6">
              <h2 className="font-display font-semibold text-foreground text-lg mb-4">Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                    {c}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard delay={0.4} className="p-6">
              <h2 className="font-display font-semibold text-foreground text-lg mb-4">Highlights</h2>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex gap-3"
          >
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <ExternalLink size={14} /> View Live
            </Button>
            <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
              Source Code
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
