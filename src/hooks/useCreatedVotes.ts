// src/hooks/useCreatedVotes.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCreated } from '@/api/vote/fetchCreated';
import { normalizeVoteResponse } from '@/utils/normalizeVoteResponse';
import type { CreatedVoteResponse } from '@/api/vote/fetchCreated';
import type { VoteCardModel } from '@/types/voteCard';
import type { VoteResponse } from '@/types/vote';

/**
 * 내가 생성한 투표 목록 훅
 * - 진행중 + 마감 모두 포함
 * - 전체 조회 (페이지네이션 없음)
 */
export function useCreatedVotes() {
  return useQuery<CreatedVoteResponse, Error, VoteCardModel[]>({
    queryKey: ['votes', 'created'],
    queryFn: fetchCreated,

    select: (data) => {
      const mockPaginated: VoteResponse = {
        code: data.code,
        message: data.message,
        result: {
          content: data.result,
          page: 0,
          size: data.result.length,
          totalPages: 1,
          totalElements: data.result.length,
        },
      };

      return normalizeVoteResponse(mockPaginated);
    },
  });
}
