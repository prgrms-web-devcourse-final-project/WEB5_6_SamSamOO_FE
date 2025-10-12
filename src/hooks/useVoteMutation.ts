// src/hooks/useVoteMutation.ts
'use client';

import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { submitVote, type SubmitVoteRequest, type SubmitVoteResponse } from '@/api/vote/submitVote';
import type { VoteResponse, VotePost } from '@/types/vote';
import type { CreatedVoteResponse } from '@/api/vote/fetchCreated';

interface VoteContext {
  previousCache: Record<
    string,
    InfiniteData<VoteResponse> | VoteResponse | CreatedVoteResponse | undefined
  >;
}

export function useVoteMutation() {
  const queryClient = useQueryClient();

  /** 공통 쿼리키 목록 — 참여 / 진행 / 마감 / 생성 */
  const voteQueryKeys = [
    ['votes', 'ongoing'],
    ['votes', 'participated'],
    ['votes', 'closed'],
    ['votes', 'created'],
  ] as const;

  /** 개별 포스트 업데이트 로직 */
  const updatePostVote = (post: VotePost, variables: SubmitVoteRequest): VotePost => {
    if (post.poll.pollId !== variables.pollId) return post;

    const prevSelectedIndex = post.poll.pollOptions.find((opt) => opt.voted)?.pollOptionIndex;
    const hasPrev = prevSelectedIndex !== undefined;
    const isChanging = hasPrev && prevSelectedIndex !== variables.index;

    const updatedPollOptions = post.poll.pollOptions.map((opt) => {
      if (opt.pollOptionIndex === variables.index) {
        const shouldIncrement = !hasPrev || isChanging;
        return {
          ...opt,
          voted: true,
          voteCount: shouldIncrement ? opt.voteCount + 1 : opt.voteCount,
        };
      }

      if (isChanging && opt.pollOptionIndex === prevSelectedIndex) {
        return {
          ...opt,
          voted: false,
          voteCount: Math.max(0, opt.voteCount - 1),
        };
      }

      return { ...opt, voted: false };
    });

    const nextTotalVotes = hasPrev ? post.poll.totalVoteCount : post.poll.totalVoteCount + 1;

    return {
      ...post,
      poll: {
        ...post.poll,
        totalVoteCount: nextTotalVotes,
        pollOptions: updatedPollOptions,
      },
    };
  };

  /** 구조 자동 감지형 낙관적 업데이트 */
  const optimisticUpdate = (
    old: InfiniteData<VoteResponse> | VoteResponse | CreatedVoteResponse | undefined,
    variables: SubmitVoteRequest,
  ): InfiniteData<VoteResponse> | VoteResponse | CreatedVoteResponse | undefined => {
    if (!old) return old;

    // InfiniteQuery 구조
    if ('pages' in old) {
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          result: {
            ...page.result,
            content: page.result.content.map((post) => updatePostVote(post, variables)),
          },
        })),
      };
    }

    // Created 전체조회 구조
    if (Array.isArray((old as CreatedVoteResponse).result)) {
      const typedOld = old as CreatedVoteResponse;
      return {
        ...typedOld,
        result: typedOld.result.map((post) => updatePostVote(post, variables)),
      };
    }

    // 일반 페이징 구조
    if ('result' in old && 'content' in (old as VoteResponse).result) {
      const typedOld = old as VoteResponse;
      return {
        ...typedOld,
        result: {
          ...typedOld.result,
          content: typedOld.result.content.map((post) => updatePostVote(post, variables)),
        },
      };
    }

    return old;
  };

  return useMutation<SubmitVoteResponse, Error, SubmitVoteRequest, VoteContext>({
    mutationFn: submitVote,

    // 낙관적 업데이트
    onMutate: async (variables) => {
      await Promise.all(voteQueryKeys.map((key) => queryClient.cancelQueries({ queryKey: key })));

      // 이전 캐시 백업
      const previousCache: VoteContext['previousCache'] = {};
      for (const key of voteQueryKeys) {
        previousCache[key.join('-')] = queryClient.getQueryData(key);
      }

      // 모든 쿼리에 낙관적 업데이트 적용
      for (const key of voteQueryKeys) {
        queryClient.setQueryData<
          InfiniteData<VoteResponse> | VoteResponse | CreatedVoteResponse | undefined
        >(
          key,
          (old: InfiniteData<VoteResponse> | VoteResponse | CreatedVoteResponse | undefined) =>
            optimisticUpdate(old, variables) ?? old,
        );
      }

      return { previousCache };
    },

    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (!ctx?.previousCache) return;
      for (const key of Object.keys(ctx.previousCache)) {
        const cache = ctx.previousCache[key];
        if (cache) queryClient.setQueryData(key.split('-'), cache);
      }
    },

    // 성공 시 서버 정합성 동기화
    onSuccess: () => {
      for (const key of voteQueryKeys) {
        queryClient.invalidateQueries({ queryKey: key });
      }
    },
  });
}
