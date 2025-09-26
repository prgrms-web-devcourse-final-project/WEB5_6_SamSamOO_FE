import AdviceSideBar from '@/components/features/advice/AdviceSideBar';
import KeywordRank from '@/components/features/advice/KeywordRank';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-5 flex flex-col md:flex-row gap-6">
      <AdviceSideBar />
      <article className="flex-1 shadow-[0_4px_4px_5px_rgba(0,0,0,0.25)] dark:bg-[#181A1B] rounded-4xl relative">
        <h2 className="a11y">AI 상담 메인 컨텐츠 영역</h2>
        <KeywordRank />
        {children}
      </article>
    </div>
  );
}
export default Layout;
