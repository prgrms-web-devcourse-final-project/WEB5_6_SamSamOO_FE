import tw from '@/utils/tw';

interface Props {
  children: string;
  type: 'submit' | 'button';
  onClick?: () => void;
}

export const STYLE = tw(
  'w-full h-13 rounded-full text-xl font-bold',

  'bg-brand-primary text-primary-white',

  'dark:bg-brand-accent',
);

function AccountButton({ children, type, onClick }: Props) {
  return (
    <button className={STYLE} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
export default AccountButton;
