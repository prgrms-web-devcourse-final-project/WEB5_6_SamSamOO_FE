'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const AnimateFeature = dynamic(() => import('./AnimateFeature'), {
  ssr: false, // 클라이언트에서만
});

export default function FeaturesLazy() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true); // 이 시점에 AnimateFeature import + 렌더
          observer.disconnect(); // 한 번만
        }
      },
      {
        rootMargin: '300px', // 화면에 다 도달하기 전에 미리 로딩
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      {/* 이 div가 화면 근처로 오면 비로소 AnimateFeature 로딩 */}
      <div ref={sentinelRef} />

      {visible && <AnimateFeature />}
    </section>
  );
}
