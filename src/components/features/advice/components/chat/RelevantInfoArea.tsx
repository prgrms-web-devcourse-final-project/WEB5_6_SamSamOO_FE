import { Laws, Precedent } from '@/types/chat';
import tw from '@/utils/tw';
import Link from 'next/link';

interface Props {
  laws: Laws | null;
  precedent: Precedent | null;
  className?: string;
}

function RelevantInfoArea({ laws, precedent, className }: Props) {
  if (!laws && !precedent) return;
  return (
    <div
      className={tw('text-primary-black dark:text-primary-white border-t border-b pt-2', className)}
    >
      {laws && (
        <div className="flex gap-2 flex-wrap mb-2">
          <p className="font-bold">관련 법령 :</p>
          <Link
            className="border-b border-brand-primary dark:border-primary-white hover:border-brand-accent center-col"
            href={`/search/total?search_query=${laws?.lawName}`}
            title="검색으로 이동"
          >
            {laws?.lawName}
          </Link>
          <p>- {laws?.content}</p>
        </div>
      )}
      {precedent && (
        <div className="flex mb-2 gap-2 flex-wrap">
          <p className="font-bold">관련 판례 :</p>
          <Link
            className="border-b border-brand-primary dark:border-primary-white hover:border-brand-accent center-col"
            href={`/search/total?search_query=${precedent?.caseNumber}`}
            title="검색으로 이동"
          >
            {precedent?.caseNumber}
          </Link>
          <p>- {precedent?.caseName}</p>
        </div>
      )}
    </div>
  );
}
export default RelevantInfoArea;
