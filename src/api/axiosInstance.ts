import { showErrorToast } from '@/utils/showToast';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // 서버 응답 없음.
      showErrorToast('인터넷 연결을 확인해주세요. 😭');
    } else if (error.response.status >= 500) {
      // 서버 500번대 오류.
      showErrorToast('서버에 문제가 발생했어요. \n잠시 후 다시 시도해주세요.');
    } else if (error.response.status === 404) {
      showErrorToast('찾으시는 페이지나 데이터가 없어요.');
    }

    return Promise.reject(error);
  },
);

export default api;
