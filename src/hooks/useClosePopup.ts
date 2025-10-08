import { RefObject, useEffect } from 'react';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  ref?: RefObject<HTMLElement | null>;
  ignoreSelectors?: string[];
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  hiddenOverflow?: boolean;
}

function useClosePopup({
  onClose,
  isOpen,
  ref,
  ignoreSelectors,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  hiddenOverflow = true,
}: Props) {
  useEffect(() => {
    if (!isOpen || !hiddenOverflow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen, hiddenOverflow]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleClick = (e: MouseEvent) => {
      if (!closeOnOutsideClick) return;
      const target = e.target as HTMLElement;

      if (ref?.current) return;
      if (ignoreSelectors?.some((ignoreTarget) => target.closest(ignoreTarget))) return;
      if (!ref) return;
      onClose?.();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose?.();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, ref, ignoreSelectors, closeOnEscape, closeOnOutsideClick]);
}
export default useClosePopup;
