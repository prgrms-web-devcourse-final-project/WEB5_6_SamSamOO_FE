import LoginForm from '@/components/forms/LoginForm';
import DividerWithText from '@/components/features/account/DividerWithText';
import Link from 'next/link';
import AuthHeader from '@/components/features/account/AuthHeader';

function Page() {
  return (
    <div className="w-[420px] center-col">
      <AuthHeader title="👋 안녕하세요!" subtitle="다시 만나게 되어서 반가워요!" />

      <LoginForm />

      <DividerWithText text="간편 로그인" />

      <div className="w-full flex gap-6 mb-6">
        <button className="flex-1 h-13 bg-[#03C75A] px-[35px] rounded-sm">네이버 로그인</button>
        <button className="flex-1 h-13 bg-[#FEE500] px-[35px] rounded-sm">카카오 로그인</button>
      </div>

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
