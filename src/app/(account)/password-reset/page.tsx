'use client';

import AccountButton from '@/components/features/account/AccountButton';
import AccountInput from '@/components/features/account/AccountInput';
import { useState } from 'react';

function Page() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    // 현재 비밀번호 확인 로직
    e.preventDefault();
    console.log('현재 비밀번호 확인:', formData.currentPassword);
    setIsVerified(true);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    // 비밀번호 재설정 로직
    e.preventDefault();
    console.log('비밀번호 재설정:', formData.newPassword, formData.confirmPassword);
  };

  return (
    <div className="center-col">
      <div className="center-col">
        <h2 className="mb-2 text-4xl font-bold">👋 걱정마세요!</h2>
        <h3 className="mb-9 text-2xl break-keep text-center">
          지금부터 비밀번호를 다시 설정할 수 있도록 도와드릴게요.
        </h3>
      </div>

      {isVerified ? (
        <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handlePasswordReset}>
          <AccountInput
            name="newPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          <AccountInput
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <AccountButton type="submit">비밀번호 재설정</AccountButton>
        </form>
      ) : (
        <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handleVerifyPassword}>
          <AccountInput
            name="currentPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.currentPassword}
            onChange={handleInputChange}
          />
          <AccountButton type="submit">인증하기</AccountButton>
        </form>
      )}
    </div>
  );
}

export default Page;
