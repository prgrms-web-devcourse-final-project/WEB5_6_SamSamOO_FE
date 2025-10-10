'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TotalSearchFilterModal from './TotalSearchFilterModal';
import LawSearchFilterModal from './LawSearchFilterModal';
import PrecedentSearchFilterModal from './PrecedentSearchFilterModal';
import {
  LawSearchFilterLabel,
  PrecedentSearchFilterLabel,
  TotalSearchFilterLabel,
} from './labelList';

import FilterDown from '@/assets/icons/filterDown.svg';
import makeSearchUrl from '@/utils/makeSearchUrl';
import convertObjectToString from '@/utils/convertObjectToString';
import { mapFilterToLabel } from '@/utils/mapFilterToLabel';
import { LawSearchFilter, PrecedentSearchFilter, TotalSearchFilter } from '@/types/filter';

interface Props {
  category: string;
  setAppliedFilterText: React.Dispatch<React.SetStateAction<string>>;
}

function SearchFilter({ category, setAppliedFilterText }: Props) {
  const searchParams = useSearchParams();
  const prevFilterRef = useRef<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [totalSearchFilter, setTotalSearchFilter] = useState<TotalSearchFilter>({});
  const [lawSearchFilter, setLawSearchFilter] = useState<LawSearchFilter>({});
  const [precedentSearchFilter, setPrecedentSearchFilter] = useState<PrecedentSearchFilter>({});

  const searchFilterModal = () => {
    if (category === '통합') {
      return (
        <TotalSearchFilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setTotalSearchFilter={setTotalSearchFilter}
        />
      );
    }
    if (category === '법령') {
      return (
        <LawSearchFilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setLawSearchFilter={setLawSearchFilter}
        />
      );
    }
    if (category === '판례') {
      return (
        <PrecedentSearchFilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setPrecedentSearchFilter={setPrecedentSearchFilter}
        />
      );
    }
  };
  useEffect(() => {
    const getCommonLawFields = () => ({
      lawField: searchParams.get('lawField') ?? '',
      authority: searchParams.get('authority') ?? '',
      ministry: searchParams.get('ministry') ?? '',
      promulgationDateStart: searchParams.get('promulgationDateStart') ?? '',
      promulgationDateEnd: searchParams.get('promulgationDateEnd') ?? '',
      enforcementDateStart: searchParams.get('enforcementDateStart') ?? '',
      enforcementDateEnd: searchParams.get('enforcementDateEnd') ?? '',
    });

    const getCommonPrecedentFields = () => ({
      sentencingDateStart: searchParams.get('sentencingDateStart') ?? '',
      sentencingDateEnd: searchParams.get('sentencingDateEnd') ?? '',
    });

    if (category === '통합') {
      setTotalSearchFilter({
        ...getCommonLawFields(),
        ...getCommonPrecedentFields(),
      });
    }
    if (category === '법령') {
      setLawSearchFilter({
        ...getCommonLawFields(),
      });
    }
    if (category === '판례') {
      setPrecedentSearchFilter({
        ...getCommonPrecedentFields(),
      });
    }
  }, [category, searchParams]);

  useEffect(() => {
    if (category === '통합') {
      const mapLabel = mapFilterToLabel(totalSearchFilter, TotalSearchFilterLabel);
      const convert = convertObjectToString(mapLabel);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
    if (category === '법령') {
      const mapLabel = mapFilterToLabel(lawSearchFilter, LawSearchFilterLabel);
      const convert = convertObjectToString(mapLabel);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
    if (category === '판례') {
      const mapLabel = mapFilterToLabel(precedentSearchFilter, PrecedentSearchFilterLabel);
      const convert = convertObjectToString(mapLabel);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
  }, [lawSearchFilter, totalSearchFilter, precedentSearchFilter, category, setAppliedFilterText]);

  useEffect(() => {
    const currentFilter =
      category === '통합'
        ? JSON.stringify(totalSearchFilter)
        : category === '법령'
          ? JSON.stringify(lawSearchFilter)
          : JSON.stringify(precedentSearchFilter);

    if (prevFilterRef.current === currentFilter) return;

    const baseParams = new URLSearchParams(searchParams);
    baseParams.set('pageNumber', '0');

    let url = '';
    if (category === '통합') {
      url = makeSearchUrl(pathname, baseParams, totalSearchFilter);
    } else if (category === '법령') {
      url = makeSearchUrl(pathname, baseParams, lawSearchFilter);
    } else if (category === '판례') {
      url = makeSearchUrl(pathname, baseParams, precedentSearchFilter);
    }
    router.replace(url);
    prevFilterRef.current = currentFilter;
  }, [totalSearchFilter, precedentSearchFilter, lawSearchFilter]);

  return (
    <>
      <button
        type="button"
        className="flex w-17 gap-2 items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {category}
        <FilterDown className="dark:text-white w-[10] h-2" />
      </button>
      {isOpen && searchFilterModal()}
    </>
  );
}
export default SearchFilter;
