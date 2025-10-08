import { ReactNode } from 'react';
import { getSession } from '@/utils/getSession';
import UserProvider from '@/components/provider/UserProvider';

export default async function ServerUserProvider({ children }: { children: ReactNode }) {
  const session = await getSession();

  return <UserProvider initialSession={session}>{children}</UserProvider>;
}
