import PromptArea from '@/components/features/advice/components/PromptArea';
import MainChatArea from '@/components/features/advice/MainChatArea';

function page() {
  return (
    <div className="h-[80vh] w-full center-col gap-6 p-5">
      <MainChatArea />
      <PromptArea />
    </div>
  );
}
export default page;
