import { useState, useEffect } from "react";

const breakPoints = { xs: "(max-width: 490px)", sm: "(max-width: 990px)  and (min-width: 491px)", lg: "(min-width: 991px)" };

export const useMedia = (): string => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  useEffect(() => {
    const checkScreenRes = (): void => {
      Object.entries(breakPoints).map(([key, value]): boolean => {
        if (window.matchMedia(value).matches) {
          setCurrentBreakpoint(key);
        }
        return false;
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
