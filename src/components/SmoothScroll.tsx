import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "@/lib/logger";

const SmoothScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const timeout = window.setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);

      return () => window.clearTimeout(timeout);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [hash, pathname]);

  useEffect(() => {
    logEvent("visit", "page_visit", { page: pathname, hash });
  }, [pathname, hash]);

  return null;
};

export default SmoothScroll;
