import api from '@/api/axiosInstance';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  memberId: number;
  loginId: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  role: 'USER' | 'ADMIN';
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { email: loginId, password } = data;

  try {
    const res = await api.post<LoginResponse>('/api/auth/login', {
      loginId,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
