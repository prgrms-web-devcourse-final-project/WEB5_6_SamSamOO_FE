import api from '@/api/axiosInstance';
import type { VoteStatisticsResponse } from '@/types/voteStatistics';

export async function fetchVoteStatistics(pollId: number): Promise<VoteStatisticsResponse> {
  const { data } = await api.get<VoteStatisticsResponse>(`/api/polls/${pollId}/statics`);
  return data;
}
