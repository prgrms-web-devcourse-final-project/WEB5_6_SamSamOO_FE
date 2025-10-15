'use client';
import { create } from 'zustand';

export type VoteModalMode = 'create' | 'edit';

export interface VoteFormData {
  category: string;
  title: string;
  content: string;
  option1: string;
  option2: string;
  reservedCloseAt: string;
}

export interface VoteDraft extends VoteFormData {
  postId: number;
  pollId: number;
}

interface VoteModalState {
  isOpen: boolean;
  mode: VoteModalMode;
  draft?: VoteDraft;
  openCreate: () => void;
  openEdit: (draft: VoteDraft) => void;
  close: () => void;
}

export const useVoteModalStore = create<VoteModalState>((set) => ({
  isOpen: false,
  mode: 'create',
  draft: undefined,

  openCreate: () => set({ isOpen: true, mode: 'create', draft: undefined }),

  openEdit: (draft) => set({ isOpen: true, mode: 'edit', draft }),

  close: () => set({ isOpen: false, mode: 'create', draft: undefined }),
}));
