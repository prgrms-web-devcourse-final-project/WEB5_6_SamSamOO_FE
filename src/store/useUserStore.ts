import { create } from 'zustand';
import { SessionSnapshot } from '@/types/Session';
import { User } from '@/types/User';

interface UserState extends SessionSnapshot {
  setSession: (session: SessionSnapshot) => void;
  updateUser: (user: User | null) => void;
  clearSession: () => void;
}

/**
 * 전역 유저 세션 상태를 관리하는 zustand store.
 *
 * - `isAuthenticated`: 현재 사용자가 로그인 상태인지 여부.
 * - `user`: 로그인/회원가입 응답에서 확보한 사용자 프로필.
 * - `setSession(session)`: SSR/CSR에서 계산한 세션 스냅샷을 반영.
 * - `updateUser(user)`: 클라이언트 전용 프로필 갱신. 값이 존재하면 자동으로 로그인 상태로 간주.
 * - `clearSession()`: 로그아웃 처리. 세션 정보를 모두 초기화.
 */
export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  user: null,
  setSession: ({ isAuthenticated, user }) => set(() => ({ isAuthenticated, user })),
  updateUser: (user) => set(() => ({ user, isAuthenticated: !!user })),
  clearSession: () => set({ user: null, isAuthenticated: false }),
}));
