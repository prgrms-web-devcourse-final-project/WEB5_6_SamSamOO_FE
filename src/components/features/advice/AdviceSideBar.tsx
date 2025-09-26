'use client';
import { useState } from 'react';
import IconButton from './components/IconButton';

function AdviceSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className="relative">
        {/* 햄버거 버튼 - md 사이즈 이하에서만 표시 */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          aria-label="메뉴 열기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H14M4 18H9"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
        bg-white md:bg-transparent border-r rounded-2xl md:border-r-0 border-gray-200
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
              className="hover:bg-gray-100 rounded-lg"
              aria-label="메뉴 닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#1C274C"
                />
                <path
                  d="M14.5 9.50002L9.50002 14.5M9.5 9.5L14.5 14.5"
                  stroke="#1C274C"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <ul className="center-col gap-4">
            <IconButton fileName="newChat" alt="새 채팅" label="새 채팅" />
            <IconButton fileName="chatList" alt="채팅 목록" label="채팅 목록" />
          </ul>
        </aside>
      </div>
    </>
  );
}
export default AdviceSideBar;
