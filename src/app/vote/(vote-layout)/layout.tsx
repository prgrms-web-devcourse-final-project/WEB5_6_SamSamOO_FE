import ToggleNavigation from '@/components/features/vote/ToggleNavigation';

export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="
        flex flex-col items-center
        min-h-[calc(100vh-50px-70px)]
        pt-18
        bg-background-white dark:bg-background-black1
      "
    >
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

      <button
        className="
          mb-10
          rounded-full
          bg-brand-primary dark:bg-brand-accent
          py-2 px-8
          text-lg font-bold text-primary-white
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          dark:shadow-[0_4px_12px_rgba(255,255,255,0.15)]
          transition-all duration-300
          hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]
          dark:hover:shadow-[0_6px_16px_rgba(255,255,255,0.25)]
          hover:brightness-110 hover:-translate-y-[3px]
          active:translate-y-0
        "
      >
        배심원단에게 물어보기✨
      </button>

      <nav className="mb-4 flex min-w-[550px] items-center justify-center">
        <ToggleNavigation className="w-full" />
      </nav>

      {children}
    </section>
  );
}
