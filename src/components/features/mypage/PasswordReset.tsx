import Lock from '@/assets/icons/lock.svg';

import ArrowRight from '@/assets/icons/arrowRight.svg';
import Link from 'next/link';

function PasswordReset() {
  return (
    <section className="bg-[#406EB7]/40 dark:bg-[#121212] w-[80%] rounded-3xl shadow-[5px_5px_4px_0_rgba(0,0,0,0.25)] p-8 flex flex-col gap-3 text-brand-primary dark:text-primary-white">
      <h2 className="font-medium text-[28px]">비밀번호 변경</h2>
      <Link href={'/password-reset'}>
        <div className="flex h-15 rounded-2xl items-center gap-4 hover:bg-primary-white dark:hover:bg-primary-gray2">
          <div className="rounded-[50%] bg-[#406EB7] dark:bg-[#181A1B] w-12 h-12 center-col ml-3">
            <Lock className="text-primary-black dark:text-brand-accent w-8 h-8" />
          </div>
          <div className="font-medium text-base flex-1">
            <p>현재 비밀번호를 안전하게 변경할 수 있어요.</p>
          </div>
          <ArrowRight className="w-10 h-10 text-brand-primary dark:text-brand-accent mr-3" />
        </div>
      </Link>
    </section>
  );
}
export default PasswordReset;
