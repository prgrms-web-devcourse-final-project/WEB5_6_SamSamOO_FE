'use client';

import { useState, useEffect } from 'react';

const LOADING_STAGES = [
  { time: 0, message: '디케가 상담 요청을 분석하고 있습니다' },
  { time: 3000, message: '관련 법령과 판례를 조회 중입니다' },
  { time: 6000, message: '정확한 답변을 위해 검토를 이어가고 있습니다' },
  { time: 9000, message: '조금만 기다려주세요. 최선의 조언을 준비 중입니다' },
  { time: 12000, message: '디케가 마지막 확인을 마치고 있습니다' },
];

export function AIMessageSkeleton() {
  const [message, setMessage] = useState(LOADING_STAGES[0].message);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timers = LOADING_STAGES.slice(1).map((stage) =>
      setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setMessage(stage.message);
          setFade(true);
        }, 300);
      }, stage.time),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent" />
      <p
        className={`text-gray-600 dark:text-gray-300 transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {message}
      </p>
    </div>
  );
}
export default AIMessageSkeleton;
