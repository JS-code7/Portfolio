import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, CarFront, Command, Play, RefreshCw, Radar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const promptBank = [
  {
    prompt: "What is the strongest project entry point?",
    response: "Lead with the mission, then show the system behind it. The viewer should understand the problem before they see the stack.",
  },
  {
    prompt: "How do you balance design and engineering?",
    response: "I keep the interface disciplined so the engineering can stay visible. If the UI explains the system, the work feels trustworthy.",
  },
  {
    prompt: "What should I inspect first?",
    response: "Start with the story, then the active modules, then the brain map. That path reveals both the product and the thinking behind it.",
  },
];

const labActions = [
  { label: "Open archive", href: "/projects" },
  { label: "Inspect skills", href: "/skills-galaxy" },
  { label: "Visit timeline", href: "#timeline" },
  { label: "Send transmission", href: "#contact" },
];

const InteractiveLab = () => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [signalStep, setSignalStep] = useState(0);

  const signalState = ["Idle", "Caution", "Clear"];

  return (
    <section id="lab" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Interactive Lab"
          title="Try the portfolio, don’t just read it"
          subtitle="These cards act like mini demos. The goal is to make the page feel hands-on, with controlled interactions that still stay fast and clean."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollReveal>
            <GlassPanel hover className="h-full p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary/70">
                    <Bot size={12} /> AI chatbot preview
                  </div>
                  <h3 className="mt-3 text-xl font-display font-semibold text-foreground">Prompt-aware assistant card</h3>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary/80">
                  Live preview
                </span>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl border border-white/8 bg-black/15 p-4">
                <div className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-muted-foreground">
                  Ask the assistant about the portfolio.
                </div>
                <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm text-foreground">
                  {promptBank[promptIndex].prompt}
                </div>
                <div className="rounded-2xl border border-primary/15 bg-black/20 px-3 py-2 text-sm leading-relaxed text-foreground/90">
                  {promptBank[promptIndex].response}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="border-primary/25 bg-transparent text-foreground hover:bg-primary/10" onClick={() => setPromptIndex((value) => (value + 1) % promptBank.length)}>
                  Next prompt
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:bg-white/5 hover:text-primary" onClick={() => setPromptIndex(0)}>
                  Reset
                </Button>
              </div>
            </GlassPanel>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <GlassPanel hover className="h-full p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary/70">
                    <CarFront size={12} /> Traffic system simulation
                  </div>
                  <h3 className="mt-3 text-xl font-display font-semibold text-foreground">Signal control preview</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                  {signalState[signalStep]}
                </span>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-white/8 bg-black/15 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">Intersection A</span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] ${signalStep === 2 ? "bg-emerald-500/15 text-emerald-300" : signalStep === 1 ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>
                    {signalState[signalStep]}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {signalState.map((label, index) => (
                    <div key={label} className={`rounded-2xl border px-3 py-4 text-center transition-all ${signalStep === index ? "border-primary/35 bg-primary/10" : "border-white/8 bg-white/5"}`}>
                      <div className={`mx-auto h-4 w-4 rounded-full ${signalStep === index ? (index === 0 ? "bg-rose-400" : index === 1 ? "bg-amber-300" : "bg-emerald-300") : "bg-white/20"}`} />
                      <div className="mt-3 text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-foreground/90">
                  {signalStep === 0 && "Waiting for sensor input and queue pressure."}
                  {signalStep === 1 && "Traffic is being slowed and balanced across lanes."}
                  {signalStep === 2 && "Signals are clear and the road is flowing again."}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" className="gap-2 rounded-full bg-primary px-4 text-background hover:bg-primary/90" onClick={() => setSignalStep((step) => (step + 1) % 3)}>
                  <Play size={14} /> Run cycle
                </Button>
                <Button size="sm" variant="outline" className="rounded-full border-primary/25 bg-transparent text-foreground hover:bg-primary/10" onClick={() => setSignalStep(0)}>
                  <RefreshCw size={14} /> Reset
                </Button>
              </div>
            </GlassPanel>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <GlassPanel hover className="h-full p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary/70">
                    <Command size={12} /> Try this
                  </div>
                  <h3 className="mt-3 text-xl font-display font-semibold text-foreground">Command dock</h3>
                </div>
                <Radar size={16} className="text-primary/80" />
              </div>

              <div className="mt-5 space-y-3">
                {labActions.map((action) => (
                  <Button key={action.label} asChild variant="outline" className="w-full justify-between rounded-2xl border-white/10 bg-white/5 px-4 py-6 text-foreground hover:bg-primary/10">
                    <Link to={action.href}>
                      <span>{action.label}</span>
                      <Sparkles size={14} className="text-primary" />
                    </Link>
                  </Button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/15 p-4 text-sm leading-relaxed text-muted-foreground">
                The point of the lab is to make the portfolio feel interactive without adding heavy mechanics. The buttons still point to real content, and the preview states help the page feel alive.
              </div>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InteractiveLab;