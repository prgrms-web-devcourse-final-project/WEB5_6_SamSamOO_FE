'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, type DeletePostResponse } from '@/api/vote/deleteVote';
import type { VoteCardModel } from '@/types/voteCard';

/**
 * useDeleteVoteMutation
 * - 생성한 투표(게시글) 삭제
 * - 낙관적 삭제 → 실패 시 복원 → 성공 시 invalidate
 */
export function useDeleteVoteMutation() {
  const queryClient = useQueryClient();

  const voteQueryKeys = [
    ['votes', 'ongoing'],
    ['votes', 'participated'],
    ['votes', 'closed'],
    ['votes', 'created'],
  ] as const;

  return useMutation<DeletePostResponse, Error, number, { previousData?: VoteCardModel[] }>({
    mutationFn: (postId: number) => deletePost(postId),

    /** 낙관적 삭제 */
    async onMutate(postId) {
      // 1. 모든 관련 쿼리 중단
      await Promise.all(voteQueryKeys.map((key) => queryClient.cancelQueries({ queryKey: key })));

      // 2. 이전 데이터 백업
      const previousData = queryClient.getQueryData<VoteCardModel[]>(['votes', 'created']);

      // 3. 캐시 즉시 반영 (삭제 항목 제거)
      queryClient.setQueryData<VoteCardModel[] | undefined>(['votes', 'created'], (old) =>
        Array.isArray(old) ? old.filter((post) => post.id !== postId) : old,
      );

      return { previousData };
    },

    /** 실패 시 복원 */
    onError(err, _postId, ctx) {
      console.error('[useDeleteVoteMutation] 삭제 실패:', err);
      if (ctx?.previousData) {
        queryClient.setQueryData(['votes', 'created'], ctx.previousData);
      }
    },

    /** 성공 시 정합성 보장 */
    async onSuccess(_res, postId) {
      // console.log('[useDeleteVoteMutation] 삭제 성공:', postId);
      await Promise.all(
        voteQueryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
      );
    },
  });
}
