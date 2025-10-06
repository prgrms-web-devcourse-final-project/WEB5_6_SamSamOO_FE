'use client';

import { getChatHistoryList } from '@/api/chat/chatHistoty';
import { useEffect, useState } from 'react';

import useClosePopup from '@/hooks/useClosePopup';
import CloseButton from '@/components/ui/CloseButton';
import { ChatHistoryList } from '@/types/chat';
import ChatHistoryItem from '../chatHistory/ChatHistoryItem';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

function ChatListModal({ onClose, isOpen }: Props) {
  const [chatHistoryList, setChatHistoryList] = useState<ChatHistoryList | null>(null);
  useClosePopup({ onClose, isOpen });

  useEffect(() => {
    const getChat = async () => {
      const list = await getChatHistoryList();
      setChatHistoryList(list);
      console.log(list);
    };
    getChat();
  }, []);

  return (
    <div className="w-[340px] h-[560px] bg-background-white dark:bg-background-black1 border border-primary-gray2 rounded-3xl shadow-[0_4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col items-center">
      <div className="border-b border-b-primary-gray2 relative center-row p-4 mb-4 w-[300px]">
        <h2 className="text-2xl">채팅목록</h2>
        <CloseButton onClose={onClose} />
      </div>
      <div className="w-[300px] overflow-y-auto">
        <ul className="flex flex-col gap-4 ">
          {chatHistoryList &&
            chatHistoryList.map((items, index) => <ChatHistoryItem key={index} chatItem={items} />)}
        </ul>
      </div>
    </div>
  );
}
export default ChatListModal;
