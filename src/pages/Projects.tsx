import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedVectorBackground from "@/components/AnimatedVectorBackground";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import SectionHeading from "@/components/SectionHeading";
import ProjectJourney from "@/components/ProjectJourney";
import Footer from "@/components/Footer";
import { api, type Project } from "@/lib/api";
import { Loader2, ArrowRight } from "lucide-react";
import { logEvent } from "@/lib/logger";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <ParticleBackground />
      <AnimatedVectorBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-4">
              Mission Map
            </h1>
            <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
              Navigate through my project journey
            </p>
          </ScrollReveal>

          {/* Mission Map */}
          <ScrollReveal className="mb-16">
            <ProjectJourney />
          </ScrollReveal>

          {/* Grid View */}
          <SectionHeading title="All Projects" subtitle="Browse by category" />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 px-4"
            >
              <div className="text-center max-w-md">
                <p className="text-3xl mb-2 text-muted-foreground">No missions found</p>
                <p className="text-sm text-muted-foreground/70 mb-6">
                  Try selecting a different category or{" "}
                  <motion.button
                    whileHover={{ textDecoration: "underline" }}
                    onClick={() => setFilter("All")}
                    className="text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    view all projects
                  </motion.button>
                </p>
              </div>
            </motion.div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <motion.div key={project.id} variants={staggerItemVariants}>
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={() => logEvent("project", "projects_page_click", { slug: project.slug, title: project.title })}
                  >
                    <GlassCard delay={0} className="p-6 cursor-pointer group h-full hover:bg-primary/5 transition-colors duration-300">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                        {project.category}
                      </span>
                      <h3 className="font-display font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={12} />
                      </span>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Projects;
