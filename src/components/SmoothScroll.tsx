import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "@/lib/logger";

const SmoothScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [hash, pathname]);

  useEffect(() => {
    logEvent("visit", "page_visit", { page: pathname, hash });
  }, [pathname, hash]);

  return null;
};

export default SmoothScroll;
