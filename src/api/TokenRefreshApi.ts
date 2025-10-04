import api from '@/api/axiosInstance';
import { User } from '@/types/User';

export const TokenRefresh = async (): Promise<User> => {
  try {
    const res = await api.post<User>('/api/auth/refresh');
    return res.data;
  } catch (error) {
    throw error;
  }
};
