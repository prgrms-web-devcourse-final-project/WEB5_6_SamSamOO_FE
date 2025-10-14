'use client';
import { useSearchPending } from '@/context/SearchPendingContext';
import { useEffect, useState } from 'react';

const LOADING_STAGES = [
  { time: 0, message: '검색 결과를 불러오고 있습니다' },
  { time: 2000, message: '조금만 기다려주세요 정확한 결과를 준비 중입니다' },
  { time: 4000, message: '거의 준비가 됐습니다. 결과를 불러오고 있습니다' },
];

function SearchPendingOverlay() {
  const { isPending } = useSearchPending();
  const [message, setMessage] = useState(LOADING_STAGES[0].message);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const timers = LOADING_STAGES.slice(1).map((stage) =>
      setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setMessage(stage.message);
          setFade(true);
        }, 200);
      }, stage.time),
    );

    return () => timers.forEach(clearTimeout);
  }, []);
  if (!isPending) return null;
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 space-y-4 fixed inset-0 z-[20] bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent" />
      <p
        className={`text-gray-600 dark:text-gray-300 transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {message}
      </p>
    </div>
  );
}
export default SearchPendingOverlay;
