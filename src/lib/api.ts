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
    description: "Intelligent traffic management system using AI to optimize traffic flow and reduce congestion in real-time.",
    tech: ["Python", "TensorFlow", "OpenCV", "IoT"],
    highlights: ["Real-time traffic analysis", "AI-powered predictions", "Smart signal control"],
    status: "published",
    category: "AI",
  },
  {
    id: "2",
    slug: "flappy-bird-unreal",
    title: "Flappy Bird Game (Unreal Engine)",
    description: "A fully recreated Flappy Bird game built with Unreal Engine featuring custom physics and visual effects.",
    tech: ["Unreal Engine", "C++", "Blueprints"],
    highlights: ["Custom physics engine", "Particle effects", "Score tracking system"],
    status: "published",
    category: "Game Dev",
  },
  {
    id: "3",
    slug: "upi-scam-detection",
    title: "UPI Scam Detection Tool",
    description: "Security tool designed to detect and prevent UPI-based scams using pattern recognition and anomaly detection.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    highlights: ["Pattern recognition", "Real-time alerts", "Fraud prevention"],
    status: "published",
    category: "Security",
  },
  {
    id: "4",
    slug: "line-follower-robot",
    title: "Line Follower Robot",
    description: "Autonomous robot that follows a predefined path using infrared sensors and PID control algorithms.",
    tech: ["Arduino", "C++", "IR Sensors", "PID Control"],
    highlights: ["PID control algorithm", "Sensor calibration", "Autonomous navigation"],
    status: "published",
    category: "Robotics",
  },
  {
    id: "5",
    slug: "obstacle-assist-bot",
    title: "Obstacle Assist Bot",
    description: "Intelligent bot that navigates around obstacles using ultrasonic sensors and path planning algorithms.",
    tech: ["Arduino", "Ultrasonic Sensors", "C++"],
    highlights: ["Obstacle avoidance", "Path planning", "Real-time sensor fusion"],
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

// API functions
export const api = {
  getProjects: async (): Promise<Project[]> => {
    await delay(600);
    return projectsData;
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
    await delay(1200);
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      throw new Error("All fields are required");
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
