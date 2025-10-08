import api from '@/api/axiosInstance';

export interface VerifyPasswordRequest {
  password: string;
}

export interface VerifyPasswordResponse {
  message: string;
  email: string;
  timestamp: string;
  success: boolean;
}

export const verifyPassword = async (
  data: VerifyPasswordRequest,
): Promise<VerifyPasswordResponse> => {
  const { password } = data;

  try {
    const res = await api.post<VerifyPasswordResponse>('/api/auth/verifyPassword', {
      password,
    });
    console.log('비밀번호날두');
    return res.data;
  } catch (error) {
    throw error;
  }
};
