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
        <img src="/icons/menuLight.svg" className="dark:hidden" alt="메뉴 아이콘 라이트 모드" />
        <img src="/icons/menuDark.svg" className="hidden dark:block" alt="메뉴 아이콘 다크 모드" />
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
