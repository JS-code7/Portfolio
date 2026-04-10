import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDownRight, Cpu, Radio, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassPanel from "@/components/mission/GlassPanel";

const bootLines = [
  "System Booting...",
  "Authenticating mission profile...",
  "Loading modules: security, robotics, ai, web...",
  "Command center online.",
];

const MissionControlHero = () => {
  return (
    <section className="relative flex min-h-screen items-center px-4 pt-24" id="home">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary"
            >
              <Radio size={12} /> Mission Control
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl font-display font-bold leading-tight text-foreground md:text-6xl"
            >
              Building secure systems, intelligent products, and stories that ship.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              A premium portfolio experience that tracks missions from first prototype to production-grade outcomes.
              Explore active modules, story chapters, experiments, and evolution milestones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="group">
                <a href="#projects">
                  Enter Active Modules <ArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/35 hover:bg-primary/10">
                <Link to="/projects">Open Full Mission Archive</Link>
              </Button>
            </motion.div>
          </div>

          <GlassPanel className="p-5 md:p-6 scanline">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/90">Boot Console</h2>
              <span className="rounded-full border border-primary/35 px-2 py-0.5 font-mono text-[10px] text-primary">Online</span>
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-black/25 p-4 font-mono text-xs text-muted-foreground">
              {bootLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.12 }}
                  className="flex gap-2"
                >
                  <span className="text-primary">&gt;</span> {line}
                </motion.p>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: "Security Ops", value: "Stable" },
                { icon: Cpu, label: "Build Engine", value: "Ready" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-secondary/55 p-3">
                  <item.icon size={14} className="text-primary" />
                  <p className="mt-2 text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-mono text-[11px] text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default MissionControlHero;
