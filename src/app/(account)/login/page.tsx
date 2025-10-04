import LoginForm from '@/components/forms/LoginForm';
import DividerWithText from '@/components/features/account/DividerWithText';
import Link from 'next/link';
import AuthHeader from '@/components/features/account/AuthHeader';
import Oauth from '@/components/features/account/Oauth';

function Page() {
  return (
    <div className="w-[420px] center-col">
      <AuthHeader title="👋 안녕하세요!" subtitle="다시 만나게 되어서 반가워요!" />

      <LoginForm />

      <DividerWithText text="간편 로그인" />

      <Oauth mode="login" />

      <Link
        href="find-account"
        className="text-[#7b7b7b] underline underline-offset-4 mb-6 dark:text-primary-white"
      >
        혹시 계정이 기억나지 않으신가요?
      </Link>
      <Link
        href="sign-up"
        className="text-[#7b7b7b] underline underline-offset-4 dark:text-primary-white"
      >
        회원가입 하러가기
      </Link>
    </div>
  );
}

export default Page;
