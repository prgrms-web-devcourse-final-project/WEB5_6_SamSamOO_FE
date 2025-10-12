'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVote } from '@/api/vote/createVote';
import type { CreateVoteRequest, CreateVoteResponse } from '@/api/vote/createVote';

export function useCreateVoteMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateVoteResponse, Error, CreateVoteRequest>({
    mutationFn: createVote,
    onSuccess: () => {
      // 진행 중 투표 목록을 최신화
      queryClient.invalidateQueries({ queryKey: ['votes', 'ongoing'] });
    },
    onError: (err) => {
      console.error('[useCreateVoteMutation] 투표 생성 실패:', err);
    },
  });
}
