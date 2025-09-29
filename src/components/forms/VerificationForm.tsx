'use client';

import { useState } from 'react';
import AccountInput from '@/components/features/account/AccountInput';
import AccountButton from '@/components/features/account/AccountButton';
import FormErrorMessage from '@/components/features/account/FormErrorMessage';
import { sendEmail } from '@/api/sendEmailApi';
import { verifyEmail } from '@/api/verifyEmailApi';
import CooldownButton from '../features/account/CooldownButton';

interface VerificationFormProps {
  onVerified: (email: string) => void;
}

export default function VerificationForm({ onVerified }: VerificationFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendVerification = async () => {
    if (!formData.email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('유효한 이메일을 입력해주세요.');
      return;
    }

    try {
      await sendEmail({ email: formData.email });
      setError(null);
      alert('인증 메일을 발송했습니다.');
    } catch {
      setError('인증 메일 발송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verificationCode.trim()) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    try {
      const res = await verifyEmail({
        email: formData.email,
        verificationCode: formData.verificationCode,
      });

      if (res.success) {
        setError(null);
        onVerified(formData.email);
      } else {
        setError('인증번호가 올바르지 않습니다.');
      }
    } catch {
      setError('인증번호 확인에 실패했습니다.');
    }
  };

  return (
    <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handleVerifyCode}>
      <AccountInput
        name="email"
        type="text"
        placeholder="이메일을 입력해주세요"
        value={formData.email}
        onChange={handleInputChange}
      />
      <CooldownButton onClick={handleSendVerification} />
      <AccountInput
        name="verificationCode"
        type="text"
        placeholder="인증번호를 입력해주세요"
        value={formData.verificationCode}
        onChange={handleInputChange}
      />
      <div className="w-full center-col">
        <FormErrorMessage message={error} />
        <AccountButton type="submit">인증하기</AccountButton>
      </div>
    </form>
  );
}
