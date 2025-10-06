import { Message } from '@/types/chat';

interface Props {
  msg: Message;
}

function UserMessage({ msg }: Props) {
  console.log(msg);
  return (
    <>
      <div className="bg-[#DBDBDB] dark:bg-[#303030] rounded-2xl w-fit text-primary-black dark:text-primary-white">
        <p className="px-4 py-2 whitespace-pre-wrap">{msg.content}</p>
      </div>
      <span className="text-xs text-[#555555] dark:text-primary-white">
        {' '}
        {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </span>
    </>
  );
}
export default UserMessage;
