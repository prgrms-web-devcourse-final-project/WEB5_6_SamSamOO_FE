'use client';
import { PrecedentItem } from '@/types/precedent';
import Link from 'next/link';
import CategoryTag from '../detail/CategoryTag';

interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
}

function PrecedentSearchResults({ content, showTag = false }: Props) {
  if (!content || content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-3">판례 검색 결과가 없습니다.</h1>
        <p className="text-gray-500">입력하신 조건에 맞는 판례가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <>
      {content &&
        content.map(({ id, caseName, caseNumber, contents, sentencingDate }) => (
          <li
            key={id}
            className="mb-5 px-5 mx-3 py-5 hover:bg-stone-50 transition-colors rounded-2xl"
          >
            <Link href={`/detail/precedent/${id}`}>
              <section className="space-x-2 sm:text-xl font-bold mb-0.5 sm:mb-2 items-center">
                <h2 className="sr-only">제목</h2>
                <CategoryTag
                  text="판례"
                  hidden={!showTag}
                  className="text-[10px] sm:text-sm relative bottom-[3px] sm:bottom-1 px-2 py-0.5 border-2 font-semibold rounded-2xl"
                />
                <span className="font-semibold">[{caseNumber}]</span>
                <span className="line-clamp-2 pt-1">{caseName}</span>
              </section>

              <p className="mb-3 line-clamp-2 text-sm sm:text-[16px]">
                {contents.split('<br/>')[0].length > 10
                  ? contents.split('<br/>')[0]
                  : `【주 문】 ${contents.split('<br/>').slice(1).join(' ')}`}
              </p>

              <section className="flex gap-2 text-xs sm:text-[16px] text-primary-gray1">
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
