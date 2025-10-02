import { Metadata } from 'next';

import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
import { getPrecedentDetails } from '@/api/getPrecedentDetails';

export const metadata: Metadata = {
  title: '바로 | 판례 - {id}',
  description: '바로 BaLaw {id.caseNumber} 상세 페이지입니다',
};

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
