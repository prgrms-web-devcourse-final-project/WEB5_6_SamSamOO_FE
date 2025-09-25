import SearchFilterDropdown from './SearchFilterDropdown';
import SearchFilterModal from './SearchFilterModal';

interface Props {
  category: string;
}

function SearchFilter({ category }: Props) {
  return (
    <>
      <button type="button" className="flex w-17 gap-2 focus:bg-accent">
        {category}
        <img src="/icons/filterDown.svg" alt="필터" />
      </button>
      <SearchFilterModal />
      <SearchFilterDropdown />
    </>
  );
}
export default SearchFilter;
