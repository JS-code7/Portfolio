import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, PlayCircle, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassPanel from "@/components/GlassPanel";

const bootLines = [
  "Booting mission console",
  "Loading project archive",
  "Mapping skills network",
  "Syncing story layers",
  "Portfolio online",
];

const stats = [
  { label: "Projects", value: "05" },
  { label: "Certifications", value: "05" },
  { label: "Domains", value: "04" },
  { label: "Build mindset", value: "Always on" },
];

const modes = [
  { key: "mission", label: "Mission Control" },
  { key: "story", label: "Story Mode" },
] as const;

const MissionControlHero = () => {
  const [step, setStep] = useState(0);
  const [activeMode, setActiveMode] = useState<(typeof modes)[number]["key"]>("mission");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, bootLines.length - 1));
    }, 520);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="boot" className="relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-24 md:pt-28">
      <div className="container relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">
              System Booting
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
              Cinematic portfolio
            </span>
          </div>

          <div className="space-y-4">
            <p className="max-w-xl text-[10px] font-mono uppercase tracking-[0.34em] text-primary/70">
              Mission Control / Story Mode / Interactive Lab
            </p>
            <h1 className="max-w-4xl text-5xl font-display font-semibold leading-none tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              A premium portfolio built like a game interface, a story arc, and a live product.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              I design and build systems that read clearly, feel intentional, and show the reasoning behind the work. The interface below moves like a control deck while the content unfolds like a narrative.
            </p>
          </div>

          <GlassPanel className="max-w-2xl p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {modes.map((mode) => (
                  <button
                    key={mode.key}
                    type="button"
                    onClick={() => setActiveMode(mode.key)}
                    className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] transition-all duration-300 ${
                      activeMode === mode.key
                        ? "bg-primary text-background shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]"
                        : "border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary/70">
                <Sparkles size={12} /> Ready for inspection
              </span>
            </div>
          </GlassPanel>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <GlassPanel key={stat.label} className="p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">{stat.label}</div>
                <div className="mt-2 text-xl font-display font-semibold text-foreground">{stat.value}</div>
              </GlassPanel>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group gap-2 rounded-full bg-primary px-7 text-background hover:bg-primary/90">
              <Link to="/#story">
                Enter Story Mode <PlayCircle size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group gap-2 rounded-full border-primary/25 bg-transparent px-7 text-foreground hover:bg-primary/10">
              <Link to="/projects">
                Open Archive <BriefcaseBusiness size={16} className="transition-transform group-hover:-rotate-6" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="group gap-2 rounded-full px-7 text-muted-foreground hover:bg-white/5 hover:text-primary">
              <Link to="/#contact">
                Transmission Terminal <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <motion.div
            className="absolute -left-10 top-12 hidden h-px w-28 bg-gradient-to-r from-transparent via-primary/60 to-transparent lg:block"
            animate={{ opacity: [0.25, 0.9, 0.25], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <GlassPanel className="relative overflow-hidden p-5 md:p-6">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-primary/70">Boot log</p>
                <h2 className="mt-1 text-xl font-display font-semibold text-foreground">{activeMode === "mission" ? "Mission Console" : "Story Engine"}</h2>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary/80">
                Live
              </span>
            </div>

            <div className="space-y-4">
              {bootLines.map((line, index) => {
                const active = index <= step;
                return (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: active ? 1 : 0.28, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                      active ? "border-primary/20 bg-primary/10" : "border-white/8 bg-white/4"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-primary shadow-[0_0_18px_rgba(34,211,238,0.8)]" : "bg-white/20"}`} />
                      <div>
                        <div className="text-sm text-foreground">{line}</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                          {index === 0 ? "Startup" : index === 1 ? "Archive" : index === 2 ? "Map" : index === 3 ? "Narrative" : "Online"}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">
                      {String(20 + index * 20).padStart(2, "0")}%
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                <span>System status</span>
                <span>Interactive / responsive / production-ready</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-300 to-sky-400"
                  initial={{ width: "28%" }}
                  animate={{ width: `${28 + step * 18}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <GlassPanel className="p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">Current focus</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {activeMode === "mission"
                    ? "Systems that feel deliberate: clear hierarchy, useful motion, and interfaces that explain themselves."
                    : "A journey that reads from first experiments to a confident product narrative, with each chapter revealing why the work matters."}
                </p>
              </GlassPanel>
              <GlassPanel className="p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">Primary CTA</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  Explore the archive, inspect the lab, and move through the timeline as if you were stepping through a product demo.
                </p>
              </GlassPanel>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
              <span>Scroll to continue</span>
              <ArrowDown size={14} className="text-primary/80" />
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default MissionControlHero;