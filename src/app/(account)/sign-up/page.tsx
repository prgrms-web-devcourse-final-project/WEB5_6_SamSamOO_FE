import AuthHeader from '@/components/features/account/AuthHeader';
import DividerWithText from '@/components/features/account/DividerWithText';
import SignupForm from '@/components/forms/SignUpForm';

function Page() {
  return (
    <div className="center-col">
      <AuthHeader title="👋 환영합니다!" subtitle="지금부터 바로가 든든한 동반자가 되어드릴게요!" />

      <SignupForm />

      <DividerWithText text="간편 회원가입" />

      <div className="mb-6 flex w-full gap-6">
        <button
          type="button"
          className="h-13 flex-1 rounded-sm bg-[#03C75A] px-9 dark:text-primary-black"
        >
          네이버 로그인
        </button>
        <button
          type="button"
          className="h-13 flex-1 rounded-sm bg-[#FEE500] px-9 dark:text-primary-black"
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
}

export default Page;
