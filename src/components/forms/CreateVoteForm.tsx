'use client';

import { useRouter } from 'next/navigation';
import { useCreateVoteMutation } from '@/hooks/useCreateVoteMutation';
import { useUpdateVoteMutation } from '@/hooks/useUpdateVoteMutation';
import Plus from '@/assets/icons/plus.svg';
import Time from '@/assets/icons/time.svg';
import { TimeSlider } from '@/components/features/vote/TimeSlider';
import { calSliderTime } from '@/utils/calSliderTime';
import SelectCategory, { CategoryOption } from '@/components/features/vote/SelectCategory';
import type { VoteFormData } from '@/store/voteModalStore';
import { useState, useEffect } from 'react';

const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: '부동산 분쟁', value: '부동산 분쟁' },
  { label: '형사 분쟁', value: '형사 분쟁' },
  { label: '민사 분쟁', value: '민사 분쟁' },
  { label: '노동 분쟁', value: '노동 분쟁' },
  { label: '가정 분쟁', value: '가정 분쟁' },
  { label: '기타', value: '기타' },
];

/** 투표 생성/수정 폼 */
export default function CreateVoteForm({
  mode = 'create',
  initialData,
  postId,
  onClose,
}: {
  mode?: 'create' | 'edit';
  initialData?: VoteFormData;
  postId?: number;
  onClose: () => void;
}) {
  const router = useRouter();
  const isEditing = mode === 'edit';

  const createMutation = useCreateVoteMutation();
  const updateMutation = useUpdateVoteMutation();

  const [category, setCategory] = useState(initialData?.category ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [option1, setOption1] = useState(initialData?.option1 ?? '');
  const [option2, setOption2] = useState(initialData?.option2 ?? '');
  const [duration, setDuration] = useState(() => {
    if (!initialData?.reservedCloseAt) return 72;
    const remainMs = new Date(initialData.reservedCloseAt).getTime() - Date.now();
    return Math.max(1, Math.round(remainMs / 3_600_000));
  });

  useEffect(() => {
    if (!initialData) return;
    setCategory(initialData.category);
    setTitle(initialData.title);
    setContent(initialData.content);
    setOption1(initialData.option1);
    setOption2(initialData.option2);
    if (initialData.reservedCloseAt) {
      const remainMs = new Date(initialData.reservedCloseAt).getTime() - Date.now();
      setDuration(Math.max(1, Math.round(remainMs / 3_600_000)));
    }
  }, [initialData]);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const errorMessage = createMutation.error?.message ?? updateMutation.error?.message;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category || !title || !content || !option1 || !option2) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    const reservedCloseAt =
      isEditing && initialData?.reservedCloseAt
        ? initialData.reservedCloseAt
        : new Date(Date.now() + duration * 3_600_000).toISOString();

    if (isEditing) {
      if (!postId) return console.error('[CreateVoteForm] postId 없음');
      updateMutation.mutate(
        {
          postId,
          payload: {
            postName: title,
            postContent: content,
            category,
            poll: {
              voteTitle: '당신의 선택은?',
              pollOptions: [{ content: option1 }, { content: option2 }],
              reservedCloseAt,
            },
          },
        },
        { onSuccess: () => (onClose(), router.refresh()) },
      );
    } else {
      createMutation.mutate(
        {
          post: { postName: title, postContent: content, category },
          poll: {
            voteTitle: '당신의 선택은?',
            pollOptions: [{ content: option1 }, { content: option2 }],
            reservedCloseAt,
          },
        },
        { onSuccess: () => (onClose(), router.push('/vote/ongoing')) },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      {/* 헤더 */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full">
          <SelectCategory
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
            disabled={isSubmitting}
            className="min-w-[140px] sm:min-w-[160px]"
          />

          <div className="flex flex-col gap-2 sm:w-[280px] w-full">
            {!isEditing ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Time className="text-brand-primary dark:text-brand-accent scale-125 sm:scale-150" />
                  <p className="text-brand-primary text-base sm:text-lg dark:text-primary-white">
                    게시 기간 :
                  </p>
                  <p className="text-brand-primary font-bold text-base sm:text-lg dark:text-brand-accent">
                    {calSliderTime(duration)}
                  </p>
                </div>
                <TimeSlider
                  key={initialData?.reservedCloseAt ?? 'create'}
                  defaultValue={[duration]}
                  onChange={(v: number) => setDuration(v)}
                  max={168}
                  step={1}
                />
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-300">
                마감 시간은 수정할 수 없습니다.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1 whitespace-nowrap bg-brand-primary dark:bg-brand-accent 
                     rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-primary-white 
                     text-sm sm:text-base font-medium transition-all duration-200
                     hover:brightness-110 hover:-translate-y-[2px]
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-primary-white shrink-0" />
          <span className="truncate">
            {isSubmitting ? '처리 중...' : isEditing ? '수정하기' : '생성하기'}
          </span>
        </button>
      </header>

      {/* 본문 */}
      <div className="bg-[#f8f8f8] min-h-[300px] sm:h-88 rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] flex flex-col dark:bg-background-black1">
        <div className="bg-white rounded-3xl flex px-3 sm:px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.3)] gap-2 border border-[#a3a3a3] dark:bg-background-black2 dark:border-[#a3a3a3]">
          <p className="text-brand-primary text-2xl sm:text-4xl font-bold dark:text-brand-accent">
            Q.
          </p>
          <input
            type="text"
            name="title"
            autoFocus
            placeholder="분쟁 제목을 입력해 주세요."
            maxLength={100}
            className="text-base sm:text-xl outline-none font-semibold text-brand-primary flex-1 dark:text-primary-white select-text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="p-4 sm:p-6 flex-1">
          <textarea
            name="content"
            placeholder="분쟁 내용을 입력해 주세요."
            className="w-full h-full resize-none outline-none text-sm sm:text-lg bg-transparent text-brand-primary dark:text-primary-white select-text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* 옵션 */}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <input
          type="text"
          name="option1"
          placeholder="투표 옵션 1"
          maxLength={100}
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] py-3 sm:py-4 px-4 sm:px-5 font-bold outline-none text-brand-primary text-base sm:text-lg dark:bg-background-black1 dark:text-primary-white select-text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="text"
          name="option2"
          placeholder="투표 옵션 2"
          maxLength={100}
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] py-3 sm:py-4 px-4 sm:px-5 font-bold outline-none text-brand-primary text-base sm:text-lg dark:bg-background-black1 dark:text-primary-white select-text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center text-sm sm:text-base">{errorMessage}</p>
      )}
    </form>
  );
}
