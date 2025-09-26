import SearchForm from '@/components/features/search/SearchForm';
import ToggleSwitchNavigation from '@/components/ui/ToggleSwitchNavigation';
import Image from 'next/image';

function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="w-[1200px] px-[150px] flex flex-col justify-center">
        <section className=" bg-white dark:bg-background-black1 ">
          <h2 className="sr-only">검색 및 필터링</h2>
          <nav className="flex itmes-center justify-center mb-4">
            <ToggleSwitchNavigation paddingX={24} paddingY={6} />
          </nav>
          <SearchForm />
          {/* 필터 적용된 항목 나열. 컴포넌트 분리 */}
          <div className="px-19 text-accent grid grid-cols-[1fr_30fr] items-center text-sm pb-4 ">
            <Image src="/icons/filter.png" width={16} height={16} alt="필터" />
            <p>
              법령분야 - 소관부처 - 소관부처2 - 공포일자 2025. 09. 01 ~ 2025. 09.20 - 시행일자 2025.
              09. 01 ~ 2025. 09. 20
            </p>
          </div>
        </section>
        <section className="w-full">
          <h2 className="sr-only">검색 결과</h2>
          {children}
        </section>
      </div>
    </div>
  );
}
export default SearchLayout;
