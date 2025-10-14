'use client';
import { useEffect } from 'react';

import { PrecedentItem } from '@/types/precedent';
import PrecedentSearchResults from './PrecedentSearchResults';
interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
}

export default function PrecedentSearchResultsClient({ content, showTag }: Props) {
  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() => {
      const end = performance.now();
      console.log('판례 Hydration + Paint:', Math.round(end - start), 'ms');
    });
  }, []);
  return <PrecedentSearchResults content={content} showTag={showTag} />;
}
