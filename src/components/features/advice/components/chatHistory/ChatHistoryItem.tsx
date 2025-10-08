import { ChatHistory } from '@/types/chat';
import Chat from '@/assets/icons/chat.svg';
import Delete from '@/assets/icons/delete.svg';

import { useRouter } from 'next/navigation';

interface Props {
  chatItem: ChatHistory;
  onDelete: (historyRoomId: number) => Promise<void>;
}

function ChatHistoryItem({ chatItem, onDelete }: Props) {
  const router = useRouter();

  const handleChatRoom = async () => {
    router.push(`/chat/${chatItem.historyRoomId}`);
  };

  const handelChatDelete = (e: React.MouseEvent<HTMLButtonElement>, historyRoomId: number) => {
    e.stopPropagation();
    onDelete(historyRoomId);
  };

  return (
    <li
      className="w-full group border rounded-xl hover:bg-brand-primary hover:dark:bg-brand-accent"
      onClick={handleChatRoom}
    >
      <div className="flex w-full ml-1 gap-4 h-11 items-center">
        <Chat className="text-brand-primary dark:text-brand-accent group-hover:text-primary-white w-9 h-9" />

        <div className="flex-1 text-primary-black dark:text-primary-white group-hover:text-primary-white">
          <p className="truncate">
            {!chatItem.title
              ? '...'
              : chatItem.title.length > 13
                ? chatItem.title.slice(0, 13) + '...'
                : chatItem.title}
          </p>
          <p className="font-light text-xs">{chatItem.updatedAt.slice(0, 10)}</p>
        </div>
        <button
          type="button"
          className="mr-1 hidden group-hover:block"
          onClick={(e) => handelChatDelete(e, chatItem.historyRoomId)}
        >
          <Delete className="text-brand-primary dark:text-brand-accent group-hover:text-primary-white w-6 h-6" />
        </button>
      </div>
    </li>
  );
}
export default ChatHistoryItem;
