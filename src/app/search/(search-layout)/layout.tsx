import ChatButton from '@/components/ui/ChatButton';
import SearchArea from '@/components/features/search/SearchArea';

import ToggleSwitchNavigation from '@/components/ui/ToggleSwitchNavigation';
import { SearchProvider } from '@/context/SearchContext';
import PaginationWrapper from '@/components/features/search/PaginationWrapper';
import { SearchPendingProvider } from '@/context/SearchPendingContext';
import SearchPendingOverlay from '@/components/features/search/SearchPendingOverlay';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchPendingProvider>
      <SearchPendingOverlay />
      <div className="w-full h-full flex flex-1 items-center justify-center">
        <div className="px-3 xl:w-[1200px] md:px-[150px] flex flex-col justify-center">
          <section className=" bg-white dark:bg-background-black1">
            <h2 className="sr-only">검색 및 필터링</h2>
            <nav className="flex itmes-center justify-center mb-4">
              <ToggleSwitchNavigation paddingX={24} paddingY={6} />
            </nav>
            <SearchArea />
          </section>
          <SearchProvider>
            <section className="w-full">
              <h2 className="sr-only">검색 결과</h2>
              {children}
            </section>
            <PaginationWrapper />
          </SearchProvider>
        </div>
        <ChatButton />
      </div>
    </SearchPendingProvider>
  );
}
export default SearchLayout;
