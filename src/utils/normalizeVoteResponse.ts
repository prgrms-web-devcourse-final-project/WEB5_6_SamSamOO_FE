import { VoteResponse } from '@/types/vote';
import { VoteCardModel } from '@/types/voteCard';

export function normalizeVoteResponse(data: VoteResponse): VoteCardModel[] {
  if (!data?.result?.content) return [];

  return data.result.content.map((post) => {
    const poll = post.poll;
    const totalVotes = poll.totalVoteCount ?? 0;

    return {
      id: post.postId,
      postId: post.postId,
      pollId: poll.pollId,
      category: post.category,
      participants: totalVotes,
      remainingTime: calculateRemainingTime(poll.expectedCloseAt),
      reservedCloseAt: poll.expectedCloseAt,
      status: poll.status === 'CLOSED' ? 'closed' : 'ongoing',
      title: post.postName || poll.voteTitle,
      content: post.postContent,
      options: poll.pollOptions.map((opt) => ({
        label: opt.content,
        currentVotes: opt.voteCount,
        isSelected: opt.voted,
      })),
    };
  });
}

function calculateRemainingTime(expectedCloseAt?: string): string {
  if (!expectedCloseAt) return '기간 정보 없음';
  const now = new Date();
  const end = new Date(expectedCloseAt);
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return '마감';

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}일 ${remainingHours}시간 남음`;
}
