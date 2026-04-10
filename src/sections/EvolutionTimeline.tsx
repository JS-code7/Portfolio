import { motion } from "framer-motion";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";

const stages = [
  {
    phase: "Beginner",
    focus: "Learning fundamentals across coding, hardware, and debugging.",
    lesson: "Consistency beats intensity when building technical depth.",
  },
  {
    phase: "Intermediate",
    focus: "Shipping complete mini-systems with measurable outcomes.",
    lesson: "Architecture decisions matter more than quick hacks.",
  },
  {
    phase: "Builder",
    focus: "Combining AI, security, robotics, and frontend into cohesive products.",
    lesson: "Cross-domain thinking creates stronger products.",
  },
  {
    phase: "Innovator",
    focus: "Designing polished, story-driven experiences with reliability in mind.",
    lesson: "Craft plus clarity turns code into brand-level impact.",
  },
];

const EvolutionTimeline = () => (
  <section className="relative px-4 py-20 md:py-28" id="evolution-timeline">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Evolution Timeline"
        title="How the engineering journey evolved"
        subtitle="From fundamentals to innovation, each stage reflects stronger systems and sharper product judgment."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/55 via-primary/15 to-transparent md:block" />
        <div className="space-y-5">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.phase}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="relative md:pl-12"
            >
              <span className="absolute left-[9px] top-6 hidden h-3 w-3 rounded-full border border-primary/55 bg-primary/55 shadow-[0_0_16px_-3px_hsl(187_100%_50%/0.8)] md:block" />
              <GlassPanel className="p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/85">{stage.phase}</p>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">{stage.focus}</p>
                <p className="mt-3 rounded-xl border border-white/10 bg-secondary/55 p-3 text-xs text-muted-foreground md:text-sm">
                  <span className="font-mono text-primary/90">What I learned:</span> {stage.lesson}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EvolutionTimeline;
