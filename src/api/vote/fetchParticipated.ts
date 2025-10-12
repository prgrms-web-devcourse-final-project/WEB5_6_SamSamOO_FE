import api from '@/api/axiosInstance';
import type { VoteResponse } from '@/types/vote';

/**
 * 내가 참여한 투표 목록 불러오기
 * - 진행중 + 마감 투표 혼합
 * - page/size 기반 페이지네이션
 * - 통계는 별도 요청(`/api/polls/:pollId/statics`)
 */
export async function fetchParticipated({
  page = 0,
  size = 5,
}: {
  page?: number;
  size?: number;
}): Promise<VoteResponse> {
  const { data } = await api.get<VoteResponse>('/api/posts/my/votedPaged', {
    params: { page, size },
  });
  return data;
}
