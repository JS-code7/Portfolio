import { motion } from "framer-motion";
import { Rocket, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const missions = [
  { slug: "smart-traffic", title: "AI-Based Smart Traffic Assistance System", status: "complete" },
  { slug: "flappy-bird", title: "Flappy Bird Game (Unreal Engine)", status: "complete" },
  { slug: "upi-scam", title: "UPI Scam Detection Tool", status: "complete" },
  { slug: "line-follower", title: "Line Follower Robot", status: "complete" },
  { slug: "obstacle-bot", title: "Obstacle Assist Bot", status: "active" },
];

const ProjectJourney = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-2xl mx-auto py-8">
      {/* Journey path */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-glow-cyan via-glow-blue to-transparent" />

      {/* Start node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="relative flex items-center gap-4 mb-8 pl-2"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10"
          style={{ boxShadow: "0 0 20px hsl(187 100% 50% / 0.5)" }}
        >
          <Rocket size={14} className="text-primary-foreground" />
        </div>
        <span className="font-mono text-xs text-primary uppercase tracking-wider">Mission Start</span>
      </motion.div>

      {missions.map((mission, i) => (
        <motion.div
          key={mission.slug}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative pl-14 mb-6 cursor-pointer group"
          onClick={() => navigate(`/projects/${mission.slug}`)}
        >
          {/* Node */}
          <div
            className="absolute left-[14px] top-3 w-5 h-5 rounded-full border-2 border-primary bg-background z-10 group-hover:bg-primary/20 transition-colors"
            style={{ boxShadow: "0 0 10px hsl(187 100% 50% / 0.3)" }}
          >
            {mission.status === "complete" && (
              <CheckCircle size={12} className="text-primary absolute -top-[2px] -left-[2px]" />
            )}
          </div>

          {/* Connector */}
          <div className="absolute left-[23px] top-8 w-px h-full bg-border" />

          <div className="glass glow-border rounded-lg p-4 group-hover:glow-border-hover transition-all">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-primary/60 uppercase">Mission {i + 1}</span>
                <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {mission.title}
                </h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                mission.status === "active"
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {mission.status === "active" ? "In Progress" : "Complete"}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectJourney;
