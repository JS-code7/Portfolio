import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Brain, Cpu, Code, ChevronDown } from "lucide-react";

const skillTree = [
  {
    icon: Shield,
    name: "Security",
    color: "hsl(var(--glow-cyan))",
    skills: ["Network Security", "Penetration Testing", "Cryptography", "Incident Response"],
  },
  {
    icon: Brain,
    name: "AI",
    color: "hsl(var(--glow-blue))",
    skills: ["Machine Learning", "Neural Networks", "Computer Vision", "NLP"],
  },
  {
    icon: Cpu,
    name: "Robotics",
    color: "hsl(var(--glow-purple))",
    skills: ["Arduino", "PID Control", "Sensor Fusion", "Path Planning"],
  },
  {
    icon: Code,
    name: "Software",
    color: "hsl(var(--glow-cyan))",
    skills: ["React", "TypeScript", "Python", "C++"],
  },
];

const SkillTree = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {skillTree.map((branch, i) => (
        <motion.div
          key={branch.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass glow-border rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setExpanded(expanded === branch.name ? null : branch.name)}
        >
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <branch.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm">{branch.name}</h3>
                <p className="text-xs text-muted-foreground">{branch.skills.length} skills</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded === branch.name ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-muted-foreground" />
            </motion.div>
          </div>

          <AnimatePresence>
            {expanded === branch.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-2">
                  {branch.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: j * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-muted-foreground">{skill}</span>
                      <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-glow-cyan to-glow-blue rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${70 + Math.random() * 30}%` }}
                          transition={{ delay: j * 0.1, duration: 0.6 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillTree;
