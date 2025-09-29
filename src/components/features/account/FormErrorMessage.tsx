interface Props {
  message: string | null;
}

function FormErrorMessage({ message }: Props) {
  return <div className="mb-2">{message && <p className="text-red-500 text-sm">{message}</p>}</div>;
}

export default FormErrorMessage;
