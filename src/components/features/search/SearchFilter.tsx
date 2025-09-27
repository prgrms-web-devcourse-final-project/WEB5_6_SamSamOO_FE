import { useEffect, useState } from 'react';
import SearchFilterModal from './SearchFilterModal';
import { useTheme } from 'next-themes';

interface Props {
  category: string;
}

// 이거 서버컴포넌트인데 왜 useEffect를 쓸 수 있지? => 얘를 import하는 부모에서 'use client'하기 때문
function SearchFilter({ category }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark' ? true : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button type="button" className="flex w-17 gap-2 items-center focus:bg-accent">
        {category}
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:fill-white"
        >
          <path
            d="M4.58793 7.2845C4.6338 7.35112 4.69518 7.40559 4.76678 7.44322C4.83837 7.48085 4.91805 7.50052 4.99893 7.50052C5.07982 7.50052 5.15949 7.48085 5.23109 7.44322C5.30268 7.40559 5.36406 7.35112 5.40993 7.2845L9.90993 0.7845C9.96202 0.709529 9.99256 0.621716 9.99825 0.530603C10.0039 0.43949 9.98454 0.348562 9.94217 0.267697C9.89981 0.186832 9.83609 0.119124 9.75795 0.0719291C9.6798 0.024734 9.59022 -0.000143172 9.49893 6.19827e-07H0.498931C0.407853 0.000376824 0.3186 0.0255739 0.240771 0.0728821C0.162942 0.12019 0.0994822 0.18782 0.0572151 0.268497C0.0149481 0.349175 -0.00452658 0.439848 0.000885399 0.530766C0.00629738 0.621684 0.0363912 0.709407 0.0879307 0.7845L4.58793 7.2845Z"
            fill={isDark ? 'white' : 'black'}
          />
        </svg>
      </button>
      <SearchFilterModal />
    </>
  );
}
export default SearchFilter;
