import api from '@/api/axiosInstance';
import { User } from '@/types/tempUser';

export interface SignUpRequest {
  email: string;
  password: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  name: string;
}

export const signUp = async (data: SignUpRequest): Promise<User> => {
  const { email: loginId, password, age, gender, name } = data;

  try {
    const res = await api.post<User>('/api/auth/signup', {
      loginId,
      password,
      age,
      gender,
      name,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
