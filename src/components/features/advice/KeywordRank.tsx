'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const initialKeywords = [
  { id: 1, keyword: 'ChatGPT', rank: 1, score: 0 },
  { id: 2, keyword: 'Next.js', rank: 2, score: 1 },
  { id: 3, keyword: 'React', rank: 3, score: 0 },
  { id: 4, keyword: 'TypeScript', rank: 4, score: 0 },
  { id: 5, keyword: 'Tailwind CSS', rank: 5, score: 0 },
];

function KeywordRank() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialKeywords.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = initialKeywords[currentIndex];

  return (
    <div className="md:absolute static md:w-fit w-full pt-2 md:right-10 md:top-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-70 h-10 rounded-[20px] border-[0.5px] border-[#7B7B7B] lg:m-0 m-auto flex gap-8 items-center justify-between dark:bg-background-black1"
        >
          <div
            className={`tracking-tighter center-col w-7 h-7 ${currentItem.rank > 3 ? '' : 'bg-accent text-primary-white'} rounded-[50%] ml-3 dark:text-primary-white`}
          >
            {currentItem.rank}
          </div>
          <p>{currentItem.keyword}</p>
          <button className="mr-3">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"
                fill="black"
                className="fill-primary-black dark:fill-primary-white"
              />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default KeywordRank;
