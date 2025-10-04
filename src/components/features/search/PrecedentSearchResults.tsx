'use client';
import { PrecedentItem } from '@/types/precedent';
import Link from 'next/link';

interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
}

function PrecedentSearchResults({ content, showTag = false }: Props) {
  console.log(content);
  return (
    <>
      {content &&
        content.map(({ id, caseName, caseNumber, contents, sentencingDate }) => (
          <li key={id} className="mb-10">
            <Link href={`/detail/precedent/${id}`}>
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
