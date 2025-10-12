import api from '@/api/axiosInstance';
import { VoteResponse } from '@/types/vote';

export interface FetchOngoingParams {
  page?: number;
  size?: number;
}

export const fetchOngoing = async ({
  page = 0,
  size = 5,
}: FetchOngoingParams = {}): Promise<VoteResponse> => {
  const response = await api.get<VoteResponse>('/api/posts/ongoingPaged', {
    params: { page, size },
  });
  return response.data;
};
