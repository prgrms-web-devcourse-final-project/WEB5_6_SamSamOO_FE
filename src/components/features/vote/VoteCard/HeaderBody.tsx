'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Gavel from '@/assets/icons/gavel.svg';
import Time from '@/assets/icons/time.svg';
import Indicator from '@/assets/icons/indicator.svg';
import Voter from '@/assets/icons/voter.svg';
import SelectDown from '@/assets/icons/selectDown.svg';
import VoteActionMenu from '@/components/features/vote/VoteActionMenu';
import { useDeleteVoteMutation } from '@/hooks/useDeleteVoteMutation';
import type { VoteDraft } from '@/store/voteModalStore';

interface HeaderBodyProps {
  postId?: number;
  category: string;
  participants: number;
  remainingTime: string;
  status: 'ongoing' | 'closed';
  title: string;
  content: string;
  showActionMenu?: boolean;
  draft?: VoteDraft;
}

export default function HeaderBody({
  postId,
  category,
  participants,
  remainingTime,
  status,
  title,
  content,
  showActionMenu = false,
  draft,
}: HeaderBodyProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: deleteVote } = useDeleteVoteMutation();

  const statusInfo =
    status === 'ongoing'
      ? { text: '진행중', color: '#259D00' }
      : { text: '마감', color: '#EE4444' };

  const handleDelete = () => {
    if (!postId) return;
    if (window.confirm('정말 삭제하시겠습니까?')) deleteVote(postId);
  };

  return (
    <>
      {/* 헤더 */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* 왼쪽: 카테고리 / 상태 / 참여자 / 시간 */}
        <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-3">
          {/* 첫 줄: 카테고리 + 상태 (같은 줄) */}
          <div className="flex items-center justify-between w-full sm:w-auto sm:gap-3">
            {/* 카테고리 */}
            <div className="flex items-center h-10 sm:h-11 bg-brand-primary rounded-full gap-2 px-3 sm:px-5 dark:bg-primary-gray3 dark:border dark:border-[#a3a3a3]">
              <Gavel className="text-primary-white w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-primary-white text-sm sm:text-base">{category}</p>
            </div>

            {/* 상태 (같은 줄 오른쪽) */}
            <div className="flex items-center gap-1 ml-3 sm:ml-0 sm:hidden">
              <Indicator style={{ color: statusInfo.color }} />
              <p className="font-bold text-sm" style={{ color: statusInfo.color }}>
                {statusInfo.text}
              </p>
            </div>
          </div>

          {/* 두 번째 줄: 참여자 + 게시 시간 */}
          <div className="flex items-center justify-start gap-3 mt-1.5 sm:mt-0 sm:ml-2 sm:gap-3 sm:flex-row text-sm sm:text-base">
            <div className="flex items-center gap-1 sm:gap-2">
              <Voter className="text-brand-primary dark:text-brand-accent w-4 h-4 sm:w-5 sm:h-5" />
              <p>{participants.toLocaleString()}명 참여</p>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Time className="text-brand-primary dark:text-brand-accent w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-brand-primary dark:text-primary-white">게시 시간 :</span>
              <span className="font-bold text-brand-primary dark:text-brand-accent">
                {remainingTime}
              </span>
            </div>
          </div>

          {/* 상태 (데스크탑 전용, 맨 오른쪽) */}
          <div className="hidden sm:flex items-center gap-1 text-sm sm:text-base ml-auto">
            <Indicator style={{ color: statusInfo.color }} />
            <p className="font-bold" style={{ color: statusInfo.color }}>
              {statusInfo.text}
            </p>
          </div>
        </div>

        {/* 우측 메뉴 */}
        {showActionMenu && (
          <div className="flex justify-end sm:justify-start mt-2 sm:mt-0">
            <VoteActionMenu draft={draft} onDelete={handleDelete} />
          </div>
        )}
      </header>

      {/* 본문 */}
      <div className="bg-[#f8f8f8] rounded-2xl sm:rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden dark:bg-background-black1 transition-all duration-500">
        {/* 제목 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl flex items-center px-3 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-[#a3a3a3] dark:bg-background-black2 dark:border-[#a3a3a3]">
          <p className="text-brand-primary text-2xl sm:text-3xl font-bold dark:text-brand-accent shrink-0">
            Q.
          </p>
          <p
            className="
              flex-1 text-base sm:text-xl font-semibold
              text-brand-primary dark:text-primary-white
              truncate text-ellipsis overflow-hidden whitespace-nowrap
              max-w-[calc(100%-2.5rem)]
            "
            title={title}
          >
            {title}
          </p>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex-shrink-0 p-1 ml-1 transition-transform duration-300"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <SelectDown className="size-3 sm:size-4" />
            </motion.div>
          </button>
        </div>

        {/* 본문 슬라이드 */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="vote-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <p
                  className="
                    text-sm sm:text-base lg:text-lg leading-relaxed
                    text-brand-primary dark:text-primary-white
                    whitespace-pre-line break-words overflow-wrap-anywhere
                  "
                >
                  {content}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
