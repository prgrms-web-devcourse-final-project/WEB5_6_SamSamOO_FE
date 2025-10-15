import LoginForm from '@/components/forms/LoginForm';
import DividerWithText from '@/components/features/account/DividerWithText';
import Link from 'next/link';
import AuthHeader from '@/components/features/account/AuthHeader';
import Oauth from '@/components/features/account/Oauth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로 | 로그인',
  description: '바로 BaLaw 로그인 페이지입니다',
  robots: { index: false, follow: false },
};

async function Page() {
  return (
    <div
      className="
        w-full max-w-[420px] px-6
        center-col
        sm:px-0
      "
    >
      <AuthHeader title="👋 안녕하세요!" subtitle="다시 만나게 되어서 반가워요!" />

      <LoginForm />

      <DividerWithText text="간편 로그인" />

      <Oauth mode="login" />

      <div className="flex flex-col items-center gap-2 text-center mt-4">
        <Link
          href="find-account"
          className="text-sm sm:text-base text-[#7b7b7b] underline underline-offset-4 dark:text-primary-white"
        >
          혹시 계정이 기억나지 않으신가요?
        </Link>
        <Link
          href="sign-up"
          className="text-sm sm:text-base text-[#7b7b7b] underline underline-offset-4 dark:text-primary-white"
        >
          회원가입 하러가기
        </Link>
      </div>
    </div>
  );
}

export default Page;
