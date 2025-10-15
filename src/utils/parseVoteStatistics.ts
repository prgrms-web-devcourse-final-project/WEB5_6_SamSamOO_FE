import type {
  VoteStatisticsResponse,
  OptionAgeStatic,
  OptionGenderStatic,
  AgeGroupCount,
  GenderCount,
} from '@/types/voteStatistics';

const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대', '60대', '70대+'];

export function parseVoteStatistics(data: VoteStatisticsResponse) {
  const result = data?.result;
  if (!result) {
    return { maleData: null, femaleData: null, ageData: [], optionLabels: [] };
  }

  const optionGenderStatics: OptionGenderStatic[] = result.optionGenderStatics ?? [];
  const optionAgeStatics: OptionAgeStatic[] = result.optionAgeStatics ?? [];

  const genderByIndex: Record<number, OptionGenderStatic | undefined> = {
    1: optionGenderStatics.find((g) => g.pollOptionIndex === 1),
    2: optionGenderStatics.find((g) => g.pollOptionIndex === 2),
  };
  const ageByIndex: Record<number, OptionAgeStatic | undefined> = {
    1: optionAgeStatics.find((a) => a.pollOptionIndex === 1),
    2: optionAgeStatics.find((a) => a.pollOptionIndex === 2),
  };

  const maleVotes = { positive: 0, negative: 0 };
  const femaleVotes = { positive: 0, negative: 0 };

  (genderByIndex[1]?.genderCounts ?? []).forEach((g: GenderCount) => {
    if (g.gender === 'MALE') maleVotes.positive += g.voteCount ?? 0;
    if (g.gender === 'FEMALE') femaleVotes.positive += g.voteCount ?? 0;
  });
  (genderByIndex[2]?.genderCounts ?? []).forEach((g: GenderCount) => {
    if (g.gender === 'MALE') maleVotes.negative += g.voteCount ?? 0;
    if (g.gender === 'FEMALE') femaleVotes.negative += g.voteCount ?? 0;
  });

  const totalMale = maleVotes.positive + maleVotes.negative || 1;
  const totalFemale = femaleVotes.positive + femaleVotes.negative || 1;

  const maleData = {
    positive: Math.round((maleVotes.positive / totalMale) * 100),
    negative: Math.round((maleVotes.negative / totalMale) * 100),
  };
  const femaleData = {
    positive: Math.round((femaleVotes.positive / totalFemale) * 100),
    negative: Math.round((femaleVotes.negative / totalFemale) * 100),
  };

  const ageData = AGE_GROUPS.map((age: string) => {
    const posList: AgeGroupCount[] = ageByIndex[1]?.ageGroupCounts ?? [];
    const negList: AgeGroupCount[] = ageByIndex[2]?.ageGroupCounts ?? [];

    const positive = posList
      .filter((a: AgeGroupCount) => a.ageGroup === age)
      .reduce((sum: number, a: AgeGroupCount) => sum + (a.voteCount ?? 0), 0);

    const negative = negList
      .filter((a: AgeGroupCount) => a.ageGroup === age)
      .reduce((sum: number, a: AgeGroupCount) => sum + (a.voteCount ?? 0), 0);

    const total = positive + negative || 1;

    return {
      label: age,
      positive: Math.round((positive / total) * 100),
      negative: Math.round((negative / total) * 100),
    };
  });

  const optionLabel1 =
    ageByIndex[1]?.ageGroupCounts?.[0]?.option ??
    genderByIndex[1]?.genderCounts?.[0]?.option ??
    '선택지 1';
  const optionLabel2 =
    ageByIndex[2]?.ageGroupCounts?.[0]?.option ??
    genderByIndex[2]?.genderCounts?.[0]?.option ??
    '선택지 2';
  const optionLabels = [optionLabel1, optionLabel2];

  return { maleData, femaleData, ageData, optionLabels };
}
