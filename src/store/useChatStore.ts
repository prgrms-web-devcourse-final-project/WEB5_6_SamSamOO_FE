import { postExistingChat, postNewChat } from '@/api/chat/chatBot';
import { Message } from '@/types/chat';
import { SimilarCase, SimilarLaw } from '@/types/chatBot';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';

interface AddMessageParams {
  id: string;
  role: 'user' | 'ai';
  content: string;
  similarCases?: SimilarCase[];
  similarLaws?: SimilarLaw[];
  isPending: boolean;
}

interface ChatState {
  roomId: string | null;
  messages: Message[];
  isLoading: boolean;
  isReset: boolean;
  setRoomId: (roomId: string) => void;
  addMessage: (params: AddMessageParams) => void;
  sendNewMessage: (input: string, router?: ReturnType<typeof useRouter>) => void;
  sendExistMessage: (input: string) => void;
  setChatHistory: (convertMessage: Message[], roomId: string) => void;
  resetStore: (callBack?: () => void) => void; // 전체 초기화
  setLoading: (isLoading: boolean) => void;
}

const initialState = {
  roomId: null,
  messages: [],
  isLoading: false,
  isReset: false,
};

export const useChatStore = create<ChatState>()((set, get) => ({
  ...initialState,

  setRoomId: (roomId) => {
    set({ roomId });
  },

  addMessage: ({ id, role, content, similarCases, similarLaws, isPending }) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id,
          role,
          content,
          similarCases,
          similarLaws,
          timestamp: Date.now(),
          isPending,
        },
      ],
    })),
  sendNewMessage: async (input: string, router) => {
    const { roomId, setLoading, addMessage, isLoading } = get();
    if (isLoading) return;

    const data: AddMessageParams = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      isPending: true,
    };

    addMessage(data);

    try {
      setLoading(true);
      if (!roomId) {
        const res = await postNewChat(data.content);
        if (!res) return;

        // AI 응답 추가
        set((state) => ({
          roomId: String(res[0].roomId),
          messages: [
            ...state.messages.map((msg) =>
              msg.id === data.id ? { ...msg, isPending: false } : msg,
            ),
            {
              id: crypto.randomUUID(),
              role: 'ai',
              content: res[0].message,
              similarCases: res[0].similarCases || [],
              similarLaws: res[0].similarLaws || [],
              timestamp: Date.now(),
            },
          ],
        }));
        if (router) {
          router.replace(`/chat/${res[0].roomId}`);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  },
  sendExistMessage: async (input: string) => {
    const { roomId, setLoading, addMessage, isLoading } = get();
    if (isLoading) return;

    const data: AddMessageParams = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      isPending: true,
    };

    addMessage(data);

    try {
      setLoading(true);
      if (roomId) {
        const response = await postExistingChat(data.content, roomId);
        if (!response) return;

        // AI 응답 추가
        set((state) => ({
          messages: [
            ...state.messages.map((msg) =>
              msg.id === data.id ? { ...msg, isPending: false } : msg,
            ),
            {
              id: crypto.randomUUID(),
              role: 'ai',
              content: response[0].message,
              similarCases: response[0].similarCases || [],
              similarLaws: response[0].similarLaws || [],
              timestamp: Date.now(),
            },
          ],
        }));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  },
  setChatHistory: (convertMessage: Message[], roomId: string) => {
    set({ messages: convertMessage, roomId });
  },
  resetStore: (callBack) => {
    set({ ...initialState, isReset: true });
    if (callBack) callBack();
    setTimeout(() => set({ isReset: false }), 0);
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
