import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { api, type Project } from "@/lib/api";
import { rankFeaturedProjects } from "@/lib/intelligence";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";
import ProjectCard from "@/components/mission/ProjectCard";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    let mounted = true;

    api
      .getProjects()
      .then((data) => {
        if (!mounted) return;
        setProjects(data.filter((project) => project.status !== "draft"));
      })
      .catch(() => {
        if (!mounted) return;
        setError("Active modules are currently offline. Please retry shortly.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))], [projects]);
  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  const featured = useMemo(() => rankFeaturedProjects(projects), [projects]);

  return (
    <section id="projects" className="relative px-4 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Active Modules"
          title="Mission-ready projects with clear engineering outcomes"
          subtitle="Every module is documented as a case narrative: problem, approach, outcome, and measurable impact."
        />

        {!loading && featured.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {featured.map((project) => (
              <span
                key={project.id}
                className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary/90"
              >
                Featured · {project.title}
              </span>
            ))}
          </div>
        )}

        <GlassPanel className="mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = filter === category;
              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`rounded-xl px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_-8px_hsl(187_100%_50%/0.85)]"
                      : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </GlassPanel>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : error ? (
          <GlassPanel className="p-5 text-center text-sm text-destructive">{error}</GlassPanel>
        ) : filteredProjects.length === 0 ? (
          <GlassPanel className="p-5 text-center text-sm text-muted-foreground">
            No modules found for this category yet.
          </GlassPanel>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onSelect={setActiveProject} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <GlassPanel className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">{activeProject.category}</p>
                    <h3 className="mt-1 text-xl font-display font-bold text-foreground">{activeProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="rounded-md border border-white/15 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-secondary/55 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Problem</p>
                    <p className="mt-1 text-muted-foreground">{activeProject.description}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-secondary/55 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Approach</p>
                    <p className="mt-1 text-muted-foreground">Built with {activeProject.tech.join(", ")} and iterative testing cycles.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-secondary/55 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Outcome</p>
                    <p className="mt-1 text-muted-foreground">{activeProject.highlights[0]}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-secondary/55 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Impact</p>
                    <p className="mt-1 text-muted-foreground">{activeProject.highlights[1] || activeProject.highlights[0]}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-muted-foreground md:grid-cols-2">
                  <p>
                    <span className="font-mono text-primary">What I learned:</span> Clear instrumentation and measurable feedback loops improve every release.
                  </p>
                  <p>
                    <span className="font-mono text-primary">What I’d improve:</span> Expand observability and stress-test edge cases earlier in the cycle.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild variant="outline" className="border-primary/35">
                    <Link to={`/projects/${activeProject.slug}`}>Open detailed case</Link>
                  </Button>
                  {activeProject.html_url && (
                    <Button asChild>
                      <a href={activeProject.html_url} target="_blank" rel="noopener noreferrer">
                        Open repository <ExternalLink size={13} />
                      </a>
                    </Button>
                  )}
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
