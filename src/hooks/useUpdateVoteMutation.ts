'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost, type UpdatePostRequest, type UpdatePostResponse } from '@/api/vote/updateVote';

interface UpdateVoteVariables {
  postId: number;
  payload: UpdatePostRequest;
}

const AFFECTED_QUERY_KEYS = [['votes', 'created']] as const;

export function useUpdateVoteMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdatePostResponse, Error, UpdateVoteVariables>({
    mutationFn: ({ postId, payload }) => updatePost(postId, payload),

    onSuccess: () => {
      AFFECTED_QUERY_KEYS.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
    },

    onError: (error) => {
      console.error('[useUpdateVoteMutation] update failed:', error);
    },
  });
}
