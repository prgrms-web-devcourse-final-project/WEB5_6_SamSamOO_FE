import InlineText from '@/components/ui/InlineText';
import { Message } from '@/types/chat';
import { messageGroup } from '@/utils/convertMessage';
import { Fragment } from 'react';
import RelevantInfoArea from '../../advice/components/chat/RelevantInfoArea';

interface Props {
  messages: Message[];
}

function ChatModalList({ messages }: Props) {
  const groupedMessages = messageGroup(messages);
  return (
    <ul className="sm:w-[250px] w-full pt-3 mb-3 sm:mx-auto px-3 font-light flex h-[550px] flex-col gap-3 items-end text-sm">
      {groupedMessages.map((group) => {
        return (
          <Fragment key={group.user.id}>
            <li className="bg-brand-primary dark:bg-[#333333] msg-rounded-r max-w-[280px]">
              <p className="p-4 text-primary-white">{group.user.content}</p>
            </li>

            {group.ai && (
              <li className="bg-background-white dark:bg-primary-gray3 msg-rounded-l w-full">
                <InlineText className="p-6 text-primary-black dark:text-primary-white">
                  {group.ai.content}
                </InlineText>
                <RelevantInfoArea
                  laws={group.ai.law ?? null}
                  precedent={group.ai.precedent ?? null}
                  className="p-3 border-b-0"
                />
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
export default ChatModalList;
