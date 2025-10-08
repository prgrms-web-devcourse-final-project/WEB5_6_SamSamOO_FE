import tw from '@/utils/tw';
import Image from 'next/image';

interface ScrollToBottomButtonProps {
  onClick: () => void;
  show: boolean;
}

function ScrollToBottomButton({ onClick, show }: ScrollToBottomButtonProps) {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[30%] right-[50%] z-50 hover:scale-110 active:scale-95"
      aria-label="맨 아래로 스크롤"
    >
      <Image
        className={tw('drop-shadow-[var(--shadow-floating)] rotate-180')}
        src="/icons/floatingUpButton.svg"
        width={40}
        height={40}
        alt="최상단"
      />
    </button>
  );
}
export default ScrollToBottomButton;
