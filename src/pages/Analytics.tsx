import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import GitHubActivity from "@/components/GitHubActivity";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";

const Analytics = () => (
  <PageTransition>
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-4">
            Analytics & Activity
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Portfolio engagement metrics and GitHub activity
          </p>
        </ScrollReveal>

        <SectionHeading title="Portfolio Metrics" subtitle="Real-time engagement data" />
        <AnalyticsCharts />

        <div className="mt-16">
          <SectionHeading title="GitHub Activity" subtitle="Open source contributions and repositories" />
          <GitHubActivity />
        </div>
      </div>
    </div>
    <Footer />
  </PageTransition>
);

export default Analytics;
