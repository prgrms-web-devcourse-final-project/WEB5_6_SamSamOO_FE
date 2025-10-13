import api from '@/api/axiosInstance';
import type { PollOption } from '@/types/vote';

export interface SubmitVoteRequest {
  pollId: number;
  index: number;
}

export interface SubmitVoteResult extends Pick<PollOption, 'pollItemsId' | 'voteCount' | 'voted'> {
  pollVoteId: number;
  pollId: number;
  memberId: number;
  message: string;
}

export interface SubmitVoteResponse {
  code: number;
  message: string;
  result: SubmitVoteResult;
}

export async function submitVote({
  pollId,
  index,
}: SubmitVoteRequest): Promise<SubmitVoteResponse> {
  const { data } = await api.post<SubmitVoteResponse>(`/api/polls/${pollId}/voting`, null, {
    params: { index },
  });
  return data;
}
