export type VoteStatus = 'ONGOING' | 'CLOSED';

export interface VoteStatistic {
  gender: string;
  ageGroup: string;
  voteCount: number;
}

export interface PollOption {
  pollItemsId: number;
  content: string;
  voteCount: number;
  statics: VoteStatistic[];
  pollOptionIndex: number;
  voted: boolean;
}

export interface Poll {
  pollId: number;
  postId: number;
  voteTitle: string;
  status: VoteStatus;
  createdAt: string;
  closedAt: string;
  expectedCloseAt: string;
  pollOptions: PollOption[];
  totalVoteCount: number;
}

export interface VotePost {
  postId: number;
  memberId: number;
  postName: string;
  postContent: string;
  category: string;
  createdAt: string;
  poll: Poll;
}

export interface VoteResponse {
  code: number;
  message: string;
  result: {
    content: VotePost[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}
