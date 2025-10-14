'use client';

import { postDataInfo } from '@/api/data/getDataCount';
import { CountUp } from '@/components/ui/CountUp';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DataInfo {
  imageName: string;
  count: number;
  start: number;
  content: string;
  duration: number;
}

function DataCountArea() {
  const [dataInfo, setDataInfo] = useState<DataInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const dataCount = await postDataInfo();
        if (!dataCount) return;

        const data = [
          {
            imageName: 'dataRate',
            count:
              dataCount.chatCount +
              dataCount.lawCount +
              dataCount.precedentCount +
              dataCount.voteCount,
            start: 0,
            content: '전체 데이터 갯수',
            duration: 2,
          },
          {
            imageName: 'lawRate',
            count: dataCount.lawCount + dataCount.precedentCount,
            start: 0,
            content: '법령 및 판례 갯수',
            duration: 2,
          },
          {
            imageName: 'wordRate',
            count: dataCount.chatCount,
            start: 0,
            content: '전체 상담 횟수',
            duration: 2,
          },
          {
            imageName: 'voteRate',
            count: dataCount.voteCount,
            start: 0,
            content: '열린 투표 갯수',
            duration: 2,
          },
        ];

        setDataInfo(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 bg-background-white dark:bg-primary-black shadow-landing-1 rounded-[30px] max-w-[1200px] w-[90%]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="center-row gap-3 py-10 animate-pulse">
            <div className="w-[60px] h-[69px] bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-[150px]">
              <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (dataInfo.length === 0) {
    return (
      <div className="center-col bg-background-white dark:bg-primary-black shadow-landing-1 rounded-[30px] h-[120px] max-w-[1200px] w-[90%]">
        데이터가 존재하지 않습니다. 나중에 다시 시도해주세요
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 bg-background-white dark:bg-primary-black shadow-landing-1 rounded-[30px] max-w-[1200px] w-[90%]"
      role="list"
      aria-label="서비스 주요 통계"
    >
      {dataInfo.map((info, index) => (
        <div key={index} className="center-row gap-3 py-10" role="listitem">
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
              separator={true}
              className="text-3xl font-extrabold"
            />
            <p className="text-[20px] font-semibold text-[#585858] dark:text-[#ADADAD]">
              {info.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataCountArea;
