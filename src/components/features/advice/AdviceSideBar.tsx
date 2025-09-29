'use client';
import { useState } from 'react';
import IconButton from './components/IconButton';
import ChatList from './ChatList';

function AdviceSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenPop, setIsOpenPop] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeChatPop = () => {
    setIsOpenPop(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className="relative z-100 ">
        {/* 햄버거 버튼 - md 사이즈 이하에서만 표시 */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-white dark:bg-primary-black border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          aria-label="메뉴 열기"
        >
          <img src="/icons/menuLight.svg" className="dark:hidden" alt="메뉴 아이콘 라이트 모드" />
          <img
            src="/icons/menuDark.svg"
            className="hidden dark:block"
            alt="메뉴 아이콘 다크 모드"
          />
        </button>
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-primary-black/30 bg-opacity-50 z-40"
            onClick={closeSidebar}
          />
        )}
        <aside
          className={`
        w-40 md:w-20 font-semibold
        absolute md:static
        md:translate-x-0 md:opacity-100 md:pointer-events-auto
        transition-all duration-300 ease-in-out z-50
        bg-white dark:dark:bg-primary-black md:bg-transparent border rounded-2xl border-primary-gray1
        ${
          isSidebarOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none'
        }
      `}
        >
          <h2 className="a11y">AI 상담 페이지 사이드 바</h2>
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold">메뉴</h2>
            <button
              onClick={closeSidebar}
              className="rounded-lg border-[0.5px] border-primary-gray1"
              aria-label="메뉴 닫기"
            >
              <img
                src="/icons/closeLight.svg"
                className="dark:hidden"
                alt="닫기 아이콘 라이트 모드"
              />
              <img
                src="/icons/closeDark.svg"
                className="hidden dark:block"
                alt="닫기 아이콘 다크 모드"
              />
            </button>
          </div>
          <ul className="center-col gap-4">
            <IconButton fileName="newChat" alt="새 채팅" label="새 채팅" onClick={() => {}} />
            <IconButton
              fileName="chatList"
              alt="채팅 목록"
              label="채팅 목록"
              onClick={() => setIsOpenPop((prev) => !prev)}
            />
          </ul>
          {isOpenPop && (
            <ChatList
              onClose={() => {
                closeChatPop();
              }}
            />
          )}
        </aside>
      </div>
    </>
  );
}
export default AdviceSideBar;
