import { useState, useEffect } from "react";

export function useDebouncedWindowSize(debounceMs = 100) {
  const isClient = typeof window !== "undefined";

  const getSize = () => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(getSize());
      }, debounceMs);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs, isClient]);

  return windowSize;
}
