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
        'border-4 border-brand-accent rounded-3xl px-3 py-0.5 text-brand-accent font-extrabold text-xl',
        className,
      )}
    >
      {text}
    </span>
  );
}
export default CategoryTag;
