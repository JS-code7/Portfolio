import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  return null;
};

export default SmoothScroll;
