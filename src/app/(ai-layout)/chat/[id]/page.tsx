import { postNewChat } from '@/api/chat/chatBot';
import PromptArea from '@/components/features/advice/components/PromptArea';
import MainChatArea from '@/components/features/advice/MainChatArea';

async function page({ params, searchParams }) {
  console.log('params', await params);
  const { c } = await searchParams;
  const newChatData = await postNewChat(c);
  console.log('newChatData', newChatData);
  console.log('searchParams');
  return (
    <div className="h-[80vh] w-full center-col gap-6 p-5">
      <MainChatArea />
      <PromptArea />
    </div>
  );
}
export default page;
