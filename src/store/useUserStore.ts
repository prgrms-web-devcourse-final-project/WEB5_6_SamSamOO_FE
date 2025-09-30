import { create } from 'zustand';
import { User } from '@/types/User';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

/**
 * 전역 유저 상태를 관리하는 zustand store
 *
 * - `user`: 로그인된 유저 프로필 정보. 로그인 안 되어 있으면 `null`
 * - `setUser(user)`: 유저 정보를 업데이트 (로그인 직후, 프로필 수정 등에서 사용)
 * - `clearUser()`: 유저 정보를 초기화 (로그아웃 시 사용)
 *
 * @example
 * // 유저 상태 구독
 * const user = useUserStore((state) => state.user);
 *
 * // 유저 정보 업데이트
 * const setUser = useUserStore((state) => state.setUser);
 * setUser({ id: 1, name: "홍길동", ... });
 *
 * // 로그아웃 처리
 * const clearUser = useUserStore((state) => state.clearUser);
 * clearUser();
 */
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set({ user: null }),
}));
