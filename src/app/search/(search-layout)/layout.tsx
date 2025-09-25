import SearchForm from '@/components/features/search/SearchForm';
import ToggleSwitchNavigation from '@/components/ui/ToggleSwitchNavigation';

function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full outline-1 outline-red-500 flex flex-1 items-center justify-center">
      <div className="w-[1200px] outline-1 outline-blue-500 px-[150px]">
        <nav className="flex itmes-center justify-center mb-4">
          <ToggleSwitchNavigation paddingX={24} paddingY={6} />
        </nav>
        <SearchForm />
        <section className="w-full">
          <h2 className="sr-only">검색 결과</h2>
          {children}
        </section>
      </div>
    </div>
  );
}
export default SearchLayout;
