'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CtaVote from '@/components/features/vote/CtaVote';
import ToggleNavigation from '@/components/features/vote/ToggleNavigation';
import CreateVoteModal from '@/components/features/vote/CreateVoteModal';

const queryClient = new QueryClient();

export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col items-center min-h-[calc(100vh-50px-70px)] pt-18 bg-background-white dark:bg-background-black1">
        <h2 className="mb-4 text-5xl font-bold text-primary-black dark:text-primary-white">
          온라인 유저 배심원단
        </h2>

        <h3 className="center-col mb-4 text-lg">
          <p className="text-primary-black dark:text-primary-white">
            여러분의 시선과 생각이 누군가에게 큰 도움이 될 수 있습니다.
          </p>
          <p className="text-primary-black dark:text-primary-white">
            배심원단이 되어 다른 사람의 고민을 함께 판단해보세요!
          </p>
        </h3>

        <CtaVote />

        <nav className="flex min-w-[550px] items-center justify-center">
          <ToggleNavigation className="w-full" />
        </nav>

        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </section>

      <CreateVoteModal />
    </QueryClientProvider>
  );
}
