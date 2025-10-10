'use client';

import { getLawWordDefinition } from '@/api/word/lawWord';
import { TextSelection } from '@/types/inline';
import { useEffect, useRef, useState } from 'react';

const inline =
  'bg-background-black1 text-primary-white shadow-[0_0px_1px_1px_rgba(255,255,255,0.40)] dark:bg-background-white dark:text-primary-black dark:shadow-[4_4px_10px_10px_rgba(0,0,0,0.25)] text-xs rounded-lg absolute max-h-[150px] overflow-y-auto';

interface Props {
  selectedText: TextSelection;
  ref: React.Ref<HTMLDivElement>;
}

function InlineBlock({ selectedText, ref }: Props) {
  const [definition, setDefinition] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const definitionRef = useRef(null);

  useEffect(() => {
    if (!isSearch) return;
    const getDefinition = async () => {
      setLoading(true);
      const response = await getLawWordDefinition(selectedText.selectedText.trim());
      if (!response) setDefinition('법률 용어 검색 결과가 없습니다.');
      else setDefinition(`${selectedText.selectedText} - ${response}`);
      setLoading(false);
    };
    getDefinition();
  }, [selectedText, isSearch]);

  const handleSearchWord = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSearch(true);
  };

  return (
    <div
      className={`${inline} ${isSearch ? `w-fit max-w-[350px]` : 'w-24'}`}
      style={{ left: selectedText.positionX, top: selectedText.positionY }}
      ref={ref}
    >
      {isLoading && <div className="p-2 m-2 w-12 animate-pulse bg-gray-400"></div>}
      {!isLoading && !isSearch && (
        <button className="flex items-center justify-center gap-2 p-1 " onClick={handleSearchWord}>
          <img
            src="/icons/inlineSearchLight.svg"
            className="dark:hidden"
            alt="인라인 찾기 아이콘"
          />
          <img
            src="/icons/inlineSearchDark.svg"
            className="hidden dark:block"
            alt="인라인 찾기 아이콘"
          />
          <span>용어 검색</span>
        </button>
      )}
      {!isLoading && isSearch && (
        <p ref={definitionRef} className="p-3.5 whitespace-pre-wrap">
          {definition === '' ? '검색결과가 없습니다' : definition}
        </p>
      )}
    </div>
  );
}
export default InlineBlock;
