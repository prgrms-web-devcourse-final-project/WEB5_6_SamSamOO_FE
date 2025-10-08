import api from '@/api/axiosInstance';
import { ChatBotAnswer } from '@/types/chatBot';

export async function postNewChat(message: string) {
  try {
    const res = await api.post<ChatBotAnswer[]>('/api/chat/message', {
      message,
    });
    return res.data;
  } catch (err) {
    console.log(err, '새 채팅 결과 조회 실패');
    return null;
  }
}

export async function postExistingChat(message: string, historyId: string) {
  try {
    const res = await api.post(`/api/chat/${historyId}/message`, {
      message,
    });
    return res.data;
  } catch (err) {
    console.log(err, '기존 채팅 결과 조회 실패');
    return null;
  }
}
