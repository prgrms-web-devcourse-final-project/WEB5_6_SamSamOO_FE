'use client';
import Image from 'next/image';

import { useState } from 'react';
import ChatModal from '../features/modal/ChatModal';

function ChatButton() {
  const [isOpenPop, setOpenPop] = useState(false);
  return (
    <>
      <ChatModal isOpenPop={isOpenPop} />
      <button
        type="button"
        className="fixed right-8 bottom-22 bg-background-white rounded-[50%] w-[50px] h-[50px] center-col drop-shadow-[var(--shadow-floating)] z-100"
        onClick={() => setOpenPop((prev) => !prev)}
      >
        <Image
          src={'/icons/floatingChat.svg'}
          alt="채팅 아이콘"
          width={30}
          height={30}
          className={`${isOpenPop ? 'hidden' : 'block'}`}
        />
        <Image
          src={'/icons/floatingCancel.svg'}
          alt="채팅 취소 아이콘"
          width={30}
          height={30}
          className={`${!isOpenPop ? 'hidden' : 'block'}`}
        />
      </button>
    </>
  );
}
export default ChatButton;
