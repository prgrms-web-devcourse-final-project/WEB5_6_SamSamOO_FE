import { LawItem } from '@/types/law';
import Link from 'next/link';

interface Props {
  content: LawItem[];
  showTag?: boolean;
}

function LawSearchResults({ content, showTag = false }: Props) {
  return (
    <>
      {content &&
        content.map(
          ({
            id,
            lawName,
            // lawField,
            // ministry,
            promulgationNumber,
            promulgationDate,
            enforcementDate,
            firstJoContent,
          }) => (
            <li key={id} className="mb-10">
              <Link href={`law/${id}`}>
                <section className="space-x-2 text-xl font-bold mb-2">
                  <h2 className="sr-only">제목</h2>
                  <span hidden={!showTag}>{'<법령>'}</span>
                  <span>
                    [{promulgationNumber}] {lawName}
                  </span>
                </section>
                <p className="mb-3 line-clamp-2">{firstJoContent}</p>
                <section className="flex gap-2 text-md text-primary-gray1">
                  <h2 className="sr-only">기간</h2>
                  <p>공포일자 : {String(promulgationDate)}</p>
                  <p>시행일자 : {String(enforcementDate)}</p>
                </section>
              </Link>
            </li>
          ),
        )}
    </>
  );
}
export default LawSearchResults;
