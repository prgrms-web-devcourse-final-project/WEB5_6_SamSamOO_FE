import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseStaggerFadeOptions {
  stagger?: number; // 각 요소 사이의 간격 (초)
  duration?: number; // 각 애니메이션 지속 시간
  y?: number; // 시작 y 위치
  start?: string; // ScrollTrigger start
}

export function useStaggerFade({
  stagger = 0.2,
  duration = 0.8,
  y = 50,
  start = 'top 85%',
}: UseStaggerFadeOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      const children = containerRef.current.querySelectorAll('.stagger-item');

      gsap.from(children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          toggleActions: 'play none none reverse',
        },
        y: y,
        opacity: 0,
        duration: duration,
        stagger: stagger, // 순차적으로!
        ease: 'power3.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stagger, duration, y, start]);

  return containerRef;
}
