import { BookOpen, PenTool, Rocket, ShieldAlert, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";

const chapters = [
  {
    chapter: "Chapter 1",
    title: "The Beginning",
    icon: BookOpen,
    problem: "I started with curiosity but no polished system to show it.",
    approach: "I made small things finishable: simple prototypes, clear folders, and a habit of writing down what each build was trying to prove.",
    outcome: "The work began to read like a body of evidence instead of a pile of experiments.",
    impact: "That shift made it easier to explain the portfolio as a story rather than a list.",
    learned: "Clarity is part of the build, not something added later.",
    improve: "I would have documented the reasoning earlier so the narrative matured alongside the code.",
  },
  {
    chapter: "Chapter 2",
    title: "First Build",
    icon: PenTool,
    problem: "Early projects needed more than functionality; they needed shape and discipline.",
    approach: "I broke work into modules, used repeatable UI patterns, and kept the interface consistent enough to feel intentional.",
    outcome: "The pieces started to work together across robotics, web, and security projects.",
    impact: "The portfolio became a system of connected stories instead of isolated demos.",
    learned: "A strong structure reduces noise and makes the details feel premium.",
    improve: "I would refine the motion system even earlier to keep every page equally polished.",
  },
  {
    chapter: "Chapter 3",
    title: "Failures & Learning",
    icon: ShieldAlert,
    problem: "Not every build worked on the first pass. Some ideas were technically valid but unreadable or hard to maintain.",
    approach: "I started reviewing feedback through three lenses: what the user sees, what the code costs, and what the project teaches me.",
    outcome: "I cut clutter, improved naming, and focused on the parts that actually help a visitor trust the work.",
    impact: "Failure became a source of design discipline instead of just frustration.",
    learned: "Good taste is often the result of fixing what feels slightly off.",
    improve: "I would have challenged weak layout decisions sooner instead of letting them linger.",
  },
  {
    chapter: "Chapter 4",
    title: "Breakthrough",
    icon: Rocket,
    problem: "The portfolio still needed one strong idea to connect all the pieces.",
    approach: "I reframed it as a control deck: mission control for the projects, a story mode for the journey, and a lab for hands-on interaction.",
    outcome: "The interface gained a point of view and the content gained momentum.",
    impact: "Visitors can now understand the work quickly and then go deeper if they want to explore.",
    learned: "A clear concept can unify a lot of otherwise unrelated work.",
    improve: "I would prototype the narrative flow before choosing individual effects.",
  },
  {
    chapter: "Chapter 5",
    title: "Now",
    icon: Sparkles,
    problem: "The challenge today is balance: keep it elegant, fast, and memorable without turning it into noise.",
    approach: "I’m building systems that are modular, responsive, and easy to extend as the work evolves.",
    outcome: "The portfolio feels more like a product and less like a page.",
    impact: "That makes the engineering look thoughtful, not accidental.",
    learned: "Taste shows up in restraint as much as in animation or color.",
    improve: "I would keep trimming anything that doesn’t help the story or the signal.",
  },
];

const StoryChapterSection = () => {
  return (
    <section id="story" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Story Mode"
          title="Five chapters, one trajectory"
          subtitle="The portfolio reads like a narrative journey: each chapter explains the problem, the approach, the result, and the lesson that followed."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent md:block" />
          <div className="space-y-6 md:space-y-8">
            {chapters.map((chapter, index) => (
              <ScrollReveal key={chapter.title} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.08}>
                <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-start md:pl-10">
                  <div className="absolute left-1.5 top-6 hidden h-3 w-3 rounded-full border border-primary/50 bg-background shadow-[0_0_20px_rgba(34,211,238,0.65)] md:block" />
                  <GlassPanel className="p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-primary/80">
                        {chapter.chapter}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
                        <chapter.icon size={12} className="text-primary" />
                        {chapter.title}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <NarrativeBlock label="Problem" value={chapter.problem} />
                      <NarrativeBlock label="Approach" value={chapter.approach} />
                      <NarrativeBlock label="Outcome" value={chapter.outcome} />
                      <NarrativeBlock label="Impact" value={chapter.impact} />
                    </div>

                    <div className="mt-5 grid gap-3 rounded-2xl border border-white/8 bg-black/15 p-4 md:grid-cols-2">
                      <NarrativeBlock label="What I learned" value={chapter.learned} compact />
                      <NarrativeBlock label="What I’d improve" value={chapter.improve} compact />
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

interface NarrativeBlockProps {
  label: string;
  value: string;
  compact?: boolean;
}

const NarrativeBlock = ({ label, value, compact = false }: NarrativeBlockProps) => (
  <div className={compact ? "" : "rounded-2xl border border-white/8 bg-black/15 px-4 py-3"}>
    <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-primary/70">{label}</div>
    <p className={`mt-1 text-sm leading-relaxed text-foreground/90 ${compact ? "text-muted-foreground" : ""}`}>{value}</p>
  </div>
);

export default StoryChapterSection;