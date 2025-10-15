import { User } from '@/types/user';

export interface SessionSnapshot {
  isAuthenticated: boolean;
  user: User | null;
  isLoading?: boolean;
}
