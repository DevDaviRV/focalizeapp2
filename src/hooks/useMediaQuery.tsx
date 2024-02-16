import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const mediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const onChange = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addListener(onChange);
    return () => mediaQueryList.removeListener(onChange);
  }, [mediaQueryList]);

  return matches;
};