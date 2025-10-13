import api from '@/api/axiosInstance';

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

export interface VerifyEmailResponse {
  message: string;
  email: string;
  timestamp: string;
  success: boolean;
}

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const { email: loginId, verificationCode } = data;

  try {
    const res = await api.post<VerifyEmailResponse>('/api/auth/verifyEmail', {
      loginId,
      verificationCode,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
