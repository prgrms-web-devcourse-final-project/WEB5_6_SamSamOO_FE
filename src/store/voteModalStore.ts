'use client';
import { create } from 'zustand';

interface VoteModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useVoteModalStore = create<VoteModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
