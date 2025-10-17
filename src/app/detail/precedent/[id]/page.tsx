import ChatButton from '@/components/ui/ChatButton';
import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
import { getPrecedentDetails } from '@/api/detail/getPrecedentDetails';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPrecedentDetails(id);
  if (!data) {
    return {
      title: '바로 | 판례를 찾을 수 없습니다',
      robots: { index: false, follow: false },
    };
  }

  const judgmentSummary =
    data.summaryOfTheJudgment?.split('<br/>').slice(0, 5).join(' ').slice(0, 80) ?? '';
  const noticeSummary = data.notice?.split('<br/>').slice(0, 5).join(' ').slice(0, 80) ?? '';
  const description = judgmentSummary || noticeSummary || '판례 상세 정보입니다.';

  return {
    title: `바로 | 판례 - ${data?.caseName}`,
    description: description,
    alternates: {
      canonical: `https://www.trybalaw.com/precedent/${id}`,
    },
    openGraph: {
      title: `바로 | 판례 - ${data.caseName}`,
      description: description,
      url: `https://www.trybalaw.com/precedent/${id}`,
      type: 'article',
      images: [
        {
          url: 'https://www.trybalaw.com/images/og-balaw.png',
          width: 1200,
          height: 630,
          alt: '바로 | 판례 상세',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `바로 | 판례 - ${data.caseName}`,
      description: description,
      images: ['https://www.trybalaw.com/images/og-balaw.png'],
    },
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
