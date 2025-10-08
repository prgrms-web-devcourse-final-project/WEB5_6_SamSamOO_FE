'use client';

import { Ranks } from '@/types/keywordRanks';
import tw from '@/utils/tw';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import AccordionButton from '@/components/ui/AccordionButton';
import AnimateRanks from './components/rank/AnimateRanks';
import StaticRanks from './components/rank/StaticRanks';
import { getKeywordRanks } from '@/api/rank/keywordRankApi';

interface Props {
  className: string;
}

function KeywordRank({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rankList, setRankList] = useState<Ranks[] | null>(null);
  useEffect(() => {
    const getRanks = async () => {
      const rankList = await getKeywordRanks();
      setRankList(rankList);
    };
    getRanks();
  }, []);
  return (
    <div className={tw('md:absolute relative md:w-fit w-full md:right-10 md:top-4', className)}>
      <motion.div
        animate={{
          height: isOpen ? 'auto' : 40, // 헤더 높이만큼
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-70 h-10 rounded-[20px] border-[0.5px] border-[#7B7B7B] dark:bg-background-black1 bg-white"
      >
        <div className="flex w-full h-10 justify-between pl-3 pr-3 items-center">
          {!isOpen && rankList && <AnimateRanks rankList={rankList} />}
          {isOpen && (
            <div>
              <p className="font-semibold text-brand-primary dark:text-brand-accent">
                실시간 키워드 순위
              </p>
            </div>
          )}
          <AccordionButton isOpen={isOpen} onChange={() => setIsOpen((prev) => !prev)} />
        </div>
        <AnimatePresence>
          {isOpen && rankList && <StaticRanks key="static-rank" rankList={rankList} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
export default KeywordRank;
