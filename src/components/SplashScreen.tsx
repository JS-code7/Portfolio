import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const lines = ["Initializing mission interface", "Loading story archive", "Syncing interactive modules", "Portfolio online"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(180deg,hsl(var(--background)),hsl(222_47%_3%))] px-4"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/8 bg-[hsl(var(--surface-glass)/0.74)] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-primary/70">System Booting</p>
                <h2 className="mt-2 text-2xl font-display font-semibold text-foreground">Mission control online</h2>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary/80">
                {progress}%
              </span>
            </div>

            <div className="space-y-3">
              {lines.map((line, index) => {
                const active = progress >= index * 25;
                return (
                  <div
                    key={line}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${active ? "border-primary/20 bg-primary/10" : "border-white/8 bg-white/4"}`}
                  >
                    <span className="text-sm text-foreground/90">{line}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                      {index === lines.length - 1 ? "Ready" : "Loading"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
              <span>Warming up interface</span>
              <span>Secure channel</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
