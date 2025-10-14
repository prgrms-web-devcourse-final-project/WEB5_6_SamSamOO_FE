import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  onIntersect: () => void,
  enabled: boolean,
  rootMargin: string = '200px',
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      },
    );

    const node = ref.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin]);

  return ref;
}
