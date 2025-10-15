import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  separator?: boolean;
  trigger?: boolean;
}

export function useCountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  separator = true,
  trigger = true,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: start });
  const hasAnimated = useRef(false);

  useEffect(() => {
    // ✅ end가 0이거나 이미 애니메이션 실행했으면 스킵
    if (end === 0 || !ref.current || hasAnimated.current) return;

    gsap.registerPlugin(ScrollTrigger);

    counterRef.current.value = start;

    const formatValue = (value: number) => {
      return separator
        ? value.toLocaleString('ko-KR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : value.toFixed(decimals);
    };

    const config: gsap.TweenVars = {
      value: end,
      duration: duration,
      ease: 'power2.out',
      onStart: () => {
        hasAnimated.current = true;
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = formatValue(counterRef.current.value);
        }
      },
      onComplete: () => {
        if (ref.current) {
          ref.current.textContent = formatValue(end);
        }
      },
    };

    if (trigger) {
      config.scrollTrigger = {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      };
    }

    const animation = gsap.to(counterRef.current, config);

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [end, start, duration, decimals, separator, trigger]);

  return ref;
}
