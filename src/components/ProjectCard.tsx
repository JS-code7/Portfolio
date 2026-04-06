import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/GlassCard";
import { type Project } from "@/lib/api";

interface ProjectCardProps {
  project: Project;
  isLink?: boolean;
  onClick?: () => void;
  delay?: number;
}

const ProjectCard = ({
  project,
  isLink = true,
  onClick,
  delay = 0,
}: ProjectCardProps) => {
  const content = (
    <GlassCard delay={delay} className="p-6 cursor-pointer group h-full hover:bg-primary/5 transition-colors duration-300">
      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
        {project.category}
      </span>
      <h3 className="font-display font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      {isLink ? (
        <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details <ArrowRight size={12} />
        </span>
      ) : (
        <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
          {project.language && <span>{project.language}</span>}
          {typeof project.stargazers_count === "number" && <span>★ {project.stargazers_count}</span>}
          {typeof project.forks_count === "number" && <span>⑂ {project.forks_count}</span>}
        </div>
      )}
    </GlassCard>
  );

  if (isLink) {
    return (
      <Link to={`/projects/${project.slug}`}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      {content}
    </div>
  );
};

export default ProjectCard;
