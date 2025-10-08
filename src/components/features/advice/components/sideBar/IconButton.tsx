import ChatList from '@/assets/icons/chatList.svg';
import NewChat from '@/assets/icons/newChat.svg';

interface Props {
  fileName: string;
  label: string;
  onClick: () => void;
}

function IconButton({ fileName, label, onClick }: Props) {
  return (
    <li className="group w-16 h-18 hover:bg-brand-primary hover:text-primary-white dark:hover:bg-brand-accent text-primary-black dark:text-primary-white rounded-lg">
      <button
        className="flex flex-col justify-around items-center w-full h-full text-sm"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div className="relative w-6 h-6">
          {fileName === 'chatList' && (
            <ChatList className="text-brand-primary dark:text-brand-accent group-hover:text-primary-white w-6 h-6" />
          )}
          {fileName === 'newChat' && (
            <NewChat className="text-brand-primary dark:text-brand-accent group-hover:text-primary-white w-6 h-6" />
          )}
        </div>
        <span>{label}</span>
      </button>
    </li>
  );
}
export default IconButton;
