'use client';
import Lock from '@/assets/icons/lock.svg';

import ArrowRight from '@/assets/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import { showErrorToast } from '@/utils/showToast';
import { useCheckLogin } from '@/hooks/useCheckLogin';

function PasswordReset() {
  const route = useRouter();
  useCheckLogin();
  const handlePassWordRoute = () => {
    const isSocial = sessionStorage.getItem('loginWay') === 'social';

    if (isSocial) {
      showErrorToast('소셜 로그인은 비밀번호 변경을 할 수 없습니다.');
      return;
    } else {
      route.replace('/password-reset');
      return;
    }
  };

  return (
    <section className="bg-[#406EB7]/40 dark:bg-[#121212] w-[80%] rounded-3xl shadow-[5px_5px_4px_0_rgba(0,0,0,0.25)] p-8 flex flex-col gap-3 text-brand-primary dark:text-primary-white">
      <h2 className="font-medium md:text-[28px] text-xl">비밀번호 변경</h2>
      <button type="button" onClick={handlePassWordRoute}>
        <div className="flex h-15 rounded-2xl items-center gap-4 hover:bg-primary-white dark:hover:bg-primary-gray2">
          <div className="rounded-[50%] bg-[#406EB7] dark:bg-[#181A1B] w-12 h-12 center-col ml-3">
            <Lock className="text-primary-black dark:text-brand-accent w-8 h-8" />
          </div>
          <div className="font-medium md:text-base text-sm flex-1">
            <p>현재 비밀번호를 안전하게 변경할 수 있어요.</p>
          </div>
          <ArrowRight className="w-10 h-10 text-brand-primary dark:text-brand-accent mr-3" />
        </div>
      </button>
    </section>
  );
}
export default PasswordReset;
