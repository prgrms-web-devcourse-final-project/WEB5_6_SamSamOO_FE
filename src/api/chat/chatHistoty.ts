import api from '@/api/axiosInstance';
import { ChatHistoryList, ChatInfo } from '@/types/chat';

export async function getChatHistoryList() {
  try {
    const res = await api.get<ChatHistoryList>('/api/chat/history/');
    return res.data;
  } catch (err) {
    console.log(err, '채팅방 목록 조회 실패');
    return null;
  }
}

export async function getChatHistoryInfo(historyId: string) {
  try {
    const res = await api.get<ChatInfo[]>(`/api/chat/history/${historyId}`);
    return res.data;
  } catch (err) {
    console.log(err, '채팅방 목록 조회 실패');
    return null;
  }
}

export async function deleteChatHistory(historyId: string) {
  try {
    const res = await api.delete<ChatHistoryList>(`/api/chat/history/${historyId}`);
    return res.data;
  } catch (err) {
    console.log(err, '채팅방 목록 조회 실패');
    return null;
  }
}
