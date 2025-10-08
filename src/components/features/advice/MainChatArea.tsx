'use client';

import { useChatStore } from '@/store/useChatStore';
import AIMessage from './components/chat/AIMessage';
import UserMessage from './components/chat/UserMessage';
import { Fragment, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { getChatHistoryInfo } from '@/api/chat/chatHistoty';
import { useRouter } from 'next/navigation';
import { convertMessage, messageGroup } from '@/utils/convertMessage';
import AIMessageSkeleton from './loading/AIMessageSkeleton';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface Props {
  urlId: string;
}

function MainChatArea({ urlId }: Props) {
  const router = useRouter();
  const { roomId, messages, sendMessage, setRoomId, setChatHistory, isLoading } = useChatStore(
    useShallow((state) => ({
      roomId: state.roomId,
      messages: state.messages,
      sendMessage: state.sendMessage,
      setRoomId: state.setRoomId,
      setChatHistory: state.setChatHistory,
      isLoading: state.isLoading,
    })),
  );
  const autoScollRef = useAutoScroll([messages, isLoading]);

  useEffect(() => {
    if (roomId && urlId !== roomId) {
      getHistoryInfo(urlId);
      router.replace(`/chat/${urlId}`);
      //데이터 타입이 달라서 새로운 가공 함수 추가해야함
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'user' && lastMessage.isPending) {
        sendMessage(lastMessage.content);
        router.replace(`/chat/${roomId}`);
      }
    }
  }, [messages, sendMessage]);

  const getHistoryInfo = async (historyId: string) => {
    const res = await getChatHistoryInfo(historyId);
    if (!res) return;
    const convertChatInfo = convertMessage(res);
    setRoomId(historyId);
    setChatHistory(convertChatInfo);
  };

  const groupedMessages = messageGroup(messages);

  return (
    <div ref={autoScollRef} className="w-[80%] center-row overflow-y-auto">
      <div className="w-full flex h-[50vh] flex-col items-end">
        {groupedMessages.map((group, index) => {
          const isLastGroup = index === groupedMessages.length - 1;
          return (
            <Fragment key={group.user.id}>
              <UserMessage msg={group.user} />
              {isLastGroup && isLoading && <AIMessageSkeleton />}
              {group.ai && <AIMessage msg={group.ai} />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
export default MainChatArea;
