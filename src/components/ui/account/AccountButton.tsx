interface Props {
  children: string;
  type: 'submit' | 'button';
}

function AccountButton({ children, type }: Props) {
  return (
    <button
      className="w-full h-13 bg-primary rounded-full text-primary-white text-xl font-bold"
      type={type}
    >
      {children}
    </button>
  );
}
export default AccountButton;
