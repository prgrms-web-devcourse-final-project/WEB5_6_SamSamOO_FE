import api from '../axiosInstance';

export async function withdraw() {
  try {
    const res = await api.delete(`/api/auth/withdraw`);
    return res.data;
  } catch (err) {
    console.log(err, '회원 탈퇴 실패.');
    return null;
  }
}
