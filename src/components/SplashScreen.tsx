import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  boxShadow: "0 0 30px hsl(187 100% 50% / 0.2)",
                }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              {/* Initials */}
              <span className="text-4xl font-display font-bold text-gradient-cyan glow-text">
                JS
              </span>
            </div>
          </motion.div>

          {/* Circuit lines */}
          <motion.div
            className="flex gap-1 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-px bg-primary/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-glow-cyan to-glow-blue rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.p
            className="mt-4 text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
