'use client';
import AccountButton from '@/components/ui/account/AccountButton';
import AccountInput from '@/components/ui/account/AccountInput';
import Link from 'next/link';
import { useState } from 'react';

function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="w-[420px] center-col">
      <h2 className="text-4xl font-bold mb-2">👋 안녕하세요!</h2>
      <h3 className="text-2xl mb-9">다시 만나게 되어서 반가워요!</h3>

      <form className="w-full center-col gap-8 mb-[30px]">
        <div className="w-full flex flex-col gap-6">
          <AccountInput type="text" placeholder="이메일을 입력해주세요." onChange={setEmail} />
          <AccountInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={setPassword}
          />
        </div>
        <AccountButton type="submit">로그인</AccountButton>
      </form>

      <div className="flex items-center w-full gap-2 mb-3">
        <div className="flex-1 h-[1px] bg-[#7b7b7b]"></div>
        <p className="text-[#7b7b7b] text-sm">간편 로그인</p>
        <div className="flex-1 h-[1px] bg-[#7b7b7b]"></div>
      </div>

      <div className="w-full flex gap-6 mb-6">
        <button className="flex-1 h-13 bg-[#03C75A] px-[35px] rounded-sm">네이버 로그인</button>
        <button className="flex-1 h-13 bg-[#FEE500] px-[35px] rounded-sm">카카오 로그인</button>
      </div>

      <Link href={''} className="text-[#7b7b7b] underline underline-offset-4 mb-6">
        혹시 계정이 기억나지 않으신가요?
      </Link>
      <Link href={'sign-up'} className="text-[#7b7b7b] underline underline-offset-4">
        회원가입 하러가기
      </Link>
    </div>
  );
}
export default Page;
