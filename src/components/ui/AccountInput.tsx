interface Props {
  placeholder: string;
  type: 'text' | 'password';
  onChange?: (value: string) => void;
}

function AccountInput({ placeholder, type, onChange }: Props) {
  return (
    <input
      className="h-13 w-full rounded-full bg-[#F4F4F4] placeholder-primary-black px-6 py-4 shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.3)] outline-none"
      type={type}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
  );
}
export default AccountInput;
