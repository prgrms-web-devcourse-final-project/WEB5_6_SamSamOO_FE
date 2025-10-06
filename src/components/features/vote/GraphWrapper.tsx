import { DivergingBarChart } from './DivergingBarChart';
import { DonutChart } from './DonutChart';
import { Legend } from './Legend';

function GraphWrapper() {
  const maleData = { positive: 65, negative: 35 };
  const femaleData = { positive: 45, negative: 55 };

  const ageData = [
    { label: '10대', positive: 45, negative: 55 },
    { label: '20대', positive: 70, negative: 30 },
    { label: '30대', positive: 62, negative: 38 },
    { label: '40대', positive: 58, negative: 42 },
    { label: '50대', positive: 55, negative: 45 },
    { label: '60대', positive: 48, negative: 52 },
    { label: '70대+', positive: 40, negative: 60 },
  ];
  return (
    <div>
      <div className="center-row">
        <DonutChart data={maleData} label="남자" />
        <DonutChart data={femaleData} label="여자" />
        <DivergingBarChart data={ageData} />
      </div>
      <div className="center-row gap-5">
        <Legend color="bg-brand-primary" text="임대인의 행위가 정당하다" />
        <Legend color="bg-[#AFCFFF]" text="임대인의 행위가 부당하다" />
      </div>
    </div>
  );
}
export default GraphWrapper;
