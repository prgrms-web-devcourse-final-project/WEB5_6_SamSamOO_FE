// src/utils/parseVoteStatistics.ts
import type {
  VoteStatisticsResponse,
  OptionAgeStatic,
  OptionGenderStatic,
  AgeGroupCount,
  GenderCount,
} from '@/types/voteStatistics';

const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대', '60대', '70대+'];

/**
 * 📊 투표 통계 데이터 파서
 * - /api/polls/{pollId}/statics 응답을 시각화용 데이터로 변환
 * - 결측값(빈 연령대·성별)도 0으로 채워서 UI 균일성 보장
 */
export function parseVoteStatistics(data: VoteStatisticsResponse) {
  const result = data?.result;
  if (!result) {
    return { maleData: null, femaleData: null, ageData: [], optionLabels: [] };
  }

  const optionGenderStatics: OptionGenderStatic[] = result.optionGenderStatics ?? [];
  const optionAgeStatics: OptionAgeStatic[] = result.optionAgeStatics ?? [];

  /** 성별 데이터 누락 방지용 기본 구조 */
  const maleVotes = { positive: 0, negative: 0 };
  const femaleVotes = { positive: 0, negative: 0 };

  /** 성별별 투표 집계 */
  optionGenderStatics.forEach((opt: OptionGenderStatic, idx: number) => {
    const type = idx === 0 ? 'positive' : 'negative';
    (opt.genderCounts ?? []).forEach((g: GenderCount) => {
      if (g.gender === 'MALE') maleVotes[type] += g.voteCount ?? 0;
      if (g.gender === 'FEMALE') femaleVotes[type] += g.voteCount ?? 0;
    });
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

  /** 연령대별 데이터 집계 (AGE_GROUPS 기준으로 고정 위치 보장) */
  const ageData = AGE_GROUPS.map((age: string) => {
    const posList: AgeGroupCount[] = optionAgeStatics[0]?.ageGroupCounts ?? [];
    const negList: AgeGroupCount[] = optionAgeStatics[1]?.ageGroupCounts ?? [];

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

  /** 선택지 라벨 추출 (없을 경우 fallback 제공) */
  const optionLabels = [
    optionAgeStatics[0]?.ageGroupCounts?.[0]?.option ?? '선택지 1',
    optionAgeStatics[1]?.ageGroupCounts?.[0]?.option ?? '선택지 2',
  ];

  return { maleData, femaleData, ageData, optionLabels };
}
