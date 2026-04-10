import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";
import SkillNode from "@/components/SkillNode";

type NodeKind = "skill" | "project";

interface NodeItem {
  id: string;
  label: string;
  kind: NodeKind;
  summary: string;
  x: number;
  y: number;
  size: number;
  links: string[];
}

const nodes: NodeItem[] = [
  { id: "web", label: "Web Systems", kind: "skill", summary: "Structure, interactions, and interface discipline.", x: 16, y: 52, size: 18, links: ["systems", "traffic", "scam"] },
  { id: "ai", label: "AI Thinking", kind: "skill", summary: "Pattern recognition and decision support.", x: 30, y: 22, size: 20, links: ["traffic", "scam", "systems"] },
  { id: "robotics", label: "Robotics", kind: "skill", summary: "Sensors, control loops, and embedded problem solving.", x: 28, y: 76, size: 18, links: ["line", "bot", "systems"] },
  { id: "cloud", label: "Cloud", kind: "skill", summary: "Infrastructure and deployment readiness.", x: 56, y: 18, size: 18, links: ["systems", "scam"] },
  { id: "security", label: "Security", kind: "skill", summary: "Risk thinking, detection, and safe-by-design choices.", x: 57, y: 56, size: 18, links: ["scam", "systems"] },
  { id: "systems", label: "Systems Design", kind: "skill", summary: "The connective tissue behind every project.", x: 44, y: 42, size: 20, links: ["traffic", "scam", "line", "bot"] },
  { id: "traffic", label: "Traffic AI", kind: "project", summary: "The control problem that ties computer vision, AI, and operations together.", x: 74, y: 26, size: 16, links: ["ai", "web", "systems"] },
  { id: "scam", label: "UPI Scam Detection", kind: "project", summary: "Anomaly spotting with a security-first mindset.", x: 80, y: 52, size: 16, links: ["security", "ai", "cloud"] },
  { id: "line", label: "Line Follower", kind: "project", summary: "Control logic, calibration, and autonomous movement.", x: 70, y: 76, size: 16, links: ["robotics", "systems"] },
  { id: "bot", label: "Obstacle Bot", kind: "project", summary: "Path planning that keeps the machine moving with intent.", x: 88, y: 69, size: 16, links: ["robotics", "systems"] },
];

const linePairs = [
  ["web", "systems"], ["web", "traffic"], ["web", "scam"],
  ["ai", "traffic"], ["ai", "scam"], ["ai", "systems"],
  ["robotics", "line"], ["robotics", "bot"], ["robotics", "systems"],
  ["cloud", "systems"], ["cloud", "scam"],
  ["security", "scam"], ["security", "systems"],
  ["systems", "traffic"], ["systems", "scam"], ["systems", "line"], ["systems", "bot"],
];

const BrainMap = () => {
  const [activeNode, setActiveNode] = useState<string>("systems");

  const active = useMemo(() => nodes.find((node) => node.id === activeNode) ?? nodes[0], [activeNode]);
  const relatedIds = new Set([active.id, ...active.links]);

  return (
    <section id="brain-map" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Brain Map"
          title="Skills and projects as one connected system"
          subtitle="Hover a node to highlight the work it touches. The map keeps the layout readable while still feeling organic and futuristic."
        />

        <ScrollReveal>
          <GlassPanel className="p-4 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-stretch">
              <div className="relative min-h-[480px] overflow-hidden rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" onMouseLeave={() => setActiveNode("systems") }>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 640" fill="none" aria-hidden="true">
                  {linePairs.map(([fromId, toId]) => {
                    const from = nodes.find((node) => node.id === fromId);
                    const to = nodes.find((node) => node.id === toId);
                    if (!from || !to) return null;

                    const highlight = relatedIds.has(from.id) && relatedIds.has(to.id);
                    return (
                      <motion.line
                        key={`${fromId}-${toId}`}
                        x1={(from.x / 100) * 1000}
                        y1={(from.y / 100) * 640}
                        x2={(to.x / 100) * 1000}
                        y2={(to.y / 100) * 640}
                        stroke={highlight ? "rgba(34,211,238,0.48)" : "rgba(255,255,255,0.09)"}
                        strokeWidth={highlight ? 1.8 : 1}
                        strokeLinecap="round"
                        strokeDasharray={highlight ? "0" : "8 10"}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    );
                  })}
                </svg>

                {nodes.map((node) => (
                  <SkillNode
                    key={node.id}
                    label={node.label}
                    kind={node.kind}
                    x={node.x}
                    y={node.y}
                    active={activeNode === node.id}
                    related={relatedIds.has(node.id)}
                    onHover={() => setActiveNode(node.id)}
                  />
                ))}

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.24)_100%)]" />
              </div>

              <div className="flex flex-col gap-4">
                <GlassPanel className="p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-primary/70">Selected node</p>
                  <h3 className="mt-2 text-2xl font-display font-semibold text-foreground">{active.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-primary/70">Connected modules</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.links.map((id) => {
                      const relatedNode = nodes.find((node) => node.id === id);
                      if (!relatedNode) return null;
                      return (
                        <button
                          key={relatedNode.id}
                          type="button"
                          onClick={() => setActiveNode(relatedNode.id)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground transition-all hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"
                        >
                          {relatedNode.label}
                        </button>
                      );
                    })}
                  </div>
                </GlassPanel>

                <GlassPanel className="p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-primary/70">Signal</p>
                  <div className="mt-3 grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                      <span>Relation density</span>
                      <span className="text-primary/80">{active.links.length} links</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                      <span>Node type</span>
                      <span className="text-primary/80">{active.kind === "skill" ? "Capability" : "Project"}</span>
                    </div>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </GlassPanel>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BrainMap;