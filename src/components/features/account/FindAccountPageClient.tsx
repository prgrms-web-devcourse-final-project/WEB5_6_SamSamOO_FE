'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/features/account/AuthHeader';
import VerifyEmailForm from '@/components/forms/VerifyEmailForm';
import PasswordResetForm from '@/components/forms/PasswordResetForm';
import { showSuccessToast } from '@/utils/showToast';

export default function FindAccountPageClient() {
  const router = useRouter();
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  return (
    <div className="center-col w-full max-w-[420px] px-6 sm:px-0">
      <AuthHeader
        title="계정을 확인해볼게요!"
        subtitle="잠시만 기다리시면 계정을 다시 찾을 수 있게 도와드릴게요!"
      />

      {verifiedEmail ? (
        <PasswordResetForm
          email={verifiedEmail}
          onSuccess={() => {
            showSuccessToast('비밀번호 재설정 완료! \n다시 로그인해 주세요.');
            router.replace('/');
          }}
        />
      ) : (
        <VerifyEmailForm onVerified={(email) => setVerifiedEmail(email)} />
      )}
    </div>
  );
}
