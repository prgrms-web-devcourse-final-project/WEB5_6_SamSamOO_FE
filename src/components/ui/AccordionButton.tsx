import tw from '@/utils/tw';
import Accordion from '@/assets/icons/accordion.svg';

interface Props {
  isOpen: boolean;
  onChange: () => void;
  className?: string;
}

function AccordionButton({ isOpen, onChange, className }: Props) {
  return (
    <button
      onClick={onChange}
      className={tw('p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg', className)}
    >
      <div className={`${isOpen ? 'rotate-180' : 'rotate-0'} duration-300`}>
        <Accordion className="text-primary-black dark:text-primary-white" />
      </div>
    </button>
  );
}
export default AccordionButton;
