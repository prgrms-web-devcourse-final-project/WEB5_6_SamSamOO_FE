'use client';

import { deleteChatHistory, getChatHistoryList } from '@/api/chat/chatHistoty';
import { useEffect, useState } from 'react';
import useClosePopup from '@/hooks/useClosePopup';
import CloseButton from '@/components/ui/CloseButton';
import { ChatHistoryList } from '@/types/chat';
import ChatHistoryItem from '../chatHistory/ChatHistoryItem';

import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import ChatHistorySkeleton from '../../loading/ChatHistorySkeleton';
import tw from '@/utils/tw';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

function ChatListModal({ onClose, isOpen }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [chatHistoryList, setChatHistoryList] = useState<ChatHistoryList | null>(null);
  useClosePopup({ onClose, isOpen });

  useEffect(() => {
    const getChat = async () => {
      setLoading(true);
      const list = await getChatHistoryList();

      const sortedList = list?.sort((a, b) => {
        // updatedAt 또는 createdAt 필드로 정렬
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

      setChatHistoryList(sortedList ?? null);
      setLoading(false);
    };
    getChat();
  }, []);

  const deleteItem = async (historyRoomId: number) => {
    if (!chatHistoryList) return;
    const res = await deleteChatHistory(String(historyRoomId));

    if (res) {
      setChatHistoryList(chatHistoryList?.filter((item) => item.historyRoomId !== historyRoomId));
      showSuccessToast('채팅이 삭제되었습니다.');
    } else {
      showErrorToast('채팅 삭제를 실패하였습니다.');
    }
  };

  const MODAL_COLOR = 'bg-background-white dark:bg-background-black1 border border-primary-gray2';

  return (
    <div
      className={tw(
        'w-[340px] h-[580px]  rounded-modal shadow-ai-floating flex flex-col items-center',
        MODAL_COLOR,
      )}
    >
      <div className="border-b border-b-primary-gray2 relative center-row p-4 mb-4 w-[300px]">
        <h2 className="text-2xl">채팅목록</h2>
        <CloseButton onClose={onClose} className="w-6 h-6" />
      </div>
      <div className="w-[300px] mb-5 overflow-y-auto">
        <ul className="flex flex-col gap-4 w-[280px]">
          {isLoading && <ChatHistorySkeleton />}
          {!isLoading &&
            chatHistoryList &&
            chatHistoryList.map((items, index) => (
              <ChatHistoryItem key={index} chatItem={items} onDelete={deleteItem} />
            ))}
          {!isLoading && !chatHistoryList && (
            <li className="w-full">
              <p>채팅 목록이 존재하지 않습니다.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default ChatListModal;
