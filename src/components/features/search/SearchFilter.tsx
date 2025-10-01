'use client';

import { useEffect, useState } from 'react';

import TotalSearchFilterModal from './TotalSearchFilterModal';
import LawSearchFilterModal from './LawSearchFilterModal';
import PrecedentSearchFilterModal from './PrecedentSearchFilterModal';

import FilterDown from '@/assets/icons/filterDown.svg';
import convertObjectToString from '@/utils/convertObjectToString';
import { LawSearchFilter, TestSearchFilter } from '@/types/filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import makeSearchUrl from '@/utils/makeSearchUrl';

interface Props {
  category: string;
  setAppliedFilterText: React.Dispatch<React.SetStateAction<string>>;
}

function SearchFilter({ category, setAppliedFilterText }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [totalSearchFilter, setTotalSearchFilter] = useState<TestSearchFilter>({
    field1: '',
    field2: '',
    field3: '',
  });
  const [lawSearchFilter, setLawSearchFilter] = useState<LawSearchFilter>({});
  const [precedentSearchFilter, setPrecedentSearchFilter] = useState<TestSearchFilter>({
    field1: '',
    field2: '',
    field3: '',
  });

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
    if (category === '통합') {
      setLawSearchFilter({
        lawField: '',
        authority: '',
        ministry: '',
        promulgationDateStart: '',
        promulgationDateEnd: '',
        enforcementDateStart: '',
        enforcementDateEnd: '',
      });
      setPrecedentSearchFilter({
        field1: '',
        field2: '',
        field3: '',
      });
    }
    if (category === '법령') {
      setPrecedentSearchFilter({
        field1: '',
        field2: '',
        field3: '',
      });
      setTotalSearchFilter({
        field1: '',
        field2: '',
        field3: '',
      });
    }
    if (category === '판례') {
      setLawSearchFilter({
        lawField: '',
        authority: '',
        ministry: '',
        promulgationDateStart: '',
        promulgationDateEnd: '',
        enforcementDateStart: '',
        enforcementDateEnd: '',
      });
      setTotalSearchFilter({
        field1: '',
        field2: '',
        field3: '',
      });
    }
    setAppliedFilterText('');
  }, [category, setAppliedFilterText]);

  useEffect(() => {
    if (category === '통합') {
      const convert = convertObjectToString(totalSearchFilter);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
    if (category === '법령') {
      const convert = convertObjectToString(lawSearchFilter);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
    if (category === '판례') {
      const convert = convertObjectToString(precedentSearchFilter);
      if (convert.length === 0) setAppliedFilterText('적용된 필터가 없습니다');
      else setAppliedFilterText(convert);
    }
  }, [lawSearchFilter, totalSearchFilter, precedentSearchFilter, category, setAppliedFilterText]);

  useEffect(() => {
    if (category === '통합') {
      const url = makeSearchUrl(pathname, params, totalSearchFilter);
      router.push(url);
    }
    if (category === '법령') {
      const url = makeSearchUrl(pathname, params, lawSearchFilter);
      router.push(url);
    }
    if (category === '판례') {
      const url = makeSearchUrl(pathname, params, precedentSearchFilter);
      router.push(url);
    }
  }, [lawSearchFilter]);

  // console.log('필터 컴포넌트에서 파라미터 콘솔 확인 : ', params);

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
