import { Message } from '@/types/chat';
import { messageGroup } from '@/utils/convertMessage';
import { Fragment } from 'react';
import UserMessage from './UserMessage';
import AIMessageSkeleton from '../../loading/AIMessageSkeleton';
import AIMessage from './AIMessage';

interface Props {
  messages: Message[];
  isLoading: boolean;
}

function ChatContents({ messages, isLoading }: Props) {
  const groupedMessages = messageGroup(messages);
  return (
    <div className="w-full flex h-[50vh] p-3 flex-col items-end">
      {groupedMessages.map((group, index) => {
        const isLastGroup = index === groupedMessages.length - 1;
        return (
          <Fragment key={group.user.id}>
            <UserMessage msg={group.user} />
            {isLastGroup && isLoading && <AIMessageSkeleton />}
            {group.ai && <AIMessage msg={group.ai} />}
          </Fragment>
        );
      })}
    </div>
  );
}
export default ChatContents;
