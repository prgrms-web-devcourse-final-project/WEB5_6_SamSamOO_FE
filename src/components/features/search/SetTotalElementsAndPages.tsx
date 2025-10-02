'use client';
import { useSearch } from '@/context/SearchContext';
import { useEffect } from 'react';

interface Props {
  lawTotalElements?: number;
  lawTotalPages?: number;
  precedentTotalElements?: number;
  precedentTotalPages?: number;
  category: string;
}

function SetTotalElementsAndPages({
  lawTotalElements,
  lawTotalPages,
  precedentTotalElements,
  precedentTotalPages,
  category,
}: Props) {
  const {
    setTotalLawElements,
    setTotalLawPages,
    setTotalPrecedentElements,
    setTotalPrecedentPages,
  } = useSearch();

  useEffect(() => {
    if (category === '법령') {
      setTotalLawElements(lawTotalElements ?? 0);
      setTotalLawPages(lawTotalPages ?? 0);
    }
    if (category === '판례') {
      setTotalPrecedentElements(precedentTotalElements ?? 0);
      setTotalPrecedentPages(precedentTotalPages ?? 0);
    }
    if (category === '통합') {
      setTotalLawElements(lawTotalElements ?? 0);
      setTotalLawPages(lawTotalPages ?? 0);
      setTotalPrecedentElements(precedentTotalElements ?? 0);
      setTotalPrecedentPages(precedentTotalPages ?? 0);
    }
  }, [
    lawTotalElements,
    lawTotalPages,
    precedentTotalElements,
    precedentTotalPages,
    setTotalLawElements,
    setTotalLawPages,
    setTotalPrecedentElements,
    setTotalPrecedentPages,
    category,
  ]);

  return '';
}
export default SetTotalElementsAndPages;
