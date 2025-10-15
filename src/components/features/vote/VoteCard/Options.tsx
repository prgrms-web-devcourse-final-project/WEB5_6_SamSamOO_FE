'use client';

import * as React from 'react';
import ProgressBar from '../ProgressBar';
import { useVoteMutation } from '@/hooks/useVoteMutation';
import type { VoteOptionModel } from '@/types/voteCard';

/**
 * VoteCard.Options
 * - 진행/마감 상태별 ProgressBar variant 적용
 * - 반응형 & 카드 내부 폭과 동일 정렬
 */
export default function Options({
  pollId,
  options,
  totalVotes,
  status = 'ongoing',
}: {
  pollId: number;
  options: VoteOptionModel[];
  totalVotes: number;
  status?: 'ongoing' | 'closed';
}) {
  const { mutate, isPending } = useVoteMutation();
  const isClosed = status === 'closed';

  if (!options?.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base py-6">
        투표 항목이 없습니다.
      </p>
    );
  }

  return (
    <div
      className="
        flex flex-col items-stretch w-full
        gap-3 sm:gap-4
        text-sm sm:text-base
        transition-all
      "
    >
      {options.map((opt, idx) => {
        const variant = !isClosed ? 'ongoing' : idx % 2 === 0 ? 'closed1' : 'closed2';

        return (
          <ProgressBar
            key={idx}
            label={opt.label}
            currentVotes={opt.currentVotes}
            totalVotes={totalVotes}
            isSelected={opt.isSelected}
            disabled={isClosed || opt.isSelected || isPending}
            onSelect={() => !isClosed && mutate({ pollId, index: idx + 1 })}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
