'use client';
import { useSearch } from '@/context/SearchContext';
import { PrecedentItem } from '@/types/precedent';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
  totalElements: number;
  totalPages: number;
}

function PrecedentSearchResults({ content, showTag = false, totalElements, totalPages }: Props) {
  const [results, setResults] = useState<PrecedentItem[] | null>(null);
  const { setTotalPrecedentElements, setTotalPrecedentPages } = useSearch();

  useEffect(() => {
    setTotalPrecedentElements(totalElements);
    setTotalPrecedentPages(totalPages);
  }, [totalElements, totalPages, setTotalPrecedentElements, setTotalPrecedentPages]);

  useEffect(() => {
    setResults(content);
  }, [content]);

  return (
    <>
      {results &&
        results.map(({ id, caseName, caseNumber, contents, sentencingDate }) => (
          <li key={id} className="mb-10">
            <Link href={`precedent/${id}`}>
              <section className="space-x-2 text-xl font-bold mb-2">
                <h2 className="sr-only">제목</h2>
                <span hidden={!showTag}>{`<판례>`}</span>
                <span>
                  [{caseNumber}] {caseName}
                </span>
              </section>
              <p className="mb-3 line-clamp-3">{contents}</p>
              <section className="flex gap-2 text-md text-primary-gray1">
                <h2 className="sr-only">기간</h2>
                <p>선고일자 : {String(sentencingDate)}</p>
              </section>
            </Link>
          </li>
        ))}
    </>
  );
}
export default PrecedentSearchResults;
