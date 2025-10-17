import ChatButton from '@/components/ui/ChatButton';
import LawDetailResult from '@/components/features/detail/LawDetailResult';
import { getLawDetails } from '@/api/detail/getLawDetails';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getLawDetails(id);
  if (!data) {
    return {
      title: '바로 | 법령을 찾을 수 없습니다',
      robots: { index: false, follow: false },
    };
  }
  const jangSummary = data.jangList?.[0]?.content?.slice(0, 80) ?? '';
  const joSummary = data.jangList?.[0]?.joList?.[0]?.content?.slice(0, 80) ?? '';
  const description = jangSummary || joSummary || '법령 상세 정보입니다.';

  return {
    title: `바로 | 법령 - ${data?.lawName}`,
    description: description,
    alternates: {
      canonical: `https://www.trybalaw.com/law/${id}`,
    },
    openGraph: {
      title: `바로 | 법령 - ${data.lawName}`,
      description: description,
      url: `https://www.trybalaw.com/law/${id}`,
      type: 'article',
      images: [
        {
          url: 'https://www.trybalaw.com/images/og-balaw.png',
          width: 1200,
          height: 630,
          alt: '바로 | 법령 상세',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `바로 | 법령 - ${data.lawName}`,
      description: description,
      images: ['https://www.trybalaw.com/images/og-balaw.png'],
    },
  };
}
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await getLawDetails(id);
  if (!data) notFound();

  return (
    <>
      <LawDetailResult data={data} />
      <ChatButton />
    </>
  );
}
export default Page;
