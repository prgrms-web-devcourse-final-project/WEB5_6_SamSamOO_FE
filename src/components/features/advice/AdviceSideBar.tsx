'use client';
import { useState } from 'react';

import CloseButton from '@/components/ui/CloseButton';
import ChatMenuButton from './components/chatHistory/ChatMenuButton';
import IconButton from './components/sideBar/IconButton';
import ChatListModal from './components/sideBar/ChatListModal';

function AdviceSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenPop, setIsOpenPop] = useState(false);

  const closeChatPop = () => {
    setIsOpenPop(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className="relative z-100 ">
        <ChatMenuButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => {
            setIsSidebarOpen((prev) => !prev);
          }}
          closeSidebar={() => {
            closeSidebar();
          }}
        />
        <aside
          className={`
        w-40 font-semibold absolute transition-all duration-300 ease-in-out z-50 border rounded-2xl border-primary-gray1 bg-background-white dark:bg-background-black1 
        md:static md:w-20 md:translate-x-0 md:opacity-100 md:pointer-events-auto md:bg-none md:dark:bg-none md:border-none
      
        ${
          isSidebarOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none'
        }
      `}
        >
          <h2 className="a11y">AI 상담 페이지 사이드 바</h2>
          <div className="md:hidden flex items-center justify-between p-4 border-b border-primary-gray1">
            <h2 className="font-semibold">메뉴</h2>
            <CloseButton onClose={closeSidebar} />
          </div>
          <ul className="center-col gap-4">
            <IconButton fileName="newChat" label="새 채팅" onClick={() => {}} />
            <IconButton
              fileName="chatList"
              label="채팅 목록"
              onClick={() => setIsOpenPop((prev) => !prev)}
            />
          </ul>
          {isOpenPop && (
            <ChatListModal
              onClose={() => {
                closeChatPop();
              }}
              isOpen={isOpenPop}
            />
          )}
        </aside>
      </div>
    </>
  );
}
export default AdviceSideBar;
