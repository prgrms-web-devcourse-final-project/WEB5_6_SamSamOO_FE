import ChatButton from '@/components/ui/ChatButton';
import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
import { getPrecedentDetails } from '@/api/detail/getPrecedentDetails';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getPrecedentDetails(id);
  return {
    title: `바로 | 판례 - ${data?.caseName}`,
  };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await getPrecedentDetails(id);
    if (!data) notFound();

    return (
      <>
        <PrecedentDetailResult data={data} />
        <ChatButton />
      </>
    );
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'status' in error) {
      if (error.status === 401) {
        console.warn(error, '존재하지 않는 판례 상세정보 요청입니다');
        notFound();
      }
    }
    throw error;
  }
}
export default Page;
