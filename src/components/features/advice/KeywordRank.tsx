import { getKeywordRanks } from '@/api/rank/keywordRankApi';
import KeywordRankClient from './components/rank/KeywordRankClient';

interface Props {
  className: string;
}

//매 렌더링마다 새로 받도록 함
export const dynamic = 'force-dynamic';

export default async function KeywordRank({ className }: Props) {
  const rankList = await getKeywordRanks();

  if (!rankList || rankList.length === 0)
    return (
      <div className={'md:absolute relative md:w-fit w-full md:right-10 md:top-4'}>
        랭킹 정보가 없습니다.
      </div>
    );
  return <KeywordRankClient rankList={rankList} className={className} />;
}
