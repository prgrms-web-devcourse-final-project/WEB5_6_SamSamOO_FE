import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchClosed } from '@/api/vote/fetchClosed';
import { normalizeVoteResponse } from '@/utils/normalizeVoteResponse';
import type { VoteResponse } from '@/types/vote';
import type { VoteCardModel } from '@/types/voteCard';

/**
 * 마감된 투표 목록 무한스크롤 훅
 * - 데이터 page/size/totalPages/totalElements 기준으로 페이징
 */
export function useClosedVotes() {
  return useInfiniteQuery<VoteResponse, Error, VoteCardModel[], [string, string], number>({
    queryKey: ['votes', 'closed'],
    initialPageParam: 0,

    // 페이지 요청
    queryFn: async ({ pageParam }) => {
      const res = await fetchClosed({ page: pageParam, size: 2 });
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
