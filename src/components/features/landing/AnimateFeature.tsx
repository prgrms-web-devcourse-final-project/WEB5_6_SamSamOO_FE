'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import DataInfo from './DataInfo';
import FeatAdvice from './FeatAdvice';
import FeatChat from './FeatChat';
import FeatFilter from './FeatFilter';
import FeatHistory from './FeatHistory';
import FeatInline from './FeatInline';
import FeatSearch from './FeatSearch';
import FeatVote from './FeatVote';
import FeatChart from './FeatChart';

function AnimateFeature() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = containerRef.current?.querySelectorAll('.feature-section');

    if (sections) {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            // y: 200,
            opacity: 0,
            duration: 1,
          },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              scrub: 1,
            },
            // y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="lg:space-y-40">
      <DataInfo />

      <div className="feature-section">
        <FeatAdvice />
      </div>
      <div className="feature-section">
        <FeatChat />
      </div>
      <div className="feature-section">
        <FeatHistory />
      </div>
      <div className="feature-section">
        <FeatSearch />
      </div>
      <div className="feature-section">
        <FeatFilter />
      </div>
      <div className="feature-section">
        <FeatInline />
      </div>
      <div className="feature-section">
        <FeatVote />
      </div>
      <div className="feature-section">
        <FeatChart />
      </div>
    </div>
  );
}
export default AnimateFeature;
