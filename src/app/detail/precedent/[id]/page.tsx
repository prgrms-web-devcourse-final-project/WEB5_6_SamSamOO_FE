import ChatButton from '@/components/ui/ChatButton';
import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
import { getPrecedentDetails } from '@/api/detail/getPrecedentDetails';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getPrecedentDetails(id);
  return {
    title: `바로 | 판례 - ${data.caseName}`,
  };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPrecedentDetails(id);

  return (
    <>
      <PrecedentDetailResult data={data} />
      <ChatButton />
    </>
  );
}
export default Page;
