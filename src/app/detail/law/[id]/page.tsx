import ChatButton from '@/components/ui/ChatButton';
import LawDetailResult from '@/components/features/detail/LawDetailResult';
import { getLawDetails } from '@/api/detail/getLawDetails';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getLawDetails(id);
  return {
    title: `바로 | 법령 - ${data.lawName}`,
  };
}
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getLawDetails(id);

  return (
    <>
      <LawDetailResult data={data} />
      <ChatButton />
    </>
  );
}
export default Page;
