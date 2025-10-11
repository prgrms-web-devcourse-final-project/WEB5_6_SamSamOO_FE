import { create } from 'zustand';

type AlertState = {
  open: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  showAlert: (title: string, message: string, onConfirm?: () => void) => void;
  close: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  open: false,
  title: '',
  message: '',
  onConfirm: undefined,
  showAlert: (title, message, onConfirm) => set({ open: true, title, message, onConfirm }),
  close: () => set({ open: false, message: '', onConfirm: undefined }),
}));
