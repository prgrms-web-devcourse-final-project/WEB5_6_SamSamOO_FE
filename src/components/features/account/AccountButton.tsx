import tw from '@/utils/tw';

interface Props {
  children: string;
  type: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
}

export const STYLE = tw(
  // 크기 & 폰트
  'w-full h-12 sm:h-13 rounded-full text-lg sm:text-xl font-bold',

  // 색상
  'bg-brand-primary text-primary-white',
  'dark:bg-brand-accent',

  // 시각 효과
  'transition-all hover:brightness-95 active:scale-[0.98]',
);

function AccountButton({ children, type, onClick, className = '' }: Props) {
  return (
    <button className={`${STYLE} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
export default AccountButton;
