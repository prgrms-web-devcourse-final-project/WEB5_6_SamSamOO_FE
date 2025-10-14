import type { Metadata } from 'next';
import PasswordResetPageClient from '../../../components/features/account/PasswordResetPageClient';

export const metadata: Metadata = {
  title: '바로 | 비밀번호 재설정',
  description: '바로 BaLaw 비밀번호 재설정 페이지입니다',
  robots: { index: false, follow: false },
};

function Page() {
  return <PasswordResetPageClient />;
}

export default Page;
