import { LawItem } from '@/types/law';
import Link from 'next/link';
import CategoryTag from '../detail/CategoryTag';

interface Props {
  content: LawItem[];
  showTag?: boolean;
}

function LawSearchResults({ content, showTag = false }: Props) {
  // console.log(content);
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
            <li key={id} className="mb-10 px-5">
              <Link href={`/detail/law/${id}`}>
                <section className="space-x-2 sm:text-xl font-bold mb-0.5 sm:mb-2 items-center">
                  <h2 className="sr-only">제목</h2>
                  <CategoryTag
                    text="법령"
                    hidden={!showTag}
                    className="text-[10px] sm:text-sm relative bottom-[3px] sm:bottom-1 px-2 py-0.5 border-2 font-semibold rounded-2xl"
                  />
                  <span className="font-semibold">[{promulgationNumber}]</span>
                  <p className="pt-1">{lawName}</p>
                </section>
                <p className="mb-3 line-clamp-2 text-sm sm:text-[16px]">{firstJoContent}</p>
                <section className="flex gap-2 text-xs sm:text-[16px] text-primary-gray1">
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
