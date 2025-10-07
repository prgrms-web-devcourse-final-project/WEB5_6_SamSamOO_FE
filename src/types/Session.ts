import { User } from '@/types/User';

export interface SessionSnapshot {
  isAuthenticated: boolean;
  user: User | null;
}
