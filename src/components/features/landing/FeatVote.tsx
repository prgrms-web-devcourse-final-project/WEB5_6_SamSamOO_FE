import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatVote() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;
  const imageSrc =
    resolvedTheme === 'dark' ? '/images/landingVoteDark.png' : '/images/landingVote.png';
  return (
    <section className="h-screen center-col" ref={containerRef} aria-labelledby="feat-vote-title">
      <div className="flex lg:flex-row flex-col gap-8 w-[80%]">
        <div>
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit mb-5 stagger-item">
            배심원단 투표
          </h2>
          <div className="flex flex-col lg:landing-sub text-3xl font-semibold stagger-item">
            <p>다른 사람의 고민,</p>
            <p>배심원단이 되어 판단해볼까요?</p>
          </div>
        </div>
        <div className="stagger-item center-col">
          <Image
            src={imageSrc}
            alt="배심원단 투표 화면 - 법률 질문에 대한 의견을 선택하는 투표 인터페이스"
            width={640}
            height={664}
            sizes="(max-width: 640px) 80vw, 500px"
            className="shadow-landing-card dark:shadow-landing-card-dark rounded-[30px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
export default FeatVote;
