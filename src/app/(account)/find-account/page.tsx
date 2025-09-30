'use client';

import { useState } from 'react';
import VerifyEmailForm from '@/components/forms/VerifyEmailForm';
import PasswordResetForm from '@/components/forms/PasswordResetForm';
import AuthHeader from '@/components/features/account/AuthHeader';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  return (
    <div className="center-col">
      <AuthHeader
        title="👋 안심하세요!"
        subtitle="지금부터 계정을 다시 찾을 수 있도록 도와드릴게요!"
      />

      {verifiedEmail ? (
        <PasswordResetForm
          email={verifiedEmail}
          onSuccess={() => {
            console.log('비밀번호 재설정 완료, 로그인 페이지로 이동');
            router.replace('/');
          }}
        />
      ) : (
        <VerifyEmailForm onVerified={(email) => setVerifiedEmail(email)} />
      )}
    </div>
  );
}

export default Page;
