import type { Metadata } from 'next';
import FindAccountPageClient from '../../../components/features/account/FindAccountPageClient';

export const metadata: Metadata = {
  title: '바로 | 계정 찾기',
  description: '바로 BaLaw 계정 찾기 페이지입니다',
  robots: { index: false, follow: false },
};

function Page() {
  return <FindAccountPageClient />;
}

export default Page;
