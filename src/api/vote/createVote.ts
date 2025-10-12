import api from '@/api/axiosInstance';
import type { VotePost } from '@/types/vote';

export interface CreateVoteRequest {
  post: {
    postName: string;
    postContent: string;
    category: string;
  };
  poll: {
    voteTitle: string;
    pollOptions: { content: string }[];
    reservedCloseAt: string;
  };
}

export interface CreateVoteResponse {
  code: number;
  message: string;
  result: {
    post: VotePost;
  };
}

export async function createVote(payload: CreateVoteRequest): Promise<CreateVoteResponse> {
  const { data } = await api.post<CreateVoteResponse>('/api/posts/createPost', payload);
  return data;
}
