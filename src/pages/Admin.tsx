import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedVectorBackground from "@/components/AnimatedVectorBackground";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

type AdminResponse = {
  success: boolean;
  stats: { totalLogs: number; totalMessages: number };
  messages: Array<{ _id: string; name: string; email: string; message: string; createdAt: string }>;
  logs: Array<{ _id: string; type: string; action: string; createdAt: string }>;
  analytics: Array<{ _id: string; page: string; visits: number; lastVisited: string }>;
  message?: string;
};

const fetchAdminSummary = async (): Promise<AdminResponse> => {
  const response = await fetch(`${API_BASE}/api/admin/summary`);
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Failed to load admin data.");
  }
  return payload;
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: fetchAdminSummary,
    enabled: authenticated,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const sortedLogs = useMemo(() => {
    const items = data?.logs || [];
    return [...items].sort((a, b) =>
      sortNewest
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [data?.logs, sortNewest]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass glow-border rounded-2xl p-8 max-w-sm w-full">
          <h1 className="font-display font-bold text-xl text-foreground mb-2">Admin Access</h1>
          <p className="text-xs text-muted-foreground mb-6">Enter admin password</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASS) setAuthenticated(true);
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
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <ParticleBackground />
      <AnimatedVectorBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
            <Button variant="outline" onClick={() => refetch()}>Refresh</Button>
          </div>

          {isLoading && <p className="text-sm text-muted-foreground">Loading admin data...</p>}
          {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}

          {data && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Total Logs</p>
                  <p className="text-3xl font-display font-bold text-foreground">{data.stats.totalLogs}</p>
                </div>
                <div className="glass rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                  <p className="text-3xl font-display font-bold text-foreground">{data.stats.totalMessages}</p>
                </div>
              </div>

              <section className="glass rounded-xl p-5">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">Messages</h2>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Message</th>
                        <th className="py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.messages.map((m) => (
                        <tr key={m._id} className="border-t border-border/50 align-top">
                          <td className="py-2">{m.name}</td>
                          <td className="py-2">{m.email}</td>
                          <td className="py-2 max-w-[320px] truncate">{m.message}</td>
                          <td className="py-2">{new Date(m.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-display font-semibold text-foreground">Logs</h2>
                  <Button size="sm" variant="outline" onClick={() => setSortNewest((v) => !v)}>
                    Sort: {sortNewest ? "Newest" : "Oldest"}
                  </Button>
                </div>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">Type</th>
                        <th className="py-2">Action</th>
                        <th className="py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLogs.map((l) => (
                        <tr key={l._id} className="border-t border-border/50">
                          <td className="py-2">{l.type}</td>
                          <td className="py-2">{l.action}</td>
                          <td className="py-2">{new Date(l.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="glass rounded-xl p-5">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">Analytics</h2>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">Page</th>
                        <th className="py-2">Visits</th>
                        <th className="py-2">Last Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.analytics.map((a) => (
                        <tr key={a._id} className="border-t border-border/50">
                          <td className="py-2">{a.page}</td>
                          <td className="py-2">{a.visits}</td>
                          <td className="py-2">{new Date(a.lastVisited).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Admin;
