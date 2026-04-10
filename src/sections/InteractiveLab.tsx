import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Cpu, Play } from "lucide-react";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";
import { Button } from "@/components/ui/button";

const labModules = [
  {
    title: "AI Chatbot Preview",
    icon: Bot,
    summary: "Simulated assistant card to prototype support workflows and response quality.",
    outcome: "Reduced repetitive support routing in early tests.",
  },
  {
    title: "Traffic System Simulation",
    icon: Cpu,
    summary: "Interactive traffic logic preview card with dynamic state transitions.",
    outcome: "Validated lane-priority logic before full implementation.",
  },
  {
    title: "UX Interaction Sandbox",
    icon: Play,
    summary: "Try-this interaction bank for button states, cards, and feedback loops.",
    outcome: "Improved clarity and reduced bounce on exploratory flows.",
  },
];

const InteractiveLab = () => {
  const [active, setActive] = useState("AI Chatbot Preview");

  return (
    <section className="relative px-4 py-20 md:py-28" id="interactive-lab">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Interactive Lab"
          title="Hands-on modules that feel testable, not static"
          subtitle="Each card previews a mini mission with subtle controls, responsive feedback, and a clean playground vibe."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {labModules.map((module, index) => {
            const selected = active === module.title;
            return (
              <motion.div key={module.title} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <GlassPanel className="h-full p-5">
                  <module.icon size={18} className="text-primary" />
                  <h3 className="mt-3 text-lg font-display font-semibold text-foreground">{module.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{module.summary}</p>
                  <p className="mt-4 rounded-lg border border-white/10 bg-secondary/50 p-3 text-xs text-muted-foreground">
                    <span className="font-mono text-primary/90">Outcome:</span> {module.outcome}
                  </p>
                  <Button
                    variant={selected ? "default" : "outline"}
                    className="mt-4 w-full border-primary/35"
                    onClick={() => setActive(module.title)}
                  >
                    Try this
                  </Button>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        <GlassPanel className="mt-5 p-4 md:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Active test module</p>
          <p className="mt-2 text-sm text-foreground md:text-base">{active}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <p className="text-xs text-muted-foreground">Prototype state synced with current interaction.</p>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default InteractiveLab;
