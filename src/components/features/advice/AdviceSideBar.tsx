'use client';
import { useState } from 'react';

import CloseButton from '@/components/ui/CloseButton';
import ChatMenuButton from './components/chatHistory/ChatMenuButton';
import ButtonList from './components/sideBar/ButtonList';
import ChatListModal from '../modal/ChatListModal';

function AdviceSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenPop, setIsOpenPop] = useState(false);

  const handleSideBar = () => setIsSidebarOpen((prev) => !prev);
  const handleOpenPop = () => setIsOpenPop((prev) => !prev);

  const SIDE_BAR_STYLE = `w-40 font-semibold absolute z-50 border rounded-2xl border-primary-gray1 bg-background-white dark:bg-background-black1 
        transition-all duration-300 ease-in-out
        md:static md:w-20 md:translate-x-0 md:opacity-100 md:pointer-events-auto md:bg-none md:dark:bg-none md:border-none
        ${
          isSidebarOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none'
        }`;

  return (
    <>
      <div className="relative z-100 ">
        <ChatMenuButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={handleSideBar}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
        <aside className={SIDE_BAR_STYLE}>
          <h2 className="a11y">AI 상담 페이지 사이드 바</h2>
          <div className="md:hidden flex items-center justify-between p-4 border-b border-primary-gray1">
            <h2 className="font-semibold">메뉴</h2>
            <CloseButton onClose={() => setIsSidebarOpen(false)} />
          </div>
          <ButtonList handleSideBar={() => handleOpenPop()} />
          {isOpenPop && <ChatListModal onClose={() => setIsOpenPop(false)} isOpen={isOpenPop} />}
        </aside>
      </div>
    </>
  );
}
export default AdviceSideBar;
