// Mock API service layer — simulates backend calls with realistic delays

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  status: "published" | "draft";
  category: string;
  image?: string;
  html_url?: string;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  updatedDaysAgo?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface Stats {
  totalVisitors: number;
  projects: number;
  certifications: number;
  experience: string;
}

// Mock data
const projectsData: Project[] = [
  {
    id: "1",
    slug: "ai-traffic-system",
    title: "AI-Based Smart Traffic Assistance System",
    description: "Intelligent traffic management system using AI to optimize traffic flow and reduce congestion in real-time. Leverages computer vision to detect vehicle density at intersections and dynamically adjusts signal timing.",
    tech: ["Python", "TensorFlow", "OpenCV", "IoT"],
    highlights: ["Real-time traffic analysis with 94% accuracy", "AI-powered congestion predictions", "Smart signal control reducing wait times by 35%", "IoT sensor integration for live data streams"],
    status: "published",
    category: "AI",
  },
  {
    id: "2",
    slug: "flappy-bird-unreal",
    title: "Flappy Bird Game (Unreal Engine)",
    description: "A fully recreated Flappy Bird game built with Unreal Engine featuring custom physics, particle effects, procedurally generated obstacles, and a responsive scoring system.",
    tech: ["Unreal Engine", "C++", "Blueprints"],
    highlights: ["Custom physics engine with tuned gravity curves", "Dynamic particle effects on collision & scoring", "Procedural obstacle generation for infinite gameplay", "High score tracking with persistent storage"],
    status: "published",
    category: "Game Dev",
  },
  {
    id: "3",
    slug: "upi-scam-detection",
    title: "UPI Scam Detection Tool",
    description: "Security tool designed to detect and prevent UPI-based scams using pattern recognition and anomaly detection. Analyzes transaction patterns to flag suspicious activity before money leaves accounts.",
    tech: ["Python", "Machine Learning", "Data Analysis", "Pandas"],
    highlights: ["Pattern recognition catching 89% of known scam types", "Real-time alerts via SMS and push notifications", "Anomaly detection using isolation forests", "Dashboard for transaction monitoring"],
    status: "published",
    category: "Security",
  },
  {
    id: "4",
    slug: "line-follower-robot",
    title: "Line Follower Robot",
    description: "Autonomous robot that follows a predefined path using infrared sensors and PID control algorithms. Handles sharp turns, intersections, and variable surface conditions.",
    tech: ["Arduino", "C++", "IR Sensors", "PID Control"],
    highlights: ["PID control algorithm with auto-tuning", "Handles 90° turns at full speed", "Sensor calibration for multiple surface types", "Completed obstacle courses in under 45 seconds"],
    status: "published",
    category: "Robotics",
  },
  {
    id: "5",
    slug: "obstacle-assist-bot",
    title: "Obstacle Assist Bot",
    description: "Intelligent bot that navigates around obstacles using ultrasonic sensors and path planning algorithms. Features real-time environment mapping and adaptive route finding.",
    tech: ["Arduino", "Ultrasonic Sensors", "C++", "Servo Motors"],
    highlights: ["360° obstacle detection with servo-mounted sensor", "A* inspired path planning algorithm", "Real-time sensor fusion from 3 ultrasonic inputs", "Navigates complex mazes autonomously"],
    status: "published",
    category: "Robotics",
  },
];

const blogData: BlogPost[] = [
  {
    id: "1",
    slug: "intro-to-cybersecurity",
    title: "Introduction to Cybersecurity in 2025",
    excerpt: "A comprehensive guide to getting started with cybersecurity, covering essential tools and methodologies.",
    date: "2025-06-15",
    readTime: "8 min",
    tags: ["Cybersecurity", "Guide"],
  },
  {
    id: "2",
    slug: "building-robots-arduino",
    title: "Building Autonomous Robots with Arduino",
    excerpt: "Step-by-step tutorial on creating line-following and obstacle-avoiding robots using Arduino.",
    date: "2025-05-20",
    readTime: "12 min",
    tags: ["Robotics", "Arduino", "Tutorial"],
  },
  {
    id: "3",
    slug: "ai-azure-fundamentals",
    title: "AI Fundamentals on Microsoft Azure",
    excerpt: "Exploring Azure AI services and how to leverage them for real-world applications.",
    date: "2025-04-10",
    readTime: "6 min",
    tags: ["AI", "Azure", "Cloud"],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const GITHUB_USERNAME = "JS-code7";

const withGithubStats = (project: Project, repos: Array<Record<string, unknown>>): Project => {
  const matchingRepo = repos.find((repo) => {
    const name = String(repo.name || "").toLowerCase();
    const projectSlug = project.slug.toLowerCase();
    return name.includes(projectSlug.split("-")[0]) || project.title.toLowerCase().includes(name);
  });

  if (!matchingRepo) {
    return project;
  }

  const updatedAt = String(matchingRepo.updated_at || "");
  const updatedDaysAgo = updatedAt
    ? Math.max(0, Math.floor((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24)))
    : undefined;

  return {
    ...project,
    html_url: String(matchingRepo.html_url || ""),
    language: (matchingRepo.language as string | null) ?? null,
    stargazers_count: Number(matchingRepo.stargazers_count || 0),
    forks_count: Number(matchingRepo.forks_count || 0),
    updated_at: updatedAt,
    updatedDaysAgo,
  };
};

// API functions
export const api = {
  getProjects: async (): Promise<Project[]> => {
    await delay(600);
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      );
      if (!response.ok) return projectsData;
      const repos = await response.json();
      if (!Array.isArray(repos)) return projectsData;
      return projectsData.map((project) => withGithubStats(project, repos));
    } catch {
      return projectsData;
    }
  },

  getProjectBySlug: async (slug: string): Promise<Project | null> => {
    await delay(400);
    return projectsData.find((p) => p.slug === slug) || null;
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    await delay(500);
    return blogData;
  },

  submitContact: async (data: ContactSubmission): Promise<{ success: boolean; message: string }> => {
    await delay(300);
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      throw new Error("All fields are required");
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("Email service is not configured. Please set EmailJS environment variables.");
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: data.name.trim(),
          from_email: data.email.trim(),
          message: data.message.trim(),
          to_email: "SONIJEET660@GMAIL.COM",
          reply_to: data.email.trim(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message. Please try again.");
    }

    return { success: true, message: "Message sent successfully!" };
  },

  getStats: async (): Promise<Stats> => {
    await delay(300);
    return { totalVisitors: 2847, projects: 5, certifications: 5, experience: "1+" };
  },

  trackPageView: async (page: string): Promise<void> => {
    await delay(100);
    console.log(`[Analytics] Page view: ${page}`);
  },
};
