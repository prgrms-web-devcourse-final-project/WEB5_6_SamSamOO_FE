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
import { useAlertStore } from '@/store/useAlertStore';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';

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
  const showAlert = useAlertStore((s) => s.showAlert);

  const statusInfo =
    status === 'ongoing'
      ? { text: '진행중', color: '#259D00' }
      : { text: '마감', color: '#EE4444' };

  const handleDelete = () => {
    if (!postId) return;

    showAlert('투표 삭제', '정말 이 투표를 삭제하시겠습니까?', async () => {
      try {
        deleteVote(postId);
        showSuccessToast('투표가 삭제되었습니다.');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        showErrorToast('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    });
  };

  return (
    <>
      {/* 헤더 */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* 상단: 카테고리 / 참여자 / 시간 / (보트액션+상태) */}
        <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between">
          {/* 왼쪽 영역 */}
          <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-3 sm:flex-wrap">
            {/* 첫 줄: 카테고리 + 보트액션 + 상태 (모바일) */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start sm:gap-3 flex-wrap">
              {/* 카테고리 */}
              <div className="flex items-center h-10 sm:h-11 bg-brand-primary rounded-full gap-2 px-3 sm:px-5 dark:bg-primary-gray3 dark:border dark:border-[#a3a3a3]">
                <Gavel className="text-primary-white w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-primary-white text-sm sm:text-base">{category}</p>
              </div>

              {/* 모바일 전용: 보트액션 + 상태 */}
              <div className="flex items-center flex-nowrap gap-2 sm:hidden">
                {showActionMenu && (
                  <div className="flex-shrink-0">
                    <VoteActionMenu draft={draft} onDelete={handleDelete} />
                  </div>
                )}
                <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
                  <Indicator style={{ color: statusInfo.color }} />
                  <p className="font-bold text-sm" style={{ color: statusInfo.color }}>
                    {statusInfo.text}
                  </p>
                </div>
              </div>
            </div>

            {/* 두 번째 줄: 참여자 + 게시 시간 */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 sm:mt-0 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-1 flex-shrink-0">
                <Voter className="text-brand-primary dark:text-brand-accent w-4 h-4 sm:w-6 sm:h-6" />
                <p>{participants.toLocaleString()}명 참여</p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Time className="text-brand-primary dark:text-brand-accent w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-brand-primary dark:text-primary-white">게시 시간 :</span>
                <span className="font-bold text-brand-primary dark:text-brand-accent">
                  {remainingTime}
                </span>
              </div>
            </div>
          </div>

          {/* 데스크탑 전용: 보트액션 + 상태 */}
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            {showActionMenu && <VoteActionMenu draft={draft} onDelete={handleDelete} />}
            <div className="flex items-center gap-1 text-base whitespace-nowrap">
              <Indicator style={{ color: statusInfo.color }} />
              <p className="font-bold" style={{ color: statusInfo.color }}>
                {statusInfo.text}
              </p>
            </div>
          </div>
        </div>
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
