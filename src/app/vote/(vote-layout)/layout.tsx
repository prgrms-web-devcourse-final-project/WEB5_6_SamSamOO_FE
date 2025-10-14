'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CtaVote from '@/components/features/vote/CtaVote';
import ToggleNavigation from '@/components/features/vote/ToggleNavigation';
import CreateVoteModal from '@/components/features/vote/CreateVoteModal';
import LoginStateProvider from '@/components/provider/LoginStateProvider';

const queryClient = new QueryClient();

/** 전체 투표 레이아웃 (타이틀, CTA, 네비게이션, children 렌더링) */
export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginStateProvider>
      <QueryClientProvider client={queryClient}>
        <section className="flex flex-col items-center min-h-[calc(100vh-50px-70px)] pt-14 sm:pt-16 md:pt-18 bg-background-white dark:bg-background-black1 overflow-y-auto [scrollbar-gutter:stable_both] px-4 sm:px-6">
          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-bold text-center text-primary-black dark:text-primary-white">
            온라인 유저 배심원단
          </h2>

          <h3 className="flex flex-col items-center mb-5 text-base sm:text-lg text-center leading-relaxed text-primary-black dark:text-primary-white">
            <p>여러분의 시선과 생각이 누군가에게 큰 도움이 될 수 있습니다.</p>
            <p>배심원단이 되어 다른 사람의 고민을 함께 판단해보세요!</p>
          </h3>

          <div className="w-full flex justify-center">
            <CtaVote />
          </div>

          <nav className="w-full max-w-md sm:max-w-lg md:min-w-[550px] flex items-center justify-center">
            <ToggleNavigation className="w-full" />
          </nav>

          <div className="w-full max-w-3xl">{children}</div>
        </section>

        <CreateVoteModal />
      </QueryClientProvider>
    </LoginStateProvider>
  );
}
