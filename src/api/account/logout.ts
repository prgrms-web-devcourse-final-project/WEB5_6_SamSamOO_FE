import api from '@/api/axiosInstance';

export const logout = async (): Promise<void> => {
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    throw error;
  }
};
