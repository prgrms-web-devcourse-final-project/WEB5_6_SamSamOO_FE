import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
import { getPrecedentDetails } from '@/api/detail/getPrecedentDetails';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getPrecedentDetails(params.id);
  return {
    title: `바로 | 판례 - ${data.caseName}`,
  };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('params: ', id);
  const data = await getPrecedentDetails(id);
  console.log(data);

  return (
    <>
      <PrecedentDetailResult data={data} />
    </>
  );
}
export default Page;
