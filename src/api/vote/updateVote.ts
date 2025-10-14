import api from '@/api/axiosInstance';
import type { VotePost } from '@/types/vote';

export interface UpdatePostRequest {
  postName?: string;
  postContent?: string;
  category?: string;
  poll?: {
    voteTitle?: string;
    pollOptions?: { content: string }[];
    reservedCloseAt?: string;
  };
}

export interface UpdatePostResponse {
  code: number;
  message: string;
  result: {
    post: VotePost;
  };
}

export async function updatePost(
  postId: number,
  payload: UpdatePostRequest,
): Promise<UpdatePostResponse> {
  try {
    const res = await api.patch<UpdatePostResponse>(`/api/posts/${postId}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
}
