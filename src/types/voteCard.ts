// 데이터 형식 정규화 용도
export interface VoteOptionModel {
  label: string;
  currentVotes: number;
  isSelected: boolean;
}

export interface VoteCardModel {
  id: number;
  category: string;
  participants: number;
  remainingTime: string;
  status: 'ongoing' | 'closed';
  title: string;
  content: string;
  options: VoteOptionModel[];
}
