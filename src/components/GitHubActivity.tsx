import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Github, GitCommit, Star, GitFork, ExternalLink, Loader2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const GITHUB_USERNAME = "JS-code7";

const langColors: Record<string, string> = {
  Python: "hsl(var(--glow-blue))",
  JavaScript: "hsl(47 100% 50%)",
  TypeScript: "hsl(211 60% 48%)",
  "C++": "hsl(330 60% 50%)",
  HTML: "hsl(12 100% 60%)",
  CSS: "hsl(264 60% 60%)",
  Java: "hsl(20 80% 50%)",
};

// Generate a mock contribution heatmap
const generateHeatmap = () => {
  const weeks = 20;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      week.push(Math.random() > 0.4 ? Math.floor(Math.random() * 5) : 0);
    }
    data.push(week);
  }
  return data;
};

const getHeatColor = (val: number) => {
  if (val === 0) return "bg-secondary/50";
  if (val === 1) return "bg-primary/20";
  if (val === 2) return "bg-primary/40";
  if (val === 3) return "bg-primary/60";
  return "bg-primary/80";
};

const GitHubActivity = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [heatmap] = useState(generateHeatmap);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Contribution Heatmap */}
      <ScrollReveal>
        <GlassCard tilt={false} className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Github size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground text-sm">Contribution Activity</h3>
          </div>
          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {heatmap.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <motion.div
                    key={di}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (wi * 7 + di) * 0.003 }}
                    className={`w-3 h-3 rounded-sm ${getHeatColor(val)} hover:ring-1 hover:ring-primary/50 transition-all cursor-default`}
                    title={`${val} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground font-mono">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((v) => (
              <div key={v} className={`w-3 h-3 rounded-sm ${getHeatColor(v)}`} />
            ))}
            <span>More</span>
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Repos */}
      <ScrollReveal delay={0.1}>
        <div className="flex items-center gap-3 mb-4">
          <GitCommit size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-foreground text-sm">Recent Repositories</h3>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        ) : repos.length === 0 ? (
          <GlassCard tilt={false} className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Loading repositories from GitHub...</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="block"
              >
                <GlassCard delay={0} className="p-4 h-full group hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </h4>
                    <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: langColors[repo.language] || "hsl(var(--primary))" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
                  </div>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        )}
      </ScrollReveal>
    </div>
  );
};

export default GitHubActivity;
