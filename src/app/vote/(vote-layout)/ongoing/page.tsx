'use client';

import { useEffect, useState } from 'react';
import VoteCard from '@/components/features/vote/VoteCard';
import ProgressBar from '@/components/features/vote/ProgressBar';
import GraphWrapper from '@/components/features/vote/GraphWrapper';
import { fetchOngoing } from '@/api/vote/fetchOngoing';
import { normalizeVoteResponse } from '@/utils/normalizeVoteResponse';
import { VoteCardModel } from '@/types/voteCard';

export default function Page() {
  const [posts, setPosts] = useState<VoteCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function loadVotes() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOngoing({ page: 0, size: 5 });
        const normalized = normalizeVoteResponse(data);
        setPosts(normalized);
      } catch (err) {
        console.error(err);
        setError('서버로부터 데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }

    loadVotes();
  }, [reloadKey]);

  // 로딩 상태
  if (loading)
    return (
      <div className="center-col py-40 text-lg text-brand-primary dark:text-brand-accent">
        투표 목록을 불러오는 중입니다...
      </div>
    );

  // 오류 상태
  if (error)
    return (
      <div className="center-col py-40 gap-3 text-center">
        <p className="text-lg text-red-500 font-bold">{error}</p>
        <button
          onClick={() => setReloadKey((k) => k + 1)} // refetch
          className="mt-3 px-5 py-2 rounded-xl bg-brand-primary text-white hover:opacity-80 transition-all"
        >
          다시 시도하기
        </button>
      </div>
    );

  // 투표 없음
  if (posts.length === 0)
    return (
      <div className="center-col py-40 gap-6 text-center">
        <p className="text-xl font-semibold text-brand-primary dark:text-brand-accent">
          현재 진행 중인 투표가 없습니다.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          새로운 투표가 등록되면 이곳에 표시됩니다.
        </p>

        <div className="w-24 h-24 mt-4 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-5 px-5 py-2 rounded-full bg-brand-primary text-white hover:opacity-80 transition-all"
        >
          다시 불러오기
        </button>
      </div>
    );

  // 정상 렌더링
  return (
    <div className="center-col gap-15 py-20">
      {posts.map((post) => (
        <VoteCard key={post.id} status={post.status}>
          <VoteCard.HeaderBody
            category={post.category}
            participants={post.participants}
            remainingTime={post.remainingTime}
            status={post.status}
            title={post.title}
            content={post.content}
          />

          <VoteCard.Graph status={post.status}>
            <GraphWrapper />
          </VoteCard.Graph>

          <VoteCard.Options>
            {post.options.map((opt, i) => (
              <ProgressBar
                key={i}
                label={opt.label}
                isSelected={opt.isSelected}
                currentVotes={opt.currentVotes}
                totalVotes={post.participants}
              />
            ))}
          </VoteCard.Options>
        </VoteCard>
      ))}
    </div>
  );
}
