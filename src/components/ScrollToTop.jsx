import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
      });
    };

    scrollToTop();
  }, [pathname]);

  return children;
}

export default ScrollToTop;
