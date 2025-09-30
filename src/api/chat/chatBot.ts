import api from '@/api/axiosInstance';
import { ChatHistoryList } from '@/types/chat';
import { ChatBotAnswer } from '@/types/chatBot';

export async function postNewChat(message: string) {
  try {
    const res = await api.post<ChatBotAnswer[]>('/api/chat/message', {
      message,
    });
    console.log('res', res);
    return res.data;
  } catch (err) {
    console.log(err, '새 채팅 결과 조회 실패');
    return null;
  }
}
