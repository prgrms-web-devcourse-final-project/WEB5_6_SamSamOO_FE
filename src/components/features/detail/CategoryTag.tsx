import tw from '@/utils/tw';

interface Props {
  text: string;
  className?: string;
  hidden?: boolean;
}

function CategoryTag({ text, className, hidden = false }: Props) {
  return (
    <span
      hidden={hidden}
      className={tw(
        'border-4 border-brand-accent rounded-3xl px-4 py-1 text-brand-accent font-extrabold text-2xl',
        className,
      )}
    >
      {text}
    </span>
  );
}
export default CategoryTag;
