interface Props {
  text: string;
}

function DividerWithText({ text }: Props) {
  return (
    <div className="flex items-center w-full gap-2 mb-3">
      <div className="flex-1 h-[1px] bg-[#7b7b7b] dark:bg-primary-white" />
      <p className="text-[#7b7b7b] text-sm dark:text-primary-white">{text}</p>
      <div className="flex-1 h-[1px] bg-[#7b7b7b] dark:bg-primary-white" />
    </div>
  );
}

export default DividerWithText;
