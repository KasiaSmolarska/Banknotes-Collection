import { useState, useEffect } from "react";

const breakPoints = { xs: "(max-width: 490px)", sm: "(max-width: 990px)", lg: "(min-width: 991px)" };

export const useMedia = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  useEffect(() => {
    const checkScreenRes = () => {
      Object.entries(breakPoints).map(([key, value]) => {
        if (window.matchMedia(value).matches) {
          setCurrentBreakpoint(key);
        }
      });
    };
    checkScreenRes();
    window.addEventListener("resize", checkScreenRes);
    return () => {
      window.removeEventListener("resize", checkScreenRes);
    };
  }, []);

  return currentBreakpoint;
};
