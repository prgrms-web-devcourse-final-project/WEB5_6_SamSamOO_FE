'use client';
import { Ranks } from '@/types/keywordRanks';
import { motion } from 'framer-motion';

interface Props {
  rankList: Ranks[];
}

function StaticRanks({ rankList }: Props) {
  return (
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
      {rankList.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
          }}
          className="flex items-center gap-4 p-2 rounded-lg"
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-primary-white ${
              index <= 2 ? 'bg-brand-accent' : 'bg-primary-gray1 dark:bg-primary-gray2'
            }`}
          >
            {index + 1}
          </div>
          <p className="font-medium text-primary-black dark:text-primary-white">{item.keyword}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
export default StaticRanks;
