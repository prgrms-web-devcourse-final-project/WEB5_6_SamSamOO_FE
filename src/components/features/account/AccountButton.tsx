import tw from '@/utils/tw';

interface Props {
  children: string;
  type: 'submit' | 'button';
  onClick?: () => void;
}

export const STYLE = tw(
  'w-full h-13 rounded-full text-xl font-bold',

  'bg-primary text-primary-white',

  'dark:bg-accent',
);

function AccountButton({ children, type, onClick }: Props) {
  return (
    <button className={STYLE} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
export default AccountButton;
