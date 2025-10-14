interface Props {
  title: string;
  subtitle: string;
}

function AuthHeader({ title, subtitle }: Props) {
  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center">{title}</h2>
      <h3 className="text-lg sm:text-2xl mb-9 break-keep text-center">{subtitle}</h3>
    </>
  );
}

export default AuthHeader;
