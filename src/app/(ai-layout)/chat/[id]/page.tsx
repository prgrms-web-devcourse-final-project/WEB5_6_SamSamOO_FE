import PromptArea from '@/components/features/advice/components/chat/PromptArea';
import MainChatArea from '@/components/features/advice/MainChatArea';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="h-[80vh] w-full center-col gap-6 p-5">
      <MainChatArea urlId={id} />
      <PromptArea />
    </div>
  );
}
export default page;
