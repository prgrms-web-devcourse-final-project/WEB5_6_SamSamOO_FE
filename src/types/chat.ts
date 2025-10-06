import { SimilarCase, SimilarLaw } from './chatBot';

export type ChatHistoryList = {
  historyRoomId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}[];

export type ChatHistory = {
  historyRoomId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  similarCases?: SimilarCase[];
  similarLaws?: SimilarLaw[];
  timestamp: number;
  isPending?: boolean;
};
