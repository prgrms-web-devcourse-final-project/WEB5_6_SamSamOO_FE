'use client';

import VoteCard from '@/components/features/vote/VoteCard';
import GraphWrapper from '@/components/features/vote/GraphWrapper';
import { useCreatedVotes } from '@/hooks/useCreatedVotes';

/**
 * 내가 생성한 투표 페이지
 * - 진행중 + 마감 혼합
 * - 수정/삭제 메뉴 포함
 */
export default function CreatedPage() {
  const { data: votes = [], status, refetch } = useCreatedVotes();

  if (status === 'pending') return <div className="py-40 text-center text-lg">불러오는 중...</div>;

  if (status === 'error')
    return (
      <div className="center-col py-40 gap-3 text-center">
        <p className="text-red-500 font-bold">서버 오류가 발생했습니다.</p>
        <button onClick={() => refetch()} className="btn-primary">
          다시 시도
        </button>
      </div>
    );

  if (!votes.length)
    return (
      <div className="center-col py-40 text-center text-lg">
        <p>생성한 투표가 없습니다.</p>
      </div>
    );

  return (
    <div className="center-col gap-15 pb-20 pt-10">
      {votes.map((post) => (
        <VoteCard key={post.id} status={post.status}>
          <VoteCard.HeaderBody
            postId={post.id}
            category={post.category}
            participants={post.participants}
            remainingTime={post.remainingTime}
            status={post.status}
            title={post.title}
            content={post.content}
            showActionMenu
          />
          <VoteCard.Graph status={post.status}>
            <GraphWrapper pollId={post.id} />
          </VoteCard.Graph>
          <VoteCard.Options
            pollId={post.id}
            options={post.options}
            totalVotes={post.participants}
            status={post.status}
          />
        </VoteCard>
      ))}
    </div>
  );
}
