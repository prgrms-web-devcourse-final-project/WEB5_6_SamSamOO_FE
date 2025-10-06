import { getKeywordRanks } from '@/api/rank/keywordRankApi';
import KeywordRankClient from './components/rank/KeywordRankClient';

interface Props {
  className: string;
}

export default async function KeywordRank({ className }: Props) {
  const rankList = await getKeywordRanks();

  if (!rankList || rankList.length === 0) return;
  return <KeywordRankClient rankList={rankList} className={className} />;
}
