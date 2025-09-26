'use client';

import AccountButton from '@/components/features/account/AccountButton';
import AccountInput from '@/components/features/account/AccountInput';
import BirthdayInput from '@/components/features/account/BirthdayInput';
import DividerWithText from '@/components/features/account/DividerWithText';
import SelectGender from '@/components/features/account/SelectGender';
import { useState } from 'react';

function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthday: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: gender,
    }));
  };

  const handleBirthdayChange = (birthday: string) => {
    setFormData((prev) => ({
      ...prev,
      birthday: birthday,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직
    console.log('회원가입 데이터:', formData);
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 로직
    console.log('네이버 로그인');
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직
    console.log('카카오 로그인');
  };

  return (
    <div className="center-col">
      <div className="center-col">
        <h2 className="mb-2 text-4xl font-bold">👋 환영합니다!</h2>
        <h3 className="mb-9 text-2xl break-keep text-center">
          지금부터 바로가 든든한 동반자가 되어드릴게요!
        </h3>
      </div>

      <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handleSubmit}>
        <AccountInput
          name="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={handleInputChange}
        />
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

        <div className="center-row w-full gap-7">
          <SelectGender className="flex-1" value={formData.gender} onChange={handleGenderChange} />
          <BirthdayInput value={formData.birthday} onChange={handleBirthdayChange} />
        </div>

        <AccountButton type="submit">회원가입</AccountButton>
      </form>

      <DividerWithText text="간편 회원가입" />

      <div className="mb-6 flex w-full gap-6">
        <button
          type="button"
          onClick={handleNaverLogin}
          className="h-13 flex-1 rounded-sm bg-[#03C75A] px-9 dark:text-primary-black"
        >
          네이버 로그인
        </button>
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="h-13 flex-1 rounded-sm bg-[#FEE500] px-9 dark:text-primary-black"
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
}

export default Page;
