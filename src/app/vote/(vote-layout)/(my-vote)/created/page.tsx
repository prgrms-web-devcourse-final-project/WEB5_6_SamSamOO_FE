'use client';

import VoteCard from '@/components/features/vote/VoteCard';
import GraphWrapper from '@/components/features/vote/GraphWrapper';
import { useCreatedVotes } from '@/hooks/useCreatedVotes';
import type { VoteDraft } from '@/store/voteModalStore';

/**
 * CreatedPage
 * - 내가 생성한 투표 목록
 * - 진행중 + 마감 혼합
 * - 수정/삭제 메뉴 포함
 * - 반응형 지원 (모바일 간격 축소)
 */
export default function CreatedPage() {
  const { data: votes = [], status, refetch } = useCreatedVotes();

  // 로딩 상태
  if (status === 'pending')
    return <div className="py-32 sm:py-40 text-center text-base sm:text-lg">불러오는 중...</div>;

  // 오류 상태
  if (status === 'error')
    return (
      <div className="center-col py-32 sm:py-40 gap-3 text-center">
        <p className="text-red-500 font-bold text-base sm:text-lg">서버 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="btn-primary text-sm sm:text-base px-4 py-2 rounded-full"
        >
          다시 시도
        </button>
      </div>
    );

  // 빈 목록
  if (!votes.length)
    return (
      <div className="center-col py-32 sm:py-40 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          생성한 투표가 없습니다.
        </p>
      </div>
    );

  // 메인 렌더링
  return (
    <div className="center-col gap-15 pb-20 pt-10">
      {votes.map((post) => {
        const draft: VoteDraft | undefined =
          post.participants === 0 && post.pollId !== undefined
            ? {
                postId: post.id,
                pollId: post.pollId,
                category: post.category,
                title: post.title,
                content: post.content,
                option1: post.options[0]?.label ?? '',
                option2: post.options[1]?.label ?? '',
                reservedCloseAt: post.reservedCloseAt ?? new Date().toISOString(),
              }
            : undefined;

        return (
          <VoteCard key={post.id} status={post.status}>
            {/* 제목 + 본문 */}
            <VoteCard.HeaderBody
              postId={post.id}
              category={post.category}
              participants={post.participants}
              remainingTime={post.remainingTime}
              status={post.status}
              title={post.title}
              content={post.content}
              showActionMenu={post.participants === 0}
              draft={draft}
            />

            {/* 마감된 투표 그래프 */}
            <VoteCard.Graph status={post.status}>
              <GraphWrapper pollId={post.pollId ?? post.id} />
            </VoteCard.Graph>

            {/* 투표 옵션 */}
            <VoteCard.Options
              pollId={post.pollId ?? post.id}
              options={post.options}
              totalVotes={post.participants}
              status={post.status}
            />
          </VoteCard>
        );
      })}
    </div>
  );
}
