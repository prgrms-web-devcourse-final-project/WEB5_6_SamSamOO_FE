'use client';
import { useEffect } from 'react';
import LawSearchResults from './LawSearchResults';
import { LawItem } from '@/types/law';
interface Props {
  content: LawItem[];
  showTag?: boolean;
}
export default function LawSearchResultsClient({ content, showTag }: Props) {
  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() => {
      const end = performance.now();
      console.log('법령 Hydration + Paint:', Math.round(end - start), 'ms');
    });
  }, []);
  return <LawSearchResults content={content} showTag={showTag} />;
}
