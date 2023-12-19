import { useCallback } from "react";

export function useScroll() {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return scrollTo;
}
