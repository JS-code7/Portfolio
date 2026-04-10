import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";

type BrainNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  group: "skill" | "project";
  links: string[];
};

const nodes: BrainNode[] = [
  { id: "security", label: "Security", x: 22, y: 30, group: "skill", links: ["upi", "chat"] },
  { id: "ai", label: "AI", x: 50, y: 18, group: "skill", links: ["traffic", "chat"] },
  { id: "robotics", label: "Robotics", x: 72, y: 34, group: "skill", links: ["traffic", "bot"] },
  { id: "web", label: "Web UX", x: 42, y: 62, group: "skill", links: ["chat", "timeline"] },
  { id: "traffic", label: "Traffic AI", x: 60, y: 50, group: "project", links: ["ai", "robotics"] },
  { id: "upi", label: "UPI Guard", x: 28, y: 55, group: "project", links: ["security"] },
  { id: "chat", label: "Chat Module", x: 48, y: 40, group: "project", links: ["security", "ai", "web"] },
  { id: "bot", label: "Assist Bot", x: 76, y: 58, group: "project", links: ["robotics"] },
  { id: "timeline", label: "Journey UX", x: 38, y: 78, group: "project", links: ["web"] },
];

const BrainMap = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const highlighted = useMemo(() => {
    if (!activeNode) {
      return new Set<string>();
    }

    const active = nodes.find((node) => node.id === activeNode);
    if (!active) {
      return new Set<string>();
    }

    return new Set([active.id, ...active.links]);
  }, [activeNode]);

  const isLineActive = (from: BrainNode, to: BrainNode) => {
    if (!activeNode) {
      return false;
    }

    return from.id === activeNode || to.id === activeNode;
  };

  return (
    <section className="relative px-4 py-20 md:py-28" id="brain-map">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Brain Map"
          title="A connected view of skills, projects, and thinking patterns"
          subtitle="Hover any node to spotlight related capabilities and the missions they power."
        />

        <GlassPanel className="p-5 md:p-7">
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-white/10 bg-black/20 md:h-[520px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {nodes.flatMap((from) =>
                from.links.map((linkId) => {
                  const to = nodes.find((node) => node.id === linkId);
                  if (!to) return null;

                  return (
                    <line
                      key={`${from.id}-${to.id}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isLineActive(from, to) ? "hsl(var(--primary) / 0.7)" : "hsl(var(--primary) / 0.22)"}
                      strokeWidth={isLineActive(from, to) ? 0.35 : 0.22}
                    />
                  );
                }),
              )}
            </svg>

            {nodes.map((node) => {
              const isActive = activeNode === node.id;
              const isRelated = highlighted.has(node.id);

              return (
                <motion.button
                  type="button"
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onFocus={() => setActiveNode(node.id)}
                  onBlur={() => setActiveNode(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    borderColor: isActive || isRelated ? "hsl(var(--primary) / 0.66)" : "hsl(var(--border))",
                    background: isActive || isRelated ? "hsl(var(--primary) / 0.18)" : "hsl(var(--secondary) / 0.66)",
                    color: isActive || isRelated ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    boxShadow: isActive ? "0 0 24px -7px hsl(187 100% 50% / 0.55)" : "none",
                  }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                >
                  {node.label}
                </motion.button>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default BrainMap;
