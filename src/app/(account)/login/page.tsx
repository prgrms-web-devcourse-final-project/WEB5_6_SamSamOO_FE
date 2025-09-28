'use client';
import { login } from '@/api/loginApi';
import AccountButton from '@/components/features/account/AccountButton';
import AccountInput from '@/components/features/account/AccountInput';
import DividerWithText from '@/components/features/account/DividerWithText';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

function Page() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      console.log(response);
      setUser(response);
      router.replace('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="w-[420px] center-col">
      <h2 className="text-4xl font-bold mb-2">👋 안녕하세요!</h2>
      <h3 className="text-2xl mb-9 break-keep text-center">다시 만나게 되어서 반가워요!</h3>

      <form onSubmit={submitLoginForm} className="w-full center-col gap-8 mb-[30px]">
        <div className="w-full flex flex-col gap-6">
          <AccountInput
            name="email"
            placeholder="이메일 주소"
            type="text"
            value={formData.email}
            onChange={handleInputChange}
          />
          <AccountInput
            name="password"
            placeholder="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <AccountButton type="submit">로그인</AccountButton>
      </form>

      <DividerWithText text="간편 로그인" />

      <div className="w-full flex gap-6 mb-6">
        <button className="flex-1 h-13 bg-[#03C75A] px-[35px] rounded-sm">네이버 로그인</button>
        <button className="flex-1 h-13 bg-[#FEE500] px-[35px] rounded-sm">카카오 로그인</button>
      </div>

      <Link
        href={'find-account'}
        className="text-[#7b7b7b] underline underline-offset-4 mb-6 dark:text-primary-white"
      >
        혹시 계정이 기억나지 않으신가요?
      </Link>
      <Link
        href={'sign-up'}
        className="text-[#7b7b7b] underline underline-offset-4 dark:text-primary-white"
      >
        회원가입 하러가기
      </Link>
    </div>
  );
}
export default Page;
