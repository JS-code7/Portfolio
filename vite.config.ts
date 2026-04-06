import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("three")) return "three";
            if (id.includes("recharts")) return "charts";
            if (id.includes("@radix-ui")) return "ui";
            return "vendor";
          }
        },
      },
    },
  },
}));
