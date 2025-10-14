import PromptArea from '@/components/features/advice/components/chat/PromptArea';
import MainChatArea from '@/components/features/advice/MainChatArea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로 | AI 상담 결과',
  description: '바로 BaLaw AI 상담 결과 페이지입니다',
  robots: { index: false, follow: false },
};

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
