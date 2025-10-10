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

export type ChatBotAnswer = {
  roomId: number;
  title: string;
  message: string;
  law: Laws;
  precedent: Precedent;
};

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  precedent?: Precedent;
  law?: Laws;
  timestamp: number;
  isPending?: boolean;
};

export type ChatInfo = {
  type: 'USER' | 'ASSISTANT';
  message: string;
  precedents: Precedent;
  laws: Laws;
  createdAt: string;
};

export type Precedent = {
  precedentContent: string;
  caseNumber: string;
  caseName: string;
};

export type Laws = {
  content: string;
  lawName: string;
};
