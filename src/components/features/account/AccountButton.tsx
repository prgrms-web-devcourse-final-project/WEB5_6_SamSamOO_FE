import tw from '@/utils/tw';

interface Props {
  children: string;
  type: 'submit' | 'button';
}

export const STYLE = tw(
  'w-full h-13 rounded-full text-xl font-bold',

  'bg-primary text-primary-white',

  'dark:bg-accent',
);

function AccountButton({ children, type }: Props) {
  return (
    <button className={STYLE} type={type}>
      {children}
    </button>
  );
}
export default AccountButton;
