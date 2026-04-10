import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassPanel from "@/components/GlassPanel";
import type { Project } from "@/lib/api";

interface ProjectCardProps {
  project: Project;
  onInspect?: () => void;
}

const ProjectCard = ({ project, onInspect }: ProjectCardProps) => {
  const [problem, approach, outcome, impact] = project.highlights;

  return (
    <GlassPanel hover className="group h-full p-5 md:p-6">
      <motion.article
        className="flex h-full flex-col text-left"
        whileHover={{ y: -2 }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80">
              {project.category}
            </span>
            <h3 className="mt-3 text-lg font-display font-semibold text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Active
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 grid gap-3 text-sm">
          <NarrativeRow label="Problem" value={problem ?? project.description} />
          <NarrativeRow label="Approach" value={approach ?? project.tech.join(", ")} />
          <NarrativeRow label="Outcome" value={outcome ?? "Built something I could iterate on and explain clearly."} />
          <NarrativeRow label="Impact" value={impact ?? "Showed how the work connects across systems, not just features."} />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/8 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-primary" />
              Story-driven
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <GitBranch size={12} className="text-primary/80" />
              Modular
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-primary/90">
            Inspect <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {onInspect && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-primary/25 bg-transparent text-foreground hover:bg-primary/10 hover:text-foreground"
              onClick={onInspect}
            >
              Inspect Module
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="border-primary/25 bg-transparent text-foreground hover:bg-primary/10 hover:text-foreground">
            <Link to={`/projects/${project.slug}`}>View Case Study</Link>
          </Button>
          {project.html_url && (
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:bg-white/5 hover:text-primary">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                Open Repo
              </a>
            </Button>
          )}
        </div>
      </motion.article>
    </GlassPanel>
  );
};

interface NarrativeRowProps {
  label: string;
  value: string;
}

const NarrativeRow = ({ label, value }: NarrativeRowProps) => (
  <div className="rounded-2xl border border-white/8 bg-black/15 px-3 py-2.5">
    <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">{label}</div>
    <p className="mt-1 text-sm leading-relaxed text-foreground/90">{value}</p>
  </div>
);

export default ProjectCard;