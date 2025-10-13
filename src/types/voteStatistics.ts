export interface AgeGroupCount {
  option: string;
  ageGroup: string;
  voteCount: number;
}

export interface GenderCount {
  option: string;
  gender: 'MALE' | 'FEMALE';
  voteCount: number;
}

export interface OptionAgeStatic {
  pollItemsId: number;
  pollOptionIndex: number;
  ageGroupCounts: AgeGroupCount[];
}

export interface OptionGenderStatic {
  pollItemsId: number;
  pollOptionIndex: number;
  genderCounts: GenderCount[];
}

export interface VoteStatisticsResult {
  postId: number;
  pollId: number;
  optionAgeStatics: OptionAgeStatic[];
  optionGenderStatics: OptionGenderStatic[];
}

export interface VoteStatisticsResponse {
  code: number;
  message: string;
  result: VoteStatisticsResult;
}
