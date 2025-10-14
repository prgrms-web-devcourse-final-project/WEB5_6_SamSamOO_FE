import { useChatStore } from '@/store/useChatStore';
import { useShallow } from 'zustand/shallow';
import { useEffect, useRef } from 'react';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import ChatModalHeader from './components/ChatModalHeader';
import ChatModalList from './components/ChatModalList';
import ScrollToBottomButton from '@/components/ui/ScrollToBottomButton';

interface Props {
  isOpenPop: boolean;
}

function ChatModal({ isOpenPop }: Props) {
  const autoScrollRef = useRef<HTMLDivElement>(null);
  const { roomId, messages } = useChatStore(
    useShallow((state) => ({
      roomId: state.roomId,
      messages: state.messages,
    })),
  );

  const { showButton, scrollToBottom } = useScrollToBottom({
    autoScrollRef,
    threshold: 50,
    enabled: isOpenPop,
  });

  const isMobile = useMobileDetection(640);

  useEffect(() => {
    if (!isMobile || !isOpenPop) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isMobile, isOpenPop]);

  if (!isOpenPop) return null;

  const CHAT_MODAL_CLASS =
    'fixed top-15 z-50 w-full h-screen border border-[#DBDBDB] dark:border-border-gray1 rounded-[30px] sm:right-8 sm:top-35 sm:w-[300px] sm:h-fit';
  const CHAT_CONTENTS_CLASS = `sm:h-[550px] h-[90vh] w-full bg-[#EFEFEF] dark:bg-background-black3 rounded-b-[30px] overflow-y-auto ${messages.length === 0 || !roomId ? 'center-col' : ''}`;

  return (
    <div className={CHAT_MODAL_CLASS}>
      <ChatModalHeader />
      <div ref={autoScrollRef} className={CHAT_CONTENTS_CLASS}>
        {messages.length <= 1 && !roomId && <p>대화 내역이 존재하지 않습니다.</p>}
        {messages.length > 1 && roomId && (
          <>
            <ChatModalList messages={messages} />
            <ScrollToBottomButton show={showButton} onClick={scrollToBottom} className="bottom-5" />
          </>
        )}
      </div>
    </div>
  );
}
export default ChatModal;
