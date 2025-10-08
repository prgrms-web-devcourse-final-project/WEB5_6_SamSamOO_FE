'use client';
import { PrecedentItem } from '@/types/precedent';
import Link from 'next/link';
import CategoryTag from '../detail/CategoryTag';

interface Props {
  content: PrecedentItem[];
  showTag?: boolean;
}

function PrecedentSearchResults({ content, showTag = false }: Props) {
  // console.log(content);
  return (
    <>
      {content &&
        content.map(({ id, caseName, caseNumber, contents, sentencingDate }) => (
          <li key={id} className="mb-10">
            <Link href={`/detail/precedent/${id}`}>
              <section className="space-x-2 text-xl font-bold mb-2">
                <h2 className="sr-only">제목</h2>
                <CategoryTag
                  text="판례"
                  hidden={!showTag}
                  className="text-sm relative bottom-1 px-2 py-0.5 border-2 font-semibold rounded-2xl"
                />
                <span className="font-semibold">[{caseNumber}]</span>
                <span className="line-clamp-2">{caseName}</span>
              </section>

              <p className="mb-3 line-clamp-2">
                {contents.split('<br/>')[0].length > 10
                  ? contents.split('<br/>')[0]
                  : `【주 문】 ${contents.split('<br/>')[1]}`}
              </p>

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
