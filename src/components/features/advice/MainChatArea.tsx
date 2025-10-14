'use client';

import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { getChatHistoryInfo } from '@/api/chat/chatHistoty';
import { convertMessage } from '@/utils/convertMessage';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import ChatContents from './components/chat/ChatContents';
import ScrollManager from './components/chat/ScrollManager';
import { showErrorToast } from '@/utils/showToast';

interface Props {
  urlId?: string;
}

function MainChatArea({ urlId }: Props) {
  const { roomId, messages, setChatHistory, isLoading, isReset } = useChatStore(
    useShallow((state) => ({
      roomId: state.roomId,
      messages: state.messages,
      setRoomId: state.setRoomId,
      setChatHistory: state.setChatHistory,
      isLoading: state.isLoading,
      isReset: state.isReset,
    })),
  );

  const autoScrollRef = useAutoScroll([messages, isLoading]);

  useEffect(() => {
    if (isLoading || isReset) return;

    if (urlId !== 'first' && urlId !== roomId) {
      getHistoryInfo(urlId ?? '');
    }
  }, [urlId, roomId, isLoading]);

  const getHistoryInfo = async (historyId: string) => {
    const res = await getChatHistoryInfo(historyId);
    if (!res) {
      showErrorToast('채팅 이력을 불러오지 못했습니다.');
      return;
    }
    const convertChatInfo = convertMessage(res);
    setChatHistory(convertChatInfo, historyId);
  };

  return (
    <>
      <div ref={autoScrollRef} className="w-[80%] center-col overflow-y-auto relative">
        <ChatContents messages={messages} isLoading={isLoading} />
      </div>
      <ScrollManager autoScrollRef={autoScrollRef} />
    </>
  );
}
export default MainChatArea;
