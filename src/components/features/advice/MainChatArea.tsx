import AIMessage from './components/AIMessage';
import UserMessage from './components/UserMessage';

function MainChatArea() {
  return (
    <div className="w-[80%] center-row overflow-y-auto">
      <div className="flex h-[50vh] flex-col items-end">
        <UserMessage />
        <AIMessage />
      </div>
    </div>
  );
}
export default MainChatArea;
