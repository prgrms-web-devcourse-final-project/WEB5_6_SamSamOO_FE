import api from '@/api/axiosInstance';
import { User } from '@/types/User';

export async function fetchUser() {
  try {
    const res = await api.get<User>('/api/auth/me');
    return res.data;
  } catch (err) {
    console.log(err, '토큰을 확인하지 못해 비로그인 상태로 시작.');
    return null;
  }
}
