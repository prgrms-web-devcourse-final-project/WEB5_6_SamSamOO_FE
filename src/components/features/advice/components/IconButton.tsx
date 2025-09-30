import ChatList from '@/assets/icons/chatList.svg';
import NewChat from '@/assets/icons/newChat.svg';

interface Props {
  fileName: string;
  label: string;
  alt?: string;
  onClick: () => void;
}

function IconButton({ fileName, label, alt, onClick }: Props) {
  return (
    <li className="group w-16 h-18 hover:bg-primary hover:text-primary-white dark:hover:bg-accent text-primary-black dark:text-primary-white rounded-lg">
      <button
        className="flex flex-col justify-around items-center w-full h-full text-sm"
        onClick={onClick}
      >
        <div className="relative w-6 h-6">
          {fileName === 'chatList' && (
            <ChatList className="text-primary dark:text-accent group-hover:text-primary-white" />
          )}
          {fileName === 'newChat' && (
            <NewChat className="text-primary dark:text-accent group-hover:text-primary-white" />
          )}
        </div>
        <span>{label}</span>
      </button>
    </li>
  );
}
export default IconButton;
