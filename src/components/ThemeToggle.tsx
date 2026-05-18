import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/25 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isLight ? <Moon size={14} className="text-primary" /> : <Sun size={14} className="text-primary" />}
      {isLight ? "Dark" : "Light"}
    </motion.button>
  );
};

export default ThemeToggle;
