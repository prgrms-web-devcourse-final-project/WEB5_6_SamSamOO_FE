import IconButton from './components/IconButton';

function AdviceSideBar() {
  return (
    <aside className="w-full sm:w-20 font-semibold min-h-full">
      <h2 className="a11y">AI 상담 페이지 사이드 바</h2>
      <ul className="sm:center-col flex justify-center items-center gap-4">
        <IconButton fileName="newChat" alt="새 채팅" label="새 채팅" />
        <IconButton fileName="chatList" alt="채팅 목록" label="채팅 목록" />
      </ul>
    </aside>
  );
}
export default AdviceSideBar;
