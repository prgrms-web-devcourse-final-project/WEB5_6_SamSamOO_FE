import InlineText from '@/components/ui/InlineText';
import Mascot from '@/components/ui/Mascot';
import { Message } from '@/types/chat';
import { convertTimestampToDate } from '@/utils/date';
import RelevantInfoArea from './RelevantInfoArea';

interface Props {
  msg: Message;
}

function AIMessage({ msg }: Props) {
  return (
    <div className="w-full">
      <Mascot />
      <div className="pt-3">
        <InlineText className="whitespace-pre-wrap md:text-xl text-base">{msg.content}</InlineText>
        <RelevantInfoArea laws={msg.law ?? null} precedent={msg.precedent ?? null} />
        <span className="text-xs text-[#555555] dark:text-primary-white">
          {' '}
          {`${convertTimestampToDate(msg.timestamp)}`}
        </span>
      </div>
    </div>
  );
}
export default AIMessage;
