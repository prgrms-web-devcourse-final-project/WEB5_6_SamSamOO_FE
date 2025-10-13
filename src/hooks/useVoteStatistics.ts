'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchVoteStatistics } from '@/api/vote/fetchStatistics';
import { VoteStatisticsResponse } from '@/types/voteStatistics';

/**
 * 특정 투표의 통계 데이터를 불러오는 훅
 * - pollId 기준
 * - 마감된 투표(ClosedPage)에서만 사용
 */
export function useVoteStatistics(pollId: number) {
  return useQuery<VoteStatisticsResponse>({
    queryKey: ['vote', 'statistics', pollId],
    queryFn: () => fetchVoteStatistics(pollId),
    enabled: !!pollId,
    staleTime: 1000 * 60 * 5,
  });
}
