import Image from 'next/image';
import dike from '@/assets/images/dike.png';
import InlineText from '@/components/ui/InlineText';
import { Message } from '@/types/chat';

interface Props {
  msg: Message;
}

function AIMessage({ msg }: Props) {
  console.log(msg);
  return (
    <div className="w-full">
      <div className="center-row w-fit gap-1">
        <div className="w-9 h-9 bg-[#DBDBDB] dark:bg-[#1F1F1F] rounded-sm center-row">
          <Image src={dike} width={24} height={24} alt="마스코트 디케 이미지" />
        </div>
        <span className="font-semibold">디케</span>
      </div>
      <div className="pt-3">
        <InlineText className="whitespace-pre-wrap">{msg.content}</InlineText>
        <span className="text-xs text-[#555555] dark:text-primary-white">
          {' '}
          {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
      </div>
    </div>
  );
}
export default AIMessage;
