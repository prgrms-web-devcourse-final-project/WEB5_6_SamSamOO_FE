import api from '@/api/axiosInstance';
import { Ranks } from '@/types/keywordRanks';

export async function getKeywordRanks() {
  try {
    const res = await api.get<Ranks[]>('/api/chat/keyword/ranks');
    return res.data;
  } catch (err) {
    console.log(err, '키워드 랭크 확인 불가.');
    return null;
  }
}
