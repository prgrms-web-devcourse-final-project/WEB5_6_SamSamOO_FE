import ScrollToBottomButton from '@/components/ui/ScrollToBottomButton';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';

interface Props {
  autoScrollRef: React.RefObject<HTMLDivElement | null>;
}

function ScrollManager({ autoScrollRef }: Props) {
  const { showButton, scrollToBottom } = useScrollToBottom({
    autoScrollRef,
    threshold: 100,
    enabled: true,
  });

  return <ScrollToBottomButton show={showButton} onClick={scrollToBottom} />;
}
export default ScrollManager;
