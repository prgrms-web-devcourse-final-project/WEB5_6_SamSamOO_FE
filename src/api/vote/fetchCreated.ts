import api from '@/api/axiosInstance';
import type { VotePost } from '@/types/vote';

export interface CreatedVoteResponse {
  code: number;
  message: string;
  result: VotePost[];
}

/**
 * GET /api/posts/my
 * 내가 생성한 투표 전체 조회 (페이징 없음)
 */
export async function fetchCreated(): Promise<CreatedVoteResponse> {
  const { data } = await api.get<CreatedVoteResponse>('/api/posts/my');
  return data;
}
