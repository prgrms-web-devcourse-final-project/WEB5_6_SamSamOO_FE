import AuthHeader from '@/components/features/account/AuthHeader';
import DividerWithText from '@/components/features/account/DividerWithText';
import Oauth from '@/components/features/account/Oauth';
import SignupForm from '@/components/forms/SignUpForm';

function Page() {
  return (
    <div
      className="
        w-full max-w-[420px] px-6
        center-col
        sm:px-0
      "
    >
      <AuthHeader title="👋 환영합니다!" subtitle="지금부터 바로가 든든한 동반자가 되어드릴게요!" />

      <SignupForm />

      <DividerWithText text="간편 회원가입" />

      <Oauth mode="signup" />
    </div>
  );
}

export default Page;
