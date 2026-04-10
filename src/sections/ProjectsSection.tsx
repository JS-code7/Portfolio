import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { Button } from "@/components/ui/button";
import { api, type Project } from "@/lib/api";
import { getMostActiveTech, rankFeaturedProjects } from "@/lib/intelligence";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError("Unable to load projects right now."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))], [projects]);
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );
  const featured = useMemo(() => rankFeaturedProjects(projects), [projects]);
  const activeTech = useMemo(() => getMostActiveTech(projects), [projects]);

  return (
    <section id="projects" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Active Modules"
          title="Projects that behave like systems, not isolated demos"
          subtitle="Each module is framed with the problem, the approach, the result, and the impact. The filters keep the archive usable without flattening the design."
        />

        <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Visible modules", value: String(projects.length).padStart(2, "0") },
            { label: "Featured builds", value: String(featured.length).padStart(2, "0") },
            { label: "Active tech lanes", value: String(activeTech.length).padStart(2, "0") },
            { label: "Filter mode", value: filter },
          ].map((stat) => (
            <GlassPanel key={stat.label} className="p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">{stat.label}</div>
              <div className="mt-2 text-xl font-display font-semibold text-foreground">{stat.value}</div>
            </GlassPanel>
          ))}
        </div>

        <ScrollReveal className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {featured.map((project) => (
              <span key={project.id} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary/80">
                Featured: {project.title}
              </span>
            ))}
            {activeTech.map((item) => (
              <span key={item.language} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                {item.language}: {item.count}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] transition-all duration-300 ${
                filter === cat
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          <GlassPanel className="p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </GlassPanel>
        ) : (
          <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <ProjectCard project={project} onInspect={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-white/8 bg-[hsl(var(--surface-glass)/0.82)] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-primary/80">
                    {selectedProject.category}
                  </span>
                  <h3 className="mt-2 text-lg font-display font-bold text-foreground md:text-2xl">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mb-6 text-sm text-muted-foreground">
                {selectedProject.description}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <DetailBlock label="Problem" value={selectedProject.highlights[0] ?? selectedProject.description} />
                <DetailBlock label="Approach" value={selectedProject.highlights[1] ?? selectedProject.tech.join(", ")} />
                <DetailBlock label="Outcome" value={selectedProject.highlights[2] ?? "Built a more complete and explainable build."} />
                <DetailBlock label="Impact" value={selectedProject.highlights[3] ?? "The project became easier to understand and extend."} />
              </div>

              <div className="mt-6">
                <h4 className="mb-2 text-[10px] font-mono uppercase tracking-[0.28em] text-primary/70">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm" className="border-primary/25 text-foreground hover:bg-primary/10 gap-2">
                  <a href={`/projects/${selectedProject.slug}`}>
                    View Case Study
                  </a>
                </Button>
                {selectedProject.html_url && (
                  <Button asChild size="sm" className="bg-primary text-background hover:bg-primary/90 gap-2">
                    <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer">
                      Open Repo
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const DetailBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
    <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">{label}</div>
    <p className="mt-1 text-sm leading-relaxed text-foreground/90">{value}</p>
  </div>
);

export default ProjectsSection;