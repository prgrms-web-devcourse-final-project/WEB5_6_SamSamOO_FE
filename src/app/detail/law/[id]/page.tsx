import LawDetailResult from '@/components/features/detail/LawDetailResult';
import { getLawDetails } from '@/api/detail/getLawDetails';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getLawDetails(params.id);
  return {
    title: `바로 | 법령 - ${data.lawName}`,
  };
}
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('params: ', id);
  const data = await getLawDetails(id);
  console.log(data);

  return (
    <>
      <LawDetailResult data={data} />
    </>
  );
}
export default Page;
