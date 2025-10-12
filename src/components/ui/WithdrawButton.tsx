'use client';

import { withdraw } from '@/api/account/withdraw';
import ConfirmAlert from './ConfirmAlert';
import { showErrorToast, showInfoToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useChatStore } from '@/store/useChatStore';
import { useAlertStore } from '@/store/useAlertStore';

function WithdrawButton() {
  const showAlert = useAlertStore((s) => s.showAlert);
  const router = useRouter();
  const clearSession = useUserStore((state) => state.clearSession);
  const resetStore = useChatStore((state) => state.resetStore);

  const handleWithdraw = async () => {
    showAlert('회원탈퇴', '정말 탈퇴하시겠습니까? 회원정보는 복구되지 않습니다.', () => {
      userWithDraw();
    });
  };

  const userWithDraw = async () => {
    const res = await withdraw();
    if (res) {
      showInfoToast('탈퇴되었습니다.');
      clearSession();
      resetStore();
      router.push('/');
    } else {
      showErrorToast('회원 탈퇴를 실패하였습니다.');
    }
  };
  return (
    <>
      <button
        type="button"
        className="w-full h-15 rounded-2xl bg-[#A93636]/20 dark:bg-[#121212] text-[#A93636] border border-[#A93636] center-row"
        onClick={handleWithdraw}
      >
        <p className="md:text-2xl text-xl font-bold">회원 탈퇴</p>
      </button>
      <ConfirmAlert />
    </>
  );
}
export default WithdrawButton;
