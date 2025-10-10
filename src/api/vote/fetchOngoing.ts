import api from '@/api/axiosInstance';
import { OngoingVoteResponse } from '@/types/vote';

export interface FetchOngoingParams {
  page?: number;
  size?: number;
}

export const fetchOngoing = async ({
  page = 0,
  size = 5,
}: FetchOngoingParams = {}): Promise<OngoingVoteResponse> => {
  const response = await api.get<OngoingVoteResponse>('/api/posts/ongoingPaged', {
    params: { page, size },
  });
  return response.data;
};
