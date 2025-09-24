'use client';

import { TextSelection } from '@/types/inline';
import { useEffect, useRef, useState } from 'react';

const inline =
  'dark:bg-background-black1 dark:text-primary-white dark:shadow-[0_0px_1px_1px_rgba(255,255,255,0.40)]' +
  'bg-background-white text-primary-black shadow-[4_4px_10px_10px_rgba(0,0,0,0.25)] text-xs rounded-lg absolute max-h-[150px] overflow-y-auto';

interface Props {
  selectedText: TextSelection;
  ref: React.Ref<HTMLDivElement>;
}

function InlineBlock({ selectedText, ref }: Props) {
  const [definition, setDefinition] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const definitionRef = useRef(null);

  useEffect(() => {
    //todo - api 통신 로직 추가되어야 함
    setDefinition(selectedText.selectedText);
  }, []);

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
      {!isSearch && (
        <button className="flex items-center justify-center gap-2 p-1 " onClick={handleSearchWord}>
          <img src="/inline_search.svg" alt="인라인 찾기 아이콘" />
          <span>용어 검색</span>
        </button>
      )}
      {isSearch && (
        <p ref={definitionRef} className="p-3.5 whitespace-pre-wrap">
          {definition === '' ? '검색결과가 없습니다' : definition}
        </p>
      )}
    </div>
  );
}
export default InlineBlock;
