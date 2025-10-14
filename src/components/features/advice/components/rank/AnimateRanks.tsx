'use client';
import { Ranks } from '@/types/keywordRanks';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  rankList: Ranks[];
}
function AnimateRanks({ rankList }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rankList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [rankList.length]);
  const currentItem = rankList[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-70 h-15 lg:m-0 m-auto flex gap-8 items-center "
      >
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-primary-white ${
            currentIndex <= 2 ? 'bg-brand-accent' : 'bg-primary-gray1 dark:bg-primary-gray2'
          }`}
        >
          {currentIndex + 1}
        </div>
        <p title={currentItem.keyword}>
          {currentItem.keyword.length > 10
            ? currentItem.keyword.slice(0, 10) + '...'
            : currentItem.keyword}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
export default AnimateRanks;
