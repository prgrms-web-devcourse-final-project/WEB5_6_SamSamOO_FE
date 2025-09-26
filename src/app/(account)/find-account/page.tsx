'use client';

import AccountButton from '@/components/features/account/AccountButton';
import AccountInput from '@/components/features/account/AccountInput';
import { useState } from 'react';

function Page() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerification = async () => {
    // 인증 메일 발송 로직
    console.log('인증 메일 발송:', formData.email);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    // 인증번호 확인 로직
    e.preventDefault();
    console.log('인증번호 확인:', formData.verificationCode);
    setIsVerified(true);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    // 비밀번호 재설정 로직
    e.preventDefault();
    console.log('비밀번호 재설정:', formData.password, formData.confirmPassword);
  };

  return (
    <div className="center-col">
      <div className="center-col">
        <h2 className="mb-2 text-4xl font-bold">👋 안심하세요!</h2>
        <h3 className="mb-9 text-2xl break-keep text-center">
          지금부터 계정을 다시 찾을 수 있도록 도와드릴게요!
        </h3>
      </div>

      {isVerified ? (
        <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handlePasswordReset}>
          <AccountInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
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
        <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handleVerifyCode}>
          <AccountInput
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={handleInputChange}
          />
          <AccountButton type="button" onClick={handleSendVerification}>
            인증 메일 발송
          </AccountButton>
          <AccountInput
            name="verificationCode"
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={formData.verificationCode}
            onChange={handleInputChange}
          />
          <AccountButton type="submit">인증하기</AccountButton>
        </form>
      )}
    </div>
  );
}

export default Page;
