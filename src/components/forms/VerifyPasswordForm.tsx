'use client';

import { useState } from 'react';
import AccountInput from '@/components/features/account/AccountInput';
import AccountButton from '@/components/features/account/AccountButton';
import FormErrorMessage from '@/components/features/account/FormErrorMessage';
import { verifyPassword } from '@/api/account/verifyPassword';

interface Props {
  onVerified: (email: string) => void;
}

export default function VerifyPasswordForm({ onVerified }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!password.trim()) return '현재 비밀번호를 입력해주세요.';
    if (password.length < 4 || password.length > 16) {
      return '비밀번호는 4자 이상 16자 이하로 입력해주세요.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await verifyPassword({ password });
      if (res.success) {
        setError(null);
        onVerified(res.email);
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <form
      className="center-col mb-10 w-full max-w-[420px] gap-7 px-5 sm:px-0"
      onSubmit={handleSubmit}
    >
      <AccountInput
        name="currentPassword"
        type="password"
        placeholder="현재 비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="center-col w-full gap-3">
        <FormErrorMessage message={error} />
        <AccountButton type="submit">확인하기</AccountButton>
      </div>
    </form>
  );
}
