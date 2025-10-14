// LawSearchResults.client.tsx
'use client';
import { useEffect } from 'react';
import LawSearchResults from './LawSearchResults';
import { LawItem } from '@/types/law';
interface Props {
  content: LawItem[];
  showTag?: boolean;
}
export default function LawSearchResultsClient({ content, showTag }: Props) {
  console.time('법령 Hydration');
  useEffect(() => {
    console.timeEnd('법령 Hydration');
  }, []);
  return <LawSearchResults content={content} showTag={showTag} />;
}
