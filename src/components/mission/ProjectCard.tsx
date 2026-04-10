import { motion } from "framer-motion";
import type { Project } from "@/lib/api";
import GlassPanel from "@/components/mission/GlassPanel";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    whileHover={{ y: -6, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={() => onSelect(project)}
    className="w-full text-left focus-visible:outline-none"
  >
    <GlassPanel className="group h-full p-5 transition-all duration-300 hover:border-primary/45">
      <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/90">
        {project.category}
      </span>
      <h3 className="mt-4 text-lg font-display font-semibold text-foreground transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-secondary/60 px-2 py-1 font-mono text-[10px] text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    </GlassPanel>
  </motion.button>
);

export default ProjectCard;
