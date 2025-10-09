import { Metadata } from 'next';

import LawDetailResult from '@/components/features/detail/LawDetailResult';
import { getLawDetails } from '@/api/getLawDetails';

// async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   return {
//     title: `바로 | 법령-${id}`,
//   };
// }

export const metadata: Metadata = {
  title: '바로 | 법령 - {id}',
  description: '바로 BaLaw {id.lawField} 상세 페이지입니다',
};

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
