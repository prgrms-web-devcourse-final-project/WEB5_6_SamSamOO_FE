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

interface HeaderBodyProps {
  postId?: number;
  category: string;
  participants: number;
  remainingTime: string;
  status: 'ongoing' | 'closed';
  title: string;
  content: string;
  showActionMenu?: boolean;
}

/**
 * VoteCard.HeaderBody
 * - 헤더(카테고리, 참여자, 남은 시간, 상태)
 * - 본문(질문/내용)
 * - 삭제 메뉴 연동
 */
export default function HeaderBody({
  postId,
  category,
  participants,
  remainingTime,
  status,
  title,
  content,
  showActionMenu = false,
}: HeaderBodyProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: deleteVote } = useDeleteVoteMutation();

  const statusInfo =
    status === 'ongoing'
      ? { text: '진행중', color: '#259D00' }
      : { text: '마감', color: '#EE4444' };

  const handleDelete = () => {
    if (!postId) return;
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteVote(postId);
    }
  };

  return (
    <>
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

        {/* 상태 표시 + 메뉴 */}
        <div className="center-row gap-6">
          {showActionMenu && (
            <VoteActionMenu onEdit={() => console.log('edit action')} onDelete={handleDelete} />
          )}
          <div className="center-row gap-2">
            <Indicator style={{ color: statusInfo.color }} />
            <p className="font-bold" style={{ color: statusInfo.color }}>
              {statusInfo.text}
            </p>
          </div>
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
    </>
  );
}
