import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { Button } from "@/components/ui/button";
import { api, type Project } from "@/lib/api";
import { rankFeaturedProjects, getMostActiveTech } from "@/lib/intelligence";
import { logEvent } from "@/lib/logger";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {
        setError("Unable to load projects right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const featured = rankFeaturedProjects(projects);
  const activeTech = getMostActiveTech(projects);

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Projects" subtitle="A selection of things I've built" />

        {!loading && featured.length > 0 && (
          <ScrollReveal className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {featured.map((project) => (
                <span
                  key={project.id}
                  className="text-[10px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                >
                  Featured: {project.title}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {!loading && activeTech.length > 0 && (
          <ScrollReveal className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {activeTech.map((item) => (
                <span
                  key={item.language}
                  className="text-[10px] font-mono px-3 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border/60"
                >
                  {item.language}: {item.count}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Category filters */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
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
          <GlassCard tilt={false} className="p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </GlassCard>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <p className="text-lg text-muted-foreground mb-3">No projects in this category</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setFilter("All")}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              View all projects →
            </motion.button>
          </motion.div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <GlassCard delay={0} className="p-6 cursor-pointer group h-full">
                    <div onClick={() => {
                      logEvent("project", "project_card_open", { slug: project.slug, title: project.title });
                      setSelectedProject(project);
                    }} className="h-full flex flex-col">
                      {/* Category badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 self-start mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {project.description}
                      </p>
                       <div className="flex flex-wrap gap-1.5 mb-3">
                         {project.tech.map((t) => (
                           <span
                             key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                          >
                            {t}
                           </span>
                         ))}
                       </div>
                       <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
                         {project.language && <span>{project.language}</span>}
                         {typeof project.stargazers_count === "number" && <span>★ {project.stargazers_count}</span>}
                         {typeof project.forks_count === "number" && <span>⑂ {project.forks_count}</span>}
                       </div>
                     </div>
                   </GlassCard>
                 </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        )}
      </div>

      {/* Modal */}
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
              className="glass-strong glow-border rounded-2xl p-6 md:p-8 max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 hover:rotate-90 duration-300"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Highlights</h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                 <Button
                   asChild
                   variant="outline"
                   size="sm"
                   className="border-primary/30 text-foreground hover:bg-primary/10 gap-2 w-full group"
                 >
                   <Link to={`/projects/${selectedProject.slug}`}>
                     <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" /> View Project
                   </Link>
                 </Button>
                 {selectedProject.html_url && (
                   <Button
                     asChild
                     size="sm"
                     className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full"
                   >
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

export default ProjectsSection;
