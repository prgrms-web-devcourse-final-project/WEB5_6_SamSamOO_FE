import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { showErrorToast } from '@/utils/showToast';
import { tokenRefresh } from './tokenRefresh';
import {
  getIsRefreshing,
  setIsRefreshing,
  subscribeTokenRefresh,
  onRefreshed,
} from '@/utils/tokenManager';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // 서버 응답 없음
    if (!error.response) {
      showErrorToast('네트워크 연결을 확인해주세요.');
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status >= 500) {
      showErrorToast('서버에 문제가 발생했어요.\n잠시 후 다시 시도해주세요.');
      return Promise.reject(error);
    }

    if (status === 404) {
      showErrorToast('찾으시는 페이지가 존재하지 않습니다.');
      return Promise.reject(error);
    }

    // 401 처리
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (getIsRefreshing()) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => resolve(api(originalRequest)));
        });
      }

      // 재발급 시도
      setIsRefreshing(true);
      const newToken = await tokenRefresh();
      setIsRefreshing(false);

      if (newToken) {
        onRefreshed(newToken);
        return api(originalRequest);
      } else {
        showErrorToast('세션이 만료되었습니다.\n다시 로그인해주세요.');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
