import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseCountUpOptions {
  end: number; // 최종 숫자
  start?: number; // 시작 숫자 (기본: 0)
  duration?: number; // 애니메이션 시간 (기본: 2초)
  decimals?: number; // 소수점 자리수 (기본: 0)
  separator?: boolean; // 천단위 콤마 (기본: true)
  trigger?: boolean; // 스크롤 트리거 사용 여부 (기본: true)
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const config: any = {
        value: end,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (ref.current) {
            const value = counterRef.current.value;
            const formatted = separator
              ? value.toLocaleString('ko-KR', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                })
              : value.toFixed(decimals);
            ref.current.textContent = formatted;
          }
        },
      };

      if (trigger) {
        config.scrollTrigger = {
          trigger: ref.current,
          start: 'top 90%',
        };
      }

      gsap.to(counterRef.current, config);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [end, start, duration, decimals, separator, trigger]);

  return ref;
}
