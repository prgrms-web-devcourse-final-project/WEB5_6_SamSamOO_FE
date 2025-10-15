import api from '@/api/axiosInstance';

export interface DeletePostResponse {
  code: number;
  message: string;
  result: string;
}

export async function deletePost(postId: number): Promise<DeletePostResponse> {
  try {
    const res = await api.delete<DeletePostResponse>(`/api/posts/${postId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
