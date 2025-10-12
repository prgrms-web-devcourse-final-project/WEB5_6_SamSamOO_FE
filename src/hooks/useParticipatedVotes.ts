import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchParticipated } from '@/api/vote/fetchParticipated';
import { normalizeVoteResponse } from '@/utils/normalizeVoteResponse';
import type { VoteResponse } from '@/types/vote';
import type { VoteCardModel } from '@/types/voteCard';

/**
 * 내가 참여한 투표 목록 무한스크롤 훅
 * - 진행중 + 마감 투표 혼합
 */
export function useParticipatedVotes() {
  return useInfiniteQuery<VoteResponse, Error, VoteCardModel[], [string, string], number>({
    queryKey: ['votes', 'participated'],
    initialPageParam: 0,

    // 페이지 요청
    queryFn: async ({ pageParam }) => {
      const res = await fetchParticipated({ page: pageParam, size: 5 });
      return res;
    },

    // 다음 페이지 여부 계산
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.result;
      const hasNext = page < totalPages - 1;
      return hasNext ? page + 1 : undefined;
    },

    // 전체 데이터 평탄화
    select: (data) => data.pages.flatMap((page) => normalizeVoteResponse(page)),
  });
}
