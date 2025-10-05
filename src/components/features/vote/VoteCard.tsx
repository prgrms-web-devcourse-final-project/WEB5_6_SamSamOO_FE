'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Gavel from '@/assets/icons/gavel.svg';
import Time from '@/assets/icons/time.svg';
import Indicator from '@/assets/icons/indicator.svg';
import Voter from '@/assets/icons/voter.svg';
import SelectDown from '@/assets/icons/selectDown.svg';
import ProgressBar from './ProgressBar';

interface Option {
  label: string;
  isSelected: boolean;
  currentVotes: number;
}

interface VoteCardProps {
  category: string;
  participants: number;
  remainingTime: string;
  status: 'ongoing' | 'closed';
  title: string;
  content: string;
  options: Option[];
  totalVotes?: number; // 기본값: participants
}

export default function VoteCard({
  category,
  participants,
  remainingTime,
  status,
  title,
  content,
  options,
  totalVotes = participants,
}: VoteCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const statusInfo =
    status === 'ongoing'
      ? { text: '진행중', color: '#259D00' }
      : { text: '마감', color: '#EE4444' };

  return (
    <div className="w-[800px] rounded-4xl p-6 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_40px_rgba(175,207,255,1)] dark:bg-background-black3 dark:shadow-[0_0_14px_rgba(77,77,77,1)]">
      {/* 헤더 */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* 카테고리 태그 */}
          <div className="h-12 bg-brand-primary rounded-full flex items-center gap-2 px-5 dark:bg-primary-gray3 dark:border-1 dark:border-[#a3a3a3]">
            <Gavel className="text-primary-white scale-150" />
            <p className="text-primary-white">{category}</p>
          </div>

          {/* 참여자 */}
          <div className="center-row gap-2">
            <Voter className="text-brand-primary dark:text-brand-accent scale-150" />
            <p>{participants.toLocaleString()}명 참여</p>
          </div>

          {/* 남은 시간 */}
          <div className="w-[280px] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Time className="text-brand-primary dark:text-brand-accent scale-150" />
              <p className="text-brand-primary text-lg dark:text-primary-white">게시 시간 :</p>
              <p className="text-brand-primary font-bold text-lg dark:text-brand-accent">
                {remainingTime}
              </p>
            </div>
          </div>
        </div>

        {/* 상태 표시 */}
        <div className="center-row gap-2">
          <Indicator style={{ color: statusInfo.color }} />
          <p className="font-bold" style={{ color: statusInfo.color }}>
            {statusInfo.text}
          </p>
        </div>
      </header>

      {/* 본문 */}
      <div className="bg-[#f8f8f8] rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.30)] flex flex-col overflow-hidden dark:bg-background-black1 transition-all duration-500">
        {/* 질문 영역 */}
        <div className="bg-white rounded-3xl flex items-center px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.30)] gap-2 flex-shrink-0 border-[#a3a3a3] border-1 dark:bg-background-black2 dark:border-[#a3a3a3]">
          <p className="text-brand-primary text-4xl font-bold dark:text-brand-accent">Q.</p>
          <p className="text-xl font-bold text-brand-primary flex-1 dark:text-primary-white">
            {title}
          </p>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="transition-transform duration-300"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <SelectDown />
            </motion.div>
          </button>
        </div>

        {/* 슬라이드 본문 */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="vote-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-6">
                <p className="text-md leading-relaxed text-brand-primary dark:text-primary-white">
                  {content}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 투표 항목 */}
      <div className="flex flex-col items-center gap-5">
        {options.map((option, i) => (
          <ProgressBar
            key={i}
            label={option.label}
            isSelected={option.isSelected}
            currentVotes={option.currentVotes}
            totalVotes={totalVotes}
          />
        ))}
      </div>
    </div>
  );
}
