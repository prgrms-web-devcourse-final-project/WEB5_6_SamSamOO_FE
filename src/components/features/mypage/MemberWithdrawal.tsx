'use client';

import { withdraw } from '@/api/account/withdraw';
import Warning from '@/assets/icons/warning.svg';

function MemberWithdrawal() {
  const handleWithdraw = async () => {
    await withdraw();
  };

  return (
    <section className="w-[80%] bg-background-white dark:bg-[#121212] rounded-3xl shadow-[5px_5px_4px_0_rgba(0,0,0,0.25)] p-8 flex flex-col gap-10 text-[#A93636] dark:text-[#A72E30]">
      <div className="flex items-center gap-2">
        <Warning className="w-8 h-8" />
        <p className="font-semibold md:text-base text-sm">
          계정을 탈퇴하면 되돌릴 수 없습니다. 신중히 선택해주세요.
        </p>
      </div>
      <button
        type="button"
        className="w-full h-15 rounded-2xl bg-[#A93636]/20 dark:bg-[#121212] text-[#A93636] border border-[#A93636] center-row"
        onClick={handleWithdraw}
      >
        <p className="md:text-2xl text-xl font-bold">회원 탈퇴</p>
      </button>
    </section>
  );
}
export default MemberWithdrawal;
