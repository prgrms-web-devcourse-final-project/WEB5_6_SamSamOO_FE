import axios from 'axios';

export async function tokenRefresh() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.error('토큰 재발급 실패:', err);
    return null;
  }
}
