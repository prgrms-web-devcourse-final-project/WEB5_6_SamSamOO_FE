import { Message } from '@/types/chat';
import { convertTimestampToDate } from '@/utils/date';

interface Props {
  msg: Message;
}

function UserMessage({ msg }: Props) {
  return (
    <>
      <div className="bg-[#DBDBDB] dark:bg-[#303030] rounded-2xl w-fit text-primary-black dark:text-primary-white">
        <p className="px-4 py-2 whitespace-pre-wrap md:text-xl text-base">{msg.content}</p>
      </div>
      <span className="text-xs text-[#555555] dark:text-primary-white">
        {' '}
        {`${convertTimestampToDate(msg.timestamp)}`}
      </span>
    </>
  );
}
export default UserMessage;
