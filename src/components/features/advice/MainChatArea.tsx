'use client';

import { useChatStore } from '@/store/useChatStore';
import AIMessage from './components/chat/AIMessage';
import UserMessage from './components/chat/UserMessage';
import { Fragment, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { Message } from '@/types/chat';

interface Props {
  urlId: string;
}

function MainChatArea({ urlId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { roomId, messages, sendMessage } = useChatStore(
    useShallow((state) => ({
      roomId: state.roomId,
      messages: state.messages,
      sendMessage: state.sendMessage,
      // isLoading: state.isLoading,
    })),
  );
  useEffect(() => {
    if (urlId !== roomId) {
      console.log('새로운 채팅방 세팅');
      //데이터 타입이 달라서 새로운 가공 함수 추가해야함
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user' && lastMessage.isPending) {
      sendMessage(lastMessage.content);
    }
  }, [messages, sendMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        // behavior: 'smooth', // 부드러운 스크롤
      });
    }
  }, [messages]);

  // 메시지를 user-ai 쌍으로 그룹화
  const groupedMessages = messages.reduce<Array<{ user: Message; ai?: Message }>>(
    (acc, msg, index) => {
      if (msg.role === 'user') {
        const nextMsg = messages[index + 1];
        acc.push({
          user: msg,
          ai: nextMsg?.role === 'ai' ? nextMsg : undefined,
        });
      }
      return acc;
    },
    [],
  );
  console.log('groupedMessages', groupedMessages);
  return (
    <div ref={scrollRef} className="w-[80%] center-row overflow-y-auto">
      <div className="w-full flex h-[50vh] flex-col items-end">
        {groupedMessages.map((group) => (
          <Fragment key={group.user.id}>
            <UserMessage msg={group.user} />
            {group.ai && <AIMessage msg={group.ai} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
export default MainChatArea;
