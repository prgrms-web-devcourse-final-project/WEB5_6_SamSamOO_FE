'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateVoteMutation } from '@/hooks/useCreateVoteMutation';
import { useUpdateVoteMutation } from '@/hooks/useUpdateVoteMutation';
import Plus from '@/assets/icons/plus.svg';
import Time from '@/assets/icons/time.svg';
import { TimeSlider } from '@/components/features/vote/TimeSlider';
import { calSliderTime } from '@/utils/calSliderTime';
import SelectCategory, { CategoryOption } from '@/components/features/vote/SelectCategory';
import type { VoteFormData } from '@/store/voteModalStore';

interface CreateVoteFormProps {
  mode?: 'create' | 'edit';
  initialData?: VoteFormData;
  postId?: number;
  onClose: () => void;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: '\uBD80\uB3D9\uC0B0 \uBD84\uC7C1', value: '\uBD80\uB3D9\uC0B0 \uBD84\uC7C1' },
  { label: '\uD615\uC0AC \uBD84\uC7C1', value: '\uD615\uC0AC \uBD84\uC7C1' },
  { label: '\uBBFC\uC0AC \uBD84\uC7C1', value: '\uBBFC\uC0AC \uBD84\uC7C1' },
  { label: '\uB178\uB3D9 \uBD84\uC7C1', value: '\uB178\uB3D9 \uBD84\uC7C1' },
  { label: '\uAC00\uC815 \uBD84\uC7C1', value: '\uAC00\uC815 \uBD84\uC7C1' },
  { label: '\uAE30\uD0C0', value: '\uAE30\uD0C0' },
];

export default function CreateVoteForm({
  mode = 'create',
  initialData,
  postId,
  onClose,
}: CreateVoteFormProps) {
  const router = useRouter();
  const isEditing = mode === 'edit';

  const createMutation = useCreateVoteMutation();
  const updateMutation = useUpdateVoteMutation();

  const [category, setCategory] = React.useState(initialData?.category ?? '');
  const [title, setTitle] = React.useState(initialData?.title ?? '');
  const [content, setContent] = React.useState(initialData?.content ?? '');
  const [option1, setOption1] = React.useState(initialData?.option1 ?? '');
  const [option2, setOption2] = React.useState(initialData?.option2 ?? '');
  const [duration, setDuration] = React.useState(() => {
    if (!initialData?.reservedCloseAt) return 72;
    const remainMs = new Date(initialData.reservedCloseAt).getTime() - Date.now();
    return Math.max(1, Math.round(remainMs / (1000 * 60 * 60)));
  });

  React.useEffect(() => {
    if (!initialData) return;

    setCategory(initialData.category);
    setTitle(initialData.title);
    setContent(initialData.content);
    setOption1(initialData.option1);
    setOption2(initialData.option2);

    if (initialData.reservedCloseAt) {
      const remainMs = new Date(initialData.reservedCloseAt).getTime() - Date.now();
      setDuration(Math.max(1, Math.round(remainMs / (1000 * 60 * 60))));
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
        : new Date(Date.now() + duration * 60 * 60 * 1000).toISOString();

    if (isEditing) {
      if (!postId) {
        console.error('[CreateVoteForm] postId가 없어 수정할 수 없습니다.');
        return;
      }

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
        {
          onSuccess: () => {
            onClose();
            router.refresh();
          },
        },
      );
      return;
    }

    createMutation.mutate(
      {
        post: {
          postName: title,
          postContent: content,
          category,
        },
        poll: {
          voteTitle: '당신의 선택은?',
          pollOptions: [{ content: option1 }, { content: option2 }],
          reservedCloseAt,
        },
      },
      {
        onSuccess: () => {
          onClose();
          router.push('/vote/ongoing');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SelectCategory
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
            disabled={isSubmitting}
            className="min-w-[160px]"
          />

          <div className="w-[280px] flex flex-col gap-2">
            {!isEditing ? (
              <>
                <div className="flex items-center gap-2">
                  <Time className="text-brand-primary dark:text-brand-accent scale-150" />
                  <p className="text-brand-primary text-lg dark:text-primary-white">게시 기간 :</p>
                  <p className="text-brand-primary font-bold text-lg dark:text-brand-accent">
                    {calSliderTime(duration)}
                  </p>
                </div>

                <TimeSlider
                  key={initialData?.reservedCloseAt ?? 'create'}
                  defaultValue={[duration]}
                  onChange={(val: number) => setDuration(val)}
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
          className="bg-brand-primary rounded-full flex items-center gap-1 px-4 py-3 dark:bg-brand-accent hover:brightness-110 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="text-primary-white" />
          <p className="text-primary-white">
            {isSubmitting ? '처리 중...' : isEditing ? '수정하기' : '생성하기'}
          </p>
        </button>
      </header>

      <div className="bg-[#f8f8f8] h-88 rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.30)] flex flex-col dark:bg-background-black1">
        <div className="bg-white rounded-3xl flex px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.30)] gap-2 flex-shrink-0 border-[#a3a3a3] border-1 dark:bg-background-black2 dark:border-[#a3a3a3]">
          <p className="text-brand-primary text-4xl font-bold dark:text-brand-accent">Q.</p>
          <input
            type="text"
            name="title"
            autoFocus
            placeholder="분쟁 제목을 입력해 주세요."
            className="text-xl focus:animate-blink outline-none font-bold text-brand-primary flex-1 dark:text-primary-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="p-6 flex-1">
          <textarea
            name="content"
            placeholder="분쟁 내용을 입력해 주세요."
            className="w-full h-full resize-none outline-none text-md bg-transparent text-brand-primary dark:text-primary-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          name="option1"
          placeholder="투표 옵션 1"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] py-4 px-5 font-bold outline-none text-brand-primary text-lg dark:bg-background-black1 dark:text-primary-white"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="text"
          name="option2"
          placeholder="투표 옵션 2"
          className="bg-[#f4f4f4] w-full rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] py-4 px-5 font-bold outline-none text-brand-primary text-lg dark:bg-background-black1 dark:text-primary-white"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    </form>
  );
}
