import { DataCount } from '@/types/dataCount';
import api from '../axiosInstance';

export async function postDataInfo() {
  try {
    const res = await api.post<DataCount>('/api/home/data-count', {});
    return res.data;
  } catch (err) {
    console.log(err, '새 채팅 결과 조회 실패');
    return null;
  }
}
