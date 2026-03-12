'use client';

import { useRef } from 'react';
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

  return (
    <div ref={containerRef} className="lg:space-y-40">
      <DataInfo />

      <FeatAdvice />

      <FeatChat />

      <FeatHistory />

      <FeatSearch />

      <FeatFilter />

      <FeatInline />

      <FeatVote />

      <FeatChart />
    </div>
  );
}
export default AnimateFeature;
