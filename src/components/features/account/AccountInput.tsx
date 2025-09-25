import tw from '@/utils/tw';

interface Props {
  placeholder: string;
  type: 'text' | 'password';
  onChange?: (value: string) => void;
}

export const STYLE = tw(
  'h-13 w-full rounded-full px-6 outline-none',
  'bg-[#F4F4F4] placeholder-primary-black shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.3)]',

  'dark:caret-primary-black',
);

function AccountInput({ placeholder, type, onChange }: Props) {
  return (
    <input
      className={STYLE}
      type={type}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
  );
}
export default AccountInput;
