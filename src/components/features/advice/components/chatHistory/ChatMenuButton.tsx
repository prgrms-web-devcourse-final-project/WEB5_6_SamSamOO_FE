import Menu from '@/assets/icons/menu.svg';

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

function ChatMenuButton({ toggleSidebar, isSidebarOpen, closeSidebar }: Props) {
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-primary-white dark:bg-primary-black border-[0.5px] border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:dark:bg-primary-gray3"
        aria-label="메뉴 열기"
      >
        <Menu className="text-primary-black dark:text-primary-white w-6 h-6" />
      </button>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-primary-black/30 bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
export default ChatMenuButton;
