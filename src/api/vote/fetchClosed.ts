import api from '@/api/axiosInstance';
import type { VoteResponse } from '@/types/vote';

interface FetchClosedParams {
  page?: number;
  size?: number;
}

/**
 * fetchClosed
 * - 마감된 투표 목록 페이징 조회
 * - 구조는 fetchOngoing과 동일하며 status='CLOSED' 투표만 반환
 */
export async function fetchClosed({
  page = 0,
  size = 5,
}: FetchClosedParams): Promise<VoteResponse> {
  try {
    const { data } = await api.get<VoteResponse>('/api/posts/closedPaged', {
      params: { page, size },
    });
    return data;
  } catch (error) {
    console.error('[fetchClosed] 요청 실패:', error);
    throw error;
  }
}
