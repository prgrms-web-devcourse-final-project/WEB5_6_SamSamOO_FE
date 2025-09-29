import SearchArea from '@/components/features/search/SearchForm';
import Pagination from '@/components/ui/Pagination';
import ToggleSwitchNavigation from '@/components/ui/ToggleSwitchNavigation';

function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="w-[1200px] px-[150px] flex flex-col justify-center">
        <section className=" bg-white dark:bg-background-black1">
          <h2 className="sr-only">검색 및 필터링</h2>
          <nav className="flex itmes-center justify-center mb-4">
            <ToggleSwitchNavigation paddingX={24} paddingY={6} />
          </nav>
          <SearchArea />
        </section>
        <section className="w-full">
          <h2 className="sr-only">검색 결과</h2>
          {children}
        </section>
        <div className="flex flex-col items-center pb-6 gap-2">
          <Pagination />
          <p className="font-light text-sm">검색결과 : 총 164,321건</p>
        </div>
      </div>
    </div>
  );
}
export default SearchLayout;
