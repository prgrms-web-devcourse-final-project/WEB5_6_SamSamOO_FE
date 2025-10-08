import { ChatInfo, Message } from '@/types/chat';

export function convertMessage(chatList: ChatInfo[]) {
  return chatList.reduce<Message[]>((acc, chat) => {
    acc.push({
      id: crypto.randomUUID(),
      role: chat.type === 'USER' ? 'user' : 'ai',
      content: chat.message,
      similarCases: [],
      similarLaws: [],
      timestamp: new Date(chat.createdAt).getTime(),
    });
    return acc;
  }, []);
}

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
