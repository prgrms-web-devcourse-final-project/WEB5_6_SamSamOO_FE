import { CountUp } from '@/components/ui/CountUp';
import Image from 'next/image';

const dataInfo = [
  {
    imageName: 'dataRate',
    count: 25254925,
    start: 25254000,
    content: '전체 데이터 갯수',
    duration: 4,
  },
  {
    imageName: 'lawRate',
    count: 12354231,
    start: 12354000,
    content: '법령 및 판례 갯수',
    duration: 4,
  },
  { imageName: 'wordRate', count: 152, start: 0, content: '전체 상담 횟수', duration: 4 },
  { imageName: 'voteRate', count: 254, start: 0, content: '열린 투표 갯수', duration: 4 },
];

function DataInfo() {
  return (
    <section className="min-h-[50vh] center-col text-primary-black dark:text-primary-white bg-[#f4f4f4] dark:bg-background-black1">
      <h2 className="a11y">데이터 정보 섹션</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 bg-background-white dark:bg-primary-black shadow-landing-1 rounded-[30px] max-w-[1200px] w-[90%]"
        role="list"
        aria-label="서비스 주요 통계"
      >
        {dataInfo.map((info, index) => (
          <div key={index} className="center-row gap-3 py-10">
            <Image
              src={`/images/${info.imageName}.png`}
              width={60}
              height={69}
              alt={`${info.content} 아이콘`}
              loading="lazy"
            />
            <div className="w-[150px]">
              <CountUp
                start={info.start}
                end={info.count}
                duration={info.duration}
                className="text-3xl font-extrabold"
              />
              <p className="text-[20px] font-semibold text-[#585858] dark:text-[#ADADAD]">
                {info.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default DataInfo;
