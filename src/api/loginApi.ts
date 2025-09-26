import api from '@/api/axiosInstance';
import { User } from '@/types/User';
export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<User> => {
  const { email: loginId, password } = data;

  try {
    const res = await api.post<User>('/api/auth/login', {
      loginId,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
