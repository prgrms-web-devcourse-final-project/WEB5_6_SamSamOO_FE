'use client';

import React from 'react';
import Gavel from '@/assets/icons/gavel.svg';
import Plus from '@/assets/icons/plus.svg';
import Time from '@/assets/icons/time.svg';
import { TimeSlider } from '@/components/features/vote/TimeSlider';
import { calSliderTime } from '@/utils/calSliderTime';

interface Props {
  onClose: () => void;
}

/**
 * CreateVoteForm
 * 투표 생성 폼
 * - 슬라이더를 이용해 투표 게시 시간을 설정 (1시간~7일)
 * - 제목, 내용, 항목 입력 후 "생성하기"로 제출
 */
export default function CreateVoteForm({ onClose }: Props) {
  const [duration, setDuration] = React.useState<number>(100); // 시간 단위 (기본 100시간)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const options = [formData.get('option1'), formData.get('option2')].filter(Boolean);

    console.log({ title, content, options, duration });

    // TODO: 백엔드 연동 로직

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 헤더 */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="h-10 bg-brand-primary rounded-full flex items-center gap-2 px-5 dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px]"
          >
            <Gavel className="text-primary-white scale-150" />
            <p className="text-primary-white">임대차 분쟁</p>
          </button>

          <div className="w-[280px] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Time className="text-brand-primary dark:text-brand-accent scale-150" />
              <p className="text-brand-primary text-lg dark:text-primary-white">게시 시간 :</p>
              <p className="text-brand-primary font-bold text-lg dark:text-brand-accent">
                {calSliderTime(duration)}
              </p>
            </div>

            <TimeSlider
              defaultValue={[duration]}
              onChange={(val: number) => setDuration(val)}
              max={168}
              step={1}
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-10 bg-brand-primary rounded-full flex items-center gap-1 px-4 dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px]"
        >
          <Plus className="text-primary-white" />
          <p className="text-primary-white">생성하기</p>
        </button>
      </header>

      {/* 본문 */}
      <div className="bg-[#f8f8f8] h-88 rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.30)] flex flex-col dark:bg-background-black1">
        <div className="bg-white rounded-3xl flex px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.30)] gap-2 flex-shrink-0 border-[#a3a3a3] border-1 dark:bg-background-black2 dark:border-[#a3a3a3]">
          <p className="text-brand-primary text-4xl font-bold dark:text-brand-accent">Q.</p>
          <input
            type="text"
            name="title"
            autoFocus
            placeholder="논쟁 제목을 입력해주세요."
            className="text-xl focus:animate-blink outline-none font-bold text-brand-primary flex-1 dark:text-primary-white"
          />
        </div>

        <div className="p-6 flex-1">
          <textarea
            name="content"
            placeholder="논쟁 내용을 입력해주세요."
            className="w-full h-full resize-none font-bold outline-none text-lg bg-transparent"
          />
        </div>
      </div>

      {/* 투표 항목 */}
      <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          name="option1"
          placeholder="투표 항목을 입력해 주세요"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] py-4 px-5 font-bold outline-none text-brand-primary text-lg dark:bg-background-black1 dark:text-primary-white"
        />
        <input
          type="text"
          name="option2"
          placeholder="투표 항목을 입력해 주세요"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] py-4 px-5 font-bold outline-none text-brand-primary text-lg dark:bg-background-black1 dark:text-primary-white"
        />
      </div>
    </form>
  );
}
