'use client';

import * as React from 'react';
import { DonutChart } from './DonutChart';
import { DivergingBarChart } from './DivergingBarChart';
import { Legend } from './Legend';
import { useVoteStatistics } from '@/hooks/useVoteStatistics';
import { parseVoteStatistics } from '@/utils/parseVoteStatistics';

export default function GraphWrapper({ pollId }: { pollId: number }) {
  const { data, isLoading, isError } = useVoteStatistics(pollId);

  if (isLoading) return <p className="text-center py-8">통계 불러오는 중...</p>;
  if (isError || !data?.result)
    return <p className="text-center py-8 text-gray-500">통계를 불러오지 못했습니다.</p>;

  const { maleData, femaleData, ageData, optionLabels } = parseVoteStatistics(data);

  if (!maleData || !femaleData || !ageData.length)
    return <p className="text-center py-8 text-gray-500">통계 데이터가 부족합니다.</p>;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 도넛 2개 + 연령별 막대 차트 */}
      <div className="flex justify-center items-center gap-8">
        <DonutChart data={maleData} label="남성" />
        <DonutChart data={femaleData} label="여성" />
        <DivergingBarChart data={ageData} />
      </div>

      {/* 범례 */}
      <div className="flex justify-center items-center gap-5">
        <Legend color="bg-brand-primary dark:bg-brand-accent" text={optionLabels[0] ?? '옵션 1'} />
        <Legend color="bg-[#AFCFFF] dark:bg-[#DBD3D3]" text={optionLabels[1] ?? '옵션 2'} />
      </div>
    </div>
  );
}
