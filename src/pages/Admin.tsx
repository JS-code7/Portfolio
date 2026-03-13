import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, FileText, BarChart3, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const mockProjects = [
  { id: 1, title: "AI-Based Smart Traffic Assistance System", status: "published" },
  { id: 2, title: "Flappy Bird Game (Unreal Engine)", status: "published" },
  { id: 3, title: "UPI Scam Detection Tool", status: "draft" },
];

const mockStats = [
  { label: "Total Visitors", value: "2,847" },
  { label: "Projects", value: "5" },
  { label: "Blog Posts", value: "3" },
  { label: "Messages", value: "12" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass glow-border rounded-2xl p-8 max-w-sm w-full"
        >
          <h1 className="font-display font-bold text-xl text-foreground mb-2">Admin Access</h1>
          <p className="text-xs text-muted-foreground mb-6">Enter password to continue</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === "admin") setAuthenticated(true);
            }}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary/50 border-border mb-4"
            />
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              Login
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-4 text-center">Demo: use "admin"</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen glass-strong border-r border-border p-4 hidden md:block">
          <h1 className="font-display font-bold text-gradient-cyan text-lg mb-8 px-3">JS Admin</h1>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          {/* Mobile tabs */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                  activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">Dashboard</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {mockStats.map((stat) => (
                  <div key={stat.label} className="glass glow-border rounded-xl p-4">
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-foreground">Projects</h2>
                <Button size="sm" className="bg-primary text-primary-foreground gap-2">
                  <Plus size={14} /> Add Project
                </Button>
              </div>
              <div className="space-y-3">
                {mockProjects.map((project) => (
                  <div key={project.id} className="glass rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-display text-foreground">{project.title}</h3>
                      <span className={`text-[10px] font-mono ${project.status === "published" ? "text-primary" : "text-muted-foreground"}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-muted-foreground hover:text-primary transition-colors"><Edit size={14} /></button>
                      <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "blog" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-foreground">Blog Posts</h2>
                <Button size="sm" className="bg-primary text-primary-foreground gap-2">
                  <Plus size={14} /> New Post
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Blog management coming soon.</p>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">Analytics</h2>
              <div className="glass rounded-xl p-8 text-center">
                <BarChart3 size={48} className="text-primary/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Analytics dashboard coming soon.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
