import tw from '@/utils/tw';
import CloseIcon from '@/assets/icons/close.svg';
interface Props {
  onClose: () => void;
  className?: string;
}

function CloseButton({ onClose, className }: Props) {
  return (
    <button className={tw('absolute right-2 top-2 w-5 h-5', className)} onClick={onClose}>
      <CloseIcon className="text-brand-primary dark:text-primary-white" />
    </button>
  );
}
export default CloseButton;
