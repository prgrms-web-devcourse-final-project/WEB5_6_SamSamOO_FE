'use client';
import { createContext, RefObject, useContext, useRef, useState } from 'react';

type SearchContextType = {
  totalLawElements: number;
  totalPrecedentElements: number;
  totalLawPages: number;
  totalPrecedentPages: number;
  totalElements: number;
  fixedTotalElements: number | null;
  initTotalElements: RefObject<number | null>;
  setTotalLawElements: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrecedentElements: React.Dispatch<React.SetStateAction<number>>;
  setTotalLawPages: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrecedentPages: React.Dispatch<React.SetStateAction<number>>;
  setTotalElements: React.Dispatch<React.SetStateAction<number>>;
  setFixedTotalElements: React.Dispatch<React.SetStateAction<number | null>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [totalLawElements, setTotalLawElements] = useState<number>(0);
  const [totalPrecedentElements, setTotalPrecedentElements] = useState<number>(0);
  const [totalLawPages, setTotalLawPages] = useState<number>(0);
  const [totalPrecedentPages, setTotalPrecedentPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [fixedTotalElements, setFixedTotalElements] = useState<number | null>(null);
  const initTotalElements = useRef<number | null>(null);

  return (
    <SearchContext.Provider
      value={{
        totalLawElements,
        totalPrecedentElements,
        totalLawPages,
        totalPrecedentPages,
        totalElements,
        fixedTotalElements,
        initTotalElements,
        setTotalLawElements,
        setTotalPrecedentElements,
        setTotalLawPages,
        setTotalPrecedentPages,
        setTotalElements,
        setFixedTotalElements,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchContext는 <SearchContextProvider> 안에서 사용해야합니다.');
  return ctx;
}
