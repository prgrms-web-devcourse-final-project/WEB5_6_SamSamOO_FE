'use client';

import ProgressBar from '../ProgressBar';
import { useVoteMutation } from '@/hooks/useVoteMutation';
import type { VoteOptionModel } from '@/types/voteCard';

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

  if (!options?.length) return <p className="text-center text-gray-500">투표 항목이 없습니다.</p>;

  return (
    <div className="flex flex-col gap-4">
      {options.map((opt, idx) => {
        const variant = !isClosed ? 'ongoing' : idx === 1 ? 'closed2' : 'closed1';

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
