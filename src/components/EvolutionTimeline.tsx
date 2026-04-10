import { Brain, Compass, Rocket, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";

const stages = [
  {
    title: "Beginner",
    icon: Compass,
    period: "First experiments",
    summary: "I was learning how to make ideas real, not just interesting.",
    focus: "Small builds, basic tooling, and enough discipline to finish something visible.",
    learned: "Momentum matters. Finishing tiny things creates confidence and taste.",
    improved: "Earlier attempts were functional but not yet coherent or well narrated.",
  },
  {
    title: "Intermediate",
    icon: Brain,
    period: "Connecting systems",
    summary: "I started combining software, electronics, and problem framing into one workflow.",
    focus: "Robotics, web interfaces, and practical experimentation with feedback loops.",
    learned: "The work becomes stronger when each part understands its role in the whole.",
    improved: "I had to trim noise and build around maintainability instead of just features.",
  },
  {
    title: "Builder",
    icon: Rocket,
    period: "Shipping clearer work",
    summary: "The portfolio began to look like a product with a point of view.",
    focus: "Reusable components, tighter layouts, and clear case-study thinking.",
    learned: "Design and engineering are not separate tracks; they reinforce each other.",
    improved: "I kept pushing to remove anything that made the story harder to follow.",
  },
  {
    title: "Innovator",
    icon: Sparkles,
    period: "Current direction",
    summary: "I’m building for clarity, polish, and a distinct identity.",
    focus: "Narrative interfaces, interactive demos, and production-minded motion.",
    learned: "A good portfolio should feel like a product someone can explore, not a poster someone glances at.",
    improved: "I still look for ways to simplify the interface while keeping the atmosphere intact.",
  },
];

const EvolutionTimeline = () => {
  return (
    <section id="timeline" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Evolution Timeline"
          title="A career arc with visible progression"
          subtitle="The timeline turns the journey into stages so the growth feels intentional and easy to scan."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:block" />
          <div className="space-y-6 md:space-y-8">
            {stages.map((stage, index) => (
              <ScrollReveal key={stage.title} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.08}>
                <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-start md:pl-10">
                  <div className="absolute left-1.5 top-7 hidden h-3.5 w-3.5 rounded-full border border-primary/50 bg-background shadow-[0_0_22px_rgba(34,211,238,0.7)] md:block" />
                  <GlassPanel hover className="p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-primary/80">
                        {stage.period}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
                        <stage.icon size={12} className="text-primary" />
                        {stage.title}
                      </span>
                    </div>

                    <p className="mt-4 text-lg leading-relaxed text-foreground/90">{stage.summary}</p>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <TimelineBlock label="Focus" value={stage.focus} />
                      <TimelineBlock label="What I learned" value={stage.learned} />
                      <TimelineBlock label="What improved" value={stage.improved} />
                    </div>
                  </GlassPanel>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
    <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-primary/70">{label}</div>
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{value}</p>
  </div>
);

export default EvolutionTimeline;