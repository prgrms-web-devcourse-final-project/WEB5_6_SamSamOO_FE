'use client';

import tw from '@/utils/tw';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const initialKeywords = [
  { id: 1, keyword: 'ChatGPT', rank: 1, score: 0 },
  { id: 2, keyword: 'Next.js', rank: 2, score: 1 },
  { id: 3, keyword: 'React', rank: 3, score: 0 },
  { id: 4, keyword: 'TypeScript', rank: 4, score: 0 },
  { id: 5, keyword: 'Tailwind CSS', rank: 5, score: 0 },
];

interface Props {
  className?: string;
}
function KeywordRank({ className }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialKeywords.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = initialKeywords[currentIndex];

  return (
    <div className={tw('md:absolute relative md:w-fit w-full  md:right-10 md:top-4', className)}>
      <motion.div
        animate={{
          height: isOpen ? 'auto' : 40, // 헤더 높이만큼
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-70 h-10 rounded-[20px] border-[0.5px] border-[#7B7B7B] dark:bg-background-black1 bg-white"
      >
        <div className="flex w-full h-10 justify-between pl-3 pr-3 items-center">
          {!isOpen && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-70 h-10 lg:m-0 m-auto flex gap-8 items-center "
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    currentItem.rank <= 3
                      ? 'bg-accent text-primary-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {currentItem.rank}
                </div>
                <p>{currentItem.keyword}</p>
              </motion.div>
            </AnimatePresence>
          )}
          {isOpen && (
            <div>
              <p className="font-semibold text-primary dark:text-accent">실시간 키워드 순위</p>
            </div>
          )}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <img
                src="/icons/accordionLight.svg"
                className="dark:hidden"
                alt="아코디언 아이콘 라이트 모드"
              />
              <img
                src="/icons/accordionDark.svg"
                className="hidden dark:block"
                alt="아코디언 아이콘 다크 모드"
              />
            </motion.div>
          </motion.button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                staggerChildren: 0.05,
              }}
              className="flex flex-col gap-3 w-full px-4 pb-4"
            >
              {initialKeywords.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      item.rank <= 3
                        ? 'bg-accent text-primary-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{item.keyword}</p>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
export default KeywordRank;
