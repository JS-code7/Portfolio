import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Boot", href: "/#boot" },
  { label: "Story", href: "/#story" },
  { label: "Lab", href: "/#lab" },
  { label: "Brain Map", href: "/#brain-map" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Contact", href: "/#contact" },
  { label: "Archive", href: "/projects", archive: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeHref = useMemo(() => {
    if (location.pathname !== "/") {
      return location.pathname;
    }

    return location.hash || "/#boot";
  }, [location.hash, location.pathname]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/8 bg-[hsl(var(--background)/0.75)] backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="group">
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-sm font-display font-semibold tracking-[0.28em] text-foreground"
          >
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-primary">JS</span>
            <span className="hidden sm:inline">MISSION DECK</span>
          </motion.span>
        </Link>

        <LayoutGroup id="navbar">
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`relative rounded-full px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.22em] transition-all duration-300 ${
                  activeHref === item.href
                    ? "border border-primary/20 bg-primary/10 text-primary shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                    : "border border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
                {activeHref === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </LayoutGroup>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/8 bg-[hsl(var(--background)/0.92)] md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm transition-all ${
                      activeHref === item.href
                        ? "border border-primary/20 bg-primary/10 text-primary"
                        : "border border-white/8 bg-white/5 text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
