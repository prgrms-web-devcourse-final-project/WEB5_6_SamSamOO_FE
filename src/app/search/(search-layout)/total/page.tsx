import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '바로 | 통합 검색',
  description: '바로 BaLaw 법령 판례 검색 페이지입니다',
};

async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  console.log(q);
  return (
    <div>
      {
        // 컴포넌트 분리필요
        Array(10)
          .fill(null)
          .map((_, index) => (
            <li key={index} className="mb-10">
              <Link href={`law/${1}`}>
                <section className="flex gap-2 text-xl font-bold mb-2">
                  <h2 className="sr-only">제목</h2>
                  <p>[대통령령]</p>
                  <p>건강가정기본법 시행령</p>
                </section>
                <p className="mb-3">
                  임대인이 계약 기간 중 일방적으로 월세를 30% 인상하겠다고 통보하였고, 이에 임차인이
                  정당한 사유 없이 과도한 인상이라고 판단하여 이를 거 기간 동안 임대료 인상은 법률이
                  정한 범위 내에서만 허용됩니다. 특히 임대료 증액은 통상 계약 갱신 ...
                </p>
                <section className="flex gap-2 text-md text-primary-gray1">
                  <h2 className="sr-only">기간</h2>
                  <p>2024-04-01</p>
                  <p>2024-04-01</p>
                </section>
              </Link>
            </li>
          ))
      }
    </div>
  );
}
export default Page;
