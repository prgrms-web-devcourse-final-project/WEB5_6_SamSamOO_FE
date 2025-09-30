import { ChatHistory } from '@/types/chat';

interface Props {
  chatItem: ChatHistory;
}

function ChatHistoryItem({ chatItem }: Props) {
  return (
    <li className="w-full group border rounded-xl hover:bg-primary hover:dark:bg-accent">
      <div className="flex w-full ml-1 gap-4 h-11 items-center">
        <img
          src="/icons/chatLight.svg"
          className="dark:hidden group-hover:hidden"
          alt="채팅 아이콘 라이트 모드"
        />
        <img
          src="/icons/chatDark.svg"
          className="hidden dark:block group-hover:hidden"
          alt="채팅 아이콘 다크 모드"
        />
        <img
          src="/icons/chatActive.svg"
          className="hidden group-hover:block"
          alt="채팅 아이콘 다크 모드"
        />
        <div className="flex-1 text-primary-black dark:text-primary-white group-hover:text-primary-white">
          <p className="truncate">
            {chatItem.title.length > 15 ? chatItem.title.slice(0, 15) + '...' : chatItem.title}
          </p>
          <p className="font-light text-xs">{chatItem.updatedAt.slice(0, 10)}</p>
        </div>
        <button type="button" className="mr-1 hidden group-hover:block">
          <img src="/icons/delete.svg" alt="삭제 아이콘" />
        </button>
      </div>
    </li>
  );
}
export default ChatHistoryItem;
