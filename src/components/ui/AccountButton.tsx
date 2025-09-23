interface Props {
  children: string;
  type: 'submit' | 'button';
}

function AccountButton({ children, type }: Props) {
  return (
    <button
      className="w-[420px] h-13 bg-primary rounded-full text-text-white text-xl font-bold"
      type={type}
    >
      {children}
    </button>
  );
}
export default AccountButton;
