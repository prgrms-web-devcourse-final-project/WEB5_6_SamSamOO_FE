'use client';

import VoteCard from '@/components/features/vote/VoteCard';
import GraphWrapper from '@/components/features/vote/GraphWrapper';
import { useCreatedVotes } from '@/hooks/useCreatedVotes';

/**
 * 내가 생성한 투표 페이지
 * - 진행중 + 마감 혼합
 * - 진행중: 투표 가능 / 마감: 통계 표시
 */
export default function CreatedPage() {
  const { data: votes = [], status, refetch } = useCreatedVotes();

  if (status === 'pending') return <div className="py-40 text-center">불러오는 중...</div>;

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
      <div className="center-col py-40 text-center">
        <p>생성한 투표가 없습니다.</p>
      </div>
    );

  return (
    <div className="center-col gap-15 pb-20 pt-10">
      {votes.map((post) => (
        <VoteCard key={post.id} status={post.status}>
          {/* 제목 + 본문 */}
          <VoteCard.HeaderBody {...post} />

          {/* 마감 시 그래프 표시 */}
          <VoteCard.Graph status={post.status}>
            <GraphWrapper pollId={post.id} />
          </VoteCard.Graph>

          {/* 옵션 (진행중이면 투표 가능 / 마감이면 비활성화) */}
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
