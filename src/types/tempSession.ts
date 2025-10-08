import { User } from '@/types/tempUser';

export interface SessionSnapshot {
  isAuthenticated: boolean;
  user: User | null;
}
