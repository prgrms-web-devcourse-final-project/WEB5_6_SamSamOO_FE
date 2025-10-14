import MemberWithdrawal from '@/components/features/mypage/MemberWithdrawal';
import PasswordReset from '@/components/features/mypage/PasswordReset';
import LoginStateProvider from '@/components/provider/LoginStateProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로 | 마이페이지',
  description: '바로 BaLaw 마이 페이지입니다',
  robots: { index: false, follow: false },
};

function page() {
  return (
    <LoginStateProvider>
      <article className="w-[90%] lg:w-full m-auto min-h-[calc(100vh-120px)] center-row">
        <h2 className="a11y">마이페이지</h2>
        <div className="w-[80%] max-w-[1200px] h-[720px] bg-[#F5F5F5] dark:bg-[#181A1B] flex-1 shadow-ai-floating rounded-3xl center-col gap-8">
          <div className="w-[80%]">
            <h2 className="font-extrabold md:text-4xl text-2xl text-brand-primary dark:text-primary-white">
              마이페이지
            </h2>
          </div>
          <hr className="w-[80%] border-2 border-[#BFBFBF] rounded-2xl " />
          <PasswordReset />
          <MemberWithdrawal />
        </div>
      </article>
    </LoginStateProvider>
  );
}
export default page;
