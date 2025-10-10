import { ChatInfo, Message } from '@/types/chat';

/**
 * 채팅 조회 데이터를 zustand에 맞게 가공하는 함수
 * @param chatList
 * @returns
 */
export function convertMessage(chatList: ChatInfo[]) {
  return chatList.reduce<Message[]>((acc, chat) => {
    acc.push({
      id: crypto.randomUUID(),
      role: chat.type === 'USER' ? 'user' : 'ai',
      content: chat.message,
      precedent: chat.precedent,
      law: chat.law,
      timestamp: new Date(chat.createdAt).getTime(),
    });
    return acc;
  }, []);
}

/**
 * user-ai 데이터를 그룹으로 가공하는 함수
 * @param messages
 * @returns
 */
export function messageGroup(messages: Message[]) {
  return messages.reduce<Array<{ user: Message; ai?: Message }>>((acc, msg, index) => {
    if (msg.role === 'user') {
      const nextMsg = messages[index + 1];
      acc.push({
        user: msg,
        ai: nextMsg?.role === 'ai' ? nextMsg : undefined,
      });
    }
    return acc;
  }, []);
}
