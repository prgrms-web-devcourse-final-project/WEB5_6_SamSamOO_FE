'use client';

import React from 'react';
import { createVote } from '@/api/vote/createVote';
import Gavel from '@/assets/icons/gavel.svg';
import Plus from '@/assets/icons/plus.svg';
import Time from '@/assets/icons/time.svg';
import { TimeSlider } from '@/components/features/vote/TimeSlider';
import { calSliderTime } from '@/utils/calSliderTime';

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

/**
 * CreateVoteForm
 * - 투표 생성 폼
 * - 슬라이더로 기간 설정 + 제목, 내용, 항목 입력
 */
export default function CreateVoteForm({ onClose, onCreated }: Props) {
  const [duration, setDuration] = React.useState<number>(72); // 시간 단위 (기본값 72시간 = 3일)
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const option1 = formData.get('option1') as string;
    const option2 = formData.get('option2') as string;

    if (!title || !content || !option1 || !option2) {
      setError('모든 항목을 입력해주세요.');
      setLoading(false);
      return;
    }

    const payload = {
      post: {
        postName: title,
        postContent: content,
        category: '임대차 분쟁', // 카테고리 선택 기능 추가 예정
      },
      poll: {
        voteTitle: '당신의 선택은?',
        pollOptions: [{ content: option1 }, { content: option2 }],
        reservedCloseAt: new Date(Date.now() + duration * 60 * 60 * 1000).toISOString(),
      },
    };

    try {
      const res = await createVote(payload);

      if (res.code === 0 || res.code === 200) {
        // 목록 리패칭 트리거
        if (onCreated) {
          onCreated();
        } else {
          console.warn('[Form] ⚠️ onCreated 없음 — 리패칭 전달 안됨');
        }

        // 모달 닫기
        onClose();
      } else {
        setError(res.message || '투표 생성에 실패했습니다.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 헤더 */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="h-10 bg-brand-primary rounded-full flex items-center gap-2 px-5 
            dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px]"
          >
            <Gavel className="text-primary-white scale-150" />
            <p className="text-primary-white">임대차 분쟁</p>
          </button>

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
          disabled={loading}
          className="h-10 bg-brand-primary rounded-full flex items-center gap-1 px-4 
          dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px] 
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="text-primary-white" />
          <p className="text-primary-white">{loading ? '생성 중...' : '생성하기'}</p>
        </button>
      </header>

      {/* 본문 */}
      <div
        className="bg-[#f8f8f8] h-88 rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.30)] 
      flex flex-col dark:bg-background-black1"
      >
        <div
          className="bg-white rounded-3xl flex px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.30)] 
        gap-2 flex-shrink-0 border-[#a3a3a3] border-1 
        dark:bg-background-black2 dark:border-[#a3a3a3]"
        >
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

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
