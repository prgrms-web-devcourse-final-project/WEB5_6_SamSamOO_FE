'use client';

import AccountButton from '@/components/features/account/AccountButton';
import AccountInput from '@/components/features/account/AccountInput';
import { useState } from 'react';

function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <div className="center-col">
      <div className="center-col">
        <h2 className="mb-2 text-4xl font-bold">👋 걱정마세요!</h2>
        <h3 className="mb-9 text-2xl break-keep text-center">
          지금부터 비밀번호를 다시 설정할 수 있도록 도와드릴게요.
        </h3>
      </div>

      {isVerified ? (
        <form className="center-col mb-10 w-[420px] gap-7">
          <AccountInput type="password" placeholder="비밀번호를 입력해주세요" />
          <AccountInput type="password" placeholder="비밀번호를 다시 입력해주세요" />
          <AccountButton type="submit">비밀번호 재설정</AccountButton>
        </form>
      ) : (
        <form className="center-col mb-10 w-[420px] gap-7">
          <AccountInput type="password" placeholder="비밀번호를 입력해주세요" />
          <AccountButton type="submit">인증하기</AccountButton>
        </form>
      )}
    </div>
  );
}
export default Page;
