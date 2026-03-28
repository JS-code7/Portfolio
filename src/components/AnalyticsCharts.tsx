import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";

const visitorData = [
  { name: "Mon", visitors: 120 },
  { name: "Tue", visitors: 185 },
  { name: "Wed", visitors: 210 },
  { name: "Thu", visitors: 160 },
  { name: "Fri", visitors: 290 },
  { name: "Sat", visitors: 340 },
  { name: "Sun", visitors: 270 },
];

const projectEngagement = [
  { name: "Traffic AI", views: 420 },
  { name: "Flappy Bird", views: 310 },
  { name: "UPI Scam", views: 280 },
  { name: "Line Bot", views: 190 },
  { name: "Obstacle Bot", views: 240 },
];

const trafficSources = [
  { name: "Direct", value: 40 },
  { name: "GitHub", value: 25 },
  { name: "LinkedIn", value: 20 },
  { name: "Search", value: 15 },
];

const COLORS = [
  "hsl(187, 100%, 50%)",
  "hsl(217, 91%, 60%)",
  "hsl(270, 80%, 60%)",
  "hsl(150, 80%, 50%)",
];

const stats = [
  { icon: Users, label: "Total Visitors", value: 2847 },
  { icon: Eye, label: "Page Views", value: 8934 },
  { icon: MousePointer, label: "Interactions", value: 1256 },
  { icon: TrendingUp, label: "Growth", value: 24, suffix: "%" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs border border-border/50">
      <p className="text-foreground font-display font-semibold">{label}</p>
      <p className="text-primary font-mono">{payload[0].value}</p>
    </div>
  );
};

const AnalyticsCharts = () => (
  <div className="space-y-8">
    {/* Stats row */}
    <ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard delay={0} className="p-4 text-center">
              <stat.icon size={18} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix || ""} />
              </div>
              <p className="text-[10px] text-muted-foreground font-mono mt-1">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>

    {/* Visitor chart */}
    <ScrollReveal delay={0.1}>
      <GlassCard tilt={false} className="p-6">
        <h3 className="font-display font-semibold text-foreground text-sm mb-4">Visitor Trends</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={visitorData}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="hsl(215, 20%, 35%)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(215, 20%, 35%)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="visitors" stroke="hsl(187, 100%, 50%)" fill="url(#colorVisitors)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </ScrollReveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Project engagement */}
      <ScrollReveal delay={0.2}>
        <GlassCard tilt={false} className="p-6">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Project Engagement</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectEngagement}>
              <XAxis dataKey="name" stroke="hsl(215, 20%, 35%)" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 20%, 35%)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="views" fill="hsl(187, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </ScrollReveal>

      {/* Traffic sources */}
      <ScrollReveal delay={0.3}>
        <GlassCard tilt={false} className="p-6">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Traffic Sources</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficSources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {trafficSources.map((source, i) => (
              <span key={source.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {source.name} ({source.value}%)
              </span>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  </div>
);

export default AnalyticsCharts;
