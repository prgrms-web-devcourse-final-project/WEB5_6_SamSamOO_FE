import api from '@/api/axiosInstance';

export interface SendEmailRequest {
  email: string;
}

export interface SendEmailResponse {
  message: string;
  email: string;
  timestamp: string;
  success: boolean;
}

export const sendEmail = async (data: SendEmailRequest): Promise<SendEmailResponse> => {
  const { email: loginId } = data;

  try {
    const res = await api.post<SendEmailResponse>('/api/auth/sendEmail', {
      loginId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
