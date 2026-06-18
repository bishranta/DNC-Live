import { useEffect, useRef } from "react";

export function useRevealAnimation(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transition = `opacity 300ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 300ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
