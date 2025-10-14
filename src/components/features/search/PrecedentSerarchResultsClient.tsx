// LawSearchResults.client.tsx
'use client';
import { useEffect } from 'react';

import { PrecedentItem } from '@/types/precedent';
import PrecedentSearchResults from './PrecedentSearchResults';
interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
}

export default function PrecedentSearchResultsClient({ content, showTag }: Props) {
  console.time('판례 Hydration');
  useEffect(() => {
    console.timeEnd('판례 Hydration');
  }, []);
  return <PrecedentSearchResults content={content} showTag={showTag} />;
}
