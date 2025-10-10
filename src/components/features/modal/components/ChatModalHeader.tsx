import Image from 'next/image';

function ChatModalHeader() {
  return (
    <div className="center-row gap-2 p-2 border-b border-[#DBDBDB] dark:border-border-gray1 bg-background-white dark:bg-background-black3 rounded-t-[30px]">
      <Image
        src={'/icons/floatingChat.svg'}
        className="dark:hidden"
        alt="채팅 아이콘"
        width={28}
        height={28}
      />
      <Image
        src={'/icons/floatingChatDark.svg'}
        className="hidden dark:block"
        alt="채팅 아이콘"
        width={30}
        height={30}
      />
      <p className="font-medium">이전 대화 내역</p>
    </div>
  );
}
export default ChatModalHeader;
