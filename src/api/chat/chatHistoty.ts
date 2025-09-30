import api from '@/api/axiosInstance';
import { ChatHistoryList } from '@/types/chat';

export async function getChatTitleList() {
  try {
    const res = await api.get<ChatHistoryList>('/api/chat/history/');
    return res.data;
  } catch (err) {
    console.log(err, '채팅방 목록 조회 실패');
    return null;
  }
}
