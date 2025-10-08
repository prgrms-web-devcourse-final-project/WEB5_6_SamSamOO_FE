import api from '@/api/axiosInstance';

export interface passwordResetRequest {
  email: string;
  newPassword: string;
  success: boolean;
}

export interface passwordResetResponse {
  message: string;
  email: string;
  timestamp: string;
  success: boolean;
}

export const passwordReset = async (data: passwordResetRequest): Promise<passwordResetResponse> => {
  const { email: loginId, newPassword, success } = data;

  try {
    const res = await api.post<passwordResetResponse>('/api/auth/passwordReset', {
      loginId,
      newPassword,
      success,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
