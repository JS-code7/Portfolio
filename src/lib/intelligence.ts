import { linkedinProfile } from "@/data/linkedinProfile";
import type { Project } from "@/lib/api";

const categoryKeywords = {
  frontend: ["react", "javascript", "typescript", "html", "css", "web"],
  backend: ["node", "express", "api", "server", "database", "python"],
  ai: ["ai", "machine learning", "tensorflow", "opencv", "neural", "ml"],
  devops: ["cloud", "azure", "docker", "ci", "cd", "infrastructure"],
  security: ["security", "cybersecurity", "offensive", "defensive", "pentest"],
  robotics: ["arduino", "robotics", "sensor", "iot", "pid", "servo"],
};

export const rankFeaturedProjects = (projects: Project[]) => {
  return [...projects]
    .map((project) => ({
      project,
      score:
        (project.stargazers_count || 0) * 4 +
        (project.forks_count || 0) * 2 +
        (project.updatedDaysAgo ? Math.max(0, 30 - project.updatedDaysAgo) : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ project }) => project);
};

export const buildSkillCategories = () => {
  const categorized = Object.keys(categoryKeywords).reduce<Record<string, string[]>>((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});

  linkedinProfile.skills.forEach((skill) => {
    const lower = skill.toLowerCase();
    const category = Object.entries(categoryKeywords).find(([, words]) =>
      words.some((word) => lower.includes(word))
    )?.[0];
    if (category) categorized[category].push(skill);
  });

  return categorized;
};

export const getMostActiveTech = (projects: Project[]) => {
  const frequency: Record<string, number> = {};
  projects.forEach((project) => {
    if (!project.language) return;
    frequency[project.language] = (frequency[project.language] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([language, count]) => ({ language, count }));
};
