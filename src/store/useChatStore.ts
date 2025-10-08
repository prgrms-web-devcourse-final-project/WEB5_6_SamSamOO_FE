import { postExistingChat, postNewChat } from '@/api/chat/chatBot';
import { Message } from '@/types/chat';
import { SimilarCase, SimilarLaw } from '@/types/chatBot';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AddMessageParams {
  role: 'user' | 'ai';
  content: string;
  similarCases?: SimilarCase[];
  similarLaws?: SimilarLaw[];
}

interface ChatState {
  roomId: string | null;
  messages: Message[];
  isLoading: boolean;
  setRoomId: (roomId: string) => void;
  addMessage: (params: AddMessageParams) => void;
  sendMessage: (content: string) => Promise<void>;
  setChatHistory: (convertMessage: Message[]) => void;
  resetStore: () => void; // 전체 초기화
  setLoading: (isLoading: boolean) => void;
}

const initialState = {
  roomId: null,
  messages: [],
  isLoading: false,
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setRoomId: (roomId) => {
        set({ roomId });
      },

      addMessage: ({ role, content, similarCases, similarLaws }) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              role,
              content,
              similarCases,
              similarLaws,
              timestamp: Date.now(),
              isPending: true,
            },
          ],
        })),

      sendMessage: async () => {
        const { roomId, setRoomId, setLoading, isLoading, messages } = get();
        if (isLoading) return;

        const lastMessages = messages[messages.length - 1];

        try {
          setLoading(true);
          if (!roomId) {
            const res = await postNewChat(lastMessages.content);

            if (!res) return;

            // roomId 저장
            setRoomId(String(res[0].roomId));

            // AI 응답 추가
            set((state) => ({
              messages: [
                ...state.messages.map((msg) =>
                  msg.id === lastMessages.id ? { ...msg, ispading: false } : msg,
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
          } else {
            const response = await postExistingChat(lastMessages.content, roomId);
            if (!response) return;

            // AI 응답 추가
            set((state) => ({
              messages: [
                ...state.messages.map((msg) =>
                  msg.id === lastMessages.id ? { ...msg, ispading: false } : msg,
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
      setChatHistory: (convertMessage: Message[]) => {
        set({ messages: convertMessage });
      },
      resetStore: () => set(initialState),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        roomId: state.roomId,
        messages: state.messages,
      }),
    },
  ),
);
