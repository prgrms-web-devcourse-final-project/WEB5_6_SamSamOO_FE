import AdviceSideBar from '@/components/features/advice/AdviceSideBar';
import KeywordRank from '@/components/features/advice/KeywordRank';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-5 flex flex-col md:flex-row gap-6">
      <div className="flex justify-between relative">
        <AdviceSideBar />
        <KeywordRank className="md:hidden flex justify-center z-10" />
      </div>
      <article className="flex-1 shadow-ai-floating dark:bg-[#181A1B] rounded-4xl relative">
        <h2 className="a11y">AI 상담 메인 컨텐츠 영역</h2>
        <KeywordRank className="hidden md:block z-50" />
        {children}
      </article>
    </div>
  );
}
export default Layout;
