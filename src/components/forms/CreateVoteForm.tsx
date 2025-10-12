'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateVoteMutation } from '@/hooks/useCreateVoteMutation';
import Plus from '@/assets/icons/plus.svg';
import Time from '@/assets/icons/time.svg';
import { TimeSlider } from '@/components/features/vote/TimeSlider';
import { calSliderTime } from '@/utils/calSliderTime';
import SelectCategory, { CategoryOption } from '@/components/features/vote/SelectCategory';

interface Props {
  onClose: () => void;
}

export default function CreateVoteForm({ onClose }: Props) {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useCreateVoteMutation();

  const [duration, setDuration] = React.useState<number>(72);

  const [category, setCategory] = React.useState<string>('');

  const categoryOptions: CategoryOption[] = [
    { label: '임대차 분쟁', value: '임대차 분쟁' },
    { label: '형사 분쟁', value: '형사 분쟁' },
    { label: '민사 분쟁', value: '민사 분쟁' },
    { label: '노동 분쟁', value: '노동 분쟁' },
    { label: '행정 분쟁', value: '행정 분쟁' },
    { label: '기타', value: '기타' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const option1 = formData.get('option1') as string;
    const option2 = formData.get('option2') as string;

    if (!category || !title || !content || !option1 || !option2) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const payload = {
      post: {
        postName: title,
        postContent: content,
        category,
      },
      poll: {
        voteTitle: '당신의 선택은?',
        pollOptions: [{ content: option1 }, { content: option2 }],
        reservedCloseAt: new Date(Date.now() + duration * 60 * 60 * 1000).toISOString(),
      },
    };

    mutate(payload, {
      onSuccess: () => {
        onClose();
        router.push('/vote/ongoing');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 헤더 */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SelectCategory
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            disabled={isPending}
            className="min-w-[160px]"
          />

          <div className="w-[280px] flex flex-col gap-2">
            <div className="flex items-center gap-2">
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
          disabled={isPending}
          className="bg-brand-primary rounded-full flex items-center gap-1 px-4 py-3
            dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px] 
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="text-primary-white" />
          <p className="text-primary-white">{isPending ? '생성 중...' : '생성하기'}</p>
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
            className="text-xl focus:animate-blink outline-none font-bold 
              text-brand-primary flex-1 dark:text-primary-white"
          />
        </div>

        <div className="p-6 flex-1">
          <textarea
            name="content"
            placeholder="논쟁 내용을 입력해주세요."
            className="w-full h-full resize-none outline-none text-md bg-transparent 
              text-brand-primary dark:text-primary-white"
          />
        </div>
      </div>

      {/* 투표 항목 */}
      <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          name="option1"
          placeholder="투표 항목 1"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] 
            py-4 px-5 font-bold outline-none text-brand-primary text-lg 
            dark:bg-background-black1 dark:text-primary-white"
        />
        <input
          type="text"
          name="option2"
          placeholder="투표 항목 2"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] 
            py-4 px-5 font-bold outline-none text-brand-primary text-lg 
            dark:bg-background-black1 dark:text-primary-white"
        />
      </div>

      {isError && <p className="text-red-500 text-center">{error?.message}</p>}
    </form>
  );
}
