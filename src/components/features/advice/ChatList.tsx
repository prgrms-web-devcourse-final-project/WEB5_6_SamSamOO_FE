'use client';
interface Props {
  onClose: () => void;
}

function ChatList({ onClose }: Props) {
  return (
    <div className="w-[340px] h-[560px] bg-background-white dark:bg-background-black1 border border-primary-gray2 rounded-3xl shadow-[0_4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col items-center">
      <div className="border-b border-b-primary-gray2 relative center-row p-4 mb-4 w-[300px]">
        <h2 className="text-2xl">채팅목록</h2>
        <button
          className="absolute right-2 top-2 w-5 h-5 border border-primary-gray1 rounded-[50%]"
          onClick={() => {
            onClose();
          }}
        >
          <img
            src="/icons/closeLight.svg"
            className="dark:hidden m-auto"
            alt="닫기 아이콘 라이트 모드"
          />
          <img
            src="/icons/closeDark.svg"
            className="hidden dark:block m-auto"
            alt="닫기 아이콘 다크 모드"
          />
        </button>
      </div>
      <div className="w-[300px]">
        <ul className="flex flex-col gap-4">
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
                <p>이전 채팅 1번</p>
                <p className="font-light text-xs">2025-09-20</p>
              </div>
              <button type="button" className="mr-1 hidden group-hover:block">
                <img src="/icons/delete.svg" alt="삭제 아이콘" />
              </button>
            </div>
          </li>
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
                <p>이전 채팅 2번</p>
                <p className="font-light text-xs">2025-09-20</p>
              </div>
              <button type="button" className="mr-1 hidden group-hover:block">
                <img src="/icons/delete.svg" alt="삭제 아이콘" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default ChatList;
