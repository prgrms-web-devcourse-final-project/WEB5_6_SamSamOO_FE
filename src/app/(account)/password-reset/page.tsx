'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/features/account/AuthHeader';
import VerifyPasswordForm from '@/components/forms/VerifyPasswordForm';
import PasswordResetForm from '@/components/forms/PasswordResetForm';
import { showSuccessToast } from '@/utils/showToast';
import { useUserStore } from '@/store/useUserStore';

export default function Page() {
  const router = useRouter();
  const clearSession = useUserStore((state) => state.clearSession);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  return (
    <div className="center-col w-full max-w-[420px] px-5 sm:px-0">
      <AuthHeader
        title="비밀번호를 확인할게요!"
        subtitle="설정한 비밀번호를 다시 한 번 확인해 드릴게요."
      />

      {verifiedEmail ? (
        <PasswordResetForm
          email={verifiedEmail}
          onSuccess={() => {
            clearSession();
            showSuccessToast('비밀번호 변경 완료! 다시 로그인해 주세요.');
            router.replace('/');
          }}
        />
      ) : (
        <VerifyPasswordForm
          onVerified={(email) => {
            setVerifiedEmail(email);
          }}
        />
      )}
    </div>
  );
}
